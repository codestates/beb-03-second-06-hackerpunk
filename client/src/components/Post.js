import { React, styled, Div } from '../common';

const Block = styled(Div)`
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  display: flex;
  justify-content: space-between;
`;

function Post({ id, userId, title, body } = {}) {
  return (
    <Block>
      <h1>{userId}</h1>
      <h2>{title}</h2>
    </Block>
  );
}

export default Post;
