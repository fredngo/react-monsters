import {useState, useEffect, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';
import {SetModalContext} from '../../modals/Modal/Modal';

const Monster = ({match}) => {

  const setModal = useContext(SetModalContext);

  const [monster, setMonster] = useState({});
  const [redirect, setRedirect] = useState({});

  useEffect( () => {
    const fetchData = async () => {
      try {
        const {data} = await MonstersAPI.show(match.params.id);

        if (data)
          setMonster(data);
        else {
          setRedirect({
            pathname: '/404',
            alert: 'Monster was not found.'
          });
        }
      }
      catch {
        setModal('offline');
        setRedirect({
          pathname: '/'
        });
      }
    }
    fetchData();
  }, [match.params.id, setModal]);

  const handleDelete = async e => {
    e.preventDefault();
    const {data} = await MonstersAPI.destroy(monster.id);

    if (data)
      setRedirect({
        pathname: '/',
        alert: 'Monster was successfully deleted.'
      });
    else {
      setModal('internal_server_error');
    }
  }

  if (redirect.pathname)
    return <Redirect to={{
      pathname: redirect.pathname,
      state: { alert: redirect.alert }
    }} />

  if (!monster.id) return null;

  const {id, name, home, creepiness, bio} = monster;
  const imgSrc = `https://robohash.org/${id}?set=set2&size=300x300`;

  return (
    <div className="container">
      <div className="m-5 card text-center">
        <h3 className="card-header">
          {name}
        </h3>
        <div className="card-body">
          <img className="m-3" src={imgSrc} alt='Monster Pic' />
          <h5 className="card-title">{home}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Creepiness: {creepiness}</h6>
          <p className="card-text">{bio}</p>

          <Link className="btn btn-primary" to={`/monsters/${id}/edit`}>Edit</Link>
          &nbsp;
          <Link className="btn btn-danger" to={`/monsters/${id}`} onClick={handleDelete}>Delete</Link>
        </div>
      </div>
    </div>
  );
}

export default Monster;
