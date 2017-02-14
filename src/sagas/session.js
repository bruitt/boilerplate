import * as api from "app/services"

let saga = (task) => (dispatch) => {
  let put = (action) => new Promise(
    (resolve) => resolve(dispatch(action)),
  )
  let call = (fn, args) => Promise.resolve(fn(...args))

  return task(put, call)
}

export let takeRequestData = ({ payload }) => {
  return saga(async (put, call) => {
    // await put(actions.putLoading(true))

    await call(api.request, [ payload ])

    // await put(actions.putLoading(false))
  })
}

export let takeRequestData2 = ({ payload }) => {
  return saga(async (put, call) => {
    // await put(actions.putLoading(true))

    await call(api.request, [ payload ])

    // await put(actions.putLoading(false))
  })
}
