import { PropsWithChildren, useEffect } from 'react'
import styles from './modal.module.scss'
import { createPortal } from 'react-dom'

type ModalProps = PropsWithChildren & {
    onHide: () => void
}

export const Modal = ({ children, onHide }: ModalProps) => {
    useEffect(() => {
        document.body.classList.add(styles.noScroll)
        return () => {
            document.body.classList.remove(styles.noScroll)
        }
    }, [])

    return createPortal(
        <div className={styles.wrapper}>
            <div className={styles.backdrop}></div>
            <div className={styles.container}>
                <button className={styles.closeIcon} onClick={onHide}>
                    <img src="close-icon.svg" alt="close-icon" />
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}
