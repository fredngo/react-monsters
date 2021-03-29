import {Link} from 'react-router-dom';

const MonsterRow = ({id, name, home, creepiness}) => {
  const imgSrc = `https://robohash.org/${id}?set=set2&size=250x250`;

  return (
    <div className="col-md-3">
      <div className="card mb-4 shadow-sm">
        <img className="card-img-top" src={imgSrc} alt='Monster Pic' />
        <div className="card-body">
          <h5 className="card-title"><Link to={`/monsters/${id}`}>{name}</Link></h5>
          <h6 className="card-subtitle mb-2 text-muted">{home}</h6>
          <p className="card-text"><strong>Creepiness:</strong> {creepiness}</p>
        </div>
      </div>
    </div>
  );
}

export default MonsterRow;
