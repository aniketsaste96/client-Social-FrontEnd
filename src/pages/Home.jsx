import React from "react";
import DefaultLayout from "../components/default Layout/DefaultLayout";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import Post from "../components/default Layout/Post";
//by using useSelector we can access all reducers
const Home = () => {
  const { users } = useSelector((state) => state.usersReducer);
  const { posts } = useSelector((state) => state.postsReducer);
  return (
    <>
      <DefaultLayout>
        <Row justify="center">
          <Col md={12} sx={24}>
            {posts.map((post) => {
              return <Post post={post} />;
            })}
          </Col>
        </Row>
      </DefaultLayout>
    </>
  );
};

export default Home;
