const koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
var swagger = require('swagger-koa');
const port = process.env.PORT || 8090;
const app = new koa();

app.use(swagger.init({
  apiVersion: '1.0',
  swaggerVersion: '1.0',
  swaggerURL: '/swagger',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public/swagger/',
  basePath: `http://localhost:8090`,
  info: {
    title: 'swagger-koa sample app',
    description: 'Swagger + Koa = {swagger-koa}'
  },
  apis: ['./src/controllers/movie.controller.js']
}));

//Connect DB MONGO
require("./db.js")();

//Initial Middlewares
app.use(json());
app.use(bodyparser());
app.use(logger());

//Routes Definitions
const router = require('./routes');
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`Listening on ${port}`));