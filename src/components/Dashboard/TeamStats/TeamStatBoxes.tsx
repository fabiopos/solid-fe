function TeamStatBoxes() {
  return (
    <div className="flex flex-col gap-2 justify-between mt-2">
      <div className="flex justify-between gap-2">
        <div className="font-bold">Won</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="font-bold">Drawn</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="font-bold">Lost</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2 text-sm text-slate-500">
        <div>Seasons</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2 text-sm text-slate-500">
        <div>Competitions</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2 text-sm text-slate-500">
        <div>Matches</div>
        <div>100</div>
      </div>

      <div className="my-1 text-right">
        <small className="text-slate-500">Last updated yesterday</small>
      </div>
    </div>
  );
}

export default TeamStatBoxes;
