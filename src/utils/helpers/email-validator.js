const validator = require('validator')
const MissingParamError = require('../errors/missing-param-error')

module.exports = class Emailvalidator {
  isValid (email) {
    if (!email) {
      throw new MissingParamError('email')
    }
    return validator.isEmail(email)
  }
}
