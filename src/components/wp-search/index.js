import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchSite, SEARCH_POSTS, SEARCH_POSTS_LOADING } from './actions'
import _ from 'lodash'
import HTMLReactParser from 'html-react-parser'
import { SINGLE } from '../../routes'
import { getRelativeUrl } from '../../utils/index'
import './wp-search.css'

class WpSearch extends Component {

  handleSearchChange(e, { value }) {
    if (_.trim(value) === "") return
    this.value = value
    this.props.searchSite(value)
  }

  isLoading() {
    const { search } = this.props
    return search.state === SEARCH_POSTS_LOADING
  }

  handleResultSelect(e, { result }) {
    const { dispatch } = this.props
    if (result.type === 'post') {
      dispatch({
        type: SINGLE,
        payload: {
          slug: getRelativeUrl(result.link).replace(/\//g, '')
        }
      })
    }
    else {
      window.location.href = result.link
    }
  }

  getResults() {
    const { search } = this.props
    if (search.state === SEARCH_POSTS) {
      return search.list.map(v => {
        return {
          title: HTMLReactParser(v.title.rendered),
          date: v.formatted_date,
          description: HTMLReactParser(_.truncate(v.excerpt.rendered, { lenght: 60 })),
          image: v.featured_image_url.thumbnail,
          link: v.link,
          type: v.type
        }
      })
    }
    else {
      return []
    }
  }

  render() {
    return <Search
      loading={this.isLoading()}
      onSearchChange={_.debounce(this.handleSearchChange.bind(this), 500)}
      onResultSelect={this.handleResultSelect.bind(this)}
      results={this.getResults()}

    />
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchSite, dispatch }, dispatch)
}
function mapStateToProps({ search }) {
  return { search }
}
export default connect(mapStateToProps, mapDispatchToProps)(WpSearch)