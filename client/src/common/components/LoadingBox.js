import { React, styled, Spinner } from '..';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 14rem;
  justify-content: space-between;
  align-items: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 2rem 0;
  justify-content: space-between;
  align-items: flex-end;
`;

const Message = styled.h1`
  font-size: 2rem;
`;

function LoadingBox({ message = 'loading...' } = {}) {
  return (
    <Container>
      <InnerContainer>
        <Spinner />
      </InnerContainer>
      <Message>{message}</Message>
    </Container>
  );
}

export default LoadingBox;
