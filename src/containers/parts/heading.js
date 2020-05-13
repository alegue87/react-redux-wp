
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Header, Container, Button } from 'semantic-ui-react';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const Heading = ({ mobile }) => (
  <Container text >
    <Header
      as='h1'
      content='Rockymountain'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='Appunti, frasi, idee..'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
)

Heading.propTypes = {
  mobile: PropTypes.bool,
}

export default Heading;