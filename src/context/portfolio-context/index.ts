import { PortfolioItem } from '../../types'

export * from './context'

export const getCurrState = async (prevState: PortfolioItem[]) => {
    const currState = new Array<PortfolioItem>()

    if (!prevState.length) return { currState }

    for (const item of prevState) {
        try {
            const { data } = await fetch(
                `https://api.coincap.io/v2/assets/${item.id}`
            ).then((res) => res.json())
            const newItem = {
                id: data.id,
                name: data.name,
                amount: +item.amount,
                priceUsd: +data.priceUsd,
            }

            currState.push(newItem)
        } catch (err) {
            throw err
        }
    }

    return { currState }
}

export const getPrevState = () => {
    const prevState: PortfolioItem[] = localStorage.prevState
        ? JSON.parse(localStorage.prevState)
        : new Array<PortfolioItem>()
    console.log(prevState)
    return { prevState }
}

export { ActionType } from './reducer'