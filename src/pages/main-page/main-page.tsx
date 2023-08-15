import { useState, useEffect } from "react"
import { ITEMS_PER_PAGE } from "../../constants"
import { CoinInfo } from "../../types"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../components/common/button"

import styles from './main-page.module.scss'
import { CoinList } from "../../components/coin-list"

export const MainPage = () => {
    const [currentCoins, setCurrentCoins] = useState<CoinInfo[]>()

    const location = useLocation()

    const navigate = useNavigate()

    const [currPage, setCurrPage] = useState(0)

    const loadData = async (currPage:number) => {
        const {data} = await fetch(`https://api.coincap.io/v2/assets?limit=${ITEMS_PER_PAGE}&offset=${ITEMS_PER_PAGE*currPage}`).then((res)=>res.json())
        setCurrentCoins(data)
    }

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);

        const currPage = Number(queryParams.get('page')) || 0;

        setCurrPage(currPage)

        loadData(currPage)
    }, [location.search])

    return <>
        <h2>Available coins</h2>
        {currentCoins && <CoinList items={currentCoins} />}
        <div className={styles.paginationContainer}>
            {currPage > 0 && <Button onClick={()=>navigate(`?page=${currPage - 1}`)}>Previous</Button>}
            <span>{`${currPage + 1}`}</span>
            <Button onClick={()=>navigate(`?page=${currPage + 1}`)}>Next</Button>
        </div>
    </>
}

//<span>{`${currPage + 1} of ${totalPages}`}</span>
//<ul>{currentCoins && currentCoins.map((item)=><li key={item.id}>{`${item.name} - ${(+item.priceUsd).toFixed(2)}`}</li>)}</ul>
    //const [totalPages, setTotalPages] = useState(0)
        /*if (!totalPages) {
            const {data:totalData} = await fetch(`https://api.coincap.io/v2/assets`).then((res)=>res.json())
            //console.log(totalData.length)
            setTotalPages(Math.ceil(totalData.length/ITEMS_PER_PAGE))
        }*/