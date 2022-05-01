import { Div, useNavigate } from "../common";

function LogoutButton() {
  const navigate = useNavigate();
  return (
    <Div
      style={{
        opacity: 0.9,
        position: "absolute",
        right: "2vw",
        top: "2vh",
        height: "fit-content",
        width: "1.2rem",
        border: "1px solid rgb(50,50,50)",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        borderRadius: "50%",
      }}
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/");
      }}
      whileHover={{
        scale: 0.8,
        opacity: 0.7,
        boxShadow:
          "0 0 60px 30px #fff, 0 0 100px 60px #b400ff, 0 0 140px 90px #ff00d4",
      }}
    >
      <Div
        style={{
          position: "relative",
          top: "3px",
          borderRadius: "50%",
          color: "darkred",
          backgroundColor: "rgba(0,0,0,0)",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        ⊙
      </Div>
    </Div>
  );
}

export default LogoutButton;
