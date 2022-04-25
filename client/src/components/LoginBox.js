import {
  React,
  motion,
  styled,
  useFetch,
  useEffect,
  useNavigate,
  useState,
  useInput,
  useFocus,
  Input,
  Button,
  Div,
  VideoLogo,
  validate,
  useErrorBang,
  removeWhitespace,
  MAX_ID_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../common';

const Container = styled(Div)`
  width: 40%;
  flex-direction: column;
  justify-content: space-between;
  height: 11.5rem;
`;

const InnerContainer = styled(Div)`
  flex-direction: column;
  justify-content: space-between;
  margin: 2rem 0;
  margin-bottom: 1.85rem;
`;

const Label = styled.label``;

const ToSignIn = styled(motion.span)`
  font-size: 0.9rem;
  text-decoration: underline;
  margin-top: 0.5rem;
  opacity: 0.8;
`;

const memoId = {
  value: '',
};

function LoginBox() {
  const [id, inputId] = useInput({
      initialValue: memoId,
      middleware: removeWhitespace,
    }),
    [password, inputPassword] = useInput({ middleware: removeWhitespace });

  const errorBang = useErrorBang();

  const [FocusIdRef, focusId] = useFocus({ start: false });
  const [FocusPasswordRef, focusPassword] = useFocus({ start: false });

  useEffect(() => {
    if (memoId.value.length > 0) {
      focusPassword();
    } else {
      focusId();
    }
  }, []);

  const [submit, setSubmit] = useState(false);
  const onSubmit = () => {
    if (
      id.length === 0 || //
      password.length === 0
    ) {
      return;
    }
    try {
      validate({ key: 'id', value: id });
      validate({ key: 'password', value: password });
      setSubmit(true);
    } catch ({ message = '' }) {
      errorBang('Validating', message);
    }
  };

  const { data } = useFetch({
    key: 'login',
    args: { data: { id, password } },
    condition: submit,
  });

  const navigate = useNavigate();

  if (data) {
    navigate('/contents');
  }

  const toSignIn = () => {
    navigate('/sign');
  };

  return (
    <Container>
      <VideoLogo />
      <InnerContainer>
        <Label>
          {/* <span>ID</span> */}
          <Input
            type="text"
            placeholder="ID Here"
            ref={FocusIdRef}
            onEnter={onSubmit}
            maxLength={MAX_ID_LENGTH}
            {...inputId}
            required
            tabIndex="1"
          />
        </Label>
        <Label>
          {/* <span>PW</span> */}
          <Input
            ref={FocusPasswordRef}
            placeholder="Password"
            type="password"
            onEnter={onSubmit}
            maxLength={MAX_PASSWORD_LENGTH}
            {...inputPassword}
            required
            tabIndex="2"
          />
        </Label>
      </InnerContainer>
      <Button onClick={onSubmit}>Log in</Button>
      <ToSignIn
        onClick={toSignIn}
        whileHover={{
          color: 'rgba(200, 225, 200, 0.7)',
          scale: 1.05,
        }}
        onKeyDown={(e) => {
          // Tab Looping
          e.preventDefault();
          if (e.key === 'Tab') {
            focusId();
          } else if (e.key === 'Enter') {
            toSignIn();
          }
        }}
        tabIndex="3"
      >
        Sign up
      </ToSignIn>
    </Container>
  );
}

export default LoginBox;
