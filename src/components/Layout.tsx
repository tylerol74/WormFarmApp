import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Settings, Info, Shield } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>WormCast</h1>
        <div className="header-actions">
          <Link to="/privacy" className="icon-btn" aria-label="Privacy">
            <Shield size={20} />
          </Link>
          <Link to="/about" className="icon-btn" aria-label="About">
            <Info size={20} />
          </Link>
        </div>
      </header>
      <main className="app-content">
        {children}
      </main>
      <nav className="app-tabbar">
        <Link to="/" className={`tab-item ${path === '/' ? 'active' : ''}`}>
          <Calculator size={24} />
          <span>Calculator</span>
        </Link>
        <Link to="/settings" className={`tab-item ${path === '/settings' ? 'active' : ''}`}>
          <Settings size={24} />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
}
