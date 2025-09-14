'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sampleTimetable } from '@/lib/sample-timetable-data';
import { TimetableEntry } from '@/lib/types';

export default function SampleTimetable() {
  const [department, setDepartment] = useState('All');
  const [year, setYear] = useState('All');

  const departments = ['All', ...Array.from(new Set(sampleTimetable.map(item => item.department)))];
  const years = ['All', ...Array.from(new Set(sampleTimetable.map(item => item.year.toString())))].sort();

  const filteredTimetable = sampleTimetable.filter(item => {
    const departmentMatch = department === 'All' || item.department === department;
    const yearMatch = year === 'All' || item.year.toString() === year;
    return departmentMatch && yearMatch;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>Sample Timetable</CardTitle>
            <CardDescription>A preview of a generated timetable. Use filters to narrow down the results.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dep => (
                  <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => (
                  <SelectItem key={y} value={y}>{y === 'All' ? 'All Years' : `Year ${y}`}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Faculty</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTimetable.length > 0 ? (
              filteredTimetable.slice(0, 10).map((entry: TimetableEntry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.time}</TableCell>
                  <TableCell>{entry.day}</TableCell>
                  <TableCell>{entry.course}</TableCell>
                  <TableCell>{entry.faculty}</TableCell>
                  <TableCell>{entry.room}</TableCell>
                  <TableCell>{entry.department}</TableCell>
                  <TableCell>{entry.year}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No entries match your filters.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {filteredTimetable.length > 10 && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            Showing first 10 of {filteredTimetable.length} matching entries.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
