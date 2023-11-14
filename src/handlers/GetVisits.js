const counter = require('../config/counter');
const { ok } = require('../helpers/http');
const VisitsService = require('../services/VisitsService');
const adaptHandlers = require('./adapters/adaptHandlers');

class GetVisitors {
  constructor(visitsService) {
    this.visitsService = visitsService;
  }
  async handle() {
    const result = await this.visitsService.getVisits();
    return ok({ visits: result });
  }
}

module.exports.handler = adaptHandlers(
  new GetVisitors(new VisitsService(counter.namespace, counter.key))
);
