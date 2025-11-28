import { useState } from "react";
import "./App.css";
import EnergyChart from "./components/EnergyChart";
import Bar3DChart from "./components/Bar3DChart";

// Helper to generate mock history data
const generateMockHistory = (baseValue, variance, count = 24) => {
  return Array.from({ length: count }, (_, i) => ({
    time: `${i}:00`,
    value1: Number(
      (baseValue + (Math.random() * variance * 2 - variance)).toFixed(1)
    ),
    value2: Number(
      (baseValue + (Math.random() * variance * 2 - variance)).toFixed(1)
    ),
    value3: Number(
      (baseValue + (Math.random() * variance * 2 - variance)).toFixed(1)
    ),
  }));
};

function App() {
  const [showFullTHD, setShowFullTHD] = useState(false);

  // Mock Data - In a real app, this would come from an API or WebSocket
  const data = {
    summary: {
      uTotal: 380.5,
      iTotal: 45.6,
      pMax: 12.5,
      pMin: 8.2,
    },
    voltage: {
      u1: 220.1,
      u2: 220.5,
      u3: 219.8,
      unit: "V",
    },
    current: {
      i1: 15.2,
      i2: 14.8,
      i3: 15.6,
      unit: "A",
    },
    power: {
      p1: 3.3,
      p2: 3.2,
      p3: 3.4,
      total: 9.9,
      unit: "kW",
    },
    maxValues: { pMax: 4.1, iMax: 18.5 },
    thd: {
      main: 2.5,
      details: {
        thdI1: 2.1,
        thdI2: 2.3,
        thdI3: 2.2,
        thdU1N: 1.5,
        thdU2N: 1.6,
        thdU3N: 1.4,
      },
    },
  };

  // Generate mock history for charts
  const voltageHistory = generateMockHistory(220, 5);
  const currentHistory = generateMockHistory(15, 2);
  const powerHistory = generateMockHistory(3.5, 0.5);
  const thdHistory = generateMockHistory(2.5, 0.2);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-item">
          <span className="header-label">U TOTAL</span>
          <span className="header-value">{data.summary.uTotal} V</span>
        </div>
        <div className="header-item">
          <span className="header-label">I TOTAL</span>
          <span className="header-value">{data.summary.iTotal} A</span>
        </div>
        <div className="header-item">
          <span className="header-label">P MAX</span>
          <span className="header-value">{data.summary.pMax} kW</span>
        </div>
        <div className="header-item">
          <span className="header-label">P MIN</span>
          <span className="header-value">{data.summary.pMin} kW</span>
        </div>
      </div>

      {/* Main Data Grid */}
      <div className="grid-container">
        {/* Voltage */}
        <div className="glass-panel">
          <div className="panel-header">
            <span className="panel-title">Điện áp (Voltage)</span>
            <span className="icon">⚡</span>
          </div>
          <div className="phase-grid">
            <div className="phase-item">
              <span className="phase-label">U1</span>
              <span className="phase-value">
                {data.voltage.u1} {data.voltage.unit}
              </span>
            </div>
            <div className="phase-item">
              <span className="phase-label">U2</span>
              <span className="phase-value">
                {data.voltage.u2} {data.voltage.unit}
              </span>
            </div>
            <div className="phase-item">
              <span className="phase-label">U3</span>
              <span className="phase-value">
                {data.voltage.u3} {data.voltage.unit}
              </span>
            </div>
          </div>
          <EnergyChart
            id="voltageChart"
            data={voltageHistory}
            lines={[
              { key: "value1", color: "#FFD700", name: "U1" },
              { key: "value2", color: "#FF9100", name: "U2" },
              { key: "value3", color: "#FFFF00", name: "U3" },
            ]}
            unit="V"
            height="150px"
          />
        </div>

        {/* Current */}
        <div className="glass-panel">
          <div className="panel-header">
            <span className="panel-title">Dòng điện (Current)</span>
            <span className="icon">🔌</span>
          </div>
          <div className="phase-grid">
            <div className="phase-item">
              <span className="phase-label">I1</span>
              <span className="phase-value">
                {data.current.i1} {data.current.unit}
              </span>
            </div>
            <div className="phase-item">
              <span className="phase-label">I2</span>
              <span className="phase-value">
                {data.current.i2} {data.current.unit}
              </span>
            </div>
            <div className="phase-item">
              <span className="phase-label">I3</span>
              <span className="phase-value">
                {data.current.i3} {data.current.unit}
              </span>
            </div>
          </div>
          <EnergyChart
            id="currentChart"
            data={currentHistory}
            lines={[
              { key: "value1", color: "#00E676", name: "I1" },
              { key: "value2", color: "#00B8D4", name: "I2" },
              { key: "value3", color: "#64DD17", name: "I3" },
            ]}
            unit="A"
            height="150px"
          />
        </div>

        {/* Power */}
        <div className="glass-panel">
          <div className="panel-header">
            <span className="panel-title">Công suất (Power)</span>
            <span className="icon">💡</span>
          </div>
          <div className="phase-grid">
            <div className="phase-item">
              <span className="phase-label">P1</span>
              <span className="phase-value">
                {data.power.p1} {data.power.unit}
              </span>
            </div>
            <div className="phase-item">
              <span className="phase-label">P2</span>
              <span className="phase-value">
                {data.power.p2} {data.power.unit}
              </span>
            </div>
            <div className="phase-item">
              <span className="phase-label">P3</span>
              <span className="phase-value">
                {data.power.p3} {data.power.unit}
              </span>
            </div>
            <div className="phase-item total-power">
              <span className="phase-label">Total</span>
              <span className="phase-value">
                {data.power.total} {data.power.unit}
              </span>
            </div>
          </div>
          <EnergyChart
            id="powerChart"
            data={powerHistory}
            lines={[
              { key: "value1", color: "#FF3D00", name: "P1" },
              { key: "value2", color: "#FF9100", name: "P2" },
              { key: "value3", color: "#FFEA00", name: "P3" },
            ]}
            unit="kW"
            height="150px"
          />
        </div>

        {/* Pmin / Pmax */}
        <div className="glass-panel">
          <div className="panel-header">
            <span className="panel-title">Pmin / Pmax</span>
            <span className="icon">📈</span>
          </div>

          <div style={{ width: "100%", height: "180px" }}>
            <Bar3DChart
              data={[
                { name: "Pmin", value: data.summary.pMin, fill: "#00e676" },
                { name: "Pmax", value: data.summary.pMax, fill: "#ff3d00" },
              ]}
            />
          </div>

          <div className="sub-value">
            <span>Pmin:</span>
            <span>{data.summary.pMin} kW</span>
          </div>
          <div className="sub-value">
            <span>Pmax:</span>
            <span>{data.summary.pMax} kW</span>
          </div>
        </div>

        {/* THD */}
        <div className="glass-panel" style={{ gridColumn: "span 1" }}>
          <div className="panel-header">
            <span className="panel-title">THD (Total Harmonic Distortion)</span>
            <span className="icon">📊</span>
          </div>
          <div>
            <span className="panel-value">{data.thd.main}</span>
            <span className="panel-unit">%</span>
          </div>

          <EnergyChart
            id="thdChart"
            data={thdHistory}
            lines={[
              { key: "value1", color: "#2962FF", name: "THD1" },
              { key: "value2", color: "#00B0FF", name: "THD2" },
              { key: "value3", color: "#00E5FF", name: "THD3" },
            ]}
            unit="%"
            height="150px"
          />

          <button
            className="collapse-btn"
            onClick={() => setShowFullTHD(!showFullTHD)}
          >
            {showFullTHD ? "Hide Details" : "Show More Details"}
          </button>

          {showFullTHD && (
            <div className="thd-grid">
              <div className="thd-item">
                <span>THD I1</span>
                <span>{data.thd.details.thdI1}%</span>
              </div>
              <div className="thd-item">
                <span>THD I2</span>
                <span>{data.thd.details.thdI2}%</span>
              </div>
              <div className="thd-item">
                <span>THD I3</span>
                <span>{data.thd.details.thdI3}%</span>
              </div>
              <div className="thd-item">
                <span>THD U1-N</span>
                <span>{data.thd.details.thdU1N}%</span>
              </div>
              <div className="thd-item">
                <span>THD U2-N</span>
                <span>{data.thd.details.thdU2N}%</span>
              </div>
              <div className="thd-item">
                <span>THD U3-N</span>
                <span>{data.thd.details.thdU3N}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
