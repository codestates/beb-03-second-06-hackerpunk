import {
  //
  React,
  BrowserRouter,
  Routes,
  Route,
  Background,
  Footer,
  styled,
} from '../common';

import Home from '../pages/Home';
import Contents from '../pages/Contents';

const RootDiv = styled.div`
  z-index: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <RootDiv>
      <Background />
      <Footer />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/contents" element={<Contents />} />
        </Routes>
      </BrowserRouter>
    </RootDiv>
  );
}

export default App;
