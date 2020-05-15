import React from 'react'
import { Container, Loader } from 'semantic-ui-react'

class Article extends React.Component {

  render() {
    let content;
    if (this.props.children !== undefined) {
      content = <Container dangerouslySetInnerHTML={{ __html: this.props.children }} />
    }
    else {
      content = <Container>
        <Loader active/>
      </Container>
    }
    return (
      content
    )
  }
}

export default Article;