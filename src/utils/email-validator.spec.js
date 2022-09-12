const validator = require('validator')
class Emailvalidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

const makeSut = () => {
  return new Emailvalidator()
}
describe('Email Validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns flase', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })
})