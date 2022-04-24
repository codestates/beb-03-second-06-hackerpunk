import { React, useFetch } from '../common';

import Post from './Post';

function Posts() {
  const { data } = useFetch({
    key: 'posts',
  });
  return data.map((props, idx) => {
    return <Post key={idx} {...props} />;
  });
}

export default Posts;
