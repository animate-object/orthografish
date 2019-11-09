import React from "react";
import "./EndGameModal.css";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Effect } from "../types";

interface Props {
  spelled: string[];
  unspelled: string[];
  gaveUp: boolean;
  visible: boolean;
  onNewGame: Effect.Effect0;
}

export const EndGameModal = ({
  unspelled,
  spelled,
  visible,
  onNewGame
}: Props): JSX.Element => (
  <Modal visible={visible}>
    <div className="Words">
      {unspelled.map(word => (
        <div key={word} className="Unspelled">
          {word}
        </div>
      ))}
      {spelled.map(word => (
        <div key={word} className="Spelled">
          {word}
        </div>
      ))}
    </div>

    <Button className="NewGame" onClick={onNewGame}>
      New Game
    </Button>
  </Modal>
);
