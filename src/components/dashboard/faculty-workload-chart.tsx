'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { facultyWorkloadData } from '@/lib/placeholder-data';

const chartConfig = {
  workload: {
    label: 'Workload (hours)',
    color: 'hsl(var(--chart-1))',
  },
};

const FacultyWorkloadChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Faculty Workload</CardTitle>
        <CardDescription>Current teaching hours per faculty member for the semester.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={facultyWorkloadData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="workload" fill="var(--color-workload)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FacultyWorkloadChart;
