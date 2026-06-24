import { useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ArrowRight, AlertCircle } from 'lucide-react';

interface CalculatorInputs {
  wormCount: string;
  bedVolume: string;
  bedVolumeUnit: 'sqft' | 'sqm' | 'lbs' | 'kg';
  feedType: 'vegetable' | 'manure' | 'paper' | 'mixed';
  temperature: string;
  days: string;
}

interface CalculationResults {
  dailyFeed: number;
  weeklyFeed: number;
  monthlyFeed: number;
  estimatedCastings: number;
  populationGrowth: number;
  feedPerPound: number;
}

const FEED_RATES: Record<string, number> = {
  vegetable: 0.5,
  manure: 0.7,
  paper: 0.3,
  mixed: 0.5,
};

const TEMP_MULTIPLIERS: Record<string, number> = {
  cold: 0.6,
  cool: 0.8,
  optimal: 1.0,
  warm: 0.9,
  hot: 0.5,
};

function getTempMultiplier(temp: number): number {
  if (temp < 10) return TEMP_MULTIPLIERS.cold;
  if (temp < 18) return TEMP_MULTIPLIERS.cool;
  if (temp <= 25) return TEMP_MULTIPLIERS.optimal;
  if (temp <= 30) return TEMP_MULTIPLIERS.warm;
  return TEMP_MULTIPLIERS.hot;
}

function calculate(inputs: CalculatorInputs): CalculationResults | null {
  const worms = parseFloat(inputs.wormCount);
  const temp = parseFloat(inputs.temperature);
  const days = parseFloat(inputs.days);

  if (!worms || worms <= 0 || !temp || !days || days <= 0) return null;

  const baseRate = FEED_RATES[inputs.feedType] || 0.5;
  const tempMultiplier = getTempMultiplier(temp);
  const dailyFeed = worms * baseRate * tempMultiplier;
  const weeklyFeed = dailyFeed * 7;
  const monthlyFeed = dailyFeed * 30;
  const feedPerPound = baseRate * tempMultiplier;

  // Casting estimate: worms produce roughly 40-60% of consumed weight as castings
  const castingRate = 0.5;
  const estimatedCastings = dailyFeed * days * castingRate;

  // Population growth estimate: roughly doubles every 90 days under optimal conditions
  const growthFactor = Math.pow(2, days / 90) * tempMultiplier;
  const populationGrowth = worms * growthFactor;

  return {
    dailyFeed: Math.round(dailyFeed * 100) / 100,
    weeklyFeed: Math.round(weeklyFeed * 100) / 100,
    monthlyFeed: Math.round(monthlyFeed * 100) / 100,
    estimatedCastings: Math.round(estimatedCastings * 100) / 100,
    populationGrowth: Math.round(populationGrowth * 100) / 100,
    feedPerPound: Math.round(feedPerPound * 100) / 100,
  };
}

export default function CalculatorPage() {
  const [savedInputs, setSavedInputs] = useLocalStorage<CalculatorInputs>('wormcast-calculator', {
    wormCount: '',
    bedVolume: '',
    bedVolumeUnit: 'sqft',
    feedType: 'vegetable',
    temperature: '',
    days: '',
  });

  const [inputs, setInputs] = useState<CalculatorInputs>(savedInputs);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback((field: keyof CalculatorInputs, value: string) => {
    setInputs(prev => {
      const next = { ...prev, [field]: value };
      setSavedInputs(next);
      return next;
    });
    setErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, [setSavedInputs]);

  const handleCalculate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    const worms = parseFloat(inputs.wormCount);
    const temp = parseFloat(inputs.temperature);
    const days = parseFloat(inputs.days);

    if (!worms || worms <= 0) newErrors.wormCount = 'Enter a valid number of worms';
    if (!temp) newErrors.temperature = 'Enter a valid temperature';
    if (!days || days <= 0) newErrors.days = 'Enter a valid number of days';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResults(null);
      return;
    }

    setResults(calculate(inputs));
    setErrors({});
  }, [inputs]);

  return (
    <div>
      <div className="card">
        <h2 className="card-title">Worm Farm Calculator</h2>

        <div className="form-group">
          <label className="form-label" htmlFor="wormCount">Number of worms</label>
          <input
            id="wormCount"
            type="number"
            inputMode="numeric"
            className={`form-input ${errors.wormCount ? 'error' : ''}`}
            placeholder="e.g. 1000"
            value={inputs.wormCount}
            onChange={e => updateField('wormCount', e.target.value)}
          />
          {errors.wormCount && <p className="error-text">{errors.wormCount}</p>}
          <p className="form-hint">Total count or estimated population</p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="bedVolume">Bed size / volume</label>
          <div className="btn-row">
            <input
              id="bedVolume"
              type="number"
              inputMode="decimal"
              className="form-input"
              style={{ flex: 2 }}
              placeholder="e.g. 2"
              value={inputs.bedVolume}
              onChange={e => updateField('bedVolume', e.target.value)}
            />
            <select
              className="form-select"
              style={{ flex: 1, minWidth: '100px' }}
              value={inputs.bedVolumeUnit}
              onChange={e => updateField('bedVolumeUnit', e.target.value)}
            >
              <option value="sqft">sq ft</option>
              <option value="sqm">sq m</option>
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
          <p className="form-hint">Surface area or total bedding weight</p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="feedType">Feed type</label>
          <select
            id="feedType"
            className="form-select"
            value={inputs.feedType}
            onChange={e => updateField('feedType', e.target.value)}
          >
            <option value="vegetable">Vegetable scraps</option>
            <option value="manure">Manure</option>
            <option value="paper">Paper / cardboard</option>
            <option value="mixed">Mixed / balanced</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="temperature">Temperature (°C)</label>
          <input
            id="temperature"
            type="number"
            inputMode="decimal"
            className={`form-input ${errors.temperature ? 'error' : ''}`}
            placeholder="e.g. 22"
            value={inputs.temperature}
            onChange={e => updateField('temperature', e.target.value)}
          />
          {errors.temperature && <p className="error-text">{errors.temperature}</p>}
          <p className="form-hint">Optimal range is 18-25°C</p>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="days">Projection period (days)</label>
          <input
            id="days"
            type="number"
            inputMode="numeric"
            className={`form-input ${errors.days ? 'error' : ''}`}
            placeholder="e.g. 30"
            value={inputs.days}
            onChange={e => updateField('days', e.target.value)}
          />
          {errors.days && <p className="error-text">{errors.days}</p>}
          <p className="form-hint">How many days ahead to estimate</p>
        </div>

        <button className="btn btn-primary" onClick={handleCalculate}>
          <ArrowRight size={18} />
          Calculate
        </button>
      </div>

      {results && (
        <div>
          <div className="result-card">
            <p className="result-title">Estimated Castings</p>
            <p className="result-value">{results.estimatedCastings} lbs</p>
          </div>

          <div className="card">
            <h3 className="card-title">Feeding Schedule</h3>
            <div className="result-grid">
              <div className="result-item">
                <div className="value">{results.dailyFeed}</div>
                <div className="label">Daily (lbs)</div>
              </div>
              <div className="result-item">
                <div className="value">{results.weeklyFeed}</div>
                <div className="label">Weekly (lbs)</div>
              </div>
              <div className="result-item">
                <div className="value">{results.monthlyFeed}</div>
                <div className="label">Monthly (lbs)</div>
              </div>
              <div className="result-item">
                <div className="value">{results.feedPerPound}</div>
                <div className="label">Per lb of worms</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Population Projection</h3>
            <div className="result-grid">
              <div className="result-item">
                <div className="value">{results.populationGrowth}</div>
                <div className="label">Estimated worms</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="disclaimer-box">
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={16} />
          Results are estimates based on typical conditions. Actual outcomes vary by species, moisture, feed quality, and management.
        </p>
      </div>
    </div>
  );
}
