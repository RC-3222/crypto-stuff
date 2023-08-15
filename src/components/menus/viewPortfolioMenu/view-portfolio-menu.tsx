import { PortfolioItem } from "../../../types"
import { Button } from "../../common/button"
import { Modal } from "../../common/modal"

import styles from './view-portfolio-menu.module.scss'


type AddCoinMenuProps = {
    onHide:()=>void
    portfolio:PortfolioItem[]
}

export const ViewPorfolioMenu = ({onHide, portfolio}:AddCoinMenuProps) => {

    const removeItemHandler = (id:string) => {
        console.log(`id for removal: ${id}`)
    }

    return <Modal onHide={onHide}>
        <ul className={styles.list}>
            {portfolio.map((item)=><li key={item.id} className={styles.listItem}>
                <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemAmount}>{item.amount}</span>
                </div>
                <Button onClick={()=>removeItemHandler(item.id)}>Remove</Button>
            </li>)}
        </ul>
    </Modal>
}