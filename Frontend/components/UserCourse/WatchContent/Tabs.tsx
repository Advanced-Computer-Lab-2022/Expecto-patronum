import classNames from 'classnames'
import React from 'react'
import { AllCourseDataInterface } from '../../../Interface/PurchasedCourse/AllCourseDataInterface';
import BigRating from '../../shared/rating/BigRating';
import Notes from './Notes';
import OverView from './OverView';

type Props = {
  videoRef: React.RefObject<HTMLVideoElement> | null
  setPause: React.Dispatch<React.SetStateAction<boolean>>
  Next: boolean;
  Prev: boolean;
  HandleNext: () => void;
  HandlePrev: () => void;

}

const Tabs = (props: Props) => {
  let Array = ["OverView", "Notes", "Q/A"];
  const [selected, setSelected] = React.useState("Notes");
  return (
    <div>
      <div className={TabsContainer}>
        <button onClick={props.HandlePrev}>Prev</button>
        <ul className={ListContainer}>
          {Array.map((item, index) => {
            return (
              <li onClick={() => setSelected(item)} className="mr-2">
                <a className={Tab + " " + (item == selected && TabsSelected)}>{item}</a>
              </li>
            )
          })}

        </ul>
        <button onClick={props.HandleNext}>Next</button>

      </div >



      {selected == "OverView" && <OverView ></OverView>}
      {selected == "Notes" && <Notes setPause={props.setPause} videoRef={props.videoRef}></Notes>}
      {selected == "Q/A" && <div>Q/A</div>}
    </div>

  )
}

export default Tabs

const TabsContainer = classNames("text-sm font-medium text-center flex items-center px-4 justify-between text-gray-500 border-b border-gray-200 mb-4");
const ListContainer = classNames("flex flex-wrap -mb-px");
const Tab = classNames("inline-block  ease-in transition-colors p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300");
const TabsSelected = classNames(" text-canadian-red border-canadian-red  hover:text-calm-red hover:border-calm-red");
