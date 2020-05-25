/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HOME, SINGLE, TAG, CATEGORY
} from '../../routes/index';
import { NOT_FOUND } from 'redux-first-router';
import Article from '../../components/article/index'
import {
  Icon,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from 'semantic-ui-react'
import ResponsiveContainer from '../responsive/index';
import CardsLoader from '../../components/cards-loader/index'
import WpComments from '../../components/wp-comments/index'
import { FETCH_POST } from '../../components/article/actions'
import _ from 'lodash'
import ContactForm from '../../components/contact-form/index'
import './blog.css'
import Link from 'redux-first-router-link';

class Blog extends Component {

  componentDidMount() {
    document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
    this.locationPathname = this.props.location.pathname
    window.scrollTo(0, 0)
  }

  locationChanged() {
    if (this.locationPathname !== this.props.location.pathname) return true; else return false;
  }

  componentDidUpdate() {
    if (this.locationChanged()) {
      window.scrollTo(0, 0);
      this.locationPathname = this.props.location.pathname
    }
  }

  isPageWithContactForm() {
    const { post } = this.props
    if (post.state === FETCH_POST)
      return post.data.type === 'page' && !_.isEmpty(post.data.wpcf7)

    return false
  }

  preRender() {
    this.content = null
    this.extraContent = null
    this.classes = ''
    switch (this.props.location.type) {
      case HOME:
        document.title += `${RT_API.siteName}`
        this.content = <CardsLoader tax={''} />
        this.extraContent = <ExtraContent />
        break;
      case SINGLE:
        if (this.isPageWithContactForm()) {
          this.classes = 'contact-form-container'
          this.content = <ContactForm />
        }
        else {
          this.content =
            <div>
              <Article />
              <WpComments />
            </div>
        }
        break;
      case TAG:
        this.content = <CardsLoader tax={'tags'} />
        break;
      case CATEGORY:
        this.content = <CardsLoader tax={'categories'} />
        break;
      case NOT_FOUND:
        document.title += 'Not found';
        this.content = () => (<div>404</div>)
        break;
      default:
        ;
    }
  }

  render() {
    this.preRender()
    return (
      <ResponsiveContainer>
        {/* menu and heading is here */}
        <Segment color='blue' className={`container section ${this.classes}`}>
          {this.content}
        </Segment>
        {this.extraContent}
        <Footer></Footer>
      </ResponsiveContainer>
    );
  }
}

function mapStateToProps({ location, post }) {
  return {
    location,
    post
  }
}

export default connect(mapStateToProps, null)(Blog)



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

function Footer() {
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