import React, { Component } from 'react'
import { Form, Label, Input, TextArea, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

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

    const G1_LABEL = 1           // opzionale
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
      if (!_.isNull(label))
        label = <label key={i}>{content}</label>
      render.push(
        <Form.Field>
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
    alert('click')
  }

  render() {
    return (
      <Form>
        {this.renderLabelInput()}
        <Button onClick={this.handleSubmit.bind(this)}>Invia</Button>
      </Form>
    )

  }
}

function mapStateToProps({ post }) {
  return { post }
}
export default connect(mapStateToProps, null)(WPCF7)

