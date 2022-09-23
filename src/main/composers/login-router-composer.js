const LoginRouter = require('../../presentation/routers/login-router')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const Emailvalidator = require('../../utils/helpers/email-validator')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const Encrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const env = require('../config/env')

const tokenGenerator = new TokenGenerator(env.tokenSecret)
const encrypter = new Encrypter()
const updateAccessTokenRepository = new UpdateAccessTokenRepository()
const loadUserByEmailRepository = new LoadUserByEmailRepository()
const emailvalidator = new Emailvalidator()
const authUseCase = new AuthUseCase({
  loadUserByEmailRepository,
  updateAccessTokenRepository,
  encrypter,
  tokenGenerator
})
const loginRouter = new LoginRouter({
  authUseCase,
  emailvalidator
})

module.exports = loginRouter
