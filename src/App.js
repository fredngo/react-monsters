import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';

import Monsters from './components/Monsters/Monsters';
import Monster from './components/Monster/Monster';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/monsters/:id"
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
