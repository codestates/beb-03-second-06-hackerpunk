import { forwardRef, motion, styled } from '..';

const StyledInput = styled(motion.input)`
  margin: 5px 2px;
  width: 14rem;
  height: 1.2rem;
  opacity: 80%;
  border: 1px solid whitesmoke;
  border-radius: 2px;
  padding-left: 7px;
  &:focus {
    outline: none !important;
  }
  &::placeholder {
    font-size: 11px;
    padding-left: 3px;
  }
  &::-moz-placeholder {
    font-size: 11px;
    padding-left: 3px;
  }
  &::-webkit-input-placeholder {
    font-size: 11px;
    padding-left: 3px;
  }
`;

function Input({ onEnter = (e) => e, autoComplete = false, ...props }, ref) {
  return (
    <StyledInput
      ref={ref}
      whileFocus={{
        border: '3px solid #A588C7',
        boxShadow: '0 0 10px #719ECE',
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          onEnter(e);
        }
      }}
      autoComplete={autoComplete ? 'on' : 'new-password'}
      {...props}
    />
  );
}

export default forwardRef(Input);
