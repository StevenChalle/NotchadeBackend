'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-core/register");

var mySql = require('koa-mysql');

var koa = new _koa2.default();
var router = new _koaRouter2.default();
var port = process.env.PORT || 3000;

// Create a MySQL connection pool (do this once)
var db = mySql.createPool({ user: 'b4c5e189354a3e', password: '74c379b4', database: 'heroku_f29c10b338ad8b7', host: 'us-cdbr-iron-east-01.cleardb.net' });

// koa.use(function* () {
//   try {
//       // Execute a sample query (with params)
//       var rows = yield db.query("select firstname as name from testingdb");
//       // Output test result (3)
//       this.body = { test: rows[0].name };
//     }
//     catch (err) {
//       // 500 Internal Server Error
//       this.status = 500;
//       this.body = { error: err };
//     }
// })
//router

// koa.use(function * () {
//     // Execute a sample query (with params)
//     var rows = yield db.query("select firstname as name from testingdb");
//     // Output test result (3)
//     this.body = { test: rows[0].name };
// })

// router.get('/:name', async (ctx) => {
//   // Execute a sample query (with params)
//   new Promise((resolve, reject) => {
//     try {
//       let result = db.query("select firstname as name from testingdb")
//       resolve(result);
//     }
//     catch (error) {
//       reject(error);
//     }
//   }).then((result) => {
//     ctx.body = "yo" + result;//resolve[0].name;
//   }).catch((result) => {
//     ctx.body = "Error with promise";
//   })
//
//   //ctx.body = `Hello, ${ctx.params.name}!\n`;
// });

router.get('/:name', function () {
   var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  //let nameInDb = await getNameInDb();
                  ctx.body = 'Hello, ' + ctx.params.name + '!\n'; //nameInDb;

               case 1:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, undefined);
   }));

   return function (_x) {
      return _ref.apply(this, arguments);
   };
}());

// async function getNameInDb() {
// try {
//     let result = await db.query("select firstname as name from testingdb")
//     return result[0];
// }
// catch (error) {
//   console.log(error);
//   ctx.throw(400, 'INVALID_DATA')
// }
//}

koa.use(router.routes());
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