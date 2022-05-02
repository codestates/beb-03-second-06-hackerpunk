import {
  React,
  styled,
  Div,
  useRef,
  useState,
  useFetch,
  useEffect,
  useRerender,
  useSWRConfig,
} from "../common";

import Post from "./Post";

const Container = styled(Div)`
  position: relative;
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

function Posts(props) {
  const { cache } = useSWRConfig();
  const {
    data: { posts },
  } = useFetch({
    key: "get_user_posts",
  });

  const [refresh, setRefresh] = useState(false);
  const rerender = useRerender(() => {
    cache.clear();
    setRefresh(true);
    setTimeout(() => setRefresh(false), 2000);
  });

  console.count();

  const ref = useRef();
  useEffect(() => {
    const target = ref;
    const wheelHandler = (e) => {
      const dy = e.deltaY,
        top = e.target.scrollTop;

      if (refresh === false && dy < 0 && top === 0) {
        console.log(dy, top);
        rerender();
      }
    };
    if (target && target.current) {
      target.current.addEventListener("wheel", wheelHandler);
      return () => {
        target.current.removeEventListener("wheel", wheelHandler);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container ref={ref} {...props}>
      {posts.map((data) => {
        return <Post key={data.article_id} data={data} />;
      })}
    </Container>
  );
}

export default Posts;
