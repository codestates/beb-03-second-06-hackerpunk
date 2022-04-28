import { React, styled, Button, useDispatch, setSelected } from "../../common";

const StyledButton = styled(Button)`
  font-size: 0.62rem;
  border: 1px solid white;
  padding: 0;
  height: 100%;
`;

const StyledButton__Animate = {
  initial: {
    opacity: 0,
    width: "35%",
  },
  animate: {
    opacity: 1,
    position: "absolute",
    x: "-14.2rem",
    y: "0rem",
    width: "35%",
  },
  exit: {
    opacity: 0,
  },
};

function CancelButton({ message = "Submit", ...props }) {
  const dispatch = useDispatch();
  return (
    <StyledButton
      {...StyledButton__Animate}
      onClick={() => {
        dispatch(setSelected(0));
      }}
      {...props}
    >
      {message}
    </StyledButton>
  );
}

export default CancelButton;
