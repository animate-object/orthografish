import React from "react";
import "./Page.css";

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export const Page = ({ header, footer, children }: Props) => (
  <div className="Page">
    <div className="ActionBar">{header}</div>
    <div className="PageContent">{children}</div>
    <div className="ActionBar">{footer}</div>
  </div>
);
