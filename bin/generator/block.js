let fs = require("fs-extra")
let path = require("path")

module.exports = function generateBlock(blockName) {
  if (!blockName) throw new Error("Empty blockName")
  let blockPath = path.resolve(__dirname, `../../src/blocks/${blockName}`)

  fs.outputFile(path.join(blockPath, `${blockName}.js`),
`// -- react
import { Component } from "react"

// -- bruitt
import hx from "@bruitt/hyperscript/dist/react"

// -- modules
// import $ from "jquery"

// -- blocks
// import * as Button from "app/blocks/Button"
// import Control from "app/blocks/Control"

// -- helpers
// import { wrapActions } from "app/helpers/utils"

// -- reducers
// import dataActions from "app/reducers/data"

// -- services
// import { localForage } from "app/services"

import styles from "./${blockName}.pcss"

let h = hx(styles)

class ${blockName} extends Component {
  render() {
    return h(".${blockName}")
  }
}

export default ${blockName}
`)

  fs.outputFile(path.join(blockPath, `${blockName}.pcss`),
`@import "../../styles/common.pcss";

.${blockName} {

}
`)

  fs.outputJson(path.join(blockPath, "package.json"), {
    name: blockName,
    version: "0.0.0",
    private: true,
    main: `./${blockName}.js`,
  })
}
