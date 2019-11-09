import React from "react";
import "./Button.css";
import classNames from "classnames";

export const Button = ({
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => <button className={classNames("Button", className)} {...rest} />;
