import Banner from "../componenets/Banner";
import NewsList from "../componenets/NewsList";


const HomePage = () => {
  return (
    <div>
      <div className="mb-10">
        <Banner />
      </div>
      <NewsList />
    </div>
  );
};

export default HomePage;
