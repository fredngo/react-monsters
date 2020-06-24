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

  callApi = () => {
    return MonstersAPI.update(this.state.monster);
  }

  redirectTo = () =>
    `/monsters/${this.state.monster.id}`

  async componentDidMount() {
    const {response, error} = await MonstersAPI.show(this.props.id);

    if (response) {
      this.setState({monster: response});
    }
    else {
      console.log('Monster was not found');
      // this.setState({redirect: {
      //   pathname: '/404',
      //   notice: 'Monster was not found.'
      // }});
    }
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
          redirectNotice='Monster was successfully updated.'
          redirectTo={this.redirectTo}
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
