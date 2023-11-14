const { created } = require('../helpers/http');
const UserRepository = require('../repository/UserRepository');
const UserService = require('../services/UserService');
const Hasher = require('../utils/hasher');
const adaptHandlers = require('./adapters/adaptHandlers');

class CreateUser {
  constructor(userService) {
    this.userService = userService;
  }
  async handle(httpRequest) {
    console.log(httpRequest);
    const { fullname, email, password } = httpRequest.body;
    const user = await this.userService.createUser({
      fullname,
      email,
      password,
    });
    return created({ user });
  }
}

module.exports.handler = adaptHandlers(
  new CreateUser(new UserService(new UserRepository(), new Hasher(8)))
);
