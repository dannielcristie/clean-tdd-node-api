module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clen-tdd-node-api',
  tokenSecret: process.env.TOKEN_SECRET || 'secret'
}
