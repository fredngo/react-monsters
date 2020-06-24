import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterEdit extends Component {

  state = {
    monster: {},
  }

  setMonster = monster =>
    this.setState({monster});

  callApi = () =>
    MonstersAPI.update(this.state.monster);

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
