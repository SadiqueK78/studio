import AppHeader from '@/components/layout/app-header';
import { GenerateForm } from '@/components/generate/generate-form';

export default function GeneratePage() {
  return (
    <>
      <AppHeader title="Generate Timetable" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <GenerateForm />
      </main>
    </>
  );
}
