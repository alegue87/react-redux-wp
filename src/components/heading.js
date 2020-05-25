/* eslint-disable no-undef */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Header, Container, Button } from 'semantic-ui-react';

const title = RT_API.siteName
const description = RT_API.siteDescription

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const Heading = ({ mobile }) => (
  <Container text >
    <Header
      as='h1'
      content={title}
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '7em',
        textShadow: '1px 1px 1px black'
      }}
    />
    <Header
      as='h2'
      content={description}
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
        textShadow: '1px 1px 1px black'
      }}
    />
    <Button primary size='huge' onClick={() => { scrollTo('section') }}>
      Vedi&nbsp;&nbsp;
      <Icon name='down arrow' />
    </Button>
  </Container>
)

function scrollTo(name) {
  const margin = 30
  const top = document.getElementsByClassName(name)[0].offsetTop-margin
  window.scroll({
    top,
    left: 0,
    behavior: 'smooth'
  })
}

Heading.propTypes = {
  mobile: PropTypes.bool,
}

export default Heading;