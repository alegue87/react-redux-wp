import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchSite } from '../actions';

class Search extends Component {
  componentDidMount() {
    if (this.props.isSearch) {
      this.searchInput.focus();
      const tempValue = this.props.searchTerm;
      this.searchInput.value = '';
      this.searchInput.value = tempValue;
    }
  }

  handleSearch(event) {
    event.preventDefault();
    const searchTerm = event.target.value;
    if (0 < searchTerm.length) {
      this.props.searchSite(searchTerm)
    }
    else{
      this.props.searchSite('*')
    }
  }

  submit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.submit} className="form-inline my-2 my-lg-0">
        <input type="search"
          value={this.props.searchTerm}
          ref={(input) => this.searchInput = input}
          onChange={this.handleSearch.bind(this)}
          className="form-control mr-sm-2"
          placeholder="Search for..." />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({searchSite, dispatch}, dispatch)
}
export default connect(null, mapDispatchToProps)(Search)