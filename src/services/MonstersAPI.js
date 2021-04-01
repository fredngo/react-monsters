const baseUrl = 'https://monsters-robots-api.herokuapp.com/api/monsters';
const collectionUrl = `${baseUrl}`;
const memberUrl = id => `${baseUrl}/${id}`;

const authHeaders = {
  'X-MONSTERS-API-ID': process.env.REACT_APP_MONSTERS_API_ID,
  'X-MONSTERS-API-SECRET': process.env.REACT_APP_MONSTERS_API_SECRET
};

const handleAPIErrors = response => {
  if (!response.ok) {
    return response.json().then(data => {
      let errors = [];
      Array.isArray(data.error) ? errors = data.error : errors.push(data.error);
      return {errors}
    });
  }
  return response.json().then(data => ({data}));
}

const index = () => {
  return fetch(collectionUrl, {
      headers: authHeaders,
    })
    .then(handleAPIErrors);
}

const show = id => {
  return fetch(memberUrl(id), {
      headers: authHeaders,
    })
    .then(handleAPIErrors);
}

const create = monster => {
  return fetch(collectionUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', ...authHeaders},
      body: JSON.stringify(monster),
    })
    .then(handleAPIErrors);
}

const update = monster => {
  return fetch(memberUrl(monster.id), {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', ...authHeaders},
      body: JSON.stringify(monster),
    })
    .then(handleAPIErrors);
}

const destroy = id => {
  return fetch(memberUrl(id), {
      method: 'DELETE',
      headers: authHeaders,
    })
    .then(handleAPIErrors);
}

const MonstersAPI = {
  index,
  show,
  create,
  update,
  destroy
};

export default MonstersAPI;
