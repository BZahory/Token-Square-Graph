import {
  VictoryLine,
  VictoryLabel,
  VictoryChart,
  VictoryLegend,
  VictoryAxis,
  VictoryArea,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";
import { useState } from "react";
import { getEmissionSchedule } from "./schedule";
import { canvas } from "./tokenschedules";
import { crvSchedule } from "./curveSchedule";
import { crvPriceData } from "./curve";

const toVictoryData = (line) => {
  return line.datapoints.map((dp) => ({
    name: line.name,
    x: dp.x,
    y: dp.y,
  }));
};

const toVictoryLegend = (line) => {
  return line.color
    ? {
        name: line.name,
        symbol: {
          fill: line.color,
        },
      }
    : { name: line.name };
};

export function CanvasTotal() {
  const [series, setSeries] = useState([
    {
      name: "Canvas - Treasury",
      color: "#c33",
      datapoints: getEmissionSchedule(canvas.allocations)["Treasury"].map(
        (x) => ({ x: x[3], y: x[0] })
      ),
    },
    {
      name: "Canvas - Seed Investors",
      color: "#3c3",
      datapoints: getEmissionSchedule(canvas.allocations)["Seed Investors"].map(
        (x) => ({ x: x[3], y: x[0] })
      ),
    },
    {
      name: "Canvas - Team and Advisors",
      color: "#39d",
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Team and Advisors"
      ].map((x) => ({ x: x[3], y: x[0] })),
    },
    {
      name: "Canvas - Community Initiatives",
      color: "#93c",
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Community Initiatives"
      ].map((x) => ({ x: x[3], y: x[0] })),
    },
    {
      name: "Canvas - Ecosystem Development",
      color: "#32f",
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Ecosystem Development"
      ].map((x) => ({ x: x[3], y: x[0] })),
    },
  ]);
  const [hiddenSeries, setHiddenSeries] = useState(new Set());
  const buildEvents = () => {
    return series.map((_, idx) => {
      return {
        childName: ["legend"],
        target: ["data", "labels"],
        eventKey: String(idx),
        eventHandlers: {
          onClick: () => {
            return [
              {
                childName: ["area-" + idx],
                target: "data",
                eventKey: "all",
                mutation: () => {
                  if (!hiddenSeries.delete(idx)) {
                    // Was not already hidden => add to set
                    hiddenSeries.add(idx);
                  }
                  setHiddenSeries(new Set(hiddenSeries));
                  return null;
                },
              },
            ];
          },
          onMouseOver: () => {
            return [
              {
                childName: ["area-" + idx],
                target: "data",
                eventKey: "all",
                mutation: (props) => {
                  return {
                    style: { ...props.style, strokeWidth: 4, fillOpacity: 0.5 },
                  };
                },
              },
            ];
          },
          onMouseOut: () => {
            return [
              {
                childName: ["area-" + idx],
                target: "data",
                eventKey: "all",
                mutation: () => {
                  return null;
                },
              },
            ];
          },
        },
      };
    });
  };
  return (
    <VictoryChart
      height={200}
      width={500}
      padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
      events={buildEvents()}
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          radius={5}
          labels={({ datum }) =>
            `Week: ${Math.round(datum.x, 2)}, Tokens: ${Math.round(datum.y, 2)}`
          }
        />
      }
    >
      <VictoryAxis
        axisLabelComponent={<VictoryLabel dy={-35} />}
        label="Total tokens"
        style={{
          axisLabel: { fontSize: 10, padding: 30 },
          tickLabels: { fontSize: 10, padding: 5 },
        }}
        dependentAxis
      />

      <VictoryAxis
        label="Week"
        style={{
          axisLabel: { fontSize: 10, padding: 30 },
          tickLabels: { fontSize: 10, padding: 5 },
        }}
      />
      {series.map((s, idx) => {
        if (hiddenSeries.has(idx)) {
          return undefined;
        }
        return (
          <VictoryArea
            key={"area-" + idx}
            name={"area-" + idx}
            data={toVictoryData(s)}
            style={{
              data: {
                fill: s.color,
                fillOpacity: 0.2,
                stroke: s.color,
                strokeWidth: 1,
              },
            }}
          />
        );
      })}
      <VictoryLegend
        name={"legend"}
        orientation="horizontal"
        itemsPerRow={2}
        style={{ labels: { fontSize: 8 } }}
        data={series.map((s, idx) => {
          const item = toVictoryLegend(s);
          if (hiddenSeries.has(idx)) {
            return { ...item, symbol: { fill: "#999" } };
          }
          return item;
        })}
        height={90}
      />
    </VictoryChart>
  );
}

export function CanvasWeekly() {
  const [series, setSeries] = useState([
    {
      name: "Canvas - Treasury",
      color: "#c33",
      datapoints: getEmissionSchedule(canvas.allocations)["Treasury"].map(
        (x) => ({ x: x[3], y: x[1] })
      ),
    },
    {
      name: "Canvas - Seed Investors",
      color: "#3c3",
      datapoints: getEmissionSchedule(canvas.allocations)["Seed Investors"].map(
        (x) => ({ x: x[3], y: x[1] })
      ),
    },
    {
      name: "Canvas - Team and Advisors",
      color: "#39d",
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Team and Advisors"
      ].map((x) => ({ x: x[3], y: x[1] })),
    },
    {
      name: "Canvas - Community Initiatives",
      color: "#93c",
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Community Initiatives"
      ].map((x) => ({ x: x[3], y: x[1] })),
    },
    {
      name: "Canvas - Ecosystem Development",
      color: "#32f",
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Ecosystem Development"
      ].map((x) => ({ x: x[3], y: x[1] })),
    },
  ]);
  const [hiddenSeries, setHiddenSeries] = useState(new Set());
  const buildEvents = () => {
    return series.map((_, idx) => {
      return {
        childName: ["legend"],
        target: ["data", "labels"],
        eventKey: String(idx),
        eventHandlers: {
          onClick: () => {
            return [
              {
                childName: ["area-" + idx],
                target: "data",
                eventKey: "all",
                mutation: () => {
                  if (!hiddenSeries.delete(idx)) {
                    // Was not already hidden => add to set
                    hiddenSeries.add(idx);
                  }
                  setHiddenSeries(new Set(hiddenSeries));
                  return null;
                },
              },
            ];
          },
          onMouseOver: () => {
            return [
              {
                childName: ["area-" + idx],
                target: "data",
                eventKey: "all",
                mutation: (props) => {
                  return {
                    style: { ...props.style, strokeWidth: 4, fillOpacity: 0.5 },
                  };
                },
              },
            ];
          },
          onMouseOut: () => {
            return [
              {
                childName: ["area-" + idx],
                target: "data",
                eventKey: "all",
                mutation: () => {
                  return null;
                },
              },
            ];
          },
        },
      };
    });
  };
  return (
    <VictoryChart
      height={200}
      width={500}
      padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
      events={buildEvents()}
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          radius={5}
          labels={({ datum }) =>
            `Week: ${Math.round(datum.x, 2)}, Tokens: ${Math.round(datum.y, 2)}`
          }
        />
      }
    >
      <VictoryAxis
        axisLabelComponent={<VictoryLabel dy={-35} />}
        label="Tokens Minted Weekly"
        style={{
          axisLabel: { fontSize: 10, padding: 30 },
          tickLabels: { fontSize: 10, padding: 5 },
        }}
        dependentAxis
      />

      <VictoryAxis
        label="Week"
        style={{
          axisLabel: { fontSize: 10, padding: 30 },
          tickLabels: { fontSize: 10, padding: 5 },
        }}
      />
      {series.map((s, idx) => {
        if (hiddenSeries.has(idx)) {
          return undefined;
        }
        return (
          <VictoryArea
            key={"area-" + idx}
            name={"area-" + idx}
            data={toVictoryData(s)}
            style={{
              data: {
                fill: s.color,
                fillOpacity: 0.2,
                stroke: s.color,
                strokeWidth: 1,
              },
            }}
          />
        );
      })}
      <VictoryLegend
        name={"legend"}
        orientation="horizontal"
        itemsPerRow={2}
        style={{ labels: { fontSize: 8 } }}
        data={series.map((s, idx) => {
          const item = toVictoryLegend(s);
          if (hiddenSeries.has(idx)) {
            return { ...item, symbol: { fill: "#999" } };
          }
          return item;
        })}
        height={90}
      />
    </VictoryChart>
  );
}

export function CurveOverlay() {
  const [series, setSeries] = useState([
    {
      name: "Curve - Founder",
      color: "#c33",
      datapoints: crvSchedule["founder"].map((x, i) => ({
        y: x,
        x:
          new Date(
            crvSchedule["dates"][i] - crvSchedule["dates"][0]
          ).getTime() / 604800000,
      })),
    },
    {
      name: "Curve - Investors",
      color: "#3c3",
      datapoints: crvSchedule["investors"].map((x, i) => ({
        y: x,
        x:
          new Date(
            crvSchedule["dates"][i] - crvSchedule["dates"][0]
          ).getTime() / 604800000,
      })),
    },
    {
      name: "Curve - Employees",
      color: "#39d",
      datapoints: crvSchedule["employees"].map((x, i) => ({
        y: x,
        x:
          new Date(
            crvSchedule["dates"][i] - crvSchedule["dates"][0]
          ).getTime() / 604800000,
      })),
    },
    {
      name: "Curve - Early Users",
      color: "#93c",
      datapoints: crvSchedule["earlyusers"].map((x, i) => ({
        y: x,
        x:
          new Date(
            crvSchedule["dates"][i] - crvSchedule["dates"][0]
          ).getTime() / 604800000,
      })),
    },
    {
      name: "Curve - Inflation",
      color: "#32f",
      datapoints: crvSchedule["inflation"].map((x, i) => ({
        y: x,
        x:
          new Date(
            crvSchedule["dates"][i] - crvSchedule["dates"][0]
          ).getTime() / 604800000,
      })),
    },
  ]);
  const [hiddenSeries, setHiddenSeries] = useState(new Set());
  const buildEvents = () => {
    return series.map((_, idx) => {
      return {
        childName: ["legend"],
        target: ["data", "labels"],
        eventKey: String(idx),
        eventHandlers: {
          onClick: () => {
            return [
              {
                childName: ["area-" + idx],
                target: "data",
                eventKey: "all",
                mutation: () => {
                  if (!hiddenSeries.delete(idx)) {
                    // Was not already hidden => add to set
                    hiddenSeries.add(idx);
                  }
                  setHiddenSeries(new Set(hiddenSeries));
                  return null;
                },
              },
            ];
          },
          onMouseOver: () => {
            return [
              {
                childName: ["area-" + idx],
                target: "data",
                eventKey: "all",
                mutation: (props) => {
                  return {
                    style: { ...props.style, strokeWidth: 4, fillOpacity: 0.5 },
                  };
                },
              },
            ];
          },
          onMouseOut: () => {
            return [
              {
                childName: ["area-" + idx],
                target: "data",
                eventKey: "all",
                mutation: () => {
                  return null;
                },
              },
            ];
          },
        },
      };
    });
  };
  return (
    <VictoryChart
      domain={{ x: [0, 90] }}
      height={200}
      width={500}
      padding={{ top: 50, bottom: 50, left: 75, right: 75 }}
      events={buildEvents()}
      theme={VictoryTheme.material}
      containerComponent={
        <VictoryVoronoiContainer
          radius={5}
          labels={({ datum }) => `Week: ${datum.x}, Tokens: ${datum.y}`}
        />
      }
    >
      {/* <VictoryLine
        standalone={true}
        interpolation="bundle"
        key={"crv-price"}
        name="crv-price"
        data={crvPriceData.map((x, i) => ({
          x:
            new Date(
              new Date(crvPriceData[i]["Date"]) -
                new Date(crvPriceData[crvPriceData.length - 1]["Date"])
            ).getTime() / 604800000,
          y: x.Close,
        }))}
      /> */}

      <VictoryAxis
        axisLabelComponent={<VictoryLabel dy={-35} />}
        label="Total Tokens"
        style={{
          axisLabel: { fontSize: 10, padding: 30 },
          tickLabels: { fontSize: 10, padding: 5 },
        }}
        dependentAxis
      />

      <VictoryAxis
        label="Week"
        style={{
          axisLabel: { fontSize: 10, padding: 30 },
          tickLabels: { fontSize: 10, padding: 5 },
        }}
      />
      {series.map((s, idx) => {
        if (hiddenSeries.has(idx)) {
          return undefined;
        }
        return (
          <VictoryLine
            key={"area-" + idx}
            name={"area-" + idx}
            data={toVictoryData(s)}
            style={{
              data: {
                fill: s.color,
                fillOpacity: 0.2,
                stroke: s.color,
                strokeWidth: 1,
              },
            }}
          />
        );
      })}

      <VictoryLegend
        name={"legend"}
        orientation="horizontal"
        itemsPerRow={2}
        style={{ labels: { fontSize: 8 } }}
        data={series.map((s, idx) => {
          const item = toVictoryLegend(s);
          if (hiddenSeries.has(idx)) {
            return { ...item, symbol: { fill: "#999" } };
          }
          return item;
        })}
        height={90}
      />
    </VictoryChart>
  );
}
