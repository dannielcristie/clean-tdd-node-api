const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
const MissingParamError = require('../../utils/errors/missing-param-error')
let db

const MakeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return null if no user is found', async () => {
    const sut = MakeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('Should return an user if user is found', async () => {
    const sut = MakeSut()
    const fakeUser = await db.collection('users').insertOne({
      email: 'valid_email@mail.com'
    })
    const user = await sut.load('valid_email@mail.com')
    expect(user.insertedId).toEqual(fakeUser._id)
  })

  test('Should throw if no email is provided', async () => {
    const sut = MakeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
