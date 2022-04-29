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
    if (posts) dispatch(setPosts(posts));
    if (id) dispatch(setSelected(1));
  }, [dispatch, id, posts, user]);
  return (
    <>
      {user && <Profile />}
      {posts && <Board />}
    </>
  );
}

export default Contents;
