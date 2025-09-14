import AppHeader from '@/components/layout/app-header';
import StatsCards from '@/components/dashboard/stats-cards';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SampleTimetable from '@/components/dashboard/sample-timetable';
import FacultyWorkloadChart from '@/components/dashboard/faculty-workload-chart';
import CourseDistributionChart from '@/components/dashboard/course-distribution-chart';
import { SlidersHorizontal, BookCopy, Users } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <AppHeader title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <StatsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-1 lg:col-span-4">
                <FacultyWorkloadChart />
            </div>
            <div className="col-span-1 lg:col-span-3">
                <CourseDistributionChart />
            </div>
        </div>
        <SampleTimetable />
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/dashboard/generate">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Generate New Timetable
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/dashboard/courses">
                <BookCopy className="mr-2 h-4 w-4" />
                Manage Courses
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/dashboard/faculty">
                <Users className="mr-2 h-4 w-4" />
                Manage Faculty
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
