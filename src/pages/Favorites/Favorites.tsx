import { useEffect } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import { AboutCountry } from "../../components/AboutCountry/AboutCountry";
import { ApiData, removeFavoriteList } from "../../store/favoritesSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import styles from './Favorites.module.scss';




export const Favorites = () => {
    const favorites = useAppSelector(state => state.countriesList.favorites)

    const dispatch = useAppDispatch();
    
    const handleClick = (el: ApiData) => {
        dispatch(removeFavoriteList(el));
    }
    useEffect(() => {
        localStorage.setItem('element', JSON.stringify(favorites))
    }, [favorites])

 
    return (

        <div className={styles.favoritePage}>
            {favorites.length ? (
                <>
                    {favorites.map((el: ApiData) => {
                        return (
                            <div key={el.cca3} className={styles.favoriteBlock}>
                                <div className={styles.favoriteMainInfo}>
                                    <div className={styles.countryName}>{el.name.common}</div>
                                    <div><img className={styles.countryFlag} src={el.flags.svg} alt='country-flag' /></div>
                                    <IconButton aria-label="delete" onClick={(() => handleClick(el))}>
                                        <DeleteIcon sx={{color:"white"}}/>
                                    </IconButton>
                                </div>
                                <AboutCountry targetStyles={styles.favoriteInform} targetElement={el}/>
                            </div>

                        );
                    })}
                
                </>
            ) : <h2>So far, it's empty</h2>}

        </div>
    )
}