import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor() {
    super()
    this.state = {
      showingBack: false,
    }
  }
  
  handleClick = () => {
    this.setState((prevState) => {
      return { showingBack: !prevState.showingBack }
    })
  }
  
  // because the hp is a deeply nested value (in an object, in an array, in an object) we create this helper function to get just the HP's value out of that data.
  /**
   * the stats looks like this:
   * 
   * stats: [
   *  {name: 'hp', value: '123'},
   *  {name: 'other stat', value: 'other stat value},
   * ]
   */
  getHp = stats => stats.filter(stat => stat.name === 'hp')[0].value
  // this ^ is the same as this v
  // getHp = stats => {
  //   const filteredArray = stats.filter(stat => {
  //     return stat.name === 'hp'
  //   });
  //   const value = filteredArray[0].value;
  //   return value;
  // }
  
  render() {
    // destructure these values ONCE from props to avoid typing `this.props.pokemon.` over and over
    const { name, sprites: { front, back }, stats } = this.props.pokemon
    return (
      <Card onClick={this.handleClick}>
        <div>
          <div className="image">
            <img src={this.state.showingBack ? back : front} alt={name} />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getHp(stats)} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
