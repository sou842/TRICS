import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Fingerprint, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter the admin password.");
      return;
    }

    setIsSubmitting(true);
    const success = await login(password);
    setIsSubmitting(false);

    if (success) {
      toast.success("Welcome back, Admin!");
      navigate(from, { replace: true });
    } else {
      toast.error("Invalid password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-background selection:bg-primary/30">
      
      {/* Background Image with adaptive overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10 dark:opacity-30 mix-blend-multiply dark:mix-blend-luminosity scale-105 transition-opacity"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1541888081622-15cb3ca4628d?q=80&w=2940&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.2) brightness(0.9)'
        }}
      />
      
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/20 dark:bg-primary/30 rounded-full blur-[150px] mix-blend-normal dark:mix-blend-screen z-0 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-normal dark:mix-blend-screen z-0 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-[1000px] p-6 lg:p-0 flex flex-col lg:flex-row rounded-[2.5rem] overflow-hidden bg-background/60 dark:bg-black/40 backdrop-blur-2xl border border-border shadow-2xl dark:shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)]">
        
        {/* Left Info Panel */}
        <div className="w-full lg:w-5/12 p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-foreground/5 to-transparent">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 font-display font-bold text-2xl tracking-tight text-foreground mb-12">
              <div className="w-10 h-10 rounded-xl bg-foreground text-background grid place-items-center shadow-lg">
                <Fingerprint className="w-6 h-6" />
              </div>
              <span>TRICS<span className="text-primary">.</span></span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Command <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Gateway
              </span>
            </h1>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
              Authorized personnel only. Access to this terminal is monitored and restricted. All actions are securely logged.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-primary" /> End-to-End Encrypted
          </div>
        </div>

        {/* Right Login Panel */}
        <div className="w-full lg:w-7/12 p-10 lg:p-16 flex items-center justify-center bg-card/30">
          <div className="w-full max-w-sm">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Sign In</h2>
              <p className="text-muted-foreground text-sm">Enter your security credential to proceed.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 bg-background/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all text-lg tracking-widest font-mono shadow-inner"
                  autoFocus
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-14 rounded-xl bg-foreground hover:bg-foreground/90 text-background shadow-lg transition-all hover:scale-[1.02] active:scale-95 group overflow-hidden relative" 
                disabled={isSubmitting}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-background/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <span className="font-bold text-[15px] uppercase tracking-wider z-10 relative">
                  {isSubmitting ? "Verifying..." : "Authorize"}
                </span>
                {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform z-10 relative" />}
              </Button>

              <div className="text-center mt-6">
                <p className="text-xs text-muted-foreground">Default credential: <span className="text-foreground/80 font-mono tracking-wider ml-1">admin123</span></p>
              </div>
            </form>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default Login;
