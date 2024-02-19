import { FC } from "react"
import { ApiData } from "../../types/favoriteTypes"


interface IAboutCountry {
    styles: string,
    item: ApiData,
}

export const AboutCountry: FC<IAboutCountry> = ({ ...props }) => {
    const { styles, item } = props
    return (
        <div className={styles}>
            <div><span>Name: </span>{item.name.common}</div>
            <div><span>Official: </span> {item.name.official}</div>
            <div><span>Region: </span> {item.region}</div>
            <div><span>Languages: </span> {Object.values(item.languages).join(', ')}</div>
            <div><span>Population: </span>{item.population} people</div>
            <div><span>Timezones: </span>{item.timezones?.join(', ')}</div>
        </div>


    )
}