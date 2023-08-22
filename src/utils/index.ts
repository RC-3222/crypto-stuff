export const valueStr = (value: number) => value >= 0.01
    ? value.toFixed(2)
    : 'less than 0.01'

export const coinNameStr = (name: string, symbol: string | null = null) => !!symbol && symbol !== name
    ? `${name} (${symbol})`
    : `${name}`
