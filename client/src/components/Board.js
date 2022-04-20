import {
  React,
  styled,
  AsyncBoundary,
  ErrorNotice,
  Spinner,
  useNavigate,
} from '../common';

import Posts from './PostList';

const Container = styled.div``;

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
