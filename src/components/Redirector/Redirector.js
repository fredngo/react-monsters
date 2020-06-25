import React, {Component} from 'react';

class Redirector extends Component {

  componentDidUpdate() {
    const {redirect, location, history, setRedirect} = this.props;
    const {path, alert} = redirect;

    if (path && path !== location.pathname) {
      history.push({
        pathname: path,
        state: {alert}
      });
    }
    else if (path === location.pathname) {
      setRedirect({});
    }
  }

  render() {
    return <></>;
  }
}

export default Redirector;
