import React, { useState, useRef } from 'react';
import axios from 'axios';
import Input from '../components/Input/Input';
import SideBar from '../components/SideBar/SideBar';
type Props = {}

var isReset = false;
var response = null;

const AddUser = (props: Props) => {
  const [characterLeft, setCharacterLeft] = useState(250);
  const [index, setIndex] = useState<number>(0);
  const [type, setType] = useState<"button" | "submit" | "reset" | undefined>("button");


  const labelRef = useRef<any>();

  function resetError(e: React.FormEvent<HTMLFormElement>) {
    const error = document.getElementById("error-message");

    if(error != undefined)
        error.innerHTML = "";

    isReset = true;
}
  function moveLabel() {
    labelRef.current.style.bottom = "9rem";
    labelRef.current.style.color = "rgb(255, 255, 255)";
    labelRef.current.style.fontSize = "0.86rem";
    labelRef.current.style.transition = "font-size 1s, bottom 1s, color 0.5s linear 0.3s";
  }

  function returnToInitial(e: React.FocusEvent<HTMLTextAreaElement, Element>) {
    if (e.target.value === "") {
      labelRef.current.style.bottom = "8rem";
      labelRef.current.style.color = "rgb(156, 163, 175)";
      labelRef.current.style.fontSize = "initial";
      labelRef.current.style.transition = "font-size 1s, bottom 1s, color 0.5s linear 0.3s";
    }
  }

  async function createUser(e: React.FormEvent<HTMLFormElement>) {

    const inputFields = document.getElementsByClassName("create-user-input") as HTMLCollectionOf<HTMLElement>;
    var missing = false;
    if(index === 0) {
        for(let i = 0; i < inputFields.length; i++) {
            const field = inputFields[i] as HTMLTextAreaElement | HTMLInputElement;
            if(field.value === "") {
                const label = document.getElementsByClassName("create-user-input-label")[i] as HTMLLabelElement;
                label.style.color = "#B91C1C";
                missing = true;
            }
        }
        const error = document.getElementById("error-message");
        if(missing) {
            if(error != undefined)
                error.innerHTML = "Please fill in the required fields marked with a '*'.";
            isReset = false;
            return;
        }
    }
    e.preventDefault();
    axios.defaults.withCredentials = true;
    response = await axios.post("http://localhost:5000/Auth/register", {
      username: (inputFields[0] as HTMLTextAreaElement | HTMLInputElement).value,
      password: (inputFields[1] as HTMLTextAreaElement | HTMLInputElement).value,
      email: (inputFields[2] as HTMLTextAreaElement | HTMLInputElement).value,
      firstname: (inputFields[3] as HTMLTextAreaElement | HTMLInputElement).value,
      lastname: (inputFields[4] as HTMLTextAreaElement | HTMLInputElement).value,
    }).then((res: { data: any; }) => { return res.data });

    console.log(response);
  }
  return (
    <div className="flex">
      <SideBar></SideBar>
      <form id='course-form' className='row mx-4 p-20r ' onSubmit={(e) => createUser(e)} onChange={(e) => !isReset ? resetError(e): {}}>
        <div className='row tab mx-auto pt-10 bg-navbar w-700 rounded-t-2xl shadow-xl justify-self-center'>
          <h1 className='text-center text-3xl pb-6 text-white'>Add User</h1>
          <div className="col">
            <Input required={true} placeholder={"User Name *"} />
            <Input required={true} placeholder={"Password *"} />
            <Input required={true} placeholder={"Email"} />

          </div>
          <div className="col">
            <Input required={true} placeholder={"First Name *"} />
            <Input required={true} placeholder={"Last Name *"} />
          </div>
          <div className='mx-auto w-700 rounded-b-2xl bg-navbar'>
            <p id='error-message' className='text-red-700 h-auto mb-2 text-center'></p>
            <div className='text-center flex justify-center '>
              <button id='submit-btn' type={type} className=" text-lg hover:bg-navlink-bg hover:text-gray-900 hover:rounded-md h-10 mb-4 items-center py-2 px-4 ml-3 font-medium text-navlink-bg bg-transparent">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Add User
              </button>
            </div>
          </div>
        </div>
      </form>

    </div>
  )
}


export default AddUser;
