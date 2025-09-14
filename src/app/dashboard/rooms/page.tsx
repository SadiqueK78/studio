import AppHeader from '@/components/layout/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function RoomsPage() {
  return (
    <>
      <AppHeader title="Manage Rooms & Labs" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
        <Card>
            <CardHeader>
                <CardTitle>Infrastructure Management</CardTitle>
                <CardDescription>
                    Manage rooms, labs, and other institutional infrastructure details like capacity and available equipment.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-semibold">Add and Manage Rooms</h3>
                    <p className="text-muted-foreground mt-2 mb-4">
                        A table for managing rooms and labs will be displayed here.
                    </p>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Room/Lab
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">Feature coming soon.</p>
                </div>
            </CardContent>
        </Card>
      </main>
    </>
  );
}
