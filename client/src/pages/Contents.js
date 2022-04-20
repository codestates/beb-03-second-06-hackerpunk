import { React, styled } from '../common';
import Board from '../components/Board';

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Contents() {
  return (
    <Container>
      <Board />
    </Container>
  );
}

export default Contents;
