import { React } from "../common";
import { useRef } from "react";
import Sign from "../components/Sign";

function Home() {
  const errorRef = useRef();

  const idRef = useRef(),
    passwordRef = useRef(),
    passwordCheckRef = useRef(),
    emailRef = useRef(),
    phoneRef = useRef();

  const isCurrent = (someRef, callback) => {
    if (idRef.current) callback();
  };

  const submitHandler = () => {
    const setErrorStr = (str) => {
      isCurrent(errorRef, () => {
        errorRef.current.innerText = str;
      });
    };

    isCurrent(idRef, () => {
      idRef.current.value = "하하하하";
    });
    setErrorStr("아이디가 중복됩니다.");
  };

  return (
    <Sign
      title="Sign Up"
      keys={[
        { id: idRef },
        { password: passwordRef },
        { "password check": passwordCheckRef },
        { "e-mail": emailRef },
        { phone: phoneRef },
      ]}
      errorRef={errorRef}
      submit={"Confirm"}
      OnClick={submitHandler}
    />
  );
}

export default Home;
