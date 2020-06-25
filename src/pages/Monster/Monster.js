import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

class Monster extends Component {

  state = {
    monster: {},
  }
  
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
      this.props.setRedirect({
        path: '/offline'
      });
    }
  }

  handleDelete = async e => {
    e.preventDefault();
    const {data} = await MonstersAPI.destroy(this.state.monster.id);

    if (data)
    this.props.setRedirect({
        path: '/',
        alert: 'Monster was successfully deleted.'
      });
    else {
      this.props.setRedirect({
        path: '/500',
        alert: 'Error when deleting a monster.'
      });
    }
  }

  render() {
    if (!this.state.monster.id) return <></>

    const {id, name, home, creepiness, bio} = this.state.monster;
    const imgSrc = `https://robohash.org/${id}?set=set2&size=300x300`;

    return (
      <>
        <div className="container">
          <div className="m-5 card text-center">
            <h3 className="card-header">
              {name}
            </h3>
            <div className="card-body">
              <img className="m-3" src={imgSrc} alt='Monster Pic' />
              <h5 className="card-title">{home}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Creepiness: {creepiness}</h6>
              <p className="card-text">{bio}</p>

              <Link className="btn btn-primary" to={`/monsters/${id}/edit`}>Edit</Link>
              &nbsp;
              <Link className="btn btn-danger" to={`/monsters/${id}`} onClick={this.handleDelete}>Delete</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Monster;
