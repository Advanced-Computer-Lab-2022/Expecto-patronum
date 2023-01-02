import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GiEarthAmerica } from 'react-icons/gi';
import { AiOutlineClear } from 'react-icons/ai';
import countryList from 'react-select-country-list';
import DataContext from '../../../../context/DataContext';
import axios from "axios";
import Currency from 'iso-country-currency';


type Props = {}

const SelectCountry = (props: Props) => {

    const selectRef = useRef<any>();
    const selectCountryRef = useRef<any>();
    const inputCountryRef = useRef<any>();
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [countries, setCountries] = useState(Currency.getAllISOCodes());
    const { Rate, SetRate } = useContext(DataContext);
    const selectDiv = classNames(`${isOptionsOpen ? 'h-48 pb-2 border-1.5': 'h-0'} flex flex-col absolute top-14 z-18 right-16 w-48 m-2 mt-3 overflow-hidden rounded-lg transition-all duration-300 bg-white`);

    const filterSearch = () => {
        const includedCountries = Currency.getAllISOCodes().filter((country) => (
            country.countryName.toLowerCase().includes(inputCountryRef.current.value.toLowerCase())
        ));
        setCountries(includedCountries);
    }

    const selectCountry = async (e: any, country: any) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        let  response = await axios
          .get("http://localhost:5000/User/countryRate", {
            params: {
              country: country.iso,
            },
          })
          .then((res: { data: any }) => {
            return res.data;
          });
        localStorage.setItem("rate", response.rate);
        localStorage.setItem("curr", response.curr);
        localStorage.setItem("country", country.value);
        SetRate({ ...response, Country: country.value });
        var x = localStorage.getItem("rate");
    }

    useEffect(() => {
        let RateInfo = localStorage.getItem("rate");
        let Curr = localStorage.getItem("curr");
        let Country = localStorage.getItem("country");
        console.log(RateInfo, Curr, Country);
    
        if (RateInfo !== null && Curr !== null && Country !== null) {
          SetRate({
            rate: parseInt(RateInfo),
            curr: Curr,
            Country: Country,
          });
        }
      }, []);

      const close = (e: any) => {
        if(selectRef.current && !selectRef.current?.contains(e.target)) {
          setIsOptionsOpen(false);
        }
      }
    
      useEffect(() => {
        document.addEventListener("mouseup", close);
      }, [])

    async function resetRate() {
      axios.defaults.withCredentials = true;
      let  response = await axios
        .get("http://localhost:5000/User/countryRate", {
          params: {
            country: "US",
          },
        })
        .then((res: { data: any }) => {
          return res.data;
        });
      localStorage.setItem("rate", response.rate);
      localStorage.setItem("curr", response.curr);
      localStorage.setItem("country", "US");
      SetRate({ ...response, Country: "US" });
      var x = localStorage.getItem("rate");
      inputCountryRef.current.value = '';
      filterSearch();
    }

  return (
    <div ref={selectCountryRef}>
        <button type="button" onClick={() => setIsOptionsOpen(true)} className={selectButton}><GiEarthAmerica className={selectButtonIcon} /></button>
        <div ref={selectRef} className={selectDiv} >
            <input ref={inputCountryRef} type='text' placeholder='Search' onChange={filterSearch} className={selectSearch} />
            <button type='button' onClick={resetRate} className='absolute text-sm right-2 top-2 bg-calm-red h-4 flex items-center text-white rounded-full p-1.5 hover:bg-canadian-red transition-all duration-200'>reset</button>
            <div className={allCountries}>
                <form>
                {countries.map((country) => (
                    <button key={country.iso} className={countryStyle} onClick={(e) => selectCountry(e, country)}>{country.countryName}</button>
                ))}
                </form>
            </div>
        </div>
      </div>
  )
}

const selectSearch = classNames('rounded-full relative pl-2 m-1 bg-white shadow-md focus:outline-0');
const selectButton = classNames("navbar-link rounded-full border-1.5 border-black hover:text-white hover:bg-black hover:scale-110 mx-2 h-8 w-8 whitespace-nowrap z-10 transition-all duration-300 flex items-center justify-center");
const selectButtonIcon = classNames("scale-110 pointer-events-none");
const allCountries = classNames("w-full flex flex-col overflow-y-scroll mt-2");
const countryStyle = classNames('relative mx-auto w-full hover:bg-canadian-red hover:text-white rounded-full');

export default SelectCountry;