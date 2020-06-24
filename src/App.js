import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Monsters from './pages/Monsters/Monsters';
import Monster from './pages/Monster/Monster';
import MonsterEdit from './pages/MonsterEdit/MonsterEdit';
import MonsterNew from './pages/MonsterNew/MonsterNew';
import NotFound from './pages/NotFound/NotFound';
import InternalServerError from './pages/InternalServerError/InternalServerError';
import Offline from './pages/Offline/Offline';

const App = () => {
  return (
    <div>
      <Route path="/" render={ routeProps =>
        !routeProps.location.state?.notice ? '' :
        <div class="alert alert-primary" role="alert">
          {routeProps.location.state.notice}
        </div>}
      />

      <Switch>
        <Route path="/monsters/new">
          <MonsterNew />
        </Route>
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
    </div>
  );
}

export default App;
