import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
// styles
import { loginUser } from "../Services/auth";
import Nav from "../Components/Nav";

const alignLoginForm = {
  justifyContent: "center",
  display: "flex",
  height: "100vh",
  alignItems: "center",
  flexFlow: "column",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);
    await loginUser(values, history, setError, setLoading);
  };

  return (
    <div style={alignLoginForm} className="auth-bg">
      <Nav />
      <h1 style={{ color: "#fff", fontWeight: "900", fontSize: "70px" }}>
        {" "}
        Log in to your account
      </h1>
      <div className="form-bg">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter valid email address" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            {loading ? (
              <LoadingOutlined
                style={{ fontSize: "20px", marginRight: "10px" }}
              />
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: "5px" }}
              >
                Log in
              </Button>
            )}
            Or{" "}
            <Link to="/register" style={{ marginLeft: "5px" }}>
              register now!
            </Link>
          </Form.Item>
          <p style={{ margin: "10px 0", color: "red", textAlign: "center" }}>
            {error}
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
