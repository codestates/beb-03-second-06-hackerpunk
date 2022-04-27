import { React, useFetch, useDispatch, setUser, setPosts } from "../common";
import Profile from "../components/Profile";
import Board from "../components/Board";

function Contents() {
  const dispatch = useDispatch();
  const {
    data: { user, posts },
  } = useFetch({
    key: "get_user_posts",
  });
  if (user && posts) {
    dispatch(setUser(user));
    dispatch(setPosts(posts));
    return (
      <>
        <Profile />
        <Board />
      </>
    );
  }
}

export default Contents;
