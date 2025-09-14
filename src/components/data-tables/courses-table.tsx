'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/lib/types';
import { mockCourses } from '@/lib/placeholder-data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function CoursesTable() {
  const [courses, setCourses] = React.useState<Course[]>(mockCourses);
  const [open, setOpen] = React.useState(false);
  const [newCourse, setNewCourse] = React.useState<Omit<Course, 'id'>>({
    name: '',
    code: '',
    credits: 0,
    type: 'Major',
    semester: 1,
  });

  const getBadgeVariant = (type: Course['type']): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (type) {
      case 'Major': return 'default';
      case 'Minor': return 'secondary';
      case 'Skill-Based': return 'outline';
      default: return 'default';
    }
  };

  const handleAddCourse = () => {
    const courseToAdd: Course = {
        id: (courses.length + 1).toString(),
        ...newCourse
    };
    setCourses([...courses, courseToAdd]);
    setOpen(false);
    setNewCourse({
        name: '',
        code: '',
        credits: 0,
        type: 'Major',
        semester: 1,
    });
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Courses</CardTitle>
            <CardDescription>
              Manage the courses offered by the institution.
            </CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Enter the details for the new course. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newCourse.name} onChange={(e) => setNewCourse({...newCourse, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">Code</Label>
                  <Input id="code" value={newCourse.code} onChange={(e) => setNewCourse({...newCourse, code: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="credits" className="text-right">Credits</Label>
                  <Input id="credits" type="number" value={newCourse.credits} onChange={(e) => setNewCourse({...newCourse, credits: parseInt(e.target.value)})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="type" className="text-right">Type</Label>
                    <Select onValueChange={(value) => setNewCourse({...newCourse, type: value as Course['type']})} defaultValue={newCourse.type}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select course type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Major">Major</SelectItem>
                            <SelectItem value="Minor">Minor</SelectItem>
                            <SelectItem value="Skill-Based">Skill-Based</SelectItem>
                            <SelectItem value="Ability Enhancement">Ability Enhancement</SelectItem>
                            <SelectItem value="Value-Added">Value-Added</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="semester" className="text-right">Semester</Label>
                  <Input id="semester" type="number" value={newCourse.semester} onChange={(e) => setNewCourse({...newCourse, semester: parseInt(e.target.value)})} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddCourse}>Save course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(course.type)}>{course.type}</Badge>
                </TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
