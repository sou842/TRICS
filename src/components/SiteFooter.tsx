import { Link } from "react-router-dom";

export const SiteFooter = () => (
  <footer className="border-t border-border px-6 py-12 bg-background">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
      <div>
        <div className="font-display font-bold text-lg">TRICS<span className="text-primary">.</span>RESEARCH</div>
        <p className="text-sm text-muted-foreground mt-3 max-w-xs">Quality Construction. Timely Delivery. Trusted Partnership. Government registered civil contractor.</p>
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Explore</p>
        <ul className="space-y-2 text-sm">
          <li><Link to="/projects" className="hover:text-primary">Projects Portal</Link></li>
          <li><Link to="/services" className="hover:text-primary">Our Capabilities</Link></li>
          <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
          <li><Link to="/settings" className="hover:text-primary">Settings</Link></li>
        </ul>
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Contact</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>contact@trics.research</li>
          <li>+91 11 555-0199</li>
          <li>Pan-India Presence</li>
        </ul>
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">HQ Office</p>
        <p className="text-sm text-muted-foreground">Corporate Office, Sector 5<br />New Delhi, India 110001</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex flex-col md:flex-row gap-2 items-center justify-between">
      <p className="text-xs text-muted-foreground">© 2026 Trics Research Pvt. Ltd. All rights reserved.</p>
      <p className="font-mono text-xs text-muted-foreground">v3.0.0 — Infrastructure by Design.</p>
    </div>
  </footer>
);
