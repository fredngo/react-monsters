import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Monsters from './pages/Monsters/Monsters';
import Monster from './pages/Monster/Monster';
import MonsterEdit from './pages/MonsterEdit/MonsterEdit';
import MonsterNew from './pages/MonsterNew/MonsterNew';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

import NotFound from './pages/NotFound/NotFound';
import InternalServerError from './modals/InternalServerError/InternalServerError';
import Offline from './modals/Offline/Offline';
import Redirector from './components/Redirector/Redirector';

class App extends Component {

  state = {
    redirect: {},
    modal: false,
    user: {},
    login: false,
    signup: false,
  }

  setUser = user =>
    this.setState({user});

  setRedirect = redirect =>
    this.setState({redirect})

  setModal = modal =>
    this.setState({modal})

  toggleModal = e => {
    e.preventDefault();
    e.persist();
    this.setState(prevState => (
      {
        user: {},
        [e.target.name]:!prevState[e.target.name],
      }
    ));
  }

  render() {
    return (
      <>
        { this.state.modal === 'offline' ? <Offline closeModal={() => this.setModal(false)} /> : null }
        { this.state.modal === 'internal_server_error' ? <InternalServerError closeModal={() => this.setModal(false)} /> : null }
        { (this.state.login) ? <Login user={this.state.user} setUser={this.setUser} setRedirect={this.setRedirect} toggleModal={this.toggleModal} /> : null }
        { (this.state.signup) ? <Signup user={this.state.user} setUser={this.setUser} setRedirect={this.setRedirect} toggleModal={this.toggleModal} /> : null }

        <Route
          render={ routeProps => <Redirector redirect={this.state.redirect} setRedirect={this.setRedirect} {...routeProps} />}
        />

        <header>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark d-flex justify-content-between">
            <Link className="navbar-brand" to='/'>MfH, Inc.</Link>

            <div className="navbar-nav">
              <button className="nav-item nav-link btn btn-link" name="login" onClick={this.toggleModal}>Login</button>
              <button className="nav-item nav-link btn btn-link" name="signup" onClick={this.toggleModal}>Sign Up</button>
            </div>
          </nav>
        </header>
        
        <main>
          <Route render={ routeProps =>
            !routeProps.location.state?.alert ? '' :
            <div className="position-relative float-right m-3 alert alert-primary">
              {routeProps.location.state.alert}
            </div>}
          />
  
          <Switch>
            <Route path="/monsters/new"
              render={ () => <MonsterNew setRedirect={this.setRedirect} setModal={this.setModal} />}
            />
            <Route path="/monsters/:id/edit"
              render={ routeProps => <MonsterEdit setRedirect={this.setRedirect} setModal={this.setModal} {...routeProps} />}
            />
            <Route path="/monsters/:id"
              render={ routeProps => <Monster setRedirect={this.setRedirect} setModal={this.setModal} {...routeProps} />}
            />
            <Route exact path="/"
              render={ () => <Monsters setRedirect={this.setRedirect} setModal={this.setModal} />}
            />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
