import classNames from 'classnames'
import React, { useEffect } from 'react'
import NoteInput from './NoteInput'
import { AiFillPlusCircle } from 'react-icons/ai';
import DataContext from '../../../context/DataContext';

type Props = {
  videoRef: any
  setPause: React.Dispatch<React.SetStateAction<boolean>>
}

const Notes = (props: Props) => {
  const [AddNote, setAddNote] = React.useState(false);
  const { ContentChoosen, SetContentChoosen } = React.useContext(DataContext);
  const [Time, setTime] = React.useState({ hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    if (ContentChoosen.SubtitleID) {
      setAddNote(false);
    }
  }, [ContentChoosen])

  function handleSaveNote() {
    if (props.videoRef && props.videoRef.current) {
      let time = props.videoRef.current.getCurrentTime();
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time - minutes * 60);
      let hours = Math.floor(minutes / 60);
      setTime({ hours, minutes, seconds })
      props.setPause(true);
      // props.videoRef.current.seekTo(40, 'seconds');
    }

  }


  return (
    <div>
      {
        !AddNote &&
        <div onClick={() => { setAddNote(true); handleSaveNote() }} className={CreateNote}>
          <p className={CreateNoteText}>Create a note</p>
          <AiFillPlusCircle fontSize={20} ></AiFillPlusCircle>
        </div>
      }

      {AddNote && <div >
        <NoteInput Time={Time} ></NoteInput>
        <div className={ButtonsContainer}>
          <button onClick={() => { setAddNote(false) }} className={CancelButton}>Cancel </button>
          <button className={NoteInputButton}>Save Note</button>
        </div>
      </div>}
    </div>
  )
}

export default Notes
const NoteInputButton = classNames("text-white text-sm  flex justify-center items-center bg-canadian-red px-2 py-2 rounded-full cursor-pointer");
const CancelButton = classNames("font-bold text-sm t mr-4 cursor-pointer");
const ButtonsContainer = classNames(" w-[90%] flex justify-end mt-4 ");
const CreateNote = classNames("w-[80%] ml-auto mr-auto mt-4 border-2 border-gray-800 rounded-lg p-2 cursor-pointer flex items-center justify-between hover:bg-gray-300")
const CreateNoteText = classNames("text-gray-400 text-lg")
