
import { DashboardGuard } from "./dashboardGuard";
import DashboardShell from "./dashboardShell";

export default function Page() {
  return (
    <DashboardGuard>
      <DashboardShell />  
    </DashboardGuard>
  );
}