const UserService = require('../UserService');
const makeUserRepositoryStub = () => {
  class UserRepositoryStub {
    async create() {
      return {
        id: 'any_id',
        fullname: 'any_name',
        email: 'any_email@mail.com',
      };
    }

    async findByEmail() {
      return undefined;
    }
  }
  return new UserRepositoryStub();
};
const makeHasherStub = () => {
  class HasherStub {
    constructor() {
      this.salts = 8;
    }
    async hash() {
      return 'hashed_data';
    }
  }
  return new HasherStub();
};
const makeSut = () => {
  const hasherStub = makeHasherStub();
  const userRepositoryStub = makeUserRepositoryStub();
  const sut = new UserService(userRepositoryStub, hasherStub);
  return {
    hasherStub,
    userRepositoryStub,
    sut,
  };
};
describe('UserService ', () => {
  it('should return the created users received from the UserRepository', async () => {
    const { sut } = makeSut();

    const createdUser = await sut.createUser({
      id: 'id',
      fullname: 'fullname',
      email: 'email@mail.com',
    });

    expect(createdUser).toEqual({
      id: 'any_id',
      fullname: 'any_name',
      email: 'any_email@mail.com',
    });
  });
  it('should return null when an user already exists', async () => {
    const { sut, userRepositoryStub } = makeSut();
    jest.spyOn(userRepositoryStub, 'findByEmail').mockResolvedValue({
      id: 'any_id',
      fullname: 'any_name',
      email: 'any_email@mail.com',
    });
    const createdUser = await sut.createUser({
      id: 'id',
      fullname: 'fullname',
      email: 'email@mail.com',
    });

    expect(createdUser).toEqual(null);
  });

  it('should call dependencies correctly', async () => {
    const { sut, userRepositoryStub, hasherStub } = makeSut();
    const repositorySpy = jest.spyOn(userRepositoryStub, 'create');
    const hasherSpy = jest.spyOn(hasherStub, 'hash');
    await sut.createUser({
      id: 'id',
      fullname: 'fullname',
      email: 'email@mail.com',
      password: 'any_pass',
    });
    expect(hasherSpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(hasherSpy).toHaveBeenCalledWith('any_pass');
    expect(repositorySpy).toHaveBeenCalledWith({
      fullname: 'fullname',
      email: 'email@mail.com',
      password: 'hashed_data',
    });
  });
});
