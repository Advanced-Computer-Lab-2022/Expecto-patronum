import React, { useState } from 'react'

type Props = {
    toggle: any
}

const BurgerButton = (props: Props) => {

    const [isClicked, setIsClicked] = useState(false);

    function toggleX() {

        const ingredients = Array.from(document.getElementsByClassName("hamburger-ingredients") as HTMLCollectionOf<HTMLElement>);

        props.toggle();

        if(!isClicked) {
            transformIngredient(0, 45, 10, "top");
            transformIngredient(4, 45, 10, "bottom");

            ingredients[2].style.display = "none";
  
            transformIngredient(1, -45, 8, "top");
            transformIngredient(3, -45, 8, "bottom");
            ingredients[1].style.width = "50px";
            ingredients[2].style.width = "50px";
            ingredients[3].style.width = "50px";
        } else {
            transformIngredient(0, 0, 0, "top");
            transformIngredient(4, 0, 0, "bottom");
  
            ingredients[2].style.display = "block";
  
            transformIngredient(1, 0, 0, "top");
            transformIngredient(3, 0, 0, "bottom");
        }

        setIsClicked(!isClicked);
    }
  
    function transformIngredient(index: number, transformDeg: number, posValue: number, tb: String) {

        const ingredients = Array.from(document.getElementsByClassName("hamburger-ingredients") as HTMLCollectionOf<HTMLElement>);

        ingredients[index].style.transform = `rotate(${transformDeg}deg)`;
        ingredients[index].style.position = "relative";
        if(tb === "top") {
            ingredients[index].style.top = `${posValue}px`;
        } else {
            ingredients[index].style.bottom = `${posValue}px`;
        }
    }
  
    function changeWidth() {

        const ingredients = Array.from(document.getElementsByClassName("hamburger-ingredients") as HTMLCollectionOf<HTMLElement>);

        if(!isClicked) {
            ingredients[1].style.width = "35px";
            ingredients[2].style.width = "20px";
            ingredients[3].style.width = "35px";
        } else {
            transformIngredient(0, 45, 10, "top");
            transformIngredient(4, 45, 10, "bottom");
    
            transformIngredient(1, -45, 8, "top");
            transformIngredient(3, -45, 8, "bottom");
        }
    }
  
    function returnToInitial() {
        const ingredients = Array.from(document.getElementsByClassName("hamburger-ingredients") as HTMLCollectionOf<HTMLElement>);

        if(!isClicked) {
            ingredients[1].style.width = "50px";
            ingredients[2].style.width = "50px";
            ingredients[3].style.width = "50px";
        } else {
            transformIngredient(0, 45, 13.5, "top");
            transformIngredient(4, 45, 13.5, "bottom");
    
            transformIngredient(1, -45, 4.5, "top");
            transformIngredient(3, -45, 4.5, "bottom");
        }
    }

    return (
        <button className="drawer-button nv:hidden" onClick={toggleX} onMouseOver={changeWidth} onMouseLeave={returnToInitial} >
            <hr className="hamburger-ingredients ing-1" />
            <hr className="hamburger-ingredients ing-2" />
            <hr className="hamburger-ingredients ing-3" />
            <hr className="hamburger-ingredients ing-4" />
            <hr className="hamburger-ingredients ing-5" />
        </button>
    )
}

export default BurgerButton;