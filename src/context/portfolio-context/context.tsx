import { PropsWithChildren, createContext, useReducer, useState } from 'react'
import { ActionType, PortfolioReducer } from './reducer'
import { PortfolioItem } from '../../types'
import { getPrevState, getCurrState, getCoinPortfolioInfo } from './utils'

type InitialPortfolioState = {
    currState: PortfolioItem[]
    prevState: PortfolioItem[]
    init: () => Promise<void>
    isUpdating: boolean
    refreshPriceDiff: () => Promise<void>
    addItem: (id: string, amount: number) => Promise<void>
    removeItem: (id: string) => Promise<void>
}

const initialState: InitialPortfolioState = {
    currState: [],
    prevState: [],
    isUpdating: false,
    init: async () => {},
    refreshPriceDiff: async () => {},
    addItem: async (id: string) => {},
    removeItem: async (id: string) => {},
}

export const PortfolioContext = createContext(initialState)

export const PortfolioContextProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(PortfolioReducer, initialState)
    const [isUpdating, setIsUpdating] = useState(false)

    const init = async () => {
        setIsUpdating(true)

        const prevState = getPrevState()
        const currState = await getCurrState(prevState)

        dispatch({ type: ActionType.Init, payload: { currState, prevState } })

        setIsUpdating(false)
    }

    const refreshPriceDiff = async (wasUpdating = false) => {
        if (!wasUpdating) setIsUpdating(true)

        const currState = await getCurrState(state.prevState)
        dispatch({ type: ActionType.UpdateCurrState, payload: currState })

        if (!wasUpdating) setIsUpdating(false)
    }

    const addItem = async (id: string, amount: number) => {
        setIsUpdating(true)

        const [portfolioItem] = await Promise.all([
            getCoinPortfolioInfo(id, amount),
            refreshPriceDiff(true),
        ])

        if (!portfolioItem) {
            setIsUpdating(false)
            return
        }

        dispatch({ type: ActionType.AddItem, payload: portfolioItem })

        setIsUpdating(false)
    }

    const removeItem = async (id: string) => {
        setIsUpdating(true)

        await refreshPriceDiff(true)

        dispatch({ type: ActionType.RemoveItem, payload: id })

        setIsUpdating(false)
    }

    return (
        <PortfolioContext.Provider
            value={{
                currState: state.currState,
                prevState: state.prevState,
                isUpdating,
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
