import { PortfolioItem } from '../../types'

type Action = {
    type:
        | 'updatePortfolio'
        | 'addItem'
        | 'removeItem'
        | 'setCurrPortfolio'
        | 'setPrevPortfolio'
    payload: any
}

export const PortfolioReducer = (state: any, action: Action) => {
    switch (action.type) {
        case 'setCurrPortfolio': {
            return { ...state, currState: action.payload }
        }
        case 'setPrevPortfolio': {
            return { ...state, prevState: action.payload }
        }
        case 'updatePortfolio': {
            localStorage.setItem('prevState', JSON.stringify(state.currState))
            return {
                currState: state.currState,
                prevState: [...state.currState],
            }
        }
        case 'addItem': {
            let newState

            const existingItem = state.currState.find(
                (item: PortfolioItem) => action.payload.id === item.id
            )

            if (!existingItem) newState = [...state.currState, action.payload]
            else {
                newState = state.currState.map((item: PortfolioItem) => {
                    return item === existingItem
                        ? {
                              ...existingItem,
                              priceUsd: action.payload.priceUsd,
                              amount: item.amount + action.payload.amount,
                          }
                        : item
                })
            }

            // since adding an item is actually an update
            localStorage.setItem('prevState', JSON.stringify(newState))
            return { currState: [...newState], prevState: [...newState] }
        }
        case 'removeItem': {
            const currState = state.currState as PortfolioItem[]
            const neededItem = currState.find(
                (item: PortfolioItem) => item.id === action.payload
            )!

            const newState = currState.filter((item) => item !== neededItem)

            // since adding an item is also an update
            localStorage.setItem('prevState', JSON.stringify(newState))
            return { currState: [...newState], prevState: [...newState] }
        }
        default:
            return state
    }
}
