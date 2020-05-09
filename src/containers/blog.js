import React, { Component } from 'react';

import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

class Blog extends Component {
  render() {
    return (
      <section className="container-fluid template-blog">
        <Header />
        <Main />
        <Footer />
      </section>
    );
  }
}

export default Blog;