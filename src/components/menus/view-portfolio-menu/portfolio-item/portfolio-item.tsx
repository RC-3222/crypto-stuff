import { useContext } from 'react'
import { PortfolioContext } from '../../../../context'
import { Button } from '../../../common/button'
import { PortfolioItem as PortItem } from '../../../../types'

import styles from './portfolio-item.module.scss'
import { valueStr } from '../../../../utils'

type PortfolioItemProps = {
    item: PortItem
}

export const PortfolioItem = ({ item }: PortfolioItemProps) => {
    const context = useContext(PortfolioContext)

    const removeItemHandler = (id: string) => {
        context.removeItem(id)
    }

    return (
        <li key={item.id} className={styles.portfolioItem}>
            <div className={styles.portfolioItem__info}>
                <span className={styles.portfolioItem__info__name}>
                    {`${item.name}`}
                </span>
                <div className={styles.portfolioItem__info__general}>
                    <span className={styles.portfolioItem__info__pricePerUnit}>
                        {`Price per unit (USD): ${valueStr(item.priceUsd)}`}
                    </span>
                    <span className={styles.portfolioItem__info__amount}>
                        {`Currently in portfolio: ${item.amount}`}
                    </span>
                    <span className={styles.portfolioItem__info__priceTotal}>
                        {`Total price (USD): ${valueStr(item.priceUsd * item.amount)}`}
                    </span>
                </div>
            </div>
            <Button onClick={() => removeItemHandler(item.id)}>Remove</Button>
        </li>
    )
}
