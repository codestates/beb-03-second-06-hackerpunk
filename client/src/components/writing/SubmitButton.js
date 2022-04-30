import {
  React,
  styled,
  Button,
  useState,
  useEffect,
  useFetch,
} from "../../common";

const StyledButton = styled(Button)`
  font-size: 0.72rem;
  border: 1px solid white;
  height: 100%;
`;

const StyledButton__Animate = {
  initial: {
    opacity: 0,
    width: "48%",
  },
  animate: {
    opacity: 1,
    position: "absolute",
    padding: 0,
    x: "-9rem",
    y: "0rem",
    width: "48%",
  },
  exit: {
    opacity: 0,
  },
};

function SubmitButton({
  children = "Submit",
  fetch = { key: "", data: {} },
  succeedCallback = () => {},
  onClick = () => true,
  ...props
}) {
  const [submit, setSubmit] = useState(false);

  const { data } = useFetch({
    key: fetch.key,
    args: {
      data: fetch.data,
    },
    condition: submit,
  });

  useEffect(() => {
    if (data) {
      succeedCallback(data);
      setSubmit(false);
    }
  }, [data, succeedCallback]);

  return (
    <StyledButton
      {...StyledButton__Animate}
      onClick={() => {
        if (onClick()) setSubmit(true);
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default SubmitButton;
