import classNames from 'classnames'
import React, { useEffect } from 'react'
import DataContext from '../../../context/DataContext'
import Subtitle from './Subtitle'
import { AiOutlineClose } from 'react-icons/ai';
import { SideBarInterface } from '../../../Interface/PurchasedCourse/SideBarInterface';


type Props = {
  data: SideBarInterface[]
  SetCloseSideBar: Function,
  CloseSideBar: boolean

}




const CourseSideBar = (props: Props) => {
  const { ContentChoosen, SetContentChoosen } = React.useContext(DataContext);


  useEffect(() => {
    //when we press on a note that is written we get it from the database with the content id and the subtitle id 
    //so we set both of these but we dont have the data so here we check if we have a ContentChoosen with no data we set its data
    //@ts-ignore
    if (ContentChoosen.isExercise && ContentChoosen.data.name == "" || !ContentChoosen.isExercise && ContentChoosen.data.url == "") {
      let subtitleIndex = props.data.findIndex((x) => x._id == ContentChoosen.SubtitleID);
      let contentIndex = props.data[subtitleIndex].contents.findIndex((x) => x._id == ContentChoosen.ContentID);
      SetContentChoosen((prev) => {
        return {
          ...prev,
          isExercise: props.data[subtitleIndex].exercise ? true : false,
          data: props.data[subtitleIndex].exercise ?
            { name: (props.data[subtitleIndex].exercise[0]?.exerciseName || "") }
            : { ...prev.data, url: props.data[subtitleIndex].contents[contentIndex].video }
        }
      })

    }


  }, [ContentChoosen])


  let RefsArray: React.RefObject<HTMLDivElement>[] = [];
  let MainRef = React.useRef<HTMLDivElement>(null);
  // const [scrollY, setScrollY] = React.useState(0);
  const [FixSideBar, SetFixSideBar] = React.useState(false);

  for (let i = 0; i < props.data.length; i++) {
    let ref: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
    RefsArray.push(ref);
  }


  function ScrollTo(myRef: React.RefObject<HTMLDivElement>) {
    console.log(MainRef.current?.scrollTop)
    console.log(MainRef.current?.scrollHeight)
    console.log(myRef.current?.offsetTop)

    if (myRef.current) {
      MainRef.current?.scrollTo(
        {
          top: myRef.current?.offsetTop - 100,
          behavior: "smooth"

        }


      );

    }

  }


  function logit() {
    if (scrollY >= 84) {
      SetFixSideBar(true);
    }
    else {
      SetFixSideBar(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  return (

    <div className={SideBarContainer + " " + (!props.CloseSideBar && FixSideBar && FixedSideBar) + " " + (props.CloseSideBar && HiddenSideBar)}>
      <div className={SideBarHeaderContainer}>
        <h1 className={SideBarHeader}>Course Content</h1>
        <AiOutlineClose onClick={() => { props.SetCloseSideBar(true) }} cursor={'pointer'} fontSize={20} />
      </div>
      <div ref={MainRef} className={SideBarSubtitles}>
        {props.data.map((subtitle, index) => {
          return (
            <div ref={RefsArray.length > 0 ? RefsArray[index] : null} onClick={(ref) => ScrollTo(RefsArray[index])}>
              <Subtitle subtitle={subtitle} index={index}></Subtitle>
            </div>


          )

        })}

      </div>


    </div>

  )
}

export default CourseSideBar
const SideBarContainer = classNames("w-[30%] opacity-1 transition-all shadow-md bg-main ");
const SideBarHeaderContainer = classNames("flex w-full justify-between shadow-sm items-center border-b-2 pl-6 pr-6 py-2 bg-gray-100  ");
const SideBarHeader = classNames("text-lg font-bold ");
const SideBarSubtitles = classNames("h-[100vh] overflow-auto ")
const FixedSideBar = classNames("sticky top-0 right-0 z-100 ")
const HiddenSideBar = classNames('opacity-0 w-[0] transition-all duration-300')
