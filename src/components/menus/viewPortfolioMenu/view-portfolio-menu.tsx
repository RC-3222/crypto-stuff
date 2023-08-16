import { useContext } from 'react'
import { PortfolioContext } from '../../../context'
import { Button } from '../../common/button'
import { Modal } from '../../common/modal'

import styles from './view-portfolio-menu.module.scss'

type AddCoinMenuProps = {
    onHide: () => void
}

export const ViewPorfolioMenu = ({ onHide }: AddCoinMenuProps) => {
    const context = useContext(PortfolioContext)

    const removeItemHandler = (id: string) => {
        context.dispatch({
            type: 'removeItem',
            payload: id,
        })
    }

    return (
        <Modal onHide={onHide}>
            <ul className={styles.list}>
                {context.state.prevState.map((item) => (
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
        </Modal>
    )
}
