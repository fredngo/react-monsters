import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterEdit extends Component {

  state = {
    monster: {},
    redirect: {
      pathname: false,
      notice: null,
    },
  }

  setMonster = monster =>
    this.setState({monster});

  callApi = () => {
    return MonstersAPI.update(this.state.monster);
  }

  redirectTo = () =>
    `/monsters/${this.state.monster.id}`

  async componentDidMount() {
    try {
      const {data} = await MonstersAPI.show(this.props.match.params.id);

      if (data) {
        this.setState({monster: data});
      }
      else {
        this.setState({redirect: {
          pathname: '/404',
          notice: 'Monster was not found.'
        }});
      }
    }
    catch {
      this.setState({redirect: {
        pathname: '/offline'
      }});
    }
  }

  render() {
    const {pathname, notice} = this.state.redirect;
    if (pathname) return <Redirect to={{ pathname, state: { notice } }} />

    return (
      <div className="container">
        <div className="row">
          <h1 className="mt-4">Editing Monster</h1>
        </div>
        <div className="row">
          <MonsterForm 
            monster={this.state.monster}
            setMonster={this.setMonster}
            callApi={this.callApi}
            buttonText='Update Monster'
            redirectNotice='Monster was successfully updated.'
            redirectTo={this.redirectTo}
            cancelPath={`/monsters/${this.state.monster.id}`}
          />
        </div>
      </div>
    );
  }
}

export default MonsterEdit;
