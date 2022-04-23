import { React, styled, Div } from '../common';

const Block = styled(Div)``;

function Post({ id, userId, title, body } = {}) {
  return (
    <Block key={id}>
      <h1>{userId}</h1> {id}
      <h2>{title}</h2>
      <p>{body}</p>
    </Block>
  );
}

export default Post;
