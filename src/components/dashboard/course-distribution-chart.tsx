'use client';

import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { courseDistributionData } from '@/lib/placeholder-data';

const chartConfig = {
  count: {
    label: 'Courses',
  },
  major: {
    label: 'Major',
    color: 'hsl(var(--chart-1))',
  },
  minor: {
    label: 'Minor',
    color: 'hsl(var(--chart-2))',
  },
  skill: {
    label: 'Skill-Based',
    color: 'hsl(var(--chart-3))',
  },
  ability: {
    label: 'Ability',
    color: 'hsl(var(--chart-4))',
  },
  value: {
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
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
            <Pie 
                data={courseDistributionData} 
                dataKey="count" 
                nameKey="type" 
                innerRadius={60}
                strokeWidth={5}
             />
             <ChartLegend content={<ChartLegendContent nameKey="type" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CourseDistributionChart;
