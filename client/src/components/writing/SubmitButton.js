import {
  React,
  styled,
  Button,
  useDispatch,
  useState,
  useEffect,
  useFetch,
  setSelected,
  setWriting,
  useSelector,
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

function SubmitButton({ message = "Submit", ...props }) {
  const [submit, setSubmit] = useState(false);

  const { writingTitle, writingContent } = useSelector((state) => state.posts);

  const { data: { id } = {} } = useFetch({
    key: "post_post",
    args: {
      data: { article_title: writingTitle, article_content: writingContent },
    },
    condition: submit,
  });

  useEffect(() => {
    if (id) {
      console.log("posted", id);
      dispatch(setSelected(0));
      dispatch(setWriting({ title: "", content: "" }));
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const dispatch = useDispatch();
  return (
    <StyledButton
      {...StyledButton__Animate}
      onClick={() => {
        if (writingTitle && writingContent) setSubmit(true);
      }}
      {...props}
    >
      {message}
    </StyledButton>
  );
}

export default SubmitButton;
