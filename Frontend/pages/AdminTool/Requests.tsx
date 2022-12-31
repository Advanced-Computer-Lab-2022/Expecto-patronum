import React, { useState, useRef, useEffect, useContext } from 'react';
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

type Props = {}
var response = null;
// const requests = [
//   //api
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:""},
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:""},
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Accepted', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:""},
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Rejected', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:""},
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"requestCourse",
//      userID:"1",courseID:"2",body:""},
// ]
const Requests = (props: Props) => {
  const [requests, setRequests] = useState<any>();
  const [totalCount, setTotalCount] = useState<any>();
  const { viewPopupMessage } = useContext(PopupMessageContext);
  useEffect(() => {
    getRefunds();
  }, []);

  const getRefunds = async () => {
    await axios
      .get("http://localhost:5000/Admin/viewCourseRequests")
      .then((res) => {
        console.log(res.data);
        const q = res.data.requests;
        // console.log(q);
        setRequests(q);
        setTotalCount(res.data.TotalCount);
      });
  };

  async function goToPage(Page: any) {
    await axios
      .get("http://localhost:5000/Admin/viewCourseRequests", {
        params: {
          page: Page,
        },
      })
      .then((res) => {
        console.log(res.data);
        const q = res.data.requests;
        // console.log(q);
        setRequests(q);
      });
  }
  async function AcceptRequest(index: number) {
    response = await axios
      .put("http://localhost:5000/Admin/grantAccess", {
        requestID: requests[index]._id,
        granted: "true",
      })
      .then((res: { data: any }) => {
        return res.data;
      });
      viewPopupMessage(true, "Request Accepted");
    const status = document.getElementsByClassName("Status" + index);
    const AcceptButton = document.getElementById("AcceptButton" + index);
    const RejectButton = document.getElementById("RejectButton" + index);
    if (status[0].children != undefined) {
      status[0].children[0].className = accepted;
      status[0].children[0].innerHTML = "Accepted";
    }
    if (AcceptButton != undefined && RejectButton != undefined) {
      AcceptButton.style.display = "none";
      RejectButton.style.display = "none";
    }
  }
  async function RejectRequest(index: number) {
    response = await axios
      .put("http://localhost:5000/Admin/grantAccess", {
        requestID: requests[index]._id,
        granted: "false",
      })
      .then((res: { data: any }) => {
        return res.data;
      });
    viewPopupMessage(true, "Request Rejected");
    const status = document.getElementsByClassName("Status" + index);
    const AcceptButton = document.getElementById("AcceptButton" + index);
    const RejectButton = document.getElementById("RejectButton" + index);
    if (status[0].children != undefined) {
      status[0].children[0].className = rejected;
      status[0].children[0].innerHTML = "Rejected";
    }
    if (AcceptButton != undefined && RejectButton != undefined) {
      AcceptButton.style.display = "none";
      RejectButton.style.display = "none";
    }
  }
  return (
    <aside>
      {/* <AdminHeader /> */}
      <div className="flex">
        <SideBar></SideBar>
        <form id="course-form" className="w-full mx-4">
          <div className="row tab mx-auto pt-10 bg-main h-full w-full rounded-t-2xl shadow-xl ">
            <h6 className="text-center text-2xl text-navbar">
              Corporate Trainees' Course Requests
            </h6>
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
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {requests?.map((request: any, index: any) => (
                          <tr key={request.startDate}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {request.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {request.courseTitle}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {request.startDate.split("T")[0]}
                            </td>
                            <td
                              className={
                                "Status" +
                                index +
                                " " +
                                "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              }
                            >
                              <span
                                className={
                                  request.status == "Pending"
                                    ? pending
                                    : request.status == "Accepted"
                                    ? accepted
                                    : rejected
                                }
                              >
                                {request.status}
                              </span>
                            </td>
                            <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                id={"AcceptButton" + index}
                                type="button"
                                onClick={() => AcceptRequest(index)}
                                style={
                                  request.status != "Pending"
                                    ? { display: "none" }
                                    : {}
                                }
                                className=" w-15 h-10 flex justify-center py-2 px-4 border-2  rounded-md shadow-sm text-medium font-medium text-white bg-green-500 hover:bg-green-600"
                              >
                                Accept
                              </button>
                              <button
                                id={"RejectButton" + index}
                                type="button"
                                onClick={() => RejectRequest(index)}
                                style={
                                  request.status != "Pending"
                                    ? { display: "none" }
                                    : {}
                                }
                                className="ml-2 w-15 h-10 flex justify-center py-2 px-4 border-2 rounded-md shadow-sm text-medium font-medium text-white bg-red-500 hover:bg-red-600"
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
            <div id="pagination">
              {" "}
              <CompPagination
                totalCount={totalCount}
                Setter={goToPage}
                FromLink={false}
              />
            </div>
          </div>
        </form>
      </div>
    </aside>
  );
};


export default Requests;
