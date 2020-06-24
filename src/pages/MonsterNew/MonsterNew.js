import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterNew extends Component {

  state = {
    monster: {},
    redirectTo: false,
  }

  setMonster = monster =>
    this.setState({monster});

  setRedirectTo = redirectTo =>
    this.setState({redirectTo});

  callApi = () =>
    MonstersAPI.create(this.state.monster);

  render() {
    if (this.state.redirectTo) return <Redirect to={{
      pathname: this.state.redirectTo,
      state: {notice: 'Monster was successfully created.'}
    }} />

    return (
      <>
        <Link to='/'>Back</Link>
  
        <h1>New Monster</h1>

        <MonsterForm
          monster={this.state.monster}
          setMonster={this.setMonster}
          setRedirectTo={this.setRedirectTo}
          callApi={this.callApi}
          buttonText='Create Monster'
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
