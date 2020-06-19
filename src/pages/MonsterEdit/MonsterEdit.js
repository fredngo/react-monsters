import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterEdit extends Component {

  state = {
    monster: {},
    redirectTo: false
  }
  
  async componentDidMount() {
    const monster = await MonstersAPI.show(this.props.id);
    this.setState({monster})
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
    await MonstersAPI.update(this.state.monster);
    this.setState({redirectTo: `/monsters/${this.state.monster.id}`})
  }

  render() {
    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />

    const {id} = this.state.monster;
    if (!id) return <></>

    return (
      <>
        <Link to={`/monsters/${id}`}>Back</Link>
  
        <h1>Editing Monster</h1>

        <MonsterForm 
          {...this.state.monster}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          buttonText='Update Monster' />
      </>
    );
  }
}

export default MonsterEdit;