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
  justify-content: space-evenly;
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
`;

function SignBox() {
  const [id, inputId] = useInput(),
    [password, inputPassword] = useInput(),
    [passwordRe, inputPasswordRe] = useInput(),
    [email, inputEmail] = useInput();

  const submit = () => {};

  return (
    <Container>
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
      <Button onClick={submit}>Submit</Button>
    </Container>
  );
}

export default SignBox;
