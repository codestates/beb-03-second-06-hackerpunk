import { React, styled, Div } from '../common';
import Board from '../components/Board';

const Container = styled(Div)`
  width: 70%;
  height: 70%;
  border: 1px groove white;
`;

function Contents() {
  return (
    <Container>
      <Board />
    </Container>
  );
}

export default Contents;
