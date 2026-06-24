import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Database, WifiOff, EyeOff, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div>
      <Link to="/" className="back-btn">
        <ArrowLeft size={18} />
        Back
      </Link>

      <div className="card">
        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={18} />
          Privacy Policy
        </h2>
        <p><strong>Last updated:</strong> June 24, 2026</p>
      </div>

      <div className="privacy-highlight">
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lock size={18} />
          <strong>Your data stays on your device. Period.</strong>
        </p>
      </div>

      <div className="card">
        <h3 className="card-title">What Information Is Stored</h3>
        <div className="info-section">
          <p>WormCast stores only the following data, and only on your device:</p>
          <ul>
            <li><strong>Calculator inputs</strong> — Worm count, bed size, feed type, temperature, and projection period</li>
            <li><strong>Farm settings</strong> — Farm name, species, bin count, bin type, bedding type, and personal notes</li>
          </ul>
          <p>This data is saved using your browser's local storage so it remains available when you close and reopen the app.</p>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <WifiOff size={18} />
          Does Data Leave the Device?
        </h3>
        <p><strong>No.</strong> WormCast does not send any data to external servers, cloud services, or third parties. All calculations are performed locally on your device. The app works fully offline after installation.</p>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EyeOff size={18} />
          Analytics, Advertising, and Tracking
        </h3>
        <p><strong>None.</strong> WormCast does not include:</p>
        <ul>
          <li>Analytics or usage tracking</li>
          <li>Advertisements</li>
          <li>Third-party trackers or cookies</li>
          <li>Social media integrations</li>
        </ul>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={18} />
          Data Deletion
        </h3>
        <p>To clear all stored data, uninstall the app or use your browser's settings to clear local storage for this site. You can also reset settings from the Settings tab within the app.</p>
      </div>

      <div className="card">
        <h3 className="card-title">Contact</h3>
        <p>If you have questions about this privacy policy, please contact Tyler Farris at the app store listing.</p>
      </div>
    </div>
  );
}
