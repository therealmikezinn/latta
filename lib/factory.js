const _ = require('lodash');

const typeChecker = require('js-type-checker');

const Base = require('./base');

class Factory extends Base {
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

    if (typeChecker.isObject(self.resolved)) {
      return _.cloneDeep(self.resolved);
    }

    return self.resolved;
  }

  resolve(args) {
    const self = this;

    self.resolved = self.module.apply(null, args);

    return self.getModule();
  }

  getDeps() {
    const self = this;

    return self.dependencies.slice();
  }

}

exports = module.exports = Factory;
