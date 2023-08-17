import { CoinInfo } from '../types'
import { API_BASE, ITEMS_PER_PAGE, TOP_SIZE } from '../constants'
import { HistoryItem } from '../types/history'

/**
 * Get info about the coin by id
 *
 * @param id id of the coin
 * @returns info about the coin (or null, if could't get any)
 */
export const getCoinInfo = async (id: string) => {
    try {
        const res = await fetch(`${API_BASE}/${id}`)

        if (!res.ok) throw new Error(`Could't get any coin info (id = ${id})`)

        const { data } = await res.json()

        return data as CoinInfo
    } catch (err) {
        console.error(err)
        return null
    }
}

/**
 * Get coin price history by coin id
 *
 * @param id id of the coin
 * @returns an array of history entries (can be empty)
 */
export const getCoinPriceHistory = async (id: string) => {
    try {
        const res = await fetch(`${API_BASE}/${id}/history?interval=d1`)

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

/**
 * Get data for the specified page
 *
 * @param pageNum page number
 * @returns an array of coin infos (can be empty)
 */
export const getPageData = async (pageNum: number) => {
    try {
        const res = await fetch(
            `${API_BASE}?limit=${ITEMS_PER_PAGE}&offset=${
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

/**
 * Get info about most popular coins available
 *
 * @returns an array of coin infos (can be empty)
 */
export const getPopularCoins = async () => {
    try {
        const res = await fetch(`${API_BASE}?limit=${TOP_SIZE}`)

        if (!res.ok) throw new Error(`Could't get any data about popular coins`)

        const { data } = await res.json()

        return data as CoinInfo[]
    } catch (err) {
        console.error(err)
        return [] as CoinInfo[]
    }
}
