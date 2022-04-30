import {
  React,
  AsyncBoundary,
  useNavigate,
  styled,
  Route,
  Routes,
  Div,
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
      <Container animate={{ opacity: 1, height: "70%" }}>
        <Routes>
          <Route path="/:article_id" element={<Post />} />
          <Route path="/" element={<Posts />} />
        </Routes>
      </Container>
    </AsyncBoundary>
  );
}

export default Board;
