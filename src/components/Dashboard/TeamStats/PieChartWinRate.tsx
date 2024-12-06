"use client";

import { LabelList, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FulfilledTeamStats } from "@/features/dashboard/domain/teamStats.schema";

interface PieChartWinRateProps {
  stats: FulfilledTeamStats;
}
export function PieChartWinRate({ stats }: PieChartWinRateProps) {
  const chartData = [
    { result: "won", value: stats.won, fill: "hsl(var(--chart-1))" },
    { result: "drawn", value: stats.drawn, fill: "hsl(var(--chart-2))" },
    { result: "lost", value: stats.lost, fill: "hsl(var(--chart-3))" },
  ];

  const chartConfig = {
    value: {
      label: "Matches",
    },
    won: {
      label: "Won",
      color: "hsl(var(--chart-1))",
    },
    drawn: {
      label: "Drawn",
      color: "hsl(var(--chart-2))",
    },
    lost: {
      label: "Lost",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="max-h-[250px] "
      >
        <PieChart width={300} height={300}>
          <ChartTooltip content={<ChartTooltipContent nameKey="result" />} />
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
          >
            <LabelList
              dataKey="result"
              className="fill-white font-bold"
              stroke="none"              
              fontSize={11}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
            />
          </Pie>
          {/* <ChartLegend
            content={<ChartLegendContent nameKey="browser" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          /> */}
        </PieChart>
      </ChartContainer>
    </div>
  );
}
