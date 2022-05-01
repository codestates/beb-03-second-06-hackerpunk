import {
  React,
  motion,
  styled,
  Div,
  useSelector,
  useFetch,
  useFocus,
  useInput,
  useDispatch,
  useParams,
  addValues,
  useNavigate,
  useLayoutEffect,
} from "../common";

const Container = styled(Div)`
  flex-direction: column;
  padding: 1rem 0;
  border-radius: 4px;
`;

const ContentContainer = styled(Div)`
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem;
  padding-top: 0rem;
`;

const ContentHeaderContainer = styled(Div)`
  height: 30%;
`;

const Block = styled(Div)`
  display: grid;
  grid-template-columns: 3fr 15fr 3fr 2fr;
  grid-gap: 18px;

  word-break: break-all;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Author = styled(Div)`
  opacity: 0.7;
  font-size: clamp(0.8rem, 1vw, 1.5rem);
  justify-content: flex-start;
`;

const AuthorInContent = styled(Author)`
  width: 30%;
  font-size: clamp(0.7rem, 1vw, 1.2rem);
`;

const Title = styled(Div)`
  font-size: clamp(1.4rem, 1vw, 3rem);
  justify-content: flex-start;
  padding-left: 1rem;
`;

const TitleInContent = styled(Title)`
  font-size: 1.2rem;
  margin-left: 0.4rem;
`;

const CreatedAt = styled(Div)`
  font-size: clamp(0.4rem, 0.5vw, 0.8rem);
  justify-content: flex-end;
`;

const CreatedAtInContent = styled(CreatedAt)`
  font-size: clamp(0.4rem, 0.5vw, 2rem);
  justify-content: flex-end;
`;

const Views = styled(Div)`
  font-size: clamp(0.4rem, 2.4vw, 0.9rem);
  justify-content: flex-end;
`;

const ViewsInContent = styled(Views)`
  font-size: clamp(0.4rem, 0.5vw, 2rem);
  justify-content: flex-start;
`;

const Content = styled(Div)`
  overflow-y: scroll;
  justify-content: flex-start;
  align-items: flex-start;
  word-wrap: break-word;
  padding: 4rem;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

/* -----------Write Mode----------- */

const InputTitle = styled(motion.input)`
  background-color: rgba(0, 0, 0, 0);
  outline: none !important;
  border: 1px solid black;
  border: none;
  color: whitesmoke;
  width: 80%;
  height: 100%;
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  &::placeholder {
    opacity: 0.15;
  }
`;

const InputTitleCancel = styled(Div)`
  width: 20%;
  font-size: clamp(0.7rem, 2vw, 0.9rem);
`;

const CancelButton = styled(motion.span)`
  color: rgba(100, 100, 100, 0.8);
  padding: 0.8rem;
`;

const TextArea = styled(motion.textarea)`
  background-color: rgba(0, 0, 0, 0);
  outline: none !important;
  border: 1px solid black;
  border-top: 1px solid #222222;
  padding: 2.5rem 0.5rem;
  overflow: hidden;
  resize: none;
  color: whitesmoke;
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  width: 100% !important;
  height: 100% !important;
  &::placeholder {
    opacity: 0.15;
  }
`;

const ContentCancel = styled(Div)`
  position: absolute;
  left: 86%;
  top: 86%;
  width: fit-content;
  height: fit-content;
  font-size: clamp(0.7rem, 2vw, 0.9rem);
`;

/* -------------------------------- */

const variants = {
  opened: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
    display: "none",
  },
};

function Post({
  selectThisToggle = () => {},
  data: {
    new_id,
    article_id,
    article_title,
    article_views,
    article_author,
    article_created_at,
  } = {},
}) {
  let article_content;

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paramArticleId = ~~params.article_id;

  // mode <- none / write / edit
  const { mode, writingTitle, writingContent, editingTitle, editingContent } =
    useSelector((state) => state.values);

  const { data } = useFetch({
    key: "get_post",
    args: {
      id: paramArticleId,
    },
    condition: paramArticleId > 0,
  });

  if (data) {
    article_id = data.article_id;
    article_title = data.article_title;
    article_views = data.article_views;
    article_author = data.article_author;
    article_created_at = data.article_created_at;
    article_content = data.article_content;
  }

  const PostContainer = ({ children }) => {
    return (
      <Container
        onClick={() => {
          if (paramArticleId) {
            dispatch(addValues({ mode: "none" }));
            navigate("../");
          } else {
            dispatch(addValues({ mode: "view" }));
            navigate(`./${article_id}`);
          }
        }}
        variants={variants}
        animate={
          paramArticleId && paramArticleId !== article_id ? "closed" : "opened"
        }
        exit="closed"
        whileHover={{
          border: "1px solid whitesmoke",
        }}
        transition={{ type: "spring", stiffness: 100, duration: 1 }}
      >
        {children}
      </Container>
    );
  };

  const [FocusTitleRef] = useFocus();
  // eslint-disable-next-line no-unused-vars
  const [_, inputTitle, setTitle] = useInput({
    middleware: (title) => {
      switch (mode) {
        case "edit":
          dispatch(addValues({ editingTitle: title }));
          break;
        case "write":
          dispatch(addValues({ writingTitle: title }));
          break;
        default:
      }
    },
  });
  // eslint-disable-next-line no-unused-vars
  const [__, inputContent, setContent] = useInput({
    middleware: (content) => {
      switch (mode) {
        case "edit":
          dispatch(addValues({ editingContent: content }));
          break;
        case "write":
          dispatch(addValues({ writingContent: content }));
          break;
        default:
      }
    },
  });

  useLayoutEffect(() => {
    switch (mode) {
      case "edit":
        setTitle(article_title);
        setContent(article_content);
        break;
      case "write":
        setTitle(writingTitle);
        setContent(writingContent);
        break;
      default:
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, setTitle, setContent]);

  switch (mode) {
    case "edit":
    case "write":
      if (mode === "write" && new_id !== 1) return;
      return (
        <ContentContainer>
          <ContentHeaderContainer>
            <AuthorInContent>{article_author}</AuthorInContent>
            <TitleInContent>
              <InputTitle
                tabIndex={1}
                ref={FocusTitleRef}
                placeholder="Title"
                {...inputTitle}
              />
              <InputTitleCancel>
                <CancelButton
                  onClick={() => {
                    dispatch(addValues({ writingTitle: "", editingTitle: "" }));
                    setTitle("");
                  }}
                  whileHover={{
                    color: "rgba(250, 150, 120, 0.9)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.8 }}
                >
                  X
                </CancelButton>
              </InputTitleCancel>
            </TitleInContent>
          </ContentHeaderContainer>

          <Content>
            <TextArea
              tabIndex={2}
              placeholder="Content"
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                }
              }}
              {...inputContent}
            ></TextArea>
          </Content>
          <ContentCancel>
            <CancelButton
              whileHover={{
                color: "rgba(250, 150, 120, 0.9)",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                dispatch(addValues({ writingContent: "", editingContent: "" }));
                setContent("");
              }}
            >
              X
            </CancelButton>
          </ContentCancel>
        </ContentContainer>
      );
    default: // else mode
      if (paramArticleId) {
        // view mode
        return (
          <PostContainer>
            <ContentContainer>
              <ContentHeaderContainer>
                <AuthorInContent>{article_author}</AuthorInContent>
                <TitleInContent>{article_title}</TitleInContent>
              </ContentHeaderContainer>
              <Content>{article_content}</Content>
              <Div
                style={{
                  height: "10%",
                  justifyContent: "space-between",
                }}
              >
                <ViewsInContent>views: {article_views}</ViewsInContent>
                <CreatedAtInContent>{article_created_at}</CreatedAtInContent>
              </Div>
            </ContentContainer>
          </PostContainer>
        );
      } else {
        // list mode
        return (
          <PostContainer>
            <Block>
              <Author>{article_author}</Author>
              <Title>{article_title}</Title>
              <CreatedAt>{article_created_at}</CreatedAt>
              <Views>{article_views}</Views>
            </Block>
          </PostContainer>
        );
      }
  }
}

export default Post;
