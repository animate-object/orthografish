import React from "react";
import "./Modal.css";

interface Props {
  title: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  visible: boolean;
}
export const Modal = ({ children, visible, title, actions }: Props) =>
  visible ? (
    <div className="Modal">
      <div className="Title">{title}</div>
      <div className="Content">{children}</div>
      <div className="Actions">{actions}</div>
    </div>
  ) : (
    <React.Fragment />
  );
