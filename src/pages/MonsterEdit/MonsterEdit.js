import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterEdit extends Component {

  state = {
    monster: {},
    redirectTo: false,
  }

  setMonster = monster =>
    this.setState({monster});

  setRedirectTo = redirectTo =>
    this.setState({redirectTo});

  callApi = () =>
    MonstersAPI.update(this.state.monster);

  async componentDidMount() {
    const monster = await MonstersAPI.show(this.props.id);
    this.setState({monster});
  }

  render() {
    if (this.state.redirectTo) return <Redirect to={{
      pathname: this.state.redirectTo,
      state: {notice: 'Monster was successfully updated.'}
    }} />

    return (
      <>
        <Link to={`/monsters/${this.state.monster.id}`}>Back</Link>
  
        <h1>Editing Monster</h1>

        <MonsterForm 
          monster={this.state.monster}
          setMonster={this.setMonster}
          setRedirectTo={this.setRedirectTo}
          callApi={this.callApi}
          buttonText='Update Monster'
        />
      </>
    );
  }
}

export default MonsterEdit;

// import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';

// import MonstersAPI from '../../services/MonstersAPI';

// import MonsterForm from '../../components/MonsterForm/MonsterForm';

// const MonsterEdit = ({id}) => {

//   const [monster, setMonster] = useState({});

//   const callApi = () => MonstersAPI.update(monster);

//   useEffect(() => {
//     const getMonster = async () => {
//       const monster = await MonstersAPI.show(id);
//       setMonster(monster);
//     }
//     getMonster();
//   }, []);

//   return (
//     <>
//       <Link to={`/monsters/${monster.id}`}>Back</Link>

//       <h1>Editing Monster</h1>

//       <MonsterForm 
//         monster={monster}
//         setMonster={setMonster}
//         callApi={callApi}
//         buttonText='Update Monster'
//         successNotice='Monster was successfully updated.'
//       />
//     </>
//   );
// }

// export default MonsterEdit;
