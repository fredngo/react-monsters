import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterRow from '../../components/MonsterRow/MonsterRow';

class Monsters extends Component {

  state = {
    monsters: [],
  }

  async componentDidMount() {
    try {
      const {data} = await MonstersAPI.index();

      if (data) {
        this.setState({monsters: data});
      }
      else {
        this.props.setRedirect({
          path: '/500',
          alert: 'Error when fetching monsters.'
        });
      }
    }
    catch {
      this.props.setRedirect({
        path: '/offline'
      });
    }
  }

  render() {
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

        { this.state.monsters.length ? 
          <div className="album">
            <div className="container">
              <div className="row">
                {allMonsterRows}
              </div>
            </div>
          </div>
          :
          <div className="text-center">
            <div className="spinner-border">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      </>
    );
  }

}

export default Monsters;
