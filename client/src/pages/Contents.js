import { React, styled } from "../common";
import Board from "../components/Board";

const Container = styled.div`
  position: absolute;
  width: 80vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px groove white;
  margin: 2rem;
`;

function Contents() {
  return (
    <Container>
      <div>
        <Board />
      </div>
    </Container>
  );
}

export default Contents;
