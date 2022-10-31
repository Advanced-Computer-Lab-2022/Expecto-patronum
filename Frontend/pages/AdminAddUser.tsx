import React, { useState, useRef } from 'react';
import axios from 'axios';
import Input from '../components/shared/Input/Input';
import SideBar from '../components/SideBar/SideBar';
type Props = {}

var isReset = false;
var response = null;
var radio: null=null;

const AddUser = (props: Props) => {
  const [characterLeft, setCharacterLeft] = useState(250);
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const [type, setType] = useState<"button" | "submit" | "reset" | undefined>("button");
  const radioRef = useRef<any>();

  const username = useRef<any>();
  const email = useRef<any>();
  const password = useRef<any>();
  const firstname = useRef<any>();
  const lastname = useRef<any>();


  function resetError(e: React.FormEvent<HTMLFormElement> ) {
    const error = document.getElementById("error-message");

    if(error != undefined)
        error.innerHTML = "";

    isReset = true;
}

  async function createUser(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    const inputFields = document.getElementsByClassName("create-course-input") as HTMLCollectionOf<HTMLElement>;
    var missing = false;
    for(let i = 0; i < inputFields.length; i++) {
      const field = inputFields[i] as HTMLTextAreaElement | any;
      if(field.nodeName === "DIV") {
          var selected = false;
          // console.log(field.children[1].children.length);
          for(let j = 0; j < field.children[1].children.length; j++) {

            // console.log(field.children[1].children[j].children[0]);

            if(field.children[1].children[j].children[0].checked) {
                radio=field.children[1].children[j].children[2].innerHTML.replace(" ", "");
                selected = true;
                break;
            }
        }
          if(!selected) {
              field.children[0].style.color = "#B91C1C";
              missing = true;
          }
      } else {
          if(field.value === "") {
              const label = document.getElementsByClassName("create-course-input-label")[i] as HTMLLabelElement;
              label.style.color = "#B91C1C";
              missing = true;
          }
      }
  }
  const error = document.getElementById("error-message");
  if(missing) {
      if(error != undefined)
          error.innerHTML = "Please fill in the required fields marked with a '*'.";
      isReset = false;
      return;
  }
    e.preventDefault();
    axios.defaults.withCredentials = true;
    response = await axios.post("http://localhost:5000/Auth/register", {
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      role: radio,
    }).then((res: { data: any; }) => { return res.data });

    console.log(response);
  }
  return (
    <div className="flex">
      <SideBar></SideBar>
      <form id='course-form' className='w-full mx-4 p-20r'>
        <div className='row tab mx-auto pt-10 bg-navbar h-full w-full rounded-t-2xl shadow-xl '>
          <h1 className='text-center text-3xl pb-6 text-white'>Add User</h1>
          <div className="col">
            <Input ref={username} required={true} placeholder={"User Name *"} />
            <Input ref={password} required={true} placeholder={"Password *"} />
            <Input ref={email} required={true} placeholder={"Email *"} />

          </div>
          <div className="col-md-6 col-sm-8 px-4">
    
            <Input ref={firstname} required={true} placeholder={"First Name *"} />
            <Input ref={lastname} required={true} placeholder={"Last Name *"} />
            <Input ref={radioRef} type='radio' title='User Type*' enum={['Admin', 'Instructor', 'CorporateTrainee']} required={true} placeholder={"User Type"} />
           
          </div>
          <div className='mx-auto w-700 rounded-b-2xl bg-navbar'>
            <p id='error-message' className='text-red-700 h-auto mb-2 text-center'></p>
            <div className='text-center flex justify-center '>
            <button id='submit-btn' type="button" onClick={(e) => createUser(e)} className="text-lg hover:bg-navlink-bg hover:text-gray-900 hover:rounded-md h-10 mb-4 items-center py-2 px-4 ml-3 font-medium text-navlink-bg bg-transparent">
                    <span />
                    <span />
                    <span />
                    <span />
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
