import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { registerNewUser } from "../Services/auth";
import Nav from "../Components/Nav";
// styles
const alignLoginForm = {
  justifyContent: "center",
  display: "flex",
  height: "100vh",
  alignItems: "center",
  flexFlow: "column",
};

const Register = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    await registerNewUser(values, history, setError, setLoading);
  };

  const form = () => (
    <>
      <Form name="register" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="firstname"
          label="First Name"
          tooltip="What is your first name?"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last Name"
          tooltip="What is your last name?"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            { min: 6, message: "password must be minimum 6 characters." },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
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
              style={{ marginRight: "5px" }}
            >
              Register
            </Button>
          )}
          Already a member?{" "}
          <Link to="/login" style={{ marginLeft: "3px" }}>
            Log In
          </Link>
        </Form.Item>
        <p style={{ margin: "10px 0", color: "red", textAlign: "center" }}>
          {error}
        </p>
      </Form>
    </>
  );

  return (
    <div style={alignLoginForm} className="auth-bg">
      <Nav />
      <h1 style={{ color: "#fff", fontWeight: "900", fontSize: "70px" }}>
        Register
      </h1>
      <div className="form-bg">{form()}</div>
    </div>
  );
};

export default Register;
