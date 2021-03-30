import {useState, useContext} from 'react';

import MonstersAPI from '../../services/MonstersAPI';

import RedirectContext from '../../components/RedirectContext/RedirectContext';
import MonsterForm from '../../components/MonsterForm/MonsterForm';

const MonsterNew = ({setModal}) =>  {

  const setRedirect = useContext(RedirectContext);

  const [monster, setMonster] = useState({});

  const callApi = () => MonstersAPI.create(monster);

  const redirectTo = monster => `/monsters/${monster.id}`;

  return (
    <div className="container">
      <div className="row">
        <h1 className="mt-4">New Monster</h1>
      </div>
      <div className="row">
        <MonsterForm
          monster={monster}
          setMonster={setMonster}
          callApi={callApi}
          buttonText='Create Monster'
          redirectNotice='Monster was successfully created.'
          redirectTo={redirectTo}
          setRedirect={setRedirect}
          setModal={setModal}
          cancelPath='/'
        />
      </div>
    </div>
  );
}

export default MonsterNew;
