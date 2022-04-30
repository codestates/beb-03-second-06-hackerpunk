import {
  React,
  Routes,
  Route,
  styled,
  Div,
  getToken,
  useEffect,
  useNavigate,
} from "../common";
import LoginBox from "../components/LoginBox";
import SignBox from "../components/SignBox";

const Container = styled(Div)``;

function Home() {
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/contents");
    }
  }, [token, navigate]);

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
