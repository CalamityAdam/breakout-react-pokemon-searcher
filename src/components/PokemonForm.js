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
  
  handleSubmit = () => {
    // our backend model has deeply nested data for each pokemon, so we have to build that structure manually
    // destructure the values ONCE from state to avoid retyping `this.state.` multiple times
    const { name, hp, frontUrl, backUrl } = this.state
    const pokeData = {
      name,
      stats: [
        {
          name: 'hp',
          value: hp
        }
      ],
      sprites: {
        front: frontUrl,
        back: backUrl,
      }
    }
    
    fetch('http://localhost:3000/pokemon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokeData)
    })
      .then(res => res.json())
      .then(data => this.props.addPokemon(data))
      .catch(err => console.log(err))
  }
  
  handleChange = (event, { name, value }) => {
    // grabbing `name` and `value` from the semantic form data - https://react.semantic-ui.com/collections/form/#usage-capture-values
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid onChange={this.handleChange} label="Name" placeholder="Name" name="name" />
            <Form.Input fluid onChange={this.handleChange} label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid onChange={this.handleChange} label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid onChange={this.handleChange} label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
