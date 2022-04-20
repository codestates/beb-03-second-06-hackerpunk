import axios from 'axios';

import { url } from './constants';

const resolvers = ({ id = 1 } = {}) => {
  return {
    login: {
      url: url('todos', id),
      method: 'post',
      headers: {
        Authorization: 'Bearer qodqdjf@#F',
      },
    },
    postList: {
      url: url('posts'),
      method: 'get',
      next(data) {
        console.log(data);
        return data;
      },
    },
  };
};

const fetcher = (key, state) => {
  const resolver = resolvers(state)[key];
  return axios(resolver) //
    .then(({ data } = {}) => resolver.next(data));
};

export default fetcher;
