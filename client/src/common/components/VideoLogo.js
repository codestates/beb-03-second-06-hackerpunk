import { styled, Div } from '..';

import hplogo from '../../assets/videos/hplogo.mp4';

const Container = styled(Div)`
  position: relative;
  top: -2.5rem;
  width: 100%;
  height: 100%;
`;

function VideoLogo({ size = ['500', '300'], ...props } = {}) {
  return (
    <Container {...props}>
      <video width={size[0]} height={size[1]} autoPlay loop muted playsInline>
        <source src={hplogo} type="video/mp4" />
      </video>
    </Container>
  );
}

export default VideoLogo;
