import { motion, styled } from '..';

import hplogo from '../../assets/images/hplogo192.png';

const Image = styled(motion.img)``;

function Logo(props) {
  return <Image src={hplogo} draggable="false" {...props} />;
}

export default Logo;
