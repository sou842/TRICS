import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useTheme } from "@/components/ThemeProvider";
import { Check, Moon, Sun, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const curatedColors = [
  { h: 18, s: "95%", l: "52%", name: "Trics Orange", class: "bg-[#f97316]" },
  { h: 43, s: "96%", l: "58%", name: "Golden", class: "bg-[#f5a623] bg-gradient-to-br from-[#f5a623] to-[#ffc107]" },
  { h: 210, s: "100%", l: "50%", name: "Royal Blue", class: "bg-[#0070f3]" },
  { h: 142, s: "70%", l: "45%", name: "Emerald", class: "bg-[#10b981]" },
  { h: 270, s: "70%", l: "60%", name: "Amethyst", class: "bg-[#a855f7]" },
  { h: 0, s: "84%", l: "60%", name: "Ruby Red", class: "bg-[#ef4444]" },
  { h: 234, s: "89%", l: "64%", name: "Indigo", class: "bg-[#6366f1]" },
  { h: 188, s: "86%", l: "53%", name: "Cyber Cyan", class: "bg-[#22d3ee]" },
  { h: 199, s: "89%", l: "48%", name: "Sky Blue", class: "bg-[#0ea5e9]" },
  { h: 322, s: "81%", l: "58%", name: "Rose", class: "bg-[#ec4899]" },
  { h: 154, s: "61%", l: "41%", name: "Forest", class: "bg-[#15803d]" },
  { h: 25, s: "95%", l: "50%", name: "Amber", class: "bg-[#f59e0b]" },
];

const Settings = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const { theme, toggle, primaryColor, setPrimaryColor } = useTheme();

  return (
    <div className={isAdmin ? "" : "min-h-screen bg-background text-foreground"}>
      {!isAdmin && <SiteNav />}
      {!isAdmin ? (
        <section className="px-6 pt-40 pb-20 bg-grid">
          <div className="max-w-7xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">// Preferences</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
              Personalize your <span className="text-gradient">experience</span>.
            </h1>
            <p className="mt-6 text-muted-foreground max-w-xl">Customize the visual interface of the Trics Research portal to suit your preference.</p>
          </div>
        </section>
      ) : (
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight">Portal Settings</h1>
          <p className="text-muted-foreground mt-1">Customize your admin interface appearance.</p>
        </div>
      )}

      <section className={isAdmin ? "" : "px-6 pb-32"}>
        <div className={isAdmin ? "space-y-12" : "max-w-3xl mx-auto space-y-12"}>
          {/* Appearance Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold font-display">Appearance</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => theme !== "light" && toggle()}
                className={cn(
                  "flex items-center justify-between p-6 rounded-2xl border transition-all",
                  theme === "light" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:border-primary/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5" />
                  <span className="font-medium">Light Mode</span>
                </div>
                {theme === "light" && <Check className="w-5 h-5 text-primary" />}
              </button>
              <button
                onClick={() => theme !== "dark" && toggle()}
                className={cn(
                  "flex items-center justify-between p-6 rounded-2xl border transition-all",
                  theme === "dark" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:border-primary/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5" />
                  <span className="font-medium">Dark Mode</span>
                </div>
                {theme === "dark" && <Check className="w-5 h-5 text-primary" />}
              </button>
            </div>
          </div>

          {/* Primary Color Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold font-display">Primary Accent</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {curatedColors.map((color) => {
                const isActive = primaryColor.h === color.h;
                return (
                  <button
                    key={color.name}
                    onClick={() => setPrimaryColor({ h: color.h, s: color.s, l: color.l })}
                    className={cn(
                      "group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-3",
                      isActive ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:border-primary/40"
                    )}
                  >
                    <div className={cn("w-12 h-12 rounded-full shadow-lg transition-transform group-hover:scale-110", color.class)} />
                    <span className="text-xs font-medium">{color.name}</span>
                    {isActive && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Information */}
          <div className="p-6 rounded-2xl bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground text-center">
              Settings are saved locally to your browser and will persist across sessions.
            </p>
          </div>
        </div>
      </section>

      {!isAdmin && <SiteFooter />}
    </div>
  );
};

export default Settings;
