let fs = require("fs-extra")
let path = require("path")

module.exports = function generateReducer(reducerName) {
  if (!reducerName) throw new Error("Empty reducerName")
  let reducerPath = path.resolve(__dirname, "../../src/reducers")

  fs.outputFile(path.join(reducerPath, `${reducerName}.js`),
`import createReducer from "@bruitt/reducer"

let initialState = {
  flag: false
}

let setFlag = R.assoc("flag")

export default createReducer({
  setFlag
}, "ns/${reducerName}", initialState)
`)
}
