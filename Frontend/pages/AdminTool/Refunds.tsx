import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/AdminTool/SideBar';
import AdminHeader from '../../components/AdminTool/AdminHeader';
import classNames from "classnames";
import CompPagination from "../../components/shared/pagination/CompPagination";
import { PopupMessageContext } from '../_app';


const pending = classNames(
  "px-1 py-1 rounded-md whitespace-nowrap text-sm bg-yellow-200 text-yellow-700"
);
const accepted = classNames(
  "px-1 py-1 rounded-md whitespace-nowrap text-sm bg-green-100 text-green-700"
);
const rejected = classNames(
  "px-1 py-1 rounded-md whitespace-nowrap text-sm bg-red-100 text-red-700"
);

const pendingBar = classNames(
  "bg-[#F7E632] rounded-l-full transition-all duration-700"
  );
  const acceptedBar = classNames(
    "bg-green-600 rounded-l-full transition-all duration-700"
    
  );
  const rejectedBar = classNames(
    "bg-red-600 rounded-l-full transition-all duration-700"

  );

type Props = {}
var response = null;
// const refunds = [
//   //api
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:"",progress:50},
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:"",progress:25},
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Accepted', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:"",progress:15},
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Rejected', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:"",progress:100},
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:"",progress:45},
// ]
const Refunds = (props: Props) => {
  const [refunds, setRefunds] = useState<any>();
  const [totalCount, setTotalCount] = useState<any>();
  useEffect(() => {
    getRefunds();
    }, []);
  
    const getRefunds = async () => { //need to be callled on loading page
      await axios.get('http://localhost:5000/Admin/viewRefunds').then(
          (res) => {
              console.log(res.data);
              const q = res.data.refunds;
              console.log(q);
              setRefunds(q);
              setTotalCount(res.data.TotalCount);
              
          });
  
  }
  async function goToPage(Page: any) {
    await axios
      .get('http://localhost:5000/Admin/viewRefunds', {
        params: {
          page: Page,
        },
      })
      .then((res) => {
        console.log(res.data);
        const q = res.data.courses;
        console.log(q);
        setRefunds(q);
      });
  }
  async function AcceptRefund(index: number) {
  response = await axios.put("http://localhost:5000/Admin/refund", {
    requestID:refunds[index]._id,
    refund:"Accept"
}).then((res: { data: any; }) => { return res.data });
  const status = document.getElementsByClassName("Status"+index);
  const Bar=document.getElementById("ProgressBar"+index) as HTMLElement;
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
  if(Bar!=undefined){
    Bar.className=acceptedBar;
  }
  //api
}
  async function RejectRefund(index: number) {
  response = await axios.put("http://localhost:5000/Admin/refund", {
    requestID:refunds[index]._id,
    refund:"Reject"
}).then((res: { data: any; }) => { return res.data });
  const status = document.getElementsByClassName("Status"+index);
  const Bar=document.getElementById("ProgressBar"+index) as HTMLElement;
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
  if(Bar!=undefined){
    Bar.className=rejectedBar;
  }
  //api
}
  
  return (
    <aside>
    <AdminHeader/>
    <div className="flex sb-max:min-h-fit">
      <SideBar></SideBar>
      <form id='course-form' className='w-full mx-4'>
        <div className='row tab mx-auto pt-10 bg-main h-full w-full rounded-t-2xl shadow-xl '>
        <h6 className='text-center text-2xl text-navbar p-0'>Refund Requests</h6>
        <div className="flex flex-col p-0">
      <div className="my-2">
        <div className="py-2 align-middle inline-block min-w-full ">
          <div className="shadow overflow-hidden border-b mx-4 border-gray-200 sm:rounded-lg">
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
                    Progress
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
                {refunds?.map((refund:any, index:number) => (
                  <tr key={refund.startDate}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{refund.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{refund.courseTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{refund.startDate.split('T')[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  
                        <div className='relative flex items-center justify-between'>
        <div className='mr-2'>{refund.progress.toString() + '%'}</div>
        <div className="w-72 h-3 sb-max:w-52 bg-black bg-opacity-[0.04] shadow-sm hover:shadow-md hover:opacity-95 transition-all duration-200 rounded-full flex overflow-hidden relative">
            <div id={"ProgressBar"+index} className={refund.status=="Pending" ? pendingBar : refund.status=="Accepted" ? acceptedBar : rejectedBar} style={{width: refund.progress.toString() + '%'}} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
    </div>
                    </td>
                    <td className={"Status"+index+" "+"px-6 py-4 whitespace-nowrap text-sm text-gray-500"}><span className={refund.status=="Pending" ? pending : refund.status=="Accepted" ? accepted : rejected }>{refund.status}</span></td>
                   <td
                  className="flex px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                    id={"AcceptButton"+index}
                      type="button"
                      onClick={()=>AcceptRefund(index)}
                      style={refund.status != "Pending" ? { display: "none" } : {}} 
                      className=" w-15 h-10 flex justify-center py-2 px-4 border-2  rounded-md shadow-sm text-medium font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      Accept
                      </button>
                    <button
                      id={"RejectButton"+index}
                  type="button"
                  onClick={()=>RejectRefund(index)}
                      style={refund.status != "Pending" ? { display: "none" } : {}} 
                      className="ml-2 w-15 h-10 flex justify-center py-2 px-4 border-2 rounded-md shadow-sm text-medium font-medium text-white bg-red-600 hover:bg-red-700"
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
    <div id="pagination"><CompPagination
              totalCount={totalCount}
              Setter={goToPage}
              FromLink={false}
            /></div>
        </div>
        
      </form>

    </div>
    </aside>
  )
}


export default Refunds;
