import axios from "axios";
import { getTokenHeader } from "../common";

import { url } from "./constants";

const resolvers = ({ options = {}, state: { data } = {} } = {}) => {
  return {
    login: {
      url: url("login"),
      method: "post",
      data,
      ...options,
    },
    sign: {
      url: url("register"),
      method: "post",
      data,
      ...options,
    },
    confirm: {
      url: url("confirm"),
      method: "post",
      data,
      ...options,
    },
    posts: {
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "get",
      headers: getTokenHeader(),
      nextMut(list) {
        return list.map(({ userId, id, title } = {}) => ({
          id,
          author: "testman" + userId,
          title,
          views: 5,
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
        }));
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
