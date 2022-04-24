import { styled, Div } from '..';

import hplogo from '../../assets/videos/hplogo.mp4';

const Container = styled(Div)``;

function VideoLogo({ size = ['500', '300'] } = {}) {
  return (
    <Container>
      <video
        width={size[0]}
        height={size[1]}
        autoplay="true"
        loop
        muted
        playsinline
      >
        <source src={hplogo} type="video/mp4" />
      </video>
    </Container>
  );
}

export default VideoLogo;
