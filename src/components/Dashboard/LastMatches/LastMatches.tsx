import React from "react";

function LastMatches() {
  return (
    <div className="p-2">
      <div className="px-5 my-5">
        <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
          Last Matches
        </h3>
      </div>
      <div className="px-5 space-y-5">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Fluminense vs Academia</span>
          <span className="text-sm text-slate-300">
            Saturday October 22, 2024, Compensar Stadium
          </span>
          <span className="text-sm text-slate-300">3 days ago</span>
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-lg">Fluminense vs Elite</span>
          <span className="text-sm text-slate-300">
            Saturday October 22, 2024, Compensar Stadium
          </span>
          <span className="text-sm text-slate-300">8 days ago</span>
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-lg">Bulls vs Fluminense</span>
          <span className="text-sm text-slate-300">
            Saturday October 22, 2024, Compensar Stadium
          </span>
          <span className="text-sm text-slate-300">8 days ago</span>
        </div>
      </div>
    </div>
  );
}

export default LastMatches;
