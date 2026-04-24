"use client";

import { Settings, Shield, Bell, Database, Globe, Key } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const settingsSections = [
    {
      title: "Security & Authentication",
      icon: Shield,
      description: "Manage system access, password policies, and security protocols.",
      options: ["Two-Factor Authentication", "Password Expiry", "IP Whitelisting"]
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Configure email alerts for project delays, tender deadlines, and safety audits.",
      options: ["Email Alerts", "Push Notifications", "Weekly Summaries"]
    },
    {
      title: "Data Management",
      icon: Database,
      description: "Database backups, project archiving, and data export settings.",
      options: ["Automated Backups", "Export Logs", "Audit Trails"]
    },
    {
      title: "API & Integrations",
      icon: Globe,
      description: "Manage connections with government portals and internal ERP systems.",
      options: ["Webhook Config", "API Keys", "External Sync"]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Portal Settings</h1>
        <p className="text-ink-soft">System configuration and security management.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="rounded-[28px] border border-border bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-xl bg-secondary text-primary flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-ink">{section.title}</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed mb-8">{section.description}</p>
              
              <div className="space-y-4">
                {section.options.map(option => (
                  <div key={option} className="flex items-center justify-between rounded-xl bg-surface px-6 py-4 border border-border/50">
                    <span className="text-sm font-bold text-ink">{option}</span>
                    <button className="text-xs font-bold text-primary hover:underline">Configure</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[28px] bg-navy p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Maintenance Mode</h3>
          <p className="text-white/60 text-sm">Schedule system maintenance and portal downtime.</p>
        </div>
        <button className="rounded-xl bg-white px-8 py-4 text-sm font-bold text-navy hover:bg-white/90 transition-all">
          Enable Maintenance Mode
        </button>
      </div>
    </div>
  );
}
