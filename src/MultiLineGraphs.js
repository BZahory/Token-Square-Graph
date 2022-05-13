import {
  VictoryLine,
  VictoryLabel,
  VictoryChart,
  VictoryLegend,
  VictoryAxis,
  VictoryArea,
  VictoryTheme,
  VictoryVoronoiContainer,
  LineSegment,
} from "victory";
import { useState } from "react";
import { getEmissionSchedule } from "./schedule";
import { canvas } from "./tokenschedules";
import { crvSchedule } from "./curveSchedule";
import { crvPriceData } from "./curve";

const colors = [
  "#2C56DD",
  "#202328",
  "#3A4F97",
  "#09237D",
  "#698899",
  "#FF6B4A",
  "#3DEDD8",
  "#01D49A",
  "#3A4F97",
  "#87A0AD",
  "#FF896E",
  "#84FDE7",
  "#34DDAE",
  "#6B7AB1",
  "#A4B8C2",
  "#FEA691",
  "#A4FDEE",
  "#67E5C2",
  "#9DA7CB",
  "#C2D0D5",
  "#FFC4B7",
  "#C1FEF3",
  "#99EED7",
  "#09237D",
  "#E1E7EA",
  "#FEE1DB",
  "#E0FFF9",
  "#CCF6EB",
];

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
      name: "$HODL - Treasury",
      color: colors[0],
      datapoints: getEmissionSchedule(canvas.allocations)["Treasury"].map(
        (x) => ({ x: x[3], y: x[0] })
      ),
    },
    {
      name: "$HODL - Seed Investors",
      color: colors[1],
      datapoints: getEmissionSchedule(canvas.allocations)["Seed Investors"].map(
        (x) => ({ x: x[3], y: x[0] })
      ),
    },
    {
      name: "$HODL - Team and Advisors",
      color: colors[2],
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Team and Advisors"
      ].map((x) => ({ x: x[3], y: x[0] })),
    },
    {
      name: "$HODL - Community Initiatives",
      color: colors[3],
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Community Initiatives"
      ].map((x) => ({ x: x[3], y: x[0] })),
    },
    {
      name: "$HODL - Ecosystem Development",
      color: colors[4],
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
  return (<>
    <h1 className="text-4xl">$HODL Total Tokens By Week</h1>
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
        itemsPerRow={3}
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
    </>
  );
}

export function CanvasWeekly() {
  const [series, setSeries] = useState([
    {
      name: "$HODL - Treasury",
      color: colors[0],
      datapoints: getEmissionSchedule(canvas.allocations)["Treasury"].map(
        (x) => ({ x: x[3], y: x[1] })
      ),
    },
    {
      name: "$HODL - Seed Investors",
      color: colors[1],
      datapoints: getEmissionSchedule(canvas.allocations)["Seed Investors"].map(
        (x) => ({ x: x[3], y: x[1] })
      ),
    },
    {
      name: "$HODL - Team and Advisors",
      color: colors[2],
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Team and Advisors"
      ].map((x) => ({ x: x[3], y: x[1] })),
    },
    {
      name: "$HODL - Community Initiatives",
      color: colors[3],
      datapoints: getEmissionSchedule(canvas.allocations)[
        "Community Initiatives"
      ].map((x) => ({ x: x[3], y: x[1] })),
    },
    {
      name: "$HODL - Ecosystem Development",
      color: colors[4],
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
    <>
    <h1 className="text-4xl">Minted Tokens By Week</h1>
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
        itemsPerRow={3}
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
    </>
  );
}

export function CurveOverlay() {
  const [series, setSeries] = useState([
    {
      name: "$HODL - Founder",
      color: colors[0],
      datapoints: crvSchedule["founder"].map((x, i) => ({
        y: x,
        x:
          new Date(
            crvSchedule["dates"][i] - crvSchedule["dates"][0]
          ).getTime() / 604800000,
      })),
    },
    {
      name: "$HODL - Investors",
      color: colors[1],
      datapoints: crvSchedule["investors"].map((x, i) => ({
        y: x,
        x:
          new Date(
            crvSchedule["dates"][i] - crvSchedule["dates"][0]
          ).getTime() / 604800000,
      })),
    },
    {
      name: "$HODL - Employees",
      color: colors[2],
      datapoints: crvSchedule["employees"].map((x, i) => ({
        y: x,
        x:
          new Date(
            crvSchedule["dates"][i] - crvSchedule["dates"][0]
          ).getTime() / 604800000,
      })),
    },
    {
      name: "$HODL - Early Users",
      color: colors[3],
      datapoints: crvSchedule["earlyusers"].map((x, i) => ({
        y: x,
        x:
          new Date(
            crvSchedule["dates"][i] - crvSchedule["dates"][0]
          ).getTime() / 604800000,
      })),
    },
    {
      name: "$HODL - Inflation",
      color: colors[4],
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
    <>
    <h1 className="text-4xl">$HODL Total Tokens and Price By Week</h1>
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
          labels={({ datum }) => datum.y % 1000000 == 0 ? `Week: ${Math.round(datum.x, 2)}, Price: ${formatter.format(datum.y/10000000)}` : `Week: ${Math.round(datum.x, 2)}, Tokens: ${Math.round(datum.y, 2)}`}
        />
      }
    >

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
      <VictoryAxis dependentAxis offsetX={425}   
      tickLabelComponent={<VictoryLabel dx={50}/>}
      tickComponent={(<LineSegment />)}

              tickValues={[100000000,250000000,400000000,550000000, 700000000, 850000000]} tickFormat={(t)=>formatter.format(t/100000000)}/>
      <VictoryLine
      key={"area-" + "price"}
            name={"area-" + "price"}
    style={{
              data: {
                stroke: "black",
                strokeWidth: 1,
              },
            }}
        interpolation="bundle"
        data={
          crvPriceData.filter((x)=> new Date(x['Date']) >
            new Date(crvPriceData[crvPriceData.length - 1]['Date'])
        ).map(
          (x, i) => ({
          x:
            new Date(
              new Date(crvPriceData[i]["Date"]) -
                new Date(crvPriceData[crvPriceData.length - 1]["Date"])
            ).getTime() / 604800000,
          y: x.Close*100000000,
        }))}
      />

      <VictoryLegend
        name={"legend"}
        orientation="horizontal"
        itemsPerRow={3}
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
    </>
  );
}
