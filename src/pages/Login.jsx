import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import logo from "../assets/images/Logo.png";
import { Eye, EyeClosed } from "lucide-react"; // Import Eye and EyeClosed icons

const TOKEN_EXPIRY_DURATION = 60 * 60 * 1000; // 1 hour

const Login = () => {
  const [empCode, setEmpCode] = useState(""); // State for emp_code
  const [password, setPassword] = useState(""); // State for password
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Handle token expiry on component load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (token && tokenExpiry) {
      const isExpired = Date.now() > parseInt(tokenExpiry, 10);
      if (isExpired) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiry");
      } else {
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Log payload for debugging
      console.log("Sending payload:", { emp_code: empCode, password });

      // API call
      const response = await API.post("/auth/user/login", {
        emp_code: empCode,
        password,
      });

      console.log("API Response:", response);

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "tokenExpiry",
          (Date.now() + TOKEN_EXPIRY_DURATION).toString()
        );
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Error Details:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] justify-center px-4 py-8 lg:px-6 poppins-regular bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow-sm rounded-lg px-6 py-8 sm:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-xs">
            <img
              className="mx-auto h-14 w-auto"
              src={logo}
              alt="Company Logo"
            />
            <h2 className="mt-4 text-center text-lg font-semibold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xs">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Employee ID */}
              <div>
                <label
                  htmlFor="id"
                  className="block text-xs font-medium text-gray-900"
                >
                  Employee ID
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="id"
                    placeholder="Enter your Employee Id"
                    id="id"
                    autoComplete="off"
                    value={empCode}
                    onChange={(e) => setEmpCode(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-2.5 py-1 text-sm text-gray-900 border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </div>

              {/* Password */}
              {/* Password Field with toggle visibility */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    placeholder="Enter your password"
                    className="block w-full rounded-md bg-white px-2.5 py-1 text-sm text-gray-900 border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* Toggle icon */}
                  <div
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <EyeClosed className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-600 px-2.5 py-1.5 mb-4 text-sm font-medium text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
