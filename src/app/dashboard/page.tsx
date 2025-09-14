import AppHeader from '@/components/layout/app-header';
import StatsCards from '@/components/dashboard/stats-cards';
import FacultyWorkloadChart from '@/components/dashboard/faculty-workload-chart';
import CourseDistributionChart from '@/components/dashboard/course-distribution-chart';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <>
      <AppHeader title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <StatsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <FacultyWorkloadChart />
          </div>
          <div className="lg:col-span-3">
            <CourseDistributionChart />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/dashboard/generate">Generate New Timetable</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/dashboard/courses">Manage Courses</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/dashboard/faculty">Manage Faculty</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
