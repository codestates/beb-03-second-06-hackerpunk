import {
  React,
  useFetch,
  useEffect,
  useSearchParams,
  useNavigate,
  LoadingBox,
  setToken,
} from "../common";

const WAIT = "undefined";

/* ------------------------------------- */
const GetDataSignUp = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { data: { access_token } = {} } = useFetch({
    key: "confirm",
    args: { data: { token } },
    condition: token !== WAIT,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      setToken(access_token);
      navigate("/contents"); // log in
      return;
    }
  }, [access_token, navigate]);

  return <LoadingBox message="check your e-mail box" />;
};
/* ------------------------------------- */
function Confirm() {
  return <GetDataSignUp />;
}

export default Confirm;
