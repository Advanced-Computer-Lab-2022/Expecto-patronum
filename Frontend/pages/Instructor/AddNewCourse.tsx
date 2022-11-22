import React, { useRef, useState, createContext } from 'react';
import Layout from './Layout';
import axios from 'axios';
import CourseIcon from '../../components/Instructor/AddNewCourse/CourseIcon/CourseIcon';
import CourseInfo from '../../components/Instructor/AddNewCourse/CourseInfo/CourseInfo';
import CourseSubtitles from '../../components/Instructor/AddNewCourse/CourseSubtitles/CourseSubtitles';
import FormNavigation from '../../components/Instructor/AddNewCourse/FormNavigation/FormNavigation';

interface ContextState {
  addNewCourseSteps: any,
  currentStep: any,
  setCurrentStep: any,
  newCourseInfo: any,
  setNewCourseInfo: any,
  subtitles: any,
  setSubtitles: any,
  setCourseIcon: any,
  titleRef: any,
  subjectRef: any,
  priceRef: any,
  summaryRef: any,
  levelRef: any,
  courseVideoRef: any,
  errorMessageRef: any,
}

const AddNewCourseContext = createContext({} as ContextState);
var response = null;

type Props = {}

const AddNewCourse = (props: Props) => {

  const courseInfoRef  = useRef<any>();
  const courseSubtitlesRef = useRef<any>();
  const courseIconRef = useRef<any>();

  const titleRef = useRef<any>();
  const subjectRef = useRef<any>();
  const priceRef = useRef<any>();
  const summaryRef = useRef<any>();
  const levelRef = useRef<any>(null);
  const courseVideoRef = useRef<any>(null);
  const errorMessageRef = useRef<any>();

  const addNewCourseSteps = [courseInfoRef, courseSubtitlesRef, courseIconRef];
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [newCourseInfo, setNewCourseInfo] = useState<any>(
    {
      title: '',
      subject: '',
      price: '',
      courseVideoURL: '',
      summary: '',
      level: '',
    }
  );
  const [subtitles, setSubtitles] = useState<any>([new Subtitle(), new Subtitle(), new Subtitle()]);
  const [courseIcon, setCourseIcon] = useState<any>('/images/Trophy.png');

  async function submitNewCourse(e: any) {

    e.preventDefault();

    var courseHours = 0;
    subtitles.map((subtitle: any) => {
        subtitle.totalMinutes = 0;
        subtitle.contents.map((content: any) => {
            subtitle.totalMinutes += content.duration;
        })
        courseHours += subtitle.totalMinutes;
    });

    axios.defaults.withCredentials = true;
        response = await axios.post("http://localhost:5000/Course/CreateCourse", {
            courseInfo: newCourseInfo,
            courseHours: courseHours,
            subtitles: subtitles,
            courseIcon: courseIcon,
        }).then(res => {return res.data});

        console.log(response);
  }

  return (
    <Layout>
        <AddNewCourseContext.Provider value={{addNewCourseSteps, currentStep, setCurrentStep, newCourseInfo, setNewCourseInfo, subtitles, setSubtitles, setCourseIcon, titleRef, subjectRef, priceRef, summaryRef, levelRef, courseVideoRef, errorMessageRef}}>
          <form className='sb-max:min-w-fit' onChange={() => errorMessageRef.current.innerHTML = ''}>
            <CourseInfo ref={courseInfoRef} />
            <CourseSubtitles ref={courseSubtitlesRef} />
            <CourseIcon ref={courseIconRef} />
            <FormNavigation submit={submitNewCourse} />
          </form>
        </AddNewCourseContext.Provider>
    </Layout>
  )
}

export default AddNewCourse;
export { AddNewCourseContext }; 
export class Subtitle {
  header: string;
  courseSummary: string;
  exercise: { exerciseTitle: string; questions: { question: string; choices: string[]; answer: string; }[]; };
  contents: { contentTitle: string; video: string; preview: boolean; duration: number; description: string; }[];
  totalMinutes: number;
  constructor() {
      this.header = "";
      this.courseSummary = "";
      this.contents = [
          {
              contentTitle: "",
              video: "",
              preview: false,
              duration: 0,
              description: "",
          },
          {
              contentTitle: "",
              video: "",
              preview: false,
              duration: 0,
              description: "",
          },
          {
              contentTitle: "",
              video: "",
              preview: false,
              duration: 0,
              description: "",
          },
          {
              contentTitle: "",
              video: "",
              preview: false,
              duration: 0,
              description: "",
          }
      ];
      this.exercise = {
          exerciseTitle: "",
          questions: [
              {
                  question: "",
                  choices: [""],
                  answer: "",
              },
              {
                  question: "",
                  choices: [""],
                  answer: "",
              },
              {
                  question: "",
                  choices: [""],
                  answer: "",
              }
          ],
      };
      this.totalMinutes = 0;
  }
}