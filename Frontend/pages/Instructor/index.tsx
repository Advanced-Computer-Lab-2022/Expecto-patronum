import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import Layout from "./Layout";
import { IoIosNotificationsOutline } from 'react-icons/io';
import { BsChatDots, BsReply } from 'react-icons/bs';
import DataContext from '../../context/DataContext';
import SmallCourseCard from '../../components/shared/SmallCourseCard/SmallCourseCard';
import { QuestionMarkSharp } from '@mui/icons-material';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import ReviewsAndQuestions from '../../components/shared/Review/ReviewsAndQuestions';
import axios from 'axios';
import SmallCourseCardSkeleton from '../../components/shared/SmallCourseCard/SmallCourseCardSkeleton';
import Skeleton from 'react-loading-skeleton';

type Props = {}

const Instructor = (props: Props) => {

  const Amount = [
    {
      Amount: 69.99,
      month: "Jan '22",
    },
    {
      Amount: 99.96,
      month: "Feb '22",
    },
    {
      Amount: 119.94,
      month: "Mar '22",
    },
    {
      Amount: 259.99,
      month: "Apr '22",
    },
    {
      Amount: 6.98,
      month: "May '22",
    },
  ];

  const questions = [
    {username: 'Antonio Banderas', question: 'Where is my super-suit?'},
    {username: 'Kanye West', question: 'Who touched my Spaghetti?'},
    {username: 'Khaled El-Zawahra', question: 'What about you first courses?'},
    {username: 'Thomas Shelby OBE', question: 'What is the Maximoff Anomaly?'},
    {username: 'Michel Raouf', question: 'Is Norm a communist?'},
    {username: 'Ramy Younis', question: 'What is the difference between Real-time And Non-Real-Time Embedded Systems?'},
  ];

  const icons = [
    'python.png', 'structure.png', 'java.png', 'c-.png', 'c-sharp.png', 'ai.png', 'cisco.png', 'coding.png', 'cpu.png', 
    'css-3.png', 'cyber-security.png', 'cyber-security (1).png', 'excel.png', 'hacker.png', 'html (1).png', 
    'js.png', 'motherboard.png', 'neural.png', 'node-js.png', 
    'programming-language.png', 'programming.png', 'python.png', 'structure.png', 'java.png', 'c-.png', 'c-sharp.png', 'ai.png', 'cisco.png', 'coding.png', 'cpu.png', 
    'css-3.png', 'cyber-security.png',
  ];

  const [topRated, setTopRated] = useState<any>([]);
  const [isTopRatedLoading, setIsTopRatedLoading] = useState<boolean>(true);
  const [amountOwed, setAmountOwed] = useState<any>([]);
  const [isAmountLoading, setIsAmountLoading] = useState<boolean>(true);

  
  async function getAmountOwed() {
    axios.defaults.withCredentials = true;
    await axios.put("http://localhost:5000/Instructor/viewAmountOwned", {
        userID: '63877fb65c8dac5284aaa3c2',
    }).then((res: { data: any }) => {
      setAmountOwed(res.data.amount);
      setIsAmountLoading(false);
    });
  }

  async function getPopularCourses() {
    axios.defaults.withCredentials = true;
    await axios.get("http://localhost:5000/Courses/popularCourses").then((res: { data: any }) => {
      setTopRated(res.data.Courses);
      setIsTopRatedLoading(false);
    });
  }

  useEffect(() => {
    getPopularCourses();
    getAmountOwed();
  }, [])

  function levelColor(level: string) {
    switch(level) {
        case 'Beginner': return 'from-[#2f8608] to-[#52EB0E]';
        case 'Intermediate': return 'from-[#C29904] to-[#FDE143]';
        case 'Advanced': return 'from-[#B20000] to-[#FF4542]';
        case 'AllLevels': return 'from-[#2B32B2] to-[#1488CC]';
        default: return 'from-[#1D948E] to-[#3FE0D0]';
    }
  }

  return (
    <Layout>
      <div className='sb-max:min-w-without-instructor-sidebar-closed p-3'>
        <section className={userBar}>
          <h1 className='text-3xl font-semibold italic'>Welcome back,<br className='sb:hidden' /> Rodin Salem</h1>
          <div className='flex items-center'>
            <button className={notifications}><BsChatDots className='scale-110 pointer-events-none' /></button>
            <button className={newFeedback + " " + notifications}><IoIosNotificationsOutline className='scale-135 pointer-events-none' /></button>
          </div>
        </section>

        <section className='mt-2 flex sb:justify-between sb:space-x-8 sb-max:flex-col-reverse'>

          <div className='sb:max-w-[70%] sb:w-[70%] overflow-hidden rounded-lg border-2 shadow-lg relative sb-max:mt-8'>
            <div id="most-rated" className="text-left mt-3 ml-2">
              <h1 className="text-xl font-bold">Your Students' Favorite</h1>
              <div className="overflow-x-auto overflow-y-hidden flex items-center h-68 4lg:h-fit 4lg:p-3">
                {isTopRatedLoading && <SmallCourseCardSkeleton count={8} className='scale-[0.85] 4lg:mr-10 4lg:scale-100 4lg:hover:scale-[1.01] hover:scale-[0.86]' />}
                {
                  topRated.map((course: any, index: number) => (
                    <SmallCourseCard className={`${index === 0 ? '': '-ml-4'} scale-[0.85] 4lg:mr-10 4lg:scale-100 4lg:hover:scale-[1.01] hover:scale-[0.86]`} course={course} courseColor={levelColor} key={index} index={index} />
                  ))
                }
              </div>
            </div>

            <div className="mt-8 ml-2">
              <h1 className='text-xl font-bold'>Q & A's</h1>
              <p className='-pl-2 indent-2'>Here are some questions asked by your students that they wish for you to answer when available.</p>
              <hr className='my-1 mr-2' />
              <div className='text-left m-3 mb-0 max-h-[40rem] overflow-y-auto'>
                {
                  questions.map((question: any, index: number) => (
                    <div key={index}>
                      <ReviewsAndQuestions user={question} isReview={false} />
                      {(index < questions.length-1) && <hr className='my-4 border-2 rounded-full' />}
                    </div>
                  ))
                }
              </div>
              <a className='inline-block text-center mx-auto w-full py-3 text-blue-600 hover:text-blue-700'>View All Question</a>
            </div>
          </div>

          <div className='sb:max-w-[30%] sb:w-[30%] min-h-fit max-h-[27rem] rounded-lg border-2 shadow-lg'>
            <h1 className='my-2 text-center'>We owe you more than Amount.<br />Here is your Amount Owed per month:</h1>
            <div className='overflow-x-hidden overflow-y-auto border-t-1.5 sb-max:h-40 h-80'>
              {isAmountLoading && <MonthlyCardSkeleton count={4} />}
              {
                amountOwed?.map((amount: any, index: number) => (
                  <MonthlyCard key={index} amount={amount} />
                ))
              }
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

const newFeedback = classNames('after:absolute after:w-2.5 after:h-2.5 after:rounded-full after:bg-orange-500 after:z-50 after:-top-0.5 after:-right-0.5');
const userBar = classNames('flex justify-between items-center mx-2 mb-3');
const notifications = classNames("navbar-link rounded-full border-1.5 border-black hover:text-white hover:bg-black hover:scale-110 mx-2 h-8 w-8 whitespace-nowrap z-10 relative transition-all duration-300 flex items-center justify-center");

type MonthlyCardProps = {
  amount: any,
}
const MonthlyCard = (props: MonthlyCardProps) => {

  const { Rate } = useContext(DataContext);

  return (
    <div className='relative ml-2'>
      <div className='absolute left-2 h-22 bottom-12 w-[0.125rem] bg-bright-gray after:content-[""] after:absolute after:-right-[0.45rem] after:-bottom-4 after:min-h-[1rem] after:min-w-[1rem] after:rounded-full after:border-2 after:border-bright-gray'/>
      {/* <div className='absolute left-2 h-22 top-0 bottom-12 w-[0.125rem] bg-green-600 after:content-[""] after:absolute after:-right-[0.45rem] after:-bottom-4 after:min-h-[1rem] after:min-w-[1rem] after:rounded-full after:border-2 after:border-green-600'/> */}
      <div className='my-6 mr-3 ml-6 text-center bg-white h-20 shadow-md rounded-md flex items-center justify-evenly'>
        <div className='flex flex-col'>
          <h1 className='opacity-60 relative bottom-2 text-sm'>Date</h1>
          <h1>{new Date(props.amount._id.year, props.amount._id.month - 1).toLocaleDateString('en-US', { month: 'short' })} '{props.amount._id.year.toString().substring(2,4)}</h1>
        </div>
        <div className='h-13 rounded-full relative min-w-[0.125rem] bg-gray-300' />
        <div className='flex flex-col'>
          <h1 className='opacity-60 relative bottom-2 text-sm'>Amount</h1>
          <h1>{Rate.curr}{((props.amount.totalAmount * Rate.rate) - 0.01).toFixed(2)}</h1>
        </div>
      </div>
    </div>
  );
}
const MonthlyCardSkeleton = (props: {count: number}) => {

  return (
    <div>
      {
        Array(props.count).fill(0).map((_, index) => (
          <div key={index} className='relative ml-2'>
            <div className='absolute left-2 h-22 bottom-12 w-[0.125rem] bg-bright-gray after:content-[""] after:absolute after:-right-[0.45rem] after:-bottom-4 after:min-h-[1rem] after:min-w-[1rem] after:rounded-full after:border-2 after:border-bright-gray'/>
            <div className='my-6 mr-3 ml-6 text-center bg-white h-20 shadow-md rounded-md flex items-center justify-evenly'>
              <div className='flex flex-col pt-2.5 mr-8'>
                <h1 className='opacity-60 relative bottom-2 text-sm'><Skeleton width={60} height={10} /></h1>
                <h1><Skeleton width={60} height={10} /></h1>
              </div>
              {/* <div className='h-13 rounded-full relative min-w-[0.125rem] bg-gray-300' /> */}
              <div className='flex flex-col pt-2.5'>
                <h1 className='opacity-60 relative bottom-2 text-sm'><Skeleton width={60} height={10} /></h1>
                <h1><Skeleton width={60} height={10} /></h1>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Instructor;

const courseData = [
  {
    "title": "Everything Relative",
    "subject": "Services",
    "instructorName": "Rodin Salem",
    "price": 1084.16,
    "level": "Advanced",
    "courseHours": 42,
    "summary": "Minor contusion of spleen",
  },
  {
    "title": "From Russia with Love",
    "subject": "Accounting",
    "instructorName": "Rodin Salem",
    "price": 915.01,
    "level": "Beginner",
    "courseHours": 29,
    "summary": "Person outsd 3-whl mv inj in nonclsn trnsp acc in traf, sqla",
  },
  {
    "title": "My Left Foot",
    "subject": "Sales",
    "instructorName": "Rodin Salem",
    "price": 2033.43,
    "level": "Advanced",
    "courseHours": 104,
    "summary": "Unequal limb length (acquired), left tibia",
  },
  {
    "title": "Breaking Away",
    "subject": "Sales",
    "instructorName": "Rodin Salem",
    "price": 831.04,
    "level": "Advanced",
    "courseHours": 119,
    "summary": "Toxic effect of chewing tobacco, accidental, subs",
  },
  {
    "title": "One of Our Dinosaurs Is Missing",
    "subject": "Services",
    "instructorName": "Rodin Salem",
    "price": 3990.24,
    "level": "Advanced",
    "courseHours": 57,
    "summary": "Pathological fracture, right hand",
  },
  {
    "title": "Half Nelson",
    "subject": "Human Resources",
    "instructorName": "Rodin Salem",
    "price": 2243.31,
    "level": "Intermediate",
    "courseHours": 170,
    "summary": "Memory deficit following other ntrm intcrn hemorrhage",
  },
  {
    "title": "De la servitude moderne",
    "subject": "Research and Development",
    "instructorName": "Rodin Salem",
    "price": 1960.59,
    "level": "Intermediate",
    "courseHours": 78,
    "summary": "Nondisp avulsion fx right ilium, subs for fx w nonunion",
  },
  {
    "title": "The Apocalypse",
    "subject": "Human Resources",
    "instructorName": "Rodin Salem",
    "price": 1545.45,
    "level": "AllLevels",
    "courseHours": 163,
    "summary": "Pathological fracture, left tibia, subs for fx w nonunion",
  },
  {
    "title": "Sound of My Voice",
    "subject": "Business Development",
    "instructorName": "Rodin Salem",
    "price": 1598.51,
    "level": "Beginner",
    "courseHours": 189,
    "summary": "Suppression of binocular vision",
  },
  {
    "title": "Children of the Corn: Revelation",
    "subject": "Business Development",
    "instructorName": "Rodin Salem",
    "price": 2328.08,
    "level": "Advanced",
    "courseHours": 75,
    "summary": "Underdosing of iron and its compounds",
  },
  {
    "title": "Crimi Clowns: De Movie",
    "subject": "Support",
    "instructorName": "Rodin Salem",
    "price": 620.01,
    "level": "Beginner",
    "courseHours": 22,
    "summary": "Stress fracture, right femur, subs for fx w delay heal",
  },
  {
    "title": "Kiss, The",
    "subject": "Research and Development",
    "instructorName": "Rodin Salem",
    "price": 2475.71,
    "level": "Intermediate",
    "courseHours": 125,
    "summary": "Corrosions of unspecified ear drum, subsequent encounter",
  },
  {
    "title": "Seed",
    "subject": "Product Management",
    "instructorName": "Rodin Salem",
    "price": 2217.22,
    "level": "AllLevels",
    "courseHours": 138,
    "summary": "Sltr-haris Type II physl fx low end r fibula, 7thK",
  },
  {
    "title": "Pocahontas",
    "subject": "Business Development",
    "instructorName": "Rodin Salem",
    "price": 585.97,
    "level": "AllLevels",
    "courseHours": 127,
    "summary": "Poisoning by antitussives, accidental (unintentional), init",
  }
]