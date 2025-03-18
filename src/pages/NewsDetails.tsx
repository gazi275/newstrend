
import { useState } from "react";
import { LikeOutlined, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const NewsDetails = () => {
  const [reactions, setReactions] = useState({ like: 12, love: 8 });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { user: "John Doe", text: "Great article! Very insightful." },
    { user: "Alice", text: "Thanks for sharing this!" },
  ]);

  const handleReaction = (type: "like" | "love") => {
    setReactions({ ...reactions, [type]: reactions[type] + 1 });
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { user: "You", text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {/* News Title */}
      <h1 className="text-3xl font-bold mb-4">
        Breaking News: AI Revolutionizing Journalism
      </h1>

      {/* Author and Date */}
      <div className="text-gray-600 text-sm mb-4">
        <span>By <strong>Jane Smith</strong> | Published on March 18, 2025</span>
      </div>

      {/* Featured Image */}
      <img
        src="https://source.unsplash.com/800x400/?news"
        alt="News"
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* News Content */}
      <p className="text-lg text-gray-700 leading-relaxed">
        Artificial Intelligence (AI) is transforming the landscape of journalism. 
        With advancements in machine learning, newsrooms are now leveraging AI-powered 
        tools for content generation, fact-checking, and audience engagement. While 
        some fear AI might replace journalists, experts argue that it enhances 
        efficiency and accuracy. The future of journalism is a blend of human 
        creativity and AI-driven insights.
      </p>

      {/* Reaction Section */}
      <div className="flex items-center space-x-4 mt-6">
        <Button
          icon={<LikeOutlined />}
          className="hover:text-blue-500"
          onClick={() => handleReaction("like")}
        >
          {reactions.like}
        </Button>
        <Button
          icon={<HeartOutlined />}
          className="hover:text-red-500"
          onClick={() => handleReaction("love")}
        >
          {reactions.love}
        </Button>
        <Button
          icon={<MessageOutlined />}
          className="hover:text-gray-600"
          onClick={() => setShowComments(!showComments)}
        >
          {comments.length} Comments
        </Button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>

          {/* Comment List */}
          <div className="space-y-3">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg">
                <strong className="text-gray-800">{comment.user}</strong>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="mt-4 flex items-center space-x-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full rounded-lg"
            />
            <Button type="primary" onClick={handleCommentSubmit}>
              Post
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetails;
