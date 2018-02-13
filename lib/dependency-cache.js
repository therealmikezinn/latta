const typeChecker = require('js-type-checker');

class CacheCheck {
  constructor() {
    const self = this;

    self.store = new Map();
  }

  set(mod, dep) {
    const self = this;

    const key = `${mod}:${dep}`;

    self.store.set(key, true);
  }

  hasCycle(mod, dep) {
    const self = this;

    const key = `${dep}:${mod}`;

    const result = self.store.get(key);

    return !typeChecker.isUndefined(result);
  }
}

exports = module.exports = CacheCheck;
