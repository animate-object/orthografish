import React from "react";
import "./Button.css";
import classNames from "classnames";

interface Props {
  buttonType?: "Default" | "Secondary" | "Accent";
  size?: "Small" | "Normal";
}

export const Button = ({
  buttonType,
  className,
  size,
  ...rest
}: Props &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => (
  <button
    className={classNames("Button", className, {
      Secondary: buttonType === "Secondary",
      Accent: buttonType === "Accent",
      Small: size === "Small"
    })}
    {...rest}
  />
);
