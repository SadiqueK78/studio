import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy, Users, School, Presentation } from "lucide-react";

const StatsCards = () => {
  const stats = [
    { title: "Total Courses", value: "67", icon: <BookCopy className="h-6 w-6 text-muted-foreground" /> },
    { title: "Total Faculty", value: "24", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
    { title: "Enrolled Students", value: "1,250", icon: <School className="h-6 w-6 text-muted-foreground" /> },
    { title: "Available Rooms", value: "32", icon: <Presentation className="h-6 w-6 text-muted-foreground" /> },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
