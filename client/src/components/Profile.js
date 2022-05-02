import {
  React,
  motion,
  styled,
  Div,
  Logo,
  useState,
  useFetch,
  useParams,
  useDispatch,
  useSelector,
  toSummary,
  addValues,
  useSWRConfig,
  useAnimation,
  useNavigate,
  useLayoutEffect,
  MIN_WITHDRAW_AMOUNT,
  MIN_DONATE_AMOUNT,
} from "../common";
import hp from "../api/hp";

import WriteButton from "./WriteButton";
import SubmitButton from "./writing/SubmitButton";
import CancelButton from "./writing/CancelButton";

import TokenIcon from "../assets/images/hptoken.png";
import useErrorBang from "../hooks/useErrorBang";

// wow
const LOCKED_COLOR = "#F66B0E";

const Container = styled(Div)`
  z-index: 999;
  position: absolute;
  right: 10vw;
  top: 11vh;
  width: 11.5rem;
  height: 11%;
  border: solid 1px whitesmoke;
  border-radius: 4px;
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
  color: #fff;
  text-shadow: 0 0 1px #fff, 0 0 7px #fff, 0 0 10px #fff, 0 0 20px #bc13fe,
    0 0 40px #bc13fe, 0 0 50px #bc13fe, 0 0 100px #bc13fe, 0 0 150px #bc13fe;
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
  width: 88%;
`;

// ---------- Animation ----------
const Container__Animate_variants = {
  initial: {
    y: -30,
    height: "11%",
  },
  big: {
    x: 12,
    y: 0,
    scale: 1.1,
    height: "11%",
  },
  small: {
    position: "absolute",
    borderRadius: "0.15rem",
    x: "-4vw",
    y: "0vh",
    height: "2.2%",
  },
  exit: {
    y: -30,
    height: "11%",
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

function ConectWalletHelper(props) {
  return (
    <Helper
      initial="hidden"
      variants={{
        visible: {
          display: "block",
          x: "-11rem",
          y: "-5rem",
        },
        hidden: {
          display: "none",
          x: "-14rem",
          y: "-14rem",
        },
      }}
      exit="hidden"
      {...props}
    >
      If you want to withdraw your hp tokens, Please connect to your own wallet.
    </Helper>
  );
}

function DonationDisplay({ message = "Total Donation", amount = 0, ...props }) {
  return (
    <CancelButton
      style={{
        backgroundColor: "rgba(0,0,0,0)",
        border: "none",
        boxShadow: "none",
        fontSize: "0.6rem",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 0.7,
        x: "-16.7rem",
        y: "0rem",
        width: "75%",
      }}
      exit={{
        opacity: 0,
      }}
      {...props}
    >
      {message}
      <span
        style={{
          fontSize: "0.74rem",
        }}
      >
        {amount}
      </span>
    </CancelButton>
  );
}

const ProfileContainer = ({ children, big, data: { level, amount } = {} }) => (
  <Container
    variants={Container__Animate_variants}
    initial="initial"
    animate={big ? "big" : "small"}
    exit="exit"
  >
    {children}
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

function Profile() {
  const dispatch = useDispatch();
  const errorBang = useErrorBang();
  const { cache } = useSWRConfig();

  const navigate = useNavigate();

  const walletHelperControl = useAnimation();

  const params = useParams();

  const [_refresh, _setRefresh] = useState(false);
  const refresh = () => {
    cache.clear();
    _setRefresh(!_refresh);
  };

  const paramArticleId = ~~params["*"];

  useLayoutEffect(() => {
    if (paramArticleId) {
      dispatch(addValues({ mode: "view" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: {
      user: {
        id,
        internal_pub_key,
        external_pub_key,
        level,
        amount,
        donate_article_id,
      },
      // posts,
      // max_article_id,
    },
  } = useFetch({
    key: "get_user_posts",
    args: {
      id: paramArticleId,
    },
  });

  const {
    data: {
      article_id,
      article_author,
      article_title,
      // article_views,
      article_content,
      article_donated,
      article_donate_status,
      article_donate_remain_time,
      // article_created_at,
    } = {},
  } = useFetch({
    key: "get_post",
    args: {
      id: paramArticleId,
    },
    condition: paramArticleId > 0,
  });

  const canBeLocked = article_donate_status === 2;
  const isLocked = article_donate_status === 3;
  const didIDonate = donate_article_id.find((v) => v === article_id);

  const isMyViewMode = article_author === id;

  const {
    mode,
    writingTitle,
    writingContent,
    editingTitle,
    editingContent,
    waitingAPI,
  } = useSelector((state) => state.values);

  const connectWallet = async () => {
    dispatch(addValues({ waitingAPI: true }));
    hp.connectToExternalWallet(internal_pub_key)
      .then((amount) => {
        if (amount) {
          cache.clear();
        }
      })
      .catch(({ message = "" } = {}) => {
        errorBang("Conneted To External Wallet", message.slice(0, 30));
      })
      .finally(() => {
        dispatch(addValues({ waitingAPI: false }));
      });
  };

  const hasConnectedWallet = external_pub_key.length > 3;

  /* Donate */
  const [donationAmount, setDonationAmount] = useState(0);
  /* Withdraw */
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const { data } = useFetch({
    key: "withdraw",
    args: {
      data: {
        amount: withdrawAmount,
      },
    },
    condition: withdrawAmount > 0,
  });
  if (data) {
    setWithdrawAmount(0);
    dispatch(addValues({ waitingAPI: false }));
  }
  /* ******** */

  switch (mode) {
    case "write":
      return (
        <ProfileContainer big={mode === "none"} data={{ level, amount }}>
          <CancelButton onClick={() => dispatch(addValues({ mode: "none" }))} />
          <SubmitButton
            fetch={{
              key: "post_post",
              data: {
                article_title: writingTitle,
                article_content: writingContent,
              },
            }}
            succeedCallback={() => {
              dispatch(addValues({ mode: "none" }));
              dispatch(addValues({ writingTitle: "", writingContent: "" }));
            }}
            onClick={() => {
              if (writingTitle && writingContent) {
                return window.confirm(
                  "Are you sure you want to post this article?"
                );
              }
              return false;
            }}
          />
        </ProfileContainer>
      );
    case "edit":
      return (
        <ProfileContainer big={mode === "none"} data={{ level, amount }}>
          <CancelButton
            onClick={() => {
              dispatch(addValues({ mode: "view" }));
            }}
          >
            Cancel
          </CancelButton>
          <SubmitButton
            fetch={{
              key: "put_post",
              data: {
                article_id,
                article_title: editingTitle,
                article_content: editingContent,
              },
            }}
            succeedCallback={() => {
              cache.clear();
              dispatch(addValues({ mode: "none" }));
              dispatch(addValues({ editingTitle: "", editingContent: "" }));
            }}
            onClick={() => {
              if (article_id && editingTitle && editingContent) {
                return window.confirm(
                  "Are you sure you want to update this article?"
                );
              }
              return false;
            }}
          >
            Confirm
          </SubmitButton>
        </ProfileContainer>
      );
    case "view":
      if (isLocked) {
        return (
          <ProfileContainer big={mode === "none"} data={{ level, amount }}>
            <DonationDisplay
              animate={{
                opacity: 0.7,
                x: "-11rem",
                y: "0rem",
                width: "75%",
                color: LOCKED_COLOR,
              }}
              amount={article_donated}
            />
          </ProfileContainer>
        );
      }
      if (isMyViewMode) {
        if (article_donated <= 0 && !canBeLocked) {
          return (
            <ProfileContainer big={mode === "none"} data={{ level, amount }}>
              <DonationDisplay
                animate={{
                  opacity: 0.7,
                  x: "-21.2rem",
                  y: "0rem",
                  width: "75%",
                }}
                amount={article_donated}
              />
              <CancelButton
                onClick={() => {
                  dispatch(
                    addValues({
                      editingTitle: article_title,
                      editingContent: article_content,
                    })
                  );
                  dispatch(addValues({ mode: "edit" }));
                }}
              >
                Edit
              </CancelButton>
              <SubmitButton
                fetch={{
                  key: "delete_post",
                  data: {
                    article_id,
                  },
                }}
                succeedCallback={() => {
                  dispatch(addValues({ mode: "none" }));
                  if (paramArticleId > 0) navigate("../");
                }}
                onClick={() => {
                  if (article_id > 0) {
                    return window.confirm(
                      "Are you sure you want to delete this article?"
                    );
                  }
                  return false;
                }}
              >
                Delete
              </SubmitButton>
            </ProfileContainer>
          );
        } else if (canBeLocked) {
          return (
            <ProfileContainer big={mode === "none"} data={{ level, amount }}>
              <DonationDisplay amount={article_donated} />
              <SubmitButton
                fetch={{
                  key: "donateReward",
                  data: {
                    article_id,
                  },
                }}
                succeedCallback={() => {
                  navigate("./");
                  // dispatch(addValues({ mode: "none" }));
                  // if (paramArticleId > 0) navigate("../");
                }}
                onClick={() => {
                  if (article_id > 0) {
                    return window.confirm(
                      "Are you sure you want to lock this article?"
                    );
                  }
                  return false;
                }}
              >
                Lock
              </SubmitButton>
            </ProfileContainer>
          );
        } else {
          return (
            <ProfileContainer big={mode === "none"} data={{ level, amount }}>
              <DonationDisplay
                message="remain"
                amount={article_donate_remain_time}
              />
              <DonationDisplay
                amount={article_donated}
                animate={{
                  opacity: 0.7,
                  x: "-22rem",
                  y: "0rem",
                  width: "75%",
                }}
              />
              <SubmitButton
                style={{
                  pointerEvents: "none",
                  border: "rgba(0,0,0,0.5)",
                  opacity: 0.4,
                  scale: 0.84,
                }}
              >
                Pending...
              </SubmitButton>
            </ProfileContainer>
          );
        }
      } else {
        // not my articles view mode
        if (canBeLocked) {
          return (
            <ProfileContainer big={mode === "none"} data={{ level, amount }}>
              <DonationDisplay amount={article_donated} />
              <SubmitButton
                style={{
                  pointerEvents: "none",
                  border: "rgba(0,0,0,0.5)",
                  opacity: 0.4,
                  scale: 0.84,
                }}
              >
                Locking...
              </SubmitButton>
            </ProfileContainer>
          );
        }
        if (didIDonate) {
          return (
            <ProfileContainer big={mode === "none"} data={{ level, amount }}>
              <DonationDisplay
                message="remain"
                amount={article_donate_remain_time}
              />
              <DonationDisplay
                amount={article_donated}
                animate={{
                  opacity: 0.7,
                  x: "-22rem",
                  y: "0rem",
                  width: "75%",
                }}
              />
              <SubmitButton
                fetch={{
                  key: "donateCancel",
                  data: {
                    article_id,
                  },
                }}
                succeedCallback={refresh}
                onClick={() => {
                  if (article_id > 0) {
                    return window.confirm(
                      "Are you sure you want to un-donate this article?" // TODO! output donation amount
                    );
                  }
                  return false;
                }}
              >
                UnDonate
              </SubmitButton>
            </ProfileContainer>
          );
        } else {
          return (
            <ProfileContainer big={mode === "none"} data={{ level, amount }}>
              <DonationDisplay amount={article_donated} />
              <SubmitButton
                fetch={{
                  key: "donate",
                  data: {
                    article_id,
                    amount: donationAmount,
                  },
                }}
                succeedCallback={() => {
                  dispatch(
                    addValues({
                      mode: "none",
                    })
                  );
                  refresh();
                }}
                onClick={() => {
                  const getDonationAmount = +window.prompt(
                    `how much do you want to donate? (at least more than ${MIN_DONATE_AMOUNT})`
                  );
                  if (getDonationAmount == null) return;
                  if (
                    typeof amount !== "number" ||
                    getDonationAmount <= 0 ||
                    getDonationAmount > amount
                  ) {
                    window.alert(
                      `the amount of donation must be larger than ${MIN_DONATE_AMOUNT} and smaller than ${amount}`
                    );
                    return false;
                  }
                  if (
                    window.confirm(
                      "Are you sure you want to donate to this article?"
                    ) === false
                  )
                    return false;

                  setDonationAmount(getDonationAmount);
                  return true;
                }}
              >
                Donate
              </SubmitButton>
            </ProfileContainer>
          );
        }
      }

    default:
      return (
        <ProfileContainer big={mode === "none"} data={{ level, amount }}>
          <WriteButton message="Write" />
          {hasConnectedWallet ? (
            <ConnectWallet
              initial={waitingAPI ? "blocked" : "unBlocked"}
              animate={waitingAPI ? "blocked" : "unBlocked"}
              variants={{
                blocked: {
                  pointerEvents: "none",
                  opacity: 0.3,
                  scale: 0.8,
                },
                unBlocked: {
                  pointerEvents: "auto",
                  opacity: 1,
                  scale: 1,
                },
              }}
              {...ConnectWallet__Animate}
              onClick={() => {
                const withdrawAmount = +window.prompt(
                  `how much do you want to withdraw? (at least more than ${MIN_WITHDRAW_AMOUNT})`
                );
                if (withdrawAmount == null) return;
                if (
                  typeof amount !== "number" ||
                  withdrawAmount <= 0 ||
                  withdrawAmount > amount
                ) {
                  window.alert(
                    `the amount of withdraw must be larger than ${MIN_WITHDRAW_AMOUNT} and smaller than ${amount}`
                  );
                  return;
                }
                if (
                  window.confirm(
                    "Are you sure you want to withdraw to this amount?"
                  ) === false
                )
                  return;
                dispatch(addValues({ waitingAPI: true }));
                setWithdrawAmount(withdrawAmount);
              }}
            >
              Withdraw To External Wallet
            </ConnectWallet>
          ) : (
            <>
              <ConnectWallet
                initial={waitingAPI ? "blocked" : "unBlocked"}
                animate={waitingAPI ? "blocked" : "unBlocked"}
                variants={{
                  blocked: {
                    pointerEvents: "none",
                    opacity: 0.3,
                    scale: 0.8,
                  },
                  unBlocked: {
                    pointerEvents: "auto",
                    opacity: 1,
                    scale: 1,
                  },
                }}
                {...ConnectWallet__Animate}
                onClick={connectWallet}
                onMouseEnter={() => walletHelperControl.start("visible")}
                onMouseLeave={() => walletHelperControl.start("hidden")}
              >
                ❕ Connect To External Wallet
              </ConnectWallet>
              <ConectWalletHelper animate={walletHelperControl} />
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
        </ProfileContainer>
      );
  }
}

export default Profile;
