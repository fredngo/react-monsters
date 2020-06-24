import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class MonsterForm extends Component {

  state = {
    errors: [],
    redirect: {
      pathname: false,
      notice: '',
    },
  }

  handleChange = e => 
    this.props.setMonster({...this.props.monster, [e.target.name]: e.target.value});

  handleSubmit = async e => {
    e.preventDefault();

    const response = await this.props.callApi();

    if (!response.error)
      this.setState({redirect: {
        pathname: `/monsters/${response.id}`,
        notice: this.props.successNotice
      }});
    else {
      let errors = [];
      Array.isArray(response.error) ? errors = response.error : errors.push(response.error)
      this.setState({errors});
    }
  }

  render() {
    const {pathname, notice} = this.state.redirect;
    if (pathname) return <Redirect to={{ pathname, state: { notice } }} />

    const {monster, buttonText} = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          {
            !this.state.errors.length ? null :
            <div id="error_explanation">
              <h2>{this.state.errors.length} error(s) prohibited this monster from being saved:</h2>

              <ul>
                { this.state.errors.map( (m, i) => <li key={i}>{m}</li> ) }
              </ul>
            </div>
          }

          <div>
            <label>
              <span>Name</span>
              &nbsp;
              <input
                name="name"
                defaultValue={monster.name}
                onChange={this.handleChange}
                // required
              />
            </label>
          </div>
          <div>
            <label>
              <span>Home</span>
              &nbsp;
              <input
                name="home"
                defaultValue={monster.home}
                onChange={this.handleChange}
                // required
              />
            </label>
          </div>
          <div>
            <label>
              <span>Creepiness</span>
              &nbsp;
              <input
                type="number"
                name="creepiness"
                defaultValue={monster.creepiness}
                onChange={this.handleChange}
                // required
              />
            </label>
            </div>
            <div>
            <label>
              <span>Bio</span>
              &nbsp;
              <textarea
                name="bio"
                defaultValue={monster.bio}
                onChange={this.handleChange}
              />
            </label>
            </div>
          <button>{buttonText}</button>
        </form>
      </>
    );
  }
}

export default MonsterForm;
