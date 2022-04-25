import { forwardRef, motion, styled } from "..";

const StyledInput = styled(motion.input)`
  margin: 5px 2px;
  width: 12rem;
  height: 1.2rem;
  opacity: 70%;
  border: 1px solid whitesmoke;
`;

const Pholder = styled.text`
  text-decoration-color: solid whitesmoke;
`;

function Input({ onEnter = (e) => e, ...props }, ref) {
  return (
    <StyledInput
      ref={ref}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          onEnter(e);
        }
      }}
      autoComplete="off"
      {...props}
    />
  );
}

export default forwardRef(Input);
