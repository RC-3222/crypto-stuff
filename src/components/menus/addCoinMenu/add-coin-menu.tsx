import { FormEvent, useContext, useRef, useState } from 'react'
import { Modal } from '../../common/modal'
import { Button } from '../../common/button'
import { CoinInfo } from '../../../types'

import styles from './add-coin.module.scss'
import { PortfolioContext } from '../../../context'

type AddCoinMenuProps = {
    onHide: () => void
    coinToAdd: CoinInfo
}

export const AddCoinMenu = ({ onHide, coinToAdd }: AddCoinMenuProps) => {
    const [errorMessage, setErrorMessage] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const context = useContext(PortfolioContext)

    const submitHandler = (event: FormEvent) => {
        event.preventDefault()

        const numVal = Number(inputRef.current?.value)

        if (!numVal || numVal < 0) {
            setErrorMessage('The value must be a positive number')
            return
        }

        context.addItem(coinToAdd.id, numVal)
        onHide()
    }

    return (
        <Modal onHide={onHide}>
            <form className={styles.formContainer} onSubmit={submitHandler}>
                <div className={styles.inputContainer}>
                    <label htmlFor={coinToAdd.id}>Value to add:</label>
                    <input
                        className={styles.input}
                        id={coinToAdd.id}
                        ref={inputRef}
                        placeholder="value..."
                    ></input>
                    {!!errorMessage && (
                        <span className={styles.error}>{errorMessage}</span>
                    )}
                </div>
                <Button type="submit">Add</Button>
            </form>
        </Modal>
    )
}
