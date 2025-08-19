import React, { useState } from "react";
import TicTacToe from "./TicTacToe";
import GameRulesDialog from "./GameRulesDialog";
import { Button } from "@mui/material";
import "./App.css";
//
function App() {
  const [openRules, setOpenRules] = useState(false);

  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <h1 style={{ color: "white" }}>Tic-Tac-Toe AI 🎮</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenRules(true)}
        style={{ marginBottom: "40px" }}
      >
        Show Rules
      </Button>

      <TicTacToe />
      <GameRulesDialog open={openRules} onClose={() => setOpenRules(false)} />
    </div>
  );
}

export default App;
