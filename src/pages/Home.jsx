import { useState, useEffect } from "react";
import Header from "../components/Header";
import overlay from "../assets/images/overlay.png";
import API from "../api";

const Home = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [formData, setFormData] = useState({
    doctorName: "",
    speciality: "",
    hospitalName: "",
    city: "",
  });
  const [documentFile, setDocumentFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoError, setVideoError] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setVideoError("File size should not exceed 100MB.");
        setVideoUrl(null); // Clear the video URL
        return;
      }

      // Generate a URL for the video file
      const videoUrl = URL.createObjectURL(file);
      const videoElement = document.createElement("video");
      videoElement.src = videoUrl;

      videoElement.onloadedmetadata = () => {
        const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;

        // Validate aspect ratio
        if (aspectRatio < 1.75 || aspectRatio > 1.79) {
          setVideoError("Video should have a 16:9 aspect ratio.");
          setVideoUrl(null); // Clear the video URL
        } else {
          setVideoError(""); // Clear errors
          setVideoFile(file); // Save the file
          setVideoUrl(videoUrl); // Save the video URL
        }
      };
    }
  };

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];
    setDocumentFile(file); // Save the actual file
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSpeciality(value); // Add this line to update the specific state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const data = new FormData();
    data.append("name", formData.doctorName);
    data.append("speciality", formData.speciality);
    data.append("hospital", formData.hospitalName);
    data.append("city", formData.city);

    if (documentFile) data.append("image", documentFile);
    if (videoFile) data.append("video", videoFile);

    try {
      const response = await API.post("/auth/user/formsubmit", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);

      if (response.status === 201) {
        setSuccessMessage(
          "Your data and your video has been successfully submitted. Please wait while we process your video!"
        );
        setFormData({
          doctorName: "",
          speciality: "",
          hospitalName: "",
          city: "",
        });
        setDocumentFile(null);
        setVideoFile(null);
      } else {
        setError("Failed to submit the form. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Speciality = [
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Orthopedic",
  ];

  return (
    <div className="min-h-screen bg-gray-100 poppins-regular">
      <Header />
      <main className="px-4 py-8 lg:px-16 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <section className="bg-white shadow-md rounded-lg p-6 lg:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Doctor Information Form
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Doctor Name */}
              <div>
                <label
                  htmlFor="doctorName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  className="block w-full py-1.5 mt-2 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm border-gray-300 border rounded-lg"
                  placeholder="Enter doctor name"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Speciality */}
              <div>
                <label
                  htmlFor="speciality"
                  className="block text-sm font-medium text-gray-700"
                >
                  Speciality
                </label>
                <select
                  id="speciality"
                  name="speciality"
                  value={selectedSpeciality} // Add value prop to control the selected option
                  className="block w-full py-1.5 mt-2 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm border-gray-300 border rounded-lg "
                  onChange={handleInputChange}
                  required
                >
                  <option value="" >Select Speciality</option> // Add a default
                  "placeholder" option
                  {Speciality.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hospital Name */}
              <div>
                <label
                  htmlFor="hospitalName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hospital Name
                </label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  className="block w-full py-1.5 mt-2 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm border-gray-300 border rounded-lg"
                  placeholder="Enter hospital name"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="block w-full py-1.5 mt-2 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm border-gray-300 border rounded-lg"
                  placeholder="Enter city"
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Upload Document */}
              <div>
                <label
                  htmlFor="document"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Document
                </label>
                <input
                  type="file"
                  id="document"
                  name="document"
                  className="block w-full py-1.5 mt-2 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm border-gray-300 border rounded-lg"
                  accept="images/*,.png,.jpg,.jpeg"
                  onChange={handleDocumentUpload}
                />
              </div>

              {/* Upload Video */}
              <div>
                <label
                  htmlFor="video"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Video
                </label>
                <input
                  type="file"
                  id="video"
                  name="video"
                  className="block w-full py-1.5 mt-2 px-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm border-gray-300 border rounded-lg"
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
                {videoError && (
                  <p className="text-red-500 text-xs mt-2">{videoError}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-pink-600 py-2 px-4 text-sm font-semibold text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </form>
          </section>

          {/* Video Section */}
          <section className="relative bg-white shadow-md rounded-lg p-6 lg:p-8 overflow-hidden">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Video Preview
            </h2>
            <div className="relative">
              {/* Template PNG */}
              <img
                src={overlay}
                alt="Template Overlay"
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-20"
              />

              {/* details */}
              <div className="z-50 absolute text-white bottom-0.5 left-[45%] text-[10px]/2.5">
                <div className="font-bold">
                  Dr {formData.doctorName || "Doctor Name"}
                </div>
                <div className="text-[9px] font-semibold">
                  {formData.speciality || "Speciality"}
                </div>
                <div className="text-[9px] font-semibold">
                  {formData.hospitalName || "Hospital name"}
                </div>
                <div className="text-[9px] font-semibold">
                  {formData.city || "City"}
                </div>
              </div>

              {/* Video Preview */}
              {videoUrl ? (
                <video
                  src={videoUrl} // Use the generated video URL
                  className="w-full shadow-sm relative z-10"
                  autoPlay
                />
              ) : (
                <div className="flex items-center justify-center h-83 border-dashed border-1 border-gray-300 relative z-10">
                  <p className="text-sm text-gray-500 text-center">
                    No video uploaded yet. Upload a video to see the preview
                    here.
                  </p>
                </div>
              )}
            </div>
            <div>
              <ul className="text-xs text-gray-500 mt-5 list-disc">
                <li>Recommended Video settings - MP4 (H.264)</li>
                <li>max duration - 60 seconds</li>
                <li>Aspect ratio 16:9 </li>
                <li>Landscape mode video (Horizontal Layout)</li>
              </ul>
            </div>
            {/* Loader or Success Message */}
            {loading ? (
              <div className="mt-4 flex justify-center">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              successMessage && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
                  <p className="text-sm font-medium">{successMessage}</p>
                </div>
              )
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
