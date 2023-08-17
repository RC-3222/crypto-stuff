import { PortfolioItem } from '../../types'

export enum ActionType {
    Init = 'Init',
    UpdateCurrState = 'UpdateCurrState',
    AddItem = 'AddItem',
    RemoveItem = 'RemoveItem',
}

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key
          }
        : {
              type: Key
              payload: M[Key]
          }
}

type Payload = {
    [ActionType.Init]: State
    [ActionType.UpdateCurrState]: PortfolioItem[]
    [ActionType.AddItem]: PortfolioItem
    [ActionType.RemoveItem]: string
}

type Action = ActionMap<Payload>[keyof ActionMap<Payload>]

type State = {
    currState: PortfolioItem[]
    prevState: PortfolioItem[]
}

export const PortfolioReducer = (state: State, action: Action) => {
    switch (action.type) {
        case ActionType.Init: {
            return { ...action.payload }
        }
        case ActionType.UpdateCurrState: {
            const updatedState = { ...state, currState: action.payload }
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

            localStorage.setItem('prevState', JSON.stringify(newState))
            return { currState: [...newState], prevState: [...newState] }
        }
        case ActionType.RemoveItem: {
            const neededItem = state.currState.find(
                (item: PortfolioItem) => item.id === action.payload
            )!

            if (!neededItem) return state

            const newState = state.currState.filter(
                (item: PortfolioItem) => item !== neededItem
            )

            localStorage.setItem('prevState', JSON.stringify(newState))
            return { currState: [...newState], prevState: [...newState] }
        }
        default:
            return state
    }
}
