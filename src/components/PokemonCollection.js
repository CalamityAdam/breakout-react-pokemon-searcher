import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {/* for each pokemon, return a single PokemonCard with the pokemon passed in as a prop */}
        {this.props.pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
      </Card.Group>
    )
  }
}

export default PokemonCollection
