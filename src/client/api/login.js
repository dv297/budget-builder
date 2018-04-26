import axios from 'axios';

export default async ({ username, password }) => {
  return axios.post('/api/login', { username, password }).then((res) => {
    return {
      token: res.data.token,
      id: res.data.id,
    };
  });
};
