import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterEdit extends Component {

  state = {
    monster: {},
  }

  setMonster = m =>
    this.setState( prevState => {
      return {monster: {...prevState.monster, ...m}};
    });

  callApi = () => MonstersAPI.update(this.state.monster);

  async componentDidMount() {
    const monster = await MonstersAPI.show(this.props.id);
    this.setState({monster})
  }

  render() {
    return (
      <>
        <Link to={`/monsters/${this.state.monster.id}`}>Back</Link>
  
        <h1>Editing Monster</h1>

        <MonsterForm 
          monster={this.state.monster}
          setMonster={this.setMonster}
          callApi={this.callApi}
          buttonText='Update Monster'
          successNotice='Monster was successfully updated.'
        />
      </>
    );
  }
}

export default MonsterEdit;
