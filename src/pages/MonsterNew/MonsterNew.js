import {useState} from 'react';

import MonstersAPI from '../../services/MonstersAPI';
import MonsterForm from '../../components/MonsterForm/MonsterForm';

const MonsterNew = () =>  {

  const [monster, setMonster] = useState({});

  return (
    <div className="container">
      <div className="row">
        <h1 className="mt-4">New Monster</h1>
      </div>
      <div className="row">
        <MonsterForm
          monster={monster}
          setMonster={setMonster}
          callApi={() => MonstersAPI.create(monster)}
          buttonText='Create Monster'
          redirectNotice='Monster was successfully created.'
          redirectTo={monster => `/monsters/${monster.id}`}
          cancelPath='/'
        />
      </div>
    </div>
  );
}

export default MonsterNew;
