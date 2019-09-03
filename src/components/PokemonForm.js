import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }
  
  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    }, () => console.log(this.state))
  }
  
  handleSubmit = () => {
    const { name, hp, frontUrl, backUrl } = this.state
    const pokemonData = {
      name,
      sprites: {
        front: frontUrl,
        back: backUrl,
      },
      stats: [
        {
          name: 'hp',
          value: hp,
        }
      ]
    }
    
    fetch('http://localhost:3000/pokemon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemonData)
    }).then(res => res.json())
    .then(pokemon => this.props.addPokemon(pokemon))
    .catch(err => console.log(err))
  }
  
  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit} >
          <Form.Group widths="equal">
            <Form.Input onChange = {this.handleChange} fluid label="Name" placeholder="Name" name="name" />
            <Form.Input onChange = {this.handleChange} fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input onChange = {this.handleChange} fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input onChange = {this.handleChange} fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
