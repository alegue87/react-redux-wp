import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Loader, Segment, Header, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import {
  SENDING_FEEDBACK, FEEDBACK_SENT, FEEDBACK_ERROR,
  createFeedback
} from './actions'
import HTMLReactParser from 'html-react-parser'
import './contact-form.css'

class WPCF7 extends Component {

  componentDidMount() {
  }


  renderLabelInput() {
    const { form } = this.props.post.data.wpcf7

    // Per la struttura completa vedi: https://contactform7.com/tag-syntax/
    // TODO: mancano le opzioni
    //       Non è gestito il type 'select' (G2)

    let data = [...form.matchAll(/(.*?)[\s\n]*\[(.*?)(\*?) +(.*?)( .*?)?\]/gm)]
    // ritorna un iteratore di regx.. quindi va loopato in un array

    if (_.isNull(data)) return ''

    const G1_LABEL = 1          // opzionale
    const G2_INPUT_TYPE = 2
    const G3_INPUT_REQUIRED = 3 // opzionale
    const G4_INPUT_NAME = 4
    const G5_INPUT_VALUE = 5    // opzionale

    let render = [], placeholder, isRequired, label
    _.forEach(data, (line, i, arr) => {
      placeholder = ''
      if (!_.isUndefined(line[G5_INPUT_VALUE]))
        placeholder = removeQuotes(line[G5_INPUT_VALUE])

      isRequired = false
      if (!_.isEmpty(line[G3_INPUT_REQUIRED]))
        isRequired = true

      let content = /<label>(.*)<\/label>/.exec(line[G1_LABEL])
      if (!_.isNull(content))
        label = <label>{content}</label>
      render.push(
        <Form.Field key={i}>
          {label}
          {this.renderInputType({
            type: line[G2_INPUT_TYPE],
            required: isRequired,
            name: line[G4_INPUT_NAME],
            placeholder: placeholder
          })}
        </Form.Field>
      )
    })
    return render

    function removeQuotes(str) {
      str = _.trim(str)
      if (str[0] === '"')
        return str.replace(/"/g, '')
      else if (str[0] === "'")
        return str.replace(/'/g, '')
      else
        return str
    }
  }

  renderInputType(params) {
    switch (params.type) {
      case 'text':
      case 'email':
        return (
          <Input
            type={params.type}
            required={params.isRequired ? 'required' : ''}
            name={params.name}
            placeholder={params.placeholder}
          />
        )
      case 'textarea':
        return (
          <TextArea
            required={params.isRequired ? 'required' : ''}
            name={params.name}
            placeholder={params.placeholder}
          />
        )
      default: ;
    }
  }

  handleSubmit() {
    const { createFeedback } = this.props
    const { post } = this.props
    const elements = document.querySelectorAll('form input, form textarea')
    console.log(elements)
    let data = new FormData()
    _.forEach(elements, (element, i, arr) => {
      data.append(element.name, element.value)
    })
    createFeedback({
      id: post.data.wpcf7.id, // form id
      data: data
    })
  }

  render() {

    const { feedback, post } = this.props

    let loader, messageColor = 'green'
    switch (feedback.state) {
      case SENDING_FEEDBACK:
        loader = <Loader active />
        break;
      case FEEDBACK_SENT:
        if (feedback.response.data.status === 'validation_failed')
          messageColor = 'red'
        break
      case FEEDBACK_ERROR:
        messageColor = 'red'
        break
      default: ;
    }
    return (
      <Container text>
        <Header as='h1' inverted textAlign={'center'}>{HTMLReactParser(post.data.title.rendered)}</Header>
        <Form >
          {this.renderLabelInput()}
          <Button primary onClick={this.handleSubmit.bind(this)}>Invia</Button>
          <Segment className='message'>
            {loader}
            { !_.isUndefined(feedback.response) ?
              <Header color={messageColor}>{feedback.response.data.message}</Header>
              : ''
            }
          </Segment>
        </Form>
      </Container>
    )

  }
}

function mapStateToProps({ post, feedback }) {
  return { post, feedback }
}
function mapDispachToProps(dispatch) {
  return bindActionCreators({ createFeedback }, dispatch)
}
export default connect(mapStateToProps, mapDispachToProps)(WPCF7)

