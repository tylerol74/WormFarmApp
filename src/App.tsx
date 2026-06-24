import React, { useMemo, useState } from "react";

const farmTypes = {
  tote: {
    label: "Small bin / tote",
    growth: 0.72,
    feed: 0.85,
    castings: 0.5,
    notes: "Stable home bin; growth slows if overfed or crowded.",
  },
  continuous: {
    label: "Continuous-flow bin",
    growth: 0.9,
    feed: 1.0,
    castings: 0.58,
    notes: "Better oxygen and harvesting; good for steady feeding.",
  },
  tray: {
    label: "Stacking tray system",
    growth: 0.78,
    feed: 0.9,
    castings: 0.52,
    notes: "Convenient, but shallow trays can dry or crowd faster.",
  },
  windrow: {
    label: "Outdoor windrow / large bed",
    growth: 1.0,
    feed: 1.05,
    castings: 0.6,
    notes: "Best capacity if temperature and moisture stay in range.",
  },
  slow: {
    label: "Cool / underfed / beginner bin",
    growth: 0.42,
    feed: 0.55,
    castings: 0.42,
    notes: "Use this if conditions are inconsistent or below ideal.",
  },
};

function fmt(num, digits = 0) {
  if (!Number.isFinite(num)) return "—";
  return num.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

function StatCard({ label, value, sub }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
      {sub && <div style={styles.statSub}>{sub}</div>}
    </div>
  );
}

export default function App() {
  const [unit, setUnit] = useState("lbs");
  const [startSize, setStartSize] = useState(1);
  const [weeks, setWeeks] = useState(12);
  const [farmType, setFarmType] = useState("tote");
  const [area, setArea] = useState(2);
  const [densityCap, setDensityCap] = useState(1.5);
  const [feedLevel, setFeedLevel] = useState("conservative");
  const [initialMaturePct, setInitialMaturePct] = useState(80);
  const [harvestEveryWeeks, setHarvestEveryWeeks] = useState(12);

  const feedingProfiles = {
  verylight: { label: "Very Light Feeding", rate: 0.25 },
  conservative: { label: "Conservative Feeding", rate: 0.5 },
  moderate: { label: "Moderate Feeding", rate: 0.7 },
  heavy: { label: "Heavy Feeding", rate: 0.9 },
  maximum: { label: "Maximum Feeding", rate: 1.0 },
};

const result = useMemo(() => {
    const preset = farmTypes[farmType];
    const startLbs = unit === "lbs" ? Number(startSize || 0) : Number(startSize || 0) / 1000;
    const startWorms = startLbs * 1000;

    const maxLbs = Math.max(0.1, Number(area || 0) * Number(densityCap || 0));
    const maxWorms = maxLbs * 1000;

    // Simple logistic growth model.
    // Assumption: ideal red wigglers can roughly double in about 60 days.
    const idealWeeklyGrowth = Math.log(2) / (60 / 7);
    const growthRate = idealWeeklyGrowth * preset.growth;
    const time = Number(weeks || 0);
    const capacity = maxWorms;
    const startingPopulation = Math.max(1, startWorms);

    const totalWorms =
      capacity /
      (1 +
        ((capacity - startingPopulation) / startingPopulation) *
          Math.exp(-growthRate * time));

    // Rough maturity estimate.
    const maturityRamp = Math.min(1, time / 8);
    const matureFraction = Math.min(
      0.92,
      (initialMaturePct / 100) * (1 - 0.25 * maturityRamp) + 0.72 * maturityRamp
    );

    const matureWorms = totalWorms * matureFraction;
    const wormLbs = totalWorms / 1000;
    const matureLbs = matureWorms / 1000;

    const selectedFeedRate = feedingProfiles[feedLevel].rate;

    const dailyFeed = matureLbs * selectedFeedRate * preset.feed;
    const weeklyFeed = dailyFeed * 7;

    // Ramped cumulative estimate because a new bin does not instantly process at full speed.
    const cumulativeFeed = weeklyFeed * time * 0.72;
    const castingsWet = cumulativeFeed * preset.castings;

    const harvests = Math.max(0, Math.floor(time / Math.max(1, Number(harvestEveryWeeks || 1))));
    const perHarvest = harvests > 0 ? castingsWet / harvests : castingsWet;

    return {
      startLbs,
      startWorms,
      totalWorms,
      matureWorms,
      wormLbs,
      matureLbs,
      dailyFeed,
      weeklyFeed,
      cumulativeFeed,
      castingsWet,
      maxLbs,
      maxWorms,
      harvests,
      perHarvest,
    };
  }, [unit, startSize, weeks, farmType, area, densityCap, feedLevel, initialMaturePct, harvestEveryWeeks]);

  const preset = farmTypes[farmType];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.badge}>🪱 Red wiggler model</div>
          <h1 style={styles.title}>Worm Farm Calculator</h1>
          <p style={styles.subtitle}>
            Estimate mature worms, total worms, food scraps eaten, and wet castings produced.
            Adjust the assumptions to match your bin.
          </p>
        </div>

        <div style={styles.layout}>
          <div style={styles.panel}>
            <div style={styles.field}>
              <label style={styles.label}>Starting size</label>
              <div style={styles.row}>
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  value={startSize}
                  onChange={(e) => setStartSize(e.target.value)}
                />
                <select style={styles.select} value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="lbs">lb worms</option>
                  <option value="worms"># worms</option>
                </select>
              </div>
              <p style={styles.help}>Default conversion: about 1,000 composting worms per pound.</p>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Time from start: {weeks} weeks</label>
              <input
                style={styles.range}
                type="range"
                min="1"
                max="104"
                step="1"
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Farm type / condition</label>
              <select style={styles.fullSelect} value={farmType} onChange={(e) => setFarmType(e.target.value)}>
                {Object.entries(farmTypes).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
              <p style={styles.help}>{preset.notes}</p>
            </div>

            <div style={styles.twoCols}>
              <div style={styles.field}>
                <label style={styles.label}>Bin surface area, sq ft</label>
                <input
                  style={styles.input}
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Capacity, lb/sq ft</label>
                <input
                  style={styles.input}
                  type="number"
                  min="0.25"
                  step="0.25"
                  value={densityCap}
                  onChange={(e) => setDensityCap(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Feeding intensity</label>

              <select
                style={styles.fullSelect}
                value={feedLevel}
                onChange={(e) => setFeedLevel(e.target.value)}
              >
                {Object.entries(feedingProfiles).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>

              <p style={styles.help}>
                Conservative is recommended for most home bins. Heavy and Maximum
                require excellent airflow, moisture, and temperature.
              </p>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Starting mature worms: {initialMaturePct}%</label>
              <input
                style={styles.range}
                type="range"
                min="20"
                max="100"
                step="5"
                value={initialMaturePct}
                onChange={(e) => setInitialMaturePct(Number(e.target.value))}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Harvest interval, weeks</label>
              <input
                style={styles.input}
                type="number"
                min="1"
                step="1"
                value={harvestEveryWeeks}
                onChange={(e) => setHarvestEveryWeeks(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.results}>
            <div style={styles.statsGrid}>
              <StatCard
                label="Total worms"
                value={fmt(result.totalWorms)}
                sub={`${fmt(result.wormLbs, 2)} lb estimated biomass`}
              />
              <StatCard
                label="Mature worms"
                value={fmt(result.matureWorms)}
                sub={`${fmt(result.matureLbs, 2)} lb mature biomass`}
              />
              <StatCard
                label="Food scraps"
                value={`${fmt(result.dailyFeed, 2)} lb/day`}
                sub={`${fmt(result.weeklyFeed, 1)} lb/week`}
              />
              <StatCard
                label="Wet castings produced"
                value={`${fmt(result.castingsWet, 1)} lb`}
                sub={`Over ${weeks} weeks`}
              />
              <StatCard
                label="Bin carrying capacity"
                value={`${fmt(result.maxLbs, 1)} lb`}
                sub={`${fmt(result.maxWorms)} worms at selected density`}
              />
              <StatCard
                label="Harvest estimate"
                value={`${fmt(result.perHarvest, 1)} lb`}
                sub={result.harvests ? `${result.harvests} harvest window(s)` : "No full harvest interval yet"}
              />
            </div>

            <div style={styles.infoBox}>
              <h2 style={styles.h2}>How to use this</h2>
              <p>
                Start feeding below the estimate. If scraps are still visible, smell sour, or attract flies,
                reduce feeding. If food disappears quickly and the bin smells earthy, increase gradually.
              </p>
              <p>
                Castings are a wet-weight planning estimate. Actual harvest includes castings, processed
                bedding, moisture, and unfinished material.
              </p>
            </div>

            <div style={styles.infoBox}>
              <h2 style={styles.h2}>Model assumptions</h2>
              <ul style={styles.list}>
                <li>About 1,000 red wigglers per pound.</li>
                <li>Ideal population doubling near 60 days, slowed by farm type and bin capacity.</li>
                <li>Feed range of 0.25–1.0 lb food per lb worms per day.</li>
                <li>Growth slows as the bin approaches carrying capacity.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
    color: "#0f172a",
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: 16,
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    marginBottom: 24,
  },
  badge: {
    display: "inline-block",
    background: "#e2e8f0",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: "clamp(32px, 7vw, 56px)",
    lineHeight: 1,
    margin: "8px 0",
  },
  subtitle: {
    color: "#475569",
    maxWidth: 720,
    fontSize: 16,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(280px, 380px) 1fr",
    gap: 20,
  },
  panel: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 1px 4px rgba(15, 23, 42, 0.08)",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontWeight: 700,
    marginBottom: 8,
    fontSize: 14,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 130px",
    gap: 8,
  },
  twoCols: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    fontSize: 16,
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    fontSize: 15,
    background: "white",
  },
  fullSelect: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    fontSize: 16,
    background: "white",
  },
  range: {
    width: "100%",
  },
  help: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: 12,
  },
  results: {
    display: "grid",
    gap: 16,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },
  statCard: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 16,
    boxShadow: "0 1px 4px rgba(15, 23, 42, 0.08)",
  },
  statLabel: {
    color: "#64748b",
    fontSize: 14,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 800,
    marginTop: 4,
  },
  statSub: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 4,
  },
  infoBox: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 1px 4px rgba(15, 23, 42, 0.08)",
    color: "#334155",
    lineHeight: 1.5,
  },
  h2: {
    marginTop: 0,
    color: "#0f172a",
  },
  list: {
    paddingLeft: 22,
  },
};
