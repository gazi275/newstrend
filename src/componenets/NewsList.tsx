import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchNews, fetchInternationalNews } from "../redux/features/newsSlice";
import { Spin, Alert, Pagination, Tabs } from "antd";
import NewsCard from "./NewsCards";

const NewsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux State
  const { news, status, error, searchQuery } = useSelector((state: RootState) => state.news);
  const { internationalNews, internationalStatus, internationalError } = useSelector(
    (state: RootState) => state.news
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageInt, setCurrentPageInt] = useState(1);
  const [activeTab, setActiveTab] = useState("local");
  const pageSize = 6;

  useEffect(() => {
    if (news.length === 0) dispatch(fetchNews());
    if (internationalNews.length === 0) dispatch(fetchInternationalNews());
  }, [dispatch, news.length, internationalNews.length]);

  // 🔍 Filter news based on search query
  const filteredLocalNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredInternationalNews = internationalNews.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination for filtered news
  const indexOfLastNews = currentPage * pageSize;
  const indexOfFirstNews = indexOfLastNews - pageSize;
  const currentNews = filteredLocalNews.slice(indexOfFirstNews, indexOfLastNews);

  const indexOfLastIntNews = currentPageInt * pageSize;
  const indexOfFirstIntNews = indexOfLastIntNews - pageSize;
  const currentInternationalNews = filteredInternationalNews.slice(indexOfFirstIntNews, indexOfLastIntNews);

  return (
    <div className="p-4">
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
        {/* ✅ Local News Tab */}
        <Tabs.TabPane tab="Local News" key="local">
          {status === "loading" && news.length === 0 ? (
            <Spin size="large" className="flex justify-center mt-10" />
          ) : status === "failed" ? (
            <Alert message="Error" description={error} type="error" showIcon />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentNews.map((item) => (
                <NewsCard key={item.news_id} {...item} type="local" image_url={item.image_url || "default-image-url.jpg"} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredLocalNews.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </Tabs.TabPane>

        {/* ✅ International News Tab */}
        <Tabs.TabPane tab="International News" key="international">
          {internationalNews.length === 0 ? (
            <Spin size="large" className="flex justify-center mt-10" />
          ) : internationalStatus === "failed" ? (
            <Alert message="Error" description={internationalError} type="error" showIcon />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentInternationalNews.map((item) => (
                <NewsCard key={item.news_id} {...item} type="international" image_url={item.image_url || "default-image-url.jpg"} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPageInt}
              pageSize={pageSize - 1}
              total={filteredInternationalNews.length}
              onChange={(page) => setCurrentPageInt(page)}
              showSizeChanger={false}
            />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default NewsList;
