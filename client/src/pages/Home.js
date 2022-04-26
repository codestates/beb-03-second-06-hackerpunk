import {
  React,
  Routes,
  Route,
  useLocation,
  LoadingBox,
  AsyncBoundary,
  ErrorNotice,
  styled,
  Div,
} from '../common';
import LoginBox from '../components/LoginBox';
import SignBox from '../components/SignBox';

const Container = styled(Div)``;

function Home() {
  const location = useLocation();
  return (
    <Container>
      <AsyncBoundary
        fallback={
          <LoadingBox
            message={(() => {
              switch (location.pathname) {
                case '/':
                  return 'login...';
                case '/sign':
                  return 'signing...';
              }
            })()}
          />
        }
        onReset={(e) => {
          console.error(e);
        }}
      >
        <Routes>
          <Route path="/" element={<LoginBox />} />
          <Route path="/sign" element={<SignBox />} />
        </Routes>
      </AsyncBoundary>
    </Container>
  );
}

export default Home;
