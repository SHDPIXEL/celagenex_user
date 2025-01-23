import { Link, useLocation, useNavigate  } from "react-router-dom"; 
import logo from "../assets/images/Logo.png";
import { Video, Power, User, Home } from "lucide-react";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the authentication token and token expiry from localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiry");

        // Add any other logout logic here, such as clearing user data

        // Redirect to the login page
        navigate("/login");
    };

    return (
        <header className="flex justify-between items-center poppins-regular px-20 py-5 ">
            <section>
                <img className="mx-auto h-14 w-auto" src={logo} alt="Company Logo" />
            </section>

            <section className="flex space-x-5 poppins-semibold text-[#333] text-sm">
                {/* <div className="flex items-center space-x-2">
                    <div>
                        <User className="h-4 w-4" />
                    </div>
                    <div>
                        34324
                    </div>
                </div> */}

                <Link
                    to="/" 
                    className={`flex items-center space-x-2 cursor-pointer ${location.pathname === "/" ? "text-pink-500" : ""}`}
                >
                    <div>
                        <Home className="h-4 w-4" />
                    </div>
                    <div>
                        Home
                    </div>
                </Link>

                {/* <Link
                    to="/uservideo" 
                    className={`flex items-center space-x-2 cursor-pointer ${location.pathname === "/uservideo" ? "text-pink-500" : ""}`}
                >
                    <div>
                        <Video className="h-4 w-4" />
                    </div>
                    <div>
                        User Videos
                    </div>
                </Link> */}

                <Link
                    to="/allvideos"  
                    className={`flex items-center space-x-2 cursor-pointer ${location.pathname === "/allvideos" ? "text-pink-500" : ""}`}
                >
                    <div>
                        <Video className="h-4 w-4" />
                    </div>
                    <div>
                        All Videos
                    </div>
                </Link>

                {/* Logout */}
                <div className="flex space-x-2 items-center cursor-pointer" onClick={handleLogout}>
                    <div>
                        <Power className="h-4 w-4" />
                    </div>
                    <div>
                        Logout
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Header;
