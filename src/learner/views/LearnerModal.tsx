import React from "react";
import { Modal, ModalProps } from "../../common/design";
import "./LearnerModal.css";

export const LearnerModal = (props: Omit<ModalProps, "classes">) => (
  <Modal classes={["LearnerModal"]} {...props} />
);
