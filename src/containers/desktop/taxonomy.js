
import React from 'react'

import { Segment } from 'semantic-ui-react'
import MainMenu from './parts/main-menu'
import Footer from './parts/footer'
import CardsLoader from '../../components/cards-loader'
import { connect } from 'react-redux'
import { FETCH_CAT_INFO, FETCH_TAG_INFO } from '../../components/cards-loader/actions'

class Taxonomy extends React.Component {

  render() {
    const { tax, cat, tag } = this.props

    let title = ''
    if(tax === 'categories'){
      if(cat.state === FETCH_CAT_INFO)
        title = `Categoria: ${cat.name}`
    }
    else if( tax === 'tags' ){
      if(tag.state === FETCH_TAG_INFO)
        title = `Tag: ${tag.name}`
    }
    document.title = title

    return (
      <div>
        <MainMenu
          name='main_menu'
          fixed={true}
          inverted={false}
          pointing={false}
          secondary={false}
        />
        <Segment className={'spacer'} />
        <Segment color='blue' className={'container section'}>
          <CardsLoader tax={tax} />
        </Segment>
        <Footer />
      </div>)
  }
}

function mapStateToProps({cat, tag}){
  return {cat, tag}
}
export default connect(mapStateToProps, null)(Taxonomy)