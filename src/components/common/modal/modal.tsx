
import { PropsWithChildren } from "react";
import styles from "./modal.module.scss";
import { createPortal } from "react-dom";

import closeIcon from '../../../assets/close-icon.svg'

type ModalProps = PropsWithChildren & {
    onHide:()=>void
}

export const Modal = ({children, onHide}:ModalProps) => {
    return createPortal(<div className={styles.wrapper}>
        <div className={styles.backdrop}></div>
        <div className={styles.container}>
            <button className={styles.closeIcon} onClick={onHide}>
                <img src={closeIcon} alt="close-icon"/>
            </button>
            {children}
        </div>
    </div>, document.body)
}