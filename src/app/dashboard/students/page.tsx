import AppHeader from '@/components/layout/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function StudentsPage() {
  return (
    <>
      <AppHeader title="Manage Students" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <Card>
            <CardHeader>
                <CardTitle>Student Data Management</CardTitle>
                <CardDescription>
                    Import and manage student enrollment data, including elective choices and credits.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-semibold">Import Student Data</h3>
                    <p className="text-muted-foreground mt-2 mb-4">
                        Upload a CSV file with student details to populate the system.
                    </p>
                    <Button>
                        <Upload className="mr-2 h-4 w-4" /> Import from CSV
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">Feature coming soon.</p>
                </div>
            </CardContent>
        </Card>
      </main>
    </>
  );
}
