import { Link } from 'react-router-dom';
import { ArrowLeft, Image, ImageIcon, Monitor, Camera } from 'lucide-react';

export default function AssetsPage() {
  return (
    <div>
      <Link to="/" className="back-btn">
        <ArrowLeft size={18} />
        Back
      </Link>

      <div className="card">
        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image size={18} />
          Asset Checklist
        </h2>
        <p>Below are the required images and assets you must provide before releasing WormCast on the Google Play Store.</p>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon size={18} />
          App Icon
        </h3>
        <div className="placeholder-box">
          <div className="placeholder-title">Replace this file</div>
          <div className="placeholder-desc">PNG, 1024x1024 pixels, square</div>
          <div className="placeholder-path">public/assets/icons/icon.png</div>
        </div>
        <p className="form-hint">This icon is used for the app launcher on the home screen and in the app drawer.</p>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImageIcon size={18} />
          Adaptive Android Icon
        </h3>
        <div className="placeholder-box">
          <div className="placeholder-title">Replace these files</div>
          <div className="placeholder-desc">Foreground + background layers, PNG</div>
          <div className="placeholder-path">android/app/src/main/res/mipmap-*/ic_launcher_foreground.png</div>
          <div className="placeholder-path">android/app/src/main/res/mipmap-*/ic_launcher_background.png</div>
        </div>
        <p className="form-hint">
          Android Studio's Image Asset Studio can generate these from a single vector or PNG.
          Open Android Studio, right-click res, then <strong>New &gt; Image Asset</strong>.
        </p>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Monitor size={18} />
          Splash Screen
        </h3>
        <div className="placeholder-box">
          <div className="placeholder-title">Replace this file</div>
          <div className="placeholder-desc">PNG, 2732x2732 pixels recommended</div>
          <div className="placeholder-path">public/assets/icons/splash.png</div>
        </div>
        <p className="form-hint">Shown while the app is loading. Keep the logo centered with a solid background color.</p>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Camera size={18} />
          Play Store Screenshots
        </h3>
        <div className="placeholder-box">
          <div className="placeholder-title">Place these files</div>
          <div className="placeholder-desc">PNG or JPEG, 16:9 or 9:16 aspect ratio</div>
          <div className="placeholder-path">public/assets/screenshots/</div>
        </div>
        <p className="form-hint">
          Upload at least 2 screenshots (up to 8) in the Google Play Console. Common sizes: 1080x1920 or 1920x1080.
        </p>
      </div>
    </div>
  );
}
