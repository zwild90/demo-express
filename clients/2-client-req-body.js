import axios from 'axios';

const baseUrl = 'http://localhost:3000';

main();

async function main() {
  // console.log('GETTING USERS');
  // await getUsers();

  // console.log('GETTING USER');
  // await getUser(1);

  // console.log('GETTING USER (ERROR)');
  // await getUser(0);

  // console.log('CREATING USER');
  // await createUser('new user');

  // console.log('CREATING USER (ERROR)');
  // await createUser();

  // console.log('GETTING USERS');
  // await getUsers();

  // console.log('GETTING USER');
  // await getUser(7);

  // console.log('UPDATE USER');
  // await updateUser(7, 'updated user');

  // console.log('UPDATE USER (ERROR)');
  // await updateUser(7, null);

  console.log('GETTING USER');
  await getUser(7);

  // console.log('DELETING USER');
  // await deleteUser(7);

  // console.log('GETTING USER');
  // await getUser(7);
  
}

async function getUsers() {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    console.log(response.data);
  } catch (err) {
    handleError(err);
  }
}

async function getUser(userId) {
  try {
    const response = await axios.get(`${baseUrl}/users/${userId}`);
    console.log(response.data);
  } catch (err) {
    handleError(err);
  }
}

async function createUser(name) {
  try {
    const body = { name: name };
    const response = await axios.post(`${baseUrl}/users`, body);
    console.log(response.data);
  } catch (err) {
    handleError(err);
  }
}

async function updateUser(userId, name) {
  try {
    const body = { name: name };
    const response = await axios.put(`${baseUrl}/users/${userId}`, body);
    console.log(response.data);
  } catch (err) {
    handleError(err);
  }
}

async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${baseUrl}/users/${userId}`);
    console.log(response.data);
  } catch (err) {
    handleError(err);
  }
}

function handleError(err) {
  if (err?.response?.data) {
    console.error(err.response.data);
  } else {
    console.error(err);
  }
}
