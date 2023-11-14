class UserService {
  constructor(userRepository, hasher) {
    this.userRepository = userRepository;
    this.hasher = hasher;
  }
  async createUser({ fullname, email, password }) {
    const userFound = await this.userRepository.findByEmail(email);
    if (userFound) {
      return null;
    }
    const hashedPassword = await this.hasher.hash(password, this.salts);
    return this.userRepository.create({
      fullname,
      email,
      password: hashedPassword,
    });
  }
}
module.exports = UserService;
