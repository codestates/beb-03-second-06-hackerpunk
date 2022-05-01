import { React, AnimatePresence } from "../common";
import Profile from "../components/Profile";
import Board from "../components/Board";
import LogoutButton from "../components/LogoutButton";

function Contents() {
  return (
    <>
      <LogoutButton />
      <AnimatePresence>
        <Profile />
      </AnimatePresence>
      <Board />
    </>
  );
}

export default Contents;
