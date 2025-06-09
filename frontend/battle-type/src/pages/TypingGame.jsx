import Logo from "../components/Logo.jsx";
import Info from "../components/Info.jsx";
import WordBox from "../components/WordBox.jsx";
import "../styles/style.css";
import { GameContextProvider } from "../context/GameContext.jsx";
import { NewGameButton } from "../components/NewGameButton.jsx";
import Leaderboard from "../components/Leaderboard.jsx";
import Navbar from "../components/Navbar.jsx";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

function TypingGame() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <GameContextProvider>
      <div className="typing-game-body typing-game-theme">
        <div className="main-container1">
          {/* <Navbar/> */}
          <Link to="/" className="home-button">
            Home
          </Link>
          <div className="game-container1">
            <div className="game1">
              <Logo />
              <div className="flex-container1">
                <Info />
                <NewGameButton />
              </div>
              <WordBox />
            </div>
            <Leaderboard />
          </div>
        </div>
      </div>
    </GameContextProvider>
  );
}

export default TypingGame;