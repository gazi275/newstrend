import { useState } from "react";
import { Card, Button, Input, Avatar, Tooltip } from "antd";
import {
  LikeOutlined,
  HeartOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Picker from "@emoji-mart/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReaction, addComment } from "../redux/features/newsSlice"; // ✅ FIXED IMPORT
import { RootState } from "../redux/store";

interface NewsCardProps {
  news_id: string;
  image_url: string;
  title: string;
  description?: string;
}

const reactions = [
  { name: "Like", icon: <LikeOutlined />, emoji: "👍" },
  { name: "Love", icon: <HeartOutlined />, emoji: "❤️" },
  { name: "Haha", icon: <SmileOutlined />, emoji: "😂" },
  { name: "Wow", icon: <MehOutlined />, emoji: "😮" },
  { name: "Sad", icon: <FrownOutlined />, emoji: "😢" },
];

const NewsCard = ({ news_id, image_url, title, description }: NewsCardProps) => {
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  const [showCommentPicker, setShowCommentPicker] = useState(false);
  const [showReactPicker, setShowReactPicker] = useState(false);

  const newsItem = useSelector((state: RootState) =>
    state.news.news.find((item) => item.news_id === news_id)
  );
  const comments = newsItem?.comments || [];
  const userReaction = newsItem?.reaction || null;

  const handleComment = () => {
    if (commentInput.trim() !== "") {
      dispatch(addComment({ newsId: news_id, comment: commentInput }));
      setCommentInput("");
    }
  };

  const handleReaction = (reaction: string) => {
    dispatch(addReaction({ newsId: news_id, reaction }));
    setShowReactPicker(false);
  };

  return (
    <Card hoverable className="shadow-lg rounded-xl">
      {/* ✅ Wrap Only Image & Title in <Link> */}
      <Link to={`/news/${news_id}`} className="block">
        <img alt={title} src={image_url} className="h-60 w-full object-cover rounded-t-xl" />
      </Link>

      <div className="flex items-center gap-3 mb-3">
        <Avatar size="large" icon={<UserOutlined />} />
        <div>
          {/* ✅ Wrap Title in <Link> */}
          <Link to={`/news/${news_id}`} className="text-lg font-semibold hover:underline">
            {title}
          </Link>
          <p className="text-gray-500 text-sm">Published Today</p>
        </div>
      </div>

      <p className="text-gray-600">{description?.slice(0, 100)}...</p>

      {/* ✅ Reaction & Comment Buttons */}
      <div className="flex justify-between items-center mt-4">
        {/* Reaction Button */}
        <div className="relative">
          <Tooltip title="React">
            <Button onClick={() => setShowReactPicker(!showReactPicker)}>
              {userReaction ? userReaction : <LikeOutlined />}
            </Button>
          </Tooltip>
          {showReactPicker && (
            <div className="absolute bg-white shadow-lg rounded-md p-2 flex gap-2">
              {reactions.map((react) => (
                <Button key={react.name} onClick={() => handleReaction(react.emoji)}>
                  {react.emoji}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Comment Button */}
        <Tooltip title="Comment">
          <Button icon={<MessageOutlined />}>{comments.length}</Button>
        </Tooltip>
      </div>

      {/* ✅ Comment Section */}
      <div className="mt-4">
        <Input.TextArea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a comment..."
          autoSize={{ minRows: 2, maxRows: 4 }}
        />
        <Button onClick={() => setShowCommentPicker(!showCommentPicker)}>😀</Button>
        {showCommentPicker && (
          <Picker onEmojiSelect={(e: { native: string }) => setCommentInput(commentInput + e.native)} />
        )}
        <Button type="primary" className="mt-2 w-full" onClick={handleComment}>
          Add Comment
        </Button>
      </div>

      {comments.slice(-3).map((comment, index) => (
        <p key={index} className="text-gray-800 text-sm mt-1">{comment}</p>
      ))}
    </Card>
  );
};

export default NewsCard;
