import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

class Monster extends Component {

  state = {
    monster: {},
    redirectTo: false
  }
  
  async componentDidMount() {
    const monster = await MonstersAPI.show(this.props.id);
    this.setState({monster})
  }

  handleDelete = async e => {
    e.preventDefault();
    await MonstersAPI.destroy(this.state.monster.id);
    this.setState({redirectTo: '/monsters'})
  }

  render() {
    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />
    if (!this.state.monster.id) return <></>

    const {id, name, home, creepiness, bio} = this.state.monster;
    const imgSrc = `https://robohash.org/${id}?set=set2&size=200x200`;

    return (
      <>
        <Link to='/'>Back</Link>
  
        <h1>{name}</h1>
  
        <img src={imgSrc} alt='Monster Pic' />

        <h2>Home: {home}</h2>
        <h2>Creepiness: {creepiness}</h2>
  
        <h2>Bio:</h2>
        <p>{bio}</p>

        <Link to={`/monsters/${id}/edit`}>Edit</Link>
        &nbsp;
        <Link to={`/monsters/${id}`} onClick={this.handleDelete}>Delete</Link>
      </>
    );
  }
}

export default Monster;
