import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) => {
  return [
    "block py-2 text-sm font-medium transition-colors",
    isActive
      ? "text-pink-600"
      : "text-gray-700 hover:text-pink-600",
  ].join(" ");
};

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-pink-200 px-4 lg:px-6 py-3 border-b shadow-sm">
      <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
        <NavLink to="/tasks" className="flex items-center">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-pink-500">
            Task Planner
          </span>
        </NavLink>

        <div className="flex items-center w-auto">
          <ul className="flex flex-row items-center font-medium space-x-8">
            <li>
              <NavLink to="/tasks" className={navLinkClass}>
                Tasks
              </NavLink>
            </li>

            <li>
              <a
                href="/tasks"
                className="inline-flex items-center justify-end text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:ring-pink-200 font-medium rounded-xl text-sm px-5 py-2 focus:outline-none shadow-sm"
              >
                Log in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;