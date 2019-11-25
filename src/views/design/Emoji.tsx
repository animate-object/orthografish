import React from "react";

interface Props {
  content: React.ReactNode;
  label: string;
}
export const Emoji = ({ content, label }: Props): JSX.Element => (
  <span role="img" aria-label={label}>
    {content}
  </span>
);
