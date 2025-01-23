import { useState } from "react";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import overlay from "../assets/images/overlay.png";

const UserVideo = () => {
    const [videos, setVideos] = useState([
        {
            doctorName: "Dr. Tushar pathak",
            hospitalName: "City Hospital",
            city: "Vadodara",
            videoFile: overlay,
        },
        {
            doctorName: "Dr. Vansh shan",
            hospitalName: "General Hospital",
            city: "Ahmedabad",
            videoFile: overlay,
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-100 poppins-regular">
            <Header />
            <main className="px-20">
                <h2 className="text-2xl/7 poppins-bold text-[#333] sm:truncate sm:text-3xl sm:tracking-tight">
                    User Videos
                </h2>

                <section className="space-y-8 mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((video, index) => (
                            <VideoCard
                                key={index}
                                doctorName={video.doctorName}
                                hospitalName={video.hospitalName}
                                city={video.city}
                                videoFile={video.videoFile}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserVideo;
