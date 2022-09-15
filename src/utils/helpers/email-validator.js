const validator = require('validator')
module.exports = class Emailvalidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}
