const Base = require('./base');

class Value extends Base {
  constructor(name, module) {
    super(name, module);

    const self = this;

    self.resolved = module;

    return self;
  }

  inject() {
    const self = this;

    return self;
  }

  getModule() {
    const self = this;

    return self.resolved;
  }

  resolve(args) {
    const self = this;

    return self.getModule();

  }

  getDeps() {
    const self = this;

    return [];
  }
}

exports = module.exports = Value;
