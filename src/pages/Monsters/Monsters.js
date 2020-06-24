import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterRow from '../../components/MonsterRow/MonsterRow';

class Monsters extends Component {

  state = {
    monsters: [],
    redirect: {
      pathname: false,
      notice: null,
    },
  }

  async componentDidMount() {
    const {data} = await MonstersAPI.index();

    if (data) {
      this.setState({monsters: data});
    }
    else {
      this.setState({redirect: {
        pathname: '/500',
        notice: 'Error when fetching monsters.'
      }});
    }
  }

  render() {
    const {pathname, notice} = this.state.redirect;
    if (pathname) return <Redirect to={{ pathname, state: { notice } }} />

    const allMonsterRows = this.state.monsters.map( m => <MonsterRow key={m.id} {...m} /> );

    return (
      <>
        <p id="notice">{this.props.redirect_state?.notice ? this.props.redirect_state.notice : ''}</p>
        
        <h1>Monsters for Hire, Inc.</h1>
  
        <Link to={'/monsters/new'}>New Monster</Link>
        <br />

        { !this.state.monsters.length ? null :
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
        }
      </>
    );
  }

}

export default Monsters;
