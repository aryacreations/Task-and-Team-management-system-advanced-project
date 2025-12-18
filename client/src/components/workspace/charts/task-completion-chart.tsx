import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskCompletionChartProps {
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
}

export function TaskCompletionChart({
    totalTasks,
    completedTasks,
    overdueTasks,
}: TaskCompletionChartProps) {
    const inProgressTasks = totalTasks - completedTasks - overdueTasks;

    const data = [
        {
            name: "Tasks",
            Completed: completedTasks,
            "In Progress": inProgressTasks > 0 ? inProgressTasks : 0,
            Overdue: overdueTasks,
        },
    ];

    if (totalTasks === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-base md:text-lg">Task Completion Status</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[250px] md:h-[300px]">
                    <p className="text-sm text-muted-foreground">No tasks data available</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base md:text-lg">Task Completion Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
                <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="name"
                            stroke="hsl(var(--foreground))"
                            fontSize={12}
                        />
                        <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                fontSize: "12px",
                            }}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px" }} iconSize={12} />
                        <Bar dataKey="Completed" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="In Progress" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="Overdue" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
