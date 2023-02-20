import { Fragment, useMemo, useRef, useState, ChangeEvent, MouseEvent } from "react";
import { Button } from "@material-ui/core";
import { ApiData } from "../../store/favoritesSlice";
import { useAppSelector } from "../../store/hooks"
import styles from './NameTheCountry.module.scss';


type valueType = {
    [K in any]: number;
}

export const NameTheCountry = () => {
    const countries = useAppSelector((state) => state.countriesList.countries);

    const [curr, setCurr] = useState(0);
    const [isCountry, setIsCountry] = useState(false);
    const [trueCountry, setTrueCountry] = useState('');
    const [flagName, setFlagName] = useState<string>('');
    const [isRus, setIsRus] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = countries.filter(el => el.name.common.toLowerCase().includes(flagName.toLowerCase()) || el.translations.rus.common.toLowerCase().includes(flagName.toLowerCase()))
    //получение массива случайных чисел равным количеству объектов стран в сторе
    const { array } = useMemo(() => {
        let targetValue: valueType = {};
        let array: number[] = [];
        for (let i = 0; i < (countries.length - 1); ++i) {
            let random = Math.round(Math.random() * ((countries.length - 1) - i));
            array.push(((random in targetValue) ? (targetValue[random]) : random) + 1);
            let long = (countries.length - 1) - i - 1;
            targetValue[random] = (long in targetValue) ? targetValue[long] : long;
        }
        return { array }
    }, [countries])

    let arrayOfFlagIndex = [...array];
    const cyrillicPattern = /[а-яА-ЯЁё]/;
    // отрисовка флага согласно индексу массива
    const renderFlag = countries.map((el: ApiData, index) => {
        if (index === arrayOfFlagIndex[curr]) {
            return (
                <Fragment key={el.cca3}>
                    {isCountry && <h2 key={el.cca2} className={styles.hiddenNameCountry}>{el.name.common} ({el.translations.rus.common})</h2>}
                    {el.name.common.split(' ').includes('Islands') ? <h2 className={styles.flagIslands}>... Islands</h2> : el.name.common.split(' ').includes('and') && <h2 className={styles.flagIslands}>... and ...</h2>}
                    <div className={styles.flagBlock}>
                        <img src={el.flags.svg} alt="flag" />
                    </div>
                </Fragment>
            )
        } else {
            return null;
        }
    })

    // смена флага и рендер true или false на экране
    const renderIsTrue = countries.map((el, index) => {
        if (index === arrayOfFlagIndex[curr]) {
            if (trueCountry.toLowerCase() === el.name.common.toLowerCase() || trueCountry.toLowerCase() === el.translations.rus.common.toLowerCase()) {
                setTimeout(() => {
                    setCurr(curr + 1)
                    setTrueCountry('')
                }, 1000)
                return (
                    <div className={styles.resultTrue} key={el.name.common}>True</div>
                )
            } else if ((trueCountry !== '' && trueCountry.toLowerCase() !== (el.name.common.toLowerCase())) || (trueCountry !== '' && trueCountry.toLowerCase() !== el.translations.rus.common.toLowerCase())) {
                setTimeout(() => {
                    setTrueCountry('')
                }, 1000)
                return (
                    <div className={styles.resultFalse} key={el.name.official}>False</div>
                )
            }
        }
        return null
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsRus(cyrillicPattern.test(e.target.value))
        setFlagName(e.target.value);
    }
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setTrueCountry(flagName);
        setTimeout(() => {
            setFlagName('')
        }, 0)
    }
    const handleNextCountry = () => {
        setFlagName('');
        setIsCountry(true);
        setTimeout(() => {
            setCurr(curr + 1)
            setIsCountry(false)
            
        }, 1500)
    }
    const handleClickInputDatalist = (e: MouseEvent<HTMLDivElement>) => {
        inputRef.current?.focus();
        let target = e.currentTarget.getAttribute('data-id');
        setFlagName(target as string);
        setIsInputFocused(false);

    }
    const handleFocusInput = () => {
        setIsInputFocused(true)
    };

    return (
        <div className={styles.guessTheFlagPage}>
            <div>{renderFlag}</div>
            <div className={styles.formBlock}>
                <div>{renderIsTrue}</div>
                <form>
                    <input className={styles.findInput} type='text' autoComplete="off" value={flagName} onChange={handleChange} onFocus={handleFocusInput} ref={inputRef} />
                    <div className={(isInputFocused && flagName) ? styles.showedDatalist : styles.hiddenDatalist}>
                        {filtered.map(el => (
                            <div key={el.cca3} data-id={isRus ? el.translations.rus.common : el.name.common} className={styles.option} onClick={handleClickInputDatalist}>{isRus ? el.translations.rus.common : el.name.common}</div>
                        ))}
                    </div>

                    <Button variant="contained" type='submit' disabled={flagName ? false : true} className={styles.checkBtn} onClick={handleClick}>CHECK</Button>
                </form>
                <Button variant="contained" className={styles.nextBtn} disabled={isCountry ? true : false} onClick={handleNextCountry}>Next</Button>
            </div>
        </div>
    )
}