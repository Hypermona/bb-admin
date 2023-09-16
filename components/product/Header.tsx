import React from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  action: {
    label: string;
    onClick: () => void;
  };
};

function Header({ title, action }: Props) {
  return (
    <div className="flex p-5 border-b sticky top-[10px] bg-background">
      <div className="flex-1 text-2xl font-bold">{title}</div>
      <Button onClick={action.onClick}>{action.label}</Button>
    </div>
  );
}

export default Header;
