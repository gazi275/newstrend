import { useState } from "react";
import { HeartOutlined, HeartFilled, MessageOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { motion } from "framer-motion";

interface NewsCardProps {
  image_url: string;
  title: string;
  description: string;
  content: string;
}

const NewsCard = ({ image_url, title, description }: NewsCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText("");
    }
  };

  return (
    <motion.div className="bg-white shadow-lg rounded-lg overflow-hidden" whileHover={{ scale: 1.02 }}>
      <img src={image_url} alt={title} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button onClick={handleLike} className="text-red-500 text-lg">
              {liked ? <HeartFilled /> : <HeartOutlined />} {likes}
            </button>
            <button onClick={() => setShowComments(!showComments)} className="text-lg">
              <MessageOutlined /> {comments.length}
            </button>
          </div>
          <Button type="link" className="text-blue-600 font-semibold">Read More</Button>
        </div>

        {showComments && (
          <div className="mt-4 border-t pt-2">
            <Input.TextArea 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
              placeholder="Write a comment..." 
              autoSize={{ minRows: 2 }} 
            />
            <Button type="primary" className="mt-2" onClick={handleCommentSubmit}>Post</Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NewsCard;