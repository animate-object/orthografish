import React from "react";
import "./Modal.css";

interface Props {
  children: React.ReactNode;
  visible: boolean;
}
export const Modal = ({ children, visible }: Props) =>
  visible ? <div className="Modal">{children}</div> : <React.Fragment />;
