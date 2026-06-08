import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { getProjects, getInquiries, getTestimonials } from '@/lib/localStorageData';
import { 
  FolderKanban, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Plus, 
  Eye, 
  ExternalLink,
  Activity,
  IndianRupee,
  Users,
  MapPin,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const Dashboard = () => {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    unreadInquiries: 0,
    totalInquiries: 0,
    avgRating: 0,
    portfolioValue: "₹540 Cr+",
    activePersonnel: "1,250+",
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  
  // New Mock Data for Geographic Reach
  const geoData = [
    { region: 'Delhi NCR', value: 45 },
    { region: 'Maharashtra', value: 25 },
    { region: 'Karnataka', value: 15 },
    { region: 'Gujarat', value: 10 },
    { region: 'Others', value: 5 },
  ];

  useEffect(() => {
    // Fetch data
    const projects = getProjects();
    const inquiries = getInquiries();
    const testimonials = getTestimonials();

    // Calculate stats
    const unread = inquiries.filter((i: any) => i.status === 'unread').length;
    const publishedReviews = testimonials.filter((t: any) => t.isPublished);
    const avgRating = publishedReviews.length > 0 
      ? publishedReviews.reduce((acc: number, curr: any) => acc + curr.rating, 0) / publishedReviews.length 
      : 0;

    setStats(prev => ({
      ...prev,
      totalProjects: projects.length,
      unreadInquiries: unread,
      totalInquiries: inquiries.length,
      avgRating: Number(avgRating.toFixed(1)),
    }));

    // Recent Inquiries (top 5)
    setRecentInquiries(
      [...inquiries]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
    );

    // Prepare Category Data for Pie Chart
    const categories: Record<string, number> = {};
    projects.forEach((p: any) => {
      const tag = p.tag?.split(' ')[1] || 'Other'; 
      categories[tag] = (categories[tag] || 0) + 1;
    });
    
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    setCategoryData(
      Object.entries(categories).map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length]
      }))
    );

    // Mock Trend Data for Area Chart (last 6 months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const mockTrend = months.map((month, idx) => ({
      name: month,
      inquiries: Math.floor(Math.random() * 30) + 10 + (idx * 5), // Upward trend
      revenue: Math.floor(Math.random() * 50) + 20 + (idx * 10),
    }));
    setTrendData(mockTrend);

  }, []);

  return (
    <div className="space-y-8 relative">
      {/* Background Glows for Premium Aesthetics */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Welcome, {user?.name}
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">TRICS Enterprise Command Center</p>
        </div>
        <div className="flex items-center gap-3 bg-card/50 backdrop-blur-xl border border-border/50 px-4 py-2 rounded-full shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wide">SYSTEM SECURE & ONLINE</span>
        </div>
      </div>

      {/* Enterprise KPI Cards (Glassmorphism) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Value Card */}
        <Card className="relative overflow-hidden bg-card/40 backdrop-blur-2xl border-border/50 shadow-lg hover:shadow-xl transition-all group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Portfolio Value</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-green-500/10 grid place-items-center">
              <IndianRupee className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold tracking-tight">{stats.portfolioValue}</div>
            <p className="text-sm text-green-500/80 mt-2 flex items-center font-medium">
              <TrendingUp className="w-4 h-4 mr-1" /> +12.5% YoY Growth
            </p>
          </CardContent>
        </Card>

        {/* Projects Card */}
        <Card className="relative overflow-hidden bg-card/40 backdrop-blur-2xl border-border/50 shadow-lg hover:shadow-xl transition-all group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Projects</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center">
              <FolderKanban className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold tracking-tight">{stats.totalProjects}</div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center">
              Across 12 states in India
            </p>
          </CardContent>
        </Card>

        {/* Personnel Card */}
        <Card className="relative overflow-hidden bg-card/40 backdrop-blur-2xl border-border/50 shadow-lg hover:shadow-xl transition-all group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Personnel</CardTitle>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 grid place-items-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold tracking-tight">{stats.activePersonnel}</div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center">
              Engineers & Ground Staff
            </p>
          </CardContent>
        </Card>

        {/* Inquiries Card */}
        <Card className="relative overflow-hidden bg-card/40 backdrop-blur-2xl border-border/50 shadow-lg hover:shadow-xl transition-all group">
          <div className={`absolute inset-0 bg-gradient-to-br ${stats.unreadInquiries > 0 ? 'from-destructive/5' : 'from-yellow-500/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Inquiries Inbox</CardTitle>
            <div className={`w-10 h-10 rounded-xl grid place-items-center ${stats.unreadInquiries > 0 ? 'bg-destructive/10' : 'bg-yellow-500/10'}`}>
              <MessageSquare className={`w-5 h-5 ${stats.unreadInquiries > 0 ? 'text-destructive animate-pulse' : 'text-yellow-500'}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-display font-bold tracking-tight ${stats.unreadInquiries > 0 ? 'text-destructive' : ''}`}>
              {stats.unreadInquiries} <span className="text-xl text-muted-foreground font-normal">unread</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.totalInquiries} total leads generated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts & Pipelines */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Lead/Revenue Trend */}
        <Card className="md:col-span-8 bg-card/40 backdrop-blur-xl border-border/50 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Growth & Operations</CardTitle>
                <CardDescription>Correlating incoming leads with operational expansion</CardDescription>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" /> Leads
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" /> Operations
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="inquiries" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorInquiries)" />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Pipeline & Geo */}
        <div className="md:col-span-4 space-y-6 flex flex-col">
          
          {/* Project Pipeline */}
          <Card className="bg-card/40 backdrop-blur-xl border-border/50 shadow-lg flex-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Project Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground/80 flex items-center"><Clock className="w-4 h-4 mr-2 text-yellow-500" /> Planning / Bidding</span>
                  <span className="font-mono">14</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[45%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground/80 flex items-center"><Activity className="w-4 h-4 mr-2 text-primary" /> In Execution</span>
                  <span className="font-mono">{stats.totalProjects}</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[30%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground/80 flex items-center"><Star className="w-4 h-4 mr-2 text-green-500" /> Completed (YTD)</span>
                  <span className="font-mono">8</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[25%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Reach */}
          <Card className="bg-card/40 backdrop-blur-xl border-border/50 shadow-lg flex-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary" /> Geographic Reach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {geoData.map((geo) => (
                <div key={geo.region} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground w-28 truncate">{geo.region}</span>
                  <div className="flex-1 mx-4 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-foreground/30" style={{ width: `${geo.value}%` }} />
                  </div>
                  <span className="font-mono w-8 text-right">{geo.value}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Inquiries */}
        <Card className="md:col-span-2 bg-card/40 backdrop-blur-xl border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Communications</CardTitle>
              <CardDescription>Latest messages from the public site</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/inquiries">Inbox <ExternalLink className="w-3 h-3 ml-2" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInquiries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm border border-dashed border-border/50 rounded-xl">
                  No recent inquiries.
                </div>
              ) : (
                recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/30 hover:border-primary/30 transition-all hover:shadow-md">
                    <div className="flex items-start gap-4 overflow-hidden">
                      <div className={`w-2.5 h-2.5 mt-1.5 rounded-full shrink-0 ${inquiry.status === 'unread' ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'bg-muted'}`} />
                      <div className="overflow-hidden">
                        <p className={`text-sm truncate ${inquiry.status === 'unread' ? 'font-bold text-foreground' : 'font-medium text-foreground/80'}`}>
                          {inquiry.name} <span className="text-muted-foreground font-normal ml-2">({inquiry.service})</span>
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {inquiry.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 ml-4">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono bg-secondary/50 px-2 py-1 rounded-md">
                        {formatDistanceToNow(new Date(inquiry.date), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Categories Donut */}
        <Card className="bg-card/40 backdrop-blur-xl border-border/50 shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle>Portfolio Diversity</CardTitle>
            <CardDescription>Active projects by division</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-muted-foreground text-sm">No project data available.</div>
              )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
