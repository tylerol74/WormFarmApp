import { useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Save, RotateCcw, Check } from 'lucide-react';

interface FarmSettings {
  farmName: string;
  wormSpecies: 'red-wiggler' | 'eisenia-foetida' | 'eisenia-hortensis' | 'african-nightcrawler' | 'other';
  binCount: string;
  binType: 'stackable' | 'single' | 'flow-through' | 'outdoor' | 'other';
  beddingType: 'coconut-coir' | 'peat-moss' | 'shredded-paper' | 'cardboard' | 'manure' | 'mixed' | 'other';
  notes: string;
}

export default function SettingsPage() {
  const [savedSettings, setSavedSettings] = useLocalStorage<FarmSettings>('wormcast-settings', {
    farmName: '',
    wormSpecies: 'red-wiggler',
    binCount: '',
    binType: 'stackable',
    beddingType: 'coconut-coir',
    notes: '',
  });

  const [settings, setSettings] = useState<FarmSettings>(savedSettings);
  const [saved, setSaved] = useState(false);

  const updateField = useCallback((field: keyof FarmSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  }, []);

  const handleSave = useCallback(() => {
    setSavedSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [settings, setSavedSettings]);

  const handleReset = useCallback(() => {
    const defaults: FarmSettings = {
      farmName: '',
      wormSpecies: 'red-wiggler',
      binCount: '',
      binType: 'stackable',
      beddingType: 'coconut-coir',
      notes: '',
    };
    setSettings(defaults);
    setSavedSettings(defaults);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [setSavedSettings]);

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Farm Settings</h2>

        <div className="form-group">
          <label className="form-label" htmlFor="farmName">Farm / bin name</label>
          <input
            id="farmName"
            type="text"
            className="form-input"
            placeholder="e.g. Backyard Worm Bin #1"
            value={settings.farmName}
            onChange={e => updateField('farmName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="wormSpecies">Worm species</label>
          <select
            id="wormSpecies"
            className="form-select"
            value={settings.wormSpecies}
            onChange={e => updateField('wormSpecies', e.target.value)}
          >
            <option value="red-wiggler">Red Wiggler (Eisenia fetida)</option>
            <option value="eisenia-foetida">Eisenia fetida</option>
            <option value="eisenia-hortensis">European Nightcrawler (Eisenia hortensis)</option>
            <option value="african-nightcrawler">African Nightcrawler (Eudrilus eugeniae)</option>
            <option value="other">Other / Mixed</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="binCount">Number of bins</label>
          <input
            id="binCount"
            type="number"
            inputMode="numeric"
            className="form-input"
            placeholder="e.g. 3"
            value={settings.binCount}
            onChange={e => updateField('binCount', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="binType">Bin type</label>
          <select
            id="binType"
            className="form-select"
            value={settings.binType}
            onChange={e => updateField('binType', e.target.value)}
          >
            <option value="stackable">Stackable tray system</option>
            <option value="single">Single bin / tote</option>
            <option value="flow-through">Flow-through bin</option>
            <option value="outdoor">Outdoor windrow / pile</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="beddingType">Bedding type</label>
          <select
            id="beddingType"
            className="form-select"
            value={settings.beddingType}
            onChange={e => updateField('beddingType', e.target.value)}
          >
            <option value="coconut-coir">Coconut coir</option>
            <option value="peat-moss">Peat moss</option>
            <option value="shredded-paper">Shredded paper</option>
            <option value="cardboard">Cardboard</option>
            <option value="manure">Manure</option>
            <option value="mixed">Mixed bedding</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            className="form-input"
            style={{ height: '120px', paddingTop: '12px', resize: 'none' }}
            placeholder="Any observations, dates, or reminders..."
            value={settings.notes}
            onChange={e => updateField('notes', e.target.value)}
          />
        </div>

        <div className="btn-row">
          <button className="btn btn-secondary" onClick={handleSave}>
            {saved ? <Check size={18} /> : <Save size={18} />}
            {saved ? 'Saved' : 'Save'}
          </button>
          <button className="btn btn-outline" onClick={handleReset}>
            <RotateCcw size={18} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
