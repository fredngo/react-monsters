import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MonsterForm extends Component {

  state = {
    errors: [],
  }

  handleChange = e => 
    this.props.setMonster({
      ...this.props.monster, 
      [e.target.name]: e.target.valueAsNumber || e.target.value
    });

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const {data, errors} = await this.props.callApi();

      if (data) {
        this.props.setRedirect({
          path: this.props.redirectTo(data),
          alert: this.props.redirectNotice
        });
      }
      else {
        this.setState({errors});
      }
    }
    catch {
      this.props.setModal('offline');
    }
  }

  render() {
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
          <div className="form-group">
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
