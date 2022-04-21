import { React, styled, useNavigate, useInput } from "../common";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 14rem;
  justify-content: space-between;
  align-items: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 2rem 0;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h1`
  font-size: 2.6rem;
`;

const Label = styled.label``;

const Input = styled.input`
  margin: 4px 2px;
`;

const Button = styled.button`
  width: 6rem;
  height: 2.5rem;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid white;
  color: white;
  background-color: black;
  border-radius: 3px;
  display: block;
`;

function LoginBox() {
  const [id, inputId] = useInput(),
    [password, inputPassword] = useInput();

  const navigate = useNavigate();

  const submit = () => {
    navigate("/contents");
  };

  return (
    <Container>
      <Title>Log In</Title>
      <InnerContainer>
        <Label>
          ID
          <Input {...inputId} />
        </Label>
        <Label>
          PW
          <Input {...inputPassword} />
        </Label>
      </InnerContainer>
      <Button onClick={submit}>Submit</Button>
    </Container>
  );
}

export default LoginBox;
