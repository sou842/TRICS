"use client";

import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { LayoutDashboard, HardHat, Briefcase, FileText, Settings, ShieldCheck } from "lucide-react";

export default function SupervisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { label: "Daily Overview", href: "/supervisor", icon: LayoutDashboard },
    { label: "My Projects", href: "/supervisor/projects", icon: Briefcase },
    { label: "Worker Registry", href: "/supervisor/workers", icon: HardHat },
    { label: "Field Reports", href: "/supervisor/reports", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PortalSidebar role="supervisor" items={menuItems} />
      <main className="lg:pl-64 min-h-screen">
        <div className="max-w-[1600px] mx-auto p-8 md:p-12 lg:p-16">
          {children}
        </div>
      </main>
    </div>
  );
}
