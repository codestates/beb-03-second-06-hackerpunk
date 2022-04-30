import { motion, styled } from '..';

const StyledButton = styled(motion.button)`
  width: 5.8rem;
  height: 3rem;
  font-size: 0.9rem;
  margin: 1rem;
  padding: 0.34rem 0.9rem;
  border: 2px solid rgb(245, 230, 230, 0.85);
  color: rgb(245, 230, 230, 0.85);
  background-color: black;
  border-radius: 4px;
  display: block;
  box-shadow: 0 0 2px rgb(220, 200, 200, 0.9);
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
