const VisitsService = require('../VisitsService');
const countapi = require('countapi-js');
jest.mock('countapi-js', () => ({
  async hit() {
    return { value: 1 };
  },
  async get() {
    return { value: 1 };
  },
}));
const makeSut = () => {
  const sut = new VisitsService('test', 'test');

  return { sut };
};
describe('Visits service tests', () => {
  it('should return the values on registerVisit', async () => {
    const { sut } = makeSut();
    const result = await sut.registerVisit();

    expect(result).toEqual(1);
  });
  it('should return the values on getVisits', async () => {
    const { sut } = makeSut();
    const result = await sut.getVisits();
    expect(result).toEqual(1);
  });
  it('should registerVisit call services correctly', async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(countapi, 'hit');
    await sut.registerVisit();
    expect(spy).toHaveBeenCalledWith('test', 'test');
  });
  it('should getVisit call services correctly', async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(countapi, 'get');
    await sut.getVisits();
    expect(spy).toHaveBeenCalledWith('test', 'test');
  });
});
