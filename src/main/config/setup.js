const cors = require('../middlewares/cors.js')
const jsonParser = require('../middlewares/json-parser')
module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser)
}
