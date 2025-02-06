import { useState } from 'react';
import { Search, X } from 'lucide-react';
import API from '../api';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    console.log(searchQuery)
    try {
      const response = await API.post("/auth/user/searchVideos", {
        query: searchQuery
      })
    } catch (error) {
      console.error("Search Error", error)
    }

  }

  return (
    <div className={`relative flex items-center w-96 h-10 rounded-md border transition-all duration-200 ${isFocused ? 'border-gray-400 shadow-sm' : 'border-gray-200'
      }`}>
      <div className="flex items-center justify-center bg-gray-200 rounded-l-md w-10 h-full pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search Videos..."
        className={`w-full h-full px-2 bg-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none`}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleClear}
        className={`flex items-center justify-center bg-gray-200 rounded-r-md w-10 h-full hover:text-gray-600`}
      >
        <X className={`w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors ${searchQuery ? "opacity-100" : "opacity-0"
          }`} />
      </button>
    </div>
  );
};

export default SearchBar;