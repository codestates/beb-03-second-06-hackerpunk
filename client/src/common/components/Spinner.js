import { motion, styled } from "..";

const SVG = styled(motion.svg)`
  margin: auto;
  background: rgb(0, 0, 0, 0);
  display: block;
  shape-rendering: auto;
  width: 200px;
  height: 200px;
`;

function Spinner() {
  return (
    <SVG viewBox={"0 0 100 100"} preserveAspectRatio="xMidYMid">
      <path
        d="M10 50A40 40 0 0 0 90 50A40 43.1 0 0 1 10 50"
        fill="#efeee0"
        stroke="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 51.55;360 50 51.55"
        ></animateTransform>
      </path>
    </SVG>
  );
}

export default Spinner;
