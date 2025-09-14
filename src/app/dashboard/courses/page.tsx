import AppHeader from '@/components/layout/app-header';
import { CoursesTable } from '@/components/data-tables/courses-table';

export default function CoursesPage() {
  return (
    <>
      <AppHeader title="Manage Courses" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <CoursesTable />
      </main>
    </>
  );
}
