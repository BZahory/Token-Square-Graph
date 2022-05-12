import './App.css';
import React from 'react';
import TokenAllocation from './TokenAllocation.jsx';
import { CanvasTotal, CanvasWeekly, CurveOverlay } from './MultiLineGraphs';

function App() {
  return (
    <div className="App">
      <TokenAllocation />
      <CanvasTotal/>
      <CanvasWeekly/>
      <CurveOverlay/>
    </div>
  );
}

export default App;
