import { React, styled, Div } from "../common";

const Block = styled(Div)`
  display: grid;
  grid-template-columns: 2fr 8fr 1fr 1fr;
  grid-gap: 14px;

  word-break: break-all;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;

const Author = styled(Div)`
  font-size: clamp(0.7rem, 1vw, 2rem);
  justify-content: flex-start;
`;

const Title = styled(Div)`
  font-size: clamp(1.5rem, 1vw, 3rem);
`;

const CreatedAt = styled(Div)`
  font-size: clamp(0.5rem, 1vw, 0.8rem);
`;

const Views = styled(Div)`
  font-size: clamp(0.5rem, 2.5vw, 0.8rem);
  justify-content: flex-end;
`;

function Post({
  myKey,
  selectedKey,
  selectThisToggle = () => {},
  data: { author, title, views, createdAt, updatedAt } = {},
}) {
  const variants = {
    opened: {},
    closed: {
      opacity: 0,
      display: "none",
    },
    none: {},
  };

  const isSelected = myKey === selectedKey;
  const isNotSelected = !isSelected && selectedKey !== -1;

  return (
    <Block
      onClick={selectThisToggle}
      variants={variants}
      animate={isSelected ? "opened" : isNotSelected ? "closed" : "opened"}
      exit="opened"
      whileHover={{
        border: "1px solid whitesmoke",
      }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Author>{author}</Author>
      <Title>{title}</Title>
      <CreatedAt>{createdAt}</CreatedAt>
      <Views>{views}</Views>
    </Block>
  );
}

export default Post;
