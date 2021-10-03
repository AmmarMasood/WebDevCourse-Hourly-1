import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function Nav() {
  const history = useHistory();
  return (
    <div style={{ position: "absolute", width: "100%", top: "0" }}>
      <h4
        onClick={() => history.goBack()}
        style={{
          fontSize: "30px",
          color: "#fff",
          fontWeight: "900",
          padding: "10px",
          cursor: "pointer",
          display: "inline-block",
        }}
      >
        <ArrowLeftOutlined /> Go Back
      </h4>
    </div>
  );
}

export default Nav;
