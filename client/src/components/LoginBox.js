import {
  React,
  styled,
  useFetch,
  useNavigate,
  useState,
  useInput,
  useFocus,
  Input,
  Button,
  Div,
  VideoLogo,
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

const Label = styled.label``;

const ToSignIn = styled.span`
  font-size: 0.9rem;
  text-decoration: underline;
  &:hover {
    color: rgba(210, 220, 220, 0.9);
  }
`;

function LoginBox() {
  const [id, inputId] = useInput(),
    [password, inputPassword] = useInput();

  const [focusRef] = useFocus();

  const [submit, setSubmit] = useState(false);
  const onSubmit = () => {
    setSubmit(true);
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

  return (
    <Container>
      <VideoLogo />
      <InnerContainer>
        <Label>
          <span>ID</span>
          <Input ref={focusRef} onEnter={onSubmit} {...inputId} />
        </Label>
        <Label>
          <span>PW</span>
          <Input type="password" onEnter={onSubmit} {...inputPassword} />
        </Label>
      </InnerContainer>
      <ToSignIn
        onClick={() => {
          navigate('/sign');
        }}
      >
        Sign in
      </ToSignIn>
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  );
}

export default LoginBox;
