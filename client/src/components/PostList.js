import { React, styled, useSWR } from '../common';

const Container = styled.div``;

function PostList() {
  const { data } = useSWR('postList');
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
