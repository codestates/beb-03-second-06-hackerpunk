import { React, Routes, Route, styled, Div } from "../common";
import LoginBox from "../components/LoginBox";
import SignBox from "../components/SignBox";

const Container = styled(Div)``;

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
