import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, AlertCircle } from 'lucide-react';
import { SuggestOptimalScheduleOutput } from '@/ai/flows/suggest-optimal-schedule';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type TimetableDisplayProps = {
  result: SuggestOptimalScheduleOutput;
};

const TimetableDisplay = ({ result }: TimetableDisplayProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
                <CardTitle>Generated Timetable</CardTitle>
                <CardDescription>Review the optimized schedule below. You can make manual adjustments if needed.</CardDescription>
            </div>
            <div className="flex gap-2">
                <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Export as PDF</Button>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export as Excel</Button>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {result.conflicts && result.conflicts.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Scheduling Conflicts Detected</AlertTitle>
            <AlertDescription>
                <ul className="list-disc pl-5">
                    {result.conflicts.map((conflict, index) => <li key={index}>{conflict}</li>)}
                </ul>
            </AlertDescription>
          </Alert>
        )}
        {result.recommendations && result.recommendations.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Recommendations</AlertTitle>
            <AlertDescription>
                 <ul className="list-disc pl-5">
                    {result.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                </ul>
            </AlertDescription>
          </Alert>
        )}
        <div className="p-4 border rounded-lg bg-muted/50">
            {result.timetable && result.timetable.length > 0 ? (
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Day</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Program</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Faculty</TableHead>
                            <TableHead>Room</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.timetable.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>{entry.day}</TableCell>
                                <TableCell>{entry.time}</TableCell>
                                <TableCell>{entry.program}</TableCell>
                                <TableCell>{entry.course}</TableCell>
                                <TableCell>{entry.faculty}</TableCell>
                                <TableCell>{entry.room}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
            ) : (
                <p>No timetable generated. This might be due to insufficient data or unresolvable conflicts.</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimetableDisplay;
