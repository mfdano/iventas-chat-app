const URL = "http://localhost:5000";

async function makeRequest(method, path, params) {
  const response = await fetch(`${URL}/${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: params,
    credentials: 'include'
  });

  if (response.status === 500) throw new Error('Error de servidor');
  return response.json();
}

async function getChat(userId, lastDate, limit) {
  const result = await makeRequest('GET', `${'chats'}?userId=${userId}&lastDate=${lastDate}&limit=${limit}`);
  return result;
}

async function getMessages(chatId, lastDate, limit) {
  const result = await makeRequest('GET', `${'messages'}?chatId=${chatId}&lastDate=${lastDate}&limit=${limit}`);
  return result;
}

async function login(email, password) {
  const body = JSON.stringify({
    email: email,
    password: password
  });
  
  const result = await makeRequest('POST', 'user/login', body);
  return result;
}

export{ getMessages, login, getChat };
