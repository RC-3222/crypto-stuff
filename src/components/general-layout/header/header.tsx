import { useContext, useEffect, useState } from 'react'

import { TOP_SIZE } from '../../../constants'
import { CoinInfo, PortfolioItem } from '../../../types'

import styles from './header.module.scss'
import { Button } from '../../common/button'
import { ViewPorfolioMenu } from '../../menus/viewPortfolioMenu'

import { PortfolioContext } from '../../../context'

export const Header = () => {
    const [topCoins, setTopCoins] = useState<CoinInfo[]>()

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const context = useContext(PortfolioContext)

    const getPrice = (portfolio: PortfolioItem[]) =>
        portfolio.reduce(
            (acc, currItem) => acc + currItem.amount * currItem.priceUsd,
            0
        )

    const [prevPrice, setPrevPrice] = useState(0)
    const [currPrice, setCurrPrice] = useState(0)

    const loadData = async () => {
        const { data } = await fetch(
            `https://api.coincap.io/v2/assets?limit=${TOP_SIZE}`
        ).then((res) => res.json())
        setTopCoins(data)
    }

    useEffect(() => {
        console.log(context.prevState instanceof Array)
        setPrevPrice(getPrice(context.prevState))
    }, [context.prevState])

    useEffect(() => {
        console.log(context.currState instanceof Array)
        setCurrPrice(getPrice(context.currState))
    }, [context.currState])

    const deltaValue = currPrice - prevPrice
    const deltaPercent = ((currPrice - prevPrice) / prevPrice) * 100

    useEffect(() => {
        loadData()
    }, [])

    return (
        <header className={styles.header}>
            <div className={styles.topCoinBlock}>
                <span>TOP-3 Popular Coins</span>
                <ul className={styles.topCoinContainer}>
                    {topCoins &&
                        topCoins.map((item) => (
                            <li className={styles.topCoin} key={item.id}>{`${item.name
                                } - ${(+item.priceUsd).toFixed(2)} USD`}</li>
                        ))}
                </ul>
            </div>
            <div className={styles.portfolioBlock}>
                <div className={styles.portfolioBlock__labels}>
                    <span>Portfolio Info</span>
                    <span>
                        <span>{currPrice.toFixed(2)} USD</span>
                        <span
                            className={
                                styles[
                                deltaValue > 0
                                    ? 'portfolioBlock__priceDiff_pos'
                                    : 'portfolioBlock__priceDiff_neg'
                                ]
                            }
                        >
                            {deltaValue !== 0 &&
                                ` ${deltaValue > 0 ? '+' : '-'} ${Math.abs(
                                    deltaValue
                                ).toFixed(2)} (${Math.abs(deltaPercent).toFixed(2)} %)`}
                        </span>
                    </span>
                </div>
                <div className={styles.portfolioBlock__controls}>
                    <Button onClick={() => setIsMenuVisible(true)}>
                        More Info
                    </Button>
                    <Button onClick={() => context.refreshPriceDiff()}>
                        Refresh Diff
                    </Button>
                </div>
            </div>

            {isMenuVisible && (
                <ViewPorfolioMenu
                    onHide={() => setIsMenuVisible(false)}
                ></ViewPorfolioMenu>
            )}
        </header>
    )
}
