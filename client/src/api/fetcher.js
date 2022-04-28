import axios from "axios";
import { getToken, getTokenHeader } from "../common";

import { url } from "./constants";

const resolvers = ({ options = {}, state: { id, data } = {} } = {}) => {
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
    get_user_posts: {
      url: url("article?amount=30"),
      method: "get",
      headers: getTokenHeader(),
      nextMut([user, ...posts]) {
        return {
          user,
          posts,
        };
      },
      ...options,
    },
    get_post: {
      url: url(`article?article_id=${id}`),
      method: "get",
      headers: getTokenHeader(),
      nextMut(posts) {
        console.log(posts);
        return posts;
      },
      ...options,
    },
    post_post: {
      url: url("article"),
      method: "post",
      headers: getTokenHeader(),
      data,
      nextMut({ article_id } = {}) {
        return { id: article_id };
      },
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
