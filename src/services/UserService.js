class UserService {
  constructor(userRepository, hasher) {
    this.userRepository = userRepository;
    this.hasher = hasher;
  }
  async createUser({ name, email, password }) {
    const hashedPassword = await this.hasher.hash(password, this.salts);
    return this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
module.exports = UserService;
