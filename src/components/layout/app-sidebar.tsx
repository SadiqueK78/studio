'use client';

import {
  BookCopy,
  LayoutGrid,
  Puzzle,
  FileText,
  Users,
  School,
  Presentation,
  SlidersHorizontal,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

const AppSidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Puzzle className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold font-headline">ScheduleAI</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/dashboard')}
              tooltip="Dashboard"
            >
              <Link href="/dashboard">
                <LayoutGrid />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/dashboard/generate')}
              tooltip="Generate Timetable"
            >
              <Link href="/dashboard/generate">
                <SlidersHorizontal />
                <span>Generate Timetable</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/dashboard/conflicts')}
              tooltip="Conflict Detection"
            >
              <Link href="/dashboard/conflicts">
                <FileText />
                <span>Conflict Detection</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <Separator className="my-4" />

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/dashboard/courses')}
              tooltip="Courses"
            >
              <Link href="/dashboard/courses">
                <BookCopy />
                <span>Courses</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/dashboard/faculty')}
              tooltip="Faculty"
            >
              <Link href="/dashboard/faculty">
                <Users />
                <span>Faculty</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/dashboard/students')}
              tooltip="Students"
            >
              <Link href="/dashboard/students">
                <School />
                <span>Students</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/dashboard/rooms')}
              tooltip="Rooms"
            >
              <Link href="/dashboard/rooms">
                <Presentation />
                <span>Rooms & Labs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
