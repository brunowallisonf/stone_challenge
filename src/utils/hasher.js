const bcrypt = require('bcrypt');
class Hasher {
  constructor(salts) {
    this.salts = salts;
  }
  async hash(data) {
    return bcrypt.hash(data, this.salts);
  }
}

module.exports = Hasher;
