const apiKey = process.env.REACT_APP_MONSTERS_API_KEY;
const baseUrl = 'http://react-monsters-api.herokuapp.com/api/monsters';
const collectionUrl = `${baseUrl}?api_key=${apiKey}`;
const memberUrl = (id) => `${baseUrl}/${id}?api_key=${apiKey}`;

const handleAPIErrors = response => {
  if (!response.ok) {
    return response.json().then(data => {
      let errors = [];
      Array.isArray(data.errors) ? errors = data.errors : errors.push(data.errors);
      return {errors}
    });
  }
  return response.json().then(data => ({data}));;
}

const index = () => {
  return fetch(collectionUrl)
    .then(handleAPIErrors);
}

const show = (id) => {
  return fetch(memberUrl(id))
    .then(handleAPIErrors);
}

const create = (monster) => {
  return fetch(collectionUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(monster),
    })
    .then(handleAPIErrors);
}

const update = (monster) => {
  return fetch(memberUrl(monster.id), {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(monster),
    })
    .then(handleAPIErrors);
}

const destroy = (id) => {
  return fetch(memberUrl(id), {
      method: 'DELETE'
    })
    .then(handleAPIErrors);
}

const MonstersAPI = {
  index,
  show,
  create,
  update,
  destroy
}

export default MonstersAPI;
