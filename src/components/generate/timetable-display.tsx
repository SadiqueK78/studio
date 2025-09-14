import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, AlertCircle } from 'lucide-react';
import { SuggestOptimalScheduleOutput } from '@/ai/flows/suggest-optimal-schedule';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
        {result.conflicts && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Scheduling Conflicts Detected</AlertTitle>
            <AlertDescription>
              <pre className="whitespace-pre-wrap font-sans text-sm">{result.conflicts}</pre>
            </AlertDescription>
          </Alert>
        )}
        {result.recommendations && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Recommendations</AlertTitle>
            <AlertDescription>
              <pre className="whitespace-pre-wrap font-sans text-sm">{result.recommendations}</pre>
            </AlertDescription>
          </Alert>
        )}
        <div className="p-4 border rounded-lg bg-muted/50">
            <pre className="whitespace-pre-wrap font-code text-sm">
                {result.timetable}
            </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimetableDisplay;
