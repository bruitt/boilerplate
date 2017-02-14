import R from "ramda"

import { Component } from "react"

import hx from "@bruitt/hyperscript/dist/react"

import { historyAct, getNamedRoute } from "app/helpers/history"

import styles from "./Link.pcss"

let h = hx(styles)

export default class Link extends Component {
  static defaultProps = {
    action: "push",
    disabled: false,
  }

  onClick = (e) => {
    let { disabled, onClick, route, action } = this.props
    e.preventDefault()

    if (!disabled) {
      historyAct({ route, action })
      if (onClick) {
        onClick(e)
      }
    }
  }

  render() {
    let { action, route, url } = this.props
    let props = R.omit([ "action", "route", "url" ], this.props)

    if (route) {
      props.onClick = this.onClick
      props.href = getNamedRoute(route).href
    } else if (action) {
      props.onClick = this.onClick
      props.href = "#"
    } else if (url) {
      if (!props.target) {
        props.target = "_blank"
      }
      props.href = url
    }

    if (props.target === "_blank") {
      props.rel = "noopener norefferer"
    }

    // props.mods = { nofocus: props.nofocus }
    // props = R.dissoc('nofocus', props)
    // this.href = props.href

    return h("a.Link", props)
  }
}
