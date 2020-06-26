import React, {Component} from 'react';

class UserForm extends Component {

  state = {
    errors: [],
  }

  handleChange = e =>
    this.props.setUser({
      ...this.props.user,
      [e.target.name]: e.target.value
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
      this.props.setRedirect({
        path: '/offline'
      });
    }
  }

  render() {
    return (
      <>
        {
          !this.state.errors.length ? null :
          <div className="alert alert-warning">
            <h2>{this.state.errors.length} error(s) occurred:</h2>

            <ul>
              { this.state.errors.map( (m, i) => <li key={i}>{m}</li> ) }
            </ul>
          </div>
        }

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              <span>Email Address</span>
              <input
                className="form-control"
                type="email"
                name="email"
                //defaultValue={}
                onChange={this.handleChange}
                //required
                autoFocus
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              <span>Password</span>
              <input
                className="form-control"
                type="password"
                name="password"
                //defaultValue={}
                onChange={this.handleChange}
                //required
              />
            </label>
          </div>
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
      </>
    );
  }
}

export default UserForm;
