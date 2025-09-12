import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '../modules/dashboard/ui/components/dashboard-sidebar';
import { DashboardNavbar } from '../modules/dashboard/ui/components/dashboard-navbar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col w-screen h-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
