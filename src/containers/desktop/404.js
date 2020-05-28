import React from 'react'

import {
  Container,
  Segment,
  Menu,
  Header
} from 'semantic-ui-react'

import WpMenu from '../../components/wp-menu/index'
import Footer from './parts/footer'

export default class Page404 extends React.Component {
  render() {
    document.title = 'Pagina non trovata'
    return (
      <div>
        <Segment
          inverted
          vertical
          className={'main no-space'}
        >
          <Menu
            fixed={false}
            inverted={true}
            pointing={true}
            secondary={true}
            size='large'
          >
            <Container>
              <WpMenu name={'main_menu'} fixed={false} />
            </Container>
          </Menu>
          <Segment color='red' className={'container section'}>
            <Header as='h2' textAlign='center' style={{minHeight:'100px'}}>Pagina non trovata!</Header>
          </Segment>
          <Footer/>
        </Segment>
      </div>)
  }
}