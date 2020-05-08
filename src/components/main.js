import React, {Component} from 'react';
import {connect} from 'react-redux';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//import Article from './main/article';

class Main extends Component {

	render() {
    console.log('PAYLOAD')
    console.log(this.props.posts)
		return (
			<div>Blog 
      <img src={this.props.posts}></img>
			</div>
		);
	}
}


function mapStateToProps({posts}) {
	return {posts};
}

export default connect(mapStateToProps)(Main)
