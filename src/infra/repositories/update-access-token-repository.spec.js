const MissingParamError = require('../../utils/errors/missing-param-error')
const MongoHelper = require('../helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
let db

const MakeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('UpdateAccessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnct()
  })

  test('Should update the user with the given accessToken', async () => {
    const { sut, userModel } = MakeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_mail@email.com',
      password: 'valid_password'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')
    const updateFakeUser = await userModel.findOne({ _id: fakeUser.insertedId })
    expect(updateFakeUser.accessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = db.collection('users')
    const fakeUser = await userModel.insertOne({
      email: 'valid_mail@email.com',
      password: 'valid_password'
    })
    const promise = sut.update(fakeUser.insertedId, 'valid_token')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no params are provided', async () => {
    const { sut, userModel } = MakeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_mail@email.com',
      password: 'valid_password'
    })
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(fakeUser.insertedId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
