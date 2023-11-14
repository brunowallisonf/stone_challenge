const { ok } = require('../helpers/http');
const VisitsService = require('../services/VisitsService');
const adaptHandlers = require('./adapters/adaptHandlers');

class IncrementVisitors {
  constructor(visitsService) {
    this.visitsService = visitsService;
  }
  async handle() {
    const result = await this.visitsService.registerVisit();
    return ok({ visits: result });
  }
}

module.exports.handler = adaptHandlers(
  new IncrementVisitors(new VisitsService('bwfwn912', '1234'))
);
