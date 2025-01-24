import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/Logo.png";
import { Video, Power, Home, Menu, X } from "lucide-react";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiry");
        navigate("/login");
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="flex justify-between items-center px-5 py-4 sm:px-10 md:px-20 poppins-regular">
            {/* Logo */}
            <section>
                <img
                    className="h-10 w-auto sm:h-12 md:h-14"
                    src={logo}
                    alt="Company Logo"
                />
            </section>

            {/* Hamburger Menu for Phones */}
            <button
                className="sm:hidden flex items-center text-gray-700"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Navigation Links */}
            <nav
                className={`absolute top-16 left-0 w-full bg-white shadow-lg sm:static sm:flex sm:space-x-8 sm:shadow-none sm:bg-transparent sm:top-0 sm:w-auto p-5 ${
                    isMenuOpen ? "block" : "hidden"
                }`}
            >
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 px-5 sm:px-0 text-sm poppins-semibold text-[#333]">
                    <Link
                        to="/"
                        className={`flex items-center space-x-2 ${
                            location.pathname === "/" ? "text-pink-500" : ""
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                    </Link>

                    <Link
                        to="/allvideos"
                        className={`flex items-center space-x-2 ${
                            location.pathname === "/allvideos"
                                ? "text-pink-500"
                                : ""
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Video className="h-4 w-4" />
                        <span>All Videos</span>
                    </Link>

                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                        }}
                    >
                        <Power className="h-4 w-4" />
                        <span>Logout</span>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
