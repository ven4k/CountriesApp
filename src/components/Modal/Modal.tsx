import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAppSelector } from "../../store/hooks";
import { ModalProps } from "../../types/typesComponents";
import { AboutCountry } from "../AboutCountry/AboutCountry";
import styles from './Modal.module.scss';


const modalRootElement = document.querySelector('#modal');
export const Modal: FC<ModalProps> = ({ onClose, isOpen = false }: ModalProps) => {
    const currCountry = useAppSelector(state => state.countriesList.currentCountry)
    const element = document.createElement('div')
    useEffect(() => {
        if (isOpen) {
            modalRootElement?.appendChild(element);

            return () => {
                modalRootElement?.removeChild(element);
            };
        }
    }, [isOpen, element]);


    if (isOpen) {
        return createPortal(
            <div className={styles.modalAll} onClick={onClose}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <div><img src={currCountry.flags.svg} alt="flag" /></div>
                    <AboutCountry styles={styles.countryInform} item={currCountry}/>
                </div>
            </div>,
            element,
        );
    }
    return null
}