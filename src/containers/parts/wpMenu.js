import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import { fetchMenu, SINGLE } from '../../actions';
import { Menu, Container, Sidebar } from 'semantic-ui-react'
import { getRelativeUrl } from '../../utils/index'

class WpMenu extends Component {
  componentDidMount() {
    this.props.actions.fetchMenu(this.props.name);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.name === nextProps.menu.name;
  }

  getPayloadFromUrl(key, url) {
    url = getRelativeUrl(url)
    let res = url.split(`/${key}/`)
    if (res.length === 2) {
      return res[1]
    }
    return ''
  }

  makeLink(item) {
    switch (item.type) {
      case 'taxonomy':
        return <Link to={{
          type: item.object.toUpperCase(),
          payload: {
            slug: this.getPayloadFromUrl(item.object, item.url)// es object = 'category'
              .replace(/\//g, '')
          }
        }}>{item.title}</Link>
      case 'custom':
        return <a href={item.url}>{item.title}</a>
      case 'post_type':// type: page | post
        let pageId = ''
        let url = getRelativeUrl(item.url)
        if (url.indexOf('page_id') > 0) {
          const id = url.split('=')[1]
          pageId = `/page_id/${id}`
          return <Link to={{
            type: item.title,
            payload: {
              path: pageId
            }
          }}>{item.title}</Link>
        }
        else {
          return <Link to={{
            type: SINGLE,
            payload: {
              slug: getRelativeUrl(item.url).replace(/\//g, '')
            }
          }}>{item.title}</Link>
        }
      default: ;
    }
  }

  renderMenu(menu) {
    if (this.props.name === menu.name) {
      return menu.items.map(item => {
        return (
          <Menu.Item key={item.ID}>
            {this.makeLink(item)}
          </Menu.Item>
        );
      });
    }
  }

  getClasses(location = '') {
    switch (location) {
      case 'main_menu':
        return 'navbar-nav mr-auto';
      case 'footer_menu':
        return 'nav justify-content-center';
      default:
        return '';
    }
  }

  render() {
    return (
      <Container style={{ display: 'flex' }} className={this.getClasses(this.props.menu.name)}>
        {this.renderMenu(this.props.menu)}
        {this.props.children}
      </Container>
    );
  }
}

function mapStateToProps({ menu }) {
  return { menu };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchMenu }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WpMenu);