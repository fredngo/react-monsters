import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

class Monster extends Component {

  state = {
    monster: {},
    redirect: {
      pathname: false,
      notice: null,
    },
  }
  
  async componentDidMount() {
    try {
      const {data} = await MonstersAPI.show(this.props.match.params.id);

      if (data) {
        this.setState({monster: data});
      }
      else {
        this.setState({redirect: {
          pathname: '/404',
          notice: 'Monster was not found.'
        }});
      }
    }
    catch {
      this.setState({redirect: {
        pathname: '/offline'
      }});
    }
  }

  handleDelete = async e => {
    e.preventDefault();
    const {data} = await MonstersAPI.destroy(this.state.monster.id);

    if (data)
      this.setState({redirect: {
        pathname: '/',
        notice: 'Monster was successfully deleted.'
      }});
    else {
      this.setState({redirect: {
        pathname: '/500',
        notice: 'Error when deleting a monster.'
      }});
    }
  }

  render() {
    const {pathname, notice} = this.state.redirect;
    if (pathname) return <Redirect to={{ pathname, state: { notice } }} />

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
