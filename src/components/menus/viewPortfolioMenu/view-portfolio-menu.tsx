import { useContext } from 'react'
import { PortfolioContext } from '../../../context'
import { Button } from '../../common/button'
import { Modal } from '../../common/modal'

import styles from './view-portfolio-menu.module.scss'
import { Loader } from '../../common/loader'

type AddCoinMenuProps = {
    onHide: () => void
}

export const ViewPorfolioMenu = ({ onHide }: AddCoinMenuProps) => {
    const context = useContext(PortfolioContext)

    const removeItemHandler = (id: string) => {
        context.removeItem(id)
    }

    return (
        <Modal onHide={onHide}>
            {context.isUpdating && <Loader />}
            {!context.currState.length && !context.isUpdating && (
                <h3>There are no coins in your portfolio yet.</h3>
            )}
            {!!context.currState.length && !context.isUpdating && (
                <ul className={styles.list}>
                    {context.currState.map((item) => (
                        <li key={item.id} className={styles.list__item}>
                            <div className={styles.item__info}>
                                <span className={styles.item__info__name}>
                                    {item.name}
                                </span>
                                <span className={styles.item__info__price}>
                                    {`${item.priceUsd.toFixed(2)} USD * ${
                                        item.amount
                                    }`}
                                </span>
                            </div>
                            <Button onClick={() => removeItemHandler(item.id)}>
                                Remove
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </Modal>
    )
}
