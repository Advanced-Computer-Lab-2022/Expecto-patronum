import axios from 'axios';
import classNames from 'classnames'
import React, { useContext } from 'react'
import { FiDownload } from 'react-icons/fi';
import DataContext, { NotesInterface } from '../../../context/DataContext';
import TextBox from '../../shared/textbox/TextBox';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPencilAlt } from 'react-icons/fa';
import Modal from '../../shared/Modal/Modal';
import MainButton from '../../shared/button/MainButton';

type Props = {
  data?: NotesInterface
  disabled?: boolean
  // Time: { hours: number, minutes: number, seconds: number }
  Written?: boolean
  Time: number
  setAddNote?: React.Dispatch<React.SetStateAction<boolean>>

}

const NoteInput = (props: Props) => {
  const [Loading, SetLoading] = React.useState(false);
  const [LoadingEdit, SetLoadingEdit] = React.useState(false);
  const [LoadingDelete, SetLoadingDelete] = React.useState(false);
  const [Delete, SetDelete] = React.useState(false);
  const { ContentChoosen, SetContentChoosen, Notes, SetNotes } = useContext(DataContext)
  const NoteRef = React.useRef<HTMLTextAreaElement>(null);
  const [EditNote, SetEditNote] = React.useState(false);

  let minutes = 0;
  let seconds = 0;
  let hours = 0;
  let time = props.Time;
  minutes = Math.floor(time / 60);
  seconds = Math.floor(time - minutes * 60);
  hours = Math.floor(minutes / 60);



  async function HandleSaveNote() {
    //Check if the note ref is not null 
    //if null return
    //if not null get the value of the note ref
    //get the current time of the video
    //get the current subtitle id
    //get the current content id

    if (!NoteRef.current) {
      return
    }
    SetLoading(true);
    let note = NoteRef.current.value;
    let time = props.Time;
    let subtitle = ContentChoosen.SubtitleID;
    let content = ContentChoosen.ContentID;
    var subtitleName = ContentChoosen.subttitleName;
    var contentName = ContentChoosen.contentName;
    var subtitleIndex = ContentChoosen.subtitleIndex;
    var contentIndex = ContentChoosen.contentIndex;
    let user = "63a59b15f928fa951091f381";
    let course = "63a59c15e3b96b22a1dc828a";
    let res = await axios.put("http://localhost:5000/user/addNote", {
      courseID: course,
      userID: user,
      contentID: content,
      subtitleName: subtitleName,
      contentName: contentName,
      subtitleIndex: subtitleIndex,
      contentIndex: contentIndex,
      subTitleID: subtitle,
      timestamp: ContentChoosen.isExercise ? -1 : time,
      note: note
    })
    SetNotes((prev) => {
      return (
        [...prev, {
          _id: res.data._id, contentID: content, subtitleID: subtitle,
          timestamp: ContentChoosen.isExercise ? -1 : time, note: note, subtitleName: subtitleName, contentName: contentName,
          subtitleIndex: subtitleIndex, contentIndex: contentIndex
        }] as NotesInterface[]
      )
    })


    SetLoading(false);
    if (props.setAddNote) {
      props.setAddNote(false);
    }


    // {
    //   "courseID": "courseID",
    //     "userID": "userID",
    //       "content": "contentID",
    //         "subtitle": "subtitleID",
    //           "timestamp": "timestamp",
    //             "note": "note"
    // }



  }

  const generatePdf = (NoteText: string) => {
    // Create a new PDF document
    const pdf = new jsPDF();
    console.log(pdf.getFontList())


    // Set the font and text size
    pdf.setFont('Helvetica', 'Bold');
    pdf.setFontSize(12);

    // Set the y position for the title
    const yPos = 10;

    // Calculate the x position for the title
    //@ts-ignore
    const titleXPos = (pdf.internal.pageSize.getWidth() / 2) - (pdf.getStringUnitWidth('HTML CSS BASICS') * pdf.internal.getFontSize() / 2);

    // Add the title to the PDF
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text('The Complete 2023 Web Development Bootcamp', titleXPos, yPos + 5);

    // Set the x and y position for the subtitle
    const subtitleXPos = 10;
    const subtitleYPos = yPos + 20;

    // Add the subtitle to the PDF
    pdf.setFontSize(12);
    pdf.text('introduction to html', subtitleXPos, subtitleYPos);
    console.log(NoteText);
    // Add the notes to the PDF as a table
    const tableData = [];
    tableData.push([NoteText]);
    // for (const note of notes) {
    //   // Add the notes to the table data array
    //   tableData.push([note.note]);
    // }

    // Add the table to the PDF
    //@ts-ignore
    pdf.autoTable({
      head: [['Notes']],
      body: tableData,
      startY: subtitleYPos + 20,
      theme: 'grid',
      styles: {
        fontSize: 12,
        font: 'Helvetica',
        cellPadding: 8,
        halign: 'left',
        valign: 'middle',
        thead: {
          fillColor: '#D80621',
          textColor: 'white'
        }
      }
    });

    // Set the document properties
    pdf.setProperties({
      title: 'Notes',
      author: 'John Doe',
      subject: 'Important notes'
    });

    // Set the display mode
    pdf.setDisplayMode('fullwidth');

    // Loop over the pages of the PDF
    for (let i = 0; i < pdf.internal.pages.length; i++) {
      pdf.setPage(i);
      // Set the x and y position for the logo image to the top right corner of the page
      const xPos = pdf.internal.pageSize.getWidth() - 10;
      pdf.addImage('/images/Logo2.png', 'PNG', xPos, 0, 10, 10, 'center');
    }

    // Generate the PDF and download it
    pdf.save('notes.pdf');
  }


  function HandleTimeClick() {
    if (props.data) {
      console.log("Hi")
      console.log(props.data);
      SetContentChoosen({
        SubtitleID: props.data.subtitleID,
        ContentID: props.data.contentID,
        contentName: props.data.contentName,
        subttitleName: props.data.subtitleName,
        contentIndex: props.data.contentIndex,
        subtitleIndex: props.data.subtitleIndex,
        data: { url: "", time: props.data.timestamp } || { name: "" },
        isExercise: false,
      })
      window.scrollTo(0, 0);

    }


  }

  async function handleDeleteNote(id: string) {
    SetLoadingDelete(true);

    //DeletNote form backend
    try {
      await axios.post("http://localhost:5000/user/DeleteNote", {
        courseID: "63a59c15e3b96b22a1dc828a",
        userID: "63a59b15f928fa951091f381",
        noteID: id,
      });
      SetNotes((prev) => {
        return prev.filter((note) => note._id !== id)
      })
      SetLoadingDelete(false)

    }
    catch (err) {
      console.log(err);
    }




  }

  async function HandleEditNote(id: string) {
    //Edit Note from the Notes Context
    //Edit Note from the backend
    SetLoadingEdit(true);


    try {
      await axios.post("http://localhost:5000/user/EditNote", {
        courseID: "63a59c15e3b96b22a1dc828a",
        userID: "63a59b15f928fa951091f381",
        noteID: id,
        text: NoteRef.current?.value || ""
      });
      SetNotes((prev) => {
        return prev.map((note) => {
          if (note._id === id) {
            return { ...note, note: NoteRef.current?.value }
          }
          return note;
        }) as NotesInterface[]
      }
      )
      SetEditNote(false)
      SetLoadingEdit(false);
    }
    catch (err) {
      console.log(err);
    }
    //Edit Note from the backend


  }

  if (props.data) {

    return (

      <div className={DataContainer}>
        <div className={NoteContainer}>
          <div className={NoteTitleContainer}>
            <div onClick={HandleTimeClick} className={TimeStamp}>
              {
                props.data.timestamp < 0 ? <p >Exercise</p> :
                  <p>
                    {hours > 0 ? (hours > 10 ? hours : "0" + hours + ":") : "" +
                      (minutes > 10 ? minutes : "0" + minutes) + ":" +
                      (seconds > 10 ? seconds : "0" + seconds)}
                  </p>
              }
            </div>
            <div className={title}>
              <p className={subtitle}>{(props.data.subtitleIndex + 1) + ". " + props.data.subtitleName + " "}</p>
              <p className={content}>{(props.data.contentIndex + 1) + ". " + props.data.contentName} </p>
            </div>


          </div>
          <div className='flex gap-2'>
            <button onClick={() => generatePdf(props.data!.note)} className={NoteInputDownload}><FiDownload /></button>
            <button onClick={() => SetDelete(true)} className={NoteInputDownload}><RiDeleteBin6Line /></button>
            <button onClick={() => SetEditNote((prev) => !prev)} className={NoteInputDownload}><FaPencilAlt /></button>
          </div>
        </div>
        <div className='w-full'>
          <TextBox Text={props.data.note} HideLabel={true} Ref={NoteRef} ShowOnly={!EditNote} ></TextBox>
        </div>

        {EditNote && <div className={ButtonsContainerData}>
          <button onClick={() => SetEditNote(false)} className={CancelButton}>Cancel </button>
          {/* <button onClick={() => HandleEditNote(props.data!._id)} className={NoteInputButton}>Save Note</button> */}
          <MainButton Size='sm' Loading={LoadingEdit} btnText={"Save Note"} HandleClick={() => { HandleEditNote(props.data!._id) }}></MainButton>

        </div>}
        {Delete && <Modal SetOpen={SetDelete} CloseBtn={true} >
          <div className=' w-[40rem] flex flex-col  justify-between h-60 bg-white px-4 py-8'>
            <div>
              <h1 className=' text-xl font-bold'>Please Confirm</h1>
              <p className='mt-2'>Are you sure you want to delete your note?</p>
            </div>
            <div className='flex justify-end  gap-2 '>
              <button onClick={() => SetDelete(false)} className='bg-gray-200 px-4 py-2 rounded-md'>Cancel</button>
              <MainButton Size='sm' Loading={LoadingDelete} btnText={"Delete"} HandleClick={() => { handleDeleteNote(props.data!._id) }}></MainButton>
            </div>
          </div>
        </Modal>}


      </div >

    )
  }




  return (
    <div className={Container}>
      <div className={NotesInputContainer}>
        <div onClick={HandleTimeClick} className={TimeStamp}>
          {ContentChoosen.isExercise ? <p >Exercise</p> :
            <p>
              {hours > 0 ? (hours > 10 ? hours : "0" + hours + ":") : "" +
                (minutes > 10 ? minutes : "0" + minutes) + ":" +
                (seconds > 10 ? seconds : "0" + seconds)}
            </p>
          }
        </div>
        <div className='w-full'>
          <TextBox Ref={NoteRef} HideLabel={true} ShowOnly={false} ></TextBox>
        </div>
        <button onClick={() => generatePdf(NoteRef.current?.value || "")} className={NoteInputDownload}><FiDownload /></button>
      </div >
      <div className={ButtonsContainer}>
        <button onClick={() => { props.setAddNote && props.setAddNote(false) }} className={CancelButton}>Cancel </button>
        {/* <button onClick={HandleSaveNote} className={NoteInputButton}>Save Note</button> */}
        <MainButton Size='md' Loading={Loading} btnText={"Save Note"} HandleClick={HandleSaveNote}></MainButton>
      </div>

    </div>
  )
}

export default NoteInput

const Container = classNames("w-[80%] mr-auto ml-auto ");
const NotesInputContainer = classNames("flex items-start gap-4 w-full relative mt-4");
const DataContainer = classNames("w-[60%] ml-auto  relative mr-auto mt-4");
const TimeStamp = classNames(" text-white text-sm flex justify-center items-center bg-gray-800 px-2 py-2 rounded-full cursor-pointer");
const NoteInputDownload = classNames("text-white text-sm   flex justify-center items-center bg-canadian-red px-2 py-2 rounded-full cursor-pointer");
const NoteInputButton = classNames("text-white text-sm  flex justify-center items-center bg-canadian-red px-2 py-2 rounded-full cursor-pointer");
const CancelButton = classNames("font-bold text-sm t mr-4 cursor-pointer");
const ButtonsContainerData = classNames(" w-full flex justify-end mt-3 mb-14");
const ButtonsContainer = classNames(" w-full flex justify-end items-center mt-3 ml-[-2rem]");

const NoteContainer = classNames("flex w-full justify-between items-center");
const NoteTitleContainer = classNames("flex gap-4 ml-[-5rem] items-center ");
const title = classNames('flex items-center gap-4');
const subtitle = classNames('font-bold text-md');
const content = classNames('text-sm text-gray-500');