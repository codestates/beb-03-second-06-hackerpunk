import {
  React,
  AsyncBoundary,
  ErrorNotice,
  Spinner,
  useNavigate,
} from '../common';

import PostList from './PostList';

function Board() {
  const navigate = useNavigate();
  return (
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
      <PostList />
    </AsyncBoundary>
  );
}

export default Board;
