import { Outlet } from 'react-router-dom'
import { Header } from './header'

import styles from './general-layout.module.scss'

export const GeneralLayout = () => {
    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <Outlet />
            </div>
        </>
    )
}
