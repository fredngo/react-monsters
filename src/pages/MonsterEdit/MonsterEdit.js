import {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';
import MonsterForm from '../../components/MonsterForm/MonsterForm';
import {SetModalContext} from '../../modals/Modal/Modal';

const MonsterEdit = ({match}) => {

  const setModal = useContext(SetModalContext);

  const [monster, setMonster] = useState({});
  const [redirect, setRedirect] = useState({});

  useEffect( () => {
    const fetchData = async () =>{
      try {
        const {data} = await MonstersAPI.show(match.params.id);

        if (data)
          setMonster(data);
        else
          setRedirect({
            pathname: '/404',
            alert: 'Monster was not found.'
          });
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

  if (redirect.pathname)
    return <Redirect to={{
      pathname: redirect.pathname,
      state: { alert: redirect.alert }
    }} />

  return (
    <div className="container">
      <div className="row">
        <h1 className="mt-4">Editing Monster</h1>
      </div>
      <div className="row">
        <MonsterForm 
          monster={monster}
          setMonster={setMonster}
          callApi={() => MonstersAPI.update(monster)}
          buttonText='Update Monster'
          redirectNotice='Monster was successfully updated.'
          redirectTo={monster => `/monsters/${monster.id}`}
          cancelPath={`/monsters/${monster.id}`}
        />
      </div>
    </div>
  );
}

export default MonsterEdit;
