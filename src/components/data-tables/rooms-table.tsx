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
import { Room } from '@/lib/types';
import { mockRooms } from '@/lib/placeholder-data';
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

export function RoomsTable() {
  const [rooms, setRooms] = React.useState<Room[]>(mockRooms);
  const [open, setOpen] = React.useState(false);
  const [newRoom, setNewRoom] = React.useState<Omit<Room, 'id'>>({
    name: '',
    capacity: 0,
    type: 'Classroom',
    equipment: [],
  });

  const handleAddRoom = () => {
    const roomToAdd: Room = {
      id: (rooms.length + 1).toString(),
      ...newRoom,
    };
    setRooms([...rooms, roomToAdd]);
    setOpen(false);
    setNewRoom({
      name: '',
      capacity: 0,
      type: 'Classroom',
      equipment: [],
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Infrastructure Management</CardTitle>
            <CardDescription>
              Manage rooms, labs, and other institutional infrastructure.
            </CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Room/Lab
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Room/Lab</DialogTitle>
                <DialogDescription>
                  Enter the details for the new room or lab. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newRoom.name} onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="capacity" className="text-right">Capacity</Label>
                  <Input id="capacity" type="number" value={newRoom.capacity} onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Select onValueChange={(value) => setNewRoom({ ...newRoom, type: value as Room['type'] })} defaultValue={newRoom.type}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Classroom">Classroom</SelectItem>
                      <SelectItem value="Lab">Lab</SelectItem>
                      <SelectItem value="Lecture Hall">Lecture Hall</SelectItem>
                      <SelectItem value="Seminar Room">Seminar Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="equipment" className="text-right">Equipment</Label>
                  <Input id="equipment" placeholder="Comma-separated" value={newRoom.equipment.join(', ')} onChange={(e) => setNewRoom({ ...newRoom, equipment: e.target.value.split(',').map(s => s.trim()) })} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddRoom}>Save Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell className="font-medium">{room.name}</TableCell>
                <TableCell>{room.type}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {room.equipment.map(item => (
                      <Badge key={item} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </TableCell>
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
