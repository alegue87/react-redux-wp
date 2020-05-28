import React from 'react'
import {
  Segment,
  Grid,
  List,
  Header,
  Container
} from 'semantic-ui-react'

export default function Footer() {
  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <a href='https://github.com/alegue87/react-redux-wp'>Repo su GitHub del tema</a>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Created with' />
              <List link inverted>
                <List.Item as='a' href='https://it.reactjs.org/'>Reactjs</List.Item> 
                <List.Item as='a' href='https://react.semantic-ui.com/'>Semantic-ui</List.Item>
                <List.Item as='a' href='https://redux.js.org/'>Redux</List.Item>
                <List.Item as='a' href='https://github.com/faceyspacey/redux-first-router'>react-first-router</List.Item>
                <List.Item as='a' href='https://github.com/devloco/create-react-wptheme'>create-react-wptheme</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Thanks
              </Header>
              <p>
                Per le immagini, compresa quella della landing page a <a href='https://unsplash.com/'>Unsplash</a>
              </p>
              <p>
                e <a href='https://www.jackreichert.com/'>
                Jack Reichert</a> &nbsp;
                per il 'fork' da <a href='https://github.com/jackreichert/a-wp-react-redux-theme'>&nbsp; 
                A WP React Redux Theme</a>
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}