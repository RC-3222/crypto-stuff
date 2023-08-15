import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Area } from "recharts"
import { HistoryItem } from "../../types/history"

import styles from './history-chart.module.scss'

type HistoryChartProps = {
  data:HistoryItem[]
}


const formatXAxis = (tickItem:number) => {
  return new Date(tickItem).toLocaleDateString();
}

export const HistoryChart = ({data}:HistoryChartProps) => {
  return <ResponsiveContainer width="80%" height={460}>
    <AreaChart data={data}  className={styles.chart}> //
      <XAxis dataKey="time" tickFormatter={formatXAxis} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Area type="monotone" dataKey="priceUsd" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </ResponsiveContainer>
}