import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterNew extends Component {

  state = {
    monster: {},
    redirectTo: false
  }

  handleChange = e => {
    e.persist();
    this.setState( prevState => {
      const nextMonster = {...prevState.monster};
      nextMonster[e.target.name] = e.target.value;
      return {monster: nextMonster};
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const monster = await MonstersAPI.create(this.state.monster);
    this.setState({redirectTo: `/monsters/${monster.id}`})
  }

  render() {
    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />

    return (
      <>
        <Link to={`/monsters`}>Back</Link>
  
        <h1>New Monster</h1>

        <MonsterForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          buttonText='Create Monster' />
      </>
    );
  }
}

export default MonsterNew;
