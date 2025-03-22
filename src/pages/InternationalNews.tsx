
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchInternationalNews } from "../redux/features/newsSlice";
import { Spin, Alert, Pagination } from "antd";
import NewsCard from "../componenets/NewsCards";


const InternationalNews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { internationalNews, internationalStatus, internationalError } = useSelector(
    (state: RootState) => state.news
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchInternationalNews()); // ✅ API Call to Fetch International News
  }, [dispatch]);

  // ✅ Pagination Logic
  const indexOfLastNews = currentPage * pageSize;
  const indexOfFirstNews = indexOfLastNews - pageSize;
  const currentInternationalNews = internationalNews.slice(indexOfFirstNews, indexOfLastNews);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">International News</h2>

      {internationalStatus === "loading" && internationalNews.length === 0 ? (
        <Spin size="large" className="flex justify-center mt-10" />
      ) : internationalStatus === "failed" ? (
        <Alert message="Error" description={internationalError} type="error" showIcon />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentInternationalNews.map((item) => (
            <NewsCard key={item.news_id} {...item} type="international" />
          ))}
        </div>
      )}

      {/* ✅ Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={internationalNews.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default InternationalNews;
