import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

const NewsDetails = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const decodedNewsId = decodeURIComponent(newsId || "");

  const localNews = useSelector((state: RootState) => state.news.news);
  const internationalNews = useSelector((state: RootState) => state.news.internationalNews);

  const [newsItem, setNewsItem] = useState(() =>
    [...localNews, ...internationalNews].find((item) => item.news_id === decodedNewsId)
  );

  useEffect(() => {
    if (!newsItem) {
      const allNews = [...localNews, ...internationalNews];
      const found = allNews.find((item) => item.news_id === decodedNewsId);
      if (found) setNewsItem(found);
    }
  }, [decodedNewsId, newsItem, localNews, internationalNews]);

  if (!newsItem) {
    return <div className="text-center text-red-500 mt-10">News not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-600 underline hover:text-gray-800"
      >
        ← Back to News List
      </button>

      {/* News Image */}
      <img
        src={
          newsItem.image_url ||
          "https://media.istockphoto.com/id/1693840855/vector/blank-newspaper-front-page-template.jpg"
        }
        alt={newsItem.title}
        className="w-full h-80 object-cover rounded-lg"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mt-4">{newsItem.title}</h1>

      {/* Description or Content */}
      <p className="text-gray-700 mt-4 text-lg leading-relaxed whitespace-pre-line">
        {newsItem.content || newsItem.description}
      </p>

      {/* Comments */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Comments:</h3>
      {newsItem.comments.length > 0 ? (
        newsItem.comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mb-2">
            <span className="font-semibold text-blue-600">{comment.name}:</span>{" "}
            {comment.comment}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      {/* Read full news (external link) */}
      <a
  href={newsItem.link}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-block text-blue-600 underline text-lg font-medium"
      >
        🔗 Read Full News
      </a>
    </div>
  );
};

export default NewsDetails;
