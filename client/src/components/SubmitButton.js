import { React, styled, Button, useDispatch, setSelected } from "../common";

const StyledButton = styled(Button)`
  font-size: 0.72rem;
  border: 1px solid white;
  height: 105%;
`;

const StyledButton__Animate = {
  initial: {
    opacity: 0,
    width: "48%",
  },
  animate: {
    opacity: 1,
    position: "absolute",
    x: "-9rem",
    y: "0rem",
    width: "48%",
  },
  exit: {
    opacity: 0,
  },
};

function SubmitButton({ message = "Submit", ...props }) {
  //   const { data: { access_token } = {} } = useFetch({
  //     key: "post_post",
  //     args: { data: { article_title, article_content } },
  //   });

  //   useEffect(() => {
  //     if (access_token) {
  //       console.log("setToken", access_token);
  //     }
  //   }, []);

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

export default SubmitButton;
