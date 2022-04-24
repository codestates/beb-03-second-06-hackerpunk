import { motion, styled } from '..';

const StyledInput = styled(motion.input)`
  margin: 4px 2px;
`;

function Input(props) {
  return <StyledInput autocomplete="off" {...props} />;
}

export default Input;
