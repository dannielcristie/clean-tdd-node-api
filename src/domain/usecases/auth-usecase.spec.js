const { MissingParamError } = require('../../utils/errors')
class AuthUseCase {
  constructor (loadByEmailRepository) {
    this.loadByEmailRepository = loadByEmailRepository
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    await this.loadByEmailRepository.load(email)
  }
}

const makeSut = () => {
  class LoadByEmailRepositorySpy {
    async load (email) {
      this.email = email
    }
  }
  const loadByEmailRepositorySpy = new LoadByEmailRepositorySpy()
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
})
