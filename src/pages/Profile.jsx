import React, { useState } from "react";
import DefaultLayout from "../components/default Layout/DefaultLayout";
import { Row, Col, Input } from "antd";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import Post from "../components/default Layout/Post";
import Modal from "antd/lib/modal/Modal";
const Profile = ({ match }) => {
  const { id } = useParams();
  const { users } = useSelector((state) => state.usersReducer);
  const { posts } = useSelector((state) => state.postsReducer);
  //find user
  const currentuser = JSON.parse(localStorage.getItem("user"));

  const user = users.find(async (obj) => (await obj?._id) === id);
  const userposts = posts.filter(async (obj) => (await obj.user?._id) === id);

  // const [followersModalDisplay, setFollowersModalDisplay] = useState(false);
  // const [followingsModalDisplay, setFolloingsModalDisplay] = useState(false);

  return (
    <>
      <DefaultLayout>
        {users?.length > 0 && (
          <>
            <Row justify="center">
              <Col lg={12} sm={24} xs={24}>
                <div className="bs1 m2 p-2 text-left">
                  <div className="d-flex align-items-center">
                    {currentuser?.profilePicUrl === "" ? (
                      <span className="profilepic1 m-1">
                        {currentuser?.username[0].toUpperCase()}
                      </span>
                    ) : (
                      <img
                        src={currentuser?.profilePicUrl}
                        alt=""
                        className="profilepic1"
                      />
                    )}
                    <div className="text-left">
                      <p style={{ color: "black" }}>{currentuser?.username}</p>
                      <p style={{ fontSize: 12 }}>
                        {moment(user.createdAt).format("MMM DD yyyy")}
                      </p>
                      <Button variant="contained">
                        {currentuser?._id !== user?._id && (
                          <Link to="/editprofile">Edit profile</Link>
                        )}
                      </Button>
                    </div>
                  </div>
                  <p style={{ fontSize: 16, color: "black" }}>
                    {currentuser.bio === ""
                      ? "Full Stack Developer"
                      : currentuser.bio}
                  </p>
                  <div className="text-left mt-2 followz">
                    <Button
                      variant="contained"
                      color="success"
                      // onClick={() => setFollowersModalDisplay(true)}
                    >
                      Followers:{currentuser?.followers?.length}
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      className="ml-2"
                    >
                      Followings:{currentuser?.following?.length}
                    </Button>
                  </div>
                  <p style={{ fontSize: 16, color: "black" }}>
                    Total Posts:
                    {userposts.length}
                  </p>
                </div>
              </Col>
            </Row>
            {user?.followers?.find((obj) => obj == currentuser._id) ||
            user.privateAccount == false ||
            user._id == currentuser._id ? (
              //conditional rendering
              <Row gutter={16} justify="center">
                {userposts?.map((post) => {
                  return (
                    <Col lg={5} xs={24} sm={24}>
                      <Post post={post} postInProfilePage={true} />
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <p>This Account is Private</p>
            )}
            {/* 
            <Modal
              title="followers"
              visible={followersModalDisplay}
              closable={false}
              onClose={() => setFollowersModalDisplay(false)}
            >
              {user.followers.map((obj) => {
                const followerUser = users.find((o) => o._id === obj);

                return (
                  <div className="d-flex align-items-center bs1 p-1">
                    {followerUser?.profilePicUrl === "" ? (
                      <span className="profilepic1 m-1">
                        {followerUser?.username[0].toUpperCase()}
                      </span>
                    ) : (
                      <img
                        src={followerUser?.profilePicUrl}
                        alt=""
                        className="profilepic1"
                      />
                    )}
                    <div>
                      <Link> {followerUser?.username} </Link>
                      <p>
                        Since:{" "}
                        {moment(followerUser?.createdAt).format("MMM DD yyyy")}{" "}
                      </p>
                    </div>
                  </div>
                );
              })}
            </Modal> */}
          </>
        )}
      </DefaultLayout>
    </>
  );
};

export default Profile;
