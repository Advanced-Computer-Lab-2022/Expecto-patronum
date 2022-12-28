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
import { AiFillPlusCircle } from 'react-icons/ai';
import SectionTitle from "./SectionTitle";
import MainButton from "../shared/button/MainButton";
import Spinner from "../shared/spinner/Spinner";
import TicketDetails from "./TicketDetails";





type Props = {};

export interface ReqRepInterface {
  status: "Unseen" | "Pending" | "Resolved",
  _id: string,
  type: string,
  body: string,
  courseTitle: string,
  startDate: string
  comment: string[];
}

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

  const [Data, setData] = useState<[ReqRepInterface]>();
  const [Requests, setRequests] = useState<[ReqRepInterface]>();
  const [Choosen, setChoosen] = useState<ReqRepInterface>({ status: "Unseen", _id: "", comment: [""], type: "", body: "", courseTitle: "", startDate: "" });
  const [showDetails, setShowDetails] = useState(false);
  const [Type, setType] = useState<"Reports" | "Requests">("Reports");
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    if (Type == "Reports") {
      axios.post("http://localhost:5000/user/viewPreviousReports", { userID: "63a59b15f928fa951091f381" }).then((res) => {
        setData(res.data);
        setLoading(false);

      });
    }
    else {
      axios.post("http://localhost:5000/user/viewPreviousRequests", { userID: "63a59b15f928fa951091f381" }).then((res) => {
        setData(res.data);
        setLoading(false);

      });
    }



  }, [Type]);


  function handleBack() {
    setShowDetails(false);
  }


  if (showDetails) {
    return (
      <div>
        <SectionTitle Title="Your Reports" SubTitle="View your report and follow up if the report is not resolved within 4 to 5 working days"></SectionTitle>

        <TicketDetails data={Choosen} SetBack={handleBack}></TicketDetails>
      </div>
    )
  }

  return (

    <>

      <SectionTitle Title="Your Tickets" SubTitle="View your ticket details"></SectionTitle>
      {Loading ? <Spinner></Spinner> : <div>
        <div className={TabsContainer}>
          <div onClick={() => { setType("Reports") }} className={Tab + " " + " border-r-2 border-b-0 border-gray-500 " + " " + (Type === 'Reports' && TabClicked)}>
            <p className={Tabitem}>Reports</p>
          </div>
          <div onClick={() => { setType("Requests") }} className={Tab + " " + (Type === 'Requests' && TabClicked)}>
            <p className={Tabitem}>Requests</p>
          </div>

        </div>

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
              {Data?.map((Data: ReqRepInterface, index: number) => (
                <TicketCard setChoosen={setChoosen} setShowDetails={setShowDetails} data={Data} Type={Type} index={index} ></TicketCard>

              ))}
            </tbody>
          </table>
        </div>

      </div>}



    </>


  );
};

export default Tickets;

const TableContainer = classNames('   py-2 my-2 inline-block w-full px-8 ')
const Table = classNames('w-full divide-gray-200 shadow rounded-xl overflow-hidden border-b border-gray-200')
const TableHead = classNames('bg-gray-50')
const TableHeadItem = classNames('px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider')
const TableBody = classNames(' divide-y bg-white divide-gray-200')
const TabsContainer = classNames("flex w-[100%]  justify-between h-[7vh]   mb-10 rounded-b-lg");
const Tab = classNames("flex items-center border-b-4  w-1/2 justify-center  shadow-lg   border-transparent cursor-pointer transition-all   hover:bg-gray-200  ")
const Tabitem = classNames("text-black text-lg font-bold ")
const TabClicked = classNames("bg-gray-300 shadow-sm ")