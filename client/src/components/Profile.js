import {
  React,
  motion,
  styled,
  Div,
  Logo,
  useState,
  useDispatch,
  useSelector,
  toSummary,
  setSelected,
  setWriting,
  deletePost,
  setUser,
  useSWRConfig,
  setCurrentContentBody,
} from "../common";
import hp from "../api/hp";

import WriteButton from "./WriteButton";
import SubmitButton from "./writing/SubmitButton";
import CancelButton from "./writing/CancelButton";

import TokenIcon from "../assets/images/hptoken.png";

const Container = styled(Div)`
  z-index: 999;
  position: absolute;
  right: 10vw;
  top: 11vh;
  width: 11.5rem;
  height: 6.5rem;
  border: solid 1px whitesmoke;
  border-radius: 2px;
  padding: 10px;
  flex-direction: column;
  font-family: "Gill Sans", sans-serif;
  background-color: rgb(10, 10, 10, 0.6);
`;

const InnerContainer = styled(Div)`
  justify-content: space-between;
  align-items: center;
  word-break: break-all;
  height: 80%;
`;

const ProfileInnerContainer = styled(Div)`
  height: 75%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  word-break: break-all;
  margin: 0.2rem;
`;

const StyledLogo = styled(Logo)`
  width: 30%;
  height: 70%;
  border-radius: 50%;
  margin-right: 4px;
`;

const Span = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 10px;
`;

const Id = styled(Div)`
  justify-content: flex-end;
  font-size: 0.8rem;
  margin: 0.2rem 0;
`;

const Address = styled(Div)`
  justify-content: flex-end;
  font-size: 0.77rem;
  padding: 0.5rem 0;
`;

const Token = styled.p`
  font-size: 0.77rem;
  color: white;
`;

const ConnectWallet = styled(motion.div)`
  position: absolute;
  left: 25px;
  top: -25px;
  font-size: 0.75rem;
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 86%;
`;

// ---------- Animation ----------
const Container__Animate_variants = {
  initial: {
    opacity: 0,
    y: -30,
    height: "11%",
  },
  animate: {
    opacity: 1,
    x: 12,
    y: 0,
    scale: 1.1,
    height: "11%",
  },
  exit: {
    opacity: 1,
    position: "absolute",
    borderRadius: "0.15rem",
    x: "-4vw",
    y: "0vh",
    height: "2.2%",
  },
};

const ConnectWallet__Animate = {
  whileHover: {
    scale: 1.02,
    color: "rgba(150, 20, 20, 0.8)",
    textDecoration: "underline bisque dashed 1px",
  },
  whileTap: {
    scale: 0.95,
    color: "rgb(0, 0, 0, 0)",
    textDecoration: "none",
  },
};

const CopyAccount__Animate = {
  whileHover: {
    scale: 1,
    color: "rgba(200, 240, 230, 0.8)",
    cursor: "pointer",
  },
  whileTap: {
    scale: 0.95,
    color: "rgb(110, 180, 180, 0.6)",
    textDecoration: "none",
  },
};
// -------------------------------

const Helper = styled(Div)`
  z-index: 1000;
  position: absolute;
  width: 12rem;
  height: 5rem;
  text-align: justify;
  text-justify: auto;
`;

function ConectWalletHelper() {
  return (
    <Helper
      initial={{ x: "-14rem", y: "-14rem" }}
      animate={{ x: "-11rem", y: "-6rem" }}
      exit={{ x: "-14rem", y: "-14rem" }}
    >
      If you want to withdraw your hp tokens, Please connect to your own wallet.
    </Helper>
  );
}

function Profile() {
  const dispatch = useDispatch();
  const { id, internal_pub_key, external_pub_key, level, amount } = useSelector(
    (state) => state.user
  );
  const {
    prevSelected,
    selected,
    contents,
    writingTitle,
    writingContent,
    currentContentId,
    currentContentBody,
  } = useSelector((state) => state.posts);

  let current_author, current_title;

  if (selected > 0) {
    const current_article = contents[selected - 1];
    current_author = current_article.article_author;
    current_title = current_article.article_title;
  }

  const connectWallet = async () => {
    const isSuccess = await hp.connectToExternalWallet(internal_pub_key);
    if (isSuccess) {
      dispatch(setUser({ external_pub_key: hp.account }));
    }
  };

  const [connectWalletHelper, setConnectWalletHelper] = useState("");

  const isWriteMode = selected === -1,
    isEditMode = selected === -2,
    isMainMode = selected === 0,
    isViewMode = selected > 0 && current_author !== id,
    isMyViewMode = selected > 0 && current_author === id,
    hasConnectedWallet = external_pub_key.length > 3;

  const { cache } = useSWRConfig();

  return (
    <Container
      whileHover={{
        scale: 1.15,
        textDecoration: "none",
      }}
      variants={Container__Animate_variants}
      initial={isMainMode ? "initial" : "animate"}
      animate={isMainMode ? "animate" : "exit"}
      exit="exit"
    >
      {isMainMode && (
        <>
          <WriteButton message="Write" />
          {hasConnectedWallet === false && (
            <>
              <ConnectWallet
                {...ConnectWallet__Animate}
                onClick={connectWallet}
                onMouseEnter={() => setConnectWalletHelper(ConectWalletHelper)}
                onMouseLeave={() => setConnectWalletHelper("")}
              >
                ❕ Connect To External Wallet
              </ConnectWallet>
              {connectWalletHelper}
            </>
          )}
          <InnerContainer>
            <StyledLogo />
            <ProfileInnerContainer>
              {hasConnectedWallet ? (
                <Id
                  style={{
                    color: "#f4ba3d",
                  }}
                >
                  🦀​ {id}
                </Id>
              ) : (
                <Id>{id}</Id>
              )}
              <Address
                {...CopyAccount__Animate}
                onClick={() => {
                  navigator.clipboard.writeText(internal_pub_key);
                }}
              >
                {toSummary(internal_pub_key)}
              </Address>
            </ProfileInnerContainer>
          </InnerContainer>
        </>
      )}
      {isViewMode && <></>}
      {isWriteMode && (
        <>
          <CancelButton onClick={() => dispatch(setSelected(0))} />
          <SubmitButton
            fetch={{
              key: "post_post",
              data: {
                article_title: writingTitle,
                article_content: writingContent,
              },
            }}
            succeedCallback={() => {
              dispatch(setSelected(0));
              dispatch(setWriting({ title: "", content: "" }));
            }}
            onClick={() => writingTitle && writingContent}
          />
        </>
      )}
      {isMyViewMode && (
        <>
          <CancelButton
            onClick={() => {
              dispatch(
                setWriting({
                  title: current_title,
                  content: currentContentBody,
                })
              );
              dispatch(setSelected(-2));
            }}
          >
            Edit
          </CancelButton>
          <SubmitButton
            fetch={{
              key: "delete_post",
              data: {
                article_id: currentContentId,
              },
            }}
            succeedCallback={() => {
              dispatch(deletePost(selected));
              dispatch(setSelected(0));
            }}
            onClick={() => {
              if (currentContentId > 0) {
                return window.confirm(
                  "Are you sure you want to delete this article?"
                );
              }
              return false;
            }}
          >
            Delete
          </SubmitButton>
        </>
      )}
      {isEditMode && (
        <>
          <CancelButton
            onClick={() => {
              dispatch(setSelected(prevSelected));
            }}
          >
            Cancel
          </CancelButton>
          <SubmitButton
            fetch={{
              key: "put_post",
              data: {
                article_id: currentContentId,
                article_title: writingTitle,
                article_content: writingContent,
              },
            }}
            succeedCallback={() => {
              cache.clear();
              dispatch(setSelected(0));
              dispatch(setCurrentContentBody(writingContent));
              dispatch(setWriting({ title: "", content: "" }));
            }}
            onClick={() => {
              if (currentContentId > 0) {
                return window.confirm(
                  "Are you sure you want to update this article?"
                );
              }
              return false;
            }}
          >
            Confirm
          </SubmitButton>
        </>
      )}

      <InnerContainer>
        <Span>Lv.{level}</Span>
        <img
          style={{
            width: "0.86rem",
          }}
          src={TokenIcon}
          alt="hpicon"
        />
        <Token>{amount}</Token>
        <Span>hp</Span>
      </InnerContainer>
    </Container>
  );
}

export default Profile;
