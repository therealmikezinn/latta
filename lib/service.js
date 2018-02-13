const _ = require('lodash');

const Base = require('./base');

class Service extends Base {
  constructor(name, module) {
    super(name, module);

    const self = this;

    return self;
  }

  inject(dependencies) {
    const self = this;

    self.dependencies = [].concat.call(self.dependencies, dependencies);

    return self;
  }

  getModule() {
    const self = this;

    return _.cloneDeep(self.resolved);
  }

  resolve(args) {
    const self = this;

    self.resolved = new (self.module.bind.apply(self.module, [self.module, ...args]))();

    return self.getModule();
  }

  getDeps() {
    const self = this;

    return self.dependencies.slice();
  }
}

exports = module.exports = Service;
