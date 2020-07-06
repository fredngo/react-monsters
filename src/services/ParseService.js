//import Parse from "parse";


const baseUrl = 'https://parseapi.back4app.com/users';
const collectionUrl = `${baseUrl}`;
const memberUrl = id => `${baseUrl}/${id}`;

const authHeaders = {
  'X-Parse-Application-Id': process.env.REACT_APP_PARSE_APPLICATION_ID,
  'X-Parse-Javascript-Key': process.env.REACT_APP_PARSE_JAVASCRIPT_KEY
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

const reformatResponseData = response => {
  if (!response.data) return response;

  // Only pick out the fields we need, drop the rest, or else we could have used ...rest
  const reformatUser = user => {
    const {objectId: id, sessionToken} = user;
    return {id, sessionToken};
  }

  let data = response.data;
  if (data.results && Array.isArray(data.results))
    data = data.results.map(m => reformatUser(m));
  else
    data = reformatUser(data);

  return {data};
}

const login = user => {
  console.log("Logging in");
  return fetch(collectionUrl, {
    headers: authHeaders,
    body: JSON.stringify(user),
  })
  .then(handleAPIErrors)
  .then(reformatResponseData);
}

const signup = user => {
  console.log("Signing up");
  return fetch(collectionUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', ...authHeaders},
    body: JSON.stringify(user),
  })
  .then(handleAPIErrors)
  .then(reformatResponseData);
}

const logout = () => {
}

const ParseService = {
  login,
  signup,
  logout,
}

export default ParseService;


// const callApi = () => {
//   console.log('Logging In via API');

//   try{
//     await Parse.User.logIn(this.state.username, this.state.password);
//     alert("Logged in!");
//   } catch (e){
//     alert(e.message); 
//   }
  
//   return {
//     errors: ["Some Error", "Another Error"]
//   }
//   return 
// }
