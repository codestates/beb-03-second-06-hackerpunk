import {
  React,
  motion,
  styled,
  Div,
  Logo,
  useState,
  useSelector,
  toSummary,
} from "../common";
import hp from "../api/hp";

import WriteButton from "./WriteButton";
import SubmitButton from "./SubmitButton";

import TokenIcon from "../assets/images/hptoken.png";

const Container = styled(Div)`
  z-index: 999;
  position: absolute;
  right: 10vw;
  top: 11vh;
  width: 11.5rem;
  height: 6.5rem;
  border: solid 1px whitesmoke;
  border-radius: 2px;
  padding: 10px;
  flex-direction: column;
  font-family: "Gill Sans", sans-serif;
  background-color: rgb(10, 10, 10, 0.6);
`;

const InnerContainer = styled(Div)`
  justify-content: space-between;
  align-items: center;
  word-break: break-all;
  height: 80%;
`;

const ProfileInnerContainer = styled(Div)`
  height: 75%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  word-break: break-all;
  margin: 0.2rem;
`;

const StyledLogo = styled(Logo)`
  width: 30%;
  height: 70%;
  border-radius: 50%;
  margin-right: 4px;
`;

const Span = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 10px;
`;

const Id = styled(Div)`
  justify-content: flex-end;
  font-size: 0.8rem;
  margin: 0.2rem 0;
`;

const Address = styled(Div)`
  justify-content: flex-end;
  font-size: 0.77rem;
  padding: 0.5rem 0;
`;

const Token = styled.p`
  font-size: 0.77rem;
  color: white;
`;

const ConnectWallet = styled(motion.div)`
  position: absolute;
  left: 25px;
  top: -25px;
  font-size: 0.75rem;
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86%;
`;

// ---------- Animation ----------
const Container__Animate_variants = {
  initial: {
    opacity: 0,
    y: -30,
    height: "11%",
  },
  animate: {
    opacity: 1,
    x: 12,
    y: 0,
    scale: 1.1,
    height: "11%",
  },
  exit: {
    opacity: 1,
    position: "absolute",
    borderRadius: "0.15rem",
    x: "-4vw",
    y: "0vh",
    height: "2.2%",
  },
};

const ConnectWallet__Animate = {
  whileHover: {
    scale: 1.02,
    color: "rgba(150, 20, 20, 0.8)",
    textDecoration: "underline bisque dashed 1px",
  },
  whileTap: {
    scale: 0.95,
    color: "rgb(0, 0, 0, 0)",
    textDecoration: "none",
  },
};

const CopyAccount__Animate = {
  whileHover: {
    scale: 1,
    color: "rgba(200, 240, 230, 0.8)",
    cursor: "pointer",
  },
  whileTap: {
    scale: 0.95,
    color: "rgb(110, 180, 180, 0.6)",
    textDecoration: "none",
  },
};
// -------------------------------

const Helper = styled(Div)`
  z-index: 1000;
  position: absolute;
  width: 12rem;
  height: 5rem;
  text-align: justify;
  text-justify: auto;
`;

function ConectWalletHelper() {
  return (
    <Helper
      initial={{ x: "-14rem", y: "-14rem" }}
      animate={{ x: "-11rem", y: "-6rem" }}
      exit={{ x: "-14rem", y: "-14rem" }}
    >
      If you want to withdraw your hp tokens, Please connect to your own wallet.
    </Helper>
  );
}

function Profile() {
  const { id, internalPublicKey, level, amount } = useSelector(
    (state) => state.user
  );
  const { selected } = useSelector((state) => state.posts);

  const connectWallet = async () => {
    await hp.connectToExternalWallet(internalPublicKey);
  };
  const [connectWalletHelper, setConnectWalletHelper] = useState("");
  return (
    <Container
      variants={Container__Animate_variants}
      initial={selected > -1 ? "initial" : "animate"}
      animate={selected > -1 ? "animate" : "exit"}
      exit="exit"
    >
      {selected > -1 ? (
        <>
          <WriteButton message="Write" />
          <ConnectWallet
            {...ConnectWallet__Animate}
            onClick={connectWallet}
            onMouseEnter={() => setConnectWalletHelper(ConectWalletHelper)}
            onMouseLeave={() => setConnectWalletHelper("")}
          >
            ❕ Connect To External Wallet
          </ConnectWallet>
          {connectWalletHelper}
          <InnerContainer>
            <StyledLogo />
            <ProfileInnerContainer>
              <Id>{id}</Id>
              <Address
                {...CopyAccount__Animate}
                onClick={() => {
                  navigator.clipboard.writeText(internalPublicKey);
                }}
              >
                {toSummary(internalPublicKey)}
              </Address>
            </ProfileInnerContainer>
          </InnerContainer>
        </>
      ) : (
        <SubmitButton message="Submit" />
      )}
      <InnerContainer>
        <Span>Lv.{level}</Span>
        <img
          style={{
            width: "0.86rem",
          }}
          src={TokenIcon}
          alt="hpicon"
        />
        <Token>{amount}</Token>
        <Span>hp</Span>
      </InnerContainer>
    </Container>
  );
}

export default Profile;
