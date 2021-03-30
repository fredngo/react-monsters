import {useState} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Monsters from './pages/Monsters/Monsters';
import Monster from './pages/Monster/Monster';
import MonsterEdit from './pages/MonsterEdit/MonsterEdit';
import MonsterNew from './pages/MonsterNew/MonsterNew';
import NotFound from './pages/NotFound/NotFound';
import InternalServerError from './modals/InternalServerError/InternalServerError';
import Offline from './modals/Offline/Offline';
import Redirector from './components/Redirector/Redirector';
import Alert from './components/Alert/Alert';
import RedirectContext from './components/RedirectContext/RedirectContext';

const App = () => {

  const [redirect, setRedirect] = useState({});
  const [modal, setModal] = useState(false);

  return (
    <RedirectContext.Provider value={setRedirect}>
      { modal === 'offline' ? <Offline closeModal={() => setModal(false)} /> : null }
      { modal === 'internal_server_error' ? <InternalServerError closeModal={() => setModal(false)} /> : null }

      <Route 
        render={ routeProps => <Redirector redirect={redirect} setRedirect={setRedirect} {...routeProps} />}
      />

      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <Link className="navbar-brand" to='/'>MfH, Inc.</Link>
        </nav>
      </header>
      
      <main>
        <Route render={ routeProps =>
          !routeProps.location.state?.alert ? '' : <Alert message={routeProps.location.state.alert} />}
        />

        <Switch>
          <Route path="/monsters/new" render={ () =>
            <MonsterNew setModal={setModal} />
          } />
          <Route path="/monsters/:id/edit" render={ routeProps =>
            <MonsterEdit setModal={setModal} {...routeProps} />
          } />
          <Route path="/monsters/:id" render={ routeProps =>
            <Monster setModal={setModal} {...routeProps} />
          } />
          <Route exact path="/" render={ () =>
            <Monsters setModal={setModal} />
          } />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </RedirectContext.Provider>
  );
}

export default App;
