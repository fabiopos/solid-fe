"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FulfilledTeamStats } from "@/features/dashboard/domain/teamStats.schema";
import { useMemo } from "react";

interface PieChartWinRateProps {
  stats: FulfilledTeamStats;
}
export function PieChartWinRate({ stats }: PieChartWinRateProps) {
  const chartData = useMemo(
    () => [
      { result: "won", value: stats.won, fill: "hsl(var(--color-win))" },
      { result: "drawn", value: stats.drawn, fill: "hsl(var(--color-draw))" },
      { result: "lost", value: stats.lost, fill: "hsl(var(--chart-3))" },
    ],
    [stats.drawn, stats.lost, stats.won]
  );

  const chartConfig = {
    value: {
      label: "Matches",
    },
    won: {
      label: "Won",
      color: "hsl(var(--color-win))",
    },
    drawn: {
      label: "Drawn",
      color: "hsl(var(--color-draw))",
    },
    lost: {
      label: "Lost",
      color: "hsl(var(--color-lost))",
    },
  } satisfies ChartConfig;

  const totalMatches = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  const performance = useMemo(
    () => (stats.won  / totalMatches) * 100,
    [stats?.won, totalMatches]
  );

  return (
    <div className="">
      <ChartContainer config={chartConfig} className="max-h-[250px]">
        <PieChart width={350} height={200}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="result"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {performance.toFixed(1)}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Performance
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
        {/* <PieChart width={350} height={300}>
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
          </PieChart> */}

        {/* <ChartLegend
            content={<ChartLegendContent nameKey="browser" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          /> */}
      </ChartContainer>
    </div>
  );
}
