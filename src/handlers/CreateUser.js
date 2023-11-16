const { ValidationError } = require('yup');
const UserAlreadyExistsException = require('../errors/UserAlreadyExistsError');
const { created, forbidden, badRequest } = require('../helpers/http');
const UserRepository = require('../repository/UserRepository');
const UserService = require('../services/UserService');
const Hasher = require('../utils/hasher');
const CreateUserValidator = require('../utils/validators/CreateUserValidator');
const adaptHandlers = require('./adapters/adaptHandlers');

class CreateUser {
  constructor(userService, validator) {
    this.userService = userService;
    this.userValidator = validator;
  }
  async handle(httpRequest) {
    const { fullname, email, password } = httpRequest.body;
    const validation = await this.userValidator.validate({
      fullname,
      email,
      password,
    });
    if (!validation.isValid) {
      return badRequest(new ValidationError(validation.message));
    }
    const user = await this.userService.createUser({
      fullname,
      email,
      password,
    });
    if (!user) {
      return forbidden(new UserAlreadyExistsException());
    }
    return created({ user });
  }
}
exports.CreateUser = CreateUser;
module.exports.handler = adaptHandlers(
  new CreateUser(
    new UserService(new UserRepository(), new Hasher(8)),
    new CreateUserValidator()
  )
);
