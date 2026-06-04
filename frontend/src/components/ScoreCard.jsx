function ScoreCard({
  user,
  rank,
  handleIncrease,
}) {
  if (!user) return null;

  return (
    <div className="bg-white shadow rounded p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">
        {user.username}
      </h2>

      <p className="mb-1">
        Email: {user.email}
      </p>

      <p className="mb-1">
        Score: {user.score}
      </p>

      <p className="mb-4">
        Rank: #{rank}
      </p>

      <button
        onClick={handleIncrease}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        +10 Score
      </button>
    </div>
  );
}

export default ScoreCard;