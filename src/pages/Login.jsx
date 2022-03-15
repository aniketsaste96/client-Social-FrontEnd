import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import LockOpenIcon from "@material-ui/icons/LockOpen";
const Login = () => {
  const dispatch = useDispatch();
  function login(values) {
    console.log(values);
    dispatch(userLogin(values));
  }
  return (
    <>
      <Row justify="center" className="register-div">
        <Col lg={5} xs={24}>
          <h3>Login</h3>
          <hr />
          <Form layout="vertical" className="bs1 p-3" onFinish={login}>
            <Form.Item
              label="username"
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Login <LockOpenIcon />
            </Button>

            <Link to="/register"> Not registred? Register here</Link>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
