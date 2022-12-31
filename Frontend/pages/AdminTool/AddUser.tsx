import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import Input from '../../components/shared/Input/Input';
import SideBar from '../../components/AdminTool/SideBar';
import AdminHeader from '../../components/AdminTool/AdminHeader';
import { PopupMessageContext } from '../_app';
type Props = {}

var isReset = false;
var response = null;
var radio: null=null;

const AddUser = (props: Props) => {
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const radioRef = useRef<any>();
  const { viewPopupMessage } = useContext(PopupMessageContext);
  const username = useRef<any>();
  const email = useRef<any>();
  const password = useRef<any>();
  const firstname = useRef<any>();
  const lastname = useRef<any>();

function getRole(selectedRadio: any) {
  setSelectedRadio(selectedRadio);
}

  async function createUser(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const error = document.getElementById("error-message");
    if(error != undefined)
        error.innerHTML = "";
    isReset = true;
    const inputFields = document.getElementsByClassName("create-course-input") as HTMLCollectionOf<HTMLElement>;
    var missing = false;
    for(let i = 0; i < inputFields.length; i++) {
      const field = inputFields[i] as HTMLTextAreaElement | any;
      if(field.nodeName === "DIV") {
          var selected = false;
          for(let j = 1; j < field.children.length; j++) {
            if(field.children[j].children[0].checked) {
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
  if(missing) {
      if(error != undefined)
          error.innerHTML = "Please fill in the required fields marked with a '*'.";
      isReset = false;
      return;
  }
  function isValidEmail(email :any) {
    return /\S+@\S+\.\S+/.test(email);
  }
  if (isValidEmail(email.current.children[1].value)==true) {
    response = await axios.post("http://localhost:5000/User/register", {
      username: username.current.children[1].value,
      password: password.current.children[1].value,
      email: email.current.children[1].value,
      firstname: firstname.current.children[1].value,
      lastname: lastname.current.children[1].value,
      role: selectedRadio,
    }).then((res: any) => { return res }).catch((error) => viewPopupMessage(false,error.response.data));
   if(response!=undefined && response.status==200){
    viewPopupMessage(true, "User Added Successfully, Waiting for him verfying his Email");
    console.log(response.data);
   }
} else {
  viewPopupMessage(false, "Invalid Email");
}
    
  }

  return (
    <aside>
    <AdminHeader/>
    <div className="flex">
      <SideBar></SideBar>
      <form id='course-form' className='w-full mx-4'>
        <div className='row tab mx-auto pt-10 bg-main h-full w-full rounded-t-2xl shadow-xl '>
          <h1 className='text-center text-3xl pb-6 text-navbar'>Add User</h1>
          <div className="col">
            <Input ref={username} required={true} placeholder={"User Name *"} />
            <Input ref={password} required={true} placeholder={"Password *"} />
            <Input ref={email} required={true} placeholder={"Email *"} />

          </div>
          <div className="col-md-6 col-sm-8 px-4">
    
            <Input ref={firstname} required={true} placeholder={"First Name *"} />
            <Input ref={lastname} required={true} placeholder={"Last Name *"} />
            <Input ref={radioRef} type='radio' onChange={getRole} title='User Type*' enum={['Admin', 'Instructor', 'CorporateTrainee']} required={true} placeholder={"User Type"} />
           
          </div>
          <div className='mx-auto w-700 rounded-b-2xl bg-main'>
            <p id='error-message' className='text-red-700 h-auto mb-2 text-center'></p>
            <div className='text-center flex justify-center '>
            <button id='submit-btn' type="button" onClick={(e) => createUser(e)} className="text-lg hover:bg-red-600 hover:text-white hover:rounded-md h-10 mb-4 items-center py-2 px-4 ml-3 font-medium text-red-600 bg-transparent">
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
    </aside>
  )
}


export default AddUser;
