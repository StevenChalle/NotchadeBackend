"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-core/register");
require("babel-polyfill");


var koa = new _koa2.default();
var app = new _koaRouter2.default();
var port = process.env.PORT || 3000;
app.get('/:name', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.body = "Hello, " + ctx.params.name + "!\n";

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

koa.use(app.routes());
koa.listen(port).on('error', console.log);
console.log("Server listenning on port =" + port);

//Node only server

//const http = require('http');
//
// const getDate = require('./date.js');
//
// let server = http.createServer((req, res) => {
//     let html = `<h1>Environment Variables</h1><br>`;
//     // Add new code to test the live reload
//     html += `<h2>As of: ${getDate()}</h2><br>`;
//     // Iterate over `process.env` object and
//     // print its values.
//     Object.keys(process.env).forEach((k) => {
//         html += `${k} = ${process.env[k]} <br>`
//     });
//     // Set the response status and response content
//     // type header
//     res.writeHead(200, {
//         'content-type': 'text/html'
//     });
//     return res.end(html);
// });
//
// // start listening
// server.listen(port);
// console.log(`Server running on port ${port}`);