import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterEdit extends Component {

  state = {
    monster: {}
  }
  
  async componentDidMount() {
    const monster = await MonstersAPI.show(this.props.id);
    this.setState({monster})
  }

  render() {
    const {id, name} = this.state.monster;

    return (
      <>
        <Link to={`/monsters/${id}`}>Back</Link>
  
        <h1>Editing {name}</h1>

        <MonsterForm {...this.state.monster} buttonText='Update Monster' />
      </>
    );
  }
}

export default MonsterEdit;
