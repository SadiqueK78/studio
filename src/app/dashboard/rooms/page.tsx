import AppHeader from '@/components/layout/app-header';
import { RoomsTable } from '@/components/data-tables/rooms-table';

export default function RoomsPage() {
  return (
    <>
      <AppHeader title="Manage Rooms & Labs" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <RoomsTable />
      </main>
    </>
  );
}
