import { getCoinInfo } from '../../api'
import { PortfolioItem } from '../../types'

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

export const getPrevState = () => {
    const prevState: PortfolioItem[] = localStorage.prevState
        ? JSON.parse(localStorage.prevState)
        : new Array<PortfolioItem>()
    return prevState
}

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
