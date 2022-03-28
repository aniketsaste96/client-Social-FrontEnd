import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";

const Register = () => {
  const dispatch = useDispatch();
  const register = (values) => {
    //delete confirm password
    delete values.cpassword;
    dispatch(userRegister(values));
  };
  return (
    <>
      <Row justify="center" className="register-div">
        <Col lg={5} xs={24}>
          <h3 style={{ color: "white" }}>Register</h3>
          <hr />
          <Form layout="vertical" className="bs1 p-3" onFinish={register}>
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
            <Form.Item
              label={<label style={{ color: "white" }}>confirm password</label>}
              name="cpassword"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <br />
            <br />
            <Link to="/login"> Already registred? Login here</Link>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
