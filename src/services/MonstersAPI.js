const apiKey = process.env.REACT_APP_MONSTERS_API_KEY;
const baseUrl = 'http://react-monsters-api.herokuapp.com/api/monsters';
const collectionUrl = `${baseUrl}?api_key=${apiKey}`;
const memberUrl = (id) => `${baseUrl}/${id}?api_key=${apiKey}`;

const index = () => {
  return fetch(collectionUrl)
    .then(response => response.json());
}

const show = (id) => {
  return fetch(memberUrl(id))
    .then(response => response.json());
}

const create = (monster) => {
  const body = JSON.stringify({monster});
  return fetch(collectionUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body,
    })
    .then(response => response.json());
}

const update = (monster) => {
  const body = JSON.stringify({monster});
  return fetch(memberUrl(monster.id), {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body,
    })
    .then(response => response.json());
}

const destroy = (id) => {
  return fetch(memberUrl(id), {method: 'DELETE'});
}

const MonstersAPI = {
  index,
  show,
  create,
  update,
  destroy
}

export default MonstersAPI;
