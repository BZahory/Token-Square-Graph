import './App.css';
import React from 'react';
import TokenAllocation from './TokenAllocation.jsx';
import { CanvasTotal, CanvasWeekly, CurveOverlay } from './MultiLineGraphs';
import {
  CrossProjectDashboard,
  CrossProjectBySector,
} from "./CrossProjectDashboard";

function App() {
  return (
    <div className="App">
      <TokenAllocation />
      <CanvasTotal />
      <CanvasWeekly />
      <CurveOverlay />
      <CrossProjectDashboard />
      <CrossProjectBySector />
    </div>
  );
}

export default App;
