import React from "react";
import "./Actions.css";

interface Props {
  right?: React.ReactNode;
  middle?: React.ReactNode;
  left?: React.ReactNode;
}

export const Actions = ({ right, middle, left }: Props) => (
  <div className="Actions">
    <div className="Right">{right}</div>
    <div className="Middle">{middle}</div>
    <div className="Left">{left}</div>
  </div>
);
