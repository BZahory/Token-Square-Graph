import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTooltip,
  VictoryAxis,
} from "victory";
import { cleanedAllocations } from "./tokenallocation";

const sectors = ["DEFI", "NFT"];

const categories = ["presale", "privateInvestors", "community", "team"];

function formatData(data) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (categories.includes(key)) {
      acc.push({ x: key, y: value, label: data.projectName });
    }
    return acc;
  }, []);
}

const CrossProjectDashboard = () => {
  const grouped = cleanedAllocations.map((allocation) =>
    formatData(allocation)
  );

  const g = grouped.slice(0, 4);

  return (
    <div className="container">
      <h1 className="text-4xl">Cross Project Comparison</h1>
      <div className="col-span-12 flex items-center">
        <VictoryChart
          domainPadding={50}
        >
          <VictoryGroup offset={5}>
            {/* TODO: fix the scale, add labels */}
            {grouped.map((alloc, i) => (
              <VictoryBar
                key={i}
                data={alloc}
                labelComponent={<VictoryTooltip />}
                categories={{ x: alloc.x }}
              />
            ))}
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
};

export default CrossProjectDashboard;
