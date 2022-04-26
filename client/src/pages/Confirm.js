import {
  React,
  useFetch,
  useParams,
  useNavigate,
  LoadingBox,
  AsyncBoundary,
} from '../common';

const WAIT = 'wait';

function GetDataSignUp() {
  const { token } = useParams();

  const { data, isValidating } = useFetch({
    key: 'confirm',
    args: { data: { token } },
    condition: token !== WAIT,
  });

  const navigate = useNavigate();

  if (data) {
    console.log(data);
    navigate('/contents');
    return;
  }

  return <LoadingBox message="check your e-mail box" />;
}

function Confirm() {
  const navigate = useNavigate();
  return (
    <AsyncBoundary
      fallback={<LoadingBox message="checking your token..." />}
      onReset={(e) => {
        console.error(e);
        navigate('/');
      }}
    >
      <GetDataSignUp />
    </AsyncBoundary>
  );
}

export default Confirm;
