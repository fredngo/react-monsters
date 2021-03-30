import {useState} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Monsters from './pages/Monsters/Monsters';
import Monster from './pages/Monster/Monster';
import MonsterEdit from './pages/MonsterEdit/MonsterEdit';
import MonsterNew from './pages/MonsterNew/MonsterNew';
import NotFound from './pages/NotFound/NotFound';
import {ModalContext} from './modals/Modal/Modal';
import InternalServerError from './modals/InternalServerError/InternalServerError';
import Offline from './modals/Offline/Offline';
import Redirector, {RedirectContext} from './components/Redirector/Redirector';
import Alert from './components/Alert/Alert';

const App = () => {

  const [redirect, setRedirect] = useState({});
  const [modal, setModal] = useState(false);

  return (
    <RedirectContext.Provider value={setRedirect}>
      <ModalContext.Provider value={setModal}>
        <Offline activated={modal==='offline'} />
        <InternalServerError activated={modal==='internal_server_error'} />

        <Route 
          render={ routeProps => <Redirector redirect={redirect} {...routeProps} />}
        />

        <header>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand" to='/'>MfH, Inc.</Link>
          </nav>
        </header>
        
        <main>
          <Route render={ routeProps =>
            !routeProps.location.state?.alert ? null : 
            <Alert message={routeProps.location.state.alert} />}
          />

          <Switch>
            <Route path="/monsters/new" component={MonsterNew} />
            <Route path="/monsters/:id/edit" render={ routeProps =>
              <MonsterEdit {...routeProps} />
            } />
            <Route path="/monsters/:id" render={ routeProps =>
              <Monster {...routeProps} />
            } />
            <Route exact path="/" component={Monsters} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </ModalContext.Provider>
    </RedirectContext.Provider>
  );
}

export default App;
