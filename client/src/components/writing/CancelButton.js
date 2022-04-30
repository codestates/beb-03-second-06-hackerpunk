import { React, styled, Button } from "../../common";

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

function CancelButton({ children = "Cancel", ...props }) {
  return (
    <StyledButton {...StyledButton__Animate} {...props}>
      {children}
    </StyledButton>
  );
}

export default CancelButton;
