function TeamStatBoxes() {
  return (
    <div className="flex flex-col gap-2 justify-between mt-2">
      <div className="flex justify-between gap-2">
        <div>Seasons</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2">
        <div>Competitions</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2">
        <div>Matches</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2">
        <div>Won</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2">
        <div>Drawn</div>
        <div>100</div>
      </div>

      <div className="flex justify-between gap-2">
        <div>Lost</div>
        <div>100</div>
      </div>

      <div className="my-1 text-right">
        <small className="text-slate-500">Last updated yesterday</small>
      </div>
    </div>
  );
}

export default TeamStatBoxes;
