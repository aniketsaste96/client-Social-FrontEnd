import React from "react";
import DefaultLayout from "../components/default Layout/DefaultLayout";
import { Row, Col, Input } from "antd";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import Post from "../components/default Layout/Post";
const Profile = ({ match }) => {
  const { id } = useParams();
  const { users } = useSelector((state) => state.usersReducer);
  const { posts } = useSelector((state) => state.postsReducer);
  //find user
  const user = users.find((obj) => obj._id == id);
  const currentuser = JSON.parse(localStorage.getItem("user"));
  const userposts = posts.filter((obj) => obj.user._id == id);

  console.log(user);

  return (
    <>
      <DefaultLayout>
        {users?.length > 0 && (
          <>
            <Row justify="center">
              <Col lg={12} sm={24} xs={24}>
                <div className="bs1 m2 p-2 text-left">
                  <div className="d-flex align-items-center">
                    {user.profilePicUrl === "" ? (
                      <span className="profilepic1 m-1">
                        {user.username[0].toUpperCase()}
                      </span>
                    ) : (
                      <img
                        src={user.profilePicUrl}
                        alt=""
                        className="profilepic1"
                      />
                    )}
                    <div className="text-left">
                      <p style={{ color: "black" }}>{user.username}</p>
                      <p style={{ fontSize: 12 }}>
                        {moment(user.createdAt).format("MMM DD yyyy")}
                      </p>
                      <Button variant="contained">
                        {currentuser._id === id && (
                          <Link to="/editprofile">Edit profile</Link>
                        )}
                      </Button>
                    </div>
                  </div>
                  <p style={{ fontSize: 16, color: "black" }}>
                    {user.bio === "" ? "Full Stack Developer" : user.bio}
                  </p>
                  <div className="text-left mt-2">
                    <Button variant="contained" color="success">
                      Followers:{user.followers.length}
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      className="ml-2"
                    >
                      Followings:{user.following.length}
                    </Button>
                  </div>
                  <p style={{ fontSize: 16, color: "black" }}>
                    Total Posts:
                    {userposts.length}
                  </p>
                </div>
              </Col>
            </Row>
            {user.followers.find(
              (obj) => obj == currentuser._id || user.privateAccount == false
            ) || user._id == currentuser._id ? (
              //conditional rendering
              <Row>
                {userposts.map((post) => {
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
          </>
        )}
      </DefaultLayout>
    </>
  );
};

export default Profile;
