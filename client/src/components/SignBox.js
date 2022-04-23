import {
  React,
  useState,
  styled,
  useFetch,
  useInput,
  useNavigate,
  useErrorBang,
  Button,
  Input,
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

function SignBox() {
  const [id, inputId] = useInput(),
    [password, inputPassword] = useInput(),
    [passwordRe, inputPasswordRe] = useInput(),
    [email, inputEmail] = useInput();

  const errorbang = useErrorBang();

  const [submit, setSubmit] = useState(false);
  const onSubmit = () => {
    /* -----validating------ */
    if (password !== passwordRe) {
      errorbang(`Form error`, `Password(re) is different from the password`);
    }
    /* --------------------- */
    setSubmit(true);
  };

  const { data } = useFetch({
    key: 'sign',
    args: { data: { id, password } },
    condition: submit,
  });

  const navigate = useNavigate();

  if (data) {
    navigate('/');
  }

  const dropIn = {
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

  return (
    <Container variants={dropIn} initial="hidden" animate="visible" exit="exit">
      <Title>Sign Up</Title>
      <InnerContainer>
        <Label>
          id
          <Input {...inputId} />
        </Label>
        <Label>
          pw
          <Input {...inputPassword} />
        </Label>
        <Label>
          pw(re)
          <Input {...inputPasswordRe} />
        </Label>
        <Label>
          email
          <Input {...inputEmail} />
        </Label>
      </InnerContainer>
      <ToLogIn onClick={() => navigate('/')}>Log in</ToLogIn>
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  );
}

export default SignBox;
