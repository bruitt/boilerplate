import axios from "axios"

let axiosConfig = {
  baseURL: "/api",
}

let axtask = axios.create(axiosConfig)

export let request = (data) => axtask.post("/request", data)
export let request2 = (data) => axtask.post("/request", data)
