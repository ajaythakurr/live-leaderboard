function LeaderboardTable({
  players,
}) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-2xl font-bold mb-4">
        Top Players
      </h2>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-2">
              Rank
            </th>

            <th className="text-left p-2">
              Username
            </th>

            <th className="text-left p-2">
              Score
            </th>
          </tr>
        </thead>

        <tbody>
          {players.map(
            (player) => (
              <tr
                key={
                  player.rank
                }
              >
                <td className="p-2">
                  #{player.rank}
                </td>

                <td className="p-2">
                  {
                    player.username
                  }
                </td>

                <td className="p-2">
                  {player.score}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTable;