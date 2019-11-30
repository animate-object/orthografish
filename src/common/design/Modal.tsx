import React from "react";
import "./Modal.css";
import { Actions } from "./Actions";
import classNames from "classnames";

export interface ModalProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
  classes?: string[];
  children: React.ReactNode;
  visible: boolean;
}
export const Modal = ({
  children,
  visible,
  title,
  actions,
  classes
}: ModalProps) =>
  visible ? (
    <div className={classNames("Modal", classes)}>
      <div className="Title">{title}</div>
      <div className="Content">{children}</div>
      <div className="Actions">
        <Actions>{actions}</Actions>
      </div>
    </div>
  ) : (
    <React.Fragment />
  );
