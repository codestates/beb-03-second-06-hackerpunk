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

import LogoSrc from '../assets/hplogo.gif';

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

const Logo = styled.img`
  width: 28rem;
  height: 18rem;
  margin: 15px;
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
    <Container
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Logo src={LogoSrc} />
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
