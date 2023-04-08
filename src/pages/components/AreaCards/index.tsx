import { ReactNode } from 'react'
import styles from '@/styles/areaCard.module.css'

type Props = {
    children: ReactNode;
}

export const  AreaCards = ({children}:Props) =>{
    return(
        <div className={styles.Container}>
            {children}
        </div>
    )
}

export default AreaCards;