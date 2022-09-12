const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class AuthUseCase {
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
    if (!this.loadByEmailRepository) {
      throw new MissingParamError('loadByEmailRepository')
    }
    if (!this.loadByEmailRepository.load) {
      throw new InvalidParamError('loadByEmailRepository')
    }
    const user = await this.loadByEmailRepository.load(email)
    if (!user) {
      return null
    }
  }
}
