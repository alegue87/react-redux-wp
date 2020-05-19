/* eslint-disable no-undef */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import { fetchMenu, SINGLE, HOME } from '../../actions';
import { Menu, Container, Button } from 'semantic-ui-react'
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

  isLinkActive(relPath){
    let pathname = this.props.location.pathname
    if(pathname === '/'){
      return pathname === relPath
    }
    else{
      return pathname+'/' === relPath
    }
  }

  makeLink(item) {
    switch (item.type) {
      case 'taxonomy':
        return <Link 
          to={{
            type: item.object.toUpperCase(),
            payload: {
              slug: this.getPayloadFromUrl(item.object, item.url)// es object = 'category'
                .replace(/\//g, '')
            }
          }}
        >{item.title}</Link>
      case 'custom':
        return <a href={item.url}>{item.title}</a>
      case 'post_type':
        // type: page | post
        // Se il relative url è del tipo ?page_id=num 
        // significa che la pagina inserita nel menu è 
        // in stato draft ( e non ci dovrebbe essere )
        // quindi è ok che sia not-found
        return <Link 
          to={{
            type: SINGLE,
            payload: {
              slug: getRelativeUrl(item.url).replace(/\//g, '')
            }
          }}
        >{item.title}</Link>
      default: ;
    }
  }

  renderMenu(menu) {
    if (this.props.name === menu.name) {
      return menu.items.map(item => {
        return (
          <Menu.Item 
            key={item.ID}
            className={
              this.isLinkActive(getRelativeUrl(item.url))?'active':''}>
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

  // TODO: da creare classe apposita per
  // gestire l'utente
  isLogged() {
    return RT_API.current_user.ID !== 0
  }
  isAdmin() {
    return RT_API.current_user.caps.administrator
  }
  getUsername() {
    return RT_API.current_user.data.user_login
  }

  renderAuthArea(position = 'right') {
    if (this.isAdmin()) {
      return (
        <Menu.Item position={position}>
          <Button
            as='a'
            target={'__blank'}
            inverted={!this.props.fixed}
            href={RT_API.baseUrl + '/wp-admin'}
          >
            {this.getUsername()}</Button>
        </Menu.Item>)
    }
    else if (!this.isLogged()) {
      return (
        <Menu.Item position={position}>
          <Button as='a' inverted={!this.props.fixed}>
            Log in
          </Button>
          <Button as='a' inverted={!this.props.fixed} primary={this.props.fixed} style={{ marginLeft: '0.5em' }}>
            Sign Up
          </Button>
        </Menu.Item>
      )
    }
    else {
      // logout
    }
  }
  render() {
    return (
      <Container style={{ display: 'flex' }} className={this.getClasses(this.props.menu.name)}>
        <Menu.Item 
          className={this.isLinkActive('/')?'active':''}>
          <Link to={{type:HOME}}>Home</Link>
        </Menu.Item>
        {this.renderMenu(this.props.menu)}
        {this.renderAuthArea()}
      </Container>
    );
  }
}

function mapStateToProps({ menu, location }) {
  return { menu, location };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchMenu }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WpMenu);