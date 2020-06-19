import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

class Monster extends Component {

  state = {
    monster: {},
    redirect: {
      pathname: false,
      notice: '',
    },
  }
  
  async componentDidMount() {
    const monster = await MonstersAPI.show(this.props.id);
    this.setState({monster})
  }

  handleDelete = async e => {
    e.preventDefault();
    await MonstersAPI.destroy(this.state.monster.id);
    this.setState({redirect: {
      pathname: '/monsters',
      notice: 'Monster was successfully deleted'
    }});
  }

  render() {
    if (this.state.redirect.pathname)
      return <Redirect to={{
        pathname: this.state.redirect.pathname,
        state: { notice: this.state.redirect.notice }
      }} />

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
