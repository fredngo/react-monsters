const baseUrl = 'https://parseapi.back4app.com';
const signupUrl = `${baseUrl}/users`;
const loginUrl = (u, p) => `${baseUrl}/login?username=${u}&password=${p}`;

const authHeaders = {
  'X-Parse-Application-Id': process.env.REACT_APP_PARSE_APPLICATION_ID,
  'X-Parse-Javascript-Key': process.env.REACT_APP_PARSE_JAVASCRIPT_KEY
};

const handleAPIErrors = response => {
  console.log(response);
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
  console.log("Logging in, user:", user);
  return fetch(loginUrl(user.username, user.password), {
    headers: authHeaders,
  })
  .then(handleAPIErrors)
  .then(reformatResponseData);
}

const signup = user => {
  return fetch(signupUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', ...authHeaders},
    body: JSON.stringify(user),
  })
  .then(handleAPIErrors)
  .then(reformatResponseData);
}

const ParseService = {
  login,
  signup,
}

export default ParseService;
