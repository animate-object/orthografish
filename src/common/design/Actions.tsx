import React from "react";
import "./Actions.css";

interface Props {
  right?: React.ReactNode;
  middle?: React.ReactNode;
  left?: React.ReactNode;
  children?: React.ReactNode;
}

export const Actions = ({ right, middle, left, children }: Props) => (
  <div className="Actions">
    <div className="Left">{left}</div>
    <div className="Middle">{middle}</div>
    <div className="Right">{right}</div>
    {children}
  </div>
);
