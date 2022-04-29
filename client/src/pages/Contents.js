import {
  React,
  useFetch,
  useDispatch,
  setUser,
  setPosts,
  useParams,
  setSelected,
  useEffect,
} from "../common";
import Profile from "../components/Profile";
import Board from "../components/Board";

function Contents() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: { user, posts },
  } = useFetch({
    key: "get_user_posts",
    args: {
      id,
    },
  });
  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [dispatch, user]);
  useEffect(() => {
    if (posts) dispatch(setPosts(posts));
  }, [dispatch, posts]);
  useEffect(() => {
    if (id) dispatch(setSelected(1));
  }, [dispatch, id]);

  return (
    <>
      {user && <Profile />}
      {posts && <Board />}
    </>
  );
}

export default Contents;
