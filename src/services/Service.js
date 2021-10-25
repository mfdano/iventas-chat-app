import { SERVICE_URL } from '../utils/Consts'

async function makeRequest(method, path, params) {
  const response = await fetch(`${SERVICE_URL}/${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: params,
    credentials: 'include'
  });

  const responseJson = await response.json();
  if (response.status === 500) throw new Error('Error de servidor.');
  if (response.status === 403) throw new Error(responseJson.message);
  if (response.status === 401) throw new Error(401);

  return responseJson;
}

async function getChat(userId, lastDate, limit) {
  const result = await makeRequest('GET', `chats?userId=${userId}&lastDate=${lastDate}&limit=${limit}`);
  return result;
}

async function getMessages(chatId, lastDate, limit) {
  const result = await makeRequest('GET', `messages?chatId=${chatId}&lastDate=${lastDate}&limit=${limit}`);
  return result;
}

async function checkAuth() {
  const result = await makeRequest('GET', `user/check_auth`);
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

export{ getMessages, login, getChat, checkAuth };
