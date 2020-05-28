import React from 'react'

import { Segment } from 'semantic-ui-react'
import MainMenu from './parts/main-menu'
import Article from '../../components/article/index'
import WpComments from '../../components/wp-comments/index'
import Footer from './parts/footer'
import { FETCH_POST } from '../../components/article/actions'
import { connect } from 'react-redux'
import HTMLReactParser from 'html-react-parser'

class Single extends React.Component {
  render() {
    const { post } = this.props
    let title = ''
    if(post.state === FETCH_POST) 
      title = post.data.title.rendered
    document.title = HTMLReactParser(title)
    return (
      <div>
        <MainMenu
          name='main_menu'
          fixed={true}
          inverted={false}
          pointing={false}
          secondary={false}
          size='large'
        />
        <Segment className={'spacer'} />
        <Segment color='blue' className={'container section'}>
          <Article />
          <WpComments />
        </Segment>
        <Footer />
      </div>)
  }
}

function mapStateToProps({post}){
  return {post}
}
export default connect(mapStateToProps, null)(Single)