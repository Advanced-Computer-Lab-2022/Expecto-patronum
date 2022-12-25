import classNames from 'classnames'
import React, { useEffect } from 'react'
import DataContext, { NotesInterface } from '../../../context/DataContext'
import NoteInput from './NoteInput'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { FiDownload } from 'react-icons/fi';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
type Props = {}

const NotesList = (props: Props) => {
  const { ContentChoosen, SetContentChoosen, Notes, SetNotes } = React.useContext(DataContext);
  const [NotesType, setNotesType] = React.useState("Current" || "All");
  const [NoteFiltered, SetNoteFiltered] = React.useState<NotesInterface[]>(Notes);
  const [ToggleNote, SetToggleNote] = React.useState(false);


  useEffect(() => {
    if (NotesType === "Current") {
      SetNoteFiltered(() => {
        let Data = Notes.filter(note => note.subtitleID === ContentChoosen.SubtitleID && note.contentID === ContentChoosen.ContentID)
        return Data.reverse();
      })
    } else {
      SetNoteFiltered(Notes.reverse())
    }
  }, [NotesType, ContentChoosen, Notes])


  const DownloadAllNotes = () => {
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

    // Add the notes to the PDF as a table
    const tableData = [];
    for (const note of NoteFiltered) {
      // Add the notes to the table data array
      tableData.push([note.note]);
    }

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




  return (
    <div>
      <div className={'flex ml-30 mt-4 items-center gap-26'}>
        <div className={NoteTypeContanier} >
          <div onClick={() => { SetToggleNote((prev) => { return !prev }) }} className={NoteTypeButton}>
            <p>{NotesType === 'Current' ? "Current Notes" : "All Notes"}</p>
            <IoIosArrowDown fontSize={20} className={Arrow + (ToggleNote && ArrowPressed)} />
          </div>
          <div className={NoteTypeDropDown + " " + (!ToggleNote ? NoteTypeDropDownDisappear : NoteTypeDropDownShow)}>
            <p onClick={() => { setNotesType("All"); SetToggleNote(false) }} className={NoteTypeDropDownItem}>View All Notes</p>
            <p onClick={() => { setNotesType("Current"); SetToggleNote(false) }} className={NoteTypeDropDownItem}>View Current Note</p>
          </div>
        </div>
        {NoteFiltered.length !== 0 && <div onClick={DownloadAllNotes} className={DownloadButton}>
          <p>Download All Notes</p>
          <FiDownload ></FiDownload>
        </div>}


      </div>

      <div className={NotesContainer}>
        {NoteFiltered.map((item, index) => {
          return (
            <NoteInput data={item} key={item._id} Time={item.timestamp} Written={true} ></NoteInput>
          )

        })}

      </div>
    </div>
  )
}

export default NotesList

const NoteTypeDropDown = classNames('w-52 left-0 absolute top-10 z-10  cursor-pointer bg-white border-2 shadow-lg right-1')
const NoteTypeDropDownDisappear = classNames('opacity-0  pointer-events-none transition-all duration-500')
const NoteTypeDropDownShow = classNames('opacity-1 transition-all duration-500')
const ArrowPressed = classNames("rotate-180");
const Arrow = classNames("mt-1  transition-all ease-linear ");
const NoteTypeDropDownItem = classNames('hover:bg-gray-300 p-2 pt-2');
const NotesContainer = classNames('mb-10 mt-10')
const NoteTypeButton = classNames('border-2 border-black rounded-md hover:bg-gray-300 py-2 px-2 cursor-pointer  flex items-center justify-between w-full')
const NoteTypeContanier = classNames('relative  w-48')
const DownloadButton = classNames("flex   items-center gap-2 border-2 border-black rounded-md p-2 cursor-pointer hover:bg-gray-300")