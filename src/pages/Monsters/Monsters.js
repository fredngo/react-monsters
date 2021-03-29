import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import MonstersAPI from '../../services/MonstersAPI';
import MonsterRow from '../../components/MonsterRow/MonsterRow';

const Monsters = ({setModal}) => {

  const [monsters, setMonsters] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      try {
        const {data} = await MonstersAPI.index();
        data ? setMonsters(data) : setModal('internal_server_error');
      }
      catch {
        setModal('offline');
      }
    }
    fetchData();
  }, [setModal]);

  const allMonsterRows = monsters.length ? monsters.map( m => <MonsterRow key={m.id} {...m} /> ) : <></>;

  return (
    <>
      <section className="jumbotron">
        <div className="container">
          <h1 className="display-4">Monsters for Hire, Inc.</h1>
          <hr className="my-4" />
          <p>
            <Link className="btn btn-primary btn-lg" to={'/monsters/new'}>New Monster</Link>
          </p>
        </div>
      </section>

      { monsters.length ? 
        <div className="album">
          <div className="container">
            <div className="row">
              {allMonsterRows}
            </div>
          </div>
        </div>
        :
        <div className="text-center">
          <div className="spinner-border">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
    </>
  );
}

export default Monsters;
