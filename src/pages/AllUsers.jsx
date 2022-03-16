import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/default Layout/DefaultLayout";
import { Row, Col, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import CheckIcon from "@material-ui/icons/Check";
import {
  followUser,
  getAllUsers,
  unfollowUser,
} from "../redux/actions/userActions";
const { TextArea } = Input;

const AllUsers = () => {
  const { users } = useSelector((state) => state.usersReducer);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [searchKey, setSearchKey] = useState("");
  const { followLoading, unfollowLoading } = useSelector(
    (state) => state.alertsReducer
  );
  const dispatch = useDispatch();
  // loop through users
  useEffect(() => {
    dispatch(getAllUsers());
  }, [followLoading, unfollowLoading]);

  return (
    <DefaultLayout>
      <div>
        <Row justify="center">
          <Col lg={20}>
            <Input
              placeholder="Search users..."
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row justify="center" gutter={16} className="mt-5">
          {users
            .filter((obj) =>
              obj.username.toLowerCase().includes(searchKey.toLowerCase())
            )
            .map((user) => {
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
                        {user.followers.find(
                          (obj) => obj === currentUser._id
                        ) ? (
                          <div className="d-flex">
                            <Button variant="contained">
                              <CheckIcon />
                              Following
                            </Button>
                            <Button
                              className="ml-2"
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                dispatch(
                                  unfollowUser({
                                    currentuserid: currentUser._id,
                                    receiveruserid: user._id,
                                  })
                                );
                              }}
                            >
                              <PersonAddDisabledIcon />
                              Unfollow
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              dispatch(
                                followUser({
                                  currentuserid: currentUser._id,
                                  receiveruserid: user._id,
                                })
                              );
                            }}
                          >
                            <PersonAddIcon />
                            Follow
                          </Button>
                        )}
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
