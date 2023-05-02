import { useState, FC, MouseEvent, useLayoutEffect } from 'react'
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Button, Checkbox } from '@mui/material';
import { ApiData } from '../../types/favoriteTypes';
import { addFavoriteList, removeFavoriteList, ChangeCurrentCountry } from "../../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Modal } from '../Modal/Modal';
import styles from './Pagination.module.scss';
import { PaginationType } from '../../types/typesComponents';


export const Pagination: FC<PaginationType> = ({ filtered }: PaginationType) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector(state => state.countriesList.favorites);
    // Состояние для модалки
    const [activeModal, setActiveModal] = useState(false);
    // Состояние для пагинации номеров страниц
    const [pageLimit, setPageLimit] = useState<number>(8);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState<number>(8);
    const [minPageNumberLimit, setminPageNumberLimit] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(1);
    
    const PAGE_NUMBER_LIMIT: number = 4;

    // Изменение количества отображаемых флагов и переключаемых страниц для мобильных устройств
    useLayoutEffect(() => {
        if (window.matchMedia('(max-width: 500px)').matches === true) {
            setPageLimit(6)
            setmaxPageNumberLimit(6)
        }
        const handleResize = () => {
            if (window.matchMedia('(max-width: 500px)').matches === true) {
                setPageLimit(6)
                setmaxPageNumberLimit(6)
            } else {
                setPageLimit(8)
                setmaxPageNumberLimit(8)
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Пагинация
    const pages: number[] = [];
    for (let i = 1; i <= (Math.ceil(filtered.length / pageLimit)); i++) {
        pages.push(i);
    }
    const lastPagesItem = [...pages].reverse()[0]
    const firstPagesItem = [...pages][0]
    const indexOfLastItem = activePage * pageLimit;
    const indexOfFirstItem = indexOfLastItem - pageLimit;


    //Смена страниц пагинации по номеру
    const handleClick = (e: MouseEvent<HTMLElement>) => {
        const target = Number(e.currentTarget.id);
        setActivePage(target);
        if (target !== pages.length) {
            if (target >= maxPageNumberLimit) {
                setmaxPageNumberLimit(maxPageNumberLimit + PAGE_NUMBER_LIMIT);
                setminPageNumberLimit(minPageNumberLimit + PAGE_NUMBER_LIMIT);
            }
        }
        if (target !== 1) {
            if (target - minPageNumberLimit === 1) {
                setmaxPageNumberLimit(maxPageNumberLimit - PAGE_NUMBER_LIMIT);
                setminPageNumberLimit(minPageNumberLimit - PAGE_NUMBER_LIMIT);
            }

        }
    };
    // Первая страница пагинации
    const handleFirstButtonClick = (item: number) => {
        setActivePage(item);
        setmaxPageNumberLimit(pageLimit);
        setminPageNumberLimit(0);
    }
    // Последняя страница пагинации
    const handleLastButtonClick = (item: number) => {
        setActivePage(item);
        setmaxPageNumberLimit((item / PAGE_NUMBER_LIMIT) * PAGE_NUMBER_LIMIT);
        setminPageNumberLimit(((item / PAGE_NUMBER_LIMIT) * PAGE_NUMBER_LIMIT) - pageLimit);
    }

    // Следующая страница пагинации
    const handleNextbtn = () => {
        setActivePage(activePage + 1);
        if ((activePage + 1) > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + PAGE_NUMBER_LIMIT);
            setminPageNumberLimit(minPageNumberLimit + PAGE_NUMBER_LIMIT);
        }
    };
    //Предыдущая страница пагинации
    const handlePrevbtn = () => {
        setActivePage(activePage - 1);
        if (activePage !== 1) {
            if (activePage - minPageNumberLimit === 1) {
                setmaxPageNumberLimit(maxPageNumberLimit - PAGE_NUMBER_LIMIT);
                setminPageNumberLimit(minPageNumberLimit - PAGE_NUMBER_LIMIT);
            }
        }
    }
    // Диспатчинг данных в store и сохранение данных Favorites в localStorage
    const handleChange = (el: ApiData) => {
        return favorites.find((item: ApiData) => item.name.common as string === el.name.common as string)
            ? dispatch(removeFavoriteList(el))
            : (dispatch(addFavoriteList(el)), localStorage.setItem('element', JSON.stringify(favorites)))
    }

    //Открытие модалки | закрытие модалки
    const handleOpenModal = (el: ApiData) => {
        setActiveModal(true);
        dispatch(ChangeCurrentCountry(el))
    }
    const handleCloseModal = () => setActiveModal(false);

    //Отрисовка страниц пагинации
    const renderPageNumbers = pages.map((el) => {
        if (el < maxPageNumberLimit + 1 && el > minPageNumberLimit) {
            return (
                <div key={el} className={activePage === el ? styles.activePaginationItem : styles.paginationItem} id={String(el)} onClick={handleClick}>
                    {el}
                </div>
            )
        } else { return null }
    });

    return (
        <div className={styles.paginationPage}>
            <div className={styles.mapedItems}>
                {filtered.slice(indexOfFirstItem, indexOfLastItem).map((el: ApiData) => (
                    <div key={el.cca3} className={styles.currentCountry}>
                        <div className={styles.countryName}>{el.name.common}</div>
                        <div onClick={() => { handleOpenModal(el) }}><img className={styles.countryImage} src={el.flags.png} alt={el.flags.alt} /></div>
                        <div className={styles.favoriteBtnsBlock}>
                            <Checkbox icon={<FavoriteBorder className={styles.favoriteIco} />} checkedIcon={<Favorite className={styles.favoriteActiveIco} />}
                                checked={(favorites.find((item: ApiData) => item.cca3 === el.cca3) ? true : false)}
                                onChange={() => handleChange(el)} />
                        </div>
                    </div>
                ))}
                <Modal onClose={handleCloseModal} isOpen={activeModal} />
            </div>
            {filtered.length >= 1 ? (<div className={styles.paginationBlock}>
                <Button variant='outlined' className={styles.paginationBtnLeft} onClick={handlePrevbtn} disabled={activePage === 1} sx={{ marginTop: '-4px' }}>{'<<<'}</Button>
                <div className={styles.paginationItemsBlock}>{renderPageNumbers}</div>
                <Button variant='outlined' className={styles.paginationBtnRight} onClick={handleNextbtn} disabled={activePage === pages.length} sx={{ marginTop: '-4px' }}>{'>>>'}</Button>
                {minPageNumberLimit !== 0 && (
                    <div className={styles.paginationFirstPage} onClick={() => handleFirstButtonClick(firstPagesItem)}>{firstPagesItem}...</div>
                )}
                {activePage !== pages.length && (
                    <div className={styles.paginationLastPage} onClick={() => handleLastButtonClick(lastPagesItem)}>...{lastPagesItem}</div>
                )}

            </div>) : null}
        </div>
    )

}
