import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CoinInfo } from '../../types'
import { useState } from 'react'
import { HistoryChart } from '../../components/history-chart'
import { HistoryItem } from '../../types/history'
import { Button } from '../../components/common/button'
import { AddCoinMenu } from '../../components/menus/addCoinMenu'
import { getCoinPriceHistory, getCoinInfo } from '../../api'

import styles from './info-page.module.scss'
import { Loader } from '../../components/common/loader'

export const InfoPage = () => {
    const params = useParams()

    const [mainInfo, setMainInfo] = useState<CoinInfo | null>(null)
    const [historyInfo, setHistoryInfo] = useState<HistoryItem[]>([])

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const loadInfo = async () => {
        setIsLoading(true)
        const coinId = params.coinId as string
        const [coinInfo, coinHistory] = await Promise.all([
            getCoinInfo(coinId),
            getCoinPriceHistory(coinId),
        ])
        setMainInfo(coinInfo)
        setHistoryInfo(coinHistory)
        setIsLoading(false)
    }

    useEffect(() => {
        loadInfo()
    }, [])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && mainInfo && (
                <>
                    <h2 className={styles.title}>{mainInfo?.name}</h2>
                    <h3
                        className={styles.price}
                    >{`Current price (USD): ${mainInfo?.priceUsd}`}</h3>
                    <h4
                        className={styles.avgPrice}
                    >{`Average price in the last 24 hours (USD): ${mainInfo?.vwap24Hr}`}</h4>
                    <h4
                        className={styles.supply}
                    >{`Available for trading: ${mainInfo?.supply}`}</h4>
                    <Button onClick={() => setIsMenuVisible(true)}>
                        Add To Portfolio
                    </Button>
                    <h3
                        className={styles.historyTitle}
                    >{`Price history (USD)`}</h3>
                    {!!historyInfo.length && (
                        <HistoryChart data={historyInfo} />
                    )}
                    {isMenuVisible && (
                        <AddCoinMenu
                            coinToAdd={mainInfo}
                            onHide={() => setIsMenuVisible(false)}
                        ></AddCoinMenu>
                    )}
                </>
            )}
            {!isLoading && !mainInfo && (
                <div className={styles.noCoinInfo}>
                    <h3>Couldn't get any info about the selected coin</h3>
                </div>
            )}
        </>
    )
}
