const apiKey = process.env.REACT_APP_MONSTERS_API_KEY;
const baseUrl = 'http://react-monsters-api.herokuapp.com/api/monsters';
const collectionUrl = `${baseUrl}?api_key=${apiKey}`;
const memberUrl = (id) => `${baseUrl}/${id}?api_key=${apiKey}`;

const handleResponse = response => {
  if (!response.ok) {
    return response.json().then(data => {
      let errors = [];
      Array.isArray(data.error) ? errors = data.error : errors.push(data.error);
      return {errors}
    });
  }
  return response.json().then(data => ({response: data}));;
}

const index = () => {
  return fetch(collectionUrl)
    .then(handleResponse);
}

const show = (id) => {
  return fetch(memberUrl(id))
    .then(handleResponse);
}

const create = (monster) => {
  return fetch(collectionUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(monster),
    })
    .then(handleResponse);
}

const update = (monster) => {
  return fetch(memberUrl(monster.id), {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(monster),
    })
    .then(handleResponse);
}

const destroy = (id) => {
  return fetch(memberUrl(id), {
      method: 'DELETE'
    })
    .then(handleResponse);
}

const MonstersAPI = {
  index,
  show,
  create,
  update,
  destroy
}

export default MonstersAPI;
