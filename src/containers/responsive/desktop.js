
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Container,
  Responsive,
  Segment,
  Visibility,
  Menu,
} from 'semantic-ui-react'
import Heading from '../../components/heading';
import WpMenu from '../../components/wp-menu'
import { connect } from 'react-redux'
import { HOME } from '../../actions/index'
import './desktop.css'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const page = this.props.location.type
    const { fixed } = this.state

    if (page === HOME) {
      return (
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              vertical
              className={'main'}
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  <WpMenu name={'main_menu'} fixed={fixed} />
                </Container>
              </Menu>
              <Heading />
            </Segment>
          </Visibility>

          {children}
        </Responsive>
      )
    }
    else {
      return (
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Menu
            id={'top-menu'}
            fixed={'top'}
            inverted={false}
            pointing={false}
            secondary={false}
            size='large'
          >
            <Container>
              <WpMenu name={'main_menu'} fixed={true} />
            </Container>
          </Menu>
          <Segment className={'spacer'}/>
          {children}
        </Responsive>
      )
    }
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

function mapStateToProps({ location }) {
  return { location }
}
export default connect(mapStateToProps, null)(DesktopContainer);