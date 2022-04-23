import axios from 'axios';

import { url } from './constants';

const resolvers = ({ options = {}, state: { data } = {} } = {}) => {
  return {
    login: {
      url: url('login'),
      method: 'post',
      data,
      ...options,
    },
    sign: {
      url: url('register'),
      method: 'post',
      data,
      ...options,
    },
    posts: {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'get',
      nextMut(v) {
        console.log(v);
        return v;
      },
      ...options,
    },
  };
};

const fetcher = async (key, { options = {}, ...state } = {}) => {
  const resolver = resolvers({ options, state })[key];
  const { data } = await axios(resolver); //
  if (resolver.nextMut) return resolver.nextMut(data);
  return data;
};

export default fetcher;
