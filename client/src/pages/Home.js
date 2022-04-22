import {
  React,
  Routes,
  Route,
  useLocation,
  LoadingBox,
  AsyncBoundary,
  ErrorNotice,
} from '../common';
import LoginBox from '../components/LoginBox';
import SignBox from '../components/SignBox';

function Home() {
  const location = useLocation();
  return (
    <AsyncBoundary
      fallback={
        <LoadingBox
          message={(() => {
            switch (location.pathname) {
              case '/':
                return 'login...';
              case '/sign':
                return 'check your e-mail box';
            }
          })()}
        />
      }
      errorFallback={(props) => <ErrorNotice {...props} />}
      onReset={(e) => {
        console.error(e);
      }}
    >
      <Routes>
        <Route path="/" element={<LoginBox />} />
        <Route path="/sign" element={<SignBox />} />
      </Routes>
    </AsyncBoundary>
  );
}

export default Home;
