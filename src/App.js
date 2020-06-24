import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Monsters from './pages/Monsters/Monsters';
import Monster from './pages/Monster/Monster';
import MonsterEdit from './pages/MonsterEdit/MonsterEdit';
import MonsterNew from './pages/MonsterNew/MonsterNew';
import NotFound from './pages/NotFound/NotFound';
import InternalServerError from './pages/InternalServerError/InternalServerError';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/monsters/new">
          <MonsterNew />
        </Route>
        <Route path="/monsters/:id/edit"
          render={ routeProps => <MonsterEdit id={routeProps.match.params.id} />}
        />
        <Route path="/monsters/:id"
          render={ routeProps => <Monster id={routeProps.match.params.id} redirect_state={routeProps.location.state} />}
        />
        <Route exact path="/"
          render={ routeProps => <Monsters redirect_state={routeProps.location.state} />}
        />
        <Route path="/404" component={NotFound} />
        <Route path="/500" component={InternalServerError} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
