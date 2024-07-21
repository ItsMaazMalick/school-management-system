"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSignIcon,
  GraduationCap,
  GraduationCapIcon,
  Loader2,
  School2,
  User2,
} from "lucide-react";
import { DashboardCard } from "@/components/cards/dashboard-card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Mon", total: 186, fees: 80 },
  { month: "Tue", total: 305, fees: 200 },
  { month: "Wed", total: 237, fees: 120 },
  { month: "Thu", total: 73, fees: 190 },
  { month: "Fri", total: 209, fees: 130 },
  { month: "Sat", total: 214, fees: 140 },
  { month: "Sun", total: 214, fees: 140 },
];
const chartConfig = {
  total: {
    label: "Total Collections",
    color: "hsl(var(--destructive))",
  },
  fees: {
    label: "Fee Collections",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function EarningsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="total"
              type="natural"
              fill="var(--color-total)"
              fillOpacity={0.6}
              stroke="var(--color-total)"
              stackId="a"
            />
            <Area
              dataKey="fees"
              type="natural"
              fill="var(--color-fees)"
              fillOpacity={0.6}
              stroke="var(--color-fees)"
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
