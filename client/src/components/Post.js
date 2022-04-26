import { React, styled, Div } from '../common';

const Block = styled(Div)`
  display: grid;
  grid-template-columns: 2fr 8fr 1fr 1fr;
  grid-gap: 12px;
  font-size: 6vw;
  word-break: break-all;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
`;

const Author = styled(Div)`
  font-size: 3vw;
`;

const Title = styled(Div)``;

const CreatedAt = styled(Div)`
  font-size: 2vw;
  justify-content: flex-end;
`;

const Views = styled(Div)`
  font-size: 2.5vw;
  justify-content: flex-end;
`;

function Post({ author, title, views, createdAt, updatedAt } = {}) {
  return (
    <Block>
      <Author>{author}</Author>
      <Title>{title}</Title>
      <CreatedAt>{createdAt}</CreatedAt>
      <Views>{views}</Views>
    </Block>
  );
}

export default Post;
