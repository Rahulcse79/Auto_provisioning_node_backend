const express = require("express");
const bodyParser = require("body-parser");
const { JSONRPCServer } = require("json-rpc-2.0");
const { exec } = require("child_process");
const { networkInterfaces } = require("os");
const fs = require("fs");
const fsCallServer = require("fs").promises;
const path = require("path");
const puppeteer = require('puppeteer');
const cors = require("cors");
const os = require("os");
const osUtils = require("os-utils");
const diskusage = require("diskusage");
const util = require("util");
require("dotenv").config();
const exec1 = util.promisify(require("child_process").exec);
const nets = networkInterfaces();
let IpAddress = process.env.IpAddress || "localhost";
const server = new JSONRPCServer();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4050;
const DHCP_CONFIG_FILE = process.env.DHCPConfigFilePath || "/etc/dhcp/dhcpd.conf";
const TFTPDefaultFileName = process.env.TFTPDefaultFileName || "sample.cnf.xml";
const TFTPDefaultPath = process.env.TFTPDefaultPath || "/srv/tftp";
const IpAddressOfACS = process.env.IpAddressOfACS || "192.168.20.178";

// Call server
const outputFilePathCallServer = path.join("/root", "Coral.yaml");
const outputFilePathReboot = path.join("/root", "reboot.yaml");
const outputFilePathConfig = path.join("/root", "copy.yaml");
const filePath = "/etc/demo/Coral";
const HostsFile = path.join("/etc/ansible", "hosts");

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const FindFile = (directory, fileName) => {
  const filePath = path.join(directory, fileName);
  return fs.existsSync(filePath);
};

function checkServiceStatus(serviceName, command) {
  return new Promise((resolve, reject) => {
    const LinuxCommand = `systemctl ${command} ${serviceName}`;
    console.log(`Executing command: ${LinuxCommand}`);
    exec(LinuxCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        console.error(`Command output: ${stdout}`);
        console.error(`Command error output: ${stderr}`);
        resolve(-1);
        return;
      }
      if (stderr) {
        console.error(`Error output: ${stderr}`);
        resolve(-1);
        return;
      }
      if (stdout.trim().includes("active")) {
        console.log("Service is active");
        resolve(1);
      } else {
        resolve(-1);
      }
    });
  });
}

function checkFilePresence(macAddress) {
  return new Promise((resolve) => {
    const filePath = `/etc/srv/tftp/SEP${macAddress}.cnf.xml`;
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`File not found: ${filePath}`);
        resolve(-1);
      } else {
        console.log(`File exists: ${filePath}`);
        resolve(1);
      }
    });
  });
}

app.post("/checkStatus", async (req, res) => {
  try {
    const { DhcpStart, TftpStart } = req.body;

    if (DhcpStart === "1") {
      await checkServiceStatus("isc-dhcp-server", "restart");
    } else if (DhcpStart === "0") {
      await checkServiceStatus("isc-dhcp-server", "stop");
    }

    if (TftpStart === "1") {
      console.log(DhcpStart);
      console.log(TftpStart);
      await checkServiceStatus("tftpd-hpa.service", "restart");
    } else if (TftpStart === "0") {
      await checkServiceStatus("tftpd-hpa.service", "stop");
    }

    const [Dhcp, Tfcp] = await Promise.all([
      await checkServiceStatus("isc-dhcp-server", "status"),
      await checkServiceStatus("tftpd-hpa.service", "status"),
    ]);
    console.log(Dhcp);
    console.log(Tfcp);

    const data = {
      Dhcp: Dhcp === 1 ? 1 : -1,
      Tfcp: Tfcp === 1 ? 1 : -1,
    };

    res.json({
      status: 0,
      message: "Data retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({
      status: 2,
      error: "Internal server error",
    });
  }
});

// Cisco phone diagnosis api.
app.post("/diagnosis", async (req, res) => {
  try {
    const { macAddress } = req.body;
    if (!macAddress) {
      return res
        .status(400)
        .json({ status: -1, error: "MAC address is required" });
    }
    const [Dhcp, Tfcp] = await Promise.all([
      checkServiceStatus("isc-dhcp-server", "status"),
      checkServiceStatus("tftpd-hpa.service", "status"),
      checkFilePresence(macAddress),
    ]);
    console.log(Dhcp);
    console.log(Tfcp);

    const DefaultFile = FindFile(TFTPDefaultPath, TFTPDefaultFileName) || false;
    const FileName = `SEP${macAddress}.cnf.xml`;
    const Path = FindFile(TFTPDefaultPath, FileName);
    console.log(DefaultFile);
    const data = {
      Dhcp: Dhcp === 1 ? 1 : 0,
      Tfcp: Tfcp === 1 ? 1 : 0,
      Path: Path === true ? 1 : 0,
      DefaultFile: DefaultFile === true ? 1 : 0,
    };
    res.json({
      status: 0,
      message: "Data retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({
      status: 2,
      error: "Internal server error",
    });
  }
});

function getRamUsage() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsage = osUtils.freememPercentage();
  return {
    totalMem: formatBytes(totalMem),
    freeMem: formatBytes(freeMem),
    usedMem: formatBytes(usedMem),
    memUsage: `${(1 - memUsage) * 100}%`,
  };
}

function getCpuUsage() {
  return new Promise((resolve, reject) => {
    const cpuCount = os.cpus().length;
    let totalUsage = 0;
    for (const cpu of os.cpus()) {
      const usage =
        1 -
        cpu.times.idle /
          (cpu.times.user +
            cpu.times.nice +
            cpu.times.sys +
            cpu.times.idle +
            cpu.times.irq);
      totalUsage += usage;
    }
    const averageUsage = totalUsage / cpuCount;
    const cpuUsagePercent = (averageUsage * 100).toFixed(2);

    resolve(`${cpuUsagePercent}%`);
  });
}

function getTotalCpu() {
  return new Promise((resolve, reject) => {
    const os = require("os");
    const cpus = os.cpus();
    let prevCpuTimes = [];
    for (let cpu of cpus) {
      prevCpuTimes.push({
        idle: cpu.times.idle,
        total:
          cpu.times.user +
          cpu.times.nice +
          cpu.times.sys +
          cpu.times.idle +
          cpu.times.irq,
      });
    }
    setTimeout(() => {
      const cpus = os.cpus();
      let totalCpuPercent = 0;
      for (let i = 0; i < cpus.length; i++) {
        const cpu = cpus[i];
        const prevCpu = prevCpuTimes[i];
        const idleDiff = cpu.times.idle - prevCpu.idle;
        const totalDiff =
          cpu.times.user +
          cpu.times.nice +
          cpu.times.sys +
          cpu.times.idle +
          cpu.times.irq -
          prevCpu.total;
        const cpuUsage = 100 - (idleDiff / totalDiff) * 100;
        totalCpuPercent += cpuUsage;
        prevCpuTimes[i] = {
          idle: cpu.times.idle,
          total:
            cpu.times.user +
            cpu.times.nice +
            cpu.times.sys +
            cpu.times.idle +
            cpu.times.irq,
        };
      }
      totalCpuPercent = totalCpuPercent / cpus.length;
      resolve(`${totalCpuPercent.toFixed(2)}%`);
    }, 1000);
  });
}

function getDiskUsage() {
  return new Promise((resolve, reject) => {
    diskusage.check("/", function (err, info) {
      if (err) {
        reject(err);
      } else {
        resolve({
          totalDisk: formatBytes(info.total),
          freeDisk: formatBytes(info.available),
          usedDisk: formatBytes(info.total - info.available),
          diskUsage: `${((info.total - info.available) / info.total) * 100}%`,
        });
      }
    });
  });
}

async function getSystemHealth() {
  try {
    const ramUsage = getRamUsage();
    const cpuUsage = await getCpuUsage();
    const diskUsage = await getDiskUsage();
    const totalCpu = await getTotalCpu();
    const data = { ramUsage, cpuUsage, totalCpu, diskUsage };
    return data;
  } catch (error) {
    console.error("Error fetching system metrics:", error);
    throw error;
  }
}

app.get("/systemHealth", async (req, res) => {
  try {
    const data = await getSystemHealth();
    if (data) {
      res.json({
        status: 0,
        message: "System health data retrieved successfully",
        data: data,
      });
    } else {
      res.status(500).json({ error: "Failed to retrieve system health data" });
    }
  } catch (error) {
    console.error("Error retrieving system health data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function fetchDeviceData2(token, deviceId) {
  console.log(deviceId);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://auto-provisioning-tr069.onrender.com/device-manager/#!/devices/${deviceId}`;
  const cookie = {
    name: 'session',
    value: `{"AuthToken":"${token}"}`,
    domain: new URL(url).hostname,
    path: '/',
    httpOnly: true,
    secure: false
  };
  await page.setCookie(cookie);
  await page.goto(url, { waitUntil: 'networkidle2' });
  const bodyText = await page.evaluate(() => document.body.innerText);
  const searchString = 'Pinging';
  if (bodyText.includes(searchString)) {
    const pingRegex = /Pinging\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):\s+(\d+) ms/;
    const match = bodyText.match(pingRegex);
    if (match) {
      const ipAddress = match[1]; 
      const ping = match[2];
      await browser.close();
      return { ipAddress, ping };
    }
    await browser.close();
    return { ipAddress: "", ping: "" };
  }
  await browser.close();
  return { ipAddress: "", ping: "" };
}

async function fetchDeviceData(token, deviceId) {
  console.log(deviceId);
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const url = `https://auto-provisioning-tr069.onrender.com/device-manager/#!/devices/${deviceId}`;
  const cookie = {
    name: 'session',
    value: `{"AuthToken":"${token}"}`,
    domain: new URL(url).hostname,
    path: '/',
    httpOnly: true,
    secure: false
  };
  await page.setCookie(cookie);
  await page.goto(url, { waitUntil: 'networkidle2' });
  const bodyText = await page.evaluate(() => document.body.innerText);
  const searchString = 'Pinging';
  if (bodyText.includes(searchString)) {
    const pingRegex = /Pinging\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):\s+(\d+) ms/;
    const match = bodyText.match(pingRegex);
    if (match) {
      const ipAddress = match[1]; 
      const ping = match[2];
      await browser.close();
      return { ipAddress, ping };
    }
  }
  await browser.close();
  return { ipAddress: "", ping: "" };
}

app.get("/iPAddress", async (req, res) => {
  try {
    const token = req.headers["authorization"].slice(7);
    const deviceId = req.headers["deviceid"];
    const response = await fetchDeviceData(token, deviceId);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving device data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function runCommands(fileName, IpAddress) {
  try {
    const ansibleCommand = `cd && ansible-playbook ${fileName} --limit ${IpAddress}`;
    const { stdout: ansibleOutput } = await exec1(ansibleCommand);
    return { responce: ansibleOutput };
  } catch (error) {
    return { responce: error.message };
  }
}

// Configure linux machine throw ansible.
app.post("/linuxConfig", async (req, res) => {
  try {
    const { devices } = req.body;
    if (!devices || devices.length === 0) {
      return res.status(400).json({ error: "IP address missing" });
    }
    const fileName = "copy.yaml";
    const responses = await Promise.all(
      devices.map(async (IpAddress) => {
        try {
          const result = await runCommands(fileName, IpAddress);
          return { IpAddress, result: result };
        } catch (err) {
          return {
            IpAddress,
            result: "Error",
          };
        }
      })
    );
    console.log(responses);
    res.json({
      status: 0,
      responses: responses,
    });
  } catch (error) {
    console.error("Error processing Linux config.");
    res.status(500).json({ status: -1, error: "Internal server error" });
  }
});

app.post("/linux/reboot", async (req, res) => {
  try {
    const { devices } = req.body;
    if (!devices || devices.length === 0) {
      return res.status(400).json({ error: "IP address missing" });
    }
    const fileName = "reboot.yaml";
    const responses = await Promise.all(
      devices.map(async (IpAddress) => {
        try {
          const result = await runCommands(fileName, IpAddress);
          return { IpAddress, result: result };
        } catch (err) {
          return {
            IpAddress,
            result: "Error",
          };
        }
      })
    );
    res.json({
      status: 0,
      responses: responses,
    });
  } catch (error) {
    console.error("Error processing Linux reboot.");
    res.status(500).json({ status: -1, error: "Internal server error" });
  }
});

app.post("/sendFile", async (req, res) => {
  try {
    const devicesHeader = req.headers.devices;
    const provisionHeader = req.headers.provision;
    const provision = parseInt(provisionHeader, 10);
    const devices = devicesHeader ? JSON.parse(devicesHeader) : [];
    if (provision === 0 && devices.length === 0) {
      return res.status(400).json({ error: "IP address missing" });
    }
    let responses = [];
    const fileName = process.env.CallServerFileName || "Coral.yaml";
    if (provision === 1) {
      const result = await runCommands(fileName, "SendAll");
      responses = [{ IpAddress: "All playbook IP addresses", result: result }];
    } else if (provision === 0) {
      responses = await Promise.all(
        devices.map(async (device) => {
          try {
            const result = await runCommands(fileName, device.ipAddress);
            return { IpAddress: device.ipAddress, result: result };
          } catch (err) {
            return { IpAddress: device.ipAddress, result: "Error" };
          }
        })
      );
    }
    res.json({
      status: 0,
      responses: responses,
    });
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).json({ status: -1, error: "Internal server error" });
  }
});

function checkFilePresenceByPath(filePath) {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`File not found: ${filePath}`);
        resolve(-1);
      } else {
        console.log(`File exists: ${filePath}`);
        resolve(1);
      }
    });
  });
}

// POST endpoint to submit DHCP configuration
app.post("/submitDHCPConfig", async (req, res) => {
  try {
    const dhcpConfig = req.body;
    if (!dhcpConfig) {
      return res.status(400).json({ error: "DHCP configuration data missing" });
    }
    console.log("Received DHCP configuration:", dhcpConfig);
    const success = await updateDHCPConfig(dhcpConfig);
    if (success) {
      res.json({
        status: 0,
        message: "DHCP configuration received and processed successfully",
      });
    } else {
      res.status(500).json({ error: "Failed to update DHCP configuration" });
    }
  } catch (error) {
    console.error("Error processing DHCP configuration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const CurrentData = (configContent) => {
  const configLines = configContent.split("\n");
  const config = {};
  configLines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("subnet")) {
      const parts = line.split("netmask").map((part) => part.trim());
      config.subnet = parts[0].split(" ")[1];
      config.netmask = parts[1].replace("{", "").trim();
    }
  });
  return config;
};

// Function to update DHCP configuration file
const updateDHCPConfig = async (dhcpConfig) => {
  try {
    if (checkFilePresenceByPath(DHCP_CONFIG_FILE)) {
      let dhcpFileContent = fs.readFileSync(DHCP_CONFIG_FILE, "utf8");
      const ConfigData = await CurrentData(dhcpFileContent);
      const CurrSubnet = ConfigData.subnet;
      const CurrNetmask = ConfigData.netmask;
      console.log(`Current Subnet: ${CurrSubnet}`);
      console.log(`Current Netmask: ${CurrNetmask}`);
      let subnetConfigRegex = new RegExp(
        `subnet ${CurrSubnet} netmask ${CurrNetmask}\\s*{([^}]*)}`,
        "gm"
      );
      let newConfig = dhcpFileContent.match(subnetConfigRegex)[0];
      let Broadcast = "";
      if (dhcpConfig.subnet) {
        Broadcast = `${dhcpConfig.subnet.slice(
          0,
          dhcpConfig.subnet.lastIndexOf(".")
        )}.255`;
      }
      if (dhcpConfig.subnet) {
        newConfig = newConfig.replace(
          /subnet\s+\d+\.\d+\.\d+\.\d+/,
          `subnet ${dhcpConfig.subnet}`
        );
      }
      if (dhcpConfig.netmask) {
        newConfig = newConfig.replace(
          /netmask\s+\d+\.\d+\.\d+\.\d+/,
          `netmask ${dhcpConfig.netmask}`
        );
      }
      if (dhcpConfig.range && dhcpConfig.range.start && dhcpConfig.range.end) {
        newConfig = newConfig.replace(
          /range\s+\d+\.\d+\.\d+\.\d+\s+\d+\.\d+\.\d+\.\d+;/,
          `range ${dhcpConfig.range.start} ${dhcpConfig.range.end};`
        );
      }
      if (dhcpConfig.routers) {
        newConfig = newConfig.replace(
          /option routers \d+\.\d+\.\d+\.\d+;/,
          `option routers ${dhcpConfig.routers};`
        );
      }
      if (Broadcast !== "") {
        console.log(Broadcast);
        newConfig = newConfig.replace(
          /option broadcast-address \d+\.\d+\.\d+\.\d+;/,
          `option broadcast-address ${Broadcast};`
        );
      }
      if (dhcpConfig.dns) {
        newConfig = newConfig.replace(
          /option domain-name-servers \d+\.\d+\.\d+\.\d+;/,
          `option domain-name-servers ${dhcpConfig.dns};`
        );
      }
      if (dhcpConfig.tftpServerName) {
        console.log(dhcpConfig.tftpServerName);
        dhcpFileContent = dhcpFileContent.replace(
          /option tftp-server-name "\d+\.\d+\.\d+\.\d+";/,
          `option tftp-server-name "${dhcpConfig.tftpServerName}";`
        );
      }
      dhcpFileContent = dhcpFileContent.replace(subnetConfigRegex, newConfig);
      fs.writeFileSync(DHCP_CONFIG_FILE, dhcpFileContent, "utf8");
      console.log("DHCP configuration file updated successfully.");
      await restartDHCPService();
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating DHCP configuration file:", error);
    return false;
  }
};

function restartDHCPService() {
  exec(
    "sudo systemctl restart isc-dhcp-server.service",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error restarting DHCP service: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`DHCP service restart error: ${stderr}`);
        return;
      }
      console.log("DHCP service restarted successfully");
    }
  );
}

server.addMethod(
  "sendFile",
  ({ sourcePath, destinationPath, destinationIP, destinationUser }) => {
    return new Promise((resolve, reject) => {
      const command = `scp ${sourcePath} ${destinationUser}@${destinationIP}:${destinationPath}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing scp command: ${stderr}`);
          reject(new Error("Failed to send file"));
        } else {
          console.log("File sent successfully");
          resolve("File sent successfully");
        }
      });
    });
  }
);

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    if (net.family === "IPv4" && !net.internal) {
      IpAddress = net.address;
      break;
    }
  }
  if (IpAddress) {
    break;
  }
}

// Call server 
function generateAnsiblePlaybookOfCallServer(ip, filePath) {
  return `
- hosts: ${ip}
  tasks:
    - name: Copy Coral from local to remote
      copy:
        src: "${filePath}"
        dest: "${filePath}"
        force: yes
`;
}

function generateAnsiblePlaybookOfReboot(ip) {
  return `
- hosts: ${ip}
  become: true
  become_user: root
  tasks:
    - name: Rebooting the cloud server/bare metal box
      reboot:
`;
}

function generateAnsiblePlaybookOfConfig(ip) {
  return `
- hosts: ${ip}
  tasks:
    - name: Create multiple files
      file:
        path: "{{ item }}"
        state: touch
      loop:
        - 'test01.txt'
        - 'test02.txt'
        - 'test03.txt'
        - 'test04.txt'
`;
}

function generateAnsiblePlaybookHost(ip) {
  return `
[${ip}]
${ip}  
`;
}

const savePlaybookToFile = async (ip, provision) => {
  try {
    let playbook;
    let fileContent = "";
    let outputFilePath;
    const Defaultplaybook = generateAnsiblePlaybookHost(ip);
    if (provision === 2) {
      outputFilePath = outputFilePathCallServer;
      playbook = generateAnsiblePlaybookOfCallServer(ip, filePath);
    } else if (provision === 0) {
      outputFilePath = outputFilePathReboot;
      playbook = generateAnsiblePlaybookOfReboot(ip);
    } else if (provision === 1) {
      outputFilePath = outputFilePathConfig;
      playbook = generateAnsiblePlaybookOfConfig(ip);
    } else {
      console.error("Invalid provision type");
      return;
    }
    try {
      fileContent = await fsCallServer.readFile(outputFilePath, "utf8");
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }

    if (fileContent.trim() === "") {
      await fsCallServer.writeFile(outputFilePath, "---\n");
    }

    if (!fileContent.includes(playbook)) {
      await fsCallServer.appendFile(outputFilePath, playbook);
      console.log("Playbook saved successfully!");
    } else {
      console.log("Playbook already exists in the file.");
    }
    try {
      fileContent = await fsCallServer.readFile(HostsFile, "utf8");
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }

    let updatedContent = '';
    let foundSendAll = false;
    const lines = fileContent.split('\n');

    for (const line of lines) {
      if (line.trim() === '[SendAll]') {
        foundSendAll = true;
        updatedContent += line + '\n';
        if (!lines.slice(lines.indexOf(line) + 1).some(l => l.trim() === ip)) {
          updatedContent += ip + '\n';
        }
      } else {
        updatedContent += line + '\n';
      }
    }

    if (!foundSendAll) {
      updatedContent += '\n[SendAll]\n' + ip + '\n';
    }

    if (!fileContent.includes(Defaultplaybook)) {
      updatedContent += Defaultplaybook;
      console.log("Default playbook saved successfully!");
    } else {
      console.log("Default playbook already exists in the file.");
    }

    await fsCallServer.writeFile(HostsFile, updatedContent, 'utf8');

  } catch (error) {
    console.error("Error writing playbook to file:", error);
  }
};

const deletePlaybookFromFile = async (ip, provision) => {
  try {
    let playbookToDelete;
    let outputFilePath;
    const Defaultplaybook = generateAnsiblePlaybookHost(ip);
    if (provision === 2) {
      outputFilePath = outputFilePathCallServer;
      playbookToDelete = generateAnsiblePlaybookOfCallServer(ip, filePath);
    } else if (provision === 0) {
      outputFilePath = outputFilePathReboot;
      playbookToDelete = generateAnsiblePlaybookOfReboot(ip);
    } else if (provision === 1) {
      outputFilePath = outputFilePathConfig;
      playbookToDelete = generateAnsiblePlaybookOfConfig(ip);
    } else {
      console.error('Invalid provision type');
      return;
    }

    // Handle playbook file
    let fileContent = await fsCallServer.readFile(outputFilePath, 'utf8');
    if (fileContent.includes(playbookToDelete)) {
      fileContent = fileContent.replace(playbookToDelete, '');
      await fsCallServer.writeFile(outputFilePath, fileContent);
      console.log("Playbook removed successfully!");
    } else {
      console.log("Playbook not found in the file.");
    }

    // Handle hosts file
    fileContent = await fsCallServer.readFile(HostsFile, 'utf8');
    let updatedContent = '';
    let foundSendAll = false;
    let ipFound = false;
    const lines = fileContent.split('\n');

    for (const line of lines) {
      if (line.trim() === '[SendAll]') {
        foundSendAll = true;
        updatedContent += line + '\n';
        lines.slice(lines.indexOf(line) + 1).forEach(l => {
          if (l.trim() !== ip) {
            updatedContent += l + '\n';
          } else {
            ipFound = true;
          }
        });
      } else {
        updatedContent += line + '\n';
      }
    }
    if (!foundSendAll) {
      updatedContent += '\n[SendAll]\n';
    }

    if (!ipFound && foundSendAll) {
      updatedContent += ip + '\n';
    }

    if (fileContent.includes(Defaultplaybook)) {
      updatedContent = updatedContent.replace(Defaultplaybook, '');
      console.log("Default playbook removed successfully!");
    }
    await fsCallServer.writeFile(HostsFile, updatedContent, 'utf8');
  } catch (error) {
    console.error("Error deleting playbook from file:", error);
  }
};

app.post("/addIPAddress", async (req, res) => {
  try {
    const { provision, devices } = req.body;
    if (!Array.isArray(devices) || devices.length === 0) {
      return res
        .status(400)
        .json({ status: 1, message: "No IP addresses provided" });
    }
    const ips = devices.map(device => device.ipAddress);
    for (const ip of ips) {
      await savePlaybookToFile(ip, provision);
    }
    res.json({ status: 0, message: "IP Address successfully added." });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ status: 1, message: "Internal server error" });
  }
});

app.post("/addIPAddress/delete", async (req, res) => {
  try {
    const { provision, devices } = req.body;
    if (!devices) {
      return res
        .status(400)
        .json({ status: 1, message: "No IP addresses provided" });
    }
    await deletePlaybookFromFile(devices, provision);
    res.json({ status: 0, message: "IP Address successfully deleted." });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ status: 1, message: "Internal server error" });
  }
});

// List IPs
const extractIpsFromPlaybook = async (filePath) => {
  try {
    const data = await fsCallServer.readFile(filePath, "utf8");
    const ipRegex = /hosts:\s(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
    let match;
    const ips = [];
    while ((match = ipRegex.exec(data)) !== null) {
      ips.push(match[1]);
    }
    if (ips.length > 0) {
      return ips;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

const extractIpsHostsFile = async (filePath) => {
  try {
    const data = await fsCallServer.readFile(filePath, "utf8");
    const sendAllSection = data.split(/\r?\n/); 
    let ips = [];
    let foundSendAll = false;
    for (let i = 0; i < sendAllSection.length; i++) {
      const line = sendAllSection[i].trim();
      if (line === "[SendAll]") {
        foundSendAll = true;
        continue; 
      }
      if (foundSendAll) {
        if (line.startsWith("[")) {
          break;
        }
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(line)) {
          ips.push(line);
        }
      }
    }

    return ips;
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
};

app.get("/getIpAddress", async (req, res) => {
  try {
    let provision = parseInt(req.headers.provision, 10);
    let FilePathList;
    if(provision === 0) {
      FilePathList = outputFilePathReboot;
    } else if(provision === 1)
    {
      FilePathList = outputFilePathConfig;
    } else if(provision === 2) {
      FilePathList = outputFilePathCallServer;
    } else if(provision === 3) {
      FilePathList = "/etc/ansible/hosts";
    }
    let ips;
    if (provision !== 3) {
      ips = await extractIpsFromPlaybook(FilePathList);
    } else if (provision === 3) {
      ips = await extractIpsHostsFile(FilePathList);
    }
    res.json({ status: 0, ips: ips });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ status: 1, message: "Internal server error" });
  }
});

app.listen(port, IpAddress, () => {
  console.log(`Server is running on http://${IpAddress}:${port}`);
});
