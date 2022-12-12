import React, { useContext, useEffect, useRef } from "react";
import type { NextPage } from "next";
import UserHome from "./User";
import UserProfile from "../components/userProfile/UserProfile";
import Modal from "../components/shared/Modal/Modal";
import classNames from "classnames";
import { HiArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import { Diversity1 } from "@mui/icons-material";
import BigRating from "../components/shared/rating/BigRating";
import DataContext from "../context/DataContext";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const Home: NextPage = () => {

  const homePageHeaderRef = useRef<any>();
  const homePageImageRef = useRef<any>();
  const homePageImageBackgroundRef = useRef<any>();

  const { Rate } = useContext(DataContext);

  const icons = [
    'python.png', 'structure.png', 'java.png', 'c-.png', 'c-sharp.png', 'ai.png', 'cisco.png', 'coding.png', 'cpu.png', 
    'css-3.png', 'cyber-security.png', 'cyber-security (1).png', 'excel.png', 'hacker.png', 'html (1).png', 
    'js.png', 'motherboard.png', 'neural.png', 'node-js.png', 
    'programming-language.png', 'programming.png'
  ];

  useEffect(()=> {
    Array.from(homePageImageRef.current.children).map((image: any) => {
      image.classList.remove('-right-[40rem]');
      image.classList.add('right-2');
    });
    
    homePageImageBackgroundRef.current.classList.remove('opacity-0');
    homePageImageBackgroundRef.current.classList.add('opacity-100');

    homePageHeaderRef.current.classList.remove('opacity-0');
    homePageHeaderRef.current.classList.add('opacity-100');
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

  const addToWishlist = (e: any) => {
    e.currentTarget.children[0].classList.toggle('opacity-0');
    e.currentTarget.children[1].classList.toggle('opacity-0');
  }

  return (
    <div className="relative text-center overflow-hidden pb-8">
      <section id="opening-text" className="flex nv-max:flex-col-reverse items-center justify-between py-8 mx-10">
        <div ref={homePageHeaderRef} className="space-y-6 text-left nv-max:text-center opacity-0 transition-all duration-[1500ms]">
          <h1 className="text-5xl nv-max:text-3xl nv-max:-indent-0 nv-max:pl-0 font-bold -indent-32 pl-32 leading-[4.5rem]">Learn a New Skill Everyday, <br /> Anytime, and Anywhere.</h1>
            <p className="text-xl nv-max:text-lg">
              1000+ Courses covering all tech domains for you to learn and explore
              new opportunities. Learn from Industry Experts and land your Dream
              Job.
            </p>
        </div>
        
        <div className="relative nv:ml-20 min-w-[24rem] min-h-[24rem] nv-max:min-h-[19rem] pointer-events-none flex justify-center">
          <div ref={homePageImageBackgroundRef} className="flex absolute items-center justify-center min-w-[24rem] nv-max:min-w-[18rem] nv-max:min-h-[18rem] min-h-[24rem] bg-canadian-red rounded-full opacity-0 transition-all duration-[1500ms]">
            <div className="w-[22rem] h-[22rem] nv-max:w-[16.5rem] nv-max:h-[16.5rem] bg-calm-red rounded-full"></div>
          </div>
          <div ref={homePageImageRef}>
            <Image as='image' width={'640'} height={'120'} priority className={`${homePageImage} delay-75`} src="/images/Home Page/Part 1.png" alt={""} />
            <Image as='image' width={'640'} height={'120'} priority className={`${homePageImage}`} src="/images/Home Page/Part 2.png" alt={""} />
            <Image as='image' width={'640'} height={'120'} priority className={`${homePageImage}`} src="/images/Home Page/Part 3.png" alt={""} />
            <Image as='image' width={'640'} height={'120'} priority className={`${homePageImage} delay-150`} src="/images/Home Page/Part 4.png" alt={""} />
            <Image as='image' width={'640'} height={'120'} priority className={`${homePageImage} delay-150`} src="/images/Home Page/Part 5.png" alt={""} />
            <Image as='image' width={'640'} height={'120'} priority className={`${homePageImage} delay-75`} src="/images/Home Page/Part 6.png" alt={""} />
          </div>
        </div>
      </section>

      <hr />

      <h1 className="text-4xl text-left font-bold italic m-10 mt-6">A handful Variety of Courses</h1>

      <section id="most-viewed" className="text-left px-20 nv-max:px-0 mb-5">
        <a className="flex justify-between items-center mx-6 hover:text-blue-700 transition-all duration-200">
          <h1 className="text-xl font-bold">Popular Among Learners</h1>
          <HiArrowNarrowRight className='scale-160' />
        </a>
        <div className="overflow-x-auto flex items-center my-1 p-3">
          {
            courseData.slice(0, 7).map((course: any, index: number) => (
              <div className="relative" key={index}>
                <div className={`rounded-2xl z-10 relative bg-white shadow-lg min-w-[15rem] max-w-[15rem] h-[17rem] mr-4`}>
                  <div className={`bg-gradient-to-r relative flex h-30 justify-center items-center rounded-t-2xl ${levelColor(course.level)}`}>
                    <div className="bg-white rounded-full p-3">
                      <Image as='image' height={50} width={50} priority className='min-h-[4rem] min-w-[4rem]' src={`/images/Course Icons/${icons[index]}`} alt={""} />
                    </div>
                    <button onClick={addToWishlist} title="Add to Wishlist" className="absolute right-2 top-2 rounded-full bg-white h-7 w-7 p-2 hover:scale-110 transition-all duration-200">
                      <MdOutlineFavoriteBorder className="scale-125 absolute right-1.5 top-1.5 transition-all duration-200" />
                      <MdOutlineFavorite className="scale-125 absolute text-calm-red right-1.5 top-1.5 opacity-0 transition-all duration-200" />
                    </button>
                    <p className="absolute top-3 text-xs left-2 text-white">213K Views</p>
                  </div>
                  <div className="px-3 pt-2">
                    <h1 className="text-lg font-semibold line-clamp-2">{course.title}</h1>
                    <p className="text-sm text-gray-500">{course.instructorName}</p>
                    <div className="flex items-center justify-around text-sm">
                      <p>4.3</p>
                      <BigRating className='scale-75 whitespace-nowrap w-40' Rate={4.3} RateAction={false} />
                    </div>
                    <p className="italic text-right absolute bottom-2 right-4 text-[#00A15D]">{Math.floor(course.price * Rate.rate)} {Rate.curr}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <section id="most-rated" className="text-left px-20 nv-max:px-0 mt-5">
        <a className="flex justify-between items-center mx-6 hover:text-blue-700 transition-all duration-200">
          <h1 className="text-xl font-bold">Students' Favorite</h1>
          <HiArrowNarrowRight className='scale-160' />
        </a>
        <div className="overflow-x-auto flex items-center my-1 p-3">
        {
            courseData.slice(7, 14).map((course: any, index: number) => (
              <div className="relative" key={index}>
                <div className={`rounded-2xl z-10 relative bg-white shadow-lg min-w-[15rem] max-w-[15rem] h-[17rem] mr-4`}>
                  <div className={`bg-gradient-to-r relative flex h-30 justify-center items-center rounded-t-2xl ${levelColor(course.level)}`}>
                    <div className="bg-white rounded-full p-3">
                      <Image as='image' height={50} width={50} priority className='min-h-[4rem] min-w-[4rem]' src={`/images/Course Icons/${icons[index + 7]}`} alt={""} />
                    </div>
                    <button onClick={addToWishlist} title="Add to Wishlist" className="absolute right-2 top-2 rounded-full bg-white h-7 w-7 p-2 hover:scale-110 transition-all duration-200">
                      <MdOutlineFavoriteBorder className="scale-125 absolute right-1.5 top-1.5 transition-all duration-200" />
                      <MdOutlineFavorite className="scale-125 absolute text-calm-red right-1.5 top-1.5 opacity-0 transition-all duration-200" />
                    </button>
                    <p className="absolute top-3 text-xs left-2 text-white">213K Views</p>
                  </div>
                  <div className="px-3 pt-2">
                    <h1 className="text-lg font-semibold line-clamp-2">{course.title}</h1>
                    <p className="text-sm text-gray-500">{course.instructorName}</p>
                    <div className="flex items-center justify-around text-sm">
                      <p>4.3</p>
                      <BigRating className='scale-75 whitespace-nowrap w-40' Rate={4.3} RateAction={false} />
                    </div>
                    <p className="italic text-right absolute bottom-2 right-4 text-[#00A15D]">{Math.floor(course.price * Rate.rate)} {Rate.curr}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  );
};

var homePageImage = classNames('absolute scale-[1.65] -right-[40rem] top-19 nv-max:scale-135 nv-max:top-9 transition-all duration-1000');

export default Home;

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

{/* <div className="flex justify-center py-20">
  <div className="grid grid-flow-row nv:grid-cols-2 3lg:grid-cols-3 3xl:grid-cols-4 gap-20">
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#1D948E] to-[#3FE0D0]"></div>
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#2B32B2] to-[#1488CC]"></div>
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#2f8608] to-[#52EB0E]"></div>
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#C29904] to-[#FDE143]"></div>
    <div className="rounded-3xl shadow-lg w-[20rem] h-[26rem] bg-gradient-to-br from-[#B20000] to-[#FF4542]"></div>
  </div>
</div> */}