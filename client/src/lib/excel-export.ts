import * as XLSX from "xlsx";

interface AnalyticsData {
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
}

export function exportToExcel(analytics: AnalyticsData, workspaceName: string = "Workspace") {
    const inProgressTasks = analytics.totalTasks - analytics.completedTasks - analytics.overdueTasks;

    // Create summary data
    const summaryData = [
        ["Metric", "Count"],
        ["Total Tasks", analytics.totalTasks],
        ["Completed Tasks", analytics.completedTasks],
        ["In Progress Tasks", inProgressTasks > 0 ? inProgressTasks : 0],
        ["Overdue Tasks", analytics.overdueTasks],
    ];

    // Create task breakdown data
    const breakdownData = [
        ["Status", "Count", "Percentage"],
        [
            "Completed",
            analytics.completedTasks,
            analytics.totalTasks > 0
                ? `${((analytics.completedTasks / analytics.totalTasks) * 100).toFixed(1)}%`
                : "0%",
        ],
        [
            "In Progress",
            inProgressTasks > 0 ? inProgressTasks : 0,
            analytics.totalTasks > 0
                ? `${((inProgressTasks / analytics.totalTasks) * 100).toFixed(1)}%`
                : "0%",
        ],
        [
            "Overdue",
            analytics.overdueTasks,
            analytics.totalTasks > 0
                ? `${((analytics.overdueTasks / analytics.totalTasks) * 100).toFixed(1)}%`
                : "0%",
        ],
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Create Summary worksheet
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

    // Create Breakdown worksheet
    const wsBreakdown = XLSX.utils.aoa_to_sheet(breakdownData);
    XLSX.utils.book_append_sheet(wb, wsBreakdown, "Task Breakdown");

    // Generate file name with timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const fileName = `${workspaceName}_Analytics_${timestamp}.xlsx`;

    // Write file
    XLSX.writeFile(wb, fileName);
}
