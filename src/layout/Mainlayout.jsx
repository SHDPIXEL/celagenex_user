import { Outlet } from "react-router-dom";

const Mainlayout = () => {
    return (
        <div className="min-h-screen flex flex-col poppins-regular">
            <main className="flex-grow bg-red-900 p-4 md:p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Mainlayout;
