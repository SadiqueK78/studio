import { AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DetectAndExplainConflictsOutput } from '@/ai/flows/detect-and-explain-conflicts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type ConflictResultsProps = {
  result: DetectAndExplainConflictsOutput;
};

const ConflictResults = ({ result }: ConflictResultsProps) => {
  if (!result.hasConflicts) {
    return (
      <Card className="border-green-500 bg-green-50">
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <CardTitle className="text-green-800">No Conflicts Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700">The provided timetable appears to be free of scheduling conflicts based on the given policies.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <span>{result.conflictExplanations.length} Conflict(s) Detected</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
            {result.conflictExplanations.map((explanation, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left">{explanation}</AccordionTrigger>
                    <AccordionContent>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><Lightbulb className="h-4 w-4 text-amber-500" /> Potential Resolution</h4>
                            <p className="text-muted-foreground">{result.potentialResolutions[index] || "No specific resolution suggested."}</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ConflictResults;
