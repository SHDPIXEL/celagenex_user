import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import API from "../api";
import SearchBar from "../components/SearchBar";

const AllVideo = () => {
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9; // Number of videos per page

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await API.get(`/auth/user/getAllVideos?page=${page}&limit=${limit}`);
      // console.log("API Response:", response.data); // Debugging
      setVideos(response.data.data);
      setAllVideos(response.data.data);
      
      const total = response.data.pagination?.totalPages || 1; // Default to 1 if undefined
      // console.log("Total Pages:", total);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }
  };
  

  const handleSearch = (searchResults) => {
    if (!searchResults.length) {
      setVideos(allVideos);
    } else {
      setVideos(searchResults);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
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

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-10 mb-5 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1 bg-pink-500 text-white rounded-full ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-md font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-1 bg-pink-500 text-white rounded-full ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default AllVideo;
