import { CoinInfo } from '../types'
import { API_BASE, ITEMS_PER_PAGE, TOP_SIZE } from '../constants'
import { HistoryItem } from '../types/history'

export const getCoinInfo = async (id: string) => {
    try {
        const res = await fetch(`${API_BASE}/assets/${id}`)

        if (!res.ok) throw new Error(`Could't get any coin info (id = ${id})`)

        const { data } = await res.json()

        return data as CoinInfo
    } catch (err) {
        console.error(err)
        return null
    }
}

export const getCoinPriceHistory = async (id: string) => {
    try {
        const res = await fetch(`${API_BASE}/assets/${id}/history?interval=d1`)

        if (!res.ok)
            throw new Error(
                `Could't get any history for the specified coin (id = ${id})`
            )

        const { data } = await res.json()

        return data as HistoryItem[]
    } catch (err) {
        console.error(err)
        return [] as HistoryItem[]
    }
}

export const getPageData = async (pageNum: number) => {
    try {
        const res = await fetch(
            `${API_BASE}/assets?limit=${ITEMS_PER_PAGE}&offset=${
                ITEMS_PER_PAGE * pageNum
            }`
        )

        if (!res.ok)
            throw new Error(`Could't get any page data (pageNum = ${pageNum})`)

        const { data } = await res.json()

        return data as CoinInfo[]
    } catch (err) {
        console.error(err)
        return [] as CoinInfo[]
    }
}

export const getPopularCoins = async () => {
    try {
        const res = await fetch(`${API_BASE}/assets?limit=${TOP_SIZE}`)

        if (!res.ok) throw new Error(`Could't get any data about popular coins`)

        const { data } = await res.json()

        return data as CoinInfo[]
    } catch (err) {
        console.error(err)
        return [] as CoinInfo[]
    }
}
