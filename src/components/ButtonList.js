import React from "react";
import Button from "./Button";

const ButtonList = () => {
  return (
    <div className="flex py-4 px-1">
      <Button name="All" />
      <Button name="Music" />
      <Button name="Games" />
      <Button name="News" />
      <Button name="Latest" />
      <Button name="Trailer" />
      <Button name="Mixes" />
      <Button name="Podcast" />
      <Button name="Live" />
    </div>
  );
};

export default ButtonList;
