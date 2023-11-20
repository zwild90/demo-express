import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export async function getUsers() {
  try {
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
  } catch (err) {
    handleError(err);
  }
}

export async function getUser(userId) {
  try {
    const response = await axios.get(`${baseUrl}/users/${userId}`);
    return response.data;
  } catch (err) {
    handleError(err);
  }
}

export async function createUser(name) {
  try {
    const body = { name: name };
    const response = await axios.post(`${baseUrl}/users`, body);
    return response.data;
  } catch (err) {
    handleError(err);
  }
}

export async function updateUser(userId, name) {
  try {
    const body = { name: name };
    const response = await axios.put(`${baseUrl}/users/${userId}`, body);
    return response.data;
  } catch (err) {
    handleError(err);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${baseUrl}/users/${userId}`);
    return response.data;
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
