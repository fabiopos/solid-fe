import React from "react";

function NextMatch() {
  return (
    <div className="p-2">
      <div className="px-5 my-5">
        <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
          Next Match
        </h3>
      </div>
      <div className="px-5">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Fluminense vs Phonix</span>
          <span className="text-sm text-slate-300">
            Saturday October 22, 2024, Compensar Stadium
          </span>
          <span className="text-sm text-slate-300">3 days left</span>
        </div>
      </div>
    </div>
  );
}

export default NextMatch;
