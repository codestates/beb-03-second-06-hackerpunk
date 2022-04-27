import { React } from "../common";

import Post from "./Post";

function Posts({ contents = [] } = {}) {
  return contents.map((props, idx) => {
    return <Post key={idx} {...props} />;
  });
}

export default Posts;
