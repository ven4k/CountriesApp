import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import styles from './Header.module.scss';

export const Header: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    return (
        <header className={styles.header}>
            <div className={styles.headerItems}>
                <NavLink className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })} to='/'>Home</NavLink>
                <NavLink className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })} to='/favorites'>Favorites</NavLink>
                <NavLink className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })} to='/found-country'>Guess the country</NavLink>
            </div>
            <div>
                <div className={clsx(styles.burgerMenu, { [styles.burgerMenuActive]: isOpen })} onClick={handleClick}></div>
                <div className={clsx(styles.navBarNonActive, { [styles.navBarActive]: isOpen })}>
                    <div className={styles.items} onClick={handleClick}>
                        <NavLink className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })} to='/'>Home</NavLink>
                        <NavLink className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })} to='/favorites'>Favorites</NavLink>
                        <NavLink className={({ isActive }) => clsx(styles.link, { [styles.activeLink]: isActive })} to='/found-country'>Guess the country</NavLink>
                    </div>

                </div>
            </div>
        </header>
    )
}