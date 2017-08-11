const {dirname, resolve} = require('path')

const {existsSync, lstatSync} = require('fs')

const PACKAGE_JSON = 'package.json'

const ESLINT_FILES =
  '.eslintrc.js .eslintrc.json .eslintrc .eslintrc.yaml .eslintrc.yml'
    .split(' ')

const ESLINT_NODE = 'eslintConfig'

const isDirectory = file => lstatSync(file).isDirectory()
const isRoot = directory => directory === resolve(directory, '..')

module.exports = function detectEslintConfig (file) {
  const directory = isDirectory(file) ? file : dirname(file)

  if (isRoot(directory)) return false

  const packageJson = resolve(directory, PACKAGE_JSON)

  const eslintFileDetected = !!ESLINT_FILES.find(eslintFile =>
    existsSync(resolve(directory, eslintFile))
  )

  if (existsSync(packageJson)) {
    return eslintFileDetected || !!require(packageJson)[ESLINT_NODE]
  }

  return eslintFileDetected || detectEslintConfig(resolve(directory, '..'))
}
