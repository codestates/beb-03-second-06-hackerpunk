import {
  //
  React,
  BrowserRouter,
  Routes,
  Route,
  Background,
} from '../common';

import Home from '../pages/Home';
import Contents from '../pages/Contents';

function App() {
  return (
    <Background>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/contents" element={<Contents />} />
        </Routes>
      </BrowserRouter>
    </Background>
  );
}

export default App;
