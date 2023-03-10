import { ApiData } from "../../store/favoritesSlice";

type AboutCountryType = {
    targetStyles: string,
    targetElement: ApiData;
}
export const AboutCountry = ({ targetStyles, targetElement }: AboutCountryType) => {
    return (
        <div className={targetStyles}>
            <div><span>Name: </span>{targetElement.name.common}</div>
            <div><span>Official: </span> {targetElement.name.official}</div>
            <div><span>Region: </span> {targetElement.region}</div>
            <div><span>Languages: </span> {Object.values(targetElement.languages).join(', ')}</div>
            <div><span>Population: </span>{targetElement.population} people</div>
            <div><span>Timezones: </span>{targetElement.timezones?.join(', ')}</div>
        </div>


    )
}