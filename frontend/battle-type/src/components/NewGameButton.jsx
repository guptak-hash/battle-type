import { useGameContext } from "../context/GameContext";

export function NewGameButton() {
  const { fetchWordsAndInitialize } = useGameContext();

  return <button className="typing-game-button" onClick={fetchWordsAndInitialize}>New Game</button>;
}