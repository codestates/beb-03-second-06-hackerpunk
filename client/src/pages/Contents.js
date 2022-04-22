import { React, styled, Div } from '../common';
import Profile from '../components/Profile';
import Board from '../components/Board';

const Container = styled(Div)`
  width: 70%;
  height: 70%;
  border: 1px groove white;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

function Contents() {
  return (
    <Container>
      <Profile />
      <Board />
    </Container>
  );
}

export default Contents;
