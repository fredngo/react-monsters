import {useState, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';

import {SetModalContext} from '../../modals/Modal/Modal';

const MonsterForm = ({monster, setMonster, callApi, buttonText, redirectNotice, redirectTo, cancelPath}) => {

  const setModal = useContext(SetModalContext);

  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState({});

  const handleChange = e => 
    setMonster({
      ...monster, 
      [e.target.name]: e.target.valueAsNumber || e.target.value
    });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const {data, errors} = await callApi();

      if (data)
        setRedirect({
          pathname: redirectTo(data),
          alert: redirectNotice
        });
      else
        setErrors(errors);
    }
    catch {
      setModal('offline');
    }
  }

  if (redirect.pathname)
    return <Redirect to={{
      pathname: redirect.pathname,
      state: { alert: redirect.alert }
    }} />

  return (
    <form onSubmit={handleSubmit}>
      {
        !errors.length ? null :
        <div className="alert alert-warning">
          <h2>{errors.length} error(s) prohibited this monster from being saved:</h2>
          <ul>
            { errors.map( (m, i) => <li key={i}>{m}</li> ) }
          </ul>
        </div>
      }

      <div className="form-group">
        <label>
          <span>Name</span>
          <input
            className="form-control"
            name="name"
            defaultValue={monster.name}
            onChange={handleChange}
            // required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Home</span>
          <input
            className="form-control"
            name="home"
            defaultValue={monster.home}
            onChange={handleChange}
            // required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Creepiness</span>
          <input
            className="form-control"
            type="number"
            name="creepiness"
            defaultValue={monster.creepiness}
            onChange={handleChange}
            // required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Bio</span>
          <textarea
            className="form-control"
            name="bio"
            defaultValue={monster.bio}
            onChange={handleChange}
          />
        </label>
      </div>
      <button className="btn btn-primary">{buttonText}</button>
      <Link className="btn btn-link" to={cancelPath}>Cancel</Link>
    </form>
  );
}

export default MonsterForm;
