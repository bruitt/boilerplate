let fs = require("fs-extra")
let path = require("path")

module.exports = function generateEntry(entryName) {
  if (!entryName) throw new Error("Empty entryName")
  let entryPath = path.resolve(__dirname, `../../src/entries/${entryName}`)

  fs.outputFile(path.join(entryPath, `${entryName}.js`),
`import { configureStore, renderAppComponent } from "@bruitt/app-entry"

import thunk from "redux-thunk"

import historySub, { setHistory } from "app/helpers/history"
import routerActions from "app/reducers/router"

import "./${entryName}Styles.pcss"
import rootApp from "./${entryName}App"
import rootReducer from "./${entryName}Reducer"
import routes from "./${entryName}Routes"

let store = configureStore(rootReducer, {}, [ thunk ])

setHistory(process.env.HISTORY.${entryName}, routes)
historySub({
  defaultRoute: "notFound",
  reaction: (data) => store.dispatch(routerActions.change(data)),
})

let render = renderAppComponent(document.getElementById("mount"), store)
render(rootApp)

if (module.hot) {
  /* eslint-disable global-require */
  module.hot.accept("./${entryName}App", () => {
    let nextApp = require("./${entryName}App").default

    render(nextApp)
  })

  module.hot.accept("./${entryName}Reducer", () => {
    let nextReducer = require("./${entryName}Reducer").default

    store.replaceReducer(nextReducer)
  })
  /* eslint-enable global-require */
}
`)

  fs.outputFile(path.join(entryPath, `${entryName}App.js`),
`// -- react
import { Component } from "react"

// -- bruitt
import hx from "@bruitt/hyperscript/dist/react"

// -- blocks
// import Page from "app/blocks/Page"

let h = hx({})

class ${entryName}App extends Component {
  render() {
    return h("div", [
      // h(Page, { type: "notFound" }, h(ErrorScreen, { displayText: "404" })),
    ])
  }
}

export default ${entryName}App
`)

  fs.outputFile(path.join(entryPath, `${entryName}Reducer.js`),
`// import data from "app/reducers/data"
import router from "app/reducers/router"

export default {
  // data,
  router,
}
`)

  fs.outputFile(path.join(entryPath, `${entryName}Routes.js`),
`export default {
  notFound: "/404",
  index: "/",
}
`)

  fs.outputFile(path.join(entryPath, `${entryName}Styles.pcss`),
`@import "../../styles/common.pcss";

:global {
  :root {
    color: $black;
    background-color: $bgWhite;
    @mixin sansSerif;
  }
}
`)

  fs.outputJson(path.join(entryPath, "package.json"), {
    name: entryName,
    version: "0.0.0",
    private: true,
    main: `./${entryName}.js`,
  })
}
