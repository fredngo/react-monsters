import React from 'react';
import {Link} from 'react-router-dom';

const MonsterRow = ({id, name, home, creepiness}) => {
  const imgSrc = `https://robohash.org/${id}?set=set2&size=100x100`;

  return (
    <tr>
      <td><img src={imgSrc} alt='Monster Pic' /></td>
      <td><Link to={`/monsters/${id}`}>{name}</Link></td>
      <td>{home}</td>
      <td>{creepiness}</td>
    </tr>
  );
}

export default MonsterRow;
