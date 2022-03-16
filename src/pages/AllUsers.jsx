import React from "react";
import DefaultLayout from "../components/default Layout/DefaultLayout";
import { Row, Col, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button } from "@material-ui/core";
const { TextArea } = Input;
const AllUsers = () => {
  const { users } = useSelector((state) => state.usersReducer);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  // loop through users
  return (
    <DefaultLayout>
      <div>
        <Row justify="center">
          <Col lg={20}>
            <Input />
          </Col>
        </Row>
        <Row justify="center" gutter={16} className="mt-5">
          {users.map((user) => {
            return (
              <>
                {/* show all users available to follow */}
                {currentUser._id !== user._id && (
                  <Col lg={5} xs={24} className="text-left mt-2">
                    <div className="bs1 p-2">
                      {user.profilePicUrl === "" ? (
                        <span className="profilepic1 m-1">
                          {user.username[0].toUpperCase()}
                        </span>
                      ) : (
                        <img src={user.profilePicUrl} alt="" />
                      )}
                      <Link>{user.username}</Link>
                      <p>{moment(user.createdAt).format("MMM DD yyyy")}</p>
                      <Button variant="contained" color="primary">
                        Follow
                      </Button>
                    </div>
                  </Col>
                )}
              </>
            );
          })}
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default AllUsers;
