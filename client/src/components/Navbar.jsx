import { Link, useNavigate } from "react-router-dom";
import { CircleUser } from "lucide-react";
import { useState } from "react";

function Navbar({ user, setUser }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header>
      <nav className="container flex items-center justify-between shadow-md p-2 mx-auto navbar">
        <Link to="/">PostPal</Link>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="border-[1px] bg-gray-300 rounded-full login-btn h-10 w-10 overflow-hidden cursor-pointer"
          >
            {user ? (
              <img
                src={user?.user?.image}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <CircleUser className="w-full h-full" />
            )}
          </button>
          {isDropdownOpen && user && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-lg shadow-2xl z-10 login-dropdown">
              <div className="py-1">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          {isDropdownOpen && !user && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-xl z-10 login-dropdown">
              <div className="py-1">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
