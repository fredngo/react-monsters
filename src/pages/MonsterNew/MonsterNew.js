import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterNew extends Component {

  state = {
    monster: {},
    errors: [],
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
    const response = await MonstersAPI.create(this.state.monster);

    if (!response.error)
      this.setState({redirect: {
        pathname: `/monsters/${response.id}`,
        notice: 'Monster was successfully created.'
      }});
    else {
      this.setState({errors: response.error});
    }
  }

  render() {
    if (this.state.redirect.pathname)
      return <Redirect to={{
        pathname: this.state.redirect.pathname,
        state: { notice: this.state.redirect.notice }
      }} />

    return (
      <>
        <Link to='/'>Back</Link>
  
        <h1>New Monster</h1>

        <MonsterForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          buttonText='Create Monster'
          errors={this.state.errors}
        />
      </>
    );
  }
}

export default MonsterNew;
