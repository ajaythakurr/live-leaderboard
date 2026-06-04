import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ScoreCard from "../components/ScoreCard";
import LeaderboardTable from "../components/LeaderboardTable";

import { getCurrentUser } from "../api/userApi";

import {
  getLeaderboard,
  getRank,
  increaseScore,
} from "../api/leaderboardApi";

const fetchLeaderboardData = async () => {
  const [
    userResponse,
    rankResponse,
    leaderboardResponse,
  ] = await Promise.all([
    getCurrentUser(),
    getRank(),
    getLeaderboard(),
  ]);

  return {
    user: userResponse.data.user,
    rank: rankResponse.data.rank,
    players: leaderboardResponse.data.leaderboard,
  };
};

function Leaderboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rank, setRank] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const applyLeaderboardData = (data) => {
    setUser(data.user);
    setRank(data.rank);
    setPlayers(data.players);
  };

  useEffect(() => {
    let isMounted = true;

    fetchLeaderboardData()
      .then((data) => {
        if (isMounted) {
          applyLeaderboardData(data);
        }
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate("/login");
          return;
        }

        console.error(error);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleIncrease = async () => {
    try {
      await increaseScore(10);

      const data = await fetchLeaderboardData();
      applyLeaderboardData(data);
    } catch (error) {
      console.error(error);
      alert("Failed to increase score");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-2xl font-bold">
            Loading...
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8">
            🏆 Live Leaderboard
          </h1>

          <ScoreCard
            user={user}
            rank={rank}
            handleIncrease={handleIncrease}
          />

          <LeaderboardTable players={players} />
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
