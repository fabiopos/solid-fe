function Dashboard() {
  return (
    <div className="bg-slate-800/40 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-primary">
          Solid Manager
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
          Everything you need to manage your team
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-4 lg:grid-rows-4">
          <div className="bg-slate-50">1</div>
          <div className="bg-slate-200">2</div>
          <div className="bg-slate-300">3</div>
          <div className="bg-slate-400">4</div>
          <div className="bg-slate-500 col-span-3 row-span-3">5</div>
          <div className="bg-slate-500">6</div>
          <div className="bg-slate-500 col-start-4 row-span-2">7</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
