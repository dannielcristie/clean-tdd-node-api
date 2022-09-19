const MongoHelper = require('./mongo-helper')

describe('Mongo Helper', () => {
  test('Should MongoHelper returns true if conncect and null if desconnect ', async () => {
    const sut = MongoHelper
    await sut.connect(process.env.MONGO_URL)
    expect(sut.db).toBeTruthy()
    await sut.disconnct()
    expect(sut.db).toBeFalsy()
  })
})
