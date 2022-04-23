import {
  React,
  AsyncBoundary,
  ErrorNotice,
  Spinner,
  useRef,
  useState,
  useEffect,
  useNavigate,
  styled,
  Div,
} from '../common';

import Posts from './Posts';

const Container = styled(Div)`
  width: 70%;
  height: 70%;
  border: 1px groove white;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

function Board() {
  const navigate = useNavigate();

  return (
    <Container>
      <AsyncBoundary
        fallback={<Spinner />}
        // https://github.com/bvaughn/react-error-boundary 참조
        errorFallback={(props) => <ErrorNotice {...props} />}
        onReset={(e) => {
          // `try again button` was clicked
          console.error(e);
          navigate('/');
        }}
      >
        <Posts />
      </AsyncBoundary>
    </Container>
  );
}

export default Board;
