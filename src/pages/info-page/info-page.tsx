import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { CoinInfo } from "../../types"
import { useState } from "react"
import { HistoryChart } from "../../components/history-chart"
import { HistoryItem } from "../../types/history"
import { Button } from "../../components/common/button"
import { AddCoinMenu } from "../../components/menus/addCoinMenu"


export const InfoPage = () => {

    const params = useParams()

    const [mainInfo, setMainInfo] = useState<CoinInfo>()
    const [historyInfo, setHistoryInfo] = useState<HistoryItem[]>()


    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const loadInfo = async () => {
        const { data: mainData } = await fetch(`https://api.coincap.io/v2/assets/${params.coinId}`).then((res) => res.json())
        console.log(mainData)
        setMainInfo(mainData)

        const { data: historyData } = await fetch(`https://api.coincap.io/v2/assets/${params.coinId}/history?interval=d1`).then((res) => res.json())
        setHistoryInfo(historyData)
    }

    useEffect(() => {
        loadInfo()
    }, [])

    return <>
        {
            mainInfo && historyInfo && <>
                <h2>{mainInfo?.name}</h2>
                <h3>{`Price in USD: ${mainInfo?.priceUsd}`}</h3>
                <h4>{`Available: ${mainInfo?.supply}`}</h4>
                <Button onClick={() => setIsMenuVisible(true)}>Add To Portfolio</Button>
                <h3>{`Price history (USD)`}</h3>
                <HistoryChart data={historyInfo} />
                {isMenuVisible && <AddCoinMenu coinToAdd={mainInfo} onHide={
                    () => setIsMenuVisible(false)
                }></AddCoinMenu>}
            </>

        }
    </>

}

