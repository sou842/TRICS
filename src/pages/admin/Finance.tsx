import React, { useState, useEffect } from 'react';
import { getFinanceRecords, saveFinanceRecord, deleteFinanceRecord } from '@/lib/localStorageData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  IndianRupee, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit2, 
  Download,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const defaultFormState = { id: '', clientName: '', project: '', amount: 0, status: 'pending', issueDate: '', dueDate: '' };

const Finance = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<any>(defaultFormState);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Stats
  const [ytdRevenue, setYtdRevenue] = useState(0);
  const [accountsReceivable, setAccountsReceivable] = useState(0);
  const [overdueCash, setOverdueCash] = useState(0);
  
  // Chart Data
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const data = getFinanceRecords();
    setRecords(data);
    calculateStats(data);
    generateChartData(data);
  };

  const calculateStats = (data: any[]) => {
    let rev = 0;
    let ar = 0;
    let overdue = 0;
    
    data.forEach(r => {
      const amt = Number(r.amount);
      if (r.status === 'paid') rev += amt;
      if (r.status === 'pending') ar += amt;
      if (r.status === 'overdue') overdue += amt;
    });
    
    setYtdRevenue(rev);
    setAccountsReceivable(ar);
    setOverdueCash(overdue);
  };

  const generateChartData = (data: any[]) => {
    // Generate mock months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const mockData = months.map(m => ({
      name: m,
      revenue: Math.floor(Math.random() * 5000000) + 1000000,
      receivables: Math.floor(Math.random() * 2000000) + 500000,
      expenses: Math.floor(Math.random() * 3000000) + 500000
    }));
    setChartData(mockData);
  };

  const handleOpenDialog = (record: any = null) => {
    if (record) {
      setFormData(record);
    } else {
      setFormData({
        ...defaultFormState,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // +30 days
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.clientName || !formData.amount || !formData.issueDate || !formData.dueDate) {
      toast.error("Please fill all required fields.");
      return;
    }
    
    saveFinanceRecord(formData);
    toast.success(`Record ${formData.id ? 'updated' : 'added'}`);
    setIsDialogOpen(false);
    loadRecords();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this financial record?")) {
      deleteFinanceRecord(id);
      toast.success("Record deleted");
      loadRecords();
    }
  };
  
  const handleStatusChange = (id: string, newStatus: string) => {
    const record = records.find(r => r.id === id);
    if (record) {
      saveFinanceRecord({ ...record, status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      loadRecords();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case 'pending': return <Badge variant="secondary" className="text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20">Pending</Badge>;
      case 'overdue': return <Badge variant="destructive">Overdue</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredRecords = statusFilter === 'all' 
    ? records 
    : records.filter(r => r.status === statusFilter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Financial Center</h1>
          <p className="text-muted-foreground mt-1">Manage invoices, contracts, and cash flow.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button onClick={() => handleOpenDialog()}><Plus className="w-4 h-4 mr-2" /> New Invoice</Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">YTD Revenue (Collected)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-green-500/10 grid place-items-center">
              <IndianRupee className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">{formatCurrency(ytdRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" /> +8.2% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Accounts Receivable (Pending)</CardTitle>
            <div className="w-8 h-8 rounded-full bg-yellow-500/10 grid place-items-center">
              <IndianRupee className="w-4 h-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">{formatCurrency(accountsReceivable)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Expected incoming cash flow
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-destructive">Overdue Cash</CardTitle>
            <div className="w-8 h-8 rounded-full bg-destructive/10 grid place-items-center">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-destructive">{formatCurrency(overdueCash)}</div>
            <p className="text-xs text-destructive/80 mt-1">
              Immediate follow-up required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Overview</CardTitle>
          <CardDescription>Monthly revenue vs expected receivables and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke="#333" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: '#888'}} dy={10} />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{fill: '#888'}} 
                  tickFormatter={(value) => `₹${(value/1000000).toFixed(1)}Cr`}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="revenue" name="Collected Revenue" barSize={20} fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="receivables" name="Expected Receivables" barSize={20} fill="#eab308" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="expenses" name="Operating Expenses" stroke="#ef4444" strokeWidth={3} dot={{r: 4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Ledger Table */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border pb-4 gap-4">
          <div>
            <CardTitle>Invoice Ledger</CardTitle>
            <CardDescription>Track all client contracts and invoices</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client & Project</TableHead>
                <TableHead>Dates (Issue - Due)</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No financial records found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono font-medium">{r.id}</TableCell>
                    <TableCell>
                      <div className="font-semibold text-foreground">{r.clientName}</div>
                      <div className="text-xs text-muted-foreground">{r.project}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{r.issueDate}</div>
                      <div className="text-xs text-muted-foreground">Due: {r.dueDate}</div>
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(Number(r.amount))}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(r.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {r.status !== 'paid' && (
                          <Button variant="outline" size="sm" onClick={() => handleStatusChange(r.id, 'paid')}>
                            Mark Paid
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(r)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(r.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit Financial Record' : 'Create New Invoice'}</DialogTitle>
            <DialogDescription>
              Enter the invoice details. The ID will be generated automatically if left blank.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
              <Label htmlFor="id" className="text-left md:text-right">Invoice ID</Label>
              <Input id="id" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="md:col-span-3" placeholder="Auto-generated if empty" disabled={!!formData.id} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
              <Label htmlFor="clientName" className="text-left md:text-right">Client Name *</Label>
              <Input id="clientName" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="md:col-span-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
              <Label htmlFor="project" className="text-left md:text-right">Project</Label>
              <Input id="project" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="md:col-span-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
              <Label htmlFor="amount" className="text-left md:text-right">Amount (₹) *</Label>
              <Input id="amount" type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="md:col-span-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
              <Label htmlFor="status" className="text-left md:text-right">Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}>
                <SelectTrigger className="md:col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
              <Label htmlFor="issueDate" className="text-left md:text-right">Issue Date</Label>
              <Input id="issueDate" type="date" value={formData.issueDate} onChange={e => setFormData({...formData, issueDate: e.target.value})} className="md:col-span-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4">
              <Label htmlFor="dueDate" className="text-left md:text-right">Due Date</Label>
              <Input id="dueDate" type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="md:col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Finance;
