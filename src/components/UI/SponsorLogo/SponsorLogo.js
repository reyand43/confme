import React from "react";
import classes from "./SponsorLogo.module.scss";

export const SponsorLogo = (props) => {
  const cls = [classes.SponsorLogo, classes[props.size], classes[props.rounded]];
  return <div className={cls.join(" ")} />;
};