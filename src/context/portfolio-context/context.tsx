import React, {
    PropsWithChildren,
    createContext,
    useEffect,
    useReducer,
} from 'react'
import { ActionType, PortfolioReducer } from './reducer'
import { PortfolioItem } from '../../types'
import { getPrevState, getCurrState } from '.'

type InitialPortfolioState = {
    currState: PortfolioItem[]
    prevState: PortfolioItem[]
}

const initialState = {
    currState: [],
    prevState: [],
}

export const PortfolioContext = createContext<{
    state: InitialPortfolioState
    dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })

export const PortfolioContextProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(PortfolioReducer, initialState)

    const getPortfolioData = async () => {
        const { prevState } = getPrevState()
        const { currState } = await getCurrState(prevState)

        dispatch({ type: ActionType.Init, payload: { currState, prevState } })
    }

    useEffect(() => {
        getPortfolioData()
    }, [])

    return (
        <PortfolioContext.Provider value={{ state, dispatch }}>
            {children}
        </PortfolioContext.Provider>
    )
}
