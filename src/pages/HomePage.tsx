import Banner from "../componenets/Banner";
import NewsList from "../componenets/NewsList";


const HomePage = () => {
  return (
    <div className="mx-auto">
      <div className="mb-10">
        <Banner />
      </div>
      <div className="px-2 md:px-4 ">
      <NewsList />
      </div>
    </div>
  );
};

export default HomePage;
