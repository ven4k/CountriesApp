import { useState, ChangeEvent, useEffect, FC } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { Pagination } from "../../components/Pagination/Pagination";
import { TextfieldStyles } from "../../components/TextFieldStyles/TextFieldStyles";
import styles from './Main.module.scss';

export const Main: FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const countries = useAppSelector(state => state.countriesList.countries)
    const favorites = useAppSelector(state => state.countriesList.favorites)
    const err = useAppSelector(state => state.countriesList.error)
    const loading = useAppSelector(state => state.countriesList.loading)

    //Обновления localstorage всяккий раз, когда меняется состояние избранного
    useEffect(() => {
        localStorage.setItem('element', JSON.stringify(favorites))
    }, [favorites])


    // Получение данных с инпута
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    // Фильтрация массива по данным с инпута
    const filtered = countries.filter(el => el.name.common.toLowerCase().includes(inputValue && inputValue.toLowerCase()))

    return (
        <div className={styles.main}>
            <div className={styles.searchInput}>
                <TextField label="Search" variant="outlined" onChange={handleChange}
                    sx={TextfieldStyles}
                    value={inputValue} />
            </div>
            <div>
                {err && <h2>{err}</h2>}
                {loading && <CircularProgress size="10rem" />}
                <div>
                    <Pagination filtered={filtered} />
                </div>
            </div>
        </div>
    )
}