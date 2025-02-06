import { useState, useEffect } from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import API from "../api";
import SearchBar from "../components/SearchBar";

const AllVideo = () => {
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]); // Store all videos

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/auth/user/getAllVideos");
        setVideos(response.data.data);
        setAllVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      }
    };

    fetchData();
  }, []);


  const handleSearch = (searchResults) => {
    if (!searchResults.length) {
      setVideos(allVideos);
    } else {
      setVideos(searchResults);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 poppins-regular">
      <Header />
      <main className="px-20">
        <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl/7 poppins-bold text-[#333] sm:truncate sm:text-3xl sm:tracking-tight">
              All Uploaded Videos
            </h2>
            <sub>Total {videos.length} Videos.</sub>
          </div>
          <div className="w-full sm:w-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <section className="space-y-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                doctorName={video.form.name}
                hospitalName={video.form.hospital}
                city={video.form.city}
                videoFile={video.video.replace("/var/www/back", "")}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllVideo;
