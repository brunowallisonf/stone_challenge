const counter = require('countapi-js');

class VisitsService {
  constructor(namespace, key) {
    this.key = key;
    this.namespace = namespace;
  }
  async registerVisit() {
    const result = await counter.hit(this.namespace, this.key);
    return result.value;
  }
  async getVisits() {
    const result = await counter.get(this.namespace, this.key);
    return result.value;
  }
}

module.exports = VisitsService;
