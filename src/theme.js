import { assign } from "lodash";
// Colors
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

const blueGrey50 = "#ECEFF1";
const blueGrey300 = "#90A4AE";
const blueGrey700 = "#455A64";
const grey900 = "#212121";

// Typography
const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
const letterSpacing = "normal";
const fontSize = 12;

// Layout
const padding = 8;
const baseProps = {
  width: 350,
  height: 350,
  padding: 50,
};

// * Labels
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: blueGrey700,
  stroke: "transparent",
  strokeWidth: 0,
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);

// Strokes
const strokeDasharray = "10, 5";
const strokeLinecap = "round";
const strokeLinejoin = "round";

// Put it all together...
const theme = {
  area: assign(
    {
      style: {
        data: {
          fill: grey900,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  axis: assign(
    {
      style: {
        axis: {
          fill: "transparent",
          stroke: blueGrey300,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin,
        },
        axisLabel: assign({}, centeredLabelStyles, {
          padding,
          stroke: "transparent",
        }),
        grid: {
          fill: "none",
          stroke: blueGrey50,
          strokeDasharray,
          strokeLinecap,
          strokeLinejoin,
          pointerEvents: "painted",
        },
        ticks: {
          fill: "transparent",
          size: 5,
          stroke: blueGrey300,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        tickLabels: assign({}, baseLabelStyles, {
          fill: blueGrey700,
        }),
      },
    },
    baseProps
  ),
  polarDependentAxis: assign({
    style: {
      ticks: {
        fill: "transparent",
        size: 1,
        stroke: "transparent",
      },
    },
  }),
  bar: assign(
    {
      style: {
        data: {
          fill: blueGrey700,
          padding,
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  boxplot: assign(
    {
      style: {
        max: { padding, stroke: blueGrey700, strokeWidth: 1 },
        maxLabels: assign({}, baseLabelStyles, { padding: 3 }),
        median: { padding, stroke: blueGrey700, strokeWidth: 1 },
        medianLabels: assign({}, baseLabelStyles, { padding: 3 }),
        min: { padding, stroke: blueGrey700, strokeWidth: 1 },
        minLabels: assign({}, baseLabelStyles, { padding: 3 }),
        q1: { padding, fill: blueGrey700 },
        q1Labels: assign({}, baseLabelStyles, { padding: 3 }),
        q3: { padding, fill: blueGrey700 },
        q3Labels: assign({}, baseLabelStyles, { padding: 3 }),
      },
      boxWidth: 20,
    },
    baseProps
  ),
  candlestick: assign(
    {
      style: {
        data: {
          stroke: blueGrey700,
        },
        labels: assign({}, baseLabelStyles, { padding: 5 }),
      },
      candleColors: {
        positive: "#ffffff",
        negative: blueGrey700,
      },
    },
    baseProps
  ),
  chart: baseProps,
  errorbar: assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: blueGrey700,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  group: assign(
    {
      colorScale: colors,
    },
    baseProps
  ),
  histogram: assign(
    {
      style: {
        data: {
          fill: blueGrey700,
          stroke: grey900,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: "vertical",
    titleOrientation: "top",
    style: {
      data: {
        type: "circle",
      },
      labels: baseLabelStyles,
      title: assign({}, baseLabelStyles, { padding: 5 }),
    },
  },
  line: assign(
    {
      style: {
        data: {
          fill: "transparent",
          opacity: 1,
          stroke: blueGrey700,
          strokeWidth: 2,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  pie: assign(
    {
      colorScale: colors,
      style: {
        data: {
          padding,
          stroke: blueGrey50,
          strokeWidth: 1,
        },
        labels: assign({}, baseLabelStyles, { padding: 20 }),
      },
    },
    baseProps
  ),
  scatter: assign(
    {
      style: {
        data: {
          fill: blueGrey700,
          opacity: 1,
          stroke: "transparent",
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
    },
    baseProps
  ),
  stack: assign(
    {
      colorScale: colors,
    },
    baseProps
  ),
  tooltip: {
    style: assign({}, baseLabelStyles, { padding: 0, pointerEvents: "none" }),
    flyoutStyle: {
      stroke: grey900,
      strokeWidth: 1,
      fill: "#f0f0f0",
      pointerEvents: "none",
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10,
  },
  voronoi: assign(
    {
      style: {
        data: {
          fill: "transparent",
          stroke: "transparent",
          strokeWidth: 0,
        },
        labels: assign({}, baseLabelStyles, {
          padding: 5,
          pointerEvents: "none",
        }),
        flyout: {
          stroke: grey900,
          strokeWidth: 1,
          fill: "#f0f0f0",
          pointerEvents: "none",
        },
      },
    },
    baseProps
  ),
};

export default theme;
