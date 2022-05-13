import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTooltip,
  VictoryAxis,
  VictoryLegend,
  VictoryTheme,
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

const groupBySector = (data) => {
  const defi = data.filter((o) => o.sector === "DEFI");
  const nft = data.filter((o) => o.sector === "NFT");

  const average = (category, key) =>
    category.reduce((acc, curr) => acc + curr[key], 0) / category.length;

  const grouped = [
    [
      ...categories.map((cat) => ({
        x: cat,
        y: average(defi, cat),
        fill: "tomato",
        label: "defi",
      })),
    ],
    [
      ...categories.map((cat) => ({
        x: cat,
        y: average(nft, cat),
        fill: "orange",
        label: "nft",
      })),
    ],
  ];

  return grouped;
};

export const CrossProjectBySector = () => {
  const grouped = groupBySector(cleanedAllocations);
  return (
    <div className="container">
      <h1 className="text-4xl">Cross Project Comparison Average By Sector</h1>
      <div className="col-span-12 flex items-center">
        <VictoryChart
          height={200}
          width={500}
          padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
        >
          <VictoryGroup offset={25}>
            {grouped.map((alloc, i) => (
              <VictoryBar
                key={i}
                data={alloc}
                style={{ labels: { fontSize: 8 } }}
                labels={({ datum }) => datum.label}
                // labelComponent={<VictoryTooltip />}
                categories={{ x: alloc.x }}
              />
            ))}
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
};

export const CrossProjectDashboard = () => {
  const grouped = cleanedAllocations.map((allocation) =>
    formatData(allocation)
  );

  return (
    <div className="container">
      <h1 className="text-4xl">Cross Project Comparison By Allocation</h1>
      <div className="col-span-12 flex items-center">
        <VictoryChart
          height={400}
          width={550}
          padding={{ top: 50, bottom: 50, left: 50, right: 50 }}
          theme={VictoryTheme.material}
        >
          <VictoryGroup
            offset={5}
            // padding={{ bottom: 50, left: 50, right: 50 }}
          >
            {/* <VictoryAxis
              dependentAxis
              height={400}
              offsetY={200}
              standalone={false}
            />

            <VictoryAxis
              // domain={[-10, 10]}
              standalone={false}
              tickValues={categories}
              // offsetY={200}
            /> */}
            {grouped.map((alloc, i) => (
              <VictoryBar
                key={i}
                data={alloc}
                style={{ labels: { fontSize: 6 } }}
                // labelComponent={<VictoryTooltip />}
                labels={({ datum }) => datum.label}
                categories={{ x: alloc.x }}
              />
            ))}
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
};

// export default CrossProjectDashboard;
