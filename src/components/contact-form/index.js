import React, { Component } from 'react'
import { Form, Label, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

class WPCF7 extends Component {

  componentDidMount() {
  }


  renderLabelInput() {
    let render
    _.forEach(this.input, (input, i, a) => {
      render.push(
        <Form.Field>
          <label>{this.labels[i].innerText}</label>
          <input
            placeholder=''
            type={input.type}
            size={input.size}
            name={input.name}>

          </input>
        </Form.Field>
      )
    })
  }

  handleSubmit(){
    alert('click')
  }

  render() {
    return (
      <Form>
        {this.props.post.data.wpcf7.form}
        <Button onClick={this.handleSubmit.bind(this)}>Invia</Button>
      </Form>
    )

  }
}

function mapStateToProps({post}){
  return {post}
}
export default connect(mapStateToProps, null)(WPCF7)

