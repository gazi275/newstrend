import { Button } from "antd";
import { motion } from "framer-motion";


const Banner = () => {
  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-center flex flex-col items-center justify-center text-center text-white px-4"
      style={{
        backgroundImage:
          "url('https://c8.alamy.com/comp/2F87BJW/collage-of-uk-newspaper-articles-about-covid-19coronavirus-before-the-reality-really-hit-the-uk-papers-from-31st-january-2020-2F87BJW.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Darker Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>

      {/* Banner Content */}
      <motion.div
        className="relative z-10 p-10 max-w-3xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Highlighted Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Your **Daily Dose of**  
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
            News & Insights
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Uncover the latest breaking news, top headlines, and expert analysis — 
          all in one place, just for you.
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-4 justify-center">
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
            }}
          >
            <Button
              type="primary"
              className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all"
            >
              Explore Now 
            </Button>
          </motion.div>

          
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
