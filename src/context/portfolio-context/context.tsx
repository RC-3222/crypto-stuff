import { PropsWithChildren, createContext, useReducer } from 'react'
import { ActionType, PortfolioReducer } from './reducer'
import { PortfolioItem } from '../../types'
import { getPrevState, getCurrState } from './utils'

type InitialPortfolioState = {
    /** Current portfolio state */
    currState: PortfolioItem[]
    /** Previous portfolio state */
    prevState: PortfolioItem[]
    /** Init porfolio state */
    init: () => Promise<void>
    /** Refresh price difference between current and previous portfolio states (by updating a current one) */
    refreshPriceDiff: () => Promise<void>
    /** Add a new item to the portfolio (with full state update)
     * 
     * @param item an item to add
     */
    addItem: (item: PortfolioItem) => Promise<void>
    /** Remove an item from the portfolio (with full state update)
     * 
     * @param id id of an item to remove
     */
    removeItem: (id: string) => Promise<void>
}

const initialState: InitialPortfolioState = {
    currState: [],
    prevState: [],
    init: async () => { },
    refreshPriceDiff: async () => { },
    addItem: async (item: PortfolioItem) => { },
    removeItem: async (id: string) => { },
}

export const PortfolioContext = createContext(initialState)

export const PortfolioContextProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(PortfolioReducer, initialState)

    const init = async () => {
        const prevState = getPrevState()
        const currState = await getCurrState(prevState)

        dispatch({ type: ActionType.Init, payload: { currState, prevState } })
    }

    const refreshPriceDiff = async () => {
        const currState = await getCurrState(state.prevState)
        dispatch({ type: ActionType.UpdateCurrState, payload: currState })
    }

    const addItem = async (item: PortfolioItem) => {
        // update existing data
        await refreshPriceDiff()

        // add new data
        dispatch({ type: ActionType.AddItem, payload: item })
    }

    const removeItem = async (id: string) => {
        // update existing data
        await refreshPriceDiff()

        // remove item from updated data
        dispatch({ type: ActionType.RemoveItem, payload: id })
    }

    return (
        <PortfolioContext.Provider
            value={{
                currState: state.currState,
                prevState: state.prevState,
                init,
                refreshPriceDiff,
                addItem,
                removeItem,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    )
}
