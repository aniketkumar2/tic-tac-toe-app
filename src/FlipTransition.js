// src/components/FlipTransition.js
import React from "react";
import { Transition } from "react-transition-group";

const duration = 400;

const defaultStyle = {
  transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
  transform: "rotateY(90deg)",
  opacity: 0,
};

const transitionStyles = {
  entering: { transform: "rotateY(0deg)", opacity: 1 },
  entered: { transform: "rotateY(0deg)", opacity: 1 },
  exiting: { transform: "rotateY(90deg)", opacity: 0 },
  exited: { transform: "rotateY(90deg)", opacity: 0 },
};

export default function FlipTransition({ in: inProp, children }) {
  return (
    <Transition in={inProp} timeout={duration} unmountOnExit>
      {(state) => (
        <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
          {children}
        </div>
      )}
    </Transition>
  );
}
