import React from 'react'
import { connect } from 'react-redux'
import { Container, Loader } from 'semantic-ui-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import forest from 'react-syntax-highlighter/dist/esm/styles/hljs/atelier-forest-light'
import parse from 'html-react-parser'
import './article.css'
import { FETCH_POST, INIT_POSTS, fetchPost } from '../actions'
import { bindActionCreators } from 'redux'

class Article extends React.Component {

  componentDidMount() {
    if (this.props.posts.state === INIT_POSTS) {
      this.props.fetchPost()
    }
  }

  componentDidUpdate(){
    // Location cambiata
    if(this.props.posts.state === INIT_POSTS){
      this.props.fetchPost()
    }
  }

  hasClass(name, classes) {
    let results = false
    classes.split(' ').forEach(c => {
      if (c === name) {
        results = true;
      }
    })
    return results
  }

  render() {
    const options = {
      replace: domNode => {
        if (domNode.attribs && domNode.attribs.class !== undefined) {
          const classes = domNode.attribs.class
          const parent = domNode.children[0]
          let language = ''
          if (this.hasClass('wp-block-code', classes)) {
            language = ''
          }
          else if (this.hasClass('wp-block-simple-code-block-ace', classes)) {
            language = parent.attribs['data-mode']
          }
          else {
            return
          }
          return (<SyntaxHighlighter
            language={language}
            style={forest}
            showLineNumbers={true}
            customStyle={
              { fontSize: '12px', borderRadius: '10px', padding: '20px' }}
          >
            {parent.children[0].data}
          </SyntaxHighlighter>)
        }
      }
    }
    
    let content;
    if (this.props.posts.state === FETCH_POST) {
      let post = this.props.posts.list[0]
      content = <Container text >{
        parse(post.content.rendered, options)}</Container>
    }
    else {
      content = <Container style={{ minHight: '100px', fontSize: '120%', textAlign: 'justify' }}>
        <Loader active />
      </Container>
    }
    return (content)
  }
}

function mapStateToProps({ posts }) {
  return { posts }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Article);