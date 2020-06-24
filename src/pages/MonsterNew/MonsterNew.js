import React, {Component} from 'react';
import {Link} from 'react-router-dom';

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
      <>
        <Link to='/'>Back</Link>
  
        <h1>New Monster</h1>

        <MonsterForm
          monster={this.state.monster}
          setMonster={this.setMonster}
          callApi={this.callApi}
          buttonText='Create Monster'
          redirectNotice='Monster was successfully created.'
          redirectTo={this.redirectTo}
        />
      </>
    );
  }
}

export default MonsterNew;

// import React, {useState} from 'react';
// import {Link} from 'react-router-dom';

// import MonstersAPI from '../../services/MonstersAPI';

// import MonsterForm from '../../components/MonsterForm/MonsterForm';

// const MonsterNew = () => {

//   const [monster, setMonster] = useState({});

//   const callApi = () => MonstersAPI.create(monster);

//   return (
//     <>
//       <Link to='/'>Back</Link>

//       <h1>New Monster</h1>

//       <MonsterForm
//         monster={monster}
//         setMonster={setMonster}
//         callApi={callApi}
//         buttonText='Create Monster'
//         successNotice='Monster was successfully created.'
//       />
//     </>
//   );
// }

// export default MonsterNew;
