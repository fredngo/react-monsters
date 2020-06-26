import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Monsters from './pages/Monsters/Monsters';
import Monster from './pages/Monster/Monster';
import MonsterEdit from './pages/MonsterEdit/MonsterEdit';
import MonsterNew from './pages/MonsterNew/MonsterNew';
import NotFound from './pages/NotFound/NotFound';
import InternalServerError from './pages/InternalServerError/InternalServerError';
import Offline from './pages/Offline/Offline';
import Redirector from './components/Redirector/Redirector';

class App extends Component {

  state = {
    redirect: {},
  }

  setRedirect = redirect =>
    this.setState({redirect})

  render() {
    return (
      <>
        <Route 
          render={ routeProps => <Redirector redirect={this.state.redirect} setRedirect={this.setRedirect} {...routeProps} />}
        />

        <header>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand" to='/'>MfH, Inc.</Link>
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
              render={ () => <MonsterNew setRedirect={this.setRedirect} />}
            />
            <Route path="/monsters/:id/edit"
              render={ routeProps => <MonsterEdit setRedirect={this.setRedirect} {...routeProps} />}
            />
            <Route path="/monsters/:id"
              render={ routeProps => <Monster setRedirect={this.setRedirect} {...routeProps} />}
            />
            <Route exact path="/"
              render={ () => <Monsters setRedirect={this.setRedirect} />}
            />
            <Route path="/404" component={NotFound} />
            <Route path="/500" component={InternalServerError} />
            <Route path="/offline" component={Offline} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
