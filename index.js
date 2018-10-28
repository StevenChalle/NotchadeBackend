require("babel-core/register");
require("babel-polyfill");
import Koa from 'koa';
import Router from 'koa-router';


const koa = new Koa();
const app = new Router();
const port = process.env.PORT || 3000;
app.get('/:name', async (ctx) => {
  ctx.body = `Hello, ${ctx.params.name}!\n`;
});

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
