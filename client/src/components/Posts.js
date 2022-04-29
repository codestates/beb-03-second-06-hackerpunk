import {
  React,
  useState,
  useCallback,
  useEffect,
  usePresence,
  motion,
  styled,
  Div,
  useInView,
  useParams,
  useDispatch,
  useLayoutEffect,
  useSelector,
  setSelected,
  useErrorBang,
  AnimatePresence,
} from "../common";

import Post from "./Post";

const NONE_SELECTED = 0;

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
const LatestIntersection = styled(Div)`
  height: 2%;
`;
const OldestIntersection = styled(Div)`
  height: 2%;
`;

function Posts({
  contents = [],
  selectedCallback = (selected) => {},
  ...props
} = {}) {
  /* ------------------- */

  // const [query, setQuery] = useState("");
  // const [page, setPage] = useState(1);
  // const loader = useRef(null);

  // const handleChange = (e) => {
  //   setQuery(e.target.value);
  // };

  // const handleObserver = useCallback((entries) => {
  //   const target = entries[0];
  //   if (target.isIntersecting) {
  //     setPage((prev) => prev + 1);
  //   }
  // }, []);

  // useEffect(() => {
  //   const option = {
  //     root: null,
  //     rootMargin: "20px",
  //     threshold: 0,
  //   };
  //   const observer = new IntersectionObserver(handleObserver, option);
  //   if (loader.current) observer.observe(loader.current);
  // }, [handleObserver]);

  /* ------------------- */

  const { selected } = useSelector((state) => state.posts);

  const { latestRef, latestInView } = useInView();
  const { oldestRef, oldestInView } = useInView();

  if (latestInView) console.log("LATEST");
  if (oldestInView) console.log("OLDEST");

  return (
    <Container {...props}>
      <LatestIntersection ref={latestRef} />
      <AnimatePresence>
        {contents.map((data, idx) => {
          const key = idx + 1;
          return (
            <Post
              initial={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              key={key}
              myKey={key}
              selectedKey={selected}
              selectThisToggle={() => {
                const newKey = selected === key ? NONE_SELECTED : key;
                const articleId = data.article_id;
                let newUrl = `./contents/${articleId}`;
                if (newKey === 0) {
                  newUrl = "/contents";
                }
                // console.log(window.location.pathname);
                window.history.pushState({}, "", newUrl);
                selectedCallback(newKey);
              }}
              data={data}
            />
          );
        })}
      </AnimatePresence>
      <OldestIntersection ref={oldestRef} />
    </Container>
  );
}

export default Posts;
