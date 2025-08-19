import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Grid,
} from "@mui/material";

/**
 * Unbeatable Tic-Tac-Toe AI using Minimax with Alpha-Beta Pruning.
 * Human = 'X', AI = 'O'. You can switch who starts.
 */

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const emptyBoard = Array(9).fill("");

function getWinner(board) {
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
}
function isFull(board) {
  return board.every((c) => c !== "");
}

function scoreBoard(board, ai, human, depth) {
  const w = getWinner(board);
  if (w === ai) return 10 - depth;
  if (w === human) return depth - 10;
  return 0;
}

function minimax(board, ai, human, isMax, alpha, beta, depth = 0) {
  const winner = getWinner(board);
  if (winner || isFull(board))
    return { score: scoreBoard(board, ai, human, depth) };

  if (isMax) {
    let best = { score: -Infinity, idx: -1 };
    for (let i = 0; i < 9; i++) {
      if (board[i] !== "") continue;
      board[i] = ai;
      const res = minimax(board, ai, human, false, alpha, beta, depth + 1);
      board[i] = "";
      if (res.score > best.score) best = { score: res.score, idx: i };
      alpha = Math.max(alpha, best.score);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = { score: Infinity, idx: -1 };
    for (let i = 0; i < 9; i++) {
      if (board[i] !== "") continue;
      board[i] = human;
      const res = minimax(board, ai, human, true, alpha, beta, depth + 1);
      board[i] = "";
      if (res.score < best.score) best = { score: res.score, idx: i };
      beta = Math.min(beta, best.score);
      if (beta <= alpha) break;
    }
    return best;
  }
}

export default function TicTacToe() {
  const [board, setBoard] = useState(emptyBoard);
  const [ai, setAi] = useState("O");
  const [human, setHuman] = useState("X");
  const [turn, setTurn] = useState("X");
  const [locked, setLocked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const winner = useMemo(() => getWinner(board), [board]);
  const full = useMemo(() => isFull(board), [board]);
  const gameOver = !!winner || full;

  // AI move
  useEffect(() => {
    if (gameOver) return;
    if (turn === ai) {
      setLocked(true);
      const id = setTimeout(() => {
        const { idx } = minimax(
          [...board],
          ai,
          human,
          true,
          -Infinity,
          Infinity,
          0
        );
        if (idx !== -1) {
          const next = [...board];
          next[idx] = ai;
          setBoard(next);
          setTurn(human);
        }
        setLocked(false);
      }, 400);
      return () => clearTimeout(id);
    }
  }, [turn, ai, human, board, gameOver]);

  // Show dialog when game ends
  useEffect(() => {
    if (winner) {
      setResultMessage(winner === human ? "🎉 You Win!" : "💻 AI Wins!");
      setDialogOpen(true);
    } else if (full) {
      setResultMessage("🤝 It's a Draw!");
      setDialogOpen(true);
    }
  }, [winner, full, human]);

  function handleCellClick(i) {
    if (gameOver || locked) return;
    if (turn !== human) return;
    if (board[i] !== "") return;

    const next = [...board];
    next[i] = human;
    setBoard(next);
    setTurn(ai);
  }

  function reset(starting = "X") {
    setBoard(emptyBoard);
    setTurn(starting);
    setDialogOpen(false);
    if (starting === "X") {
      setHuman("X");
      setAi("O");
    } else {
      setHuman("O");
      setAi("X");
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // minHeight="100vh"
      bgcolor="#0f172a" // deep navy background
      p={2.5}
    >
      <Typography variant="h4" gutterBottom color="white">
        🎮 Tic-Tac-Toe (Unbeatable AI)
      </Typography>

      <Box mb={2}>
        <Button
          variant="contained"
          onClick={() => reset(human)}
          sx={{
            mr: 1,
            bgcolor: "#06b6d4", // cyan
            "&:hover": { bgcolor: "#0891b2" },
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={() => reset("X")}
          sx={{
            mr: 1,
            bgcolor: "#22c55e", // vibrant green
            "&:hover": { bgcolor: "#16a34a" },
          }}
        >
          Start as X
        </Button>
        <Button
          variant="contained"
          onClick={() => reset("O")}
          sx={{
            bgcolor: "#e11d48", // bright pink/red
            "&:hover": { bgcolor: "#be123c" },
          }}
        >
          Start as O
        </Button>
      </Box>

      <Grid
        container
        spacing={1}
        justifyContent="center"
        sx={{ maxWidth: 330 }}
      >
        {board.map((cell, i) => (
          <Grid item xs={4} key={i}>
            <Button
              onClick={() => handleCellClick(i)}
              disabled={!!cell || gameOver || locked}
              sx={{
                width: 100,
                height: 100,
                fontSize: 36,
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)", // soft shadow for game vibe
                bgcolor:
                  cell === "X"
                    ? "rgba(244, 67, 54, 0.85)" // subtle red
                    : cell === "O"
                    ? "rgba(33, 150, 243, 0.85)" // subtle blue
                    : "rgba(255,255,255,0.8)", // empty cell
                color: cell ? "#fff" : "rgba(0,0,0,0.5)", // white for X/O, grey for empty
                border: "none", // remove outline
                transition: "all 0.3s ease",
                "&.Mui-disabled": {
                  color: cell ? "#fff" : "rgba(0,0,0,0.3)", // keep X/O visible even when disabled
                  opacity: 1, // prevent fading
                },
                "&:hover": {
                  bgcolor:
                    cell === "X"
                      ? "rgba(198, 40, 40, 0.95)" // darker red on hover
                      : cell === "O"
                      ? "rgba(21, 101, 192, 0.95)" // darker blue on hover
                      : "rgba(200,200,200,0.6)", // subtle grey for empty hover
                },
              }}
            >
              {cell}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Winner/Draw Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: { bgcolor: "#1e293b", color: "white", minWidth: "400px" },
        }}
      >
        <DialogTitle sx={{ color: "#38bdf8" }}>Game Over</DialogTitle>
        <DialogContent>
          <Typography variant="h6" align="center" sx={{ color: "#facc15" }}>
            {resultMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => reset(human)}
            sx={{
              bgcolor: "#06b6d4",
              color: "white",
              "&:hover": { bgcolor: "#0891b2" },
            }}
          >
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
