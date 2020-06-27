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
        <div className="modal-backdrop fade show"></div> 
        <div className="modal" tabIndex="-1" role="dialog" style={{display:"block"}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={this.handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{this.props.headerText}</h5>
                  <button type="button" className="close" name={this.props.modalName} onClick={this.props.toggleModal}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  {
                    !this.state.errors.length ? null :
                    <div className="alert alert-warning">
                      <h2>{this.state.errors.length} error(s) occurred:</h2>

                      <ul>
                        { this.state.errors.map( (m, i) => <li key={i}>{m}</li> ) }
                      </ul>
                    </div>
                  }
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
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">{this.props.buttonText}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserForm;
