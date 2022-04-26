import {
  React,
  motion,
  styled,
  Div,
  Logo,
  useState,
  useSelector,
} from '../common';
import hp from '../api/hp';

const Container = styled(Div)`
  z-index: 999;
  position: absolute;
  right: 10vw;
  top: 11vh;
  width: 11rem;
  height: 6rem;
  border: solid 1px whitesmoke;
  border-radius: 2px;
  padding: 10px;
  flex-direction: column;
  font-family: 'Gill Sans', sans-serif;
  background-color: rgb(10, 10, 10, 0.6);
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

const ConnectWallet = styled(motion.div)`
  position: absolute;
  left: 40px;
  top: -25px;
  font-size: 0.75rem;
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 78%;
`;

// ---------- Animation ----------
const Container__Animate = {
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
    color: 'rgba(150, 20, 20, 0.8)',
    textDecoration: 'underline bisque dashed 1px',
  },
  whileTap: {
    scale: 0.95,
    color: 'rgb(0, 0, 0, 0)',
    textDecoration: 'none',
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
      initial={{ x: '-14rem', y: '-14rem' }}
      animate={{ x: '-11rem', y: '-5.2rem' }}
      exit={{ x: '-14rem', y: '-14rem' }}
    >
      If you want to withdraw your hp tokens, Please connect to your own wallet.
    </Helper>
  );
}

function Profile() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const connectWallet = async () => {
    await hp.connectToExternalWallet(user.internalPublicKey);
  };
  const [connectWalletHelper, setConnectWalletHelper] = useState('');
  return (
    <Container {...Container__Animate}>
      <ConnectWallet
        {...ConnectWallet__Animate}
        onClick={connectWallet}
        onMouseEnter={() => setConnectWalletHelper(ConectWalletHelper)}
        onMouseLeave={() => setConnectWalletHelper('')}
      >
        ❕ Connect To External Wallet
      </ConnectWallet>
      {connectWalletHelper}
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
