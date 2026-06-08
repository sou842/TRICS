import React, { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/localStorageData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Archive, 
  Trash2, 
  Mail, 
  Phone, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = () => {
    setInquiries(getInquiries());
  };

  const handleStatusChange = (id: string, status: string) => {
    updateInquiryStatus(id, status);
    loadInquiries();
    if (status === 'archived') {
      setSelectedId(null);
      toast.success("Inquiry archived");
    } else if (status === 'read') {
      toast.success("Marked as read");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this inquiry?")) {
      deleteInquiry(id);
      setSelectedId(null);
      loadInquiries();
      toast.success("Inquiry deleted");
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    if (filter === 'unread') return i.status === 'unread';
    if (filter === 'archived') return i.status === 'archived';
    return i.status !== 'archived'; // 'all' shows everything except archived
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const selectedInquiry = inquiries.find(i => i.id === selectedId);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Inquiries</h1>
          <p className="text-muted-foreground mt-1">Manage leads and messages from the contact form.</p>
        </div>
        <div className="flex gap-2 bg-secondary p-1 rounded-md">
          <Button 
            variant={filter === 'all' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            Inbox
          </Button>
          <Button 
            variant={filter === 'unread' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setFilter('unread')}
          >
            Unread
          </Button>
          <Button 
            variant={filter === 'archived' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setFilter('archived')}
          >
            Archived
          </Button>
        </div>
      </div>

      <div className="flex-1 border border-border bg-card rounded-lg overflow-hidden flex shadow-sm">
        {/* Left Pane - List */}
        <div className="w-1/3 border-r border-border bg-background/50 flex flex-col">
          <ScrollArea className="flex-1 h-full">
            {filteredInquiries.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No inquiries found in this view.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredInquiries.map((inquiry) => (
                  <button
                    key={inquiry.id}
                    onClick={() => {
                      setSelectedId(inquiry.id);
                      if (inquiry.status === 'unread') {
                        handleStatusChange(inquiry.id, 'read');
                      }
                    }}
                    className={`w-full text-left p-4 hover:bg-secondary/50 transition-colors relative ${selectedId === inquiry.id ? 'bg-secondary' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-medium ${inquiry.status === 'unread' ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {inquiry.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatDistanceToNow(new Date(inquiry.date), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-primary mb-2 line-clamp-1">
                      {inquiry.service}
                    </div>
                    <p className={`text-sm line-clamp-2 ${inquiry.status === 'unread' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {inquiry.message}
                    </p>
                    {inquiry.status === 'unread' && (
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Right Pane - Detail */}
        <div className="w-2/3 bg-card flex flex-col">
          {selectedInquiry ? (
            <>
              {/* Detail Header Action Bar */}
              <div className="h-14 border-b border-border flex items-center justify-between px-6 bg-secondary/20">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange(selectedInquiry.id, selectedInquiry.status === 'unread' ? 'read' : 'unread')}>
                    {selectedInquiry.status === 'unread' ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
                    Mark as {selectedInquiry.status === 'unread' ? 'Read' : 'Unread'}
                  </Button>
                  {selectedInquiry.status !== 'archived' && (
                    <Button variant="outline" size="sm" onClick={() => handleStatusChange(selectedInquiry.id, 'archived')}>
                      <Archive className="w-4 h-4 mr-2" /> Archive
                    </Button>
                  )}
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(selectedInquiry.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Detail Content */}
              <ScrollArea className="flex-1 p-8">
                <div className="max-w-2xl">
                  <div className="mb-8">
                    <h2 className="text-2xl font-display font-bold mb-4">{selectedInquiry.name}</h2>
                    <div className="space-y-2 text-sm text-muted-foreground bg-secondary/30 p-4 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-3 text-primary" />
                        <a href={`mailto:${selectedInquiry.email}`} className="hover:underline">{selectedInquiry.email}</a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-3 text-primary" />
                        <a href={`tel:${selectedInquiry.phone}`} className="hover:underline">{selectedInquiry.phone || 'No phone provided'}</a>
                      </div>
                      <div className="flex items-center pt-2 mt-2 border-t border-border/50">
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground mr-3">Regarding:</span>
                        <span className="font-medium text-foreground">{selectedInquiry.service}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm dark:prose-invert">
                    <p className="whitespace-pre-wrap leading-relaxed text-base">
                      {selectedInquiry.message}
                    </p>
                  </div>
                  
                  <div className="mt-12 pt-6 border-t border-border">
                    <Button asChild>
                      <a href={`mailto:${selectedInquiry.email}?subject=RE: TRICS Inquiry - ${selectedInquiry.service}`}>
                        Reply via Email
                      </a>
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <Mail className="w-16 h-16 mb-4 text-muted/30" />
              <p className="text-lg font-medium">No inquiry selected</p>
              <p className="text-sm">Select an inquiry from the list to read its contents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
