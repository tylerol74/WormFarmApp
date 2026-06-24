import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Info, Scale, Image } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <Link to="/" className="back-btn">
        <ArrowLeft size={18} />
        Back
      </Link>

      <div className="card">
        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Info size={18} />
          About WormCast
        </h2>
        <p>
          WormCast is a free worm-farming calculator and management tool built for vermicomposting enthusiasts.
          It helps you estimate feeding schedules, casting production, and population growth for your worm farm.
        </p>
      </div>

      <div className="card">
        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} color="var(--warning)" />
          Disclaimer
        </h2>
        <div className="info-section">
          <p>
            All estimates produced by WormCast are <strong>approximations</strong> based on generalized conditions.
            Actual results will vary based on many factors:
          </p>
          <ul>
            <li><strong>Worm species</strong> — Different species consume and reproduce at different rates.</li>
            <li><strong>Temperature</strong> — Worms slow down in cold or hot conditions outside their optimal range.</li>
            <li><strong>Moisture</strong> — Too dry or too wet bedding affects feeding and health.</li>
            <li><strong>Feed quality</strong> — Nutrient-rich, well-prepared food yields better results than low-quality scraps.</li>
            <li><strong>Farm type</strong> — Flow-through bins, stackable trays, and outdoor windrows all behave differently.</li>
            <li><strong>Management</strong> — Frequency of feeding, turning, and harvesting all impact outcomes.</li>
          </ul>
          <p>
            Use these numbers as a starting point, not a guarantee. Always observe your own bin and adjust based on
            what you see. When in doubt, underfeed rather than overfeed.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Scale size={18} />
          Version
        </h2>
        <p>WormCast 1.0.0</p>
      </div>

      <div className="card">
        <Link to="/assets" className="back-btn" style={{ marginBottom: 0 }}>
          <Image size={18} />
          View Asset Checklist
        </Link>
      </div>
    </div>
  );
}
