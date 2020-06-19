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
  console.log('Create Monster')
}

const update = (monster) => {
  console.log('Update Monster')
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
