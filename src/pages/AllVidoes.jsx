import { useState, useEffect } from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import overlay from "../assets/images/overlay.png";
import API from "../api";
import SearchBar from "../components/SearchBar";

const AllVideo = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/auth/user/getAllVideos");
        setVideos(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 poppins-regular">
      <Header />
      <main className="px-20">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl/7 poppins-bold text-[#333] sm:truncate sm:text-3xl sm:tracking-tight">
            All Uploaded Videos
          </h2>
          <SearchBar />
        </div>
        <sub>Total {videos.length} Videos.</sub>

        <section className="space-y-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                doctorName=""
                hospitalName=""
                city=""
                videoFile={video.video.replace('/var/www/back', '')}
              />
            ))}

          </div>
        </section>
      </main>
    </div>
  );
};

export default AllVideo;
