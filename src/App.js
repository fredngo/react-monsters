import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Monsters from './pages/Monsters/Monsters';
import Monster from './pages/Monster/Monster';
import MonsterEdit from './pages/MonsterEdit/MonsterEdit';
import MonsterNew from './pages/MonsterNew/MonsterNew';
import NotFound from './pages/NotFound/NotFound';
import InternalServerError from './pages/InternalServerError/InternalServerError';
import Offline from './pages/Offline/Offline';

const App = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <Link className="navbar-brand" to='/'>MfH, Inc.</Link>
        </nav>
      </header>
      
      <main>
        <Route path="/" render={ routeProps =>
          !routeProps.location.state?.notice ? '' :
          <div className="m-3 alert alert-primary">
            {routeProps.location.state.notice}
          </div>}
        />

        <Switch>
          <Route path="/monsters/new" component={MonsterNew} />
          <Route path="/monsters/:id/edit"
            render={ routeProps => <MonsterEdit {...routeProps} />}
          />
          <Route path="/monsters/:id"
            render={ routeProps => <Monster {...routeProps} />}
          />
          <Route exact path="/"
            render={ routeProps => <Monsters {...routeProps} />}
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

export default App;
