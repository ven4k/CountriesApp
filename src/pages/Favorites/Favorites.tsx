import { useEffect } from "react";
import { useAppSelector, } from "../../store/hooks";
import { FavoriteItem } from "./FavoriteItem/FavoriteItem";
import { FavoriteEmptyItem } from "./FavoriteEmptyItem/FavoriteEmptyItem";
import styles from './Favorites.module.scss';




export const Favorites = () => {
    const favorites = useAppSelector(state => state.countriesList.favorites)

    useEffect(() => {
        localStorage.setItem('element', JSON.stringify(favorites))
    }, [favorites])


    return (
        <div className={styles.favoritePage}>
            {favorites.length
            ?
            <FavoriteItem />
            :
            <FavoriteEmptyItem />}
        </div>
    )
}