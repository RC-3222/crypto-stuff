import { Link } from 'react-router-dom'
import { CoinInfo } from '../../../types'

import styles from './coin.module.scss'
import { Button } from '../../common/button'
import { AddCoinMenu } from '../../menus/addCoinMenu'
import { useState } from 'react'

type CoinProps = {
    item: CoinInfo
}

export const Coin = ({ item }: CoinProps) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    return (
        <li className={styles.coinItem}>
            <Link to={`/coins/${item.id}`}>
                <span>{`${item.name} - ${
                    +item.priceUsd >= 0.01
                        ? (+item.priceUsd).toFixed(2)
                        : 'less than 0.01'
                } USD`}</span>
            </Link>
            <Button
                onClick={() => {
                    setIsMenuVisible(true)
                    console.log('ItemClicked')
                }}
            >
                +
            </Button>
            {isMenuVisible && (
                <AddCoinMenu
                    coinToAdd={item}
                    onHide={() => setIsMenuVisible(false)}
                ></AddCoinMenu>
            )}
        </li>
    )
}
