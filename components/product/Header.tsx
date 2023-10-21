import React, { Component, FunctionComponent } from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  Action: JSX.Element;
};

function Header({ title, Action }: Props) {
  return (
    <div className="flex p-5 border-b sticky top-[10px] bg-background">
      <div className="flex-1 text-2xl font-bold">{title}</div>
      {Action}
    </div>
  );
}

export default Header;
