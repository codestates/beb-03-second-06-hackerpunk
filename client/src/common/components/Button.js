import { styled } from '..';

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
  &:hover {
    background-color: rgba(10, 20, 20, 0.9);
    font-size: 0.97rem;
  }
`;

export default Button;
