import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterNew extends Component {

  state = {
    monster: {},
  }

  setMonster = m =>
    this.setState( prevState => {
      return {monster: {...prevState.monster, ...m}};
    });

  callApi = () => MonstersAPI.create(this.state.monster);

  render() {
    return (
      <>
        <Link to='/'>Back</Link>
  
        <h1>New Monster</h1>

        <MonsterForm
          monster={this.state.monster}
          setMonster={this.setMonster}
          callApi={this.callApi}
          buttonText='Create Monster'
          successNotice='Monster was successfully created.'
        />
      </>
    );
  }
}

export default MonsterNew;
