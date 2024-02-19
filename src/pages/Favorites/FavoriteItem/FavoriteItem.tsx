import { FC } from "react"
import { useAppSelector } from "../../../store/hooks";
import { AboutCountry } from "../../../components/AboutCountry/AboutCountry";
import { ApiData } from "../../../types/favoriteTypes";
import { InfoBlock } from "./InfoBlock/InfoBlock";
import styles from './FavoriteItem.module.scss';


export const FavoriteItem: FC = () => {
    const favorites = useAppSelector(state => state.countriesList.favorites)

    return (
        <>
            {favorites.map((el: ApiData) => (
                <div key={el.cca3} className={styles.favoriteBlock}>
                    <InfoBlock item={el}/>
                    <AboutCountry styles={styles.favoriteInform} item={el} />
                </div>
            ))
            }
        </>
    )
}
