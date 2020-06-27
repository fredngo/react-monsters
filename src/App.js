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
    user: {},
    redirect: {},
    modal: false,
    loggingIn: false,
    signingUp: false,
  }

  setUser = user =>
    this.setState({user});

  setRedirect = redirect =>
    this.setState({redirect})

  setModal = modal =>
    this.setState({modal})

  render() {
    return (
      <>
        { this.state.modal === 'offline' ? <Offline closeModal={() => this.setModal(false)} /> : null }
        { this.state.modal === 'internal_server_error' ? <InternalServerError closeModal={() => this.setModal(false)} /> : null }
        { (this.state.loggingIn) ? <Login user={this.state.user} setUser={this.setUser} setRedirect={this.setRedirect} /> : null }
        { (this.state.signingUp) ? <Signup user={this.state.user} setUser={this.setUser} setRedirect={this.setRedirect} /> : null }

        <Route 
          render={ routeProps => <Redirector redirect={this.state.redirect} setRedirect={this.setRedirect} {...routeProps} />}
        />

        <header>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark d-flex justify-content-between">
            <Link className="navbar-brand" to='/'>MfH, Inc.</Link>

            <div className="navbar-nav">
              <Link className="nav-item nav-link" to='/login'>Login</Link>
              <Link className="nav-item nav-link" to='/signup'>Signup</Link>
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
            {/* <Route path="/Login" 
              render={ () => <Login user={this.state.user} setUser={this.setUser} setRedirect={this.setRedirect} />}
            /> */}
            <Route path="/Signup" 
              render={ () => <Signup user={this.state.user} setUser={this.setUser} setRedirect={this.setRedirect} />}
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
