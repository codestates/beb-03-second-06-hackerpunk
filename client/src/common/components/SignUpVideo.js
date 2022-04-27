import { styled, Div } from "..";
import Src from "../../assets/videos/SignUp.mp4";

const Container = styled(Div)`
  position: relative;
  top: -2.5rem;
  margin-bottom: -2rem;
`;

function SignUpVideo({ size = ["400", "150"], ...props } = {}) {
  return (
    <Container {...props}>
      <video width={size[0]} height={size[1]} autoPlay loop muted playsInline>
        <source src={Src} type="video/mp4" />
      </video>
    </Container>
  );
}

export default SignUpVideo;
