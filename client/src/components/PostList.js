import { React, styled, useFetch } from '../common';

function PostList() {
  const { data } = useFetch({
    key: 'postList',
  });
  return (
    <>
      {data.map(({ userId, id, title, body }) => {
        return (
          <div key={id}>
            <h1>{userId}</h1> {id}
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        );
      })}
    </>
  );
}

export default PostList;
