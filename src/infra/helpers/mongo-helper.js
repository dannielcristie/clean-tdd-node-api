const { MongoClient } = require('mongodb/lib/mongo_client')

module.exports = {
  async connect (uri, dbName) {
    this.uri = uri
    this.dbName = dbName
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = await this.client.db(dbName)
  },
  async disconnct () {
    await this.client.close()
  }
}
