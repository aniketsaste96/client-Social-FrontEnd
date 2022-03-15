import React, { useState } from "react";
import DefaultLayout from "../components/default Layout/DefaultLayout";
import { Col, Row, Form, Input } from "antd";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/actions/postActions";
const Addpost = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const handleFileSubmit = (e) => {
    //target the file
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
  };

  const addpost = (values) => {
    //assign image value to image
    values.image = image;
    dispatch(addPost(values));
  };

  const { TextArea } = Input;
  return (
    <>
      <DefaultLayout>
        <Row justify="center">
          <Col lg={12}>
            <h3 className="textCenter">Add New Post</h3>
            <Form className="bs1 p-3 mt-5" layout="vertical" onFinish={addpost}>
              <Form.Item
                name="description"
                label="description"
                rules={[{ required: true }]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item
                name="image"
                label="image"
                rules={[{ required: true }]}
              >
                <Input type="file" onChange={handleFileSubmit} />
              </Form.Item>
              {image !== "" && (
                <img src={image} height="200" width="200" alt="" />
              )}
              <br />
              <Button
                color="primary"
                variant="contained"
                type="primary"
                htmlType="submit"
                className="mt-1"
              >
                Post <CloudUploadIcon />
              </Button>
            </Form>
          </Col>
        </Row>
      </DefaultLayout>
    </>
  );
};

export default Addpost;
