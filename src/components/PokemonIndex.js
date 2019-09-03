import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  state = {
    filter: '',
    pokemon: [],
  }
  
  handleChange = (e, {value}) => {
    this.setState({ filter: value })
  }
  
  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(pokemon => this.setState({ pokemon }))
  }
  
  filteredPokemon = () => this.state.pokemon.filter(pokemon => pokemon.name.includes(this.state.filter))
  
  addPokemon = newPokemon => {
    this.setState((prevState) => {
      return {pokemon: [...prevState.pokemon, newPokemon]}
    })
  }
  
  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce((e, data) => this.handleChange(e, data), 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.state.filter ? this.filteredPokemon() : this.state.pokemon} />
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
