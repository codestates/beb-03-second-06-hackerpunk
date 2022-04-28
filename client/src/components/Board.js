import {
  React,
  AsyncBoundary,
  useSelector,
  useNavigate,
  useDispatch,
  setSelected,
  styled,
  Div,
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
  const { selected, contents } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  return (
    <AsyncBoundary
      onReset={(e) => {
        // `try again button` was clicked
        console.error(e);
        navigate("/");
      }}
    >
      <Container
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "70%" }}
        exit={{ opacity: 0, height: 0 }}
      >
        {/* selected === -1 => Writing Box */}
        {selected === -1 ? (
          <Post />
        ) : (
          <Posts
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
