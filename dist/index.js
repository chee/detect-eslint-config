var ref = require('path');
var dirname = ref.dirname;
var resolve = ref.resolve;

var ref$1 = require('fs');
var existsSync = ref$1.existsSync;
var lstatSync = ref$1.lstatSync;

var PACKAGE_JSON = 'package.json'

var ESLINT_FILES =
  '.eslintrc.js .eslintrc.json .eslintrc .eslintrc.yaml .eslintrc.yml'
    .split(' ')

var ESLINT_NODE = 'eslintConfig'

var isDirectory = function (file) { return lstatSync(file).isDirectory(); }
var isRoot = function (directory) { return directory === resolve(directory, '..'); }

module.exports = function detectEslintConfig (file) {
  var directory = isDirectory(file) ? file : dirname(file)

  if (isRoot(directory)) { return false }

  var packageJson = resolve(directory, PACKAGE_JSON)

  var eslintFileDetected = !!ESLINT_FILES.find(function (eslintFile) { return existsSync(resolve(directory, eslintFile)); }
  )

  if (existsSync(packageJson)) {
    return eslintFileDetected || !!require(packageJson)[ESLINT_NODE]
  }

  return eslintFileDetected || detectEslintConfig(resolve(directory, '..'))
}
