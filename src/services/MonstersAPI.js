const baseUrl = 'https://parseapi.back4app.com/classes/Monster';
const collectionUrl = `${baseUrl}`;
const memberUrl = id => `${baseUrl}/${id}`;

const authHeaders = {
  'X-Parse-Application-Id': process.env.REACT_APP_PARSE_APPLICATION_ID,
  'X-Parse-Javascript-Key': process.env.REACT_APP_PARSE_JAVASCRIPT_KEY,
  //'X-Parse-REST-API-Key': process.env.REACT_APP_PARSE_REST_API_KEY
  //'X-Parse-Session-Token': '',
};

const reformatResponseData = response => {
  if (!response.data) return response;

  // Only pick out the fields we need, drop the rest, or else we could have used ...rest
  const reformatMonster = monster => {
    const {objectId: id, name, home, creepiness, bio} = monster;
    return {id, name, home, creepiness, bio};
  }

  let data = response.data;
  if (data.results && Array.isArray(data.results))
    data = data.results.map(m => reformatMonster(m));
  else
    data = reformatMonster(data);

  return {data};
}

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

  //console.log(localStorage.getItem('sessionToken'))

  return fetch(collectionUrl, {
      headers: {
      //   'X-Parse-Session-Token': localStorage.getItem('sessionToken'),
        ...authHeaders
      },
    })
    .then(handleAPIErrors)
    .then(reformatResponseData);
}

const show = id => {
  return fetch(memberUrl(id), {
      headers: authHeaders,
    })
    .then(handleAPIErrors)
    .then(reformatResponseData);
}

const create = monster => {
  return fetch(collectionUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', ...authHeaders},
      body: JSON.stringify(monster),
    })
    .then(handleAPIErrors)
    .then(reformatResponseData);
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
}

export default MonstersAPI;
