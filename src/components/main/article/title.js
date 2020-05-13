import React, { Component } from 'react';
import Link from 'redux-first-router-link';
import {SINGLE} from '../../../actions';

export default class Title extends Component {
  extractPath(link) {
    const url = document.createElement('a');
    url.href = link;
    return link.replace(`${url.protocol}//${url.host}`, '').replace(/\//g, '');
  }

  getClasses() {
    return this.props.isSingle ? '' : 'card-title';
  }

  render() {
    return (
      <header className={this.getClasses()}>
        <Link 
          to={{type: SINGLE, payload: {slug:this.extractPath(this.props.link)}}}><h1
          dangerouslySetInnerHTML={ {__html: this.props.children} }/>
        </Link>
      </header>
    );
  }
}