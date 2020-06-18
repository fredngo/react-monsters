import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

class Monster extends Component {

  state = {
    monster: {}
  }
  
  async componentDidMount() {
    const monster = await MonstersAPI.show(this.props.id);
    this.setState({monster})
  }

  render() {
    const {id, name, home, creepiness} = this.state.monster;
    const imgSrc = `https://robohash.org/${id}?set=set2&size=200x200`;

    return (
      <>
        <Link to={`/`}>Back</Link>
  
        <h1>{name}</h1>
  
        <img src={imgSrc} alt='Monster Pic' />

        <h2>Home: {home}</h2>
        <h2>Creepiness: {creepiness}</h2>
  
        <Link to={`/monsters/${id}/edit`}>Edit</Link>
        &nbsp;
        <Link to={`/monsters/${id}`}>Delete</Link>
      </>
    );
  }
}

export default Monster;
