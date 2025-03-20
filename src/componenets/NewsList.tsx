import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Spin, Alert } from "antd";
import { fetchNews } from "../redux/features/newsSlice";
import NewsCard from "./NewsCards";

const NewsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, status, error } = useSelector((state: RootState) => state.news);
  const [cachedNews, setCachedNews] = useState<RootState["news"]["news"]>([]);

  useEffect(() => {
    const storedNews = localStorage.getItem("newsData");
    if (storedNews) {
      setCachedNews(JSON.parse(storedNews));
    }

    const fetchNewsData = async () => {
      const result = await dispatch(fetchNews()).unwrap();
      setTimeout(() => {
        setCachedNews(result); // ✅ UI update delay
        localStorage.setItem("newsData", JSON.stringify(result)); // ✅ Cache news
      }, 60000); // 1 min delay
    };

    fetchNewsData(); // ✅ Initial Fetch

    const interval = setInterval(fetchNewsData, 120000); // ✅ Fetch every 2 min

    return () => clearInterval(interval);
  }, [dispatch]);

  if (status === "loading" && cachedNews.length === 0) {
    return <Spin size="large" className="flex justify-center mt-10" />;
  }

  if (status === "failed") {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cachedNews.map((item) => (
        <NewsCard key={item.news_id} {...item} />
      ))}
    </div>
  );
};

export default NewsList;
