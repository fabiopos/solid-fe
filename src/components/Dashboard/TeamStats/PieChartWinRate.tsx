"use client";

import { Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export function PieChartWinRate() {
  const chartData = [
    { browser: "chrome", value: 100, fill: "#c8c8c8" },
    { browser: "safari", value: 200, fill: "#c8f655" },
    { browser: "firefox", value: 187, fill: "#3455FF" },
  ];

  const chartConfig = {
    value: {
      label: "Value",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="max-h-[250px] [&_.recharts-text]:fill-white"
      >
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="var(--color-win)"
            label
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
