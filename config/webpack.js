require("require-yaml")

process.env.TARGET = process.env.TARGET || process.env.NODE_ENV || "production"

function getYml(path) {
  /* eslint-disable */
  let yml = {}
  try {
    yml = require(path)
  } catch (e) {
    yml = {}
  }
  return yml
  /* eslint-enable */
}

function getMultiTarget(key) {
  let target = process.env.TARGET

  let keyCommon = getYml(`./${key}.yml`)
  let keyConfig = keyCommon[target] || keyCommon.default || {}

  let keyTarget = getYml(`./${key}.${target}.yml`)
  let keyLocal = getYml(`./${key}.local.yml`)

  return Object.assign({}, keyConfig, keyTarget, keyLocal)
}

let webpackBuilder = require("@bruitt/webpack-builder")

let appConfig = getMultiTarget("webpack")
let envConfig = getMultiTarget("env")

Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key]
})

module.exports = webpackBuilder(appConfig, envConfig)
