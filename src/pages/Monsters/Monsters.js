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
    try {
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
    catch {
      this.setState({redirect: {
        pathname: '/offline'
      }});
    }
  }

  render() {
    const {pathname, notice} = this.state.redirect;
    if (pathname) return <Redirect to={{ pathname, state: { notice } }} />

    const allMonsterRows = this.state.monsters.map( m => <MonsterRow key={m.id} {...m} /> );

    return (
      <>
        <section className="jumbotron">
          <div className="container">
            <h1 className="display-4">Monsters for Hire, Inc.</h1>
            <hr className="my-4" />
            <p>
              <Link className="btn btn-primary btn-lg" to={'/monsters/new'}>New Monster</Link>
            </p>
          </div>
        </section>
        
        { !this.state.monsters.length ? null :
          <div className="album">
            <div className="container">
              <div className="row">
                {allMonsterRows}
              </div>
            </div>
          </div>
        }
      </>
    );
  }

}

export default Monsters;
