import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { motion } from "framer-motion";

function GameRulesDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -90, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <DialogTitle>📜 How to Play</DialogTitle>
        <DialogContent>
          <ul>
            <li>Game is played on a 3x3 grid.</li>
            <li>
              You are <b>X</b>, AI is <b>O</b>.
            </li>
            <li>Players take turns putting marks in empty squares.</li>
            <li>
              The first to get 3 in a row (horizontal, vertical, or diagonal)
              wins.
            </li>
            <li>If all 9 squares are filled and nobody wins → it’s a draw.</li>
          </ul>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}

export default GameRulesDialog;
