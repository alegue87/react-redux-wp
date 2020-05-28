import React from 'react'
import { Menu, Container } from 'semantic-ui-react'
import WpMenu from '../../../components/wp-menu/index'

export default function MainMenu({ name, fixed, inverted, pointing, secondary, size }) {
  return (
    <Menu
      fixed={fixed ? 'top' : ''}
      inverted={inverted}
      pointing={pointing}
      secondary={secondary}
      size={size || 'large'}
    >
      <Container>
        <WpMenu name={name} fixed={fixed} />
      </Container>
    </Menu>
  )
}