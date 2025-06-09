import axios from "axios";
import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";


export function Leaderboard() {
  const { gameFinished } = useGameContext();
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    async function fetchAndSetRankings() {
      try {
        // Get all scores
        const URL = import.meta.env.VITE_API_BASE_URL
        console.log(URL)
        const response = await axios.get(`${URL}/api/score`);
        const dataArray = response.data.data;
      console.log(response)
        // Create a map to store highest score for each user
        const userHighestScores = new Map();
        
        dataArray.forEach(item => {
          if (!userHighestScores.has(item.userId) || userHighestScores.get(item.userId)[1] < item.value) {
            userHighestScores.set(item.userId, [item.userId, item.value]);
          }
        });

        // Convert map to array and sort by score
        const rankingArray = Array.from(userHighestScores.values());
        rankingArray.sort((a, b) => b[1] - a[1]);
        const topTenRankings = rankingArray.slice(0, 10);
        setRankings(topTenRankings);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.error("An unexpected error occurred", error);
        }
      }
    }

    fetchAndSetRankings();
  }, [gameFinished]);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => (
            <tr key={index}>
              <td>{ranking[0]}</td>
              <td>{ranking[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;