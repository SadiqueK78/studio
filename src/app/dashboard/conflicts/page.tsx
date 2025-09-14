import AppHeader from '@/components/layout/app-header';
import { ConflictCheckForm } from '@/components/conflicts/conflict-check-form';

export default function ConflictsPage() {
  return (
    <>
      <AppHeader title="Conflict Detection" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <ConflictCheckForm />
      </main>
    </>
  );
}
