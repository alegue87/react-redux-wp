import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Loader } from 'semantic-ui-react'
import { resetPosts } from '../actions'


class Article extends React.Component {

  componentWillUnmount(){
    this.props.resetPosts()
  }
  componentDidMount(){
    this.props.resetPosts()
  }
  
  render() {
    //setTimeout(()=>{jQuery('.wp-block-simple-code-block-ace').removeAttr('style')},100)
    let content;
    if (this.props.children !== undefined) {
      content = <Container text dangerouslySetInnerHTML={{ __html: this.props.children }} />
    }
    else {
      content = <Container style={{minHight:'100px'}}>
        <Loader active/>
      </Container>
    }
    return (
      content
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({resetPosts}, dispatch)
}
export default connect(null, mapDispatchToProps)(Article);