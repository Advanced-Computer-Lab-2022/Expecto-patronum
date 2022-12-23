import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Input from "../../components/shared/Input/Input";
import SideBar from "../../components/AdminTool/SideBar";
import AdminHeader from "../../components/AdminTool/AdminHeader";
import classNames from "classnames";
import CompPagination from "../../components/shared/pagination/CompPagination";
import TicketCard from "./TicketCard";
import Modal from "../shared/Modal/Modal";
import RequestComp from "../Request/RequestComp";
import TextBox from "../shared/textbox/TextBox";



type Props = {};


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

const Tickets = (props: Props) => {

  const [reports, setReports] = useState<any>();
  const [Openmodal, setOpenModal] = useState(false);
  const [FollowUp, setFollowUp] = useState(false);
  useEffect(() => {
    const test = [
      {
        name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Unseen', date: '23-12-2022', type: "Technical",
        userID: "1", courseID: "2", body: "Trash instructor", comment: ["Trash Course", "Trash Website", "Rodin 3azeem", "ez"]
      },
      {
        name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Resolved', date: '23-12-2022', type: "Technical",
        userID: "1", courseID: "2", body: "Trash instructor", comment: ["Trash Course", "Trash Website", "Rodin 3azeem"]
      },
      {
        name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022', type: "Technical",
        userID: "1", courseID: "2", body: "Trash instructor", comment: ["Trash Course", "Trash Website", "Rodin 3azeem"]
      },
      {
        name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Pending', date: '23-12-2022', type: "Other",
        userID: "1", courseID: "2", body: "Trash instructor", comment: ["Trash Course", "Trash Website", "Rodin 3azeem"]
      },
      {
        name: 'Jane Cooper', title: 'Regional Paradigm Technician', status: 'Unseen', date: '23-12-2022', type: "Financial",
        userID: "1", courseID: "2", body: "Trash instructor", comment: ["Trash Course", "Trash Website", "Rodin 3azeem"]
      },
    ];
    setReports(test);
  }, []);

  console.log(reports);

  function go() { }

  function handleChange(e: any) {
    setFollowUp(e.target.value);
  }

  return (
    <div>
      <RequestComp ShowOnly={true} Type={'Report'}></RequestComp>



      {/* <>

        <h6 className={TicketsHeader}>Tickets</h6>
        <div className={TableContainer}>
          <table className={Table}>
            <thead className={TableHead}>
              <tr>

                <th
                  className={TableHeadItem}
                >
                  Course Title
                </th>
                <th
                  className={TableHeadItem}
                >
                  Date
                </th>
                <th
                  className={TableHeadItem}
                >
                  Type
                </th>
                <th
                  className={TableHeadItem}
                >
                  Status
                </th>
                <th
                  className={TableHeadItem}
                ></th>
              </tr>
            </thead>
            <tbody className={TableBody}>
              {reports?.map((report: any, index: number) => (
                <TicketCard report={report} index={index} ></TicketCard>

              ))}
            </tbody>
          </table>
        </div>
        <CompPagination
          totalCount={20 * 5}
          Setter={go}
          FromLink={false}
        />
      </> */}
    </div>


  );
};

export default Tickets;

const TicketsHeader = classNames('text-center text-2xl pt-10  text-navbar')
const TableContainer = classNames('py-2 my-2 inline-block w-full px-8')
const Table = classNames('w-full divide-gray-200 shadow rounded-xl overflow-hidden border-b border-gray-200')
const TableHead = classNames('bg-gray-50')
const TableHeadItem = classNames('px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider')
const TableBody = classNames('bg-white divide-y divide-gray-200')
