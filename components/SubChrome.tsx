import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function SubHeader({ href = "/", label = "Back to home" }: { href?: string; label?: string }) {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="BVR Global Technologies home">
          <span className="brand-mark">BVR<span>.</span></span>
          <span className="brand-copy"><strong>BVR GLOBAL TECHNOLOGIES</strong><small>PRIVATE LIMITED</small></span>
        </Link>
      
        
      </div>
    </header>
  );
}

export function SubFooter() {
  return (
    <footer className="footer">
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} BVR Global Technologies Pvt. Ltd.</span>
        <span>Designed with purpose. Built for possibility.</span>
      </div>
    </footer>
  );
}