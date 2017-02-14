// -- react
import { Component } from "react"

// -- bruitt
import hx from "@bruitt/hyperscript/dist/react"

// -- blocks
import Link from "app/blocks/Link"

import styles from "./IndexPage.pcss"

let h = hx(styles)

class IndexPage extends Component {
  render() {
    return h(".IndexPage", [
      h(Link, { route: "pricing" }, [ "Pricing" ]),
    ])
  }
}

export default IndexPage
