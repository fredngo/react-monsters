import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterNew extends Component {

  state = {
    monster: {},
    redirect: {
      pathname: false,
      notice: '',
    },
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
    this.setState({redirect: {
      pathname: `/monsters/${monster.id}`,
      notice: 'Monster was successfully created.'
    }});
  }

  render() {
    if (this.state.redirect.pathname)
      return <Redirect to={{
        pathname: this.state.redirect.pathname,
        state: { notice: this.state.redirect.notice }
      }} />

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
