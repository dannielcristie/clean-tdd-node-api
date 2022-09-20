const cors = require('../middlewares/cors.js')
module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
}
