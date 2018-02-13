const Service = require('./service');

const Value = require('./value');

const Factory = require('./factory');

const DependencyCache = require('./dependency-cache');

const { IDENTITY, IOC_IDENTITY } = require('./constants');

const hasOwn = {}.hasOwnProperty;

class IOC {
  constructor() {
    const self = this;

    self[IDENTITY] = IOC_IDENTITY;

    self.containers = {};
  }

  bootstrap() {
    const self = this;

    const cache = new DependencyCache();

    Object.keys(self.containers).forEach((container) => {
      const current = self.containers[container];

      if (current.resolved === null) {
        self.resolveDependencies(container, current.getDeps(), cache);
      }
    });
  }

  containerExists(name) {
    const self = this;

    return hasOwn.call(self.containers, name);
  }

  get(name) {
    const self = this;

    if (!self.containerExists(name)) {
      throw new Error('Module Doesn\'t Exist');
    }

    return self.containers[name].getModule();
  }

  getContainer(name) {
    const self = this;

    if (!self.containerExists(name)) {
      throw new Error("Module Doesn't Exist");
    }

    return self.containers[name];
  }

  getContainers() {
    const self = this;

    return self.containers;
  }

  resolveDependencies(container, deps, cache) {
    const self = this;

    const resolvedDependencies = [];

    const currentModule = self.getContainer(container);

    for (let i = 0, len = deps.length; i < len; i++) {
      const dependencyName = deps[i];

      if (cache.hasCycle(container, dependencyName)) {
        throw new Error("CIRCULAR DEPENDENCIES");
      }

      cache.set(container, dependencyName);

      const currentDependency = self.getContainer(dependencyName);

      if (currentDependency.resolved !== null) {
        resolvedDependencies.push(currentDependency.getModule());
      } else {
        resolvedDependencies.push(
          self.resolveDependencies(
            dependencyName,
            currentDependency.getDeps(),
            cache
        ));
      }
    }

    return currentModule.resolve(resolvedDependencies);
  }

  register(injector) {
    const self = this;

    const name = injector.getName();

    if (self.containerExists(name)) {
      throw new Error("Module Already Exists");
    }

    self.containers[name] = injector;

    return self;
  }

  static service(name, mod) {
    return new Service(name, mod);
  }

  static value(name, mod) {
    return new Value(name, mod);
  }

  static factory(name, mod) {
    return new Factory(name, mod);
  }
}

exports = module.exports = IOC;
