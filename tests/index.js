var it = require('tape')
var detectConfig = require('../dist')

it('correctly detects eslint config in a package.json', tape => {
  const hasConfig = detectConfig(`${__dirname}/package.json/beak.js`)
  tape.plan(1)
  tape.equal(hasConfig, true)
  tape.end()
})

it('correctly detects eslint config in a project root', tape => {
  const hasConfig = detectConfig(`${__dirname}/root/index.js`)
  tape.plan(1)
  tape.equal(hasConfig, true)
  tape.end()
})

it('correctly detects eslint config in a subdirectory', tape => {
  const hasConfig =
    detectConfig(`${__dirname}/subdirectory/help-me/charlie/index/.js`)
  tape.plan(1)
  tape.equal(hasConfig, true)
  tape.end()
})

it('returns false if no eslint config is detected', tape => {
  const hasConfig = detectConfig(`${__dirname}/none/pineapples.js`)
  tape.plan(1)
  tape.equal(hasConfig, false)
  tape.end()
})
