import { forwardRef, motion, styled } from '..';

const StyledInput = styled(motion.input)`
  margin: 4px 2px;
`;

function Input({ onEnter = (e) => e, autoComplete = false, ...props }, ref) {
  return (
    <StyledInput
      ref={ref}
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
