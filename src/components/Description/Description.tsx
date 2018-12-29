import classNames from "classnames";
import * as React from "react";
import "./Description.css";

export default ({
  children,
  className
}: {
  children: string;
  className: string;
}) => <div className={classNames("Description", className)}>{children}</div>;
