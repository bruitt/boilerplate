import { configureStore, renderAppComponent } from "@bruitt/app-entry"

import thunk from "redux-thunk"

import historySub, { setHistory } from "app/helpers/history"
import routerActions from "app/reducers/router"

import "./LandingStyles.pcss"
import rootApp from "./LandingApp"
import rootReducer from "./LandingReducer"
import routes from "./LandingRoutes"

let store = configureStore(rootReducer, {}, [ thunk ])

setHistory(process.env.HISTORY.Landing, routes)
historySub({
  defaultRoute: "notFound",
  reaction: (data) => store.dispatch(routerActions.change(data)),
})

let render = renderAppComponent(document.getElementById("mount"), store)
render(rootApp)

if (module.hot) {
  /* eslint-disable global-require */
  module.hot.accept("./LandingApp", () => {
    let nextApp = require("./LandingApp").default

    render(nextApp)
  })

  module.hot.accept("./LandingReducer", () => {
    let nextReducer = require("./LandingReducer").default

    store.replaceReducer(nextReducer)
  })
  /* eslint-enable global-require */
}
