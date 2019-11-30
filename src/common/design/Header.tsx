import React from "react";
import "./Header.css";

interface Props {
  children: React.ReactNode;
}

export const Header = ({ children }: Props): JSX.Element => (
  <div className="Header">{children}</div>
);
