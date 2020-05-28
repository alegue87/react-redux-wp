import React from 'react'

import {
  Container,
  Segment,
  Visibility,
  Grid,
  Header,
  List,
  Divider,
  Image
} from 'semantic-ui-react'

import Heading from '../../components/heading'
import MainMenu from './parts/main-menu'
import Footer from './parts/footer'

import CardsLoader from '../../components/cards-loader/index'

export default class Home extends React.Component {

  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    document.title = 'Home'
    const { fixed } = this.state
    return (
      <div>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            vertical
            className={'main'}
          >
            <MainMenu
              name='main_menu'
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            />
            <Heading />
          </Segment>
        </Visibility>
        <Segment color='blue' className={'container section'}>
          <CardsLoader tax={''} /> {/* last posts */}
        </Segment>
        <ExtraContent/>
        <Footer/>
      </div>)
  }
}


function ExtraContent() {
  return (
    <div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Lista articoli a "scorrimento"
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                I posts del blog vengono caricati via via che l'utente
                scorre la pagina, cosi da rendere la navigazione fluida.
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Tutto in una pagina
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                La maggior parte del sito viene caricata la prima volta ( struttura, stili..)
                poi durante la navigazione vengono <b>riutilizzati</b>; questo agevola, come sopra,
                l'esperienza dell'utente.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='/wp-content/themes/rockymountains/img/experience.jpeg' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Mobile
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                E' predisposto, ma la versione per piccoli schermi &egrave; ancora in sviluppo</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Desktop
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Tutte le principali rotte di WordPress sono gestite
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Principali caratteristiche:
          </Header>
          <List bulleted style={{ fontSize: '1.33em' }}>
            <List.Item>Menu dinamico personalizzabile da area admin </List.Item>
            <List.Item>Search di pagine 'live' ( senza refresh della pagina )</List.Item>
            <List.Item>Caricatore dei posts per: 'ultimi posts', 'categorie' e 'tags' a scorrimento</List.Item>
            <List.Item>Compatibile con plugin <b>ACE</b> ( Simple Code Editor )</List.Item>
            <List.Item> Commenti ( se abilitati ) a pié dei posts con reply ed avviso di convalida ( se attivato )</List.Item>
            <List.Item>Compatibile con plugin <b>WPCF7</b> ( per form contatti )</List.Item>
          </List>

          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>in sviluppo</a>
          </Divider>

          <p style={{ fontSize: '1.33em' }}>
            Validazione in front-end per la convalida del form contatti, versione per mobile, migliore integrazione
            con backend per quanto riguarda i settings, menu nel footer, registrazione nuovi utenti e login da react...
          </p>
        </Container>
      </Segment>

    </div>
  )
}
