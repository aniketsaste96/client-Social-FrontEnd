import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  LikeOrUnlikePost,
  getAllPosts,
  addComment,
  editPost,
} from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Input } from "antd";

import { Modal } from "antd";
const { TextArea } = Input;
const Post = ({ post, postInProfilePage }) => {
  //comments
  const [commentModalVisibility, setCommentModalVisibility] = useState(false);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [comment, setComment] = useState("");
  const { users } = useSelector((state) => state.usersReducer);
  const [description, setDescription] = useState(post.description);
  //like dislike color
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const alreadyLiked = post.likes.find(
    (obj) => obj.user.toString() === currentUser._id
  );

  //reloading after like of dislike
  const { likeOrUnlikeLoading, addCommentLoading } = useSelector(
    (state) => state.alertsReducer
  );
  useEffect(() => {
    //fire  getAllPosts() when anything changes in likeOrUnlikeLoading
    dispatch(getAllPosts());
  }, [likeOrUnlikeLoading, addCommentLoading]);

  const dispatch = useDispatch();

  //modal functionality
  const handleCancel = () => {
    setCommentModalVisibility(false);
  };
  const handleOk = () => {
    dispatch(addComment({ postid: post._id, comment: comment }));
    setCommentModalVisibility(false);
  };
  console.log(post);
  return (
    <div className="bs1 p-2 mb-5 ml-2 mt-2">
      <div className="d-flex align-items-center justify-content-between ">
        {post.user?.profilePicUrl == "" ? (
          <span className="profilepic1">
            {post?.user.username[0].toUpperCase()}
          </span>
        ) : (
          <img src={post.user?.profilePicUrl} alt="" className="profilepic2" />
        )}
        <Link className="pl-2 userText" to="/">
          {post.user?.username.charAt(0).toUpperCase() +
            post.user?.username.slice(1)}
        </Link>
        <div>
          <p> {moment(post?.createdAt).format("MMM DD yyyy")}</p>
        </div>
      </div>

      <img
        src={post?.image}
        alt=""
        className={postInProfilePage ? "postInProfilePage" : "postImage"}
      />
      <p className="mb-1  text-left">{post.description}</p>
      <hr />
      <div className="iconsBelow">
        <Tooltip title="Like" arrow>
          <IconButton aria-label="Like">
            <ThumbUpAltIcon
              className="Icons"
              color={alreadyLiked ? "primary" : ""}
              fontSize="large"
              onClick={() => {
                dispatch(LikeOrUnlikePost({ postid: post._id }));
              }}
            />
            <p>{post?.likes.length}</p>
          </IconButton>
        </Tooltip>

        {post?.user?._id == currentUser?._id && postInProfilePage == true && (
          <div className="d-flex justify-content-between">
            <Tooltip title="Edit" arrow>
              <IconButton aria-label="Edit">
                <EditIcon
                  className="Icons"
                  fontSize="large"
                  color="secondary"
                  onClick={() => {
                    setEditModalVisibility(true);
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <IconButton aria-label="Delete">
                <DeleteIcon className="Icons" fontSize="large" color="error" />
              </IconButton>
            </Tooltip>
          </div>
        )}

        <Tooltip title="Comment" arrow>
          <IconButton aria-label="Comment">
            <CommentIcon
              fontSize="large"
              color="primary"
              onClick={() => {
                setCommentModalVisibility(true);
              }}
            />
            <p>{post?.comments.length}</p>
          </IconButton>
        </Tooltip>
      </div>
      <Modal
        visible={commentModalVisibility}
        title="comments"
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        width={900}
        okText="ADD COMMENT"
      >
        <Row>
          {/* xs={0} not showing on mobile */}
          <Col lg={13} xs={0}>
            <img src={post.image} alt="" className="postImageModal" />
          </Col>
          <Col lg={11} xs={24}>
            <TextArea
              placeholder="add your comment here..."
              className="ml-2"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            {post?.comments.map((comment) => {
              const user = users?.find((obj) => obj._id === comment.user);

              return (
                <div className="d-flex align-items-center mt-2 justify-content-between">
                  <div className="d-flex align-items-center">
                    {user?.profilePicUrl == "" ? (
                      <span className="profilepic1">
                        {user?.username[0].toUpperCase()}
                      </span>
                    ) : (
                      <img
                        src={post.user?.profilePicUrl}
                        alt=""
                        className="profilepic2"
                      />
                    )}
                    <Link style={{ fontSize: 15 }} className="ml-1">
                      {user?.username}
                    </Link>
                    <p>{comment.comment}</p>
                  </div>
                  <div>
                    <i style={{ fontSize: 13 }}>{comment.date}</i>
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
        {/* Wehenever we click on this we are going to make it true */}
      </Modal>

      <Modal
        title="Edit Description"
        closable={false}
        onOk={() => {
          dispatch(editPost({ _id: post._id, description: description }));
        }}
        onCancel={() => {
          setEditModalVisibility(false);
        }}
        okText="Edit"
        visible={editModalVisibility}
      >
        <Input
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};

export default Post;
