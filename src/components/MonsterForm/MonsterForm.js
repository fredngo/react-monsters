import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

class MonsterForm extends Component {

  state = {
    errors: [],
    redirect: {
      pathname: false,
      notice: null,
    },
  }

  handleChange = e => 
    this.props.setMonster({
      ...this.props.monster, 
      [e.target.name]: e.target.value
    });

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const {data, errors} = await this.props.callApi();

      if (data) {
        this.setState({redirect: {
          pathname: this.props.redirectTo(data),
          notice: this.props.redirectNotice
        }});
      }
      else {
        this.setState({errors});
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

    const {monster, buttonText, cancelPath} = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          {
            !this.state.errors.length ? null :
            <div className="alert alert-warning">
              <h2>{this.state.errors.length} error(s) prohibited this monster from being saved:</h2>

              <ul>
                { this.state.errors.map( (m, i) => <li key={i}>{m}</li> ) }
              </ul>
            </div>
          }

          <div className="form-group">
            <label>
              <span>Name</span>
              <input
                className="form-control"
                name="name"
                defaultValue={monster.name}
                onChange={this.handleChange}
                // required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <span>Home</span>
              <input
                className="form-control"
                name="home"
                defaultValue={monster.home}
                onChange={this.handleChange}
                // required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <span>Creepiness</span>
              <input
                className="form-control"
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
              <textarea
                className="form-control"
                name="bio"
                defaultValue={monster.bio}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <button className="btn btn-primary">{buttonText}</button>
          <Link className="btn btn-link" to={cancelPath}>Cancel</Link>
        </form>
      </>
    );
  }
}

export default MonsterForm;
