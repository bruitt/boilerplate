import R from "ramda"

import { bindActionCreators } from "redux"

export let sanitizeMods = R.pipe(
  R.filter(R.prop("mod")),
  R.keys,
  R.pick,
)

export let getPropTypes = R.pipe(
  R.filter(R.prop("type")),
  R.map(R.prop("type")),
)

export let getDefaultProps = R.pipe(
  R.filter(R.prop("default")),
  R.map(R.prop("default")),
)

/* eslint-disable no-bitwise, no-mixed-operators */
export let uuid = () => {
  let d = new Date().getTime()
  if (window.performance && R.is(Function, window.performance.now)) {
    d += performance.now()
  }
  let id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return ((c === "x") ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return id
}
/* eslint-enable no-alert, no-console */

export let shortid = () => R.take(10, window.btoa(uuid()))

export let normalizeBy = R.curry((propName, list) =>
  R.reduce((obj, item) => R.assoc(item[propName], item, obj), {}, list))

export let wrapActions = (actions) => {
  return (dispatch) => ({
    actions: bindActionCreators({ ...actions }, dispatch),
  })
}

export let testFeature = (feature) => {
  let featurePath = Array.isArray(feature) ? feature : [ feature ]
  return !!R.path(featurePath, process.env.FEATURES)
}

export let isValidEmail = (email) => {
  /* eslint-disable no-useless-escape */
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  /* eslint-enable no-useless-escape */
  return re.test(email)
}
