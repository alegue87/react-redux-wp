import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import { fetchMenu } from '../../actions';
import { Menu, Container } from 'semantic-ui-react'

class WpMenu extends Component {
  componentDidMount() {
    this.props.actions.fetchMenu(this.props.name);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.name === nextProps.menu.name;
  }

  getPayloadFromUrl(url){
    if(url.indexOf('page_id')>0){
      return {page_id: url.split('/page_id=')[1]}
    }
    else return {}
  }

  renderMenu(menu) {
    if (this.props.name === menu.name) {
      return menu.items.map(item => {
        return (
          <Menu.Item key={item.ID}>
            <Link to={{type:item.title, payload:this.getPayloadFromUrl(item.url)}}>{item.title}</Link>
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
      <Container style={{display:'flex'}} className={this.getClasses(this.props.menu.name)}>
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