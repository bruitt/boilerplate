import R from "ramda"

import createReducer from "@bruitt/reducer"

let initialState = {
  type: null,
  params: {},
}

export default createReducer({
  change: R.always,
}, "ns/router", initialState)
