"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  expense: {
    label: "Expense",
    color: "#E4003A",
  },
  income: {
    label: "Income",
    color: "#399918",
  },
} satisfies ChartConfig;

type ChartData = {
  month: string;
  expense: number;
  income: number;
};

export function IncomeExpenseChart({ chartData }: { chartData: ChartData[] }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-[400px] w-full lg:w-[60%] rounded-md shadow-md p-4 ring-1"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
