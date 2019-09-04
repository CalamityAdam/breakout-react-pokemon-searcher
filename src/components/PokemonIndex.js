import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  constructor() {
    super()
    this.state = {
      pokemons: [],
      filter: '',
    }
  }
  
  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(pokemons => this.setState({ pokemons }))
  }
  
  handleChange = (e, value) => {
    this.setState({ filter: value })
  }
  
  filteredPokemons = () => {
    return this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.filter))
  }
  
  addPokemon = newPokemon => {
    this.setState((prevState) => {
      return {pokemons: [...prevState.pokemons, newPokemon]}
    })
    // we're passing setState a function instead of an object, which gives us the ability to reference state IN the setState
    // pro-tip: NEVER (EVER) reference `this.state` INSIDE of a setState. this is bad practice!
    // read more here: https://reactjs.org/docs/react-component.html#setstate specifically the section on the `updater`
    // then we're spreading in all of the pokemon that were there before, and then adding the newPokemon to the end of the array
  }
  
  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={(event, { value }) => this.handleChange(event, value)} showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.state.filter ? this.filteredPokemons() : this.state.pokemons} />
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
