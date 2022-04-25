import { forwardRef, motion, styled } from "..";

const StyledInput = styled(motion.input)`
  margin: 5px 2px;
  width: 15rem;
  height: 1.2rem;
  opacity: 80%;
  border: 1px solid whitesmoke;
  border-radius: 3px;
  font-size: 11px;
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
