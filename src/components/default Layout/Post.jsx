import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import CommentIcon from "@material-ui/icons/Comment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { LikeOrUnlikePost, getAllPosts } from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
const Post = ({ post }) => {
  //like dislike color
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const alreadyLiked = post.likes.find(
    (obj) => obj.user.toString() === currentUser._id
  );
  //reloading after like of dislike
  const { likeOrUnlikeLoading } = useSelector((state) => state.alertsReducer);
  useEffect(() => {
    //fire  getAllPosts() when anything changes in likeOrUnlikeLoading
    dispatch(getAllPosts());
  }, [likeOrUnlikeLoading]);

  const dispatch = useDispatch();
  return (
    <div className="bs1 p-2 mb-5 ">
      <div className="d-flex align-items-center justify-content-between ">
        {post.user.profilePicUrl === "" ? (
          <span className="profilepic1">
            {post.user.username[0].toUpperCase()}
          </span>
        ) : (
          <img src={post.user.profilePicUrl} alt="" />
        )}
        <Link className="pl-2 userText" to="/">
          {post.user.username.charAt(0).toUpperCase() +
            post.user.username.slice(1)}
        </Link>
        <div>
          <p> {moment(post.createdAt).format("MMM DD yyyy")}</p>
        </div>
      </div>

      <img src={post.image} alt="" className="postImage" />
      <p className="mb-1  text-left">{post.description}</p>
      <hr />
      <div className="iconsBelow">
        <Tooltip title="Like" arrow>
          <IconButton aria-label="Like">
            <ThumbUpAltIcon
              className="Icons"
              color={alreadyLiked ? "error" : ""}
              fontSize="large"
              onClick={() => {
                dispatch(LikeOrUnlikePost({ postid: post._id }));
              }}
            />
            <p>{post.likes.length}</p>
          </IconButton>
        </Tooltip>
        <Tooltip title="Comment" arrow>
          <IconButton aria-label="Comment">
            <CommentIcon fontSize="large" color="primary" />
            <p>{post.comments.length}</p>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Post;
