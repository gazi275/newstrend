import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

const NewsDetails = () => {
  const { newsId } = useParams();
  const allNews = useSelector((state: RootState) => state.news.news);
  const [newsItem, setNewsItem] = useState(() =>
    allNews.find((item) => item.news_id === newsId)
  );
  console.log(allNews);

  
  useEffect(() => {
    if (!newsItem) {
      const savedNews = JSON.parse(localStorage.getItem("newsData") || "[]");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const foundNews = savedNews.find((item: any) => item.news_id === newsId);
      if (foundNews) setNewsItem(foundNews);
    }
  }, [newsId, newsItem]);

  if (!newsItem) {
    return <div className="text-center text-red-500">News not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* News Image */}
      <img
        src={newsItem.image_url || "https://via.placeholder.com/600"}
        alt={newsItem.title}
        className="w-full h-80 object-cover rounded-lg"
      />
      
    
      <h1 className="text-2xl font-bold mt-4">{newsItem.title}</h1>
      
      {/* Description */}
      <p className="text-gray-600 mt-2">{newsItem.content}</p>
      <h3 className="text-xl font-semibold mt-6">Comments:</h3>
      {newsItem.comments.length > 0 ? (
        newsItem.comments.map((comment, index) => (
          <p key={index} className="bg-gray-100 p-2 rounded mt-2">{comment}</p>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      {/* Read More Button */}
      <button
        onClick={() => window.open(newsItem.link, "_self")}
        className="mt-4 inline-block text-blue-600 underline cursor-pointer"
      >
        Read Full News
      </button>
    </div>
  );
};

export default NewsDetails;
