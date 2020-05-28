/* eslint-disable no-undef */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Responsive } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { HOME, SINGLE, CATEGORY, TAG } from '../../routes/index'
import PageHome from '../desktop/home'
import PageTaxonomy from '../desktop/taxonomy'
import PageContact from '../desktop/contact'
import PageSingle from '../desktop/single'
import Page404 from '../desktop/404'
import { FETCH_POST } from '../../components/article/actions'
import _ from 'lodash'
import './desktop.css'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {

  componentDidMount() {
    document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
    this.locationPathname = this.props.location.pathname
    window.scrollTo(0, 0)
  }

  locationChanged() {
    if (this.locationPathname !== this.props.location.pathname) return true; else return false;
  }

  componentDidUpdate() {
    if (this.locationChanged()) {
      window.scrollTo(0, 0);
      this.locationPathname = this.props.location.pathname
    }
  }

  /* In WordPress il form dei contatti è un plugin (wpcf7)
     espanso in una pagina statica (page) */
  isPageContact() {
    const { post } = this.props
    if (post.state === FETCH_POST)
      return post.data.type === 'page' && !_.isEmpty(post.data.wpcf7)

    return false
  }

  render() {
    const page = this.props.location.type
    let content = ''

    switch(page){
      case HOME:
        content = <PageHome/>
        break
      case CATEGORY:
        content = <PageTaxonomy tax={'categories'}/>
        break
      case TAG:
        content = <PageTaxonomy tax={'tags'}/>
        break
      case SINGLE:
        if(this.isPageContact())
          content = <PageContact/>
        else
          content = <PageSingle/>
        break
      default:
        content = <Page404/>
    }

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        {content}
      </Responsive>
    )
  }
}
DesktopContainer.propTypes = {
  children: PropTypes.node,
}

function mapStateToProps({ location, post }) {
  return { location, post }
}
export default connect(mapStateToProps, null)(DesktopContainer);