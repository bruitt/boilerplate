import { Component } from "react"
import { connect } from "react-redux"

// import hx from '@bruitt/hyperscript/dist/react'

// let h = hx({})

class Page extends Component {
  render() {
    let { children, isPageActive } = this.props
    return isPageActive ? children : null
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isPageActive: state.router.type === ownProps.type,
  }
}

export default connect(mapStateToProps)(Page)
