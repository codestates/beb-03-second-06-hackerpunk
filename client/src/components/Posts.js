import { React, styled, Div, useInView, useFetch } from "../common";

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
const LatestIntersection = styled(Div)`
  height: 2%;
`;
const OldestIntersection = styled(Div)`
  height: 2%;
`;

function Posts(props) {
  const {
    data: { posts },
  } = useFetch({
    key: "get_user_posts",
  });

  const { latestRef, latestInView } = useInView();
  const { oldestRef, oldestInView } = useInView();

  if (latestInView) console.log("LATEST");
  if (oldestInView) console.log("OLDEST");

  return (
    <Container {...props}>
      <LatestIntersection ref={latestRef} />
      {posts.map((data) => {
        return <Post key={data.article_id} data={data} />;
      })}
      <OldestIntersection ref={oldestRef} />
    </Container>
  );
}

export default Posts;
