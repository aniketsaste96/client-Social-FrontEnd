import React, { useState } from "react";
import DefaultLayout from "../components/default Layout/DefaultLayout";
import { Form, Row, Col, Input, Select } from "antd";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/actions/userActions";
const EditProfile = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicUrl);

  //post edit and upload
  const handleFileSubmit = (e) => {
    //target the file
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // console.log(reader.result);
      setProfilePicUrl(reader.result);
    };
  };

  //edit function
  function editHandler(values) {
    values.profilePicUrl = profilePicUrl;
    values._id = user._id;
    console.log(values);
    dispatch(editUser(values));
  }
  return (
    <>
      <DefaultLayout>
        <Row justify="center" className="mt-5 ">
          <Col lg={10} xs={24} sm={24}>
            <div>
              {/* initialValues={user} to populate  */}
              <Form
                layout="vertical"
                initialValues={user}
                className="bs1 p-2"
                onFinish={editHandler}
              >
                <h3>Edit Profile</h3>
                <Form.Item name="username" label="Username">
                  <Input />
                </Form.Item>
                <Form.Item name="bio" label="Bio">
                  <Input />
                </Form.Item>
                <Form.Item label="Profile Pic" name="profilePicUrl">
                  <div className="d-flex align-items-center">
                    {profilePicUrl === "" ? (
                      <span className="profilepic1 m-1">
                        {user.username[0].toUpperCase()}
                      </span>
                    ) : (
                      <img src={profilePicUrl} alt="" />
                    )}
                    <Input type="file" onChange={handleFileSubmit} />
                  </div>
                </Form.Item>
                <Form.Item name="privateAccount">
                  <Select>
                    <Select.Option value={true}>Private</Select.Option>
                    <Select.Option value={false}>Public</Select.Option>
                  </Select>
                </Form.Item>
                <Button variant="outlined" color="primary" type="submit">
                  Edit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </DefaultLayout>
    </>
  );
};

export default EditProfile;
