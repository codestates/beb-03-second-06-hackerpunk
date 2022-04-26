import {
  //
  React,
  BrowserRouter,
  Routes,
  Route,
  Background,
  Footer,
  Div,
  styled,
  AnimatePresence,
  getToken,
} from "../common";

import Home from "../pages/Home";
import Contents from "../pages/Contents";
import Confirm from "../pages/Confirm";

const RootDiv = styled(Div)`
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

function App() {
  // !TODO: check expires
  const AuthGuard = (element) => (getToken() ? element : <Home />);
  console.log(getToken());
  return (
    <RootDiv>
      <Background />
      <Footer />
      <AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/confirm/:token" element={<Confirm />} />
            <Route path="/contents" element={AuthGuard(<Contents />)} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </RootDiv>
  );
}

export default App;
