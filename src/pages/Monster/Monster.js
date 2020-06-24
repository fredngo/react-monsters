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
      const {data} = await MonstersAPI.show(this.props.id);

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
    catch() {
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
    const imgSrc = `https://robohash.org/${id}?set=set2&size=200x200`;

    return (
      <>
        <p id="notice">{this.props.redirect_state?.notice ? this.props.redirect_state.notice : ''}</p>

        <Link to='/'>Back</Link>
  
        <h1>{name}</h1>
  
        <img src={imgSrc} alt='Monster Pic' />

        <h2>Home: {home}</h2>
        <h2>Creepiness: {creepiness}</h2>
  
        <h2>Bio:</h2>
        <p>{bio}</p>

        <Link to={`/monsters/${id}/edit`}>Edit</Link>
        &nbsp;
        <Link to={`/monsters/${id}`} onClick={this.handleDelete}>Delete</Link>
      </>
    );
  }
}

export default Monster;
