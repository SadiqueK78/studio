import AppHeader from '@/components/layout/app-header';
import { FacultyTable } from '@/components/data-tables/faculty-table';

export default function FacultyPage() {
  return (
    <>
      <AppHeader title="Manage Faculty" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <FacultyTable />
      </main>
    </>
  );
}
