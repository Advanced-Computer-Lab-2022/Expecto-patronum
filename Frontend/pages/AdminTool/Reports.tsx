import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Input from "../../components/shared/Input/Input";
import SideBar from "../../components/AdminTool/SideBar";
import AdminHeader from "../../components/AdminTool/AdminHeader";
import classNames from "classnames";
import CompPagination from "../../components/shared/pagination/CompPagination";

const pending = classNames(
  "px-1 py-1 rounded-md whitespace-nowrap text-sm bg-yellow-200 text-yellow-700"
);
const resolved = classNames(
  "px-1 py-1 rounded-md whitespace-nowrap text-sm bg-green-200 text-green-700"
);
const unseen = classNames(
  "px-1 py-1 rounded-md whitespace-nowrap text-sm bg-blue-200 text-blue-700"
);

type Props = {};
var response = null;



// const reports = [
//   //api
//   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Unseen', date: '23-12-2022' , type:"Technical",
//   userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem","Trash Admin"]},
// { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Resolved', date: '23-12-2022' , type:"Technical",
//   userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem"]},
// { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"Technical",
//   userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem"]},
// { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"Other",
//   userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem"]},
// { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Unseen', date: '23-12-2022' , type:"Financial",
//   userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem"]},
// ];

const Reports = (props: Props) => {

  const [reports, setReports] = useState<any>();
  useEffect(() => {
    const test = [
      { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Unseen', date: '23-12-2022' , type:"Technical",
      userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem","ez"]},
   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Resolved', date: '23-12-2022' , type:"Technical",
      userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem"]},
   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"Technical",
      userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem"]},
   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022' , type:"Other",
      userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem"]},
   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Unseen', date: '23-12-2022' , type:"Financial",
      userID:"1",courseID:"2",body:"Trash instructor",comment:["Trash Course","Trash Website","Rodin 3azeem"]},
    ];
    setReports(test);
  }, []);

console.log(reports);

  function go() { }
  function closeReport(index: number) {
    const reportView=document.getElementById("staticModal" + index);
    if(reportView != undefined) {
      reportView.style.display="none";
    }
  }
  function ResolveReport(index: number) {
    const status = document.getElementsByClassName("Status" + index);
    const ViewButton = document.getElementById("ViewButton" + index);
    if (status[0].children != undefined) {
      status[0].children[0].className = resolved;
      status[0].children[0].innerHTML = "Resolved";
    }
    if (ViewButton != undefined) {
      ViewButton.style.display = "none";
    }
    const reportView=document.getElementById("staticModal" + index);
    if(reportView != undefined) {
      reportView.style.display="none";
    }
    //api
  }
  function viewReport(index: number) {
    const status = document.getElementsByClassName("Status" + index);
    if (status[0].children != undefined) {
      status[0].children[0].className = pending;
      status[0].children[0].innerHTML = "Pending";
    }
    const reportView=document.getElementById("staticModal" + index);
    if(reportView != undefined) {
      reportView.style.display="";
    }
    

    //api
  }
  return (
    <aside>
      <AdminHeader />
      <div className="flex">
        <SideBar></SideBar>
        <form id="course-form" className="w-full mx-4 p-20r">
          <div className="row tab mx-auto pt-10 bg-main h-full w-full rounded-t-2xl shadow-xl ">
            <h6 className="text-center text-2xl text-navbar">Reports</h6>
            <div className="flex flex-col">
              <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                            Type
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
                        {reports?.map((report:any, index:number) => (
                          <tr key={report.date}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {report.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.type}
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
                                  report.status == "Pending"
                                    ? pending
                                    : report.status == "Resolved"
                                      ? resolved
                                      : unseen
                                }
                              >
                                {report.status}
                              </span>
                            </td>
                            <td className="flex px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                id={"ViewButton" + index}
                                type="button"
                                data-modal-toggle={"staticModal"+index}
                                onClick={() => viewReport(index)}
                                style={
                                  report.status == "Resolved"
                                    ? { display: "none" }
                                    : {}
                                }
                                className=" w-15 h-10 flex justify-center py-2 px-4 border-2 border-blue-600 rounded-md shadow-sm text-medium font-medium text-white bg-blue-600 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                View
                              </button>
                              <div
                                id={"staticModal" + index}
                                style={{display:"none"}}
                                data-modal-backdrop="static"
                                className="fixed top-0 left-0 right-0 z-50 w-full p-[425px] py-40 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur-sm bg-black bg-opacity-50"
                              >
                                <div className="relative w-full h-full max-w-2xl md:h-auto">
                                  <div className="relative bg-white rounded-lg shadow">
                                    <div className="flex items-start justify-between p-4 border-b rounded-t">
                                      <h3 className="text-xl font-semibold text-gray-900">
                                        {report.name +
                                          "'s Report" +
                                          " ( " +
                                          report.type +
                                          " ) "}
                                      </h3>
                                      <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                                        onClick={() =>closeReport(index)}
                                      >
                                        <svg
                                          className="w-5 h-5"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>

                                    <div className="p-6 space-y-6">
                                      <p className="text-base leading-relaxed text-gray-500 ">
                                        Reason: {report.body}
                                      </p>
                                    </div>
                                    <h4 className="px-6 pb-2">FollowUps</h4>
                                    {reports[index]?.comment.map(
                                      (comment:any, index2:number) => (
                                        <p className="text-base leading-relaxed text-gray-500 px-6 ">
                                          {index2 + 1 + "." + comment}
                                        </p>
                                      )
                                    )}

                                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                      <button
                                        id={"Resolve" + index}
                                        onClick={() => ResolveReport(index)}
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                      >
                                        Resolve
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div id="pagination">
                      <CompPagination
                        totalCount={20 * 5}
                        Setter={go}
                        FromLink={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></script>
    </aside>
  );
};

export default Reports;
