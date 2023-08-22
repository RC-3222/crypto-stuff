import { useContext } from 'react'
import { PortfolioContext } from '../../../context'
import { Modal } from '../../common/modal'

import styles from './view-portfolio-menu.module.scss'
import { Loader } from '../../common/loader'
import { PortfolioItem } from './portfolio-item'

type AddCoinMenuProps = {
    onHide: () => void
}

export const ViewPorfolioMenu = ({ onHide }: AddCoinMenuProps) => {
    const context = useContext(PortfolioContext)

    return (
        <Modal onHide={onHide}>
            {context.isUpdating && <Loader />}
            {!context.currState.length && !context.isUpdating && (
                <h3>There are no coins in your portfolio yet.</h3>
            )}
            {!!context.currState.length && !context.isUpdating && (
                <ul className={styles.list}>
                    {context.currState.map((item) => (
                        <PortfolioItem key={item.id} item={item} />
                    ))}
                </ul>
            )}
        </Modal>
    )
}
