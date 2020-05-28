import React from 'react'

import { Segment } from 'semantic-ui-react'
import ContactForm from '../../components/contact-form/index'
import MainMenu from './parts/main-menu'
import Footer from './parts/footer'
import './contact.css'

export default class Contact extends React.Component {
  render() {
    document.title = 'Contatto'
    return (
      <div>
        <MainMenu
          name='main_menu'
          fixed={true}
          inverted={false}
          pointing={false}
          secondary={false}
          size='large'
        />
        <Segment className='spacer'/> 
        <Segment color='blue' className={'container section contact-form-container'}>
          <ContactForm />
        </Segment>
        <Footer />
      </div>)
  }
}