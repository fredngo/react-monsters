import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Monsters from './pages/Monsters/Monsters';
import Monster from './pages/Monster/Monster';
import MonsterEdit from './pages/MonsterEdit/MonsterEdit';
import MonsterNew from './pages/MonsterNew/MonsterNew';

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
          render={ routeProps => <Monster id={routeProps.match.params.id} />}
        />
        <Route path="/">
          <Monsters />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
