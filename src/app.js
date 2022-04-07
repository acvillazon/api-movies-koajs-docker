const koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');
const serve = require('koa-static');
const bodyparser = require('koa-bodyparser');
const render = require('koa-ejs');
const path = require('path');
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

///Serve Statics Filesc
app.use(serve(path.join(__dirname,'public')));

//Connect DB MONGO
require("./db.js")();

//Initial Middlewares
app.use(json());
app.use(bodyparser());
app.use(logger());

//View Configurations
render(app,{
  root: path.join(__dirname,"views"),
  viewExt:"html",
  layout:false,
})

//Routes Definitions
const router = require('./routes');
app.use(router.routes()).use(router.allowedMethods());

app.use( async ctx =>{
  await ctx.render("index");
});

app.listen(port, () => console.log(`Listening on ${port}`));