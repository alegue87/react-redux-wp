import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Loader } from 'semantic-ui-react'
import { resetPosts } from '../actions'
import AceEditor  from 'react-ace';
import parse, { domToReact } from 'html-react-parser'


class Article extends React.Component {

  componentWillUnmount() {
    this.props.resetPosts()
  }
  componentDidMount() {
    this.props.resetPosts()
  }

  hasClass(name, list) {
    let res = false;
    list.forEach(v => {
      if (v === name) {
        res = true;
      }
    })
    return res
  }


  render() {

    //setTimeout(()=>{jQuery('.wp-block-simple-code-block-ace').removeAttr('style')},100)
    let content;
    let html = this.props.children

    const options = {
      replace: domNode => {
        if (domNode.attribs && domNode.attribs.class) {
          const classes = domNode.attribs.class
          if (classes.split(' ').find(c => c === 'wp-block-simple-code-block-ace')) {
            console.log(domNode.children[0].children[0].data)
            return <AceEditor value={domNode.children[0].children[0].data}/>
          }
        }
      }
    }
    if (this.props.children !== undefined) {
      content = <Container text >{
        parse(html, options)}</Container>
    }
    else {
      content = <Container style={{ minHight: '100px' }}>
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