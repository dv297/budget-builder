import axios from 'axios';

export default async ({ username, password }) => {
  return axios
    .post('/api/login', { username, password })
    .then((res) => {
      return res.data.token;
    })
};
