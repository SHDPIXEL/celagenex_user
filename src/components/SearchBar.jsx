import { useState } from "react";
import { Search, X } from "lucide-react";
import API from "../api";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

const handleSearch = async () => {
  if (!searchQuery.trim()) return;
  try {
    const response = await API.get("/auth/user/searchVideos", {
      params: { q: searchQuery }  // Correct way to pass query parameters
    });
    onSearch(response.data.data);
  } catch (error) {
    console.error("Search Error", error);
    onSearch([]);
  }
};

  return (
    <div
      className={`relative flex items-center w-full max-w-sm md:w-96 h-10 rounded-md border transition-all duration-200 ${
        isFocused ? "border-gray-400 shadow-sm" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-center bg-gray-200 rounded-l-md w-10 h-full pointer-events-none">
        <Search className="w-5 h-5 text-gray-400 md:w-4 md:h-4" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search Videos..."
        className="w-full h-full px-3 bg-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleClear}
        className="flex items-center justify-center bg-gray-200 rounded-r-md w-10 h-full hover:text-gray-600"
      >
        <X
          className={`w-5 h-5 text-gray-400 md:w-4 md:h-4 hover:text-gray-600 transition-colors ${
            searchQuery ? "opacity-100" : "opacity-0"
          }`}
        />
      </button>
    </div>
  );
};

export default SearchBar;
