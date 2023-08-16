import { PortfolioItem } from "../../types"

/** Update data for the specified existing state
 *
 * @param prevState state to update
 * @returns updated state
 */
export const getCurrState = async (prevState: PortfolioItem[]) => {
    const currState = new Array<PortfolioItem>()

    if (!prevState.length) return currState

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