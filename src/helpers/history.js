import R from "ramda"

import createHistory from "history/createBrowserHistory"
import UrlPattern from "url-pattern"

let history = {}
let historyConfig = {}
let historyRoutes = {}
let historyPatterns = {}

export function setHistory(config, routes) {
  historyConfig = config || {}
  historyRoutes = routes || {}
  history = createHistory(historyConfig)
}

export function getHistory() {
  return history
}

export function getHistoryConfig() {
  return historyConfig
}

export function getHistoryRoutes() {
  return historyRoutes
}

export function getNamedRoute(route) {
  let pattern = historyPatterns[route]
  let url = pattern.stringify()
  return {
    href: `${historyConfig.basename || ""}${url}`,
    pattern,
    url,
  }
}

export function historyAct({ action = "push", route, params, url }) {
  if (action === "back") {
    history.goBack()
    return
  }

  if (url) {
    if (action === "replace") {
      location.replace(url)
      return
    }
    if (action === "push") {
      location.href = url
      return
    }
  }

  if (route) {
    let pattern = getNamedRoute(route).pattern
    let routeUrl = pattern.stringify(params || {})

    if (action === "replace") {
      history.replace(routeUrl)
      return
    }
    if (action === "push") {
      /* eslint-disable fp/no-mutating-methods */
      history.push(routeUrl)
      /* eslint-enable fp/no-mutating-methods */
    }
  }
}

let oakley = (patterns, notFound) => (location) => {
  let routeType = R.find((route) => {
    return patterns[route].match(location)
  }, R.keys(patterns))

  if (!routeType) {
    return { type: notFound, params: {} }
  }

  return {
    type: routeType,
    params: patterns[routeType].match(location),
  }
}

function historySub({ defaultRoute, reaction }) {
  historyPatterns = R.map((url) => new UrlPattern(url), historyRoutes)
  let router = oakley(historyPatterns, defaultRoute)

  if (window && window.location) {
    let location = window.location.pathname
    let { basename } = historyConfig
    if (basename) {
      location = location.replace(basename, "")
    }
    reaction(router(location))
  }

  return history.listen((location) => {
    try {
      reaction(router(location.pathname))
    } catch (error) {
      reaction({ type: "error", params: { error } })
    }
  })
}

export default historySub
