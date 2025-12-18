import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskStatusPieChartProps {
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
}

export function TaskStatusPieChart({ totalTasks, completedTasks, overdueTasks }: TaskStatusPieChartProps) {
    const inProgressTasks = totalTasks - completedTasks - overdueTasks;

    const data = [
        { name: "Completed", value: completedTasks, color: "hsl(var(--chart-2))" },
        { name: "In Progress", value: inProgressTasks > 0 ? inProgressTasks : 0, color: "hsl(var(--chart-1))" },
        { name: "Overdue", value: overdueTasks, color: "hsl(var(--chart-3))" },
    ].filter(item => item.value > 0);

    if (totalTasks === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-base md:text-lg">Task Status Overview</CardTitle>
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
                <CardTitle className="text-base md:text-lg">Task Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
                <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                            outerRadius={typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                fontSize: "12px",
                            }}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: "12px" }}
                            iconSize={12}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
