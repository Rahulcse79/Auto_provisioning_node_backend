"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require("express");
var bodyParser = require("body-parser");
var _require = require("json-rpc-2.0"),
  JSONRPCServer = _require.JSONRPCServer;
var _require2 = require("child_process"),
  exec = _require2.exec;
var _require3 = require("os"),
  networkInterfaces = _require3.networkInterfaces;
var fs = require("fs");
var fsCallServer = require("fs").promises;
var path = require("path");
var puppeteer = require('puppeteer');
var cors = require("cors");
var os = require("os");
var osUtils = require("os-utils");
var diskusage = require("diskusage");
var util = require("util");
require("dotenv").config();
var exec1 = util.promisify(require("child_process").exec);
var nets = networkInterfaces();
var IpAddress = process.env.IpAddress || "localhost";
var server = new JSONRPCServer();
var app = express();
app.use(bodyParser.json());
app.use(cors());
var port = process.env.PORT || 4050;
var DHCP_CONFIG_FILE = process.env.DHCPConfigFilePath || "/etc/dhcp/dhcpd.conf";
var TFTPDefaultFileName = process.env.TFTPDefaultFileName || "sample.cnf.xml";
var TFTPDefaultPath = process.env.TFTPDefaultPath || "/srv/tftp";
var IpAddressOfACS = process.env.IpAddressOfACS || "192.168.20.178";

// Call server
var outputFilePathCallServer = path.join("/root", "Coral.yaml");
var outputFilePathReboot = path.join("/root", "reboot.yaml");
var outputFilePathConfig = path.join("/root", "copy.yaml");
var filePath = "/etc/demo/Coral";
var HostsFile = path.join("/etc/ansible", "hosts");
function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return "0 Bytes";
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
var FindFile = function FindFile(directory, fileName) {
  var filePath = path.join(directory, fileName);
  return fs.existsSync(filePath);
};
function checkServiceStatus(serviceName, command) {
  return new Promise(function (resolve, reject) {
    var LinuxCommand = "systemctl ".concat(command, " ").concat(serviceName);
    console.log("Executing command: ".concat(LinuxCommand));
    exec(LinuxCommand, function (error, stdout, stderr) {
      if (error) {
        console.error("Error executing command: ".concat(error.message));
        console.error("Command output: ".concat(stdout));
        console.error("Command error output: ".concat(stderr));
        resolve(-1);
        return;
      }
      if (stderr) {
        console.error("Error output: ".concat(stderr));
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
  return new Promise(function (resolve) {
    var filePath = "/etc/srv/tftp/SEP".concat(macAddress, ".cnf.xml");
    fs.access(filePath, fs.constants.F_OK, function (err) {
      if (err) {
        console.error("File not found: ".concat(filePath));
        resolve(-1);
      } else {
        console.log("File exists: ".concat(filePath));
        resolve(1);
      }
    });
  });
}
app.post("/checkStatus", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, DhcpStart, TftpStart, _yield$Promise$all, _yield$Promise$all2, Dhcp, Tfcp, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, DhcpStart = _req$body.DhcpStart, TftpStart = _req$body.TftpStart;
          if (!(DhcpStart === "1")) {
            _context.next = 7;
            break;
          }
          _context.next = 5;
          return checkServiceStatus("isc-dhcp-server", "restart");
        case 5:
          _context.next = 10;
          break;
        case 7:
          if (!(DhcpStart === "0")) {
            _context.next = 10;
            break;
          }
          _context.next = 10;
          return checkServiceStatus("isc-dhcp-server", "stop");
        case 10:
          if (!(TftpStart === "1")) {
            _context.next = 17;
            break;
          }
          console.log(DhcpStart);
          console.log(TftpStart);
          _context.next = 15;
          return checkServiceStatus("tftpd-hpa.service", "restart");
        case 15:
          _context.next = 20;
          break;
        case 17:
          if (!(TftpStart === "0")) {
            _context.next = 20;
            break;
          }
          _context.next = 20;
          return checkServiceStatus("tftpd-hpa.service", "stop");
        case 20:
          _context.t0 = Promise;
          _context.next = 23;
          return checkServiceStatus("isc-dhcp-server", "status");
        case 23:
          _context.t1 = _context.sent;
          _context.next = 26;
          return checkServiceStatus("tftpd-hpa.service", "status");
        case 26:
          _context.t2 = _context.sent;
          _context.t3 = [_context.t1, _context.t2];
          _context.next = 30;
          return _context.t0.all.call(_context.t0, _context.t3);
        case 30:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          Dhcp = _yield$Promise$all2[0];
          Tfcp = _yield$Promise$all2[1];
          console.log(Dhcp);
          console.log(Tfcp);
          data = {
            Dhcp: Dhcp === 1 ? 1 : -1,
            Tfcp: Tfcp === 1 ? 1 : -1
          };
          res.json({
            status: 0,
            message: "Data retrieved successfully",
            data: data
          });
          _context.next = 44;
          break;
        case 40:
          _context.prev = 40;
          _context.t4 = _context["catch"](0);
          console.error("Error retrieving data:", _context.t4);
          res.status(500).json({
            status: 2,
            error: "Internal server error"
          });
        case 44:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 40]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Cisco phone diagnosis api.
app.post("/diagnosis", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var macAddress, _yield$Promise$all3, _yield$Promise$all4, Dhcp, Tfcp, DefaultFile, FileName, Path, data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          macAddress = req.body.macAddress;
          if (macAddress) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            status: -1,
            error: "MAC address is required"
          }));
        case 4:
          _context2.next = 6;
          return Promise.all([checkServiceStatus("isc-dhcp-server", "status"), checkServiceStatus("tftpd-hpa.service", "status"), checkFilePresence(macAddress)]);
        case 6:
          _yield$Promise$all3 = _context2.sent;
          _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
          Dhcp = _yield$Promise$all4[0];
          Tfcp = _yield$Promise$all4[1];
          console.log(Dhcp);
          console.log(Tfcp);
          DefaultFile = FindFile(TFTPDefaultPath, TFTPDefaultFileName) || false;
          FileName = "SEP".concat(macAddress, ".cnf.xml");
          Path = FindFile(TFTPDefaultPath, FileName);
          console.log(DefaultFile);
          data = {
            Dhcp: Dhcp === 1 ? 1 : 0,
            Tfcp: Tfcp === 1 ? 1 : 0,
            Path: Path === true ? 1 : 0,
            DefaultFile: DefaultFile === true ? 1 : 0
          };
          res.json({
            status: 0,
            message: "Data retrieved successfully",
            data: data
          });
          _context2.next = 24;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          console.error("Error retrieving data:", _context2.t0);
          res.status(500).json({
            status: 2,
            error: "Internal server error"
          });
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 20]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
function getRamUsage() {
  var totalMem = os.totalmem();
  var freeMem = os.freemem();
  var usedMem = totalMem - freeMem;
  var memUsage = osUtils.freememPercentage();
  return {
    totalMem: formatBytes(totalMem),
    freeMem: formatBytes(freeMem),
    usedMem: formatBytes(usedMem),
    memUsage: "".concat((1 - memUsage) * 100, "%")
  };
}
function getCpuUsage() {
  return new Promise(function (resolve, reject) {
    var cpuCount = os.cpus().length;
    var totalUsage = 0;
    var _iterator = _createForOfIteratorHelper(os.cpus()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var cpu = _step.value;
        var usage = 1 - cpu.times.idle / (cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq);
        totalUsage += usage;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var averageUsage = totalUsage / cpuCount;
    var cpuUsagePercent = (averageUsage * 100).toFixed(2);
    resolve("".concat(cpuUsagePercent, "%"));
  });
}
function getTotalCpu() {
  return new Promise(function (resolve, reject) {
    var os = require("os");
    var cpus = os.cpus();
    var prevCpuTimes = [];
    var _iterator2 = _createForOfIteratorHelper(cpus),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var cpu = _step2.value;
        prevCpuTimes.push({
          idle: cpu.times.idle,
          total: cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    setTimeout(function () {
      var cpus = os.cpus();
      var totalCpuPercent = 0;
      for (var i = 0; i < cpus.length; i++) {
        var cpu = cpus[i];
        var prevCpu = prevCpuTimes[i];
        var idleDiff = cpu.times.idle - prevCpu.idle;
        var totalDiff = cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq - prevCpu.total;
        var cpuUsage = 100 - idleDiff / totalDiff * 100;
        totalCpuPercent += cpuUsage;
        prevCpuTimes[i] = {
          idle: cpu.times.idle,
          total: cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq
        };
      }
      totalCpuPercent = totalCpuPercent / cpus.length;
      resolve("".concat(totalCpuPercent.toFixed(2), "%"));
    }, 1000);
  });
}
function getDiskUsage() {
  return new Promise(function (resolve, reject) {
    diskusage.check("/", function (err, info) {
      if (err) {
        reject(err);
      } else {
        resolve({
          totalDisk: formatBytes(info.total),
          freeDisk: formatBytes(info.available),
          usedDisk: formatBytes(info.total - info.available),
          diskUsage: "".concat((info.total - info.available) / info.total * 100, "%")
        });
      }
    });
  });
}
function getSystemHealth() {
  return _getSystemHealth.apply(this, arguments);
}
function _getSystemHealth() {
  _getSystemHealth = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
    var ramUsage, cpuUsage, diskUsage, totalCpu, data;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          ramUsage = getRamUsage();
          _context20.next = 4;
          return getCpuUsage();
        case 4:
          cpuUsage = _context20.sent;
          _context20.next = 7;
          return getDiskUsage();
        case 7:
          diskUsage = _context20.sent;
          _context20.next = 10;
          return getTotalCpu();
        case 10:
          totalCpu = _context20.sent;
          data = {
            ramUsage: ramUsage,
            cpuUsage: cpuUsage,
            totalCpu: totalCpu,
            diskUsage: diskUsage
          };
          return _context20.abrupt("return", data);
        case 15:
          _context20.prev = 15;
          _context20.t0 = _context20["catch"](0);
          console.error("Error fetching system metrics:", _context20.t0);
          throw _context20.t0;
        case 19:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 15]]);
  }));
  return _getSystemHealth.apply(this, arguments);
}
app.get("/systemHealth", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return getSystemHealth();
        case 3:
          data = _context3.sent;
          if (data) {
            res.json({
              status: 0,
              message: "System health data retrieved successfully",
              data: data
            });
          } else {
            res.status(500).json({
              error: "Failed to retrieve system health data"
            });
          }
          _context3.next = 11;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Error retrieving system health data:", _context3.t0);
          res.status(500).json({
            error: "Internal server error"
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
function fetchDeviceData2(_x7, _x8) {
  return _fetchDeviceData.apply(this, arguments);
}
function _fetchDeviceData() {
  _fetchDeviceData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(token, deviceId) {
    var browser, page, url, cookie, bodyText, searchString, pingRegex, match, ipAddress, ping;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          console.log(deviceId);
          _context21.next = 3;
          return puppeteer.launch();
        case 3:
          browser = _context21.sent;
          _context21.next = 6;
          return browser.newPage();
        case 6:
          page = _context21.sent;
          url = "http://".concat(IpAddressOfACS, "/device-manager/#!/devices/").concat(deviceId);
          cookie = {
            name: 'session',
            value: "{\"AuthToken\":\"".concat(token, "\"}"),
            domain: new URL(url).hostname,
            path: '/',
            httpOnly: true,
            secure: false
          };
          _context21.next = 11;
          return page.setCookie(cookie);
        case 11:
          _context21.next = 13;
          return page["goto"](url, {
            waitUntil: 'networkidle2'
          });
        case 13:
          _context21.next = 15;
          return page.evaluate(function () {
            return document.body.innerText;
          });
        case 15:
          bodyText = _context21.sent;
          searchString = 'Pinging';
          if (!bodyText.includes(searchString)) {
            _context21.next = 29;
            break;
          }
          pingRegex = /Pinging\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):\s+(\d+) ms/;
          match = bodyText.match(pingRegex);
          if (!match) {
            _context21.next = 26;
            break;
          }
          ipAddress = match[1];
          ping = match[2];
          _context21.next = 25;
          return browser.close();
        case 25:
          return _context21.abrupt("return", {
            ipAddress: ipAddress,
            ping: ping
          });
        case 26:
          _context21.next = 28;
          return browser.close();
        case 28:
          return _context21.abrupt("return", {
            ipAddress: "",
            ping: ""
          });
        case 29:
          _context21.next = 31;
          return browser.close();
        case 31:
          return _context21.abrupt("return", {
            ipAddress: "",
            ping: ""
          });
        case 32:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return _fetchDeviceData.apply(this, arguments);
}
function fetchDeviceData(_x9, _x10) {
  return _fetchDeviceData2.apply(this, arguments);
}
function _fetchDeviceData2() {
  _fetchDeviceData2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(token, deviceId) {
    var browser, page, url, cookie, bodyText, searchString, pingRegex, match, ipAddress, ping;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          console.log(deviceId);
          _context22.next = 3;
          return puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
          });
        case 3:
          browser = _context22.sent;
          _context22.next = 6;
          return browser.newPage();
        case 6:
          page = _context22.sent;
          url = "http://".concat(IpAddressOfACS, "/device-manager/#!/devices/").concat(deviceId);
          cookie = {
            name: 'session',
            value: "{\"AuthToken\":\"".concat(token, "\"}"),
            domain: new URL(url).hostname,
            path: '/',
            httpOnly: true,
            secure: false
          };
          _context22.next = 11;
          return page.setCookie(cookie);
        case 11:
          _context22.next = 13;
          return page["goto"](url, {
            waitUntil: 'networkidle2'
          });
        case 13:
          _context22.next = 15;
          return page.evaluate(function () {
            return document.body.innerText;
          });
        case 15:
          bodyText = _context22.sent;
          searchString = 'Pinging';
          if (!bodyText.includes(searchString)) {
            _context22.next = 26;
            break;
          }
          pingRegex = /Pinging\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):\s+(\d+) ms/;
          match = bodyText.match(pingRegex);
          if (!match) {
            _context22.next = 26;
            break;
          }
          ipAddress = match[1];
          ping = match[2];
          _context22.next = 25;
          return browser.close();
        case 25:
          return _context22.abrupt("return", {
            ipAddress: ipAddress,
            ping: ping
          });
        case 26:
          _context22.next = 28;
          return browser.close();
        case 28:
          return _context22.abrupt("return", {
            ipAddress: "",
            ping: ""
          });
        case 29:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  }));
  return _fetchDeviceData2.apply(this, arguments);
}
app.get("/iPAddress", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var token, deviceId, response;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          token = req.headers["authorization"].slice(7);
          deviceId = req.headers["deviceid"];
          _context4.next = 5;
          return fetchDeviceData(token, deviceId);
        case 5:
          response = _context4.sent;
          console.log(response);
          res.status(200).json(response);
          _context4.next = 14;
          break;
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.error("Error retrieving device data:", _context4.t0);
          res.status(500).json({
            error: "Internal server error"
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function (_x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
function runCommands(_x13, _x14) {
  return _runCommands.apply(this, arguments);
} // Configure linux machine throw ansible.
function _runCommands() {
  _runCommands = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(fileName, IpAddress) {
    var ansibleCommand, _yield$exec, ansibleOutput;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          ansibleCommand = "cd && ansible-playbook ".concat(fileName, " --limit ").concat(IpAddress);
          _context23.next = 4;
          return exec1(ansibleCommand);
        case 4:
          _yield$exec = _context23.sent;
          ansibleOutput = _yield$exec.stdout;
          return _context23.abrupt("return", {
            responce: ansibleOutput
          });
        case 9:
          _context23.prev = 9;
          _context23.t0 = _context23["catch"](0);
          return _context23.abrupt("return", {
            responce: _context23.t0.message
          });
        case 12:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 9]]);
  }));
  return _runCommands.apply(this, arguments);
}
app.post("/linuxConfig", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var devices, fileName, responses;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          devices = req.body.devices;
          if (!(!devices || devices.length === 0)) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            error: "IP address missing"
          }));
        case 4:
          fileName = "copy.yaml";
          _context6.next = 7;
          return Promise.all(devices.map(/*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(IpAddress) {
              var result;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    _context5.next = 3;
                    return runCommands(fileName, IpAddress);
                  case 3:
                    result = _context5.sent;
                    return _context5.abrupt("return", {
                      IpAddress: IpAddress,
                      result: result
                    });
                  case 7:
                    _context5.prev = 7;
                    _context5.t0 = _context5["catch"](0);
                    return _context5.abrupt("return", {
                      IpAddress: IpAddress,
                      result: "Error"
                    });
                  case 10:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[0, 7]]);
            }));
            return function (_x17) {
              return _ref6.apply(this, arguments);
            };
          }()));
        case 7:
          responses = _context6.sent;
          console.log(responses);
          res.json({
            status: 0,
            responses: responses
          });
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          console.error("Error processing Linux config.");
          res.status(500).json({
            status: -1,
            error: "Internal server error"
          });
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return function (_x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}());
app.post("/linux/reboot", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var devices, fileName, responses;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          devices = req.body.devices;
          if (!(!devices || devices.length === 0)) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            error: "IP address missing"
          }));
        case 4:
          fileName = "reboot.yaml";
          _context8.next = 7;
          return Promise.all(devices.map(/*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(IpAddress) {
              var result;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    _context7.next = 3;
                    return runCommands(fileName, IpAddress);
                  case 3:
                    result = _context7.sent;
                    return _context7.abrupt("return", {
                      IpAddress: IpAddress,
                      result: result
                    });
                  case 7:
                    _context7.prev = 7;
                    _context7.t0 = _context7["catch"](0);
                    return _context7.abrupt("return", {
                      IpAddress: IpAddress,
                      result: "Error"
                    });
                  case 10:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, null, [[0, 7]]);
            }));
            return function (_x20) {
              return _ref8.apply(this, arguments);
            };
          }()));
        case 7:
          responses = _context8.sent;
          res.json({
            status: 0,
            responses: responses
          });
          _context8.next = 15;
          break;
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.error("Error processing Linux reboot.");
          res.status(500).json({
            status: -1,
            error: "Internal server error"
          });
        case 15:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 11]]);
  }));
  return function (_x18, _x19) {
    return _ref7.apply(this, arguments);
  };
}());
app.post("/sendFile", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var devicesHeader, provisionHeader, provision, devices, responses, fileName, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          devicesHeader = req.headers.devices;
          provisionHeader = req.headers.provision;
          provision = parseInt(provisionHeader, 10);
          devices = devicesHeader ? JSON.parse(devicesHeader) : [];
          if (!(provision === 0 && devices.length === 0)) {
            _context10.next = 7;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            error: "IP address missing"
          }));
        case 7:
          responses = [];
          fileName = process.env.CallServerFileName || "Coral.yaml";
          if (!(provision === 1)) {
            _context10.next = 16;
            break;
          }
          _context10.next = 12;
          return runCommands(fileName, "SendAll");
        case 12:
          result = _context10.sent;
          responses = [{
            IpAddress: "All playbook IP addresses",
            result: result
          }];
          _context10.next = 20;
          break;
        case 16:
          if (!(provision === 0)) {
            _context10.next = 20;
            break;
          }
          _context10.next = 19;
          return Promise.all(devices.map(/*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(device) {
              var _result;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.prev = 0;
                    _context9.next = 3;
                    return runCommands(fileName, device.ipAddress);
                  case 3:
                    _result = _context9.sent;
                    return _context9.abrupt("return", {
                      IpAddress: device.ipAddress,
                      result: _result
                    });
                  case 7:
                    _context9.prev = 7;
                    _context9.t0 = _context9["catch"](0);
                    return _context9.abrupt("return", {
                      IpAddress: device.ipAddress,
                      result: "Error"
                    });
                  case 10:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9, null, [[0, 7]]);
            }));
            return function (_x23) {
              return _ref10.apply(this, arguments);
            };
          }()));
        case 19:
          responses = _context10.sent;
        case 20:
          res.json({
            status: 0,
            responses: responses
          });
          _context10.next = 27;
          break;
        case 23:
          _context10.prev = 23;
          _context10.t0 = _context10["catch"](0);
          console.error("Error sending file:", _context10.t0);
          res.status(500).json({
            status: -1,
            error: "Internal server error"
          });
        case 27:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 23]]);
  }));
  return function (_x21, _x22) {
    return _ref9.apply(this, arguments);
  };
}());
function checkFilePresenceByPath(filePath) {
  return new Promise(function (resolve) {
    fs.access(filePath, fs.constants.F_OK, function (err) {
      if (err) {
        console.error("File not found: ".concat(filePath));
        resolve(-1);
      } else {
        console.log("File exists: ".concat(filePath));
        resolve(1);
      }
    });
  });
}

// POST endpoint to submit DHCP configuration
app.post("/submitDHCPConfig", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var dhcpConfig, success;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          dhcpConfig = req.body;
          if (dhcpConfig) {
            _context11.next = 4;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            error: "DHCP configuration data missing"
          }));
        case 4:
          console.log("Received DHCP configuration:", dhcpConfig);
          _context11.next = 7;
          return updateDHCPConfig(dhcpConfig);
        case 7:
          success = _context11.sent;
          if (success) {
            res.json({
              status: 0,
              message: "DHCP configuration received and processed successfully"
            });
          } else {
            res.status(500).json({
              error: "Failed to update DHCP configuration"
            });
          }
          _context11.next = 15;
          break;
        case 11:
          _context11.prev = 11;
          _context11.t0 = _context11["catch"](0);
          console.error("Error processing DHCP configuration:", _context11.t0);
          res.status(500).json({
            error: "Internal server error"
          });
        case 15:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 11]]);
  }));
  return function (_x24, _x25) {
    return _ref11.apply(this, arguments);
  };
}());
var CurrentData = function CurrentData(configContent) {
  var configLines = configContent.split("\n");
  var config = {};
  configLines.forEach(function (line) {
    line = line.trim();
    if (line.startsWith("subnet")) {
      var parts = line.split("netmask").map(function (part) {
        return part.trim();
      });
      config.subnet = parts[0].split(" ")[1];
      config.netmask = parts[1].replace("{", "").trim();
    }
  });
  return config;
};

// Function to update DHCP configuration file
var updateDHCPConfig = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(dhcpConfig) {
    var dhcpFileContent, ConfigData, CurrSubnet, CurrNetmask, subnetConfigRegex, newConfig, Broadcast;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          if (!checkFilePresenceByPath(DHCP_CONFIG_FILE)) {
            _context12.next = 27;
            break;
          }
          dhcpFileContent = fs.readFileSync(DHCP_CONFIG_FILE, "utf8");
          _context12.next = 5;
          return CurrentData(dhcpFileContent);
        case 5:
          ConfigData = _context12.sent;
          CurrSubnet = ConfigData.subnet;
          CurrNetmask = ConfigData.netmask;
          console.log("Current Subnet: ".concat(CurrSubnet));
          console.log("Current Netmask: ".concat(CurrNetmask));
          subnetConfigRegex = new RegExp("subnet ".concat(CurrSubnet, " netmask ").concat(CurrNetmask, "\\s*{([^}]*)}"), "gm");
          newConfig = dhcpFileContent.match(subnetConfigRegex)[0];
          Broadcast = "";
          if (dhcpConfig.subnet) {
            Broadcast = "".concat(dhcpConfig.subnet.slice(0, dhcpConfig.subnet.lastIndexOf(".")), ".255");
          }
          if (dhcpConfig.subnet) {
            newConfig = newConfig.replace(/subnet\s+\d+\.\d+\.\d+\.\d+/, "subnet ".concat(dhcpConfig.subnet));
          }
          if (dhcpConfig.netmask) {
            newConfig = newConfig.replace(/netmask\s+\d+\.\d+\.\d+\.\d+/, "netmask ".concat(dhcpConfig.netmask));
          }
          if (dhcpConfig.range && dhcpConfig.range.start && dhcpConfig.range.end) {
            newConfig = newConfig.replace(/range\s+\d+\.\d+\.\d+\.\d+\s+\d+\.\d+\.\d+\.\d+;/, "range ".concat(dhcpConfig.range.start, " ").concat(dhcpConfig.range.end, ";"));
          }
          if (dhcpConfig.routers) {
            newConfig = newConfig.replace(/option routers \d+\.\d+\.\d+\.\d+;/, "option routers ".concat(dhcpConfig.routers, ";"));
          }
          if (Broadcast !== "") {
            console.log(Broadcast);
            newConfig = newConfig.replace(/option broadcast-address \d+\.\d+\.\d+\.\d+;/, "option broadcast-address ".concat(Broadcast, ";"));
          }
          if (dhcpConfig.dns) {
            newConfig = newConfig.replace(/option domain-name-servers \d+\.\d+\.\d+\.\d+;/, "option domain-name-servers ".concat(dhcpConfig.dns, ";"));
          }
          if (dhcpConfig.tftpServerName) {
            console.log(dhcpConfig.tftpServerName);
            dhcpFileContent = dhcpFileContent.replace(/option tftp-server-name "\d+\.\d+\.\d+\.\d+";/, "option tftp-server-name \"".concat(dhcpConfig.tftpServerName, "\";"));
          }
          dhcpFileContent = dhcpFileContent.replace(subnetConfigRegex, newConfig);
          fs.writeFileSync(DHCP_CONFIG_FILE, dhcpFileContent, "utf8");
          console.log("DHCP configuration file updated successfully.");
          _context12.next = 26;
          return restartDHCPService();
        case 26:
          return _context12.abrupt("return", true);
        case 27:
          return _context12.abrupt("return", false);
        case 30:
          _context12.prev = 30;
          _context12.t0 = _context12["catch"](0);
          console.error("Error updating DHCP configuration file:", _context12.t0);
          return _context12.abrupt("return", false);
        case 34:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 30]]);
  }));
  return function updateDHCPConfig(_x26) {
    return _ref12.apply(this, arguments);
  };
}();
function restartDHCPService() {
  exec("sudo systemctl restart isc-dhcp-server.service", function (error, stdout, stderr) {
    if (error) {
      console.error("Error restarting DHCP service: ".concat(error.message));
      return;
    }
    if (stderr) {
      console.error("DHCP service restart error: ".concat(stderr));
      return;
    }
    console.log("DHCP service restarted successfully");
  });
}
server.addMethod("sendFile", function (_ref13) {
  var sourcePath = _ref13.sourcePath,
    destinationPath = _ref13.destinationPath,
    destinationIP = _ref13.destinationIP,
    destinationUser = _ref13.destinationUser;
  return new Promise(function (resolve, reject) {
    var command = "scp ".concat(sourcePath, " ").concat(destinationUser, "@").concat(destinationIP, ":").concat(destinationPath);
    exec(command, function (error, stdout, stderr) {
      if (error) {
        console.error("Error executing scp command: ".concat(stderr));
        reject(new Error("Failed to send file"));
      } else {
        console.log("File sent successfully");
        resolve("File sent successfully");
      }
    });
  });
});
for (var _i = 0, _Object$keys = Object.keys(nets); _i < _Object$keys.length; _i++) {
  var name = _Object$keys[_i];
  var _iterator3 = _createForOfIteratorHelper(nets[name]),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var net = _step3.value;
      if (net.family === "IPv4" && !net.internal) {
        IpAddress = net.address;
        break;
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  if (IpAddress) {
    break;
  }
}

// Call server 
function generateAnsiblePlaybookOfCallServer(ip, filePath) {
  return "\n- hosts: ".concat(ip, "\n  tasks:\n    - name: Copy Coral from local to remote\n      copy:\n        src: \"").concat(filePath, "\"\n        dest: \"").concat(filePath, "\"\n        force: yes\n");
}
function generateAnsiblePlaybookOfReboot(ip) {
  return "\n- hosts: ".concat(ip, "\n  become: true\n  become_user: root\n  tasks:\n    - name: Rebooting the cloud server/bare metal box\n      reboot:\n");
}
function generateAnsiblePlaybookOfConfig(ip) {
  return "\n- hosts: ".concat(ip, "\n  tasks:\n    - name: Create multiple files\n      file:\n        path: \"{{ item }}\"\n        state: touch\n      loop:\n        - 'test01.txt'\n        - 'test02.txt'\n        - 'test03.txt'\n        - 'test04.txt'\n");
}
function generateAnsiblePlaybookHost(ip) {
  return "\n[".concat(ip, "]\n").concat(ip, "  \n");
}
var savePlaybookToFile = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(ip, provision) {
    var playbook, fileContent, outputFilePath, Defaultplaybook, updatedContent, foundSendAll, lines, _iterator4, _step4, line;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          fileContent = "";
          Defaultplaybook = generateAnsiblePlaybookHost(ip);
          if (!(provision === 2)) {
            _context13.next = 8;
            break;
          }
          outputFilePath = outputFilePathCallServer;
          playbook = generateAnsiblePlaybookOfCallServer(ip, filePath);
          _context13.next = 20;
          break;
        case 8:
          if (!(provision === 0)) {
            _context13.next = 13;
            break;
          }
          outputFilePath = outputFilePathReboot;
          playbook = generateAnsiblePlaybookOfReboot(ip);
          _context13.next = 20;
          break;
        case 13:
          if (!(provision === 1)) {
            _context13.next = 18;
            break;
          }
          outputFilePath = outputFilePathConfig;
          playbook = generateAnsiblePlaybookOfConfig(ip);
          _context13.next = 20;
          break;
        case 18:
          console.error("Invalid provision type");
          return _context13.abrupt("return");
        case 20:
          _context13.prev = 20;
          _context13.next = 23;
          return fsCallServer.readFile(outputFilePath, "utf8");
        case 23:
          fileContent = _context13.sent;
          _context13.next = 30;
          break;
        case 26:
          _context13.prev = 26;
          _context13.t0 = _context13["catch"](20);
          if (!(_context13.t0.code !== "ENOENT")) {
            _context13.next = 30;
            break;
          }
          throw _context13.t0;
        case 30:
          if (!(fileContent.trim() === "")) {
            _context13.next = 33;
            break;
          }
          _context13.next = 33;
          return fsCallServer.writeFile(outputFilePath, "---\n");
        case 33:
          if (fileContent.includes(playbook)) {
            _context13.next = 39;
            break;
          }
          _context13.next = 36;
          return fsCallServer.appendFile(outputFilePath, playbook);
        case 36:
          console.log("Playbook saved successfully!");
          _context13.next = 40;
          break;
        case 39:
          console.log("Playbook already exists in the file.");
        case 40:
          _context13.prev = 40;
          _context13.next = 43;
          return fsCallServer.readFile(HostsFile, "utf8");
        case 43:
          fileContent = _context13.sent;
          _context13.next = 50;
          break;
        case 46:
          _context13.prev = 46;
          _context13.t1 = _context13["catch"](40);
          if (!(_context13.t1.code !== "ENOENT")) {
            _context13.next = 50;
            break;
          }
          throw _context13.t1;
        case 50:
          updatedContent = '';
          foundSendAll = false;
          lines = fileContent.split('\n');
          _iterator4 = _createForOfIteratorHelper(lines);
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              line = _step4.value;
              if (line.trim() === '[SendAll]') {
                foundSendAll = true;
                updatedContent += line + '\n';
                if (!lines.slice(lines.indexOf(line) + 1).some(function (l) {
                  return l.trim() === ip;
                })) {
                  updatedContent += ip + '\n';
                }
              } else {
                updatedContent += line + '\n';
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
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
          _context13.next = 59;
          return fsCallServer.writeFile(HostsFile, updatedContent, 'utf8');
        case 59:
          _context13.next = 64;
          break;
        case 61:
          _context13.prev = 61;
          _context13.t2 = _context13["catch"](0);
          console.error("Error writing playbook to file:", _context13.t2);
        case 64:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 61], [20, 26], [40, 46]]);
  }));
  return function savePlaybookToFile(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
var deletePlaybookFromFile = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(ip, provision) {
    var playbookToDelete, outputFilePath, Defaultplaybook, fileContent, updatedContent, foundSendAll, ipFound, lines, _iterator5, _step5, line;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          Defaultplaybook = generateAnsiblePlaybookHost(ip);
          if (!(provision === 2)) {
            _context14.next = 7;
            break;
          }
          outputFilePath = outputFilePathCallServer;
          playbookToDelete = generateAnsiblePlaybookOfCallServer(ip, filePath);
          _context14.next = 19;
          break;
        case 7:
          if (!(provision === 0)) {
            _context14.next = 12;
            break;
          }
          outputFilePath = outputFilePathReboot;
          playbookToDelete = generateAnsiblePlaybookOfReboot(ip);
          _context14.next = 19;
          break;
        case 12:
          if (!(provision === 1)) {
            _context14.next = 17;
            break;
          }
          outputFilePath = outputFilePathConfig;
          playbookToDelete = generateAnsiblePlaybookOfConfig(ip);
          _context14.next = 19;
          break;
        case 17:
          console.error('Invalid provision type');
          return _context14.abrupt("return");
        case 19:
          _context14.next = 21;
          return fsCallServer.readFile(outputFilePath, 'utf8');
        case 21:
          fileContent = _context14.sent;
          if (!fileContent.includes(playbookToDelete)) {
            _context14.next = 29;
            break;
          }
          fileContent = fileContent.replace(playbookToDelete, '');
          _context14.next = 26;
          return fsCallServer.writeFile(outputFilePath, fileContent);
        case 26:
          console.log("Playbook removed successfully!");
          _context14.next = 30;
          break;
        case 29:
          console.log("Playbook not found in the file.");
        case 30:
          _context14.next = 32;
          return fsCallServer.readFile(HostsFile, 'utf8');
        case 32:
          fileContent = _context14.sent;
          updatedContent = '';
          foundSendAll = false;
          ipFound = false;
          lines = fileContent.split('\n');
          _iterator5 = _createForOfIteratorHelper(lines);
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              line = _step5.value;
              if (line.trim() === '[SendAll]') {
                foundSendAll = true;
                updatedContent += line + '\n';
                lines.slice(lines.indexOf(line) + 1).forEach(function (l) {
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
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
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
          _context14.next = 44;
          return fsCallServer.writeFile(HostsFile, updatedContent, 'utf8');
        case 44:
          _context14.next = 49;
          break;
        case 46:
          _context14.prev = 46;
          _context14.t0 = _context14["catch"](0);
          console.error("Error deleting playbook from file:", _context14.t0);
        case 49:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 46]]);
  }));
  return function deletePlaybookFromFile(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
app.post("/addIPAddress", /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _req$body2, provision, devices, ips, _iterator6, _step6, ip;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _req$body2 = req.body, provision = _req$body2.provision, devices = _req$body2.devices;
          if (!(!Array.isArray(devices) || devices.length === 0)) {
            _context15.next = 4;
            break;
          }
          return _context15.abrupt("return", res.status(400).json({
            status: 1,
            message: "No IP addresses provided"
          }));
        case 4:
          ips = devices.map(function (device) {
            return device.ipAddress;
          });
          _iterator6 = _createForOfIteratorHelper(ips);
          _context15.prev = 6;
          _iterator6.s();
        case 8:
          if ((_step6 = _iterator6.n()).done) {
            _context15.next = 14;
            break;
          }
          ip = _step6.value;
          _context15.next = 12;
          return savePlaybookToFile(ip, provision);
        case 12:
          _context15.next = 8;
          break;
        case 14:
          _context15.next = 19;
          break;
        case 16:
          _context15.prev = 16;
          _context15.t0 = _context15["catch"](6);
          _iterator6.e(_context15.t0);
        case 19:
          _context15.prev = 19;
          _iterator6.f();
          return _context15.finish(19);
        case 22:
          res.json({
            status: 0,
            message: "IP Address successfully added."
          });
          _context15.next = 29;
          break;
        case 25:
          _context15.prev = 25;
          _context15.t1 = _context15["catch"](0);
          console.error("Error processing request:", _context15.t1);
          res.status(500).json({
            status: 1,
            message: "Internal server error"
          });
        case 29:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 25], [6, 16, 19, 22]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
app.post("/addIPAddress/delete", /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var _req$body3, provision, devices;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _req$body3 = req.body, provision = _req$body3.provision, devices = _req$body3.devices;
          if (devices) {
            _context16.next = 4;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            status: 1,
            message: "No IP addresses provided"
          }));
        case 4:
          _context16.next = 6;
          return deletePlaybookFromFile(devices, provision);
        case 6:
          res.json({
            status: 0,
            message: "IP Address successfully deleted."
          });
          _context16.next = 13;
          break;
        case 9:
          _context16.prev = 9;
          _context16.t0 = _context16["catch"](0);
          console.error("Error processing request:", _context16.t0);
          res.status(500).json({
            status: 1,
            message: "Internal server error"
          });
        case 13:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 9]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());

// List IPs
var extractIpsFromPlaybook = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(filePath) {
    var data, ipRegex, match, ips;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return fsCallServer.readFile(filePath, "utf8");
        case 3:
          data = _context17.sent;
          ipRegex = /hosts:\s(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
          ips = [];
          while ((match = ipRegex.exec(data)) !== null) {
            ips.push(match[1]);
          }
          if (!(ips.length > 0)) {
            _context17.next = 11;
            break;
          }
          return _context17.abrupt("return", ips);
        case 11:
          return _context17.abrupt("return", []);
        case 12:
          _context17.next = 18;
          break;
        case 14:
          _context17.prev = 14;
          _context17.t0 = _context17["catch"](0);
          console.error("Error reading file:", _context17.t0);
          return _context17.abrupt("return", []);
        case 18:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 14]]);
  }));
  return function extractIpsFromPlaybook(_x35) {
    return _ref18.apply(this, arguments);
  };
}();
var extractIpsHostsFile = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(filePath) {
    var data, sendAllSection, ips, foundSendAll, i, line;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return fsCallServer.readFile(filePath, "utf8");
        case 3:
          data = _context18.sent;
          sendAllSection = data.split(/\r?\n/);
          ips = [];
          foundSendAll = false;
          i = 0;
        case 8:
          if (!(i < sendAllSection.length)) {
            _context18.next = 20;
            break;
          }
          line = sendAllSection[i].trim();
          if (!(line === "[SendAll]")) {
            _context18.next = 13;
            break;
          }
          foundSendAll = true;
          return _context18.abrupt("continue", 17);
        case 13:
          if (!foundSendAll) {
            _context18.next = 17;
            break;
          }
          if (!line.startsWith("[")) {
            _context18.next = 16;
            break;
          }
          return _context18.abrupt("break", 20);
        case 16:
          if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(line)) {
            ips.push(line);
          }
        case 17:
          i++;
          _context18.next = 8;
          break;
        case 20:
          return _context18.abrupt("return", ips);
        case 23:
          _context18.prev = 23;
          _context18.t0 = _context18["catch"](0);
          console.error("Error reading file:", _context18.t0);
          return _context18.abrupt("return", []);
        case 27:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 23]]);
  }));
  return function extractIpsHostsFile(_x36) {
    return _ref19.apply(this, arguments);
  };
}();
app.get("/getIpAddress", /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var provision, FilePathList, ips;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          provision = parseInt(req.headers.provision, 10);
          if (provision === 0) {
            FilePathList = outputFilePathReboot;
          } else if (provision === 1) {
            FilePathList = outputFilePathConfig;
          } else if (provision === 2) {
            FilePathList = outputFilePathCallServer;
          } else if (provision === 3) {
            FilePathList = "/etc/ansible/hosts";
          }
          if (!(provision !== 3)) {
            _context19.next = 9;
            break;
          }
          _context19.next = 6;
          return extractIpsFromPlaybook(FilePathList);
        case 6:
          ips = _context19.sent;
          _context19.next = 13;
          break;
        case 9:
          if (!(provision === 3)) {
            _context19.next = 13;
            break;
          }
          _context19.next = 12;
          return extractIpsHostsFile(FilePathList);
        case 12:
          ips = _context19.sent;
        case 13:
          res.json({
            status: 0,
            ips: ips
          });
          _context19.next = 20;
          break;
        case 16:
          _context19.prev = 16;
          _context19.t0 = _context19["catch"](0);
          console.error("Error processing request:", _context19.t0);
          res.status(500).json({
            status: 1,
            message: "Internal server error"
          });
        case 20:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 16]]);
  }));
  return function (_x37, _x38) {
    return _ref20.apply(this, arguments);
  };
}());
app.listen(port, IpAddress, function () {
  console.log("Server is running on http://".concat(IpAddress, ":").concat(port));
});