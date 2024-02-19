import { FC } from "react"
import styles from './InfoBlock.module.scss';
import { ButtonsBlock } from "../ButtonsBlock/ButtonsBlock";
import { ApiData } from "../../../../types/favoriteTypes";
import { removeFavoriteList } from "../../../../store/favoritesSlice";
import { useAppDispatch } from "../../../../store/hooks";

interface IInfoBlock {
    item: ApiData,
}

export const InfoBlock: FC<IInfoBlock> = ({ ...props }) => {
    const { item } = props
    const dispatch = useAppDispatch();

    const handleClick = (item: ApiData) => {
        dispatch(removeFavoriteList(item));
    }
    return (
        <div className={styles.favoriteMainInfo}>
            <div className={styles.countryName}>{item.name.common}</div>
            <div><img className={styles.countryFlag} src={item.flags.svg} alt='country-flag' /></div>
            <ButtonsBlock onClick={() => handleClick(item)} />
        </div>
    )
}