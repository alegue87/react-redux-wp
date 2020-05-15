import React from 'react'
import { Container, Loader } from 'semantic-ui-react'

class Article extends React.Component {

  render() {
    setTimeout(()=>{jQuery('.wp-block-simple-code-block-ace').removeAttr('style')},100)
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

export default Article;