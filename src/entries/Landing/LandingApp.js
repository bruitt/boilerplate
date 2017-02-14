// -- react
import { Component } from "react"

// -- bruitt
import hx from "@bruitt/hyperscript/dist/react"

// -- blocks
import Page from "app/blocks/Page"

import IndexPage from "app/blocks/IndexPage"

let h = hx({})

class LandingApp extends Component {
  render() {
    return h("div", [
      h(Page, { type: "notFound" }, h("div", "404 – not found")),
      h(Page, { type: "index" }, h(IndexPage)),
    ])
  }
}

export default LandingApp
