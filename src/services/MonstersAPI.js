const apiKey = 'awesomesauce';
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
  return fetch(collectionUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({monster}),
    }).then(response => response.json());
}

const update = (monster) => {
  return fetch(memberUrl(monster.id), {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({monster}),
    }).then(response => response.json());
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
