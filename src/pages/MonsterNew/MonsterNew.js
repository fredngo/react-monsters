import React, {Component} from 'react';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterNew extends Component {

  state = {
    monster: {},
  }

  setMonster = monster =>
    this.setState({monster});

  callApi = () => {
    return MonstersAPI.create(this.state.monster);
  }

  redirectTo = monster =>
    `/monsters/${monster.id}`

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="mt-4">New Monster</h1>
        </div>
        <div className="row">
          <MonsterForm
            monster={this.state.monster}
            setMonster={this.setMonster}
            callApi={this.callApi}
            buttonText='Create Monster'
            redirectNotice='Monster was successfully created.'
            redirectTo={this.redirectTo}
            setRedirect={this.props.setRedirect}
            setModal={this.props.setModal}
            cancelPath='/'
          />
        </div>
      </div>
    );
  }
}

export default MonsterNew;
