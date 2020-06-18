import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterNew extends Component {
  render() {
    const {id, name} = this.state.monster;

    return (
      <>
        <Link to={`/monsters`}>Back</Link>
  
        <h1>New Monster</h1>

        <MonsterForm {...this.state.monster} buttonText='Create Monster' />
      </>
    );
  }
}

export default MonsterNew;
