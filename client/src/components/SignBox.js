import {
  React,
  useState,
  styled,
  useFetch,
  useInput,
  useEffect,
  useNavigate,
  useErrorBang,
  Button,
  Input,
  Div,
  validate,
  MAX_ID_LENGTH,
  MAX_PASSWORD_LENGTH,
  removeWhitespace,
  useFocus,
} from '../common';

const Container = styled(Div)`
  width: 40%;
  flex-direction: column;
  justify-content: space-between;
  height: 14rem;
`;

const InnerContainer = styled(Div)`
  flex-direction: column;
  justify-content: space-between;
  margin: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2.6rem;
`;

const Label = styled.label``;

const ToLogIn = styled.span`
  font-size: 0.9rem;
  text-decoration: underline;
  &:hover {
    color: rgba(210, 220, 220, 0.9);
  }
`;

// ---------- Animation ----------
const Container__Animate = {
  hidden: {
    y: '-50vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 30,
      stiffness: 400,
    },
  },
  exit: {
    y: '50vh',
    opacity: 0,
  },
};
// -------------------------------

const memoId = {
    value: '',
  },
  memoEmail = {
    value: '',
  };

function SignBox() {
  const [id, inputId] = useInput({
      initialValue: memoId,
      middleware: removeWhitespace,
    }),
    [password, inputPassword] = useInput({ middleware: removeWhitespace }),
    [passwordRe, inputPasswordRe] = useInput({ middleware: removeWhitespace }),
    [email, inputEmail] = useInput({
      initialValue: memoEmail,
      middleware: removeWhitespace,
    });

  const [focusIdRef, focusId] = useFocus({ start: false });
  const [focusPasswordRef, focusPassword] = useFocus({ start: false });

  useEffect(() => {
    if (memoId.value.length > 0) {
      focusPassword();
    } else {
      focusId();
    }
  }, []);

  const errorBang = useErrorBang();

  const [submit, setSubmit] = useState(false);
  const onSubmit = () => {
    if (
      id.length === 0 || //
      password.length === 0 ||
      passwordRe.length === 0 ||
      email.length === 0
    ) {
      return;
    }
    if (password !== passwordRe) {
      errorBang(`Validating`, `Password(re) is different from the password`);
    }
    try {
      validate({ key: 'id', value: id });
      validate({ key: 'password', value: password });
      validate({ key: 'email', value: email });
      setSubmit(true);
    } catch ({ message = '' }) {
      errorBang('Validating', message);
    }
    setSubmit(true);
  };

  const { data } = useFetch({
    key: 'sign',
    args: { data: { id, password } },
    condition: submit,
  });

  const navigate = useNavigate();

  if (data) {
    setSubmit(false);
    navigate('/');
  }

  return (
    <Container
      variants={Container__Animate}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Title>Sign Up</Title>
      <InnerContainer>
        <Label>
          id
          <Input
            ref={focusIdRef}
            onEnter={onSubmit}
            maxLength={MAX_ID_LENGTH}
            {...inputId}
            required
          />
        </Label>
        <Label>
          pw
          <Input
            ref={focusPasswordRef}
            type="password"
            onEnter={onSubmit}
            maxLength={MAX_PASSWORD_LENGTH}
            {...inputPassword}
            required
          />
        </Label>
        <Label>
          pw(re)
          <Input
            type="password"
            onEnter={onSubmit}
            maxLength={MAX_PASSWORD_LENGTH}
            {...inputPasswordRe}
            required
          />
        </Label>
        <Label>
          email
          <Input type="email" onEnter={onSubmit} {...inputEmail} required />
        </Label>
      </InnerContainer>
      <ToLogIn
        onClick={() => {
          navigate('/');
        }}
      >
        Log in
      </ToLogIn>
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  );
}

export default SignBox;
