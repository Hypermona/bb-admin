import React, { Component, FunctionComponent } from "react";
import { Button } from "../ui/button";
import AdvancedSearch from "../advancedSearch";

type Props = {
  title: string;
  Action: JSX.Element;
  Search?: JSX.Element;
};

function Header({ title, Action, Search }: Props) {
  return (
    <div className="flex p-5 border-b sticky top-[10px] bg-background">
      <div className="flex-1 text-2xl font-bold mr-5 ">{title}</div>
      <span className="mr-2 ">{Search}</span>
      {Action}
    </div>
  );
}

export default Header;
