import {
  React,
  AsyncBoundary,
  useSelector,
  useNavigate,
  styled,
  Div,
} from "../common";

import Posts from "./Posts";

const Container = styled(Div)`
  width: 70%;
  height: 70%;
  /* margin-right: 20rem; */
  border: 1px groove gray;
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  overflow-x: inherit;

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
  const { contents } = useSelector((state) => state.posts);
  return (
    <Container
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "70%" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <AsyncBoundary
        onReset={(e) => {
          // `try again button` was clicked
          console.error(e);
          navigate("/");
        }}
      >
        <Posts contents={contents} />
      </AsyncBoundary>
    </Container>
  );
}

export default Board;
