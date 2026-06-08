import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  LogOut, 
  Settings,
  Star,
  IndianRupee,
  Menu
} from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAdminAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Finance', path: '/admin/finance', icon: IndianRupee },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="font-display font-bold text-xl tracking-tight text-primary">
            TRICS<span className="text-foreground"> Admin</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Portal Management</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden w-full">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-border bg-card p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="w-5 h-5 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 flex flex-col border-r border-border bg-card">
                <div className="p-6">
                  <Link to="/" onClick={() => setIsOpen(false)} className="font-display font-bold text-xl tracking-tight text-primary">
                    TRICS<span className="text-foreground"> Admin</span>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">Portal Management</p>
                </div>
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                  {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                      <Link 
                        key={item.path} 
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                          isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
                <div className="p-4 mt-auto border-t border-border">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <span className="font-display font-bold text-primary">TRICS Admin</span>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="-mr-2">
            <LogOut className="w-5 h-5 text-muted-foreground" />
          </Button>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-10 w-full">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
