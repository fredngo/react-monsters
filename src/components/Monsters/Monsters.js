import React, {Component} from 'react';
import MonstersAPI from '../../services/MonstersAPI';

import MonsterRow from '../MonsterRow/MonsterRow';

class Monsters extends Component {

  state = {
    monsters: []
  }

  async componentDidMount() {
    const monsters = await MonstersAPI.index();
    this.setState({monsters})
  }

  render() {
    const allMonsterRows = this.state.monsters.map( m => <MonsterRow key={m.id} {...m} /> );

    return (
      <>
        <h1>Monsters for Hire, Inc.</h1>
  
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Name</th>
              <th>Home</th>
              <th>Creepiness</th>
            </tr>
          </thead>
  
          <tbody>
            {allMonsterRows}
          </tbody>
        </table>
      </>
    );
  }

}

export default Monsters;
