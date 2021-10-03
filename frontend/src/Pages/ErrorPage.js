import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

function ErrorPage() {
  return (
    <div style={{ height: "100vh" }} className="auth-bg">
      <div style={{ margin: "0 auto", width: "600px", textAlign: "center" }}>
        <h1
          style={{
            color: "#fff",
            fontSize: "70px",
            fontWeight: "900",
            paddingTop: "100px",
          }}
        >
          This page does not exist!
        </h1>
        <Link to="/">
          <Button>Go back to home</Button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
