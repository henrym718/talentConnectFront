import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from './components/dashboard-sidebar';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col w-screen h-screen bg-muted">{children}</main>
    </SidebarProvider>
  );
}
