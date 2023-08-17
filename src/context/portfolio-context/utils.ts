import { getCoinInfo } from '../../api'
import { PortfolioItem } from '../../types'

/** Update data for the specified (existing) state
 *
 * @param prevState state to update
 * @returns  a promise that resolves to an updated state
 */
export const getCurrState = async (prevState: PortfolioItem[]) => {
    const currState = new Array<PortfolioItem>()

    if (!prevState.length) return currState

    for (const item of prevState) {
        const coinData = await getCoinInfo(item.id)

        if (!coinData) continue

        const newItem = {
            id: coinData.id,
            name: coinData.name,
            amount: +item.amount,
            priceUsd: +coinData.priceUsd,
        }

        currState.push(newItem)
    }

    return currState
}

/** Get previous state (either get one from localStorage or create a new (empty) one)
 *
 * @returns previous state (or a new empty state)
 */
export const getPrevState = () => {
    const prevState: PortfolioItem[] = localStorage.prevState
        ? JSON.parse(localStorage.prevState)
        : new Array<PortfolioItem>()
    return prevState
}

/** Get info about the selected coin that's needed for adding it to the portfolio
 *
 * @param id id of the coin
 * @param amount amount to add
 * @returns a promise that resolves to an info about selected coin (or null, if somehow could't get any)
 */
export const getCoinPortfolioInfo = async (id: string, amount: number) => {
    const coinData = await getCoinInfo(id)

    if (!coinData) return null

    const newPortfolioItemInfo = {
        id: id,
        name: coinData.name,
        priceUsd: +coinData.priceUsd,
        amount: amount,
    }

    return newPortfolioItemInfo
}
