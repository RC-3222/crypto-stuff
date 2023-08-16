import { MouseEventHandler, PropsWithChildren } from 'react'

import styles from './button.module.scss'

type ButtonProps = PropsWithChildren & {
    onClick?: MouseEventHandler
    type?: 'button' | 'submit' | 'reset'
}

export const Button = ({ onClick, children, type }: ButtonProps) => {
    return (
        <button type={type} className={styles.btn} onClick={onClick}>
            {children}
        </button>
    )
}
