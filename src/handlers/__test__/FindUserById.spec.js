const { ok } = require('../../helpers/http');
const UserRepository = require('../../repository/UserRepository');
const { FindUserById } = require('../FindUserById');

const makeUserRepositoryStub = () => {
  class UserRepositoryStub {
    async findById() {
      return {
        id: 'id',
        fullname: 'fullname',
        email: 'email@mail.com',
      };
    }
  }
  return new UserRepositoryStub();
};

const makeSut = () => {
  const userRepositoryStub = makeUserRepositoryStub();
  const sut = new FindUserById(userRepositoryStub);
  return {
    userRepositoryStub,
    sut,
  };
};

describe('FindUserById', () => {
  it('should create user correctly', async () => {
    const { sut } = makeSut();
    const result = await sut.handle({ params: { id: 'any_id' } });
    expect(result).toEqual(
      ok({
        user: {
          id: 'id',
          fullname: 'fullname',
          email: 'email@mail.com',
        },
      })
    );
  });
});
