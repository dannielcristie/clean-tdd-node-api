const MongoHelper = require('./mongo-helper')

describe('Mongo Helper', () => {
  test('Should MongoHelper returns true if conncect and null if desconnect ', async () => {
    const sut = MongoHelper
    await sut.connect(process.env.MONGO_URL)
    expect(sut.db).toBeTruthy()
    await sut.disconnect()
    expect(sut.db).toBeFalsy()
    await sut.getCollection('users')
    expect(sut.db).toBeTruthy()
    await sut.disconnect()
  })
})
