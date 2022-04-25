import { motion, styled } from '..';

const StyledButton = styled(motion.button)`
  width: 6rem;
  height: 2.5rem;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid white;
  color: white;
  background-color: black;
  border-radius: 3px;
  display: block;
`;

function Button(props) {
  return (
    <StyledButton
      tabIndex="-1"
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(10, 20, 20, 0.9)' }}
      whileTap={{ scale: 0.95 }}
      {...props}
    />
  );
}

export default Button;
