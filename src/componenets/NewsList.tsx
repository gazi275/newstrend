// NewsList.tsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import { Pagination } from "antd";
import { AppDispatch } from "../redux/store";
import { fetchNews } from "../redux/features/newsSlice";
import NewsCard from "./NewsCards";

const NewsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, status, error } = useSelector((state: ReturnType<typeof import('../redux/store').default.getState>) => state.news);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews());
    }
  }, [dispatch, status]);

  const paginatedNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedNews.map((newsItem, index) => (
          <NewsCard key={index} {...newsItem} />
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={100}
        pageSize={itemsPerPage}
        onChange={(page) => setCurrentPage(page)}
        className="mt-6"
      />
    </div>
  );
};

export default NewsList;