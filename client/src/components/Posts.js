import {
  React,
  styled,
  useState,
  useEffect,
  useRef,
  useFetch,
  Div,
} from '../common';

import Post from './Post';

const Container = styled(Div)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

function Posts() {
  /* --------For draging-------- */
  const ref = useRef();
  const [constraints, setConstraints] = useState(0);
  useEffect(() => {
    const {
      current: {
        scrollHeight = 0,
        offsetHeight = 0,
        //
      } = {},
    } = ref;
    setConstraints({
      top: offsetHeight - scrollHeight,
      bottom: 0,
      //
    });
  }, []);
  /* --------------------------- */

  const { data } = useFetch({
    key: 'posts',
  });
  return (
    <Container
      ref={ref}
      drag="y"
      dragElastic={0.3}
      dragConstraints={constraints}
    >
      {data.map((props) => {
        return <Post {...props} />;
      })}
    </Container>
  );
}

export default Posts;
