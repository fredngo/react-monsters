import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';

import MonsterForm from '../../components/MonsterForm/MonsterForm';

class MonsterEdit extends Component {

  state = {
    monster: {},
    errors: [],
    redirect: {
      pathname: false,
      notice: '',
    },
  }
  
  async componentDidMount() {
    const monster = await MonstersAPI.show(this.props.id);
    this.setState({monster})
  }

  handleChange = e => {
    e.persist();
    this.setState( prevState => {
      const nextMonster = {...prevState.monster};
      nextMonster[e.target.name] = e.target.value;
      return {monster: nextMonster};
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await MonstersAPI.update(this.state.monster);
    if (!response.error)
      this.setState({redirect: {
        pathname: `/monsters/${this.state.monster.id}`,
        notice: 'Monster was successfully updated.'
      }});
    else {
      this.setState({errors: response.error});
    }
  }

  render() {
    if (this.state.redirect.pathname)
      return <Redirect to={{
        pathname: this.state.redirect.pathname,
        state: { notice: this.state.redirect.notice }
      }} />

    const {id} = this.state.monster;
    if (!id) return <></>

    return (
      <>
        <Link to={`/monsters/${id}`}>Back</Link>
  
        <h1>Editing Monster</h1>

        <MonsterForm 
          {...this.state.monster}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          buttonText='Update Monster' 
          errors={this.state.errors}
        />
      </>
    );
  }
}

export default MonsterEdit;
