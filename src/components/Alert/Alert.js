import {useEffect} from 'react';

const Alert = ({location, history}) => {

  useEffect( () => {
    //console.log(location);
    if (location.state?.alert) {
      //console.log('Alert: Clearing alert message')
      const timer = setTimeout( () => history.replace({state: undefined}), 4000);
      return () => clearTimeout(timer);
    }
  });

  return !(location.state?.alert) ? null :
    <div className="position-relative float-right m-3 alert alert-primary">
      {location.state.alert}
    </div>
}

export default Alert;
