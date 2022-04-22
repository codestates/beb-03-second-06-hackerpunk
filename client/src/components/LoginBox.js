import {
  React,
  styled,
  useFetch,
  useNavigate,
  useState,
  useInput,
  Input,
  Button,
  Div,
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
  color: whitesmoke;
  font-size: 2.6rem;
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

  const [submit, setSubmit] = useState(false);
  const onSubmit = () => setSubmit(true);

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
      <Title>Log In</Title>
      <InnerContainer>
        <Label>
          <span>ID</span>
          <Input {...inputId} />
        </Label>
        <Label>
          <span>PW</span>
          <Input {...inputPassword} />
        </Label>
      </InnerContainer>
      <ToSignIn onClick={() => navigate('/sign')}>Sign in</ToSignIn>
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  );
}

export default LoginBox;
