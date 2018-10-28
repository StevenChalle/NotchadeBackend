require("babel-core/register");
import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
const mySql = require('koa-mysql');

const koa = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

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

router.get('/:name', async (ctx) => {
   //let nameInDb = await getNameInDb();
   ctx.body = `Hello, ${ctx.params.name}!\n`//nameInDb;
});

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
