
const baseUrl = 'http://react-monsters-api.herokuapp.com/api/monsters';
const apiKey = 'awesomesauce';

const index = () => {
  const url = `${baseUrl}?api_key=${apiKey}`;
  return fetch(url)
    .then( response => response.json() );
}

const show = (id) => {
  const url = `${baseUrl}/${id}?api_key=${apiKey}`;
  return fetch(url)
    .then( response => response.json() );
}

const MonstersAPI = {
  index,
  show
}

export default MonstersAPI;
