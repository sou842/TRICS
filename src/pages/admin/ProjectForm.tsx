import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProjectBySlug, saveProject } from '@/lib/localStorageData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Save, Trash, Plus, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const defaultProjectState = {
  slug: '',
  title: '',
  tag: '',
  location: '',
  desc: '',
  area: '',
  details: '',
  methodology: '',
  mapUrl: '',
  img: '',
  specs: [],
  phases: []
};

const ProjectForm = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isEditing = slug && slug !== 'new';
  
  const [formData, setFormData] = useState<any>(defaultProjectState);

  useEffect(() => {
    if (isEditing) {
      const project = getProjectBySlug(slug as string);
      if (project) {
        setFormData(project);
      } else {
        toast.error("Project not found");
        navigate('/admin/projects');
      }
    }
  }, [slug, isEditing, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.slug) {
      toast.error("Title and Slug are required fields.");
      return;
    }
    
    saveProject(formData);
    toast.success(`Project ${isEditing ? 'updated' : 'created'} successfully!`);
    navigate('/admin/projects');
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/admin/projects">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">
              {isEditing ? 'Edit Project' : 'New Project'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? `Editing ${formData.title}` : 'Create a new portfolio entry'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/projects">Cancel</Link>
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>The primary details displayed on the project card.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={e => {
                      handleChange('title', e.target.value);
                      if (!isEditing) {
                        handleChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                      }
                    }} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input 
                    id="slug" 
                    value={formData.slug} 
                    onChange={e => handleChange('slug', e.target.value)}
                    disabled={isEditing} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tag">Category Tag (e.g. 2024 · Infrastructure)</Label>
                  <Input id="tag" value={formData.tag} onChange={e => handleChange('tag', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={formData.location} onChange={e => handleChange('location', e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">Short Description (Summary)</Label>
                <Textarea 
                  id="desc" 
                  value={formData.desc} 
                  onChange={e => handleChange('desc', e.target.value)} 
                  className="h-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Deep Dive */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Content</CardTitle>
              <CardDescription>Content for the individual project detail page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="details">Full Project Details</Label>
                <Textarea 
                  id="details" 
                  value={formData.details || ''} 
                  onChange={e => handleChange('details', e.target.value)} 
                  className="h-32"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="methodology">Methodology & Approach</Label>
                <Textarea 
                  id="methodology" 
                  value={formData.methodology || ''} 
                  onChange={e => handleChange('methodology', e.target.value)} 
                  className="h-24"
                />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          
          {/* Media */}
          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center text-center bg-secondary/20">
                {formData.img ? (
                  <img src={formData.img} alt="Preview" className="w-full h-32 object-cover rounded-md mb-4" />
                ) : (
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop an image, or click to browse
                </p>
                <Button variant="secondary" size="sm">Upload Image</Button>
                {/* Fallback for local dev to use URL since we don't have Supabase storage yet */}
                <div className="w-full mt-4 space-y-2 text-left">
                  <Label className="text-xs">Or use Image URL (Mock Mode)</Label>
                  <Input 
                    value={formData.img || ''} 
                    onChange={e => handleChange('img', e.target.value)} 
                    placeholder="https://..."
                    className="text-xs h-8"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Specs */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Key-value pairs for the specs grid.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.specs?.map((spec: any, i: number) => (
                <div key={i} className="flex gap-2">
                  <Input 
                    value={spec.label} 
                    onChange={e => {
                      const newSpecs = [...formData.specs];
                      newSpecs[i].label = e.target.value;
                      handleChange('specs', newSpecs);
                    }}
                    placeholder="Label" className="w-1/2" 
                  />
                  <Input 
                    value={spec.value} 
                    onChange={e => {
                      const newSpecs = [...formData.specs];
                      newSpecs[i].value = e.target.value;
                      handleChange('specs', newSpecs);
                    }}
                    placeholder="Value" className="w-1/2" 
                  />
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  handleChange('specs', [...(formData.specs || []), { label: '', value: '' }]);
                }}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Spec
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
