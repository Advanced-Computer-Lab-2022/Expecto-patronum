import classNames from 'classnames'
import React, { useEffect } from 'react'
import NoteInput from './NoteInput'
import { AiFillPlusCircle } from 'react-icons/ai';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { FiDownload } from 'react-icons/fi';

import DataContext, { NotesInterface } from '../../../context/DataContext';
import axios from 'axios';
import NotesList from './NotesList';

type Props = {
  videoRef: any
  setPause: React.Dispatch<React.SetStateAction<boolean>>
}

const Notes = (props: Props) => {
  const [AddNote, setAddNote] = React.useState(false);
  const { ContentChoosen, SetContentChoosen, Notes, SetNotes } = React.useContext(DataContext);
  const [Time, setTime] = React.useState(0);
  // const [NotesType, setNotesType] = React.useState("Current" || "All");
  // const [ToggleNote, SetToggleNote] = React.useState(false);

  // const [Loading, SetLoading] = React.useState(false);
  // const NoteRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ContentChoosen.SubtitleID) {
      setAddNote(false);
    }
  }, [ContentChoosen])



  function handleStartNote() {

    if (props.videoRef && props.videoRef.current && !ContentChoosen.isExercise) {
      setTime(props.videoRef.current.getCurrentTime());
      props.setPause(true);

      // props.videoRef.current.seekTo(40, 'seconds');
    }

  }

  // function handleStartNote() {
  //   if (ContentChoosen.isExercise) {

  //   }
  //   if (props.videoRef && props.videoRef.current) {
  //     let time = props.videoRef.current.getCurrentTime();
  //     let minutes = Math.floor(time / 60);
  //     let seconds = Math.floor(time - minutes * 60);
  //     let hours = Math.floor(minutes / 60);
  //     setTime({ hours, minutes, seconds })
  //     props.setPause(true);
  //     // props.videoRef.current.seekTo(40, 'seconds');
  //   }

  // }

  // const generatePdf = (notes: NotesInterface[]) => {
  //   // Create a new PDF document
  //   const pdf = new jsPDF();
  //   console.log(pdf.getFontList())


  //   // Set the font and text size
  //   pdf.setFont('Helvetica', 'Bold');
  //   pdf.setFontSize(12);

  //   // Set the y position for the title
  //   const yPos = 10;

  //   // Calculate the x position for the title
  //   //@ts-ignore
  //   const titleXPos = (pdf.internal.pageSize.getWidth() / 2) - (pdf.getStringUnitWidth('HTML CSS BASICS') * pdf.internal.getFontSize() / 2);

  //   // Add the title to the PDF
  //   pdf.setFontSize(16);
  //   pdf.setTextColor(0, 0, 0);
  //   pdf.text('The Complete 2023 Web Development Bootcamp', titleXPos, yPos + 5);

  //   // Set the x and y position for the subtitle
  //   const subtitleXPos = 10;
  //   const subtitleYPos = yPos + 20;

  //   // Add the subtitle to the PDF
  //   pdf.setFontSize(12);
  //   pdf.text('introduction to html', subtitleXPos, subtitleYPos);

  //   // Add the notes to the PDF as a table
  //   const tableData = [];
  //   for (const note of notes) {
  //     // Add the notes to the table data array
  //     tableData.push([note.note]);
  //   }

  //   // Add the table to the PDF
  //   //@ts-ignore
  //   pdf.autoTable({
  //     head: [['Notes']],
  //     body: tableData,
  //     startY: subtitleYPos + 20,
  //     theme: 'grid',
  //     styles: {
  //       fontSize: 12,
  //       font: 'Helvetica',
  //       cellPadding: 8,
  //       halign: 'left',
  //       valign: 'middle',
  //       thead: {
  //         fillColor: '#D80621',
  //         textColor: 'white'
  //       }
  //     }
  //   });

  //   // Set the document properties
  //   pdf.setProperties({
  //     title: 'Notes',
  //     author: 'John Doe',
  //     subject: 'Important notes'
  //   });

  //   // Set the display mode
  //   pdf.setDisplayMode('fullwidth');

  //   // Loop over the pages of the PDF
  //   for (let i = 0; i < pdf.internal.pages.length; i++) {
  //     pdf.setPage(i);
  //     // Set the x and y position for the logo image to the top right corner of the page
  //     const xPos = pdf.internal.pageSize.getWidth() - 10;
  //     pdf.addImage('/images/Logo2.png', 'PNG', xPos, 0, 10, 10, 'center');
  //   }

  //   // Generate the PDF and download it
  //   pdf.save('notes.pdf');
  // }

  // async function HandleSaveNote() {
  //   //Check if the note ref is not null 
  //   //if null return
  //   //if not null get the value of the note ref
  //   //get the current time of the video
  //   //get the current subtitle id
  //   //get the current content id

  //   if (!NoteRef.current) {
  //     return
  //   }
  //   SetLoading(true);
  //   let note = NoteRef.current.value;
  //   let time = props.videoRef.current ? props.videoRef.current.getCurrentTime() : null;
  //   let subtitle = ContentChoosen.SubtitleID;
  //   let content = ContentChoosen.ContentID;
  //   let user = "63a59b15f928fa951091f381";
  //   let course = "63a59c15e3b96b22a1dc828a";
  //   if (time) {
  //     let res = await axios.put("http://localhost:5000/user/addNote", {
  //       courseID: course,
  //       userID: user,
  //       contentID: content,
  //       subTitleID: subtitle,
  //       timestamp: time,
  //       note: note
  //     })
  //     SetNotes((prev) => {
  //       return (
  //         [...prev, { _id: res.data._id, contentID: content, subtitleID: subtitle, timestamp: time, note: note }] as NotesInterface[]
  //       )
  //     })

  //   }
  //   else {
  //     let res = await axios.put("http://localhost:5000/user/addNote", {
  //       courseID: course,
  //       userID: user,
  //       contentID: content,
  //       subTitleID: subtitle,
  //       timestamp: -1,
  //       note: note
  //     })
  //     SetNotes((prev) => {
  //       return (
  //         [...prev, { _id: res.data._id, contentID: content, subtitleID: subtitle, timestamp: -1, note: note }] as NotesInterface[]
  //       )
  //     })

  //   }
  //   SetLoading(false);


  //   // {
  //   //   "courseID": "courseID",
  //   //     "userID": "userID",
  //   //       "content": "contentID",
  //   //         "subtitle": "subtitleID",
  //   //           "timestamp": "timestamp",
  //   //             "note": "note"
  //   // }



  // }




  return (
    <div>
      {!AddNote &&
        <div onClick={() => { setAddNote(true); handleStartNote() }} className={CreateNote}>
          <p className={CreateNoteText}>Create a note</p>
          <AiFillPlusCircle fontSize={20} ></AiFillPlusCircle>
        </div>}
      {AddNote &&
        <div>
          <NoteInput setAddNote={setAddNote} Time={Time} ></NoteInput>
          {/* <div className={ButtonsContainer}>
            <button onClick={() => { setAddNote(false); }} className={CancelButton}>Cancel </button>
            <button onClick={HandleSaveNote} className={NoteInputButton}>Save Note</button>
          </div> */}
        </div>}
      <NotesList></NotesList>
      {/* <div className={'flex ml-30 mt-10 items-center gap-26'}>
        <div className={NoteTypeContanier} >
          <div onClick={() => { SetToggleNote((prev) => { return !prev }) }} className={NoteTypeButton}>
            <p>All Notes</p>
            <IoIosArrowDown fontSize={20} className={Arrow + (ToggleNote && ArrowPressed)} />
          </div>
          <div className={NoteTypeDropDown + " " + (!ToggleNote ? NoteTypeDropDownDisappear : NoteTypeDropDownShow)}>
            <p onClick={() => { setNotesType("All") }} className={NoteTypeDropDownItem}>View All Notes</p>
            <p onClick={() => { setNotesType("Current") }} className={NoteTypeDropDownItem}>View Current Note</p>
          </div>
        </div>
        <div onClick={() => generatePdf(Notes)} className={DownloadButton}>
          <p>Download All Notes</p>
          <FiDownload ></FiDownload>
        </div>

      </div>

      <div className={NotesContainer}>
        {Notes.map((item, index) => {
          return (
            <NoteInput data={item} key={item._id} Time={Time} Written={true} ></NoteInput>
          )

        })}

      </div> */}




    </div >
  )
}

export default Notes
const NoteInputButton = classNames("text-white text-sm  flex justify-center items-center bg-canadian-red px-2 py-2 rounded-full cursor-pointer");
const CancelButton = classNames("font-bold text-sm t mr-4 cursor-pointer");
const ButtonsContainer = classNames(" w-[85%] flex justify-end mt-4 ");
const CreateNote = classNames("w-[80%] ml-auto mr-auto mt-4 border-2 border-gray-800 rounded-lg p-2 cursor-pointer flex items-center justify-between hover:bg-gray-300")
const CreateNoteText = classNames("text-gray-400 text-lg")
// const NoteTypeDropDown = classNames('w-52 left-0 absolute top-10 z-10  cursor-pointer bg-white border-2 shadow-lg right-1')
// const NoteTypeDropDownDisappear = classNames('opacity-0 transition-all duration-500')
// const NoteTypeDropDownShow = classNames('opacity-1 transition-all duration-500')
// const ArrowPressed = classNames("rotate-180");
// const Arrow = classNames("mt-1  transition-all ease-linear ");
// const NoteTypeDropDownItem = classNames('hover:bg-gray-300 p-2 pt-2');
// const NotesContainer = classNames('mb-10 mt-10')
// const NoteTypeButton = classNames('border-2 border-black rounded-md hover:bg-gray-300 py-2 px-2 cursor-pointer  flex items-center justify-between w-full')
// const NoteTypeContanier = classNames('relative  w-32')
// const DownloadButton = classNames("flex   items-center gap-2 border-2 border-black rounded-md p-2 cursor-pointer hover:bg-gray-300")
