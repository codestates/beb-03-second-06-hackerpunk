import { React, styled, Button, useDispatch, addValues } from "../common";

const StyledButton = styled(Button)`
  font-size: 0.7rem;
  border: 1px solid white;
`;

const StyledButton__Animate = {
  initial: {
    opacity: 0,
    width: "100%",
    height: "100%",
  },
  animate: {
    opacity: 1,
    position: "absolute",
    x: "-9rem",
    y: "-2.5rem",
    width: "45%",
    height: "22%",
  },
  exit: {
    opacity: 0,
  },
};

function WriteButton({ message = "Write", ...props }) {
  const dispatch = useDispatch();
  return (
    <StyledButton
      {...StyledButton__Animate}
      onClick={() => {
        dispatch(addValues({ mode: "write" }));
      }}
      {...props}
    >
      {message}
    </StyledButton>
  );
}

export default WriteButton;
