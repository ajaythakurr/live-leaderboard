import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        Live Leaderboard
      </h1>

      <div className="flex gap-4">
        <Link to="/">Leaderboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;