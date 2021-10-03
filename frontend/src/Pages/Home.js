import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="auth-bg" style={{ height: "100vh" }}>
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h1 style={{ color: "#fff", fontWeight: "900", fontSize: "70px" }}>
          Hello, Please Login Or Signup
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/login">
            <Button style={{ width: "300px", marginBottom: "10px" }}>
              Go to Login
            </Button>
          </Link>

          <Link to="/register">
            <Button style={{ width: "300px" }}>Join Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
