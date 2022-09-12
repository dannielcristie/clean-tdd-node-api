const AuthUseCase = require('./auth-usecase')
const { MissingParamError } = require('../../utils/errors')

const makeSut = () => {
  class LoadByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }
  const loadByEmailRepositorySpy = new LoadByEmailRepositorySpy()
  loadByEmailRepositorySpy.user = {}
  const sut = new AuthUseCase(loadByEmailRepositorySpy)
  return {
    sut,
    loadByEmailRepositorySpy
  }
}

describe('Auth UseCase', () => {
  test('Should throw if no email provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password provided', async () => {
    const { sut } = makeSut()
    const promise = sut.auth('any_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadByEmailRepository with correct email', async () => {
    const { sut, loadByEmailRepositorySpy } = makeSut()
    await sut.auth('any_email@mail.com', 'any_password')
    expect(loadByEmailRepositorySpy.email).toBe('any_email@mail.com')
  })

  test('Should throw if no loadByEmailRepository provided', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth('any_email@mail.com', 'any_password')
    expect(promise).rejects.toThrow()
  })

  test('Should throw if no loadByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({})
    const promise = sut.auth(' @mail.com', 'any_password')
    expect(promise).rejects.toThrow()
  })

  test('Should returns null if an invalid email is provide', async () => {
    const { sut, loadByEmailRepositorySpy } = makeSut()
    loadByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid_email@mail.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should returns null if an invalid password is provide', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth('any_email@mail.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })
})
