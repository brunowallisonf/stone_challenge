const yup = require('yup');

module.exports = class CreateUserValidator {
  constructor() {
    this.validator = yup.object({
      fullname: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(5).max(15),
    });
  }
  async validate(data) {
    try {
      await this.validator.validate(data);
      return { isValid: true };
    } catch (error) {
      return { isValid: false, message: error.message };
    }
  }
};
