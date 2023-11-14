const UserNotFoundException = require('../errors/UserNotFoundError');
const { ok, notFound } = require('../helpers/http');
const UserRepository = require('../repository/UserRepository');
const adaptHandlers = require('./adapters/adaptHandlers');

class FindUserById {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async handle(httpRequest) {
    const { id } = httpRequest.params;
    const user = await this.userRepository.findById(id);
    if (!user) {
      return notFound(new UserNotFoundException());
    }
    return ok({ user });
  }
}

module.exports.handler = adaptHandlers(new FindUserById(new UserRepository()));
