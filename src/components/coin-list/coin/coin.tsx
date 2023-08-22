import { Link } from 'react-router-dom'
import { CoinInfo } from '../../../types'

import styles from './coin.module.scss'
import { Button } from '../../common/button'
import { AddCoinMenu } from '../../menus/add-coin-menu'
import { useMemo, useState } from 'react'
import { coinNameStr, valueStr } from '../../../utils'

type CoinProps = {
    item: CoinInfo
}

export const Coin = ({ item }: CoinProps) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const nameStr = useMemo(() => coinNameStr(item.name, item.symbol), [item.name, item.symbol])
    const valStr = useMemo(() => valueStr(+item.priceUsd), [item.priceUsd])
    const supplyStr = useMemo(() => item.supply.replace(/\.?0+$/g, ''), [item.supply])

    return (
        <li className={styles.coinItem}>
            <Link to={`/coins/${item.id}`}>
                <span>{nameStr}</span>
                {' - '}
                <span>{`${valStr} USD`}</span>
                {' - '}
                <span>{`${supplyStr} available for trading`}</span>
            </Link>
            <Button onClick={() => setIsMenuVisible(true)}>+</Button>
            {isMenuVisible && (
                <AddCoinMenu
                    coinToAdd={item}
                    onHide={() => setIsMenuVisible(false)}
                />
            )}
        </li>
    )
}
