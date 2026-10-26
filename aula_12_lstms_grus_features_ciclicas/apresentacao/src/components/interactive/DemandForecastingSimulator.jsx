import React, { useState } from 'react';
import { ShoppingCart, TrendingUp, Calendar, AlertCircle, RefreshCw, BarChart2 } from 'lucide-react';
import MathView from '../MathView';

export default function DemandForecastingSimulator() {
  const [lookback, setLookback] = useState(14);
  const [modelType, setModelType] = useState('gru');
  const [seasonalityFactor, setSeasonalityFactor] = useState(1.0);
  const [currentDay, setCurrentDay] = useState(30);

  // Generate synthetic daily sales data for 45 days
  // Day 0 to 44
  const totalDays = 45;
  const rawSales = [];
  
  for (let d = 0; d < totalDays; d++) {
    const dayOfWeek = d % 7; // 0=Mon, 5=Sat, 6=Sun
    let weeklyEffect = (dayOfWeek === 5 || dayOfWeek === 6) ? 35 : (dayOfWeek === 4 ? 20 : -10);
    weeklyEffect *= seasonalityFactor;
    
    const trend = d * 0.8;
    // Anomaly on day 22 (Black Friday Promo)
    const promo = (d === 22) ? 65 : (d === 23 ? 40 : 0);
    // Pseudo-random noise
    const noise = Math.sin(d * 12.3) * 6 + Math.cos(d * 5.7) * 4;
    
    const val = Math.max(10, Math.round(50 + trend + weeklyEffect + promo + noise));
    rawSales.push(val);
  }

  // Generate predictions based on selected model and lookback
  const forecastHorizon = 7;
  const historyStart = Math.max(0, currentDay - lookback);
  const historyWindow = rawSales.slice(historyStart, currentDay);
  const groundTruthFuture = rawSales.slice(currentDay, currentDay + forecastHorizon);

  // Model Predictions
  const predictions = [];
  const histMean = historyWindow.reduce((a, b) => a + b, 0) / (historyWindow.length || 1);

  for (let h = 0; h < groundTruthFuture.length; h++) {
    const futureDay = currentDay + h;
    const dayOfWeek = futureDay % 7;
    const baseWeekly = (dayOfWeek === 5 || dayOfWeek === 6) ? 35 : (dayOfWeek === 4 ? 20 : -10);
    
    if (modelType === 'moving_avg') {
      // Simple Moving Average
      predictions.push(Math.round(histMean));
    } else if (modelType === 'gru') {
      // GRU captures weekly seasonality well + mild smoothing
      const predVal = 50 + (futureDay * 0.75) + (baseWeekly * seasonalityFactor * 0.92) + (Math.sin(futureDay * 3) * 2);
      predictions.push(Math.max(10, Math.round(predVal)));
    } else if (modelType === 'lstm') {
      // LSTM captures seasonality + trend + slight variance
      const predVal = 50 + (futureDay * 0.82) + (baseWeekly * seasonalityFactor * 0.96) + (Math.cos(futureDay * 4) * 3);
      predictions.push(Math.max(10, Math.round(predVal)));
    }
  }

  // Calculate Metrics over the future forecast horizon
  let sumAbsError = 0;
  let sumSquaredError = 0;
  let sumActual = 0;
  let stockoutUnits = 0;
  let overstockUnits = 0;

  for (let i = 0; i < groundTruthFuture.length; i++) {
    const act = groundTruthFuture[i];
    const pred = predictions[i];
    const diff = pred - act;
    sumAbsError += Math.abs(diff);
    sumSquaredError += diff * diff;
    sumActual += act;

    if (pred < act) {
      stockoutUnits += (act - pred);
    } else if (pred > act) {
      overstockUnits += (pred - act);
    }
  }

  const wape = sumActual > 0 ? (sumAbsError / sumActual) * 100 : 0;
  const mae = groundTruthFuture.length > 0 ? sumAbsError / groundTruthFuture.length : 0;
  const rmse = groundTruthFuture.length > 0 ? Math.sqrt(sumSquaredError / groundTruthFuture.length) : 0;

  // Chart coordinate mapping
  const maxSale = Math.max(...rawSales, ...predictions) + 15;
  const svgWidth = 520;
  const svgHeight = 160;

  const getX = (d) => (d / (totalDays - 1)) * (svgWidth - 40) + 20;
  const getY = (v) => svgHeight - 20 - (v / maxSale) * (svgHeight - 40);

  return (
    <div className="sim-container">
      {/* Controls */}
      <div className="sim-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
          <ShoppingCart size={18} color="#0A345D" />
          <h3 style={{ fontSize: '0.92rem', color: '#0A345D', margin: 0 }}>Parâmetros da Previsão</h3>
        </div>

        <div className="control-group">
          <label>
            <span>Modelo Preditivo:</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
            <button
              className={`btn-interactive ${modelType === 'gru' ? 'active' : ''}`}
              style={{ fontSize: '0.68rem', justifyContent: 'center', background: modelType === 'gru' ? '#1BB5D8' : '#F1F5F9', color: modelType === 'gru' ? '#fff' : '#334155' }}
              onClick={() => setModelType('gru')}
            >
              GRU
            </button>
            <button
              className={`btn-interactive ${modelType === 'lstm' ? 'active' : ''}`}
              style={{ fontSize: '0.68rem', justifyContent: 'center', background: modelType === 'lstm' ? '#7CB342' : '#F1F5F9', color: modelType === 'lstm' ? '#fff' : '#334155' }}
              onClick={() => setModelType('lstm')}
            >
              LSTM
            </button>
            <button
              className={`btn-interactive ${modelType === 'moving_avg' ? 'active' : ''}`}
              style={{ fontSize: '0.68rem', justifyContent: 'center', background: modelType === 'moving_avg' ? '#FF7043' : '#F1F5F9', color: modelType === 'moving_avg' ? '#fff' : '#334155' }}
              onClick={() => setModelType('moving_avg')}
            >
              Média Móvel
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>
            <span>Janela de Contexto (Lookback <MathView math="L" />):</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{lookback} dias</span>
          </label>
          <input
            type="range"
            min="7"
            max="28"
            step="7"
            value={lookback}
            onChange={(e) => setLookback(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <span>Dia Atual de Inferência:</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>Dia {currentDay}</span>
          </label>
          <input
            type="range"
            min="20"
            max="37"
            step="1"
            value={currentDay}
            onChange={(e) => setCurrentDay(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <span>Força da Sazonalidade Semanal:</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{seasonalityFactor.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min="0.2"
            max="2.0"
            step="0.2"
            value={seasonalityFactor}
            onChange={(e) => setSeasonalityFactor(parseFloat(e.target.value))}
          />
        </div>

        {/* Business Metrics */}
        <div style={{ marginTop: 'auto', background: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0A345D' }}>Impacto Operacional (Supply Chain):</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#991B1B' }}>
            <span>Ruptura de Estoque (Stockout):</span>
            <strong>{stockoutUnits} un. perdidas</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#92400E' }}>
            <span>Excesso de Estoque (Overstock):</span>
            <strong>{overstockUnits} un. paradas</strong>
          </div>
        </div>
      </div>

      {/* Display Panel */}
      <div className="sim-display-panel">
        {/* Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <div className="metric-val-box">
            <div className="metric-label">WAPE (Supply Chain)</div>
            <div className="metric-num" style={{ color: wape < 10 ? '#166534' : wape < 20 ? '#0E7490' : '#D84315' }}>
              {wape.toFixed(1)}%
            </div>
          </div>
          <div className="metric-val-box">
            <div className="metric-label">MAE (Erro Absoluto Médio)</div>
            <div className="metric-num" style={{ color: '#0A345D' }}>
              {mae.toFixed(1)} <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>unidades/dia</span>
            </div>
          </div>
          <div className="metric-val-box">
            <div className="metric-label">RMSE (Raiz do Erro Quadrático)</div>
            <div className="metric-num" style={{ color: '#0A345D' }}>
              {rmse.toFixed(1)} <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>unidades</span>
            </div>
          </div>
        </div>

        {/* SVG Time Series Plot */}
        <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.72rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0284C7', fontWeight: 700 }}>
                <span style={{ width: '10px', height: '3px', background: '#0284C7', display: 'inline-block' }}></span> Vendas Reais Passadas
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontWeight: 700 }}>
                <span style={{ width: '10px', height: '3px', background: '#16A34A', display: 'inline-block' }}></span> Real Futuro (Ground Truth)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EA580C', fontWeight: 700 }}>
                <span style={{ width: '10px', height: '3px', background: '#EA580C', borderTop: '1px dashed #EA580C', display: 'inline-block' }}></span> Previsão D+1 a D+7
              </span>
            </div>
            <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Lookback: {lookback} dias | Horizonte: 7 dias</span>
          </div>

          {/* SVG Chart */}
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: '140px', overflow: 'visible' }}>
            {/* Background Lookback Shading */}
            <rect
              x={getX(historyStart)}
              y={10}
              width={getX(currentDay) - getX(historyStart)}
              height={svgHeight - 30}
              fill="rgba(27, 181, 216, 0.12)"
              rx={4}
            />
            {/* Future Horizon Shading */}
            <rect
              x={getX(currentDay)}
              y={10}
              width={getX(currentDay + forecastHorizon) - getX(currentDay)}
              height={svgHeight - 30}
              fill="rgba(124, 179, 66, 0.12)"
              rx={4}
            />

            {/* Current day line */}
            <line
              x1={getX(currentDay)}
              y1={10}
              x2={getX(currentDay)}
              y2={svgHeight - 20}
              stroke="#0A345D"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <text x={getX(currentDay)} y={8} fontSize="9" fill="#0A345D" textAnchor="middle" fontWeight="bold">
              Hoje (t={currentDay})
            </text>

            {/* Historical line (0 to currentDay) */}
            <path
              d={rawSales.slice(0, currentDay + 1).map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(val)}`).join(' ')}
              fill="none"
              stroke="#0284C7"
              strokeWidth="2"
            />

            {/* Ground truth future line (currentDay to currentDay + forecastHorizon) */}
            <path
              d={rawSales.slice(currentDay, currentDay + forecastHorizon + 1).map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(currentDay + idx)} ${getY(val)}`).join(' ')}
              fill="none"
              stroke="#16A34A"
              strokeWidth="2.5"
            />

            {/* Predictions line */}
            <path
              d={predictions.map((val, idx) => `${idx === 0 ? `M ${getX(currentDay)} ${getY(rawSales[currentDay])} L` : 'L'} ${getX(currentDay + idx + 1)} ${getY(val)}`).join(' ')}
              fill="none"
              stroke="#EA580C"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />

            {/* Dots on predictions */}
            {predictions.map((val, idx) => (
              <circle
                key={idx}
                cx={getX(currentDay + idx + 1)}
                cy={getY(val)}
                r="3.5"
                fill="#EA580C"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748B', marginTop: 'auto' }}>
            <span>Dia 1 (Início Histórico)</span>
            <span style={{ color: '#0E7490', fontWeight: 600 }}>Janela Deslizante alimenta o Tensor (N, L=30, D=5)</span>
            <span>Dia 45 (Horizonte Futuro)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
