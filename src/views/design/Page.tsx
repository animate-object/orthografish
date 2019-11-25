import React from "react";
import "./Page.css";

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export const Page = ({ header, footer, children }: Props) => (
  <div className="Page">
    <div className="PageHeader">{header}</div>
    <div className="PageContent">{children}</div>
    <div className="PageFooter">{footer}</div>
  </div>
);
