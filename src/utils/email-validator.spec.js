class Emailvalidator {
  isValid (email) {
    return true
  }
}
describe('Email Validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = new Emailvalidator()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })
})
