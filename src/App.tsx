import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index.tsx";
import Projects from "./pages/Projects.tsx";
import Services from "./pages/Services.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Settings from "./pages/Settings.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import NotFound from "./pages/NotFound.tsx";

// Admin Imports
import { AdminAuthProvider } from "./contexts/AdminAuthContext.tsx";
import { ProtectedRoute } from "./components/admin/ProtectedRoute.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import Login from "./pages/admin/Login.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import ProjectsList from "./pages/admin/ProjectsList.tsx";
import ProjectForm from "./pages/admin/ProjectForm.tsx";

import Inquiries from "./pages/admin/Inquiries.tsx";
import Testimonials from "./pages/admin/Testimonials.tsx";
import Finance from "./pages/admin/Finance.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                {/* Redirect /admin to /admin/dashboard implicitly by setting index */}
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                
                {/* Projects Management */}
                <Route path="projects" element={<ProjectsList />} />
                <Route path="projects/new" element={<ProjectForm />} />
                <Route path="projects/:slug" element={<ProjectForm />} />
                
                {/* Communications & Reviews */}
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="testimonials" element={<Testimonials />} />
                
                {/* Financial Management */}
                <Route path="finance" element={<Finance />} />
                
                {/* Settings */}
                <Route path="settings" element={<Settings isAdmin={true} />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
