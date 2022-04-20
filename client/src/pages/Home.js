import { React, styled, Routes, Route } from '../common';
import LoginBox from '../components/LoginBox';
import SignBox from '../components/SignBox';

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<LoginBox />} />
        <Route path="/sign" element={<SignBox />} />
      </Routes>
    </Container>
  );
}

export default Home;
