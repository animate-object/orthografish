import React from "react";
import "./Button.css";
import classNames from "classnames";

interface Props {
  buttonType?: "Default" | "Secondary";
}

export const Button = ({
  buttonType,
  className,
  ...rest
}: Props &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => (
  <button
    className={classNames("Button", className, {
      Secondary: buttonType === "Secondary"
    })}
    {...rest}
  />
);
