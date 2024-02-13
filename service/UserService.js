export async function logIn(email, password) {
  let response = null;
  await fetch("http://10.0.2.2:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({ email: email, password: password })
  }).then(response => response.text()).then(data => response = data)
    .catch(e => console.error('Request error:', e.message));

  return response;
}

export async function signUp(name, email, password) {
  let response = null;

  await fetch("http://10.0.2.2:3000/user/signup", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({ name: name, email: email, password: password })
  }).then(response => response.text()).then(data => response = data)
    .catch(e => console.error('Request error:', e.message));

  return response;
}
