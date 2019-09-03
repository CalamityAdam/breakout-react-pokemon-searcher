import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  state = {
    showBack: false,
  }
  
  clickHandler = () => {
    this.setState((prevState) => ({
      showBack: !prevState.showBack
    }))
  }
  
  getHP = (stats) => {
    return stats.filter(stat => stat.name === 'hp')[0].value
  }
  
  render() {
    console.log('inside a card', this.props)
    const { pokemon: { name, sprites, stats} } = this.props
    return (
      <Card onClick={this.clickHandler}>
        <div>
          <div className="image">
            <img src={this.state.showBack ? sprites.back : sprites.front} alt={name} />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getHP(stats)} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
