import React, { useRef, useState, createContext } from 'react';
import Layout from './Layout';
import axios from 'axios';
import CourseIcon from '../../components/Instructor/AddNewCourse/CourseIcon/CourseIcon';
import CourseInfo from '../../components/Instructor/AddNewCourse/CourseInfo/CourseInfo';
import CourseSubtitles from '../../components/Instructor/AddNewCourse/CourseSubtitles/CourseSubtitles';
import FormNavigation from '../../components/Instructor/AddNewCourse/FormNavigation/FormNavigation';
import CourseFinalExam from '../../components/Instructor/CourseFinalExam/CourseFinalExam';

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
  finalExam: any, 
  setFinalExam: any,
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
  const courseFinalExamRef = useRef<any>();
  const courseIconRef = useRef<any>();

  const titleRef = useRef<any>();
  const subjectRef = useRef<any>();
  const priceRef = useRef<any>();
  const summaryRef = useRef<any>();
  const levelRef = useRef<any>(null);
  const courseVideoRef = useRef<any>(null);
  const errorMessageRef = useRef<any>();

  const addNewCourseSteps = [courseInfoRef, courseSubtitlesRef, courseFinalExamRef, courseIconRef];
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
  const [finalExam, setFinalExam] = useState<any>(
    {
      courseID: '',
      subtitleName: '',
      exerciseDuration: 0,  
      exerciseTitle: '',
      questions: 
      [{
        problem: '',
        choices: [''],
        answer: '',
      }],
        
      totalGrade: 0
    }
  );
  const [courseIcon, setCourseIcon] = useState<any>('/images/Trophy.png');

  async function submitNewCourse(e: any) {

    var courseHours = 0;
    subtitles.map((subtitle: any) => {
        subtitle.totalMinutes = 0;
        subtitle.contents.map((content: any) => {
            subtitle.totalMinutes += content.duration;
        })
        courseHours += subtitle.totalMinutes;
    });

    axios.defaults.withCredentials = true;
    response = await axios.post("http://localhost:5000/Courses/CreateCourse", {
        instructorID: '63877fb65c8dac5284aaa3c2',
        courseInfo: newCourseInfo,
        courseHours: courseHours,
        subtitles: subtitles,
        courseImage: courseIcon,
    }).then(res => {return res.data});

    console.log(response);

    e.preventDefault();
  }

  return (
    <Layout>
        <AddNewCourseContext.Provider value={{addNewCourseSteps, currentStep, setCurrentStep, newCourseInfo, setNewCourseInfo, subtitles, setSubtitles, setCourseIcon, finalExam, setFinalExam, titleRef, subjectRef, priceRef, summaryRef, levelRef, courseVideoRef, errorMessageRef}}>
          <form className='sb-max:min-w-fit' onChange={() => errorMessageRef.current.innerHTML = ''}>
            <CourseInfo ref={courseInfoRef} />
            <CourseSubtitles ref={courseSubtitlesRef} />
            <CourseFinalExam ref={courseFinalExamRef} />
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