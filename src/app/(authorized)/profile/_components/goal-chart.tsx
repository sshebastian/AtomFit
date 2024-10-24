"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { UpdateWeightDialog } from "../../../../components/shared/update-current-weight/update-current-weight-dialog";

type Props = {
  goal: string;
  start: number;
  finish: number;
  current: number;
};

export function GoalChart({ goal, start, finish, current }: Props) {
  const chartData = [
    {
      goal: goal,
      lost: start < finish ? current - start : start - current,
      fill: "var(--color-goal)",
      start: start,
      finish: finish,
    },
  ];

  const chartConfig = {
    lost: {
      label: "kg lost",
    },
    goal: {
      label: "Lose",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  // const loseGoal = chartData[0].start - chartData[0].finish;
  const loseGoal =
    chartData[0].start > chartData[0].finish
      ? chartData[0].start - chartData[0].finish
      : chartData[0].finish - chartData[0].start;
  return (
    <Card className="flex w-full flex-col">
      <CardHeader className="items-center pb-0 pt-2">
        <CardTitle>Progress</CardTitle>
        <CardDescription className="text-xl">
          {chartData[0].start} - {chartData[0].finish}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(chartData[0].lost / loseGoal) * 360}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="lost" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].lost.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {start > finish ? "kg lost" : "kg gained"}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col justify-center gap-1 pb-2">
        <h4>Current: {current} kg</h4>
        <UpdateWeightDialog />
      </CardFooter>
    </Card>
  );
}
