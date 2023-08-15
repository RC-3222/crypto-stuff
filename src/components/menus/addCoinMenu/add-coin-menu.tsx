import { FormEvent, useRef } from "react"
import { Modal } from "../../common/modal"
import { Button } from "../../common/button"
import { CoinInfo } from "../../../types"

import styles from './add-coin.module.scss'

type AddCoinMenuProps = {
    onHide:()=>void
    coinToAdd:CoinInfo
}

export const AddCoinMenu = ({onHide, coinToAdd}:AddCoinMenuProps) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const submitHandler = (event:FormEvent) => {
        event.preventDefault()
        console.log(coinToAdd.id)
        console.log(inputRef.current?.value)

        const numVal = Number(inputRef.current?.value)
        if (!numVal || numVal <0) return;

        onHide()
    }

    return <Modal onHide={onHide}>
        <form className={styles.formContainer} onSubmit={submitHandler}>
            <div className={styles.inputContainer}>
                <label className={styles.inputLabel} htmlFor={coinToAdd.id}>Value to add:</label>
                <input className={styles.input} id={coinToAdd.id} ref={inputRef} placeholder="value..."></input>
            </div>
            <Button type="submit">Add</Button>
        </form>
    </Modal>
}