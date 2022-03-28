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
    <div className="register-div ">
      <Row justify="center" className="regiM ">
        <Col lg={5} xs={24}>
          <p>username : guest</p>
          <p>password : 12345678</p>
          <h3 style={{ color: "white" }}>Login</h3>
          <hr />

          <Form layout="vertical" className="bs1 p-3 login" onFinish={login}>
            <Form.Item
              label={<label style={{ color: "white" }}>Username</label>}
              name="username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<label style={{ color: "white" }}>Password</label>}
              name="password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Login <LockOpenIcon />
            </Button>
            <br />
            <br />
            <Link to="/register"> Not registred? Register here</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
