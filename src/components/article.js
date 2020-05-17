import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Loader } from 'semantic-ui-react'
import { resetPosts } from '../actions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import forest from 'react-syntax-highlighter/dist/esm/styles/hljs/atelier-forest-light'
import parse from 'html-react-parser'
import './article.css'

class Article extends React.Component {

  componentWillUnmount() {
    this.props.resetPosts()
  }
  componentDidMount() {
    this.props.resetPosts()
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

  componentDidUpdate() {
  }

  render() {

    let content;
    let html = this.props.children

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
              { fontSize: '12px', borderRadius: '10px', padding:'20px' }}
          >
            {parent.children[0].data}
          </SyntaxHighlighter>)
        }
      }
    }

    if (this.props.children !== undefined) {
      content = <Container text >{
        parse(html, options)}</Container>
    }
    else {
      content = <Container style={{ minHight: '100px', fontSize: '120%', textAlign:'justify' }}>
        <Loader active />
      </Container>
    }
    return (
      content
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ resetPosts }, dispatch)
}
export default connect(null, mapDispatchToProps)(Article);