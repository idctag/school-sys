"use client";

import { RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "./ui/chart";

type chartDataType = {
  type: string;
  count: number;
  fill: string;
};
const chartConfig = {
  total: {
    label: "Total",
  },
  male: {
    label: "male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function CountChart({
  data,
  male,
  female,
}: {
  data: chartDataType[];
  male: number;
  female: number;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Students</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={data} innerRadius={30} outerRadius={110}>
            <RadialBar dataKey="count" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex w-full justify-between text-sm">
        <div className="flex-row gap-2">
          <div className="flex items-center gap-4 font-bold">
            <div className="rounded-full size-3 bg-blue-800" />
            {male}
          </div>
          Male ({Math.round((male / (male + female)) * 100)})%
        </div>
        <div className="flex-row gap-2">
          <div className="flex items-center gap-4 font-bold">
            <div className="rounded-full size-3 bg-fuchsia-700" />
            {female}
          </div>
          Female ({Math.round((female / (male + female)) * 100)})%
        </div>
      </CardFooter>
    </Card>
  );
}
