const _ = require('lodash');
const pkg = require('../package.json');

const devDependencies = generate(pkg.devDependencies, '-D');
const dependencies = generate(pkg.dependencies, '-S');

console.log(`${devDependencies} && ${dependencies}`);

function generate(obj, key) {
  const string = _.reduce(obj, (total, _, key) => {
    total.push(key);
    return total;
  }, []).join(' ');

  return `npm i ${key} ${string}`;
}
