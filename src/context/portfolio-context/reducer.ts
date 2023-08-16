import { PortfolioItem } from '../../types'

export enum ActionType {
    Init = 'Init',
    UpdateCurrState = 'UpdateCurrState',
    AddItem = 'AddItem',
    RemoveItem = 'RemoveItem',
}

type Action = {
    type: ActionType
    payload: any
}

export const PortfolioReducer = (state: any, action: Action) => {
    switch (action.type) {
        case ActionType.Init: {
            console.log(action.payload)
            return { ...action.payload }
        }
        case ActionType.UpdateCurrState: {
            const updatedState = { ...state, currState: action.payload }
            //localStorage.setItem('prevState', JSON.stringify(action.payload))
            return updatedState
        }
        case ActionType.AddItem: {
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
                            amount: item.amount + action.payload.amount,
                        }
                        : item
                })
            }

            // since adding an item is actually an update
            localStorage.setItem('prevState', JSON.stringify(newState))
            return { currState: [...newState], prevState: [...newState] }
        }
        case ActionType.RemoveItem: {
            const currState = state.currState as PortfolioItem[]
            console.log(currState)
            const neededItem = currState.find(
                (item: PortfolioItem) => item.id === action.payload
            )!

            // not very likely to happen, but still
            if (!neededItem) return

            const newState = currState.filter((item) => item !== neededItem)
            console.log(newState)

            // since removing an item is also an update
            localStorage.setItem('prevState', JSON.stringify(newState))
            return { currState: [...newState], prevState: [...newState] }
        }
        default:
            return state
    }
}
