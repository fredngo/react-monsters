import {useState, useEffect, useContext} from 'react';

import MonstersAPI from '../../services/MonstersAPI';
import MonsterForm from '../../components/MonsterForm/MonsterForm';
import RedirectContext from '../../components/RedirectContext/RedirectContext';
import ModalContext from '../../components/ModalContext/ModalContext';

const MonsterEdit = ({match}) => {

  const setModal = useContext(ModalContext);
  const setRedirect = useContext(RedirectContext);

  const [monster, setMonster] = useState({});

  const callApi = () => MonstersAPI.update(monster);

  const redirectTo = () => `/monsters/${monster.id}`;

  useEffect( () => {
    const fetchData = async () =>{
      try {
        const {data} = await MonstersAPI.show(match.params.id);

        if (data)
          setMonster(data);
        else
          setRedirect({
            path: '/404',
            alert: 'Monster was not found.'
          });
      }
      catch {
        setModal('offline');
      }
    }
    fetchData();
  }, [match.params.id, setRedirect, setModal]);

  return (
    <div className="container">
      <div className="row">
        <h1 className="mt-4">Editing Monster</h1>
      </div>
      <div className="row">
        <MonsterForm 
          monster={monster}
          setMonster={setMonster}
          callApi={callApi}
          buttonText='Update Monster'
          redirectNotice='Monster was successfully updated.'
          redirectTo={redirectTo}
          cancelPath={`/monsters/${monster.id}`}
        />
      </div>
    </div>
  );
}

export default MonsterEdit;
