import { useState, FC, MouseEvent, useEffect } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import { ApiData } from "../../types/favoriteTypes";
import {
  addFavoriteList,
  removeFavoriteList,
  ChangeCurrentCountry,
} from "../../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Modal } from "../Modal/Modal";
import styles from "./Pagination.module.scss";
import { PaginationType } from "../../types/typesComponents";

const FLAGS_PER_PAGE = 8;
let defaultRenderedPaginationButtons = 8;
const DEFAULT_COUNT_PAGINATION_ITEMS = 4;
export const Pagination: FC<PaginationType> = ({
  filtered,
}: PaginationType) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.countriesList.favorites);
  // Состояние для модалки
  const [activeModal, setActiveModal] = useState(false);
  // Состояние для пагинации номеров страниц
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(
    defaultRenderedPaginationButtons
  );
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(1);
  const [countPaginationItems, setCountPaginationItems] = useState(
    DEFAULT_COUNT_PAGINATION_ITEMS
  );
  const [activePage, setActivePage] = useState<number>(1);

  const pages: number[] = Array.from(
    { length: Math.ceil(filtered.length / FLAGS_PER_PAGE) },
    (_, i) => i + 1
  );

  useEffect(() => {
    const savedActivePage =
      sessionStorage.getItem("activePage") !== null
        ? Number(sessionStorage.getItem("activePage"))
        : 1;
    setActivePage(savedActivePage);
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCountPaginationItems(1);
        setMaxPageNumberLimit(savedActivePage);
        setMinPageNumberLimit(savedActivePage);
        defaultRenderedPaginationButtons = 1;
      } else {
        defaultRenderedPaginationButtons = 8;
        setCountPaginationItems(DEFAULT_COUNT_PAGINATION_ITEMS);
        setMaxPageNumberLimit(
          savedActivePage < DEFAULT_COUNT_PAGINATION_ITEMS
            ? defaultRenderedPaginationButtons
            : savedActivePage + DEFAULT_COUNT_PAGINATION_ITEMS
        );
        setMinPageNumberLimit(() => {
          if (savedActivePage === pages.length) {
            return savedActivePage - defaultRenderedPaginationButtons;
          }
          if( savedActivePage < DEFAULT_COUNT_PAGINATION_ITEMS){
            return 1
          } else {
            return savedActivePage - DEFAULT_COUNT_PAGINATION_ITEMS;
          }
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pages.length, countPaginationItems]);

  // Пагинация

  const lastPagesItem = [...pages].reverse()[0];
  const indexOfLastItem = activePage * FLAGS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - FLAGS_PER_PAGE;

  //Смена страниц пагинации по номеру
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const target = Number(e.currentTarget.getAttribute("data-id"));
    setActivePage(target);
    sessionStorage.setItem("activePage", `${target}`);
    if (target === maxPageNumberLimit) {
      setMaxPageNumberLimit(
        target === pages.length ? target : target + countPaginationItems
      );
      setMinPageNumberLimit(
        target === pages.length
          ? target - defaultRenderedPaginationButtons
          : target - countPaginationItems + 1
      );
      return;
    }
    if (target === minPageNumberLimit && target > 2) {
      setMaxPageNumberLimit(target + countPaginationItems);
      setMinPageNumberLimit(target - countPaginationItems + 1);
      return;
    }
    if (target <= 2) {
      setMaxPageNumberLimit(defaultRenderedPaginationButtons);
      setMinPageNumberLimit(1);
    }
  };
  // Первая страница пагинации
  const handleFirstButtonClick = () => {
    if (activePage !== 1) {
      setActivePage(1);
      sessionStorage.setItem("activePage", "1");
      setMaxPageNumberLimit(defaultRenderedPaginationButtons);
      setMinPageNumberLimit(1);
    }
  };
  // Последняя страница пагинации
  const handleLastButtonClick = (item: number) => {
    setActivePage(item);
    sessionStorage.setItem("activePage", `${item}`);
    setMinPageNumberLimit(item - defaultRenderedPaginationButtons + 1);
    setMaxPageNumberLimit(item);
  };

  // Следующая страница пагинации
  const handleNextbtn = () => {
    setActivePage(activePage + 1);
    sessionStorage.setItem("activePage", `${activePage + 1}`);
    if (activePage === maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + countPaginationItems);
      setMinPageNumberLimit(minPageNumberLimit + countPaginationItems);
    }
  };
  //Предыдущая страница пагинации
  const handlePrevbtn = () => {
    setActivePage(activePage - 1);
    sessionStorage.setItem("activePage", `${activePage - 1}`);
    if (activePage !== 1 && activePage === minPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit - countPaginationItems);
      setMinPageNumberLimit(minPageNumberLimit - countPaginationItems);
    }
  };
  // Диспатчинг данных в store и сохранение данных Favorites в localStorage
  const handleChange = (el: ApiData) => {
    return favorites.find((item) => item.name.common === el.name.common)
      ? dispatch(removeFavoriteList(el))
      : (dispatch(addFavoriteList(el)),
        localStorage.setItem("element", JSON.stringify(favorites)));
  };

  //Открытие модалки | закрытие модалки
  const handleOpenModal = (el: ApiData) => {
    setActiveModal(true);
    dispatch(ChangeCurrentCountry(el));
  };
  const handleCloseModal = () => setActiveModal(false);

  //Отрисовка страниц пагинации
  const renderPageNumbers = pages.map((el) => {
    return (
      <div key={el}>
        {el >= minPageNumberLimit && el <= maxPageNumberLimit && (
          <div className={styles.paginationNumbersBlock}>
            <Button
              variant="outlined"
              data-id={el}
              onClick={handleClick}
              className={`${styles.paginationItem} ${
                activePage === el && styles.activePaginationItem
              }`}
            >
              {el}
            </Button>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className={styles.paginationPage}>
      <div className={styles.mapedItems}>
        {filtered
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((el: ApiData) => (
            <div key={el.cca3} className={styles.currentCountry}>
              <div className={styles.imageBlock}>
                <img
                  className={styles.countryImage}
                  src={el.flags.png}
                  alt={el.flags.alt}
                  onClick={() => handleOpenModal(el)}
                />
              </div>
              <div className={styles.favoriteBtnsBlock}>
                <Checkbox
                  icon={<FavoriteBorder className={styles.favoriteIco} />}
                  checkedIcon={
                    <Favorite className={styles.favoriteActiveIco} />
                  }
                  checked={
                    favorites.find((item) => item.cca3 === el.cca3) !==
                    undefined
                  }
                  onChange={() => handleChange(el)}
                />
              </div>
              <div className={styles.countryName}>{el.name.common}</div>
            </div>
          ))}
        <Modal onClose={handleCloseModal} isOpen={activeModal} />
      </div>
      {filtered.length >= 1 ? (
        <div className={styles.paginationBlock}>
          <Button
            variant="contained"
            className={styles.paginationBtnLeft}
            onClick={handlePrevbtn}
            disabled={activePage === 1}
            sx={{ marginTop: "-4px" }}
          >
            PREV
          </Button>
          {minPageNumberLimit !== 1 && (
            <Button
              variant="outlined"
              className={`${styles.paginationFirstPage} ${styles.paginationItem}`}
              onClick={handleFirstButtonClick}
            >
              1...
            </Button>
          )}
          <div className={styles.paginationItemsBlock}>{renderPageNumbers}</div>
          {activePage !== pages.length && (
            <Button
              variant="outlined"
              className={`${styles.paginationLastPage} ${styles.paginationItem}`}
              onClick={() => handleLastButtonClick(lastPagesItem)}
            >
              ...{lastPagesItem}
            </Button>
          )}
          <Button
            variant="contained"
            className={styles.paginationBtnRight}
            onClick={handleNextbtn}
            disabled={activePage === pages.length}
            sx={{ marginTop: "-4px" }}
          >
            NEXT
          </Button>
        </div>
      ) : (
        <div className={styles.countryNotFound}>Country not found ☹</div>
      )}
    </div>
  );
};
