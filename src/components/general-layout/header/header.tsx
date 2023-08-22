import { useContext, useEffect, useMemo, useState } from 'react'

import { CoinInfo, PortfolioItem } from '../../../types'

import { Button } from '../../common/button'
import { ViewPorfolioMenu } from '../../menus/view-portfolio-menu'

import { PortfolioContext } from '../../../context'
import { getPopularCoins } from '../../../api'

import styles from './header.module.scss'
import { coinNameStr, valueStr } from '../../../utils'

export const Header = () => {
    const [topCoins, setTopCoins] = useState<CoinInfo[]>([])

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const context = useContext(PortfolioContext)

    const getPrice = (portfolio: PortfolioItem[]) =>
        portfolio.reduce(
            (acc, currItem) => acc + currItem.amount * currItem.priceUsd,
            0
        )

    const [prevPrice, setPrevPrice] = useState(0)
    const [currPrice, setCurrPrice] = useState(0)

    const loadTopData = async () => {
        setIsLoadingTopData(true)
        const data = await getPopularCoins()
        setTopCoins(data)
        setIsLoadingTopData(false)
    }

    const [isLoadingTopData, setIsLoadingTopData] = useState(true)

    useEffect(() => {
        setPrevPrice(getPrice(context.prevState))
    }, [context.prevState])

    useEffect(() => {
        setCurrPrice(getPrice(context.currState))
    }, [context.currState])

    const priceStyle = useMemo(
        () =>
            currPrice - prevPrice > 0
                ? styles['portfolioBlock__priceDiff_pos']
                : styles['portfolioBlock__priceDiff_neg'],
        [currPrice, prevPrice]
    )

    const priceStr = useMemo(() => {
        const priceDiff = currPrice - prevPrice
        if (!priceDiff) return ''

        const priceDiffPercent = Math.abs(priceDiff / prevPrice)

        return ` ${priceDiff > 0 ? '+' : '-'} ${Math.abs(priceDiff).toFixed(2)} (${priceDiffPercent.toFixed(2)} %)`
    }, [currPrice, prevPrice])

    useEffect(() => {
        loadTopData()
    }, [])

    return (
        <header className={styles.header}>
            <div className={styles.topCoinBlock}>
                <span>TOP-3 Popular Coins</span>
                {isLoadingTopData && <span>Loading data...</span>}
                {!!topCoins.length && !isLoadingTopData && (
                    <ul className={styles.topCoinContainer}>
                        {topCoins.map((item) => (
                            <li className={styles.topCoin} key={item.id}>
                                <span>{coinNameStr(item.name, item.symbol)}</span>
                                {' - '}
                                <span>{valueStr(+item.priceUsd)} USD</span>
                            </li>
                        ))}
                    </ul>
                )}
                {!topCoins.length && !isLoadingTopData && <span>No data</span>}
            </div>
            <div className={styles.portfolioBlock}>
                <div className={styles.portfolioBlock__labels}>
                    <span>Portfolio Info</span>
                    {context.isUpdating ? (
                        <span>Updating...</span>
                    ) : (
                        <span>
                            <span>{currPrice.toFixed(2)} USD</span>
                            {priceStr && (
                                <span className={priceStyle}>{priceStr}</span>
                            )}
                        </span>
                    )}
                </div>
                <div className={styles.portfolioBlock__controls}>
                    <Button onClick={() => setIsMenuVisible(true)}>
                        More Info
                    </Button>
                    <Button onClick={() => context.refreshPriceDiff()}>
                        Refresh
                    </Button>
                </div>
            </div>
            {isMenuVisible && (
                <ViewPorfolioMenu onHide={() => setIsMenuVisible(false)} />
            )}
        </header>
    )
}
