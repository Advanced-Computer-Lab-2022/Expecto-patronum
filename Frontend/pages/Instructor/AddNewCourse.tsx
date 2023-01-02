import React, { useRef, useState, createContext, useContext } from 'react';
import Layout from './Layout';
import axios from 'axios';
import CourseIcon from '../../components/Instructor/AddNewCourse/CourseIcon/CourseIcon';
import CourseInfo from '../../components/Instructor/AddNewCourse/CourseInfo/CourseInfo';
import CourseSubtitles from '../../components/Instructor/AddNewCourse/CourseSubtitles/CourseSubtitles';
import FormNavigation from '../../components/Instructor/AddNewCourse/FormNavigation/FormNavigation';
import CourseFinalExam from '../../components/Instructor/CourseFinalExam/CourseFinalExam';
import { PopupMessageContext } from '../_app';

interface ContextState {
  addNewCourseSteps: any,
  currentStep: any,
  setCurrentStep: any,
  newCourseInfo: any,
  setNewCourseInfo: any,
  subtitles: any,
  setSubtitles: any,
  setCourseIcon: any,
  courseIcon: any,
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

  const { viewPopupMessage } = useContext(PopupMessageContext);

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
      exerciseTitle: 'Final Exam',
      questions: 
      [
        {
          question: '',
          choices: [''],
          answer: '',
        },
        {
          question: '',
          choices: [''],
          answer: '',
        },
        {
          question: '',
          choices: [''],
          answer: '',
        }
      ],
      totalGrade: 3
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

    var exercises = [];
    for(var i = 0; i < subtitles.length; i++) {
      var exercise = {
        exerciseTitle: subtitles[i].exercise.exerciseTitle,
        subtitleName: subtitles[i].header,
        questions: subtitles[i].exercise.questions,
        totalGrade: subtitles[i].exercise.questions.length,
      };
      exercises.push(exercise);
      console.log(subtitles[i].header);
    }

    exercises.push(finalExam);

    axios.defaults.withCredentials = true;
    response = await axios.post("http://localhost:5000/Instructor/addCourse", {
        // courseInfo: newCourseInfo,
        title: newCourseInfo.title,
        subject: newCourseInfo.subject,
        price: newCourseInfo.price,
        courseVideo: newCourseInfo.courseVideoURL,
        summary: newCourseInfo.summary,
        level: newCourseInfo.level,
        courseHours: courseHours,
        subtitles: subtitles,
        courseImage: courseIcon,
        exercises: exercises,
    }).then(res => {
      viewPopupMessage(true, "Your course has been uploaded successfully.");
      return res.data;
    });

    console.log(response);

    e.preventDefault();
  }

  return (
    <Layout>
        <AddNewCourseContext.Provider value={{addNewCourseSteps, currentStep, setCurrentStep, newCourseInfo, courseIcon, setNewCourseInfo, subtitles, setSubtitles, setCourseIcon, finalExam, setFinalExam, titleRef, subjectRef, priceRef, summaryRef, levelRef, courseVideoRef, errorMessageRef}}>
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
  exercise: { exerciseTitle: string; subtitleName: string; questions: { question: string; choices: string[]; answer: string; }[]; };
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
          subtitleName: "",
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