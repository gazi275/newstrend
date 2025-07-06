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
  CloseOutlined,
} from "@ant-design/icons";
import Picker from "@emoji-mart/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addReaction } from "../redux/features/newsSlice";
import { RootState } from "../redux/store";

interface NewsCardProps {
  news_id: string;
  image_url: string;
  title: string;
  description?: string;
  type?: "local" | "international";
}

const reactions = [
  { name: "Like", icon: <LikeOutlined />, emoji: "👍" },
  { name: "Love", icon: <HeartOutlined />, emoji: "❤️" },
  { name: "Haha", icon: <SmileOutlined />, emoji: "😂" },
  { name: "Wow", icon: <MehOutlined />, emoji: "😮" },
  { name: "Sad", icon: <FrownOutlined />, emoji: "😢" },
];

const NewsCard = ({ news_id, image_url, title, description, type = "local" }: NewsCardProps) => {
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  const [showCommentPicker, setShowCommentPicker] = useState(false);
  const [showReactPicker, setShowReactPicker] = useState(false);

  const newsItem = useSelector((state: RootState) =>
    type === "local"
      ? state.news.news.find((item) => item.news_id === news_id)
      : state.news.internationalNews.find((item) => item.news_id === news_id)
  );

  if (!newsItem) return null;

  const comments = newsItem.comments || [];
  const reactionsData = newsItem.reactions || {};
  const userReaction = newsItem.userReaction || null;

  const handleComment = () => {
    if (commentInput.trim() !== "") {
      dispatch(addComment({ newsId: news_id, comment: commentInput, type }));
      setCommentInput("");
      setShowCommentPicker(false);
    }
  };

  const handleReaction = (reaction: string) => {
    dispatch(addReaction({ newsId: news_id, reaction, type }));
    setShowReactPicker(false);
  };

  const encodedId = encodeURIComponent(news_id);
  const newsLink = type === "international" ? `/international-news/${encodedId}` : `/news/${news_id}`;

  return (
    <Card
      hoverable
      className="relative w-full max-w-xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl"
    >
      <Link to={newsLink}>
        <img
          alt={title}
          src={image_url}
          className="h-48 w-full object-cover rounded-t-2xl"
        />
      </Link>

      <div className="flex items-center gap-4 p-4">
        <Avatar size={48} icon={<UserOutlined />} className="bg-blue-500 text-white" />
        <div className="flex-1">
          <Link to={newsLink} className="text-xl font-bold text-gray-800 hover:text-blue-600">
            {title}
          </Link>
          <p className="text-gray-500 text-sm">
            {type === "local" ? "Published Today" : "International News"}
          </p>
        </div>
      </div>

      <p className="p-4 text-gray-700 text-base leading-relaxed">
        {description?.slice(0, 100)}...
      </p>

      <div className="p-4 flex justify-between items-center border-t border-gray-100">
        <div className="relative">
          <Tooltip title="React" color="#1890ff">
            <Button
              icon={userReaction ? reactions.find((r) => r.emoji === userReaction)?.icon : <LikeOutlined />}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600"
              onClick={() => setShowReactPicker(!showReactPicker)}
            />
          </Tooltip>
          {showReactPicker && (
            <div className="absolute bottom-full left-0 mb-2 bg-white shadow-xl rounded-xl p-2 flex gap-2 border border-gray-200 z-50">
              {reactions.map((react) => (
                <Button
                  key={react.name}
                  onClick={() => handleReaction(react.emoji)}
                  className="bg-gray-50 hover:bg-gray-100"
                >
                  {react.emoji} {reactionsData[react.emoji] || 0}
                </Button>
              ))}
            </div>
          )}
        </div>

        <Tooltip title="Comment" color="#1890ff">
          <Button icon={<MessageOutlined />} className="bg-green-50 hover:bg-green-100 text-green-600">
            {comments.length}
          </Button>
        </Tooltip>
      </div>

      <div className="p-4 bg-gray-50 rounded-b-2xl relative">
        <Input.TextArea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a comment..."
          autoSize={{ minRows: 2, maxRows: 4 }}
        />
        <div className="flex gap-2 mt-2 items-center">
          <Button onClick={() => setShowCommentPicker(!showCommentPicker)}>
            😀
          </Button>
          {showCommentPicker && (
            <div className="absolute mt-2 right-0 bg-white shadow-xl rounded-xl p-2 border border-gray-200 z-50">
              <Button
                icon={<CloseOutlined />}
                className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600"
                onClick={() => setShowCommentPicker(false)}
              />
              <Picker
                onEmojiSelect={(e: { native: string }) => setCommentInput(commentInput + e.native)}
                theme="light"
              />
            </div>
          )}
          <Button
            type="primary"
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleComment}
          >
            Add Comment
          </Button>
        </div>

       {comments.slice(-3).map((item, index) => (
  <p key={index} className="text-gray-800 text-sm mt-2 bg-white p-2 rounded-lg shadow-sm">
    <span className="font-semibold text-blue-600">{item.name}:</span> {item.comment}
  </p>
))}
      </div>
    </Card>
  );
};

export default NewsCard;
