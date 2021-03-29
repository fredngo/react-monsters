import {Component} from 'react';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterEdit extends Component {

  state = {
    monster: {},
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
        this.props.setRedirect({
          path: '/404',
          alert: 'Monster was not found.'
        });
      }
    }
    catch {
      this.props.setModal('offline');
    }
  }

  render() {
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
            setRedirect={this.props.setRedirect}
            setModal={this.props.setModal}
            cancelPath={`/monsters/${this.state.monster.id}`}
          />
        </div>
      </div>
    );
  }
}

export default MonsterEdit;
