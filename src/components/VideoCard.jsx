import { useState } from "react";

const VideoCard = ({ doctorName, hospitalName, city, videoFile }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={handleCardClick}>
                <div className="relative">
                    {/* Video Thumbnail */}
                    <img
                        src={videoFile}
                        alt="Video Thumbnail"
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
                        Play Video
                    </div>
                </div>
                <div className="p-4">
                    <div className="font-semibold text-gray-800">{doctorName}</div>
                    <div className="text-sm text-gray-500">{hospitalName}</div>
                    <div className="text-xs text-gray-400">{city}</div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full">
                        <div className="relative">
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 text-white font-bold bg-gray-800 p-2 rounded-full"
                            >
                                X
                            </button>
                            <video
                                src={videoFile}
                                controls
                                className="w-full rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoCard;
