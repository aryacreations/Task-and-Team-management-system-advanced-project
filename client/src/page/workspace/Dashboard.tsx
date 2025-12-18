import { Plus, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceAnalyticsQueryFn } from "@/lib/api";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { exportToExcel } from "@/lib/excel-export";

const WorkspaceDashboard = () => {
  const { onOpen } = useCreateProjectDialog();
  const workspaceId = useWorkspaceId();

  const { data } = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: () => getWorkspaceAnalyticsQueryFn(workspaceId),
    staleTime: 0,
    enabled: !!workspaceId,
  });

  const handleExportToExcel = () => {
    if (data?.analytics) {
      exportToExcel(data.analytics, "TeamSync Workspace");
    }
  };

  return (
    <main className="flex flex-1 flex-col py-3 md:py-4 md:pt-3">
      {/* Mobile-optimized header */}
      <div className="flex flex-col gap-4 mb-4 md:mb-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            Workspace Overview
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Here&apos;s an overview for this workspace!
          </p>
        </div>

        {/* Mobile: Stack buttons, Desktop: Row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            onClick={handleExportToExcel}
            variant="outline"
            disabled={!data?.analytics}
            className="w-full sm:w-auto text-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export to Excel</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button onClick={onOpen} className="w-full sm:w-auto text-sm">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>
      <WorkspaceAnalytics />
      <div className="mt-4 md:mt-6">
        <Tabs defaultValue="projects" className="w-full border rounded-lg p-2">
          {/* Mobile: Scrollable tabs, Desktop: Normal */}
          <TabsList className="w-full justify-start border-0 bg-secondary/50 dark:bg-secondary px-1 h-auto overflow-x-auto flex-nowrap">
            <TabsTrigger className="py-2 px-3 text-xs sm:text-sm whitespace-nowrap" value="projects">
              Recent Projects
            </TabsTrigger>
            <TabsTrigger className="py-2 px-3 text-xs sm:text-sm whitespace-nowrap" value="tasks">
              Recent Tasks
            </TabsTrigger>
            <TabsTrigger className="py-2 px-3 text-xs sm:text-sm whitespace-nowrap" value="members">
              Recent Members
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <RecentProjects />
          </TabsContent>
          <TabsContent value="tasks">
            <RecentTasks />
          </TabsContent>
          <TabsContent value="members">
            <RecentMembers />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default WorkspaceDashboard;
