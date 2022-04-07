const koaRouter = require('koa-router');
const router = new koaRouter();

//Routes For Movies
require("./routes/movie.route")(router);

//Other Routes....

module.exports = router;