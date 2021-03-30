import {Component} from 'react';

class Redirector extends Component {

  componentDidUpdate() {
    //console.log('Redirector::componentDidUpdate')
    const {redirect, location, history, setRedirect} = this.props;
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
  }

  render() {
    return null;
  }
}

export default Redirector;
