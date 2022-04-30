import {
  //
  React,
  Routes,
  Route,
  styled,
  getToken,
  useLocation,
  Div,
  Footer,
  Background,
  LoadingBox,
  AsyncBoundary,
  AnimatePresence,
} from "../common";

import Home from "../pages/Home";
import Contents from "../pages/Contents";
import Confirm from "../pages/Confirm";

const RootDiv = styled(Div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

function App() {
  const { pathname } = useLocation();
  // !TODO: check expires
  const AuthGuard = (element) => (getToken() ? element : <Home />);
  return (
    <RootDiv>
      <Background />
      <Footer />
      <AnimatePresence>
        <AsyncBoundary
          fallback={
            <LoadingBox
              message={(() => {
                switch (pathname) {
                  case "/":
                    return "login...";
                  case "/sign":
                    return "signing...";
                  case "/confirm":
                    return "checking your token...";
                  default:
                    return "loading...";
                }
              })()}
            />
          }
          onReset={(e) => {
            console.error(e);
            window.location.pathname = "./";
          }}
        >
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/contents/*" element={AuthGuard(<Contents />)} />
          </Routes>
        </AsyncBoundary>
      </AnimatePresence>
    </RootDiv>
  );
}

export default App;
