import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { GiEarthAmerica } from 'react-icons/gi';
import countryList from 'react-select-country-list';

type Props = {}

const SelectCountry = (props: Props) => {

    const selectRef = useRef<any>();
    const selectCountryRef = useRef<any>();
    const [countries, setCountries] = useState(countryList().getData());

    const filterSearch = (e: any) => {
        const includedCountries = countryList().getData().filter((country) => (
            country.label.toLowerCase().includes(e.target.value.toLowerCase())
        ));
        setCountries(includedCountries);
    }

    function toggleSelect() {
        selectRef.current.classList.toggle("h-0");
        selectRef.current.classList.toggle("h-48");
        selectRef.current.classList.toggle("pb-2");
        selectRef.current.classList.toggle("border-1.5");
        if(!selectRef.current.classList.contains("h-0"))
            selectRef.current.children[0].focus();
    }

    const selectCountry = (e: any, country: any) => {
        console.log(country.value, country.label);
        
        e.preventDefault();
    }

    // useEffect(() => {
    //     document.onmouseup = ((e) => {

    //         const selectCountryButton = selectCountryRef.current?.children[0].getBoundingClientRect();
    //         const selectCountryData = selectCountryRef.current?.children[1].getBoundingClientRect();
    
    //         const isMouseOnButtonY = e.clientY <= (selectCountryButton.y + selectCountryButton.height - 2) && e.clientY >= (selectCountryButton.y - 2);
    //         const isMouseOnButtonX = e.clientX <= (selectCountryButton.x + selectCountryButton.width + 2) && e.clientX >= Math.floor(selectCountryButton.x);
    
    //         const isMouseOnSelectY = e.clientY <= (selectCountryData.y + selectCountryData.width - 2) && e.clientY >= (selectCountryData.y);
    //         const isMouseOnSelectX = e.clientX <= (selectCountryData.x + selectCountryData.width - 2) && e.clientX >= Math.floor(selectCountryData.x);
    
    //         if(!(isMouseOnButtonX && isMouseOnButtonY)) {
    //             if(!(isMouseOnSelectX && isMouseOnSelectY)) {
    //                 selectRef.current.classList.add("h-0");
    //                 selectRef.current.classList.remove("h-48");
    //                 selectRef.current.classList.remove("pb-2");
    //                 selectRef.current.classList.remove("border-1.5");
    //             }
    //         }
            
    //     });
    // },[])

    function closeSearch() {
        selectRef.current.classList.add("h-0");
        selectRef.current.classList.remove("h-48");
        selectRef.current.classList.remove("pb-2");
        selectRef.current.classList.remove("border-1.5");
    }

  return (
    <div ref={selectCountryRef}>
        <button type="button" onClick={toggleSelect} className={selectButton}><GiEarthAmerica className={selectButtonIcon} /></button>
        <div onBlur={closeSearch} ref={selectRef} className={selectDiv}>
            <input type='text' placeholder='Search' onChange={filterSearch} className={selectSearch} />
            <div className={allCountries}>
                <form>
                {countries.map((country) => (
                    <button key={country.value} className={countryStyle} onClick={(e) => selectCountry(e, country)}>{country.label}</button>
                ))}
                </form>
            </div>
        </div>
      </div>
  )
}

const selectDiv = classNames("flex flex-col absolute top-14 z-10 right-0 w-48 h-0 m-2 mt-3 overflow-hidden rounded-lg transition-all duration-300 bg-main");
const selectSearch = classNames('rounded-lg relative pl-2 m-px bg-white shadow-md focus:outline-0');
const selectButton = classNames("navbar-link rounded-full border-1.5 border-black hover:text-white hover:bg-black hover:scale-110 mx-2 h-8 w-8 whitespace-nowrap z-10 transition-all duration-300 flex items-center justify-center");
const selectButtonIcon = classNames("scale-110 pointer-events-none");
const allCountries = classNames("w-full flex flex-col overflow-y-scroll mt-2");
const countryStyle = classNames('relative mx-auto w-full hover:bg-canadian-red hover:text-white rounded-full');

export default SelectCountry;