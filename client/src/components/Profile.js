import { React, styled, Div } from '../common';

import LogoSrc from '../assets/hplogo.gif';

const Container = styled(Div)`
  z-index: 999;
  position: absolute;
  right: 10vw;
  top: 11vh;
  width: 11rem;
  height: 6rem;
  border: solid 1px whitesmoke;
  padding: 10px;
  flex-direction: column;
  font-family: 'Gill Sans', sans-serif;
`;

const InnerContainer = styled(Div)`
  justify-content: space-between;
  align-items: center;
  word-break: break-all;
`;

const Image = styled.img`
  width: 25%;
  height: 25%;
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

function Profile() {
  return (
    <Container
      initial={{
        y: -30,
      }}
      animate={{
        x: 12,
        y: 0,
        scale: 1.1,
      }}
    >
      <InnerContainer>
        <Image src={LogoSrc} />
        <Address>3h5gEDDxMAPfvaYi5XLuf6Hn6HRANAu1</Address>
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
