import { FC } from "react";
import { NavLink } from "react-router-dom"
import styles from './Header.module.scss';

export const Header:FC = () => {
    
    return (
        <header className={styles.header}>
            <NavLink className={({isActive}) => isActive ? styles.activeLink : ''} to='/'>Home</NavLink>
            <NavLink className={({isActive}) => isActive ? styles.activeLink : ''} to='/favorites'>Favorites</NavLink>
            <NavLink className={({isActive}) => isActive ? styles.activeLink : ''} to='/found-country'>Guess the country</NavLink>
        </header>
    )
}