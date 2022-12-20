import React, { useState, useRef } from 'react';
import axios from 'axios';
import Input from '../../components/shared/Input/Input';
import SideBar from '../../components/AdminTool/SideBar';
import AdminHeader from '../../components/AdminTool/AdminHeader';
import classNames from "classnames";
import CompPagination from "../../components/shared/pagination/CompPagination";

const pending = classNames(
  "px-1 py-1 rounded-md whitespace-nowrap text-sm bg-yellow-200 text-yellow-700"
);
const accepted = classNames(
  "px-1 py-1 rounded-md whitespace-nowrap text-sm bg-green-100 text-green-700"
);
const rejected = classNames(
  "px-1 py-1 rounded-md whitespace-nowrap text-sm bg-red-100 text-red-700"
);

type Props = {}
var response = null;
const requests = [
  //api
  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"requestCourse",
     userID:"1",courseID:"2",body:""},
  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"requestCourse",
     userID:"1",courseID:"2",body:""},
  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Accepted', date: '23-12-2022' , type:"requestCourse",
     userID:"1",courseID:"2",body:""},
  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Rejected', date: '23-12-2022' , type:"requestCourse",
     userID:"1",courseID:"2",body:""},
  { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"requestCourse",
     userID:"1",courseID:"2",body:""},
]
const Requests = (props: Props) => {
  const [characterLeft, setCharacterLeft] = useState(250);
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const [type, setType] = useState<"button" | "submit" | "reset" | undefined>("button");
  const radioRef = useRef<any>();

  const username = useRef<any>();
  const email = useRef<any>();
  const password = useRef<any>();
  const firstname = useRef<any>();
  const lastname = useRef<any>();


function go() {
}
function AcceptRequest(index: number) {
    //api
  const status = document.getElementsByClassName("Status"+index);
  const AcceptButton=document.getElementById("AcceptButton"+index);
  const RejectButton=document.getElementById("RejectButton"+index);
  if (status[0].children!= undefined){
   status[0].children[0].className=accepted;
   status[0].children[0].innerHTML="Accepted";
  }
  if(AcceptButton!= undefined && RejectButton!=undefined){
    AcceptButton.style.display="none";
    RejectButton.style.display="none";
  }

}
function RejectRequest(index: number) {
    //api
  const status = document.getElementsByClassName("Status"+index);
  const AcceptButton=document.getElementById("AcceptButton"+index);
  const RejectButton=document.getElementById("RejectButton"+index);
  if (status[0].children!= undefined){
   status[0].children[0].className=rejected;
   status[0].children[0].innerHTML="Rejected";
  }
  if(AcceptButton!= undefined && RejectButton!=undefined){
    AcceptButton.style.display="none";
    RejectButton.style.display="none";
  }
  //api
}
  async function createUser(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const error = document.getElementById("error-message");

    if(error != undefined)
        error.innerHTML = "";
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
      role: selectedRadio,
    }).then((res: { data: any; }) => { return res.data });

    console.log(response);
  }
  return (
    <aside>
    <AdminHeader/>
    <div className="flex">
      <SideBar></SideBar>
      <form id='course-form' className='w-full sb-max:w-without-instructor-sidebar-closed sb:w-without-instructor-sidebar'>
        <div className='row tab mx-auto pt-10 bg-main h-full w-full rounded-t-2xl shadow-xl '>
        <h6 className='text-center text-2xl text-navbar'>Corporate Trainees' Course Requests</h6>
        <div className="flex flex-col">
      <div className="my-2 ">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    UserName
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Course Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  </th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request,index) => (
                  <tr key={request.date}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.date}</td>
                    <td className={"Status"+index+" "+"px-6 py-4 whitespace-nowrap text-sm text-gray-500"}><span className={request.status=="Pending" ? pending : request.status=="Accepted" ? accepted : rejected }>{request.status}</span></td>
                   <td
                  className="flex px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                    id={"AcceptButton"+index}
                      type="button"
                      onClick={()=>AcceptRequest(index)}
                      style={request.status != "Pending" ? { display: "none" } : {}} 
                      className=" w-15 h-10 flex justify-center py-2 px-4 border-2 border-green-500 rounded-md shadow-sm text-medium font-medium text-white bg-green-500 hover:bg-white hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Accept
                      </button>
                    <button
                      id={"RejectButton"+index}
                  type="button"
                  onClick={()=>RejectRequest(index)}
                      style={request.status != "Pending" ? { display: "none" } : {}} 
                      className="ml-2 w-15 h-10 flex justify-center py-2 px-4 border-2 border-red-500 rounded-md shadow-sm text-medium font-medium text-white bg-red-600 hover:bg-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           
          </div>
        </div>
      </div>
    </div>
    <div id="pagination"><CompPagination totalCount={20 * 5} Setter={go} FromLink={false} /></div>
        </div>
      </form>

    </div>
    </aside>
  )
}


export default Requests;
