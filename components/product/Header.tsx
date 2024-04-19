import React from "react";

type Props = {
  title: string;
  Action: JSX.Element;
  Search?: JSX.Element;
};

function Header({ title, Action, Search }: Readonly<Props>) {
  return (
    <div className="flex p-5 border-b sticky top-[10px] bg-background z-10">
      <div className="flex-1 text-2xl font-bold mr-5 ">{title}</div>
      <div className="mr-2 ">{Search}</div>
      <div className="flex">{Action}</div>
    </div>
  );
}

export default Header;
