import {useEffect, createContext, useContext} from 'react';

export const SetRedirectContext = createContext();

const Redirector = ({redirect, location, history}) => {

  const setRedirect = useContext(SetRedirectContext);

  useEffect( () => {
    const {path, alert} = redirect;
    if (!path) return;

    if (path !== location.pathname) {
      //console.log('Redirector::performRedirect: Redirecting to', path)
      history.push({
        pathname: path,
        state: {alert}
      });
    }
    else {
      //console.log('Redirector::performRedirect: Clearing Redirect')
      setRedirect({});
      setTimeout( () => history.replace({state: {}}), 4000);
    }
  }, [redirect, location, history, setRedirect]);

  return null;
}

export default Redirector;
