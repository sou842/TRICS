"use client";

import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { LayoutDashboard, Building2, Users, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: Building2 },
    { label: "Supervisors", href: "/admin/supervisors", icon: Users },
    { label: "Portal Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <PortalSidebar role="admin" items={menuItems} />
      <main className="lg:pl-64">
        <div className="container mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
