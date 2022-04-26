import { React, motion, styled } from '..';

const Container = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3.6vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.2rem;
  color: whitesmoke;
`;

const Copyright = styled.h1`
  margin-left: 10px;
  padding-top: 5px;
`;

const Message = styled.h1``;

const COMPANY_NAME = 'Hacker Punk';

function Footer({ message = '' } = {}) {
  return (
    <Container>
      <InnerContainer>
        <Copyright>
          © 2022 - {new Date().getFullYear()} {COMPANY_NAME}, Inc
        </Copyright>
        <Message>{message}</Message>
      </InnerContainer>
    </Container>
  );
}

export default Footer;
