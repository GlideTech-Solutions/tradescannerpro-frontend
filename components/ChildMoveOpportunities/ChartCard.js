import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useMemo, useState } from "react";
import clsx from "clsx";
import StatsRow from "./StatsRow";
import { useTheme } from "@/context/ThemeContext";

const raw = [
  { date: "2024-08-01", price: 182.1, volume: 12.2 },
  { date: "2024-08-02", price: 189.3, volume: 10.5 },
  { date: "2024-08-03", price: 201.0, volume: 9.8 },
  { date: "2024-08-04", price: 194.5, volume: 11.9 },
  { date: "2024-08-05", price: 205.4, volume: 13.2 },
  { date: "2024-08-06", price: 197.2, volume: 8.7 },
  { date: "2024-08-07", price: 188.6, volume: 12.1 },
  { date: "2024-08-08", price: 208.3, volume: 15.2 },
  { date: "2024-08-09", price: 233.4, volume: 18.4 },
  { date: "2024-08-10", price: 231.0, volume: 17.9 },
  { date: "2024-08-11", price: 223.4, volume: 14.7 },
  { date: "2024-08-12", price: 207.2, volume: 16.1 },
  { date: "2024-08-13", price: 191.6, volume: 12.2 },
  { date: "2024-08-14", price: 204.5, volume: 10.9 },
  { date: "2024-08-15", price: 229.3, volume: 13.5 },
  { date: "2024-08-16", price: 221.5, volume: 9.9 },
  { date: "2024-08-17", price: 239.1, volume: 16.8 },
  { date: "2024-08-18", price: 232.6, volume: 14.3 },
  { date: "2024-08-19", price: 235.2, volume: 15.0 },
];

const timeframes = ["1H", "1D", "M", "3M", "6M", "Y"];

function formatMoney(n) {
  return `$${n.toFixed(2)}`;
}

export default function ChartCard() {
  const { isDarkMode } = useTheme();
  const [tf, setTF] = useState("M");

  const data = useMemo(() => raw, []);

  const lastClose = data[data.length - 1]?.price ?? 0;
  const changePct = +(((lastClose - data[0].price) / data[0].price) * 100).toFixed(2);

  return (
    <div className={`cards ${isDarkMode ? 'cards-dark' : 'cards-light'}`}>
      {/* Header */}
      <div className="headers">
        <div className="tokens">
          <div className="icons" />
          <div>
            <div className={`symbols ${isDarkMode ? 'dark' : ''}`}>SOL</div>
            <div className={`names ${isDarkMode ? 'dark' : ''}`}>Solana</div>
          </div>
        </div>

        <div className="priceBlocks">
          <div className={`prices ${isDarkMode ? 'dark' : 'light'}`}>{formatMoney(lastClose)}</div>
          <div className={clsx("pcts", changePct >= 0 ? "up" : "down")}>
            {changePct >= 0 ? "▲" : "▼"} {Math.abs(changePct).toFixed(2)}% (24h)
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbars">
        <div className="pills">
          <span className="pill">
            <span className="swatch50" /> MA50: <b>406.98</b>
          </span>
          <span className="pill">
            <span className="swatch200" /> MA200: <b>400.25</b>
          </span>
        </div>

        <div className="tabs">
          {timeframes.map((t) => (
            <button
              key={t}
              className={clsx("tab", t === tf && "tabActive")}
              onClick={() => setTF(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="chartWrap">
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={data} margin={{ top: 10, right: 24, bottom: 8, left: 0 }}>
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2AD69D" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#2AD69D" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#163248" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#7C9DBA", fontSize: 12 }}
              axisLine={{ stroke: "#22425C" }}
              tickLine={{ stroke: "#22425C" }}
              minTickGap={24}
              padding={{ left: 8, right: 8 }}
              tickFormatter={(d) => new Date(d).getDate().toString()}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#7C9DBA", fontSize: 12 }}
              axisLine={{ stroke: "#22425C" }}
              tickLine={{ stroke: "#22425C" }}
              width={64}
              tickFormatter={(v) => `$${v.toFixed(0)}`}
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <YAxis yAxisId="vol" hide domain={[0, "dataMax + 5"]} />

            <Tooltip
              cursor={{ stroke: "#7EE6BE", strokeOpacity: 0.25 }}
              contentStyle={{
                background: "#0E2435",
                border: "1px solid #23465F",
                borderRadius: 12,
                color: "#CFE7F7",
                padding: "8px 10px",
              }}
              formatter={(value, name) => {
                if (name === "volume") return [`${value}M`, "Vol"];
                return [formatMoney(value), "Price"];
              }}
              labelFormatter={(label) => {
                const d = new Date(label);
                return d.toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                });
              }}
            />

            {/* Volume bars */}
            <Bar
              yAxisId="vol"
              dataKey="volume"
              barSize={4}
              radius={[2, 2, 0, 0]}
              fill="#2B9BE0"
              opacity={0.5}
            />

            {/* Price area line */}
            <Area
              type="monotone"
              dataKey="price"
              stroke="#2AD69D"
              strokeWidth={3}
              fill="url(#areaFill)"
              dot={false}
              activeDot={{ r: 5, stroke: "#0B2A2F", strokeWidth: 2, fill: "#77F2C0" }}
              yAxisId="right"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Stats row */}
      <StatsRow isDarkMode={isDarkMode} />

    </div>
  );
}

function Stat({ label, value, valueTag, accent = false }) {
  return (
    <div className="stat">
      <div className="statLabel">{label}</div>
      {value ? (
        <div className="statValue">{value}</div>
      ) : (
        <span className={clsx("tag", accent && "tagAccent")}>{valueTag}</span>
      )}
    </div>
  );
}
