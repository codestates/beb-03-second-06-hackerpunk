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
} from '../common';

import Home from '../pages/Home';
import Contents from '../pages/Contents';
import Confirm from '../pages/Confirm';

const RootDiv = styled(Div)`
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <RootDiv>
      <Background />
      <Footer />
      <AnimatePresence>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/contents" element={<Contents />} />
            <Route path="/confirm/:token" element={<Confirm />} />
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </RootDiv>
  );
}

export default App;
