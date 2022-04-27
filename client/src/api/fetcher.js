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
    user_posts: {
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "get",
      headers: getTokenHeader(),
      nextMut(list) {
        return {
          user: {
            access_token: "Qwdqwdqd",
            id: "idididi",
            email: "email@email.com",
            internal_pub_key: "0x90DdB069D1BFF5CEe2bFaA1Fe889990CB5F14f72",
            external_pub_key: "0x5A1B221467394fFe2B2661005D7BD1e43C62C999",
            amount: 91992,
            level: 99,
          },
          posts: list.map(({ userId, id, title } = {}) => ({
            id,
            author: "testman" + userId,
            title,
            views: 5,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
          })),
        };
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
