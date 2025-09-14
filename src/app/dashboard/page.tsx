import AppHeader from '@/components/layout/app-header';
import StatsCards from '@/components/dashboard/stats-cards';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SampleTimetable from '@/components/dashboard/sample-timetable';

export default function DashboardPage() {
  return (
    <>
      <AppHeader title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <StatsCards />
        <SampleTimetable />
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
