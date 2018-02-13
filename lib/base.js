const { IDENTITY, MODULE_IDENTITY } = require('./constants');

class Base {
  constructor(name, module) {
    const self = this;

    self.name = name;

    self[IDENTITY] = MODULE_IDENTITY;

    self.module = module;

    self.dependencies = [];

    self.resolved = null;

    return self;
  }

  getName() {
    const self = this;

    return self.name;
  }
}

exports = module.exports = Base;
