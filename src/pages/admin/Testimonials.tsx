import React, { useState, useEffect } from 'react';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/localStorageData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Star, MessageSquareQuote } from 'lucide-react';
import { toast } from 'sonner';

const defaultFormState = { id: '', name: '', role: '', rating: 5, text: '', img: '', isPublished: true };

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<any>(defaultFormState);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    setTestimonials(getTestimonials());
  };

  const handleOpenDialog = (testimonial: any = null) => {
    if (testimonial) {
      setFormData(testimonial);
    } else {
      setFormData(defaultFormState);
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.text) {
      toast.error("Name and Review text are required.");
      return;
    }
    
    saveTestimonial(formData);
    toast.success(`Testimonial ${formData.id ? 'updated' : 'added'}`);
    setIsDialogOpen(false);
    loadTestimonials();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this testimonial forever?")) {
      deleteTestimonial(id);
      toast.success("Testimonial deleted");
      loadTestimonials();
    }
  };

  const handleTogglePublish = (testimonial: any, checked: boolean) => {
    saveTestimonial({ ...testimonial, isPublished: checked });
    loadTestimonials();
    toast.success(checked ? "Testimonial published" : "Testimonial unpublished");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-500 text-yellow-500' : 'fill-muted text-muted'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client reviews and publish them to the live site.</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="border border-border rounded-lg bg-card p-12 text-center text-muted-foreground flex flex-col items-center">
          <MessageSquareQuote className="w-12 h-12 mb-4 text-muted/50" />
          <p>No testimonials found.</p>
          <Button variant="outline" className="mt-4" onClick={() => handleOpenDialog()}>
            Add your first testimonial
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.id} className={`flex flex-col ${!t.isPublished ? 'opacity-70 grayscale-[30%]' : ''}`}>
              <CardHeader className="flex flex-row items-start justify-between pb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={t.img} alt={t.name} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold leading-none">{t.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
                  </div>
                </div>
                {renderStars(t.rating)}
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-foreground/80 italic">"{t.text}"</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-4 border-t border-border bg-secondary/10">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id={`publish-${t.id}`} 
                    checked={t.isPublished}
                    onCheckedChange={(checked) => handleTogglePublish(t, checked)}
                  />
                  <Label htmlFor={`publish-${t.id}`} className="text-xs cursor-pointer">
                    {t.isPublished ? 'Published' : 'Draft'}
                  </Label>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => handleOpenDialog(t)}>
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(t.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
            <DialogDescription>
              Add a review from a client to build trust on the public site.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name *</Label>
                <Input id="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role / Company</Label>
                <Input id="role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="img">Avatar Image URL</Label>
              <Input id="img" value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <div className="flex items-center gap-1 bg-secondary/30 w-fit p-1 rounded-md">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-6 h-6 ${star <= formData.rating ? 'fill-yellow-500 text-yellow-500' : 'fill-muted text-muted'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Review Text *</Label>
              <Textarea 
                id="text" 
                value={formData.text} 
                onChange={e => setFormData({...formData, text: e.target.value})} 
                className="h-24"
              />
            </div>
            
            <div className="flex items-center space-x-2 mt-2">
              <Switch 
                id="isPublished-modal" 
                checked={formData.isPublished}
                onCheckedChange={(checked) => setFormData({...formData, isPublished: checked})}
              />
              <Label htmlFor="isPublished-modal" className="cursor-pointer">
                Publish immediately
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Testimonials;
