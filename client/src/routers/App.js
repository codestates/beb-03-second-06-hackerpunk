import {
  //
  React,
  BrowserRouter,
  Routes,
  Route,
  styled,
} from "../common";

import Home from "../pages/Home";
import Contents from "../pages/Contents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contents" element={<Contents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
