'use client';

import { Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { courseDistributionData } from '@/lib/placeholder-data';

const chartConfig = {
  count: {
    label: 'Courses',
  },
  Major: {
    label: 'Major',
    color: 'hsl(var(--chart-1))',
  },
  Minor: {
    label: 'Minor',
    color: 'hsl(var(--chart-2))',
  },
  'Skill-Based': {
    label: 'Skill-Based',
    color: 'hsl(var(--chart-3))',
  },
  Ability: {
    label: 'Ability Enhancement',
    color: 'hsl(var(--chart-4))',
  },
  'Value-Added': {
    label: 'Value-Added',
    color: 'hsl(var(--chart-5))',
  },
};

const CourseDistributionChart = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Course Distribution</CardTitle>
        <CardDescription>Breakdown of courses by NEP 2020 category.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="type" hideLabel />} />
            <Pie data={courseDistributionData} dataKey="count" nameKey="type" innerRadius={60}>
              {courseDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
             <ChartLegend content={<ChartLegendContent nameKey="type" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CourseDistributionChart;
