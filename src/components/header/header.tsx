import { useEffect, useState } from "react"

import { TOP_SIZE } from "../../constants"
import { CoinInfo } from "../../types"


import styles from './header.module.scss'
import { Button } from "../common/button"
import { ViewPorfolioMenu } from "../menus/viewPortfolioMenu"

import { tmpPortfolioData } from "../../temp"

export const Header = () => {

    const [topCoins, setTopCoins] = useState<CoinInfo[]>()
    
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const loadData = async () => {
        const {data} = await fetch(`https://api.coincap.io/v2/assets?limit=${TOP_SIZE}`).then((res)=>res.json())
        setTopCoins(data)
    }

    useEffect(()=>{
        loadData()
    }, [])

    return <header className={styles.header}>
        <ul className={styles.topCoinContainer}>
            {topCoins && topCoins.map((item)=><li className={styles.topCoin} key={item.id}>{`${item.name} - ${(+item.priceUsd).toFixed(2)} USD`}</li>)}
        </ul>
        <div className={styles.PortfolioContainer}>
            <div className={styles.PortfolioLabelsContainer}>
                <span>Portfolio Info</span>
                <span>134,32 USD +2,38 (1,80 %)</span>
            </div>
            <Button onClick={()=>setIsMenuVisible(true)}>More Info</Button>
        </div>
        
        {isMenuVisible && <ViewPorfolioMenu portfolio={tmpPortfolioData} onHide={
            ()=>setIsMenuVisible(false)
        }></ViewPorfolioMenu> }
    </header>
}