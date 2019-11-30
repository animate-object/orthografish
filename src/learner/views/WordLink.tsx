import React from "react";

interface Props {
  children: string;
}

export const WordLink = ({ children }: Props) => (
  <a target="_" href={`https://en.wiktionary.org/wiki/${children}#English`}>
    {children}
  </a>
);
