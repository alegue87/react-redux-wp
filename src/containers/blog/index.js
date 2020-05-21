/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HOME, SINGLE, TAG, CATEGORY
} from '../../routes/index';
import { NOT_FOUND } from 'redux-first-router';
import Article from '../../components/article/index'
import {
  Button,
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
import './blog.css'
import HTMLReactParser from 'html-react-parser';

import {
  FETCH_TAG_INFO_ERROR,
  FETCH_CAT_INFO_ERROR,
  FETCH_CAT_INFO,
  FETCH_TAG_INFO
} from '../../components/cards-loader/actions'
import { FETCH_POST_ERROR, FETCH_POST } from '../../components/article/actions'


class Blog extends Component {

  componentDidMount() {
    document.title = `${RT_API.siteName} - ${RT_API.siteDescription}`;
    this.locationPathname = this.props.location.pathname
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

  getSingleTitle() {
    const { post } = this.props
    if (post.status === FETCH_POST_ERROR) {
      return 'Error'
    }
    else if (post.status === FETCH_POST) {
      return HTMLReactParser(post.data.title.rendered)
    }
    else return ''
  }
  getCatTitle() {
    const { cat } = this.props
    if (cat.status === FETCH_CAT_INFO_ERROR) {
      return 'Error'
    }
    else if (cat.status === FETCH_CAT_INFO) {
      return 'Categoria ' + cat.name
    }
    else return ''
  }
  getTagTitle() {
    const { tag } = this.props
    if (tag.status === FETCH_TAG_INFO_ERROR) {
      return 'Error'
    }
    else if (tag.status === FETCH_TAG_INFO) {
      return 'Tag ' + tag.name
    }
    else return ''
  }

  preRender() {
    this.content = null
    this.extraContent = null
    switch (this.props.location.type) {
      case HOME:
        document.title += `${RT_API.siteName}`
        this.content = <CardsLoader tax={''} />
        this.extraContent = <ExtraContent />
        break;
      case SINGLE:
        this.content = <Article />
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
        {/* menu ed heading is here */}
        <Segment className={'container section'}>
          {this.content}
        </Segment>
        {this.extraContent}
        <Footer></Footer>
      </ResponsiveContainer>
    );
  }
}

function mapStateToProps({ location, post, cat, tag }) {
  return {
    location,
    post,
    cat,
    tag
  }
}

export default connect(mapStateToProps, null)(Blog)

function Footer() {
  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}

function ExtraContent() {
  return (
    <div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We Help Companies and Companions
          </Header>
              <p style={{ fontSize: '1.33em' }}>
                We can give your company superpowers to do things that they never thought possible.
                Let us delight your customers and empower your needs... through pure data analytics.
          </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We Make Bananas That Can Dance
          </Header>
              <p style={{ fontSize: '1.33em' }}>
                Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                bioengineered.
          </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge'>Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "What a Company"
          </Header>
              <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "I shouldn't have gone with their competitor."
          </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='/images/avatar/large/nan.jpg' />
                <b>Nan</b> Chief Fun Officer Acme Toys
          </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Breaking The Grid, Grabs Your Attention
      </Header>
          <p style={{ fontSize: '1.33em' }}>
            Instead of focusing on content creation and hard work, we have learned how to master the
            art of doing nothing by providing massive amounts of whitespace and generic content that
            can seem massive, monolithic and worth your attention.
      </p>
          <Button as='a' size='large'>
            Read More
      </Button>

          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>Case Studies</a>
          </Divider>

          <Header as='h3' style={{ fontSize: '2em' }}>
            Did We Tell You About Our Bananas?
      </Header>
          <p style={{ fontSize: '1.33em' }}>
            Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
            it's really true. It took years of gene splicing and combinatory DNA research, but our
            bananas can really dance.
      </p>
          <Button as='a' size='large'>
            I'm Still Quite Interested
      </Button>
        </Container>
      </Segment>

    </div>
  )
}