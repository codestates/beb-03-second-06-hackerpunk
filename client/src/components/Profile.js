import { React, motion, styled, Div, Logo } from "../common";
import hp from "../api/hp";

const Container = styled(Div)`
  z-index: 999;
  position: absolute;
  right: 10vw;
  top: 11vh;
  width: 11rem;
  height: 6rem;
  margin-left: 20rem;
  border: solid 1px whitesmoke;
  padding: 10px;
  flex-direction: column;
  font-family: "Gill Sans", sans-serif;
`;

const InnerContainer = styled(Div)`
  justify-content: space-between;
  align-items: center;
  word-break: break-all;
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

const Address = styled.p`
  font-size: 0.77rem;
`;

const Token = styled.p`
  font-size: 0.8rem;
  color: white;
`;

const ConnectWallet = styled(motion.span)`
  position: absolute;
  left: 42px;
  top: -25px;
  font-size: 0.75rem;
`;

// ---------- Animation ----------
const Conatiner__Animate = {
  initial: {
    y: -30,
  },
  animate: {
    x: 12,
    y: 0,
    scale: 1.1,
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
// -------------------------------

function Profile() {
  const connectWallet = async () => {
    await hp.connectToExternalWallet(
      "0x90DdB069D1BFF5CEe2bFaA1Fe889990CB5F14f72"
    );
  };
  return (
    <Container {...Conatiner__Animate}>
      <ConnectWallet {...ConnectWallet__Animate} onClick={connectWallet}>
        ❕ Connect To External Wallet
      </ConnectWallet>
      <InnerContainer>
        <StyledLogo />
        <Address>0x90DdB069D1BFF5CEe2bFaA1Fe889990CB5F14f72</Address>
      </InnerContainer>
      <InnerContainer>
        <Span>Lv.99</Span>
        <Token>20521003</Token>
        <Span>hp</Span>
      </InnerContainer>
    </Container>
  );
}

export default Profile;
