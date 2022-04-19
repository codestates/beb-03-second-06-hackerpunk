import { React, styled } from "../common";
import { useRef } from "react";

const Container = styled.div``;

function Sign({
  title = "",
  keys = [],
  errorRef = null,
  submit = "",
  OnClick = () => {},
} = {}) {
  return (
    <Container>
      <h1>{title}</h1>
      {keys.map((keyRef, idx) => {
        for (const k in keyRef) {
          return (
            <div key={idx}>
              {k} <input ref={keyRef[k]} type="text" />
            </div>
          );
        }
      })}
      <h3 ref={errorRef}></h3>
      <button onClick={OnClick}>{submit}</button>
    </Container>
  );
}

export default Sign;
