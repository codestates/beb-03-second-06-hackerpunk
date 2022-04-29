import {
  React,
  AsyncBoundary,
  useSelector,
  useNavigate,
  useDispatch,
  setSelected,
  styled,
  Div,
  useRef,
  addValues,
  Spinner,
} from "../common";

import Post from "./Post";
import Posts from "./Posts";

const Container = styled(Div)`
  position: relative;
  width: 72%;
  height: 72%;
  border: 1px groove gray;
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;

  padding: 1rem;

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
  const dispatch = useDispatch();

  const { selected, contents } = useSelector((state) => state.posts);

  const containerRef = useRef(null);
  return (
    <AsyncBoundary
      fallback={
        <Container>
          <Spinner />
        </Container>
      }
      onReset={(e) => {
        // `try again button` was clicked
        console.error(e);
        navigate("/");
      }}
    >
      <Container
        ref={containerRef}
        animate={{ opacity: 1, height: "70%" }}
        onScroll={({ target }) => {
          if (selected === 0)
            dispatch(
              addValues({
                boardScrollTop: target.scrollTop,
              })
            );
        }}
      >
        {/* selected === -1 => Writing Box */}
        {selected === -1 || selected === -2 ? (
          <Post />
        ) : (
          <Posts
            // scrollToOrigin={scrollToOrigin}
            selected={selected}
            contents={contents}
            selectedCallback={(selected) => {
              dispatch(setSelected(selected));
            }}
          />
        )}
      </Container>
    </AsyncBoundary>
  );
}

export default Board;
