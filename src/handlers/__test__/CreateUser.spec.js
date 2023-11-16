const { created } = require('../../helpers/http');
const { CreateUser } = require('../CreateUser');
const makeValidatorStub = () => {
  class ValidatorStub {
    async validate() {
      return { isValid: true };
    }
  }
  return new ValidatorStub();
};

const makeUserServiceStub = () => {
  class UserServiceStub {
    async createUser() {
      return {
        id: 'id',
        fullname: 'fullname',
        email: 'email@mail.com',
      };
    }
  }
  return new UserServiceStub();
};

const makeSut = () => {
  const validatorStub = makeValidatorStub();
  const userServiceStub = makeUserServiceStub();
  const sut = new CreateUser(userServiceStub, validatorStub);
  return {
    validatorStub,
    userServiceStub,
    sut,
  };
};

describe('CreateUser', () => {
  it('should create user correctly', async () => {
    const { sut } = makeSut();

    const result = await sut.handle({
      body: {
        fullname: 'fullname',
        email: 'email@mail.com',
        password: 'any_pass',
      },
    });

    expect(result).toEqual(
      created({
        user: {
          id: 'id',
          fullname: 'fullname',
          email: 'email@mail.com',
        },
      })
    );
  });
});
