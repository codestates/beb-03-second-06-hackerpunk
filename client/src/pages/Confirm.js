import {
  React,
  useFetch,
  useParams,
  useNavigate,
  LoadingBox,
  AsyncBoundary,
  useDispatch,
} from "../common";
import { setUser } from "../store";

const WAIT = "wait";

/* ------------------------------------- */
const StoreUserData = (data) => {
  const dispatch = useDispatch();
  console.log(data);
  dispatch(setUser(data)); // redux
};
/* ------------------------------------- */
const GetDataSignUp = () => {
  const { token } = useParams();

  const { data } = useFetch({
    key: "confirm",
    args: { data: { token } },
    condition: token !== WAIT,
  });

  const navigate = useNavigate();

  if (data) {
    StoreUserData(data);
    navigate("/contents"); // log in
    return;
  }

  return <LoadingBox message="check your e-mail box" />;
};
/* ------------------------------------- */
function Confirm() {
  const navigate = useNavigate();
  return (
    <AsyncBoundary
      fallback={<LoadingBox message="checking your token..." />}
      onReset={(e) => {
        console.error(e);
        navigate("/");
      }}
    >
      <GetDataSignUp />
    </AsyncBoundary>
  );
}

export default Confirm;
