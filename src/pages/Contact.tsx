import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { saveInquiry } from "@/lib/localStorageData";

const Contact = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inquiry = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: '',
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    };
    
    saveInquiry(inquiry);
    toast.success("Inquiry received — we'll be in touch within 48 hours.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-6 pt-40 pb-20 bg-grid">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-6">// Let's Talk</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
            Tell us about <span className="text-gradient">your project</span>.
          </h1>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            {[
              { i: Mail, t: "Email", d: "contact@trics.research" },
              { i: Phone, t: "Phone", d: "+91 11 555-0199" },
              { i: MapPin, t: "Headquarters", d: "Corporate Office, New Delhi, India" },
            ].map((c) => (
              <div key={c.t} className="bg-card border border-border rounded-3xl p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-secondary grid place-items-center shrink-0">
                  <c.i className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{c.t}</p>
                  <p className="font-medium mt-1">{c.d}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="md:col-span-3 bg-card border border-border rounded-3xl p-8 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input required name="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input required type="email" name="email" placeholder="email@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Project Type</Label>
              <Input name="service" placeholder="Civil Construction / Maintenance / MEP Works" />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea required name="message" rows={6} placeholder="Tell us about your project requirements, site location, timeline..." />
            </div>
            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-primary-glow rounded-full text-base font-semibold py-6">
              Send Inquiry →
            </Button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Contact;
