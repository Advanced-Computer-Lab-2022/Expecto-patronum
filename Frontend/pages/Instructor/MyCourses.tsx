import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Rating from '../../components/shared/rating/Rating';
import Layout from './Layout';
import { BiSearchAlt2 } from 'react-icons/bi';
import { BsGridFill } from 'react-icons/bs';
import { HiViewBoards } from 'react-icons/hi';
import classNames from 'classnames';
import Pagination from '../../components/shared/pagination/Pagination';
import FilterDropdown from '../../components/shared/FilterDropdown/FilterDropdown';
import { AiOutlineClear } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import { TbDiscount2 } from 'react-icons/tb';

type Props = {}

const MyCourses = (props: Props) => {

  const [courses, setCourses] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(totalCount/10));
  const [search, setSearch] = useState('');
  const [isGridViewList, setIsGridViewList] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [filter, setFilter] = useState({
    subject: '',
    price: {
      min: '',
      max: '',
    }
  });

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setNumberOfPages(Math.ceil(totalCount/10));
  }, [totalCount])


  function getCourses(pageIndex: number) {
    isSearch ? courseSearch(pageIndex) : allCourses(pageIndex);
  }

  async function allCourses(pageIndex: number) {
    axios.defaults.withCredentials = true;
    await axios.get("http://localhost:5000/Instructor/filterCourses", {
      params: {
        page: !isSearch ? pageIndex + 1: 1,
        coursesPerPage: 10,
      },
    }).then((res: { data: any }) => {
        console.log( 'Get',res.data.TotalCount);
        setCourses(res.data.Courses);
        setTotalCount(res.data.TotalCount);
      });

      setPage(!isSearch ? pageIndex: 0);
  }

  // On Load & on Page Change
  useEffect(() => {
    getCourses(page);
  }, [page])

  // On Clear Search
  useEffect(() => {
    !isSearch ? getCourses(page): null;
  }, [isSearch])

  function levelColor(level: string) {
      switch(level) {
          case 'Beginner': return 'from-[#2f8608] to-[#52EB0E]';
          case 'Intermediate': return 'from-[#C29904] to-[#FDE143]';
          case 'Advanced': return 'from-[#B20000] to-[#FF4542]';
          case 'AllLevels': return 'from-[#2B32B2] to-[#1488CC]';
          default: return 'from-[#1D948E] to-[#3FE0D0]';
      }
  }

  const expandDescription = (e: any) => {
    e.target.classList.toggle('whitespace-nowrap');
    e.target.classList.toggle('overflow-hidden');
    e.target.classList.toggle('text-ellipsis');
    e.target.classList.toggle('h-fit');
  }

  async function courseSearch(pageIndex: number) {
    await axios.get("http://localhost:5000/Instructor/filterCourses", {
      params: {
          keyword: search,
          page: isSearch ? page + 1: 1,
          coursesPerPage: 10,
          subject: filter.subject === '' ? undefined: filter.subject,
          price: {
            gte: filter.price.min === '' ? undefined: parseInt(filter.price.min),
            lte: filter.price.max === '' ? undefined: parseInt(filter.price.max),
          }
        },
      })
      .then((res: { data: any }) => {
        console.log( 'Search',res.data.TotalCount, isSearch);
        setTotalCount(res.data.TotalCount);
        setCourses(res.data.Courses);
      });
      setPage(isSearch ? pageIndex: 0);
      setIsSearch(true);
  }

  function clearSearchAndFilter() {
    setIsSearch(false);
    setSearch('');
    setFilter({
      subject: '',
      price: {
        min: '',
        max: '',
      }
    });
  }

  return ( 
    <Layout>
        <div className='sb-max:min-w-[100vw] pt-2'>
          <div className='flex mx-12 my-4 sb-max:mx-4 items-center sb:justify-between'>
            <div className='flex items-center'>
              <form id='instructor-search-course' className={searchInputDiv}>
                <input onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search for a course" className={searchInput}/>
                <button type='submit' form='instructor-search-course' onClick={(e) => {courseSearch(page); e.preventDefault()}} className={searchButton + ' ' + (search === '' ? 'cursor-not-allowed': '')} disabled={search === ''}>
                  <BiSearchAlt2 className='scale-125 hover:scale-135 transition-all duration-300' />
                </button>
              </form>
              <button title='Clear Search & Filter' onClick={() => clearSearchAndFilter()} className='rounded-full border-1.5 border-canadian-red text-white bg-canadian-red hover:text-canadian-red hover:bg-main sb-max:ml-1 ml-4 p-1.5 hover:scale-105 transition-all duration-200'><AiOutlineClear /></button>
            </div>
            
            <div className='ml-2 flex items-center'>
              <FilterDropdown filter={filter} setFilter={setFilter} submit={() => courseSearch(page)} />
              <div className='sb-max:hidden flex items-center'>
                <button onClick={() => setIsGridViewList(true)} className={(isGridViewList ? 'text-main bg-gray-700': 'text-gray-700') + ' mx-2 scale-[1.195] rounded-full border-1.5 border-gray-700 border-opacity-70 text-opacity-95 p-[0.271rem] hover:scale-[1.295] hover:text-main hover:bg-gray-700 transition-all duration-200 rotate-90'}><HiViewBoards /></button>
                <button onClick={() => setIsGridViewList(false)} className={(!isGridViewList ? 'text-main bg-gray-700': 'text-gray-700') + ' mx-2 scale-[1.0665] rounded-full border-1.5 border-gray-700 border-opacity-70 text-opacity-95 p-1.5 hover:scale-[1.1665] hover:text-main hover:bg-gray-700 transition-all duration-200'}><BsGridFill /></button>
              </div>
            </div>
          </div>

          <div className={(!isGridViewList ? 'grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-x-20': '') + ' sb-max:ml-8 sb-max:mr-22 text-white mx-8'}>
            {(courses ? courses: courseData).map((course: any, index: number) => {
              return (
                <div key={index} className={`h-42 w-full mb-10 p-4 relative rounded-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 shadow-lg bg-gradient-to-br cursor-pointer ${levelColor(course.level)}`}>
                  <h1 className='text-2xl pr-16'>{course.title}</h1>
                  <div className="bg-white absolute top-0 right-0 w-20 h-10 shadow-lg ease-in duration-300 hover:shadow-sm flex items-center justify-center rounded-lg rounded-tl-none ">
                      <Rating rating={2.47} />
                  </div>
                  <p className='pl-3'>Subject: <span className='opacity-95'>{course.subject}</span></p>
                  <p className='pl-3'>Level: <span className='italic opacity-95'>{course.level === 'AllLevels' ? 'All Levels': course.level}</span></p>
                  <label className='pl-3'>Description:</label>
                  <p onClick={expandDescription} className='pl-6 whitespace-nowrap overflow-hidden sb-max:w-48 text-ellipsis mr-18 sb-max:mr-4'>{course.summary}</p>
                  <a href='/Instructor/Settings/AddDiscount/' title='Add Promotion' className={`${(!isGridViewList ? 'bottom-12 right-4': 'bottom-12 right-40 top-3')} scale-160 absolute opacity-70 hover:opacity-100 sb-max:bottom-12 sb-max:right-4 transition-all duration-300`}><TbDiscount2 /></a>
                  <a href='/Instructor/Settings/EditCourse/' title='Edit Course' className={`${(!isGridViewList ? 'bottom-4 right-4': 'bottom-4 right-28 top-3')} scale-150 absolute opacity-70 hover:opacity-100 sb-max:bottom-4 sb-max:right-4 transition-all duration-300`}><MdModeEditOutline /></a>
                </div>
              );
            })}
          </div>
          <Pagination pageCount={numberOfPages} page={page} setPage={setPage} onClick={courseSearch} getCourses={getCourses} />
        </div>
    </Layout>
  )
}

const searchInputDiv = classNames("flex items-center relative sb-max:mr-1");
const searchInput = classNames("rounded-xl relative w-80 h-8 nv-max:pr-3 bg-main pl-2.5 sb-max:w-48 border-1.5 border-gray-700 border-opacity-50 placeholder:italic placeholder:text-sm bg-transparent tracking-wide focus:outline-0 transition-all duration-300");
const searchButton = classNames("rounded-lg text-gray-300 absolute hover:text-gray-100 h-6 bg-gray-600 px-2 align-top right-1");


const courseData = [
  {
    "title": "Things Are Tough All Over",
    "subject": "Training",
    "instructorName": "Rodin Salem",
    "price": 1272.78,
    "level": "Intermediate",
    "courseHours": 141,
    "summary": "sdffd fddsf fdsdf fddsfds df sdd f dsd f dsffsddf dfdsfdsfdsdf ffddfdd fdddfddf f dsddsf sdfds dfdfsdsdfdsfd dfdfdfdf dsf dsfdfsdds fddfds ddfd dsdfdfd fd fd fd dsfds d sfds fdsfdfdffddfd dsddfddsdfdfdsddssddsds dddsdsf dsfdfd fdfdf sd dsffddfddff sf",
    "subtitles": [
      {
        "header": "Budget/Accounting Analyst IV",
        "totalMinutes": 10210,
        "contents": [
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/149x199.png/ff4444/ffffff",
            "duration": 5,
            "description": "Unsp physl fx upr end humer, r arm, subs for fx w delay heal"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/225x113.png/dddddd/000000",
            "duration": 5,
            "description": "Other ossification of muscle, unspecified lower leg"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/236x221.png/ff4444/ffffff",
            "duration": 8,
            "description": "Benign neoplasm of other specified endocrine glands"
          },
          {
            "contentTitle": "Calyptorhynchus magnificus",
            "video": "http://dummyimage.com/240x169.png/cc0000/ffffff",
            "duration": 2,
            "description": "Corrosion of second degree of chest wall"
          },
          {
            "contentTitle": "Corvus brachyrhynchos",
            "video": "http://dummyimage.com/237x185.png/cc0000/ffffff",
            "duration": 8,
            "description": "Sltr-haris Type I physeal fx phalanx of left toe, sequela"
          }
        ]
      },
      {
        "header": "Engineer III",
        "totalMinutes": 65209,
        "contents": [
          {
            "contentTitle": "Petaurus breviceps",
            "video": "http://dummyimage.com/179x154.png/ff4444/ffffff",
            "duration": 9,
            "description": "Drown due to falling or jumping from burning watercraft"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/101x240.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Displaced oblique fracture of shaft of left ulna, init"
          },
          {
            "contentTitle": "Toxostoma curvirostre",
            "video": "http://dummyimage.com/142x102.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Non-hodg lymphoma, unsp, nodes of ing region and lower limb"
          },
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/117x121.png/dddddd/000000",
            "duration": 10,
            "description": "Fall due to controlled fire, not in bldg, subs"
          },
          {
            "contentTitle": "Loxodonta africana",
            "video": "http://dummyimage.com/174x180.png/ff4444/ffffff",
            "duration": 5,
            "description": "Sltr-haris Type III physl fx low end r tibia, 7thG"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/216x226.png/dddddd/000000",
            "duration": 3,
            "description": "Abrasion of breast, unspecified breast, subsequent encounter"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/204x210.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Crushed betw inflatbl crft and oth wtrcrft/obj due to clsn"
          },
          {
            "contentTitle": "Fulica cristata",
            "video": "http://dummyimage.com/235x187.png/ff4444/ffffff",
            "duration": 3,
            "description": "Other specified injuries of wrist, hand and finger(s)"
          },
          {
            "contentTitle": "Picoides pubescens",
            "video": "http://dummyimage.com/247x150.png/ff4444/ffffff",
            "duration": 1,
            "description": "Extravasation of other vesicant agent, subsequent encounter"
          }
        ]
      },
      {
        "header": "Programmer Analyst II",
        "totalMinutes": 72999,
        "contents": [
          {
            "contentTitle": "Boa constrictor mexicana",
            "video": "http://dummyimage.com/207x241.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Laceration w fb of unsp lesser toe(s) w damage to nail"
          },
          {
            "contentTitle": "Ceratotherium simum",
            "video": "http://dummyimage.com/241x124.png/cc0000/ffffff",
            "duration": 6,
            "description": "Oth fracture of shaft of radius, unsp arm, init for clos fx"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/128x168.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Nondisp fx of medial phalanx of left middle finger, init"
          },
          {
            "contentTitle": "Ursus americanus",
            "video": "http://dummyimage.com/181x249.png/dddddd/000000",
            "duration": 8,
            "description": "Mtrcy driver injured in clsn w statnry object nontraf, subs"
          },
          {
            "contentTitle": "Bubulcus ibis",
            "video": "http://dummyimage.com/162x217.png/cc0000/ffffff",
            "duration": 6,
            "description": "Underdosing of calcium-channel blockers"
          },
          {
            "contentTitle": "Buteo jamaicensis",
            "video": "http://dummyimage.com/107x245.png/ff4444/ffffff",
            "duration": 8,
            "description": "Milt op involving combat using blunt/pierc object, milt"
          },
          {
            "contentTitle": "Sus scrofa",
            "video": "http://dummyimage.com/195x217.png/cc0000/ffffff",
            "duration": 4,
            "description": "Terrorism involving chemical weapons"
          },
          {
            "contentTitle": "Paradoxurus hermaphroditus",
            "video": "http://dummyimage.com/236x117.png/cc0000/ffffff",
            "duration": 9,
            "description": "Corrosion of second degree of lower leg"
          },
          {
            "contentTitle": "Branta canadensis",
            "video": "http://dummyimage.com/235x185.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other reduction defects of lower limb, bilateral"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/184x131.png/ff4444/ffffff",
            "duration": 2,
            "description": "Nondisplaced subtrochanteric fracture of unspecified femur"
          }
        ]
      },
      {
        "header": "Director of Sales",
        "totalMinutes": 30724,
        "contents": [
          {
            "contentTitle": "Myrmecobius fasciatus",
            "video": "http://dummyimage.com/208x100.png/cc0000/ffffff",
            "duration": 8,
            "description": "Other mechanical complication of insulin pump"
          },
          {
            "contentTitle": "Tayassu pecari",
            "video": "http://dummyimage.com/205x165.png/dddddd/000000",
            "duration": 10,
            "description": "Maternal care for other specified fetal problems"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/203x220.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Infections of urethra in pregnancy"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/223x147.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Asphyxiation due to plastic bag, assault"
          },
          {
            "contentTitle": "Phascolarctos cinereus",
            "video": "http://dummyimage.com/238x186.png/cc0000/ffffff",
            "duration": 7,
            "description": "Nicotine dependence, oth tobacco product, w oth disorders"
          },
          {
            "contentTitle": "Crocuta crocuta",
            "video": "http://dummyimage.com/136x107.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Hallucinogen abuse with other hallucinogen-induced disorder"
          }
        ]
      },
      {
        "header": "Administrative Assistant IV",
        "totalMinutes": 37189,
        "contents": [
          {
            "contentTitle": "Callipepla gambelii",
            "video": "http://dummyimage.com/125x135.png/ff4444/ffffff",
            "duration": 7,
            "description": "Other specified events, undetermined intent, sequela"
          },
          {
            "contentTitle": "Naja nivea",
            "video": "http://dummyimage.com/147x240.png/cc0000/ffffff",
            "duration": 1,
            "description": "Leakage of coronary artery bypass graft, subs encntr"
          },
          {
            "contentTitle": "Bettongia penicillata",
            "video": "http://dummyimage.com/135x225.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Displ suprcndl fx w/o intrcndl extn low end unsp femr, 7thD"
          },
          {
            "contentTitle": "Aegypius occipitalis",
            "video": "http://dummyimage.com/245x206.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Type III traum spondylolysis of fifth cervcal vert, sequela"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/172x143.png/dddddd/000000",
            "duration": 10,
            "description": "Inj unsp musc/fasc/tend at forearm level, unsp arm, init"
          },
          {
            "contentTitle": "Numida meleagris",
            "video": "http://dummyimage.com/103x178.png/cc0000/ffffff",
            "duration": 5,
            "description": "Nondisp fx of medial epicondyle of r humerus, sequela"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/178x178.png/cc0000/ffffff",
            "duration": 3,
            "description": "Irritant contact dermatitis due to other chemical products"
          },
          {
            "contentTitle": "Capreolus capreolus",
            "video": "http://dummyimage.com/134x250.png/ff4444/ffffff",
            "duration": 9,
            "description": "Posterior disp fx of sternal end of unspecified clavicle"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/241x202.png/dddddd/000000",
            "duration": 6,
            "description": "Displaced osteochondral fracture of left patella, init"
          },
          {
            "contentTitle": "Merops nubicus",
            "video": "http://dummyimage.com/217x148.png/cc0000/ffffff",
            "duration": 2,
            "description": "Nondisp fx of greater trochanter of unsp femr, 7thF"
          }
        ]
      },
      {
        "header": "Paralegal",
        "totalMinutes": 69673,
        "contents": [
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/201x171.png/dddddd/000000",
            "duration": 4,
            "description": "Fall from, out of or through building or structure"
          },
          {
            "contentTitle": "Ramphastos tucanus",
            "video": "http://dummyimage.com/213x114.png/ff4444/ffffff",
            "duration": 10,
            "description": "Legal intervnt w oth sharp obj, law enforc offl inj, sequela"
          },
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/126x240.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Malignant neoplasm of unspecified round ligament"
          },
          {
            "contentTitle": "Phalacrocorax niger",
            "video": "http://dummyimage.com/162x149.png/dddddd/000000",
            "duration": 10,
            "description": "Other congenital malformations of ribs"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/102x164.png/ff4444/ffffff",
            "duration": 3,
            "description": "Disp fx of medial phalanx of left index finger, sequela"
          },
          {
            "contentTitle": "Chloephaga melanoptera",
            "video": "http://dummyimage.com/202x211.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Toxic effect of unsp spider venom, self-harm, subs"
          },
          {
            "contentTitle": "Chloephaga melanoptera",
            "video": "http://dummyimage.com/171x119.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Unspecified inflammatory spondylopathy, site unspecified"
          },
          {
            "contentTitle": "Actophilornis africanus",
            "video": "http://dummyimage.com/169x235.png/dddddd/000000",
            "duration": 3,
            "description": "Nondisp fx of olecran pro w/o intartic extn unsp ulna"
          },
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/248x210.png/dddddd/000000",
            "duration": 3,
            "description": "Dislocation of MTP joint of unsp great toe, sequela"
          },
          {
            "contentTitle": "Cochlearius cochlearius",
            "video": "http://dummyimage.com/163x217.png/cc0000/ffffff",
            "duration": 6,
            "description": "Infective myositis, unspecified hand"
          }
        ]
      },
      {
        "header": "Accounting Assistant I",
        "totalMinutes": 8271,
        "contents": [
          {
            "contentTitle": "Laniaurius atrococcineus",
            "video": "http://dummyimage.com/192x230.png/dddddd/000000",
            "duration": 6,
            "description": "Pecked by turkey, initial encounter"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/145x207.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Poisn by succinimides and oxazolidinediones, self-harm, init"
          },
          {
            "contentTitle": "Felis wiedi or Leopardus weidi",
            "video": "http://dummyimage.com/155x193.png/cc0000/ffffff",
            "duration": 1,
            "description": "Selective serotonin reuptake inhibitors"
          },
          {
            "contentTitle": "Kobus vardonii vardoni",
            "video": "http://dummyimage.com/217x211.png/dddddd/000000",
            "duration": 8,
            "description": "Fracture of oth skull and facial bones, right side, sequela"
          },
          {
            "contentTitle": "Theropithecus gelada",
            "video": "http://dummyimage.com/134x232.png/dddddd/000000",
            "duration": 10,
            "description": "Fracture of other parts of neck"
          },
          {
            "contentTitle": "Raphicerus campestris",
            "video": "http://dummyimage.com/223x212.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Type II occipital condyle fracture, unspecified side, init"
          },
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/119x238.png/cc0000/ffffff",
            "duration": 8,
            "description": "Cont preg aft elctv fetl rdct of 1 fts or more,1st tri, unsp"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/144x180.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Driver of pk-up/van injured in clsn w pedl cyc nontraf, subs"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/114x194.png/ff4444/ffffff",
            "duration": 6,
            "description": "Ca in situ skin of right ear and external auricular canal"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/167x158.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Pedestrian injured in traf involving oth mv, sequela"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/225x156.png/ff4444/ffffff",
            "duration": 3,
            "description": "Unsp injury of right innominate or subclavian vein, sequela"
          }
        ]
      },
      {
        "header": "Physical Therapy Assistant",
        "totalMinutes": 3054,
        "contents": [
          {
            "contentTitle": "Prionace glauca",
            "video": "http://dummyimage.com/100x116.png/cc0000/ffffff",
            "duration": 8,
            "description": "Tuberculous arthritis of other joints"
          },
          {
            "contentTitle": "Milvus migrans",
            "video": "http://dummyimage.com/216x202.png/cc0000/ffffff",
            "duration": 1,
            "description": "Hordeolum internum"
          },
          {
            "contentTitle": "Lepilemur rufescens",
            "video": "http://dummyimage.com/125x173.png/cc0000/ffffff",
            "duration": 5,
            "description": "Bitten by cow, subsequent encounter"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/137x144.png/dddddd/000000",
            "duration": 3,
            "description": "Thrombosis due to cardiac prosth dev/grft, subs"
          },
          {
            "contentTitle": "Aquila chrysaetos",
            "video": "http://dummyimage.com/227x214.png/dddddd/000000",
            "duration": 10,
            "description": "Toxic effect of homologues of benzene, assault, subs encntr"
          }
        ]
      },
      {
        "header": "Operator",
        "totalMinutes": 36333,
        "contents": [
          {
            "contentTitle": "Catharacta skua",
            "video": "http://dummyimage.com/232x130.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Nondisplaced intertrochanteric fracture of right femur"
          },
          {
            "contentTitle": "Microcavia australis",
            "video": "http://dummyimage.com/183x145.png/dddddd/000000",
            "duration": 2,
            "description": "4-part fx surg neck of l humerus, subs for fx w routn heal"
          },
          {
            "contentTitle": "Martes americana",
            "video": "http://dummyimage.com/159x196.png/ff4444/ffffff",
            "duration": 8,
            "description": "Nondisplaced dome fracture of right acetabulum, sequela"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/114x220.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Quadruplet liveborn infant, delivered vaginally"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/223x115.png/dddddd/000000",
            "duration": 10,
            "description": "Sltr-haris Type II physl fx upr end humer, unsp arm, 7thP"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/247x217.png/dddddd/000000",
            "duration": 10,
            "description": "Nondisp seg fx shaft of l tibia, subs for clos fx w malunion"
          },
          {
            "contentTitle": "Bucorvus leadbeateri",
            "video": "http://dummyimage.com/172x226.png/ff4444/ffffff",
            "duration": 5,
            "description": "Displaced transverse fracture of shaft of unspecified radius"
          },
          {
            "contentTitle": "Alligator mississippiensis",
            "video": "http://dummyimage.com/146x126.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Unspecified injury of left carotid artery, subs encntr"
          },
          {
            "contentTitle": "Spermophilus armatus",
            "video": "http://dummyimage.com/133x107.png/ff4444/ffffff",
            "duration": 9,
            "description": "Partial traumatic amputation of unspecified midfoot, sequela"
          },
          {
            "contentTitle": "Chamaelo sp.",
            "video": "http://dummyimage.com/114x192.png/cc0000/ffffff",
            "duration": 8,
            "description": "Burn of 2nd deg mul sites of unsp lower limb, except ank/ft"
          },
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/212x191.png/ff4444/ffffff",
            "duration": 10,
            "description": "Path fx in neopltc disease, l ulna, subs for fx w routn heal"
          }
        ]
      },
      {
        "header": "Nuclear Power Engineer",
        "totalMinutes": 47600,
        "contents": [
          {
            "contentTitle": "Iguana iguana",
            "video": "http://dummyimage.com/119x160.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Bent bone of unsp radius, subs for clos fx w delay heal"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/180x106.png/cc0000/ffffff",
            "duration": 4,
            "description": "Displ commnt fx shaft of rad, r arm, 7thN"
          },
          {
            "contentTitle": "Pycnonotus nigricans",
            "video": "http://dummyimage.com/181x205.png/dddddd/000000",
            "duration": 2,
            "description": "Displ seg fx shaft of r tibia, init for opn fx type I/2"
          },
          {
            "contentTitle": "Pycnonotus barbatus",
            "video": "http://dummyimage.com/234x147.png/cc0000/ffffff",
            "duration": 8,
            "description": "Corrosion of third degree of right foot, sequela"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/195x188.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Partial traumatic amputation of left midfoot, subs encntr"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/208x185.png/ff4444/ffffff",
            "duration": 5,
            "description": "Disp fx of lateral cuneiform of unsp ft, 7thK"
          },
          {
            "contentTitle": "Tapirus terrestris",
            "video": "http://dummyimage.com/127x118.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Exfoliatn due to erythemat cond w 60-69 pct of body surface"
          }
        ]
      },
      {
        "header": "Web Designer I",
        "totalMinutes": 34413,
        "contents": [
          {
            "contentTitle": "Leprocaulinus vipera",
            "video": "http://dummyimage.com/174x210.png/cc0000/ffffff",
            "duration": 5,
            "description": "Benign lipomatous neoplasm, unspecified"
          },
          {
            "contentTitle": "Mirounga angustirostris",
            "video": "http://dummyimage.com/149x181.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Osteonecrosis due to drugs, unspecified fibula"
          },
          {
            "contentTitle": "Pterocles gutturalis",
            "video": "http://dummyimage.com/199x100.png/cc0000/ffffff",
            "duration": 8,
            "description": "Driver of bus injured in clsn w nonmtr vehicle in traf, init"
          },
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/103x150.png/ff4444/ffffff",
            "duration": 8,
            "description": "Osteitis condensans, unspecified hand"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/106x183.png/dddddd/000000",
            "duration": 10,
            "description": "Maternal care for oth isoimmun, third trimester, fetus 4"
          }
        ]
      },
      {
        "header": "Chief Design Engineer",
        "totalMinutes": 53796,
        "contents": [
          {
            "contentTitle": "Nycticorax nycticorax",
            "video": "http://dummyimage.com/214x114.png/cc0000/ffffff",
            "duration": 3,
            "description": "Contact with powered kitchen appliance, subsequent encounter"
          },
          {
            "contentTitle": "Erinaceus frontalis",
            "video": "http://dummyimage.com/208x207.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Cerebral infrc due to embolism of unsp post cerebral artery"
          },
          {
            "contentTitle": "Chionis alba",
            "video": "http://dummyimage.com/192x250.png/dddddd/000000",
            "duration": 3,
            "description": "Oth injury of ulnar artery at forearm level, unspecified arm"
          },
          {
            "contentTitle": "Odocoileus hemionus",
            "video": "http://dummyimage.com/206x123.png/ff4444/ffffff",
            "duration": 3,
            "description": "Encntr screen for certain developmental disorders in chldhd"
          },
          {
            "contentTitle": "Eira barbata",
            "video": "http://dummyimage.com/118x179.png/ff4444/ffffff",
            "duration": 2,
            "description": "Exposure to other animate mechanical forces"
          },
          {
            "contentTitle": "Gazella granti",
            "video": "http://dummyimage.com/120x242.png/cc0000/ffffff",
            "duration": 6,
            "description": "Malignant neoplasm of connective and soft tissue of thorax"
          },
          {
            "contentTitle": "Mirounga leonina",
            "video": "http://dummyimage.com/100x216.png/cc0000/ffffff",
            "duration": 7,
            "description": "Prsn brd/alit a car injured in collision w van"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/130x131.png/cc0000/ffffff",
            "duration": 1,
            "description": "Other intervertebral disc degeneration, thoracic region"
          },
          {
            "contentTitle": "Aegypius occipitalis",
            "video": "http://dummyimage.com/184x139.png/cc0000/ffffff",
            "duration": 4,
            "description": "Contusion of left hand, subsequent encounter"
          },
          {
            "contentTitle": "Gymnorhina tibicen",
            "video": "http://dummyimage.com/248x219.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Unsp inj intrns musc/fasc/tend l idx fngr at wrs/hnd lv,init"
          },
          {
            "contentTitle": "Bucorvus leadbeateri",
            "video": "http://dummyimage.com/192x122.png/ff4444/ffffff",
            "duration": 7,
            "description": "Alcohol use, unsp with alcohol-induced persisting dementia"
          }
        ]
      },
      {
        "header": "Account Coordinator",
        "totalMinutes": 1405,
        "contents": [
          {
            "contentTitle": "Graspus graspus",
            "video": "http://dummyimage.com/191x100.png/ff4444/ffffff",
            "duration": 2,
            "description": "Milt op w dest arcrft due to clsn w oth arcrft, civ, init"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/127x197.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Nondisp fx of neck of scapula, r shoulder, init for opn fx"
          },
          {
            "contentTitle": "Tayassu pecari",
            "video": "http://dummyimage.com/147x212.png/cc0000/ffffff",
            "duration": 8,
            "description": "Interstitial myositis of unspecified site"
          },
          {
            "contentTitle": "Speothos vanaticus",
            "video": "http://dummyimage.com/200x172.png/ff4444/ffffff",
            "duration": 2,
            "description": "Unsp inj musc/tend post grp at low leg lev, right leg, init"
          },
          {
            "contentTitle": "Haliaeetus leucoryphus",
            "video": "http://dummyimage.com/140x176.png/dddddd/000000",
            "duration": 1,
            "description": "Decreased fetal movements, third trimester, fetus 3"
          },
          {
            "contentTitle": "Gorilla gorilla",
            "video": "http://dummyimage.com/147x204.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Injury of oth blood vessels at shoulder and upper arm level"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/142x114.png/ff4444/ffffff",
            "duration": 9,
            "description": "Twin pregnancy, dichorionic/diamniotic, second trimester"
          }
        ]
      },
      {
        "header": "Technical Writer",
        "totalMinutes": 91572,
        "contents": [
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/159x208.png/ff4444/ffffff",
            "duration": 7,
            "description": "Burn of second degree of left upper arm, subs encntr"
          },
          {
            "contentTitle": "Trichoglossus chlorolepidotus",
            "video": "http://dummyimage.com/118x243.png/cc0000/ffffff",
            "duration": 3,
            "description": "Oth injuries of unspecified part of neck, init encntr"
          },
          {
            "contentTitle": "Threskionis aethiopicus",
            "video": "http://dummyimage.com/135x192.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Displ spiral fx shaft of ulna, unsp arm, 7thD"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/145x110.png/cc0000/ffffff",
            "duration": 3,
            "description": "Injury of unspecified iliac blood vessel(s), sequela"
          },
          {
            "contentTitle": "Anas platyrhynchos",
            "video": "http://dummyimage.com/127x175.png/ff4444/ffffff",
            "duration": 4,
            "description": "Amebiasis"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/208x179.png/ff4444/ffffff",
            "duration": 7,
            "description": "Driver of 3-whl mv inj in clsn w rail trn/veh nontraf, init"
          },
          {
            "contentTitle": "Platalea leucordia",
            "video": "http://dummyimage.com/152x120.png/cc0000/ffffff",
            "duration": 9,
            "description": "Salter-Harris Type III physeal fracture of r calcaneus, init"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/206x192.png/cc0000/ffffff",
            "duration": 9,
            "description": "Poisoning by other psychodysleptics, intentional self-harm"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/200x107.png/dddddd/000000",
            "duration": 5,
            "description": "Inj radial artery at forearm level, unsp arm, sequela"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/184x163.png/ff4444/ffffff",
            "duration": 1,
            "description": "Disp fx of head of left radius, init for opn fx type 3A/B/C"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/187x136.png/cc0000/ffffff",
            "duration": 6,
            "description": "Unsp inj musc/fasc/tend at shldr/up arm, left arm, init"
          },
          {
            "contentTitle": "Tachyglossus aculeatus",
            "video": "http://dummyimage.com/118x139.png/dddddd/000000",
            "duration": 8,
            "description": "Age-rel osteopor w current path fx, r shoulder, sequela"
          },
          {
            "contentTitle": "Cynomys ludovicianus",
            "video": "http://dummyimage.com/172x153.png/ff4444/ffffff",
            "duration": 1,
            "description": "Athscl native arteries of extrm w rest pain, bilateral legs"
          },
          {
            "contentTitle": "Tockus erythrorhyncus",
            "video": "http://dummyimage.com/140x244.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Unsp opn wnd abd wall, l upr q w/o penet perit cav, init"
          }
        ]
      },
      {
        "header": "Marketing Manager",
        "totalMinutes": 28386,
        "contents": [
          {
            "contentTitle": "Ictonyx striatus",
            "video": "http://dummyimage.com/206x152.png/ff4444/ffffff",
            "duration": 10,
            "description": "Unsp injury of great saphenous at lower leg level, right leg"
          },
          {
            "contentTitle": "Sylvilagus floridanus",
            "video": "http://dummyimage.com/210x228.png/ff4444/ffffff",
            "duration": 4,
            "description": "Displ transverse fx shaft of l tibia, 7thJ"
          },
          {
            "contentTitle": "Mellivora capensis",
            "video": "http://dummyimage.com/249x214.png/dddddd/000000",
            "duration": 8,
            "description": "Endometrial hyperplasia"
          },
          {
            "contentTitle": "Felis concolor",
            "video": "http://dummyimage.com/163x129.png/cc0000/ffffff",
            "duration": 10,
            "description": "Maternal care for fetal problem, unsp, first trimester, unsp"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/191x112.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Disp fx of 3rd metatarsal bone, l ft, subs for fx w malunion"
          },
          {
            "contentTitle": "Melophus lathami",
            "video": "http://dummyimage.com/113x235.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Oth soft tissue disorders related to use/pressure, r low leg"
          },
          {
            "contentTitle": "Phoenicopterus chilensis",
            "video": "http://dummyimage.com/141x161.png/ff4444/ffffff",
            "duration": 5,
            "description": "Derangement of unsp lat mensc due to old tear/inj, left knee"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/143x151.png/dddddd/000000",
            "duration": 10,
            "description": "Monteggia's fx unsp ulna, subs for clos fx w malunion"
          },
          {
            "contentTitle": "Laniarius ferrugineus",
            "video": "http://dummyimage.com/220x173.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Oth cond assoc w female genital organs and menstrual cycle"
          }
        ]
      },
      {
        "header": "Engineer II",
        "totalMinutes": 37032,
        "contents": [
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/126x173.png/dddddd/000000",
            "duration": 10,
            "description": "Adult physical abuse, confirmed"
          },
          {
            "contentTitle": "Cacatua galerita",
            "video": "http://dummyimage.com/162x145.png/ff4444/ffffff",
            "duration": 5,
            "description": "Frostbite with tissue necrosis of unspecified toe(s)"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/154x226.png/dddddd/000000",
            "duration": 2,
            "description": "Fetus-to-fetus placental transfuse syndrome, third trimester"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/114x171.png/ff4444/ffffff",
            "duration": 8,
            "description": "Collapsed vert, NEC, cervicothor rgn, 7thG"
          },
          {
            "contentTitle": "Isoodon obesulus",
            "video": "http://dummyimage.com/144x237.png/dddddd/000000",
            "duration": 5,
            "description": "Disp fx of coronoid pro of unsp ulna, 7thG"
          },
          {
            "contentTitle": "Marmota flaviventris",
            "video": "http://dummyimage.com/121x123.png/cc0000/ffffff",
            "duration": 10,
            "description": "Nondisplaced spiral fracture of shaft of left fibula, init"
          },
          {
            "contentTitle": "Nasua narica",
            "video": "http://dummyimage.com/137x232.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Unsp fx fifth MC bone, right hand, subs for fx w malunion"
          },
          {
            "contentTitle": "Libellula quadrimaculata",
            "video": "http://dummyimage.com/127x249.png/dddddd/000000",
            "duration": 10,
            "description": "Nondisp commnt fx shaft of ulna, r arm, 7thJ"
          },
          {
            "contentTitle": "Ephippiorhynchus mycteria",
            "video": "http://dummyimage.com/193x171.png/dddddd/000000",
            "duration": 2,
            "description": "Disp fx of hook pro of hamate bone, unsp wrs, 7thD"
          }
        ]
      },
      {
        "header": "Desktop Support Technician",
        "totalMinutes": 88939,
        "contents": [
          {
            "contentTitle": "Leptoptilus dubius",
            "video": "http://dummyimage.com/129x120.png/ff4444/ffffff",
            "duration": 6,
            "description": "External constriction of toe"
          },
          {
            "contentTitle": "Herpestes javanicus",
            "video": "http://dummyimage.com/151x159.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Cyst and mucocele of nose and nasal sinus"
          },
          {
            "contentTitle": "Agelaius phoeniceus",
            "video": "http://dummyimage.com/127x185.png/dddddd/000000",
            "duration": 5,
            "description": "Oth maternal infec/parastc diseases complicating pregnancy"
          },
          {
            "contentTitle": "Phalacrocorax albiventer",
            "video": "http://dummyimage.com/164x207.png/dddddd/000000",
            "duration": 10,
            "description": "Contusion of unsp lesser toe(s) w damage to nail, init"
          },
          {
            "contentTitle": "Sagittarius serpentarius",
            "video": "http://dummyimage.com/162x227.png/dddddd/000000",
            "duration": 6,
            "description": "Congenital malform of eyelid, lacrimal apparatus and orbit"
          },
          {
            "contentTitle": "Mungos mungo",
            "video": "http://dummyimage.com/111x217.png/cc0000/ffffff",
            "duration": 8,
            "description": "Blister (nonthermal), unspecified hip"
          },
          {
            "contentTitle": "Myrmecophaga tridactyla",
            "video": "http://dummyimage.com/122x100.png/cc0000/ffffff",
            "duration": 6,
            "description": "Arthritis due to other bacteria, right hip"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/142x184.png/dddddd/000000",
            "duration": 9,
            "description": "Burn unsp deg of unsp site left lower limb, ex ank/ft, init"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/208x244.png/dddddd/000000",
            "duration": 10,
            "description": "Derang of post horn of lat mensc due to old tear/inj, l knee"
          },
          {
            "contentTitle": "Notechis semmiannulatus",
            "video": "http://dummyimage.com/117x127.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Fx oth prt scapula, l shoulder, subs for fx w delay heal"
          },
          {
            "contentTitle": "Dicrurus adsimilis",
            "video": "http://dummyimage.com/172x175.png/dddddd/000000",
            "duration": 10,
            "description": "Unspecified fracture of first metacarpal bone, left hand"
          },
          {
            "contentTitle": "Genetta genetta",
            "video": "http://dummyimage.com/140x197.png/cc0000/ffffff",
            "duration": 8,
            "description": "Corros unsp deg mult fingers (nail), not including thumb"
          },
          {
            "contentTitle": "Gymnorhina tibicen",
            "video": "http://dummyimage.com/189x189.png/ff4444/ffffff",
            "duration": 10,
            "description": "Poisoning by oth bacterial vaccines, accidental, sequela"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/108x117.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Path fx in neopltc disease, r fibula, subs for fx w malunion"
          },
          {
            "contentTitle": "Lamprotornis sp.",
            "video": "http://dummyimage.com/180x174.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Cutaneous abscess of limb"
          },
          {
            "contentTitle": "Speothos vanaticus",
            "video": "http://dummyimage.com/179x151.png/cc0000/ffffff",
            "duration": 8,
            "description": "Contus/lac r cereb w LOC w death due to oth cause bf consc"
          }
        ]
      },
      {
        "header": "Cost Accountant",
        "totalMinutes": 13132,
        "contents": [
          {
            "contentTitle": "Zalophus californicus",
            "video": "http://dummyimage.com/149x224.png/ff4444/ffffff",
            "duration": 4,
            "description": "Human immunodef virus disease comp preg, third trimester"
          },
          {
            "contentTitle": "Cebus albifrons",
            "video": "http://dummyimage.com/202x130.png/cc0000/ffffff",
            "duration": 6,
            "description": "Other infective (teno)synovitis, multiple sites"
          },
          {
            "contentTitle": "Actophilornis africanus",
            "video": "http://dummyimage.com/118x115.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Other noninflammatory disorders of the testis"
          },
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/243x234.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Other cyst of bone, right ankle and foot"
          },
          {
            "contentTitle": "Philetairus socius",
            "video": "http://dummyimage.com/178x194.png/cc0000/ffffff",
            "duration": 1,
            "description": "Nondisp spiral fx shaft of ulna, r arm, 7thB"
          },
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/161x232.png/cc0000/ffffff",
            "duration": 7,
            "description": "Age-rel osteopor w crnt path fx, l hand, 7thK"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/230x119.png/dddddd/000000",
            "duration": 5,
            "description": "Occup of 3-whl mv injured in clsn w hv veh in traf, subs"
          },
          {
            "contentTitle": "Coluber constrictor foxii",
            "video": "http://dummyimage.com/134x228.png/ff4444/ffffff",
            "duration": 2,
            "description": "Milt op w explosn due to acc disch of own munit, civ, sqla"
          },
          {
            "contentTitle": "Ciconia ciconia",
            "video": "http://dummyimage.com/155x140.png/ff4444/ffffff",
            "duration": 10,
            "description": "Adult osteomalacia"
          },
          {
            "contentTitle": "Upupa epops",
            "video": "http://dummyimage.com/104x225.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Unsp fx shaft of unsp ulna, subs for clos fx w routn heal"
          },
          {
            "contentTitle": "Acanthaster planci",
            "video": "http://dummyimage.com/105x151.png/dddddd/000000",
            "duration": 4,
            "description": "Asphyxiation"
          },
          {
            "contentTitle": "Crotalus adamanteus",
            "video": "http://dummyimage.com/102x178.png/dddddd/000000",
            "duration": 9,
            "description": "Nontraumatic ischemic infarction of muscle, unspecified hand"
          },
          {
            "contentTitle": "Pelecanus occidentalis",
            "video": "http://dummyimage.com/128x137.png/dddddd/000000",
            "duration": 5,
            "description": "Oth forn object in oth prt resp tract cause oth injury, init"
          },
          {
            "contentTitle": "Zenaida galapagoensis",
            "video": "http://dummyimage.com/149x190.png/dddddd/000000",
            "duration": 9,
            "description": "Medial epicondylitis"
          },
          {
            "contentTitle": "Lamprotornis superbus",
            "video": "http://dummyimage.com/218x214.png/cc0000/ffffff",
            "duration": 6,
            "description": "Hypertensive heart disease without heart failure"
          },
          {
            "contentTitle": "Zenaida galapagoensis",
            "video": "http://dummyimage.com/196x238.png/ff4444/ffffff",
            "duration": 1,
            "description": "Nondisp seg fx shaft of r fibula, 7thC"
          },
          {
            "contentTitle": "Anthropoides paradisea",
            "video": "http://dummyimage.com/244x100.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Diab due to undrl cond w mod nonprlf diab rtnop w mclr edema"
          },
          {
            "contentTitle": "Tragelaphus scriptus",
            "video": "http://dummyimage.com/235x101.png/cc0000/ffffff",
            "duration": 3,
            "description": "Unsp inj intrns musc/fasc/tend r rng fngr at wrs/hnd lv,subs"
          },
          {
            "contentTitle": "Zenaida asiatica",
            "video": "http://dummyimage.com/197x143.png/cc0000/ffffff",
            "duration": 5,
            "description": "Finding of steroid agent in blood"
          }
        ]
      },
      {
        "header": "Human Resources Assistant III",
        "totalMinutes": 49359,
        "contents": [
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/225x114.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Nondisp fx of shaft of unspecified clavicle, sequela"
          },
          {
            "contentTitle": "Sarcorhamphus papa",
            "video": "http://dummyimage.com/233x211.png/ff4444/ffffff",
            "duration": 3,
            "description": "Displaced avulsion fx tuberosity of l calcaneus, init"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/206x211.png/ff4444/ffffff",
            "duration": 2,
            "description": "Unsp open wound of unsp thumb w/o damage to nail, subs"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/125x117.png/dddddd/000000",
            "duration": 5,
            "description": "Problems related to employment and unemployment"
          },
          {
            "contentTitle": "Macropus fuliginosus",
            "video": "http://dummyimage.com/176x171.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Age-related choroidal atrophy, left eye"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/111x224.png/cc0000/ffffff",
            "duration": 9,
            "description": "Maternal care for viable fetus in abd preg, third tri, oth"
          },
          {
            "contentTitle": "Zenaida galapagoensis",
            "video": "http://dummyimage.com/169x133.png/dddddd/000000",
            "duration": 10,
            "description": "Non-prs chr ulcer oth prt unsp low leg lmt to brkdwn skin"
          },
          {
            "contentTitle": "Epicrates cenchria maurus",
            "video": "http://dummyimage.com/216x234.png/ff4444/ffffff",
            "duration": 5,
            "description": "Lacerat musc/tend the rotator cuff of unsp shoulder, subs"
          },
          {
            "contentTitle": "Chloephaga melanoptera",
            "video": "http://dummyimage.com/140x149.png/dddddd/000000",
            "duration": 5,
            "description": "Benign neoplasm of unspecified kidney"
          },
          {
            "contentTitle": "Delphinus delphis",
            "video": "http://dummyimage.com/210x198.png/ff4444/ffffff",
            "duration": 5,
            "description": "Lacerat intrinsic musc/fasc/tend r rng fngr at wrs/hnd lv"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/157x133.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Unspecified fracture of shaft of unspecified ulna"
          },
          {
            "contentTitle": "Tockus erythrorhyncus",
            "video": "http://dummyimage.com/245x188.png/cc0000/ffffff",
            "duration": 6,
            "description": "Matern care for known or susp placntl insuff, 2nd tri, fts1"
          },
          {
            "contentTitle": "Ictalurus furcatus",
            "video": "http://dummyimage.com/174x182.png/ff4444/ffffff",
            "duration": 10,
            "description": "Poisoning by emetics, undetermined, sequela"
          },
          {
            "contentTitle": "Geochelone elephantopus",
            "video": "http://dummyimage.com/165x107.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Burn of left eye and adnexa, part unspecified, sequela"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/117x121.png/cc0000/ffffff",
            "duration": 6,
            "description": "Dissection of other specified artery"
          }
        ]
      }
    ]
  },
  {
    "title": "The Man Who Loved Yngve",
    "subject": "Support",
    "instructorName": "Rodin Salem",
    "price": 1500.86,
    "level": "Advanced",
    "courseHours": 76,
    "summary": "Unsp fx left femur, subs for opn fx type I/2 w delay heal",
    "subtitles": [
      {
        "header": "Assistant Professor",
        "totalMinutes": 13065,
        "contents": [
          {
            "contentTitle": "Nyctanassa violacea",
            "video": "http://dummyimage.com/228x171.png/dddddd/000000",
            "duration": 9,
            "description": "Laceration with foreign body of right forearm, sequela"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/155x203.png/ff4444/ffffff",
            "duration": 5,
            "description": "Poisoning by other general anesthetics, assault, init encntr"
          },
          {
            "contentTitle": "Cyrtodactylus louisiadensis",
            "video": "http://dummyimage.com/190x153.png/cc0000/ffffff",
            "duration": 8,
            "description": "Personal history of other malignant neoplasm of stomach"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/157x210.png/cc0000/ffffff",
            "duration": 9,
            "description": "Nondisp spiral fx shaft of ulna, r arm, 7thF"
          },
          {
            "contentTitle": "Tayassu tajacu",
            "video": "http://dummyimage.com/231x250.png/dddddd/000000",
            "duration": 9,
            "description": "Idiopathic aseptic necrosis of left tibia"
          }
        ]
      },
      {
        "header": "Senior Editor",
        "totalMinutes": 44886,
        "contents": [
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/133x236.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Corrosion of unspecified degree of right knee, init encntr"
          },
          {
            "contentTitle": "Aonyx capensis",
            "video": "http://dummyimage.com/162x247.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Acute paralytic poliomyelitis, wild virus, imported"
          },
          {
            "contentTitle": "Tauraco porphyrelophus",
            "video": "http://dummyimage.com/138x230.png/ff4444/ffffff",
            "duration": 4,
            "description": "Laceration of flexor musc/fasc/tend l rng fngr at wrs/hnd lv"
          },
          {
            "contentTitle": "Raphicerus campestris",
            "video": "http://dummyimage.com/138x232.png/cc0000/ffffff",
            "duration": 8,
            "description": "Injury of nerve root of sacral spine"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/111x135.png/dddddd/000000",
            "duration": 1,
            "description": "Mtrcy driver injured in clsn w nonmtr vehicle in traf, init"
          },
          {
            "contentTitle": "Cercopithecus aethiops",
            "video": "http://dummyimage.com/180x142.png/ff4444/ffffff",
            "duration": 2,
            "description": "Pre-exist hyp heart disease comp pregnancy, second trimester"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/174x219.png/cc0000/ffffff",
            "duration": 10,
            "description": "Rheu lung disease w rheumatoid arthritis of unsp ank/ft"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/242x112.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Displ spiral fx shaft of r tibia, 7thP"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/159x199.png/ff4444/ffffff",
            "duration": 1,
            "description": "Lacerat intrinsic msl/tnd at ank/ft level, left foot, init"
          },
          {
            "contentTitle": "Lorythaixoides concolor",
            "video": "http://dummyimage.com/217x230.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Displ simp suprcndl fx w/o intrcndl fx unsp humer, 7thG"
          },
          {
            "contentTitle": "Paradoxurus hermaphroditus",
            "video": "http://dummyimage.com/120x190.png/ff4444/ffffff",
            "duration": 9,
            "description": "Rheumatoid heart disease w rheumatoid arthritis of unsp hip"
          },
          {
            "contentTitle": "Cyrtodactylus louisiadensis",
            "video": "http://dummyimage.com/156x107.png/ff4444/ffffff",
            "duration": 10,
            "description": "Displaced dome fracture of left talus, init for clos fx"
          }
        ]
      },
      {
        "header": "Media Manager IV",
        "totalMinutes": 53850,
        "contents": [
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/198x245.png/cc0000/ffffff",
            "duration": 10,
            "description": "Nondisp oblique fx shaft of unsp fibula, 7thP"
          },
          {
            "contentTitle": "Agouti paca",
            "video": "http://dummyimage.com/170x134.png/cc0000/ffffff",
            "duration": 8,
            "description": "Idiopathic chronic gout, right elbow, without tophus (tophi)"
          },
          {
            "contentTitle": "Lasiorhinus latifrons",
            "video": "http://dummyimage.com/162x166.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Oth injury of dorsal vein of unspecified foot, sequela"
          },
          {
            "contentTitle": "Gazella thompsonii",
            "video": "http://dummyimage.com/139x240.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Non-pressure chronic ulcer of unsp ankle with unsp severity"
          },
          {
            "contentTitle": "Spermophilus tridecemlineatus",
            "video": "http://dummyimage.com/171x155.png/cc0000/ffffff",
            "duration": 1,
            "description": "Anencephaly"
          }
        ]
      },
      {
        "header": "Marketing Manager",
        "totalMinutes": 14861,
        "contents": [
          {
            "contentTitle": "Numida meleagris",
            "video": "http://dummyimage.com/165x180.png/cc0000/ffffff",
            "duration": 2,
            "description": "Unsp physeal fx lower end of r tibia, subs for fx w nonunion"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/157x117.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Unsp inj extensor musc/fasc/tend r thm at wrs/hnd lv, init"
          },
          {
            "contentTitle": "Papio ursinus",
            "video": "http://dummyimage.com/134x120.png/ff4444/ffffff",
            "duration": 8,
            "description": "Malignant neoplasm of uvula"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/164x128.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Strain flexor musc/fasc/tend r idx fngr at wrs/hnd lv, init"
          },
          {
            "contentTitle": "Bucorvus leadbeateri",
            "video": "http://dummyimage.com/133x202.png/dddddd/000000",
            "duration": 4,
            "description": "Unsp injury of musc/fasc/tend prt biceps, unsp arm, sequela"
          },
          {
            "contentTitle": "Hystrix cristata",
            "video": "http://dummyimage.com/166x202.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Inj flexor musc/fasc/tend right little finger at wrs/hnd lv"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/112x154.png/cc0000/ffffff",
            "duration": 8,
            "description": "Poisoning by antiasthmatics, undetermined, initial encounter"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/243x160.png/ff4444/ffffff",
            "duration": 3,
            "description": "Open bite of right lesser toe(s) w damage to nail, init"
          },
          {
            "contentTitle": "Papio ursinus",
            "video": "http://dummyimage.com/211x118.png/cc0000/ffffff",
            "duration": 9,
            "description": "Rheumatoid myopathy with rheumatoid arthritis of unsp hand"
          },
          {
            "contentTitle": "Fregata magnificans",
            "video": "http://dummyimage.com/239x149.png/cc0000/ffffff",
            "duration": 5,
            "description": "Acute sphenoidal sinusitis"
          },
          {
            "contentTitle": "Pan troglodytes",
            "video": "http://dummyimage.com/177x105.png/ff4444/ffffff",
            "duration": 3,
            "description": "Other fracture of first lumbar vertebra, sequela"
          },
          {
            "contentTitle": "Ovis orientalis",
            "video": "http://dummyimage.com/118x237.png/cc0000/ffffff",
            "duration": 6,
            "description": "Traum rupt of volar plate of unsp finger at MCP/IP jt, sqla"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/187x153.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Osteomyelitis of orbit"
          },
          {
            "contentTitle": "Oreotragus oreotragus",
            "video": "http://dummyimage.com/149x106.png/ff4444/ffffff",
            "duration": 1,
            "description": "Poisoning by calcium-channel blockers, self-harm, init"
          },
          {
            "contentTitle": "Phascolarctos cinereus",
            "video": "http://dummyimage.com/127x114.png/cc0000/ffffff",
            "duration": 4,
            "description": "Mech compl of intraocular lens, initial encounter"
          }
        ]
      },
      {
        "header": "Product Engineer",
        "totalMinutes": 78585,
        "contents": [
          {
            "contentTitle": "Megaderma spasma",
            "video": "http://dummyimage.com/185x125.png/cc0000/ffffff",
            "duration": 3,
            "description": "Lacerat ulnar artery at wrs/hnd lv of left arm, sequela"
          },
          {
            "contentTitle": "Gabianus pacificus",
            "video": "http://dummyimage.com/140x169.png/cc0000/ffffff",
            "duration": 6,
            "description": "Macular cyst, hole, or pseudohole"
          },
          {
            "contentTitle": "Axis axis",
            "video": "http://dummyimage.com/164x173.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Oth tear of unsp mensc, current injury, unsp knee, sequela"
          },
          {
            "contentTitle": "Petaurus norfolcensis",
            "video": "http://dummyimage.com/179x210.png/dddddd/000000",
            "duration": 10,
            "description": "Postprocedural hepatic failure"
          },
          {
            "contentTitle": "Pterocles gutturalis",
            "video": "http://dummyimage.com/155x105.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Lead-induced gout, vertebrae"
          }
        ]
      },
      {
        "header": "Environmental Tech",
        "totalMinutes": 2390,
        "contents": [
          {
            "contentTitle": "Catharacta skua",
            "video": "http://dummyimage.com/244x164.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Oblique fracture of shaft of fibula"
          },
          {
            "contentTitle": "Tiliqua scincoides",
            "video": "http://dummyimage.com/243x169.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Burn of second degree of buttock"
          },
          {
            "contentTitle": "Corvus albus",
            "video": "http://dummyimage.com/171x154.png/cc0000/ffffff",
            "duration": 10,
            "description": "Insect bite (nonvenomous) of vagina and vulva, sequela"
          },
          {
            "contentTitle": "Laniaurius atrococcineus",
            "video": "http://dummyimage.com/128x204.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Military operations involving unsp explosion and fragments"
          },
          {
            "contentTitle": "Myrmecophaga tridactyla",
            "video": "http://dummyimage.com/122x211.png/ff4444/ffffff",
            "duration": 10,
            "description": "Quadruplet pregnancy with two or more monochorionic fetuses"
          },
          {
            "contentTitle": "Trichoglossus haematodus moluccanus",
            "video": "http://dummyimage.com/175x161.png/ff4444/ffffff",
            "duration": 4,
            "description": "Unsp injury of musc/fasc/tend prt biceps, unsp arm"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/188x204.png/cc0000/ffffff",
            "duration": 10,
            "description": "Inj msl/tnd lng flxr msl toe at ank/ft lev, unsp foot, sqla"
          },
          {
            "contentTitle": "Dromaeus novaehollandiae",
            "video": "http://dummyimage.com/125x244.png/cc0000/ffffff",
            "duration": 8,
            "description": "Squamous cell carcinoma skin/ r ear and external auric canal"
          },
          {
            "contentTitle": "Hystrix cristata",
            "video": "http://dummyimage.com/122x148.png/dddddd/000000",
            "duration": 1,
            "description": "Superficial foreign body of scrotum and testes, init encntr"
          }
        ]
      },
      {
        "header": "Teacher",
        "totalMinutes": 12192,
        "contents": [
          {
            "contentTitle": "Trichoglossus haematodus moluccanus",
            "video": "http://dummyimage.com/213x119.png/ff4444/ffffff",
            "duration": 5,
            "description": "Poisoning by oral contraceptives, accidental, subs"
          },
          {
            "contentTitle": "Dendrocygna viduata",
            "video": "http://dummyimage.com/205x113.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Mech compl of prosth dev/implnt/grft of genital tract, init"
          },
          {
            "contentTitle": "Canis lupus baileyi",
            "video": "http://dummyimage.com/244x244.png/dddddd/000000",
            "duration": 9,
            "description": "Wedge compression fracture of first thoracic vertebra"
          },
          {
            "contentTitle": "Cynomys ludovicianus",
            "video": "http://dummyimage.com/250x148.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Fracture of r shoulder girdle, part unsp, init for opn fx"
          },
          {
            "contentTitle": "Chionis alba",
            "video": "http://dummyimage.com/236x183.png/cc0000/ffffff",
            "duration": 4,
            "description": "Unsp disorder of breast assoc w pregnancy and the puerperium"
          },
          {
            "contentTitle": "Leptoptilos crumeniferus",
            "video": "http://dummyimage.com/162x157.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Cervical disc disorder with myelopathy, mid-cervical region"
          },
          {
            "contentTitle": "Sitta canadensis",
            "video": "http://dummyimage.com/143x138.png/ff4444/ffffff",
            "duration": 9,
            "description": "Sltr-haris Type IV physl fx lower end humer, left arm, init"
          },
          {
            "contentTitle": "Cochlearius cochlearius",
            "video": "http://dummyimage.com/114x169.png/dddddd/000000",
            "duration": 2,
            "description": "Corrosion of 2nd deg mul sites of head, face, and neck, subs"
          },
          {
            "contentTitle": "Erinaceus frontalis",
            "video": "http://dummyimage.com/130x240.png/dddddd/000000",
            "duration": 3,
            "description": "Unsp fx upper end of left ulna, init for opn fx type 3A/B/C"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/183x189.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Macrophthalmos"
          },
          {
            "contentTitle": "Casmerodius albus",
            "video": "http://dummyimage.com/112x133.png/dddddd/000000",
            "duration": 5,
            "description": "Burn of second degree of forehead and cheek, sequela"
          },
          {
            "contentTitle": "Dendrocygna viduata",
            "video": "http://dummyimage.com/179x115.png/ff4444/ffffff",
            "duration": 9,
            "description": "Hematoma of broad ligament"
          }
        ]
      },
      {
        "header": "Automation Specialist I",
        "totalMinutes": 18665,
        "contents": [
          {
            "contentTitle": "Spizaetus coronatus",
            "video": "http://dummyimage.com/100x203.png/ff4444/ffffff",
            "duration": 2,
            "description": "Nondisp fx of med epicondyl of unsp humer, 7thP"
          },
          {
            "contentTitle": "Procyon cancrivorus",
            "video": "http://dummyimage.com/245x155.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Cognitive deficits following unsp cerebrovascular disease"
          },
          {
            "contentTitle": "Castor canadensis",
            "video": "http://dummyimage.com/247x189.png/ff4444/ffffff",
            "duration": 8,
            "description": "Driver of 3-whl mv inj in nonclsn trnsp acc nontraf, subs"
          },
          {
            "contentTitle": "Climacteris melanura",
            "video": "http://dummyimage.com/233x248.png/dddddd/000000",
            "duration": 1,
            "description": "External constriction of unspecified forearm"
          }
        ]
      },
      {
        "header": "Computer Systems Analyst II",
        "totalMinutes": 18838,
        "contents": [
          {
            "contentTitle": "Carduelis pinus",
            "video": "http://dummyimage.com/155x105.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Other superficial bite of left lesser toe(s), subs encntr"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/206x150.png/ff4444/ffffff",
            "duration": 10,
            "description": "Complete traum amp at lev betw elbow and wrs, left arm, init"
          },
          {
            "contentTitle": "Platalea leucordia",
            "video": "http://dummyimage.com/122x240.png/ff4444/ffffff",
            "duration": 3,
            "description": "Toxic effect of harmful algae and algae toxins, acc, init"
          },
          {
            "contentTitle": "Dendrohyrax brucel",
            "video": "http://dummyimage.com/183x173.png/dddddd/000000",
            "duration": 7,
            "description": "Nondisp transverse fx shaft of unsp rad, 7thD"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/110x218.png/cc0000/ffffff",
            "duration": 1,
            "description": "Unsp physeal fracture of upper end of unsp fibula, sequela"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/226x153.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Sprain of interphalangeal joint of right great toe, subs"
          },
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/185x225.png/dddddd/000000",
            "duration": 9,
            "description": "Other specified fracture of right ischium"
          },
          {
            "contentTitle": "Limosa haemastica",
            "video": "http://dummyimage.com/107x135.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Nondisp seg fx shaft of unsp fibula, 7thJ"
          },
          {
            "contentTitle": "Francolinus coqui",
            "video": "http://dummyimage.com/166x125.png/ff4444/ffffff",
            "duration": 5,
            "description": "Burn of unsp degree of unsp site lower limb, except ank/ft"
          },
          {
            "contentTitle": "Dasyprocta leporina",
            "video": "http://dummyimage.com/174x162.png/dddddd/000000",
            "duration": 5,
            "description": "Disp fx of prox 3rd of navic bone of r wrs, 7thG"
          },
          {
            "contentTitle": "Spermophilus tridecemlineatus",
            "video": "http://dummyimage.com/248x217.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Pathological resorption of teeth"
          },
          {
            "contentTitle": "Mycteria ibis",
            "video": "http://dummyimage.com/102x214.png/ff4444/ffffff",
            "duration": 7,
            "description": "Other specified disorders of tendon, right hand"
          },
          {
            "contentTitle": "Bos taurus",
            "video": "http://dummyimage.com/222x183.png/dddddd/000000",
            "duration": 3,
            "description": "Patient's noncompliance with renal dialysis"
          },
          {
            "contentTitle": "Macropus parryi",
            "video": "http://dummyimage.com/165x247.png/ff4444/ffffff",
            "duration": 3,
            "description": "Pedestrian on foot injured in collision w skateboarder, subs"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/103x212.png/dddddd/000000",
            "duration": 4,
            "description": "Matern care for known or susp placntl insuff, 2nd tri, fts1"
          },
          {
            "contentTitle": "Grus antigone",
            "video": "http://dummyimage.com/134x135.png/dddddd/000000",
            "duration": 3,
            "description": "Fracture of xiphoid process, subs for fx w delay heal"
          },
          {
            "contentTitle": "Connochaetus taurinus",
            "video": "http://dummyimage.com/178x174.png/dddddd/000000",
            "duration": 6,
            "description": "Unsp physeal fx upper end of humerus, unsp arm, sequela"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/245x190.png/ff4444/ffffff",
            "duration": 10,
            "description": "Toxic effect of venom of centipede/millipede, accidental"
          }
        ]
      },
      {
        "header": "Clinical Specialist",
        "totalMinutes": 19179,
        "contents": [
          {
            "contentTitle": "Cabassous sp.",
            "video": "http://dummyimage.com/193x166.png/dddddd/000000",
            "duration": 10,
            "description": "Maternal care for transverse and oblique lie, fetus 5"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/171x175.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Pnctr w foreign body of thmb w/o damage to nail, subs"
          },
          {
            "contentTitle": "Felis wiedi or Leopardus weidi",
            "video": "http://dummyimage.com/102x137.png/dddddd/000000",
            "duration": 9,
            "description": "Localized anterior staphyloma, right eye"
          },
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/176x152.png/ff4444/ffffff",
            "duration": 1,
            "description": "Pre-exist hyp heart disease comp pregnancy, first trimester"
          },
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/100x226.png/cc0000/ffffff",
            "duration": 2,
            "description": "Secondary noninfectious iridocyclitis, right eye"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/237x112.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Chronic enlargement of bilateral lacrimal glands"
          },
          {
            "contentTitle": "Tayassu pecari",
            "video": "http://dummyimage.com/137x230.png/ff4444/ffffff",
            "duration": 7,
            "description": "Insect bite of right eyelid and periocular area, init"
          },
          {
            "contentTitle": "Damaliscus dorcas",
            "video": "http://dummyimage.com/123x211.png/cc0000/ffffff",
            "duration": 4,
            "description": "Displaced subtrochnt fx r femur, init for opn fx type I/2"
          },
          {
            "contentTitle": "Eutamias minimus",
            "video": "http://dummyimage.com/131x130.png/cc0000/ffffff",
            "duration": 8,
            "description": "Maternal care for viable fetus in abd preg, third tri, oth"
          },
          {
            "contentTitle": "Gabianus pacificus",
            "video": "http://dummyimage.com/109x171.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Passenger on bus injured in clsn w oth mv in traf, sequela"
          },
          {
            "contentTitle": "Tamandua tetradactyla",
            "video": "http://dummyimage.com/218x179.png/ff4444/ffffff",
            "duration": 10,
            "description": "Oth malig neoplm of lymphoid, hematpoetc and related tissue"
          },
          {
            "contentTitle": "Bucorvus leadbeateri",
            "video": "http://dummyimage.com/209x168.png/cc0000/ffffff",
            "duration": 7,
            "description": "Inj oth blood vesls at abd, low back and pelvis level, init"
          },
          {
            "contentTitle": "Macaca radiata",
            "video": "http://dummyimage.com/193x125.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Post disp fx of sternal end of l clavicle, init for opn fx"
          },
          {
            "contentTitle": "Buteo jamaicensis",
            "video": "http://dummyimage.com/111x126.png/ff4444/ffffff",
            "duration": 9,
            "description": "Headache"
          },
          {
            "contentTitle": "Oryx gazella callotis",
            "video": "http://dummyimage.com/178x187.png/cc0000/ffffff",
            "duration": 3,
            "description": "Stress fracture, left ankle, subs for fx w routn heal"
          }
        ]
      },
      {
        "header": "Paralegal",
        "totalMinutes": 78684,
        "contents": [
          {
            "contentTitle": "Phoca vitulina",
            "video": "http://dummyimage.com/219x242.png/cc0000/ffffff",
            "duration": 4,
            "description": "Other calcification of muscle, unspecified hand"
          },
          {
            "contentTitle": "Sitta canadensis",
            "video": "http://dummyimage.com/170x241.png/cc0000/ffffff",
            "duration": 8,
            "description": "Disp fx of r tibial spin, 7thN"
          },
          {
            "contentTitle": "Sula nebouxii",
            "video": "http://dummyimage.com/166x184.png/cc0000/ffffff",
            "duration": 2,
            "description": "Retinopathy of prematurity, stage 3, bilateral"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/173x109.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Nondisp fx of nk of 3rd MC bone, l hand, 7thD"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/202x171.png/cc0000/ffffff",
            "duration": 7,
            "description": "Displaced oblique fracture of shaft of unsp radius, init"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/123x208.png/ff4444/ffffff",
            "duration": 7,
            "description": "Obstruction of gallbladder"
          },
          {
            "contentTitle": "Pseudocheirus peregrinus",
            "video": "http://dummyimage.com/140x130.png/dddddd/000000",
            "duration": 3,
            "description": "Sltr-haris Type II physl fx low end rad, unsp arm, 7thK"
          },
          {
            "contentTitle": "Panthera leo persica",
            "video": "http://dummyimage.com/143x200.png/ff4444/ffffff",
            "duration": 5,
            "description": "Acquired clawfoot, right foot"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/147x123.png/cc0000/ffffff",
            "duration": 6,
            "description": "Open bite of right thumb without damage to nail, subs encntr"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/127x126.png/ff4444/ffffff",
            "duration": 10,
            "description": "Ped on rolr-skt injured in collision w hv veh, unsp, subs"
          },
          {
            "contentTitle": "Panthera pardus",
            "video": "http://dummyimage.com/158x123.png/dddddd/000000",
            "duration": 2,
            "description": "Oth disrd of amniotic fluid and membrns, third tri, oth"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/203x200.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Insect bite (nonvenomous) of left ear, subsequent encounter"
          },
          {
            "contentTitle": "Plocepasser mahali",
            "video": "http://dummyimage.com/123x161.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Underdosing of drug/meds/biol subst, init"
          },
          {
            "contentTitle": "Leptoptilos crumeniferus",
            "video": "http://dummyimage.com/177x206.png/dddddd/000000",
            "duration": 9,
            "description": "Poisoning by oth synthetic narcotics, undetermined, init"
          }
        ]
      }
    ]
  },
  {
    "title": "Captain Blood",
    "subject": "Training",
    "instructorName": "Rodin Salem",
    "price": 1525.38,
    "level": "Intermediate",
    "courseHours": 140,
    "summary": "Car occupant (driver) (passenger) injured in unsp nontraf",
    "subtitles": [
      {
        "header": "Legal Assistant",
        "totalMinutes": 24327,
        "contents": [
          {
            "contentTitle": "Otocyon megalotis",
            "video": "http://dummyimage.com/177x157.png/dddddd/000000",
            "duration": 2,
            "description": "Other hemoglobinopathies"
          },
          {
            "contentTitle": "Canis lupus lycaon",
            "video": "http://dummyimage.com/248x132.png/dddddd/000000",
            "duration": 6,
            "description": "Injury of median nerve at forearm level, left arm, sequela"
          },
          {
            "contentTitle": "Creagrus furcatus",
            "video": "http://dummyimage.com/190x205.png/cc0000/ffffff",
            "duration": 7,
            "description": "Striking against wall of swimming pool"
          },
          {
            "contentTitle": "Sula nebouxii",
            "video": "http://dummyimage.com/111x130.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Complete traumatic amputation of left foot at ankle level"
          },
          {
            "contentTitle": "Dicrurus adsimilis",
            "video": "http://dummyimage.com/159x110.png/ff4444/ffffff",
            "duration": 8,
            "description": "Displ trimalleol fx l low leg, 7thM"
          },
          {
            "contentTitle": "Cracticus nigroagularis",
            "video": "http://dummyimage.com/162x238.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Nondisp fx of nk of unsp rad, 7thJ"
          },
          {
            "contentTitle": "Zalophus californicus",
            "video": "http://dummyimage.com/211x156.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Adolescent idiopathic scoliosis, thoracolumbar region"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/205x116.png/cc0000/ffffff",
            "duration": 9,
            "description": "Toxic effect of manganese and its compounds, self-harm, init"
          },
          {
            "contentTitle": "Didelphis virginiana",
            "video": "http://dummyimage.com/188x244.png/cc0000/ffffff",
            "duration": 10,
            "description": "Other specified pleural conditions"
          },
          {
            "contentTitle": "Sarcorhamphus papa",
            "video": "http://dummyimage.com/237x226.png/ff4444/ffffff",
            "duration": 4,
            "description": "Other scooter (nonmotorized) accident"
          },
          {
            "contentTitle": "Larus dominicanus",
            "video": "http://dummyimage.com/176x219.png/cc0000/ffffff",
            "duration": 10,
            "description": "Laceration without foreign body of scrotum and testes"
          },
          {
            "contentTitle": "Lophoaetus occipitalis",
            "video": "http://dummyimage.com/240x142.png/dddddd/000000",
            "duration": 6,
            "description": "Sltr-haris Type I physl fx low end humer, unsp arm, 7thG"
          },
          {
            "contentTitle": "Cervus unicolor",
            "video": "http://dummyimage.com/120x233.png/cc0000/ffffff",
            "duration": 6,
            "description": "Injury of tibial nerve at lower leg level"
          }
        ]
      },
      {
        "header": "Nurse",
        "totalMinutes": 30549,
        "contents": [
          {
            "contentTitle": "Buteo galapagoensis",
            "video": "http://dummyimage.com/142x127.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp acute reaction to foreign sub acc left dur proc, subs"
          },
          {
            "contentTitle": "Anas bahamensis",
            "video": "http://dummyimage.com/167x167.png/dddddd/000000",
            "duration": 8,
            "description": "Other contact with turkey, subsequent encounter"
          },
          {
            "contentTitle": "Tayassu pecari",
            "video": "http://dummyimage.com/160x149.png/cc0000/ffffff",
            "duration": 6,
            "description": "Dvrtclos of both small and lg int w/o perf or abscs w bleed"
          },
          {
            "contentTitle": "Acanthaster planci",
            "video": "http://dummyimage.com/194x140.png/dddddd/000000",
            "duration": 10,
            "description": "Papyraceous fetus"
          }
        ]
      },
      {
        "header": "Tax Accountant",
        "totalMinutes": 58015,
        "contents": [
          {
            "contentTitle": "Cracticus nigroagularis",
            "video": "http://dummyimage.com/191x197.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Miliary tuberculosis"
          },
          {
            "contentTitle": "Phascogale calura",
            "video": "http://dummyimage.com/241x198.png/ff4444/ffffff",
            "duration": 4,
            "description": "Abrasion of left elbow, subsequent encounter"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/170x217.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Nondisp spiral fx shaft of unsp tibia, 7thJ"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/157x249.png/ff4444/ffffff",
            "duration": 4,
            "description": "Displaced spiral fracture of shaft of left tibia"
          },
          {
            "contentTitle": "Anthropoides paradisea",
            "video": "http://dummyimage.com/229x136.png/dddddd/000000",
            "duration": 2,
            "description": "Disloc of unsp interphaln joint of l little finger, init"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/191x135.png/ff4444/ffffff",
            "duration": 6,
            "description": "Dislocation of unspecified scapula"
          },
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/149x148.png/dddddd/000000",
            "duration": 2,
            "description": "Toxic effect of unspecified inorganic substance, assault"
          },
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/116x116.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Nondisp fx of head of r rad, 7thF"
          },
          {
            "contentTitle": "Platalea leucordia",
            "video": "http://dummyimage.com/229x145.png/cc0000/ffffff",
            "duration": 9,
            "description": "Secondary hyperaldosteronism"
          },
          {
            "contentTitle": "Larus novaehollandiae",
            "video": "http://dummyimage.com/120x130.png/ff4444/ffffff",
            "duration": 6,
            "description": "Toxic effect of venom of caterpillars, assault, sequela"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/217x219.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Abrasion of left thumb"
          },
          {
            "contentTitle": "Ctenophorus ornatus",
            "video": "http://dummyimage.com/241x137.png/dddddd/000000",
            "duration": 2,
            "description": "Burn of left eye and adnexa, part unspecified, init encntr"
          },
          {
            "contentTitle": "Mabuya spilogaster",
            "video": "http://dummyimage.com/227x234.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp fracture of unsp femur, subs for clos fx w delay heal"
          },
          {
            "contentTitle": "Charadrius tricollaris",
            "video": "http://dummyimage.com/192x217.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Sltr-haris Type IV physl fx upper end radius, left arm, init"
          },
          {
            "contentTitle": "Phylurus milli",
            "video": "http://dummyimage.com/209x195.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Poisoning by tetracyclic antidepressants, assault"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/123x183.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Laceration of popliteal artery, right leg, sequela"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/129x107.png/ff4444/ffffff",
            "duration": 3,
            "description": "Vascular abnormalities of conjunctiva, right eye"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/224x154.png/cc0000/ffffff",
            "duration": 3,
            "description": "Ganglion, unspecified shoulder"
          },
          {
            "contentTitle": "Macaca fuscata",
            "video": "http://dummyimage.com/212x161.png/cc0000/ffffff",
            "duration": 1,
            "description": "Unsp fx fifth MC bone, right hand, subs for fx w routn heal"
          },
          {
            "contentTitle": "Bucorvus leadbeateri",
            "video": "http://dummyimage.com/227x137.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Unsp car occ injured in clsn w pedl cyc in traf, sequela"
          }
        ]
      },
      {
        "header": "Teacher",
        "totalMinutes": 7826,
        "contents": [
          {
            "contentTitle": "Zalophus californicus",
            "video": "http://dummyimage.com/225x129.png/dddddd/000000",
            "duration": 6,
            "description": "Diabetes due to undrl cond w diabetic chronic kidney disease"
          },
          {
            "contentTitle": "Ursus arctos",
            "video": "http://dummyimage.com/117x118.png/dddddd/000000",
            "duration": 9,
            "description": "Oth injuries of right wrist, hand and finger(s), init encntr"
          },
          {
            "contentTitle": "Acridotheres tristis",
            "video": "http://dummyimage.com/178x136.png/ff4444/ffffff",
            "duration": 3,
            "description": "Attn-defct hyperactivity disorder, predom inattentive type"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/212x155.png/dddddd/000000",
            "duration": 7,
            "description": "Inflammatory liver disease, unspecified"
          },
          {
            "contentTitle": "Mirounga angustirostris",
            "video": "http://dummyimage.com/188x205.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Encntr screen for disorder due to exposure to contaminants"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/224x223.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Crohn's disease of small intestine with complications"
          },
          {
            "contentTitle": "Cebus apella",
            "video": "http://dummyimage.com/127x130.png/ff4444/ffffff",
            "duration": 7,
            "description": "Unsp fx upper end of unsp ulna, subs for clos fx w nonunion"
          },
          {
            "contentTitle": "Nectarinia chalybea",
            "video": "http://dummyimage.com/239x118.png/ff4444/ffffff",
            "duration": 1,
            "description": "Stable burst fx third thor vert, subs for fx w delay heal"
          },
          {
            "contentTitle": "Bettongia penicillata",
            "video": "http://dummyimage.com/117x122.png/dddddd/000000",
            "duration": 5,
            "description": "Unsp open wound of left middle finger with damage to nail"
          },
          {
            "contentTitle": "Coluber constrictor foxii",
            "video": "http://dummyimage.com/249x182.png/dddddd/000000",
            "duration": 3,
            "description": "Other injury of inferior mesenteric artery"
          },
          {
            "contentTitle": "Oryx gazella callotis",
            "video": "http://dummyimage.com/154x140.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Pnctr of abd wall w/o fb, periumb rgn w/o penet perit cav"
          },
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/137x235.png/dddddd/000000",
            "duration": 10,
            "description": "Accidental handgun discharge, sequela"
          }
        ]
      },
      {
        "header": "Assistant Professor",
        "totalMinutes": 24101,
        "contents": [
          {
            "contentTitle": "Ornithorhynchus anatinus",
            "video": "http://dummyimage.com/147x116.png/ff4444/ffffff",
            "duration": 10,
            "description": "Other subluxation of right patella"
          },
          {
            "contentTitle": "Procyon lotor",
            "video": "http://dummyimage.com/217x142.png/cc0000/ffffff",
            "duration": 4,
            "description": "Partial loss of teeth due to caries, class II"
          },
          {
            "contentTitle": "Myrmecophaga tridactyla",
            "video": "http://dummyimage.com/230x201.png/cc0000/ffffff",
            "duration": 7,
            "description": "Unsp fracture of fourth lumbar vertebra, init for clos fx"
          },
          {
            "contentTitle": "Phoeniconaias minor",
            "video": "http://dummyimage.com/158x197.png/cc0000/ffffff",
            "duration": 1,
            "description": "Torus fracture of upper end of unsp fibula, init for clos fx"
          },
          {
            "contentTitle": "Milvago chimachima",
            "video": "http://dummyimage.com/169x211.png/ff4444/ffffff",
            "duration": 4,
            "description": "Lac w fb of abd wall, unsp q w penet perit cav, sequela"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/196x223.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Nondisplaced transverse fracture of shaft of right femur"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/144x154.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Crushing injury of left hip, initial encounter"
          },
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/244x136.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Opioid abuse w opioid-induced psychotic disorder w hallucin"
          },
          {
            "contentTitle": "Threskionis aethiopicus",
            "video": "http://dummyimage.com/186x245.png/dddddd/000000",
            "duration": 7,
            "description": "Disp fx of dist phalanx of r little finger, init for opn fx"
          },
          {
            "contentTitle": "Macaca nemestrina",
            "video": "http://dummyimage.com/226x161.png/ff4444/ffffff",
            "duration": 3,
            "description": "Deprivation amblyopia, left eye"
          },
          {
            "contentTitle": "Pavo cristatus",
            "video": "http://dummyimage.com/236x101.png/ff4444/ffffff",
            "duration": 5,
            "description": "Terrorism w suicide bomber, civilian injured, sequela"
          },
          {
            "contentTitle": "Phalaropus fulicarius",
            "video": "http://dummyimage.com/106x184.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Kaposi's sarcoma of lung"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/235x156.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Traum rupt of unsp ligmt of unsp finger at MCP/IP jt, subs"
          },
          {
            "contentTitle": "Vanessa indica",
            "video": "http://dummyimage.com/235x126.png/cc0000/ffffff",
            "duration": 8,
            "description": "Other diseases of digestive system"
          },
          {
            "contentTitle": "Cacatua galerita",
            "video": "http://dummyimage.com/126x105.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Displaced transcondylar fracture of right humerus, init"
          },
          {
            "contentTitle": "Libellula quadrimaculata",
            "video": "http://dummyimage.com/103x203.png/cc0000/ffffff",
            "duration": 3,
            "description": "Fracture of capitate [os magnum] bone"
          },
          {
            "contentTitle": "Suricata suricatta",
            "video": "http://dummyimage.com/172x184.png/dddddd/000000",
            "duration": 2,
            "description": "Other specified abnormal findings of blood chemistry"
          }
        ]
      },
      {
        "header": "Programmer Analyst III",
        "totalMinutes": 87446,
        "contents": [
          {
            "contentTitle": "Dendrohyrax brucel",
            "video": "http://dummyimage.com/157x217.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Osteopathy in diseases classified elsewhere, thigh"
          },
          {
            "contentTitle": "Perameles nasuta",
            "video": "http://dummyimage.com/213x183.png/cc0000/ffffff",
            "duration": 6,
            "description": "Minor laceration of unsp part of pancreas, subs encntr"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/159x117.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Toxic effect of beryllium and its compounds, assault, subs"
          },
          {
            "contentTitle": "Crotalus adamanteus",
            "video": "http://dummyimage.com/238x175.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Toxic effect of herbicides and fungicides, accidental, init"
          },
          {
            "contentTitle": "Mycteria ibis",
            "video": "http://dummyimage.com/142x225.png/cc0000/ffffff",
            "duration": 4,
            "description": "Nondisp fx of nk of scapula, l shldr, subs for fx w nonunion"
          },
          {
            "contentTitle": "Equus hemionus",
            "video": "http://dummyimage.com/146x214.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Disp fx of lateral malleolus of unsp fibula, 7thD"
          },
          {
            "contentTitle": "Otocyon megalotis",
            "video": "http://dummyimage.com/109x140.png/dddddd/000000",
            "duration": 6,
            "description": "Other dislocation of right ulnohumeral joint, init encntr"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/106x109.png/dddddd/000000",
            "duration": 10,
            "description": "Inj r int crtd,intcr w LOC w dth d/t oth cause bf consc,init"
          },
          {
            "contentTitle": "Grus antigone",
            "video": "http://dummyimage.com/170x232.png/ff4444/ffffff",
            "duration": 9,
            "description": "Posterior dislocation of right radial head"
          },
          {
            "contentTitle": "Falco mexicanus",
            "video": "http://dummyimage.com/204x218.png/dddddd/000000",
            "duration": 9,
            "description": "Inj muscle, fascia and tendon of prt biceps, right arm, init"
          }
        ]
      }
    ]
  },
  {
    "title": "Bettie Page Reveals All",
    "subject": "Legal",
    "instructorName": "Rodin Salem",
    "price": 1061.28,
    "level": "Advanced",
    "courseHours": 153,
    "summary": "Leakage of vascular dialysis catheter, subsequent encounter",
    "subtitles": [
      {
        "header": "Help Desk Operator",
        "totalMinutes": 82809,
        "contents": [
          {
            "contentTitle": "Ceryle rudis",
            "video": "http://dummyimage.com/104x110.png/ff4444/ffffff",
            "duration": 7,
            "description": "Inj unsp blood vessel at ank/ft level, unsp leg, subs"
          },
          {
            "contentTitle": "Merops nubicus",
            "video": "http://dummyimage.com/141x137.png/cc0000/ffffff",
            "duration": 8,
            "description": "Contus/lac left cerebrum w LOC of 1-5 hrs 59 min, sequela"
          },
          {
            "contentTitle": "Otaria flavescens",
            "video": "http://dummyimage.com/245x218.png/ff4444/ffffff",
            "duration": 2,
            "description": "Estrogens and progestogens"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/222x114.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Oth fx low end unsp ulna, 7thR"
          },
          {
            "contentTitle": "Francolinus swainsonii",
            "video": "http://dummyimage.com/137x185.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Toxic effect of harmful algae and algae toxins, acc, sqla"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/150x100.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Toxic effect of venom of brown recluse spider, undet, init"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/139x107.png/dddddd/000000",
            "duration": 4,
            "description": "Cerebral infarction due to thombos unsp vertebral artery"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/182x190.png/ff4444/ffffff",
            "duration": 10,
            "description": "Unspecified open wound of left thumb with damage to nail"
          },
          {
            "contentTitle": "Varanus albigularis",
            "video": "http://dummyimage.com/151x183.png/ff4444/ffffff",
            "duration": 2,
            "description": "Stress fracture, right fibula, subs for fx w malunion"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/208x237.png/dddddd/000000",
            "duration": 6,
            "description": "Corrosion of unsp degree of back of unsp hand, subs encntr"
          }
        ]
      },
      {
        "header": "Geological Engineer",
        "totalMinutes": 27162,
        "contents": [
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/240x191.png/ff4444/ffffff",
            "duration": 1,
            "description": "Legal intervnt involving oth explosives, bystander injured"
          },
          {
            "contentTitle": "Cyrtodactylus louisiadensis",
            "video": "http://dummyimage.com/180x223.png/dddddd/000000",
            "duration": 3,
            "description": "Unsp injury of superficial vein at shldr/up arm, unsp arm"
          },
          {
            "contentTitle": "Vanellus armatus",
            "video": "http://dummyimage.com/243x203.png/ff4444/ffffff",
            "duration": 6,
            "description": "Driver of bus injured pick-up truck, pk-up/van in traf"
          },
          {
            "contentTitle": "Phoenicopterus chilensis",
            "video": "http://dummyimage.com/146x172.png/cc0000/ffffff",
            "duration": 1,
            "description": "Cystic meniscus, other lateral meniscus"
          },
          {
            "contentTitle": "Mellivora capensis",
            "video": "http://dummyimage.com/151x239.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Lacerat great saphenous at lower leg level, right leg, subs"
          },
          {
            "contentTitle": "Heloderma horridum",
            "video": "http://dummyimage.com/163x137.png/cc0000/ffffff",
            "duration": 4,
            "description": "Displ spiral fx shaft of rad, unsp arm, 7thP"
          },
          {
            "contentTitle": "Genetta genetta",
            "video": "http://dummyimage.com/249x228.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Displ seg fx shaft of unsp femr, 7thM"
          },
          {
            "contentTitle": "Dendrocitta vagabunda",
            "video": "http://dummyimage.com/124x163.png/dddddd/000000",
            "duration": 5,
            "description": "Nondisp oblique fracture of shaft of unsp tibia, sequela"
          },
          {
            "contentTitle": "Pterocles gutturalis",
            "video": "http://dummyimage.com/139x102.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Displaced commnt suprcndl fracture w/o intrcndl fx r humerus"
          },
          {
            "contentTitle": "Lasiodora parahybana",
            "video": "http://dummyimage.com/175x200.png/ff4444/ffffff",
            "duration": 9,
            "description": "Corrosion of third degree of left shoulder, subs encntr"
          },
          {
            "contentTitle": "Hymenolaimus malacorhynchus",
            "video": "http://dummyimage.com/217x176.png/dddddd/000000",
            "duration": 4,
            "description": "Frostbite w tissue necros left knee and lower leg, sequela"
          },
          {
            "contentTitle": "Tauraco porphyrelophus",
            "video": "http://dummyimage.com/161x167.png/cc0000/ffffff",
            "duration": 4,
            "description": "Burn of 2nd deg mul left fingers (nail), not including thumb"
          },
          {
            "contentTitle": "Falco mexicanus",
            "video": "http://dummyimage.com/213x241.png/dddddd/000000",
            "duration": 9,
            "description": "Ped on foot injured in collision w roller-skater, subs"
          },
          {
            "contentTitle": "Damaliscus dorcas",
            "video": "http://dummyimage.com/130x188.png/dddddd/000000",
            "duration": 1,
            "description": "Laceration w fb of unsp eyelid and periocular area, sequela"
          },
          {
            "contentTitle": "Mustela nigripes",
            "video": "http://dummyimage.com/169x183.png/ff4444/ffffff",
            "duration": 6,
            "description": "Person outside pk-up/van inj in nonclsn trnsp acc in traf"
          },
          {
            "contentTitle": "Pycnonotus nigricans",
            "video": "http://dummyimage.com/180x134.png/ff4444/ffffff",
            "duration": 4,
            "description": "Unspecified injury of intercostal blood vessels"
          },
          {
            "contentTitle": "Paradoxurus hermaphroditus",
            "video": "http://dummyimage.com/221x132.png/cc0000/ffffff",
            "duration": 3,
            "description": "Puncture wound with foreign body of left shoulder, sequela"
          },
          {
            "contentTitle": "Oryx gazella",
            "video": "http://dummyimage.com/190x136.png/cc0000/ffffff",
            "duration": 7,
            "description": "Partial traumatic amputation at unsp hip joint, sequela"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/241x200.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Unsp open wound of r idx fngr w/o damage to nail, init"
          },
          {
            "contentTitle": "Boselaphus tragocamelus",
            "video": "http://dummyimage.com/200x194.png/dddddd/000000",
            "duration": 5,
            "description": "Other optic atrophy"
          }
        ]
      },
      {
        "header": "VP Accounting",
        "totalMinutes": 79541,
        "contents": [
          {
            "contentTitle": "Madoqua kirkii",
            "video": "http://dummyimage.com/120x110.png/ff4444/ffffff",
            "duration": 10,
            "description": "Malignant neoplasm of urinary organ, unspecified"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/150x117.png/dddddd/000000",
            "duration": 2,
            "description": "Insect bite (nonvenomous) of breast, left breast"
          },
          {
            "contentTitle": "Bettongia penicillata",
            "video": "http://dummyimage.com/225x163.png/ff4444/ffffff",
            "duration": 5,
            "description": "Sedative, hypnotic or anxiolytic dependence w intoxication"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/134x127.png/dddddd/000000",
            "duration": 5,
            "description": "Minor laceration of pancreas"
          },
          {
            "contentTitle": "Tenrec ecaudatus",
            "video": "http://dummyimage.com/109x137.png/ff4444/ffffff",
            "duration": 4,
            "description": "Radiohumeral (joint) sprain of right elbow, init encntr"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/106x228.png/ff4444/ffffff",
            "duration": 5,
            "description": "Hydronephrosis with renal and ureteral calculous obstruction"
          },
          {
            "contentTitle": "Melanerpes erythrocephalus",
            "video": "http://dummyimage.com/104x143.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Corros 3rd deg mu sites of unsp lower limb, ex ank/ft, init"
          },
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/164x126.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Other age-related incipient cataract, unspecified eye"
          }
        ]
      },
      {
        "header": "Business Systems Development Analyst",
        "totalMinutes": 51717,
        "contents": [
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/186x116.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Underdosing of ganglionic blocking drugs, subs encntr"
          },
          {
            "contentTitle": "Procyon lotor",
            "video": "http://dummyimage.com/183x182.png/ff4444/ffffff",
            "duration": 4,
            "description": "Fx l shoulder girdle, part unsp, subs for fx w malunion"
          },
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/233x172.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Type III traum spondylolysis of 2nd cervcal vert, 7thB"
          },
          {
            "contentTitle": "Martes americana",
            "video": "http://dummyimage.com/204x238.png/ff4444/ffffff",
            "duration": 9,
            "description": "Blister (nonthermal) of right back wall of thorax"
          },
          {
            "contentTitle": "Eubalaena australis",
            "video": "http://dummyimage.com/104x144.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Occup of 3-whl mv injured in collision w 2/3-whl mv nontraf"
          },
          {
            "contentTitle": "Phalaropus fulicarius",
            "video": "http://dummyimage.com/163x169.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Pnctr of abd wall w fb, left low q w/o penet perit cav, sqla"
          },
          {
            "contentTitle": "Cyrtodactylus louisiadensis",
            "video": "http://dummyimage.com/107x136.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Unsp fracture of unsp talus, subs for fx w delay heal"
          },
          {
            "contentTitle": "Leipoa ocellata",
            "video": "http://dummyimage.com/202x226.png/dddddd/000000",
            "duration": 2,
            "description": "Acne conglobata"
          },
          {
            "contentTitle": "Ovibos moschatus",
            "video": "http://dummyimage.com/108x243.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Lacerat flexor musc/fasc/tend unsp fngr at wrs/hnd lv, sqla"
          },
          {
            "contentTitle": "Eurocephalus anguitimens",
            "video": "http://dummyimage.com/119x122.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Mech compl of implnt elec nstim of spinal cord lead"
          },
          {
            "contentTitle": "Grus antigone",
            "video": "http://dummyimage.com/228x131.png/dddddd/000000",
            "duration": 9,
            "description": "Unspecified dislocation of right index finger, subs encntr"
          },
          {
            "contentTitle": "Irania gutteralis",
            "video": "http://dummyimage.com/220x240.png/dddddd/000000",
            "duration": 9,
            "description": "Toxic effect of contact with other venomous fish, assault"
          },
          {
            "contentTitle": "Neotis denhami",
            "video": "http://dummyimage.com/158x135.png/ff4444/ffffff",
            "duration": 5,
            "description": "Corrosion of second degree of forehead and cheek, sequela"
          }
        ]
      },
      {
        "header": "Technical Writer",
        "totalMinutes": 61417,
        "contents": [
          {
            "contentTitle": "Philetairus socius",
            "video": "http://dummyimage.com/166x211.png/ff4444/ffffff",
            "duration": 9,
            "description": "Sltr-haris Type III physl fx low end rad, r arm, 7thP"
          },
          {
            "contentTitle": "Acridotheres tristis",
            "video": "http://dummyimage.com/170x156.png/dddddd/000000",
            "duration": 5,
            "description": "Inj radial artery at wrs/hnd lv of right arm, sequela"
          },
          {
            "contentTitle": "Porphyrio porphyrio",
            "video": "http://dummyimage.com/194x170.png/dddddd/000000",
            "duration": 6,
            "description": "Type 1 diab with mild nonp rtnop with macular edema, l eye"
          },
          {
            "contentTitle": "Panthera leo",
            "video": "http://dummyimage.com/228x174.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Injury due to collapse of burning bldg in uncontrolled fire"
          },
          {
            "contentTitle": "Trichechus inunguis",
            "video": "http://dummyimage.com/152x223.png/cc0000/ffffff",
            "duration": 1,
            "description": "Infect/inflm reaction due to prosth dev/grft in genitl trct"
          }
        ]
      },
      {
        "header": "Assistant Manager",
        "totalMinutes": 56354,
        "contents": [
          {
            "contentTitle": "Meles meles",
            "video": "http://dummyimage.com/104x151.png/dddddd/000000",
            "duration": 9,
            "description": "Unspecified contact dermatitis due to dyes"
          },
          {
            "contentTitle": "Vanellus armatus",
            "video": "http://dummyimage.com/212x126.png/ff4444/ffffff",
            "duration": 1,
            "description": "Com variab immunodef w predom immunoreg T-cell disorders"
          },
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/178x112.png/ff4444/ffffff",
            "duration": 9,
            "description": "Laceration w foreign body of unsp toe(s) with damage to nail"
          },
          {
            "contentTitle": "Kobus vardonii vardoni",
            "video": "http://dummyimage.com/106x248.png/dddddd/000000",
            "duration": 6,
            "description": "Nondisp trimalleol fx r low leg, 7thR"
          },
          {
            "contentTitle": "Colaptes campestroides",
            "video": "http://dummyimage.com/191x193.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Failure in dosage during unsp surgical and medical care"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/204x187.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Exudative retinopathy"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/112x237.png/cc0000/ffffff",
            "duration": 1,
            "description": "Toxic effect of ingested (parts of) plant(s), assault, init"
          },
          {
            "contentTitle": "Crotalus triseriatus",
            "video": "http://dummyimage.com/166x144.png/cc0000/ffffff",
            "duration": 4,
            "description": "Other problems related to employment"
          },
          {
            "contentTitle": "Chamaelo sp.",
            "video": "http://dummyimage.com/192x174.png/ff4444/ffffff",
            "duration": 6,
            "description": "Oth fx shaft of r tibia, subs for opn fx type I/2 w nonunion"
          },
          {
            "contentTitle": "Naja nivea",
            "video": "http://dummyimage.com/213x153.png/dddddd/000000",
            "duration": 10,
            "description": "Nondisp spiral fx shaft of rad, unsp arm, 7thK"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/244x198.png/dddddd/000000",
            "duration": 1,
            "description": "Partial traumatic MCP amputation of left little finger, subs"
          },
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/107x139.png/ff4444/ffffff",
            "duration": 8,
            "description": "Postthrom syndrome w oth complications of unsp low extrm"
          }
        ]
      },
      {
        "header": "Design Engineer",
        "totalMinutes": 27086,
        "contents": [
          {
            "contentTitle": "Turtur chalcospilos",
            "video": "http://dummyimage.com/113x179.png/ff4444/ffffff",
            "duration": 3,
            "description": "Acute lymphangitis of left lower limb"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/192x125.png/cc0000/ffffff",
            "duration": 9,
            "description": "Other superficial bite of fingers"
          },
          {
            "contentTitle": "Dasyurus maculatus",
            "video": "http://dummyimage.com/107x163.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Inj intrinsic musc/fasc/tend unsp finger at wrs/hnd lv"
          },
          {
            "contentTitle": "Macropus rufus",
            "video": "http://dummyimage.com/164x139.png/ff4444/ffffff",
            "duration": 6,
            "description": "Cyclotropia, right eye"
          },
          {
            "contentTitle": "Lepilemur rufescens",
            "video": "http://dummyimage.com/134x145.png/ff4444/ffffff",
            "duration": 3,
            "description": "Fracture of lateral condyle of femur"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/116x200.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Laceration without foreign body of scalp"
          },
          {
            "contentTitle": "Cochlearius cochlearius",
            "video": "http://dummyimage.com/234x119.png/cc0000/ffffff",
            "duration": 3,
            "description": "Complete traumatic transphalangeal amputation of left thumb"
          },
          {
            "contentTitle": "Theropithecus gelada",
            "video": "http://dummyimage.com/184x219.png/cc0000/ffffff",
            "duration": 9,
            "description": "Sprain of MCP joint of left index finger, subs"
          },
          {
            "contentTitle": "Heloderma horridum",
            "video": "http://dummyimage.com/216x115.png/dddddd/000000",
            "duration": 5,
            "description": "Nondisp fx of proximal phalanx of right lesser toe(s), init"
          },
          {
            "contentTitle": "Madoqua kirkii",
            "video": "http://dummyimage.com/203x138.png/ff4444/ffffff",
            "duration": 6,
            "description": "Unsp fx shaft of right tibia, subs for clos fx w malunion"
          },
          {
            "contentTitle": "Buteo regalis",
            "video": "http://dummyimage.com/149x108.png/dddddd/000000",
            "duration": 10,
            "description": "Lactose intolerance, unspecified"
          },
          {
            "contentTitle": "Cochlearius cochlearius",
            "video": "http://dummyimage.com/232x233.png/ff4444/ffffff",
            "duration": 7,
            "description": "Nicotine dependence, unsp, w unsp nicotine-induced disorders"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/189x160.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Inj msl/tnd lng extn msl toe at ank/ft level, r foot, subs"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/210x141.png/cc0000/ffffff",
            "duration": 10,
            "description": "Toxic effect of rattlesnake venom"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/147x154.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Nondisp transverse fx shaft of unsp femr, 7thK"
          },
          {
            "contentTitle": "Helogale undulata",
            "video": "http://dummyimage.com/187x149.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Inj axillary or brachial vein, unsp side, init encntr"
          },
          {
            "contentTitle": "Phalacrocorax albiventer",
            "video": "http://dummyimage.com/155x128.png/ff4444/ffffff",
            "duration": 9,
            "description": "Disorders of muscle in diseases classd elswhr, right thigh"
          },
          {
            "contentTitle": "Macaca radiata",
            "video": "http://dummyimage.com/162x188.png/ff4444/ffffff",
            "duration": 8,
            "description": "Person injured in collision betw car and 2/3-whl mv, nontraf"
          },
          {
            "contentTitle": "Crocuta crocuta",
            "video": "http://dummyimage.com/204x243.png/ff4444/ffffff",
            "duration": 9,
            "description": "Oth meniscus derangements, other medial meniscus, unsp knee"
          }
        ]
      },
      {
        "header": "Structural Analysis Engineer",
        "totalMinutes": 81247,
        "contents": [
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/244x162.png/cc0000/ffffff",
            "duration": 10,
            "description": "Disp fx of prox phalanx of unsp great toe, 7thD"
          },
          {
            "contentTitle": "Phalaropus lobatus",
            "video": "http://dummyimage.com/207x121.png/ff4444/ffffff",
            "duration": 6,
            "description": "Poisoning by lysergide, intentional self-harm, subs encntr"
          },
          {
            "contentTitle": "Lorythaixoides concolor",
            "video": "http://dummyimage.com/174x123.png/dddddd/000000",
            "duration": 10,
            "description": "Subacute and chronic vulvitis"
          },
          {
            "contentTitle": "Meles meles",
            "video": "http://dummyimage.com/173x212.png/ff4444/ffffff",
            "duration": 6,
            "description": "Obstructed labor due to maternal pelvic abnormality"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/114x102.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Other fracture of upper and lower end of fibula"
          },
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/151x198.png/dddddd/000000",
            "duration": 8,
            "description": "Age-rel osteopor w current path fx, left ank/ft, sequela"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/194x122.png/dddddd/000000",
            "duration": 10,
            "description": "Displ transverse fx shaft of r tibia, 7thK"
          },
          {
            "contentTitle": "Echimys chrysurus",
            "video": "http://dummyimage.com/213x135.png/cc0000/ffffff",
            "duration": 10,
            "description": "Chondromalacia, other site"
          },
          {
            "contentTitle": "Ursus americanus",
            "video": "http://dummyimage.com/203x159.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Laceration w fb of l idx fngr w/o damage to nail, sequela"
          },
          {
            "contentTitle": "Corallus hortulanus cooki",
            "video": "http://dummyimage.com/188x250.png/dddddd/000000",
            "duration": 7,
            "description": "Valgus deformity, not elsewhere classified, unsp ankle"
          },
          {
            "contentTitle": "Ursus americanus",
            "video": "http://dummyimage.com/172x226.png/cc0000/ffffff",
            "duration": 3,
            "description": "Pathological fracture, unsp site, subs for fx w nonunion"
          },
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/151x207.png/dddddd/000000",
            "duration": 2,
            "description": "Oth injury due to oth accident to fishing boat, init encntr"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/236x242.png/cc0000/ffffff",
            "duration": 8,
            "description": "Pnctr w fb of r mid finger w/o damage to nail, init"
          },
          {
            "contentTitle": "Lasiorhinus latifrons",
            "video": "http://dummyimage.com/164x187.png/dddddd/000000",
            "duration": 10,
            "description": "Injury of digital nerve of left thumb, initial encounter"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/101x119.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Burn of first degree of unspecified palm"
          },
          {
            "contentTitle": "Damaliscus lunatus",
            "video": "http://dummyimage.com/114x139.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Displacement of intraperitoneal dialysis catheter, subs"
          }
        ]
      },
      {
        "header": "Nuclear Power Engineer",
        "totalMinutes": 40622,
        "contents": [
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/171x137.png/cc0000/ffffff",
            "duration": 2,
            "description": "Adult T-cell lymphoma/leukemia (HTLV-1-assoc), in relapse"
          },
          {
            "contentTitle": "Haliaeetus leucoryphus",
            "video": "http://dummyimage.com/130x154.png/cc0000/ffffff",
            "duration": 5,
            "description": "Insect bite (nonvenomous) of shoulder"
          },
          {
            "contentTitle": "Libellula quadrimaculata",
            "video": "http://dummyimage.com/140x129.png/dddddd/000000",
            "duration": 8,
            "description": "Periumbilical pain"
          },
          {
            "contentTitle": "Tragelaphus scriptus",
            "video": "http://dummyimage.com/165x217.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Blindness, right eye, normal vision left eye"
          },
          {
            "contentTitle": "Ploceus intermedius",
            "video": "http://dummyimage.com/196x165.png/dddddd/000000",
            "duration": 8,
            "description": "Toxic effect of mycotoxin food contaminants, accidental"
          }
        ]
      },
      {
        "header": "Financial Analyst",
        "totalMinutes": 76119,
        "contents": [
          {
            "contentTitle": "Tockus erythrorhyncus",
            "video": "http://dummyimage.com/119x149.png/ff4444/ffffff",
            "duration": 8,
            "description": "Pnctr w foreign body of unsp toe(s) w/o damage to nail, init"
          },
          {
            "contentTitle": "Cacatua galerita",
            "video": "http://dummyimage.com/152x101.png/cc0000/ffffff",
            "duration": 7,
            "description": "Unsp fracture of second thoracic vertebra, init for clos fx"
          },
          {
            "contentTitle": "Corvus albus",
            "video": "http://dummyimage.com/162x175.png/dddddd/000000",
            "duration": 3,
            "description": "Failed or difficult intubation, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/123x149.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Occup of 3-whl mv inj in clsn w nonmtr vehicle in traf, init"
          },
          {
            "contentTitle": "Dendrocitta vagabunda",
            "video": "http://dummyimage.com/231x137.png/cc0000/ffffff",
            "duration": 8,
            "description": "Nondisp fx of greater trochanter of l femr, 7thN"
          },
          {
            "contentTitle": "Herpestes javanicus",
            "video": "http://dummyimage.com/103x200.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Lacerat unsp blood vess at hip and thi lev, right leg, sqla"
          },
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/122x108.png/ff4444/ffffff",
            "duration": 10,
            "description": "Other specified superficial mycoses"
          },
          {
            "contentTitle": "Graspus graspus",
            "video": "http://dummyimage.com/186x105.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Strain musc/tend ant grp at low leg level, right leg, sqla"
          },
          {
            "contentTitle": "Antidorcas marsupialis",
            "video": "http://dummyimage.com/140x152.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Fracture of condylar process of left mandible, sequela"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/171x172.png/ff4444/ffffff",
            "duration": 5,
            "description": "Cholesteatoma of mastoid"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/155x208.png/cc0000/ffffff",
            "duration": 8,
            "description": "Nontraumatic ischemic infarction of muscle, unspecified hand"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/133x217.png/cc0000/ffffff",
            "duration": 9,
            "description": "Presence of left artificial wrist joint"
          },
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/131x129.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Displ spiral fx shaft of l tibia, 7thC"
          }
        ]
      },
      {
        "header": "VP Quality Control",
        "totalMinutes": 70373,
        "contents": [
          {
            "contentTitle": "Spilogale gracilis",
            "video": "http://dummyimage.com/175x187.png/ff4444/ffffff",
            "duration": 4,
            "description": "Unspecified injury of left vertebral artery, sequela"
          },
          {
            "contentTitle": "Petaurus breviceps",
            "video": "http://dummyimage.com/192x238.png/ff4444/ffffff",
            "duration": 1,
            "description": "Other injury of other part of small intestine, subs encntr"
          },
          {
            "contentTitle": "Uraeginthus angolensis",
            "video": "http://dummyimage.com/199x232.png/cc0000/ffffff",
            "duration": 10,
            "description": "Toxic optic neuropathy"
          },
          {
            "contentTitle": "Meleagris gallopavo",
            "video": "http://dummyimage.com/137x116.png/dddddd/000000",
            "duration": 9,
            "description": "Disorders of optic chiasm in (due to) other disorders"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/219x250.png/dddddd/000000",
            "duration": 9,
            "description": "Unsp injury of musc/fasc/tend at forearm level"
          },
          {
            "contentTitle": "Microcebus murinus",
            "video": "http://dummyimage.com/142x150.png/ff4444/ffffff",
            "duration": 8,
            "description": "Fall from stairs and steps due to ice and snow, subs encntr"
          },
          {
            "contentTitle": "Falco mexicanus",
            "video": "http://dummyimage.com/204x228.png/ff4444/ffffff",
            "duration": 6,
            "description": "Antiepileptic, sedative- hypnotic and antiparkinsonism drugs"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/174x179.png/ff4444/ffffff",
            "duration": 1,
            "description": "Incmpl rotatr-cuff tear/ruptr of unsp shoulder, not trauma"
          },
          {
            "contentTitle": "Turtur chalcospilos",
            "video": "http://dummyimage.com/185x145.png/ff4444/ffffff",
            "duration": 7,
            "description": "Displaced oblique fracture of shaft of left fibula, init"
          },
          {
            "contentTitle": "Capreolus capreolus",
            "video": "http://dummyimage.com/168x129.png/dddddd/000000",
            "duration": 9,
            "description": "Milt op involving oth explosions and fragments, milt, subs"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/213x231.png/ff4444/ffffff",
            "duration": 3,
            "description": "Corrosion of third degree of unspecified palm"
          },
          {
            "contentTitle": "Loxodonta africana",
            "video": "http://dummyimage.com/131x229.png/cc0000/ffffff",
            "duration": 2,
            "description": "Laceration without foreign body of unspecified part of neck"
          },
          {
            "contentTitle": "Cercatetus concinnus",
            "video": "http://dummyimage.com/159x138.png/ff4444/ffffff",
            "duration": 1,
            "description": "Displ spiral fx shaft of unsp tibia, 7thK"
          },
          {
            "contentTitle": "Sterna paradisaea",
            "video": "http://dummyimage.com/119x195.png/ff4444/ffffff",
            "duration": 10,
            "description": "Toxic effect of unsp inorganic substance, accidental, init"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/210x126.png/ff4444/ffffff",
            "duration": 10,
            "description": "Laceration without foreign body, unspecified thigh, sequela"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/101x198.png/ff4444/ffffff",
            "duration": 1,
            "description": "Unsp opn wnd r frnt wl of thorax w penet thor cavity, subs"
          },
          {
            "contentTitle": "Ramphastos tucanus",
            "video": "http://dummyimage.com/193x107.png/cc0000/ffffff",
            "duration": 6,
            "description": "Other disorders of unsp eye following cataract surgery"
          },
          {
            "contentTitle": "Vanellus chilensis",
            "video": "http://dummyimage.com/144x159.png/dddddd/000000",
            "duration": 8,
            "description": "Complete traumatic MCP amputation of right index finger"
          }
        ]
      },
      {
        "header": "VP Quality Control",
        "totalMinutes": 21491,
        "contents": [
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/108x246.png/cc0000/ffffff",
            "duration": 2,
            "description": "Nondisp apophyseal fx r femr, 7thM"
          },
          {
            "contentTitle": "Camelus dromedarius",
            "video": "http://dummyimage.com/125x232.png/ff4444/ffffff",
            "duration": 4,
            "description": "Corrosion of unsp degree of unsp scapular region, subs"
          },
          {
            "contentTitle": "Aquila chrysaetos",
            "video": "http://dummyimage.com/170x183.png/ff4444/ffffff",
            "duration": 1,
            "description": "Congenital stenosis of vena cava"
          },
          {
            "contentTitle": "Geococcyx californianus",
            "video": "http://dummyimage.com/108x157.png/ff4444/ffffff",
            "duration": 1,
            "description": "Acute lymphangitis of unspecified finger"
          },
          {
            "contentTitle": "Vombatus ursinus",
            "video": "http://dummyimage.com/149x180.png/dddddd/000000",
            "duration": 8,
            "description": "Pathological fracture, right toe(s), subs for fx w malunion"
          },
          {
            "contentTitle": "Hippotragus niger",
            "video": "http://dummyimage.com/249x231.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Nondisp fx of olecran pro w/o intartic extn unsp ulna, 7thP"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/205x107.png/ff4444/ffffff",
            "duration": 10,
            "description": "Traum rupture of collat ligament of r idx fngr at MCP/IP jt"
          },
          {
            "contentTitle": "Mustela nigripes",
            "video": "http://dummyimage.com/246x135.png/ff4444/ffffff",
            "duration": 9,
            "description": "Toxic effect of contact w venomous toad, assault, init"
          },
          {
            "contentTitle": "Actophilornis africanus",
            "video": "http://dummyimage.com/222x244.png/cc0000/ffffff",
            "duration": 4,
            "description": "Nondisp fx of less trochanter of r femr, 7thR"
          }
        ]
      },
      {
        "header": "Operator",
        "totalMinutes": 94186,
        "contents": [
          {
            "contentTitle": "Chamaelo sp.",
            "video": "http://dummyimage.com/125x227.png/ff4444/ffffff",
            "duration": 4,
            "description": "Poisoning by unspecified systemic antibiotic, undetermined"
          },
          {
            "contentTitle": "Microcebus murinus",
            "video": "http://dummyimage.com/140x191.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Olecranon bursitis"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/154x134.png/ff4444/ffffff",
            "duration": 4,
            "description": "Injury of axillary nerve, left arm, subsequent encounter"
          },
          {
            "contentTitle": "Morelia spilotes variegata",
            "video": "http://dummyimage.com/186x197.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Displ subtrochnt fx l femr, 7thM"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/219x139.png/dddddd/000000",
            "duration": 8,
            "description": "Toxic effect of hydrogen sulfide, accidental (unintentional)"
          },
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/165x214.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Blister (nonthermal) of unspecified hand, initial encounter"
          },
          {
            "contentTitle": "Funambulus pennati",
            "video": "http://dummyimage.com/213x232.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Monoplg low lmb fol oth cerebvasc disease aff unsp side"
          },
          {
            "contentTitle": "Nectarinia chalybea",
            "video": "http://dummyimage.com/214x206.png/ff4444/ffffff",
            "duration": 4,
            "description": "Burn of first degree of right axilla, sequela"
          },
          {
            "contentTitle": "Cercopithecus aethiops",
            "video": "http://dummyimage.com/150x100.png/dddddd/000000",
            "duration": 4,
            "description": "Cannabis use, unsp with other cannabis-induced disorder"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/112x233.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other seizures"
          },
          {
            "contentTitle": "Streptopelia senegalensis",
            "video": "http://dummyimage.com/190x131.png/dddddd/000000",
            "duration": 4,
            "description": "Complete lesion at T11-T12, sequela"
          }
        ]
      },
      {
        "header": "Senior Developer",
        "totalMinutes": 70170,
        "contents": [
          {
            "contentTitle": "Lophoaetus occipitalis",
            "video": "http://dummyimage.com/144x179.png/ff4444/ffffff",
            "duration": 6,
            "description": "Hordeolum externum right upper eyelid"
          },
          {
            "contentTitle": "Anthropoides paradisea",
            "video": "http://dummyimage.com/248x148.png/cc0000/ffffff",
            "duration": 8,
            "description": "Immunization not carried out for unspecified reason"
          },
          {
            "contentTitle": "Canis mesomelas",
            "video": "http://dummyimage.com/146x104.png/dddddd/000000",
            "duration": 2,
            "description": "Pedl cyc driver injured in clsn w statnry object nontraf"
          },
          {
            "contentTitle": "Geochelone elephantopus",
            "video": "http://dummyimage.com/229x237.png/ff4444/ffffff",
            "duration": 1,
            "description": "Inj oth blood vessels at shoulder and upper arm level"
          },
          {
            "contentTitle": "Phalacrocorax varius",
            "video": "http://dummyimage.com/197x234.png/cc0000/ffffff",
            "duration": 10,
            "description": "Pnctr w/o fb of unsp bk wl of thorax w penet thoracic cavity"
          },
          {
            "contentTitle": "Crotalus triseriatus",
            "video": "http://dummyimage.com/126x164.png/ff4444/ffffff",
            "duration": 3,
            "description": "Person outside car injured in clsn w van nontraf, sequela"
          },
          {
            "contentTitle": "Connochaetus taurinus",
            "video": "http://dummyimage.com/129x180.png/dddddd/000000",
            "duration": 1,
            "description": "Zygomatic fracture, right side, 7thG"
          },
          {
            "contentTitle": "Sciurus niger",
            "video": "http://dummyimage.com/241x217.png/dddddd/000000",
            "duration": 8,
            "description": "Disp fx of shaft of 1st MC bone, unsp hand, init for opn fx"
          },
          {
            "contentTitle": "Crotaphytus collaris",
            "video": "http://dummyimage.com/144x210.png/cc0000/ffffff",
            "duration": 2,
            "description": "Contus/lac r cereb w LOC >24 hr w/o ret consc w surv, init"
          },
          {
            "contentTitle": "Acanthaster planci",
            "video": "http://dummyimage.com/237x171.png/ff4444/ffffff",
            "duration": 10,
            "description": "Unsp inj musc/tend ant grp at low leg level, left leg, init"
          },
          {
            "contentTitle": "Damaliscus lunatus",
            "video": "http://dummyimage.com/242x140.png/cc0000/ffffff",
            "duration": 8,
            "description": "Unspecified sprain of right foot"
          },
          {
            "contentTitle": "Myotis lucifugus",
            "video": "http://dummyimage.com/198x221.png/cc0000/ffffff",
            "duration": 7,
            "description": "Superficial foreign body of lip, initial encounter"
          },
          {
            "contentTitle": "Anthropoides paradisea",
            "video": "http://dummyimage.com/221x170.png/dddddd/000000",
            "duration": 1,
            "description": "Unspecified edema specific to newborn"
          },
          {
            "contentTitle": "Aegypius occipitalis",
            "video": "http://dummyimage.com/119x217.png/ff4444/ffffff",
            "duration": 9,
            "description": "Bent bone of l rad, subs for opn fx type 3A/B/C w nonunion"
          },
          {
            "contentTitle": "Spermophilus parryii",
            "video": "http://dummyimage.com/107x166.png/cc0000/ffffff",
            "duration": 4,
            "description": "External constriction of left wrist"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/134x116.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Oth osteopor w current path fracture, unsp shoulder, init"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/121x240.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Other injury of tail of pancreas"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/151x100.png/dddddd/000000",
            "duration": 4,
            "description": "Nondisp spiral fx shaft of ulna, r arm, 7thM"
          },
          {
            "contentTitle": "Callorhinus ursinus",
            "video": "http://dummyimage.com/137x107.png/cc0000/ffffff",
            "duration": 7,
            "description": "Barracks on military base as place"
          },
          {
            "contentTitle": "Limosa haemastica",
            "video": "http://dummyimage.com/105x212.png/ff4444/ffffff",
            "duration": 1,
            "description": "Oth intartic fx low end l rad, subs for clos fx w nonunion"
          }
        ]
      }
    ]
  },
  {
    "title": "Last Dance",
    "subject": "Legal",
    "instructorName": "Rodin Salem",
    "price": 3844.28,
    "level": "Advanced",
    "courseHours": 58,
    "summary": "Oth traumatic spondylolisthesis of fourth cervical vertebra",
    "subtitles": [
      {
        "header": "Account Coordinator",
        "totalMinutes": 15311,
        "contents": [
          {
            "contentTitle": "Trachyphonus vaillantii",
            "video": "http://dummyimage.com/218x215.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Anterior dislocation of left humerus"
          },
          {
            "contentTitle": "Theropithecus gelada",
            "video": "http://dummyimage.com/141x136.png/dddddd/000000",
            "duration": 8,
            "description": "Athscl type of bypass of the extrm w gangrene, right leg"
          },
          {
            "contentTitle": "Hyaena hyaena",
            "video": "http://dummyimage.com/124x222.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Unsp opn wnd abd wall, right upper q w penet perit cav, init"
          },
          {
            "contentTitle": "Vanellus chilensis",
            "video": "http://dummyimage.com/205x142.png/ff4444/ffffff",
            "duration": 9,
            "description": "Nondisp fx of neck of scapula, right shoulder, sequela"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/205x110.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Lacerat msl/fasc/tnd post grp at thi lev, left thigh, sqla"
          }
        ]
      },
      {
        "header": "Account Coordinator",
        "totalMinutes": 47636,
        "contents": [
          {
            "contentTitle": "Trachyphonus vaillantii",
            "video": "http://dummyimage.com/236x130.png/dddddd/000000",
            "duration": 1,
            "description": "Rheu arthritis of unsp hand w involv of organs and systems"
          },
          {
            "contentTitle": "Platalea leucordia",
            "video": "http://dummyimage.com/200x104.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Congenital stenosis and stricture of esophagus"
          },
          {
            "contentTitle": "Genetta genetta",
            "video": "http://dummyimage.com/173x143.png/cc0000/ffffff",
            "duration": 8,
            "description": "Hypertrophy of bone, right ulna"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/162x217.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Nondisp fx of med phalanx of l less toe(s), 7thG"
          },
          {
            "contentTitle": "Libellula quadrimaculata",
            "video": "http://dummyimage.com/123x168.png/cc0000/ffffff",
            "duration": 2,
            "description": "Unspecified fracture of foot"
          },
          {
            "contentTitle": "Phalacrocorax varius",
            "video": "http://dummyimage.com/196x210.png/ff4444/ffffff",
            "duration": 9,
            "description": "Open bite, unspecified lower leg, initial encounter"
          },
          {
            "contentTitle": "Zenaida galapagoensis",
            "video": "http://dummyimage.com/233x175.png/cc0000/ffffff",
            "duration": 5,
            "description": "Cereb infrc due to unsp occls or stenos of left carotid art"
          },
          {
            "contentTitle": "Branta canadensis",
            "video": "http://dummyimage.com/248x163.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Major contusion of left kidney, sequela"
          },
          {
            "contentTitle": "Cervus canadensis",
            "video": "http://dummyimage.com/227x204.png/cc0000/ffffff",
            "duration": 5,
            "description": "Nondisp fx of 3rd metatarsal bone, l ft, 7thK"
          },
          {
            "contentTitle": "Spermophilus richardsonii",
            "video": "http://dummyimage.com/210x138.png/dddddd/000000",
            "duration": 1,
            "description": "Nondisp midcervical fx unsp femur, init for opn fx type I/2"
          }
        ]
      },
      {
        "header": "Database Administrator III",
        "totalMinutes": 46037,
        "contents": [
          {
            "contentTitle": "Pan troglodytes",
            "video": "http://dummyimage.com/207x181.png/dddddd/000000",
            "duration": 2,
            "description": "Puncture wound w foreign body of unsp buttock, init encntr"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/133x113.png/dddddd/000000",
            "duration": 1,
            "description": "Toxic effect of contact w oth venomous plant, undet, init"
          },
          {
            "contentTitle": "Sus scrofa",
            "video": "http://dummyimage.com/134x150.png/ff4444/ffffff",
            "duration": 6,
            "description": "Burn of third degree of head, face, and neck"
          },
          {
            "contentTitle": "Ceryle rudis",
            "video": "http://dummyimage.com/205x196.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Complete traumatic transphalangeal amputation of left thumb"
          },
          {
            "contentTitle": "Panthera onca",
            "video": "http://dummyimage.com/159x165.png/dddddd/000000",
            "duration": 1,
            "description": "Unsp inj extn musc/fasc/tend and unsp finger at forarm lv"
          },
          {
            "contentTitle": "Potamochoerus porcus",
            "video": "http://dummyimage.com/244x124.png/ff4444/ffffff",
            "duration": 4,
            "description": "Displ intertroch fx unsp femr, 7thM"
          },
          {
            "contentTitle": "Echimys chrysurus",
            "video": "http://dummyimage.com/202x165.png/cc0000/ffffff",
            "duration": 9,
            "description": "Unsp fx shaft of r tibia, 7thR"
          },
          {
            "contentTitle": "Eurocephalus anguitimens",
            "video": "http://dummyimage.com/124x114.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Osteitis condensans, other site"
          },
          {
            "contentTitle": "Phaethon aethereus",
            "video": "http://dummyimage.com/203x140.png/cc0000/ffffff",
            "duration": 5,
            "description": "Anterior subluxation of left radial head"
          },
          {
            "contentTitle": "Spilogale gracilis",
            "video": "http://dummyimage.com/219x177.png/cc0000/ffffff",
            "duration": 4,
            "description": "Mycoplasma infection, unspecified site"
          },
          {
            "contentTitle": "Boa caninus",
            "video": "http://dummyimage.com/249x244.png/cc0000/ffffff",
            "duration": 7,
            "description": "Strain of intrinsic musc/fasc/tend r rng fngr at wrs/hnd lv"
          },
          {
            "contentTitle": "Bucorvus leadbeateri",
            "video": "http://dummyimage.com/140x124.png/dddddd/000000",
            "duration": 10,
            "description": "Single stillbirth"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/161x149.png/cc0000/ffffff",
            "duration": 8,
            "description": "Displacement of infusion catheter"
          }
        ]
      },
      {
        "header": "Account Executive",
        "totalMinutes": 1902,
        "contents": [
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/144x118.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Sprain of tibiofibular ligament of left ankle, init encntr"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/157x100.png/ff4444/ffffff",
            "duration": 6,
            "description": "Drug-induced chronic gout, unspecified site, without tophus"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/180x222.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Displ oblique fx shaft of unsp femr, 7thR"
          },
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/192x160.png/cc0000/ffffff",
            "duration": 8,
            "description": "Dislocation of unsp interphalangeal joint of l little finger"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/107x161.png/ff4444/ffffff",
            "duration": 2,
            "description": "Nondisp simp suprcndl fx w/o intrcndl fx r humer, 7thD"
          },
          {
            "contentTitle": "Spilogale gracilis",
            "video": "http://dummyimage.com/136x200.png/cc0000/ffffff",
            "duration": 6,
            "description": "Poisn by oth systemic anti-infect/parasit, assault, sequela"
          },
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/228x111.png/dddddd/000000",
            "duration": 7,
            "description": "Cystic kidney disease, unspecified"
          },
          {
            "contentTitle": "Laniaurius atrococcineus",
            "video": "http://dummyimage.com/227x194.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Nondisp transverse fx shaft of unsp rad, 7thK"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/226x245.png/cc0000/ffffff",
            "duration": 8,
            "description": "Prsn brd/alit pk-up/van inj pick-up truck, pk-up/van, subs"
          },
          {
            "contentTitle": "Sylvilagus floridanus",
            "video": "http://dummyimage.com/196x164.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Superficial foreign body, left hip, initial encounter"
          },
          {
            "contentTitle": "Capreolus capreolus",
            "video": "http://dummyimage.com/164x246.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Brucellosis, unspecified"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/233x175.png/dddddd/000000",
            "duration": 2,
            "description": "Nondisp fx of 1st metatarsal bone, l ft, 7thP"
          },
          {
            "contentTitle": "Ramphastos tucanus",
            "video": "http://dummyimage.com/172x202.png/ff4444/ffffff",
            "duration": 9,
            "description": "Other injury due to other accident to water-skis"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/188x187.png/ff4444/ffffff",
            "duration": 9,
            "description": "Toxic effect of trichloroethylene, assault, init encntr"
          },
          {
            "contentTitle": "Litrocranius walleri",
            "video": "http://dummyimage.com/140x209.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Other specified mononeuropathies"
          },
          {
            "contentTitle": "Creagrus furcatus",
            "video": "http://dummyimage.com/119x136.png/cc0000/ffffff",
            "duration": 5,
            "description": "Age-rel osteopor w current path fracture, unsp femur, init"
          },
          {
            "contentTitle": "Neophoca cinerea",
            "video": "http://dummyimage.com/128x165.png/cc0000/ffffff",
            "duration": 7,
            "description": "Other reactive arthropathies, unspecified knee"
          },
          {
            "contentTitle": "Climacteris melanura",
            "video": "http://dummyimage.com/201x185.png/cc0000/ffffff",
            "duration": 5,
            "description": "Adolescent idiopathic scoliosis, thoracolumbar region"
          }
        ]
      },
      {
        "header": "VP Product Management",
        "totalMinutes": 44811,
        "contents": [
          {
            "contentTitle": "Hippopotamus amphibius",
            "video": "http://dummyimage.com/185x171.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Mech compl of bile duct prosthesis, initial encounter"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/246x247.png/cc0000/ffffff",
            "duration": 1,
            "description": "Contusion of left great toe without damage to nail, sequela"
          },
          {
            "contentTitle": "Diceros bicornis",
            "video": "http://dummyimage.com/181x129.png/ff4444/ffffff",
            "duration": 6,
            "description": "Puncture wound w/o foreign body of right forearm, subs"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/216x165.png/ff4444/ffffff",
            "duration": 3,
            "description": "Bit/stung by nonvenom insect & oth nonvenom arthropods, subs"
          },
          {
            "contentTitle": "Sagittarius serpentarius",
            "video": "http://dummyimage.com/196x139.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Complete traumatic trnsphal amputation of right thumb, init"
          },
          {
            "contentTitle": "Corythornis cristata",
            "video": "http://dummyimage.com/122x118.png/ff4444/ffffff",
            "duration": 8,
            "description": "Nondisp commnt fx shaft of ulna, r arm, 7thF"
          },
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/120x158.png/ff4444/ffffff",
            "duration": 10,
            "description": "Complete traumatic MCP amputation of r mid finger, init"
          },
          {
            "contentTitle": "Isoodon obesulus",
            "video": "http://dummyimage.com/227x177.png/ff4444/ffffff",
            "duration": 1,
            "description": "External constriction of unsp front wall of thorax, init"
          },
          {
            "contentTitle": "Graspus graspus",
            "video": "http://dummyimage.com/126x158.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Abrasion, right knee, sequela"
          },
          {
            "contentTitle": "Phaethon aethereus",
            "video": "http://dummyimage.com/209x122.png/dddddd/000000",
            "duration": 9,
            "description": "Unsp inj musc/fasc/tend at shldr/up arm, left arm, sequela"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/250x170.png/ff4444/ffffff",
            "duration": 5,
            "description": "Secondary oligomenorrhea"
          },
          {
            "contentTitle": "Leptoptilus dubius",
            "video": "http://dummyimage.com/228x135.png/cc0000/ffffff",
            "duration": 4,
            "description": "Struck by ice hockey puck, initial encounter"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/108x168.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Child neglect or abandonment, suspected"
          }
        ]
      },
      {
        "header": "Pharmacist",
        "totalMinutes": 85301,
        "contents": [
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/209x167.png/ff4444/ffffff",
            "duration": 4,
            "description": "External constriction of right back wall of thorax, subs"
          },
          {
            "contentTitle": "Callipepla gambelii",
            "video": "http://dummyimage.com/139x217.png/cc0000/ffffff",
            "duration": 2,
            "description": "Partial traumatic amp of right foot at ankle level, sequela"
          },
          {
            "contentTitle": "Tachybaptus ruficollis",
            "video": "http://dummyimage.com/190x208.png/cc0000/ffffff",
            "duration": 9,
            "description": "Nondisp fx of neck of scapula, r shoulder, init for opn fx"
          },
          {
            "contentTitle": "Anitibyx armatus",
            "video": "http://dummyimage.com/166x157.png/dddddd/000000",
            "duration": 8,
            "description": "Jumping or diving into other water striking wall"
          },
          {
            "contentTitle": "Phacochoerus aethiopus",
            "video": "http://dummyimage.com/220x235.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Sltr-haris Type II physl fx low end r fibula, 7thK"
          },
          {
            "contentTitle": "Callorhinus ursinus",
            "video": "http://dummyimage.com/199x160.png/dddddd/000000",
            "duration": 7,
            "description": "Partial traumatic trnsphal amputation of l little finger"
          },
          {
            "contentTitle": "Chloephaga melanoptera",
            "video": "http://dummyimage.com/157x236.png/dddddd/000000",
            "duration": 3,
            "description": "Coronary artery aneurysm and dissection"
          },
          {
            "contentTitle": "Cygnus buccinator",
            "video": "http://dummyimage.com/125x228.png/ff4444/ffffff",
            "duration": 2,
            "description": "Contact with sharp glass, undetermined intent, subs encntr"
          },
          {
            "contentTitle": "Antilope cervicapra",
            "video": "http://dummyimage.com/108x195.png/ff4444/ffffff",
            "duration": 6,
            "description": "Oth extrartic fx low end unsp rad, 7thF"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/211x119.png/dddddd/000000",
            "duration": 2,
            "description": "Arthropathies in oth diseases classified elsewhere"
          },
          {
            "contentTitle": "Recurvirostra avosetta",
            "video": "http://dummyimage.com/183x187.png/cc0000/ffffff",
            "duration": 5,
            "description": "Central perforation of tympanic membrane, right ear"
          },
          {
            "contentTitle": "Petaurus norfolcensis",
            "video": "http://dummyimage.com/100x136.png/dddddd/000000",
            "duration": 10,
            "description": "Injury of other nerves at lower leg level, unsp leg, sequela"
          },
          {
            "contentTitle": "Rangifer tarandus",
            "video": "http://dummyimage.com/137x171.png/dddddd/000000",
            "duration": 1,
            "description": "Yellow nail syndrome"
          }
        ]
      },
      {
        "header": "Human Resources Manager",
        "totalMinutes": 88660,
        "contents": [
          {
            "contentTitle": "Marmota caligata",
            "video": "http://dummyimage.com/122x174.png/cc0000/ffffff",
            "duration": 1,
            "description": "Nondisp artic fx head of l femur, init for opn fx type I/2"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/144x184.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Poisoning by oth general anesthetics, intentional self-harm"
          },
          {
            "contentTitle": "Neotoma sp.",
            "video": "http://dummyimage.com/227x109.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Abrasion of right thumb, initial encounter"
          },
          {
            "contentTitle": "Felis libyca",
            "video": "http://dummyimage.com/216x178.png/cc0000/ffffff",
            "duration": 9,
            "description": "Secondary noninfectious iridocyclitis, unspecified eye"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/154x141.png/ff4444/ffffff",
            "duration": 3,
            "description": "Crushing injury of unspecified hand, subsequent encounter"
          },
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/175x246.png/dddddd/000000",
            "duration": 9,
            "description": "Spontaneous rupture of extensor tendons, left forearm"
          },
          {
            "contentTitle": "Phoca vitulina",
            "video": "http://dummyimage.com/167x238.png/cc0000/ffffff",
            "duration": 2,
            "description": "Osteonecrosis due to drugs, left finger(s)"
          },
          {
            "contentTitle": "Ovis canadensis",
            "video": "http://dummyimage.com/231x155.png/cc0000/ffffff",
            "duration": 7,
            "description": "Partial traumatic amp at level betw left hip and knee, init"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/120x165.png/ff4444/ffffff",
            "duration": 2,
            "description": "Nondisp fx of acromial pro, r shldr, subs for fx w malunion"
          },
          {
            "contentTitle": "Rangifer tarandus",
            "video": "http://dummyimage.com/237x248.png/ff4444/ffffff",
            "duration": 10,
            "description": "Person outside 3-whl mv inj in clsn w rail trn/veh in traf"
          },
          {
            "contentTitle": "Meleagris gallopavo",
            "video": "http://dummyimage.com/117x225.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Exposure to smoke, fire and flames, undet intent, init"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/210x136.png/cc0000/ffffff",
            "duration": 2,
            "description": "Disp fx of anterior wall of unspecified acetabulum, sequela"
          },
          {
            "contentTitle": "Geochelone radiata",
            "video": "http://dummyimage.com/152x177.png/cc0000/ffffff",
            "duration": 10,
            "description": "Other spondylosis with myelopathy, cervical region"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/199x155.png/cc0000/ffffff",
            "duration": 7,
            "description": "Other bursal cyst, unspecified elbow"
          },
          {
            "contentTitle": "Aonyx cinerea",
            "video": "http://dummyimage.com/194x136.png/ff4444/ffffff",
            "duration": 1,
            "description": "Disp fx of medial cuneiform of unsp foot, init for opn fx"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/211x156.png/ff4444/ffffff",
            "duration": 9,
            "description": "Struck by sea lion, initial encounter"
          },
          {
            "contentTitle": "Phalacrocorax brasilianus",
            "video": "http://dummyimage.com/247x119.png/dddddd/000000",
            "duration": 3,
            "description": "Path fx in oth disease, r humerus, subs for fx w routn heal"
          },
          {
            "contentTitle": "Geochelone radiata",
            "video": "http://dummyimage.com/193x172.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Malignant neoplasm of bone and articular cartilage of limbs"
          }
        ]
      },
      {
        "header": "Environmental Tech",
        "totalMinutes": 42155,
        "contents": [
          {
            "contentTitle": "Ephipplorhynchus senegalensis",
            "video": "http://dummyimage.com/118x115.png/dddddd/000000",
            "duration": 9,
            "description": "Skeletal fluorosis, right lower leg"
          },
          {
            "contentTitle": "Alces alces",
            "video": "http://dummyimage.com/198x140.png/dddddd/000000",
            "duration": 8,
            "description": "Mediastnl (thymic) large B-cell lymphoma, intrathorac nodes"
          },
          {
            "contentTitle": "Crotalus triseriatus",
            "video": "http://dummyimage.com/146x144.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Sciatica, left side"
          },
          {
            "contentTitle": "Leptoptilus dubius",
            "video": "http://dummyimage.com/180x236.png/cc0000/ffffff",
            "duration": 1,
            "description": "Rheumatoid myopathy with rheumatoid arthritis of right wrist"
          },
          {
            "contentTitle": "Hippopotamus amphibius",
            "video": "http://dummyimage.com/121x193.png/ff4444/ffffff",
            "duration": 2,
            "description": "Oth symptoms and signs involving the circ and resp sys"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/164x112.png/ff4444/ffffff",
            "duration": 4,
            "description": "Athscl unsp type bypass of the extrm w rest pain, left leg"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/221x133.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Legal intervention involving unsp gas, suspect injured, subs"
          },
          {
            "contentTitle": "Larus fuliginosus",
            "video": "http://dummyimage.com/203x239.png/cc0000/ffffff",
            "duration": 10,
            "description": "Obstruction of gallbladder"
          },
          {
            "contentTitle": "Pelecans onocratalus",
            "video": "http://dummyimage.com/131x229.png/cc0000/ffffff",
            "duration": 8,
            "description": "Cervical root disorders, not elsewhere classified"
          },
          {
            "contentTitle": "Castor canadensis",
            "video": "http://dummyimage.com/212x199.png/cc0000/ffffff",
            "duration": 10,
            "description": "Pasngr on bus injured in clsn w 2/3-whl mv in traf, sequela"
          },
          {
            "contentTitle": "Grus rubicundus",
            "video": "http://dummyimage.com/102x223.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Unspecified fracture of lower end of right ulna, sequela"
          },
          {
            "contentTitle": "Lorythaixoides concolor",
            "video": "http://dummyimage.com/167x147.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Posterior synechiae (iris), left eye"
          },
          {
            "contentTitle": "Eutamias minimus",
            "video": "http://dummyimage.com/250x240.png/cc0000/ffffff",
            "duration": 10,
            "description": "Nondisplaced avulsion fracture of right ilium"
          }
        ]
      },
      {
        "header": "Environmental Specialist",
        "totalMinutes": 32760,
        "contents": [
          {
            "contentTitle": "Aonyx cinerea",
            "video": "http://dummyimage.com/103x129.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Obstruction due to fb acc left in body following heart cath"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/228x190.png/dddddd/000000",
            "duration": 9,
            "description": "Major osseous defect, right lower leg"
          },
          {
            "contentTitle": "Kobus vardonii vardoni",
            "video": "http://dummyimage.com/157x142.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Path fx in neopltc dis, hip, unsp, subs for fx w delay heal"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/249x213.png/ff4444/ffffff",
            "duration": 9,
            "description": "Torus fx upper end of unsp fibula, subs for fx w routn heal"
          },
          {
            "contentTitle": "Taurotagus oryx",
            "video": "http://dummyimage.com/243x110.png/cc0000/ffffff",
            "duration": 1,
            "description": "Laceration without foreign body, left hip, initial encounter"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/189x159.png/ff4444/ffffff",
            "duration": 5,
            "description": "Unsp inj intrinsic musc/fasc/tend finger at wrs/hnd lv, subs"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/183x134.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Forced landing of spacecraft injuring occupant, init encntr"
          },
          {
            "contentTitle": "Turtur chalcospilos",
            "video": "http://dummyimage.com/207x243.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Oth fx upper end of left tibia, init for opn fx type I/2"
          },
          {
            "contentTitle": "Vanessa indica",
            "video": "http://dummyimage.com/243x131.png/cc0000/ffffff",
            "duration": 6,
            "description": "Multiple endocrine neoplasia [MEN] syndromes"
          },
          {
            "contentTitle": "Lasiorhinus latifrons",
            "video": "http://dummyimage.com/244x191.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Displaced transcondy fx unsp humerus, subs for fx w malunion"
          },
          {
            "contentTitle": "Crocodylus niloticus",
            "video": "http://dummyimage.com/220x178.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Underdosing of digestants, sequela"
          },
          {
            "contentTitle": "Tyto novaehollandiae",
            "video": "http://dummyimage.com/229x137.png/cc0000/ffffff",
            "duration": 1,
            "description": "Poisoning by ganglionic blocking drugs, undetermined, init"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/211x112.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Displ osteochon fx l patella, subs for clos fx w delay heal"
          },
          {
            "contentTitle": "Stercorarius longicausus",
            "video": "http://dummyimage.com/122x126.png/dddddd/000000",
            "duration": 6,
            "description": "Pathological fracture in other disease, unsp ankle, sequela"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/132x169.png/ff4444/ffffff",
            "duration": 6,
            "description": "Other superficial bite of right thumb"
          },
          {
            "contentTitle": "Felis concolor",
            "video": "http://dummyimage.com/146x191.png/cc0000/ffffff",
            "duration": 1,
            "description": "Oth stim depend w stim-induce psych disorder w delusions"
          }
        ]
      }
    ]
  },
  {
    "title": "Playing for Keeps",
    "subject": "Research and Development",
    "instructorName": "Rodin Salem",
    "price": 3222.91,
    "level": "Intermediate",
    "courseHours": 116,
    "summary": "Other dysphagia",
    "subtitles": [
      {
        "header": "General Manager",
        "totalMinutes": 6650,
        "contents": [
          {
            "contentTitle": "Litrocranius walleri",
            "video": "http://dummyimage.com/109x143.png/cc0000/ffffff",
            "duration": 10,
            "description": "Other specified injury of brachial artery"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/147x244.png/ff4444/ffffff",
            "duration": 9,
            "description": "Pathological fracture, unsp toe(s), subs for fx w nonunion"
          },
          {
            "contentTitle": "Herpestes javanicus",
            "video": "http://dummyimage.com/176x188.png/dddddd/000000",
            "duration": 3,
            "description": "Unsp traum displ spondylolysis of sixth cervcal vert, 7thG"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/198x118.png/ff4444/ffffff",
            "duration": 2,
            "description": "Nondisp bicondylar fx unsp tibia, 7thP"
          }
        ]
      },
      {
        "header": "Pharmacist",
        "totalMinutes": 50364,
        "contents": [
          {
            "contentTitle": "Hippopotamus amphibius",
            "video": "http://dummyimage.com/204x178.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Disseminated herpesviral disease"
          },
          {
            "contentTitle": "Buteo regalis",
            "video": "http://dummyimage.com/183x180.png/dddddd/000000",
            "duration": 3,
            "description": "Blister (nonthermal) of toe"
          },
          {
            "contentTitle": "Nucifraga columbiana",
            "video": "http://dummyimage.com/103x193.png/cc0000/ffffff",
            "duration": 1,
            "description": "Age-rel osteopor w crnt path fx, r ank/ft, 7thD"
          },
          {
            "contentTitle": "Uraeginthus bengalus",
            "video": "http://dummyimage.com/192x204.png/dddddd/000000",
            "duration": 3,
            "description": "Unspecified open wound of right upper arm"
          },
          {
            "contentTitle": "Capra ibex",
            "video": "http://dummyimage.com/192x195.png/dddddd/000000",
            "duration": 9,
            "description": "Sprain of anterior cruciate ligament of right knee"
          },
          {
            "contentTitle": "Pavo cristatus",
            "video": "http://dummyimage.com/129x247.png/dddddd/000000",
            "duration": 7,
            "description": "Contusion of ovary, unspecified, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/200x219.png/dddddd/000000",
            "duration": 8,
            "description": "Milt op w thermal radn effect of nuclear weapon, milt, subs"
          },
          {
            "contentTitle": "Vanellus armatus",
            "video": "http://dummyimage.com/211x247.png/dddddd/000000",
            "duration": 10,
            "description": "Oth tear of lat mensc, current injury, right knee, subs"
          },
          {
            "contentTitle": "Sus scrofa",
            "video": "http://dummyimage.com/146x164.png/ff4444/ffffff",
            "duration": 2,
            "description": "Corrosion of second degree of head, face, and neck"
          }
        ]
      },
      {
        "header": "Graphic Designer",
        "totalMinutes": 21455,
        "contents": [
          {
            "contentTitle": "Morelia spilotes variegata",
            "video": "http://dummyimage.com/208x163.png/dddddd/000000",
            "duration": 6,
            "description": "Keratoconjunct sicca, not specified as Sjogren's, left eye"
          },
          {
            "contentTitle": "Potorous tridactylus",
            "video": "http://dummyimage.com/201x114.png/cc0000/ffffff",
            "duration": 3,
            "description": "Unsp mtrcy rider inj in clsn w rail trn/veh nontraf, sequela"
          },
          {
            "contentTitle": "Semnopithecus entellus",
            "video": "http://dummyimage.com/216x181.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Poisoning by aspirin, undetermined, subsequent encounter"
          },
          {
            "contentTitle": "Eremophila alpestris",
            "video": "http://dummyimage.com/171x195.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Displ midcervical fx r femr, 7thE"
          },
          {
            "contentTitle": "Megaderma spasma",
            "video": "http://dummyimage.com/220x113.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Laceration of musc/fasc/tend prt biceps, left arm"
          },
          {
            "contentTitle": "Melanerpes erythrocephalus",
            "video": "http://dummyimage.com/164x135.png/cc0000/ffffff",
            "duration": 7,
            "description": "Fall due to bumping against object"
          },
          {
            "contentTitle": "Numida meleagris",
            "video": "http://dummyimage.com/165x120.png/ff4444/ffffff",
            "duration": 10,
            "description": "Acute delta-(super) infection of hepatitis B carrier"
          },
          {
            "contentTitle": "Crotalus cerastes",
            "video": "http://dummyimage.com/170x129.png/dddddd/000000",
            "duration": 2,
            "description": "Other superficial bite of hand of right hand"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/188x150.png/ff4444/ffffff",
            "duration": 10,
            "description": "Disp fx of nk of unsp rad, 7thF"
          },
          {
            "contentTitle": "Pytilia melba",
            "video": "http://dummyimage.com/232x124.png/dddddd/000000",
            "duration": 5,
            "description": "Sltr-haris Type II physl fx upr end rad, l arm, 7thK"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/107x104.png/dddddd/000000",
            "duration": 8,
            "description": "Other disorders of intestinal carbohydrate absorption"
          },
          {
            "contentTitle": "Oreotragus oreotragus",
            "video": "http://dummyimage.com/152x234.png/cc0000/ffffff",
            "duration": 2,
            "description": "Tox eff of fluorine gas and hydrogen fluoride, slf-hrm, sqla"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/134x168.png/ff4444/ffffff",
            "duration": 7,
            "description": "Eyelid retraction right eye, unspecified eyelid"
          },
          {
            "contentTitle": "Geochelone radiata",
            "video": "http://dummyimage.com/190x138.png/cc0000/ffffff",
            "duration": 2,
            "description": "Other physeal fracture of right calcaneus, init"
          },
          {
            "contentTitle": "Pavo cristatus",
            "video": "http://dummyimage.com/233x170.png/ff4444/ffffff",
            "duration": 2,
            "description": "Struck by nonvenomous snake"
          },
          {
            "contentTitle": "Macropus parryi",
            "video": "http://dummyimage.com/200x244.png/cc0000/ffffff",
            "duration": 9,
            "description": "Disp fx of posterior column of unspecified acetabulum"
          }
        ]
      },
      {
        "header": "Quality Control Specialist",
        "totalMinutes": 4442,
        "contents": [
          {
            "contentTitle": "Numida meleagris",
            "video": "http://dummyimage.com/217x194.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Corrosion of second degree of lower back, sequela"
          },
          {
            "contentTitle": "Martes americana",
            "video": "http://dummyimage.com/135x124.png/ff4444/ffffff",
            "duration": 4,
            "description": "Idiopathic gout, unspecified shoulder"
          },
          {
            "contentTitle": "Leptoptilus dubius",
            "video": "http://dummyimage.com/234x199.png/ff4444/ffffff",
            "duration": 2,
            "description": "Cystic meniscus, unsp lateral meniscus, unspecified knee"
          },
          {
            "contentTitle": "Mustela nigripes",
            "video": "http://dummyimage.com/228x104.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Burn of third degree of left ankle, sequela"
          },
          {
            "contentTitle": "Pelecans onocratalus",
            "video": "http://dummyimage.com/223x127.png/cc0000/ffffff",
            "duration": 1,
            "description": "Whipple's disease"
          },
          {
            "contentTitle": "Cercopithecus aethiops",
            "video": "http://dummyimage.com/235x155.png/ff4444/ffffff",
            "duration": 4,
            "description": "Subluxation of tarsometatarsal joint of unsp foot, sequela"
          },
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/155x154.png/dddddd/000000",
            "duration": 5,
            "description": "Maxillary fracture, unspecified side, init"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/105x185.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Poisoning by local astringents/detergents, assault, init"
          },
          {
            "contentTitle": "Anser anser",
            "video": "http://dummyimage.com/204x156.png/ff4444/ffffff",
            "duration": 3,
            "description": "Staphylococcal arthritis, right hand"
          },
          {
            "contentTitle": "Spizaetus coronatus",
            "video": "http://dummyimage.com/170x124.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Other specified complications of labor and delivery"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/238x164.png/ff4444/ffffff",
            "duration": 1,
            "description": "Other placental disorders, third trimester"
          },
          {
            "contentTitle": "Papilio canadensis",
            "video": "http://dummyimage.com/170x129.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Osteolysis, right lower leg"
          },
          {
            "contentTitle": "Psittacula krameri",
            "video": "http://dummyimage.com/209x192.png/cc0000/ffffff",
            "duration": 2,
            "description": "Paralytic calcification and ossification of muscle, hand"
          },
          {
            "contentTitle": "Macaca mulatta",
            "video": "http://dummyimage.com/209x131.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Laceration with foreign body of unspecified part of thorax"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/207x183.png/ff4444/ffffff",
            "duration": 6,
            "description": "Papyraceous fetus, unspecified trimester"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/151x104.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Poisoning by coronary vasodilators, assault, subs encntr"
          },
          {
            "contentTitle": "Carduelis pinus",
            "video": "http://dummyimage.com/184x229.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Other acute nonsuppurative otitis media, right ear"
          },
          {
            "contentTitle": "Vulpes chama",
            "video": "http://dummyimage.com/120x178.png/dddddd/000000",
            "duration": 6,
            "description": "Wedge comprsn fx fourth lum vert, subs for fx w routn heal"
          }
        ]
      },
      {
        "header": "Engineer III",
        "totalMinutes": 48589,
        "contents": [
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/156x130.png/ff4444/ffffff",
            "duration": 10,
            "description": "Other specified osteochondropathies, unspecified hand"
          },
          {
            "contentTitle": "Martes pennanti",
            "video": "http://dummyimage.com/239x173.png/cc0000/ffffff",
            "duration": 3,
            "description": "Nontraumatic ischemic infarction of muscle, unsp forearm"
          },
          {
            "contentTitle": "Hydrochoerus hydrochaeris",
            "video": "http://dummyimage.com/198x209.png/ff4444/ffffff",
            "duration": 7,
            "description": "War op involving dest arcrft due to enmy fire/expls, milt"
          },
          {
            "contentTitle": "Eutamias minimus",
            "video": "http://dummyimage.com/221x118.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Accidental discharge of other larger firearm, subs encntr"
          },
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/173x129.png/dddddd/000000",
            "duration": 5,
            "description": "Acute cholecystitis with chronic cholecystitis"
          },
          {
            "contentTitle": "Lophoaetus occipitalis",
            "video": "http://dummyimage.com/227x162.png/ff4444/ffffff",
            "duration": 9,
            "description": "Terorsm w explosn of marine weapons, civilian injured, subs"
          },
          {
            "contentTitle": "Macaca fuscata",
            "video": "http://dummyimage.com/105x229.png/cc0000/ffffff",
            "duration": 4,
            "description": "Chronic ischemic heart disease, unspecified"
          },
          {
            "contentTitle": "Diomedea irrorata",
            "video": "http://dummyimage.com/145x192.png/cc0000/ffffff",
            "duration": 10,
            "description": "Drug/chem diab w prolif diab rtnop w trctn dtch macula,l eye"
          },
          {
            "contentTitle": "Bos taurus",
            "video": "http://dummyimage.com/186x142.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Nondisp fx of body of hamate bone, r wrs, 7thG"
          }
        ]
      },
      {
        "header": "Executive Secretary",
        "totalMinutes": 90402,
        "contents": [
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/116x181.png/dddddd/000000",
            "duration": 6,
            "description": "Embolism and thrombosis of arteries of the lower extremities"
          },
          {
            "contentTitle": "Sitta canadensis",
            "video": "http://dummyimage.com/142x190.png/ff4444/ffffff",
            "duration": 6,
            "description": "Collapsed vert, NEC, cerv region, subs for fx w delay heal"
          },
          {
            "contentTitle": "Odocoileus hemionus",
            "video": "http://dummyimage.com/170x229.png/ff4444/ffffff",
            "duration": 1,
            "description": "Corrosion of second degree of unspecified ear, subs encntr"
          },
          {
            "contentTitle": "Theropithecus gelada",
            "video": "http://dummyimage.com/105x223.png/cc0000/ffffff",
            "duration": 7,
            "description": "Legal intervnt w unsp blunt obj, law enforc offl inj, init"
          },
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/183x122.png/ff4444/ffffff",
            "duration": 6,
            "description": "Unsp fx the low end l rad, 7thE"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/118x241.png/dddddd/000000",
            "duration": 9,
            "description": "Poisoning by unsp narcotics, undetermined, subs encntr"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/171x166.png/cc0000/ffffff",
            "duration": 9,
            "description": "Inj superficial vein at shldr/up arm, left arm, sequela"
          },
          {
            "contentTitle": "Macaca radiata",
            "video": "http://dummyimage.com/209x106.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Ped w convey injured pick-up truck, pk-up/van nontraf, subs"
          }
        ]
      },
      {
        "header": "Environmental Tech",
        "totalMinutes": 88126,
        "contents": [
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/115x142.png/cc0000/ffffff",
            "duration": 6,
            "description": "Unspecified physeal fracture of phalanx of left toe, 7thK"
          },
          {
            "contentTitle": "Plegadis ridgwayi",
            "video": "http://dummyimage.com/111x166.png/ff4444/ffffff",
            "duration": 8,
            "description": "Disp fx of first metatarsal bone, unspecified foot, sequela"
          },
          {
            "contentTitle": "Tamiasciurus hudsonicus",
            "video": "http://dummyimage.com/194x148.png/dddddd/000000",
            "duration": 3,
            "description": "Nondisp Maisonneuve's fx r leg, init for opn fx type 3A/B/C"
          },
          {
            "contentTitle": "Iguana iguana",
            "video": "http://dummyimage.com/103x201.png/cc0000/ffffff",
            "duration": 6,
            "description": "Laceration of musc/fasc/tend at forarm lv, right arm, init"
          },
          {
            "contentTitle": "Lamprotornis chalybaeus",
            "video": "http://dummyimage.com/123x202.png/cc0000/ffffff",
            "duration": 2,
            "description": "Disp fx of neck of right radius, init for clos fx"
          },
          {
            "contentTitle": "Vulpes vulpes",
            "video": "http://dummyimage.com/239x122.png/dddddd/000000",
            "duration": 9,
            "description": "Carcinoma in situ of prostate"
          },
          {
            "contentTitle": "Ictalurus furcatus",
            "video": "http://dummyimage.com/185x100.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Hypercalcemia"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/157x126.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Family history of malignant neoplasm of breast"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/234x176.png/cc0000/ffffff",
            "duration": 10,
            "description": "Other complications of heart transplant"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/155x109.png/cc0000/ffffff",
            "duration": 4,
            "description": "Type 1 diabetes mellitus with ketoacidosis with coma"
          },
          {
            "contentTitle": "Hydrochoerus hydrochaeris",
            "video": "http://dummyimage.com/229x147.png/ff4444/ffffff",
            "duration": 7,
            "description": "Other specified protozoal intestinal diseases"
          },
          {
            "contentTitle": "Dacelo novaeguineae",
            "video": "http://dummyimage.com/162x194.png/dddddd/000000",
            "duration": 8,
            "description": "Conjunctivochalasis, bilateral"
          }
        ]
      },
      {
        "header": "General Manager",
        "totalMinutes": 83542,
        "contents": [
          {
            "contentTitle": "Cracticus nigroagularis",
            "video": "http://dummyimage.com/137x245.png/dddddd/000000",
            "duration": 6,
            "description": "Traum hemor right cerebrum w LOC of 6-24 hrs, init"
          },
          {
            "contentTitle": "Milvus migrans",
            "video": "http://dummyimage.com/245x171.png/cc0000/ffffff",
            "duration": 3,
            "description": "Nondisp fx of body of unsp talus, subs for fx w malunion"
          },
          {
            "contentTitle": "Nannopterum harrisi",
            "video": "http://dummyimage.com/145x175.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Type 1 diab with mild nonp rtnop without macular edema, bi"
          },
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/198x206.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Oth fracture of third metacarpal bone, right hand, init"
          },
          {
            "contentTitle": "Tamiasciurus hudsonicus",
            "video": "http://dummyimage.com/112x223.png/cc0000/ffffff",
            "duration": 4,
            "description": "Complete traumatic amputation of unsp midfoot, sequela"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/240x129.png/cc0000/ffffff",
            "duration": 4,
            "description": "Matern care for oth or susp poor fetl grth, third tri, fts5"
          },
          {
            "contentTitle": "Fulica cristata",
            "video": "http://dummyimage.com/203x194.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Antepart hemorrhage w dissem intravasc coag, first trimester"
          },
          {
            "contentTitle": "Gopherus agassizii",
            "video": "http://dummyimage.com/210x140.png/dddddd/000000",
            "duration": 6,
            "description": "Oth intraoperative complications of eye and adnexa, NEC"
          },
          {
            "contentTitle": "Sula nebouxii",
            "video": "http://dummyimage.com/231x217.png/ff4444/ffffff",
            "duration": 9,
            "description": "Other congenital viral diseases"
          }
        ]
      },
      {
        "header": "Senior Cost Accountant",
        "totalMinutes": 79790,
        "contents": [
          {
            "contentTitle": "Ovis ammon",
            "video": "http://dummyimage.com/123x224.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Burn of unspecified degree of right axilla, sequela"
          },
          {
            "contentTitle": "Paradoxurus hermaphroditus",
            "video": "http://dummyimage.com/212x169.png/dddddd/000000",
            "duration": 4,
            "description": "Adverse effect of tricyclic antidepressants, subs encntr"
          },
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/136x154.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Burn and corrosion of trunk"
          },
          {
            "contentTitle": "Connochaetus taurinus",
            "video": "http://dummyimage.com/191x239.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Other specified nutritional anemias"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/148x206.png/dddddd/000000",
            "duration": 5,
            "description": "Unsp intracranial injury without loss of consciousness"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/190x242.png/cc0000/ffffff",
            "duration": 2,
            "description": "Nondisp commnt fx shaft of ulna, r arm, 7thH"
          },
          {
            "contentTitle": "Alligator mississippiensis",
            "video": "http://dummyimage.com/166x225.png/dddddd/000000",
            "duration": 2,
            "description": "Anaplastic large cell lymphoma, ALK-pos, intra-abd nodes"
          },
          {
            "contentTitle": "Echimys chrysurus",
            "video": "http://dummyimage.com/142x116.png/cc0000/ffffff",
            "duration": 2,
            "description": "Unsp infct of urinary tract in pregnancy, first trimester"
          },
          {
            "contentTitle": "Pseudocheirus peregrinus",
            "video": "http://dummyimage.com/106x175.png/ff4444/ffffff",
            "duration": 4,
            "description": "Oth fx of lower end left rad, subs for clos fx w routn heal"
          },
          {
            "contentTitle": "Capreolus capreolus",
            "video": "http://dummyimage.com/191x199.png/dddddd/000000",
            "duration": 4,
            "description": "Sltr-haris Type II physl fx upr end humer, unsp arm, 7thG"
          },
          {
            "contentTitle": "Spilogale gracilis",
            "video": "http://dummyimage.com/200x136.png/ff4444/ffffff",
            "duration": 4,
            "description": "Corrosion of unspecified degree of female genital region"
          },
          {
            "contentTitle": "Alligator mississippiensis",
            "video": "http://dummyimage.com/156x233.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Localized anterior staphyloma"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/187x244.png/dddddd/000000",
            "duration": 9,
            "description": "Legal intervention involving oth gas, suspect injured, subs"
          },
          {
            "contentTitle": "Martes pennanti",
            "video": "http://dummyimage.com/168x184.png/ff4444/ffffff",
            "duration": 1,
            "description": "Milt op involving explosion of marine weapons, milt, subs"
          },
          {
            "contentTitle": "Cygnus buccinator",
            "video": "http://dummyimage.com/156x194.png/dddddd/000000",
            "duration": 7,
            "description": "Person injured wh brd/alit from dune buggy, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/159x183.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Incarcerated fx of med epicondyl of l humer, init for opn fx"
          },
          {
            "contentTitle": "Bugeranus caruncalatus",
            "video": "http://dummyimage.com/124x193.png/ff4444/ffffff",
            "duration": 8,
            "description": "Disp fx of greater trochanter of r femr, 7thH"
          },
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/181x184.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Intentional collision of motor vehicle w train, init encntr"
          },
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/242x155.png/dddddd/000000",
            "duration": 5,
            "description": "Inj oth blood vessels at shldr/up arm, unsp arm"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/116x218.png/cc0000/ffffff",
            "duration": 6,
            "description": "Poisn by antimalari/drugs acting on bld protzoa, acc, sqla"
          }
        ]
      },
      {
        "header": "Marketing Assistant",
        "totalMinutes": 37394,
        "contents": [
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/147x191.png/ff4444/ffffff",
            "duration": 7,
            "description": "Fatigue fracture of vertebra, cervicothoracic region, init"
          },
          {
            "contentTitle": "Ourebia ourebi",
            "video": "http://dummyimage.com/128x216.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Unsp injury of femor vein at hip and thigh level, right leg"
          },
          {
            "contentTitle": "Falco peregrinus",
            "video": "http://dummyimage.com/237x225.png/dddddd/000000",
            "duration": 4,
            "description": "Burn of unspecified degree of unspecified upper arm, sequela"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/244x223.png/dddddd/000000",
            "duration": 4,
            "description": "Poisoning by barbiturates, assault, subsequent encounter"
          },
          {
            "contentTitle": "Corythornis cristata",
            "video": "http://dummyimage.com/151x102.png/ff4444/ffffff",
            "duration": 1,
            "description": "Displ osteochon fx unsp patella, 7thE"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/204x144.png/dddddd/000000",
            "duration": 10,
            "description": "Nondisp fx of lateral malleolus of l fibula, 7thH"
          },
          {
            "contentTitle": "Plegadis falcinellus",
            "video": "http://dummyimage.com/128x153.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Fracture of condylar process of right mandible, sequela"
          },
          {
            "contentTitle": "Upupa epops",
            "video": "http://dummyimage.com/177x158.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Sepsis due to Streptococcus pneumoniae"
          },
          {
            "contentTitle": "Aonyx cinerea",
            "video": "http://dummyimage.com/226x162.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Unspecified sprain of right hip"
          }
        ]
      },
      {
        "header": "Media Manager IV",
        "totalMinutes": 94668,
        "contents": [
          {
            "contentTitle": "Mycteria leucocephala",
            "video": "http://dummyimage.com/207x174.png/dddddd/000000",
            "duration": 1,
            "description": "Obstructed labor due to shoulder presentation, unsp"
          },
          {
            "contentTitle": "Boa caninus",
            "video": "http://dummyimage.com/206x215.png/ff4444/ffffff",
            "duration": 8,
            "description": "Underdosing of local antifung/infect/inflamm drugs, subs"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/205x104.png/dddddd/000000",
            "duration": 9,
            "description": "Fb in oth and multiple parts of extrn eye, unsp eye, sequela"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/227x172.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Nondisp longitud fx unsp patella, 7thQ"
          },
          {
            "contentTitle": "Limnocorax flavirostra",
            "video": "http://dummyimage.com/159x134.png/dddddd/000000",
            "duration": 4,
            "description": "Nondisp longitud fx r patella, subs for clos fx w routn heal"
          },
          {
            "contentTitle": "Certotrichas paena",
            "video": "http://dummyimage.com/127x105.png/cc0000/ffffff",
            "duration": 10,
            "description": "Corrosion of second degree of left ankle"
          },
          {
            "contentTitle": "Carduelis pinus",
            "video": "http://dummyimage.com/108x140.png/ff4444/ffffff",
            "duration": 3,
            "description": "Other sprain of left shoulder joint, sequela"
          },
          {
            "contentTitle": "Lasiodora parahybana",
            "video": "http://dummyimage.com/133x122.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Unspecified fracture of lower end of left femur"
          },
          {
            "contentTitle": "Psittacula krameri",
            "video": "http://dummyimage.com/196x240.png/dddddd/000000",
            "duration": 6,
            "description": "Other vasculitis limited to the skin"
          },
          {
            "contentTitle": "Plegadis ridgwayi",
            "video": "http://dummyimage.com/112x172.png/cc0000/ffffff",
            "duration": 5,
            "description": "Unspecified superficial injury of oral cavity, init encntr"
          },
          {
            "contentTitle": "Myrmecophaga tridactyla",
            "video": "http://dummyimage.com/153x161.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Nonopioid analges/antipyret, not elsewhere classified"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/204x169.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Trichiasis without entropian"
          },
          {
            "contentTitle": "Gyps fulvus",
            "video": "http://dummyimage.com/210x250.png/cc0000/ffffff",
            "duration": 3,
            "description": "Poisoning by unsp general anesthetics, undetermined, sequela"
          },
          {
            "contentTitle": "Bubo virginianus",
            "video": "http://dummyimage.com/130x168.png/dddddd/000000",
            "duration": 4,
            "description": "Nondisp commnt fx shaft of unsp femr, 7thD"
          },
          {
            "contentTitle": "Bucorvus leadbeateri",
            "video": "http://dummyimage.com/156x222.png/ff4444/ffffff",
            "duration": 1,
            "description": "Nondisp fx of glenoid cav of scapula, l shldr, 7thG"
          },
          {
            "contentTitle": "Tamiasciurus hudsonicus",
            "video": "http://dummyimage.com/211x158.png/cc0000/ffffff",
            "duration": 7,
            "description": "Displaced avulsion fx left ilium, subs for fx w nonunion"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/155x118.png/cc0000/ffffff",
            "duration": 7,
            "description": "Acq stenosis of ext ear canal sec to inflam and infct, bi"
          }
        ]
      },
      {
        "header": "Analog Circuit Design manager",
        "totalMinutes": 14883,
        "contents": [
          {
            "contentTitle": "Otaria flavescens",
            "video": "http://dummyimage.com/212x226.png/ff4444/ffffff",
            "duration": 4,
            "description": "Toxic effect of mercury and its compounds, self-harm, init"
          },
          {
            "contentTitle": "Mazama americana",
            "video": "http://dummyimage.com/230x200.png/dddddd/000000",
            "duration": 3,
            "description": "Poisn by electrolytic/caloric/wtr-bal agnt, assault, subs"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/115x227.png/dddddd/000000",
            "duration": 2,
            "description": "Traum subrac hem w LOC w death d/t brain inj bf consc, sqla"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/123x246.png/cc0000/ffffff",
            "duration": 10,
            "description": "Other specified crystal arthropathies, unspecified hip"
          },
          {
            "contentTitle": "Sciurus niger",
            "video": "http://dummyimage.com/191x243.png/ff4444/ffffff",
            "duration": 6,
            "description": "Paralytic ileus and intestinal obstruction without hernia"
          },
          {
            "contentTitle": "Didelphis virginiana",
            "video": "http://dummyimage.com/158x181.png/cc0000/ffffff",
            "duration": 5,
            "description": "Hepatomegaly, not elsewhere classified"
          },
          {
            "contentTitle": "Trachyphonus vaillantii",
            "video": "http://dummyimage.com/185x195.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Hypertrichosis of left upper eyelid"
          },
          {
            "contentTitle": "Varanus albigularis",
            "video": "http://dummyimage.com/151x151.png/cc0000/ffffff",
            "duration": 6,
            "description": "Blister (nonthermal) of unspecified ear, subs encntr"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/184x188.png/cc0000/ffffff",
            "duration": 7,
            "description": "Postproc seroma of an endo sys org following other procedure"
          }
        ]
      }
    ]
  },
  {
    "title": "Beautiful Joe",
    "subject": "Training",
    "instructorName": "Rodin Salem",
    "price": 482.7,
    "level": "Intermediate",
    "courseHours": 134,
    "summary": "Strain flexor musc/fasc/tend r rng fngr at forarm lv, init",
    "subtitles": [
      {
        "header": "Nurse Practicioner",
        "totalMinutes": 93598,
        "contents": [
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/171x243.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Puncture wound with foreign body, unspecified lower leg"
          },
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/236x248.png/cc0000/ffffff",
            "duration": 4,
            "description": "Neoplasm of uncertain behavior of skin"
          },
          {
            "contentTitle": "Anthropoides paradisea",
            "video": "http://dummyimage.com/140x206.png/cc0000/ffffff",
            "duration": 4,
            "description": "Intentional self-harm by explosive material, init encntr"
          },
          {
            "contentTitle": "Petaurus norfolcensis",
            "video": "http://dummyimage.com/164x237.png/dddddd/000000",
            "duration": 5,
            "description": "Unspecified injury of popliteal vein"
          },
          {
            "contentTitle": "Geochelone elephantopus",
            "video": "http://dummyimage.com/108x112.png/dddddd/000000",
            "duration": 7,
            "description": "Lymphocyte depleted Hodgkin lymphoma, unspecified site"
          },
          {
            "contentTitle": "Vulpes chama",
            "video": "http://dummyimage.com/201x207.png/cc0000/ffffff",
            "duration": 2,
            "description": "Toxic effect of taipan venom, accidental, init"
          }
        ]
      },
      {
        "header": "Geological Engineer",
        "totalMinutes": 44503,
        "contents": [
          {
            "contentTitle": "Gazella thompsonii",
            "video": "http://dummyimage.com/138x171.png/ff4444/ffffff",
            "duration": 3,
            "description": "Encounter for prophylactic surgery"
          },
          {
            "contentTitle": "Suricata suricatta",
            "video": "http://dummyimage.com/157x210.png/dddddd/000000",
            "duration": 5,
            "description": "Burn of first degree of unspecified wrist, initial encounter"
          },
          {
            "contentTitle": "Phaethon aethereus",
            "video": "http://dummyimage.com/109x250.png/cc0000/ffffff",
            "duration": 3,
            "description": "Sltr-haris Type I physl fx upr end r femr, 7thG"
          },
          {
            "contentTitle": "Panthera onca",
            "video": "http://dummyimage.com/127x223.png/dddddd/000000",
            "duration": 4,
            "description": "Corrosion of second degree of right axilla, init encntr"
          },
          {
            "contentTitle": "Uraeginthus angolensis",
            "video": "http://dummyimage.com/182x130.png/ff4444/ffffff",
            "duration": 3,
            "description": "Crushed by alligator, sequela"
          },
          {
            "contentTitle": "Epicrates cenchria maurus",
            "video": "http://dummyimage.com/153x148.png/dddddd/000000",
            "duration": 1,
            "description": "War op involving combat using blunt/pierc object, civilian"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/101x214.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Struck by baseball"
          },
          {
            "contentTitle": "Phascogale calura",
            "video": "http://dummyimage.com/133x214.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Localized vascularization of cornea"
          },
          {
            "contentTitle": "Pelecanus conspicillatus",
            "video": "http://dummyimage.com/214x167.png/ff4444/ffffff",
            "duration": 10,
            "description": "Injury of radial nerve at upper arm level, left arm"
          },
          {
            "contentTitle": "Tragelaphus strepsiceros",
            "video": "http://dummyimage.com/202x116.png/dddddd/000000",
            "duration": 9,
            "description": "Unspecified superficial injury of thumb"
          },
          {
            "contentTitle": "Nyctea scandiaca",
            "video": "http://dummyimage.com/227x176.png/dddddd/000000",
            "duration": 6,
            "description": "Nondisp fx of med phalanx of l mid fngr, 7thD"
          },
          {
            "contentTitle": "Spilogale gracilis",
            "video": "http://dummyimage.com/240x189.png/cc0000/ffffff",
            "duration": 3,
            "description": "Displ commnt fx shaft of l tibia, 7thH"
          },
          {
            "contentTitle": "Lepilemur rufescens",
            "video": "http://dummyimage.com/209x178.png/cc0000/ffffff",
            "duration": 7,
            "description": "Infect/inflm reaction due to int fix of left ulna, subs"
          },
          {
            "contentTitle": "Phoenicopterus chilensis",
            "video": "http://dummyimage.com/182x249.png/ff4444/ffffff",
            "duration": 2,
            "description": "Strain of muscle, fascia and tendon of other parts of biceps"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/238x205.png/ff4444/ffffff",
            "duration": 9,
            "description": "Nondisp fx of lateral condyle of right humerus, init"
          },
          {
            "contentTitle": "Hystrix indica",
            "video": "http://dummyimage.com/152x230.png/cc0000/ffffff",
            "duration": 8,
            "description": "Unsp fracture of navicular bone of unsp wrist, sequela"
          },
          {
            "contentTitle": "Gekko gecko",
            "video": "http://dummyimage.com/175x221.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Incomplete atypical femoral fracture, unspecified leg, init"
          },
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/144x190.png/ff4444/ffffff",
            "duration": 6,
            "description": "Occup of bus injured in clsn w nonmtr vehicle in traf, init"
          },
          {
            "contentTitle": "Lasiodora parahybana",
            "video": "http://dummyimage.com/116x237.png/ff4444/ffffff",
            "duration": 6,
            "description": "Nondisp avulsion fx left ilium, subs for fx w delay heal"
          }
        ]
      },
      {
        "header": "Financial Analyst",
        "totalMinutes": 47104,
        "contents": [
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/247x193.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Open wound of vagina and vulva"
          },
          {
            "contentTitle": "Acanthaster planci",
            "video": "http://dummyimage.com/224x197.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other fracture of shaft of left humerus, sequela"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/164x231.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "ABO incompatibility w acute hemolytic transfs react, init"
          },
          {
            "contentTitle": "Anhinga rufa",
            "video": "http://dummyimage.com/170x183.png/dddddd/000000",
            "duration": 4,
            "description": "Fall from heelies, initial encounter"
          }
        ]
      },
      {
        "header": "VP Product Management",
        "totalMinutes": 18448,
        "contents": [
          {
            "contentTitle": "Helogale undulata",
            "video": "http://dummyimage.com/126x188.png/dddddd/000000",
            "duration": 8,
            "description": "Unspecified injury of ascending colon, initial encounter"
          },
          {
            "contentTitle": "Erethizon dorsatum",
            "video": "http://dummyimage.com/147x118.png/ff4444/ffffff",
            "duration": 1,
            "description": "Dysphagia, oral phase"
          },
          {
            "contentTitle": "Streptopelia senegalensis",
            "video": "http://dummyimage.com/185x202.png/dddddd/000000",
            "duration": 4,
            "description": "Personal history of congenital malform of dgstv sys"
          },
          {
            "contentTitle": "Ciconia episcopus",
            "video": "http://dummyimage.com/172x238.png/ff4444/ffffff",
            "duration": 5,
            "description": "Malignant neoplasm of other specified male genital organs"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/235x238.png/cc0000/ffffff",
            "duration": 4,
            "description": "Partial traumatic amputation of one right lesser toe"
          },
          {
            "contentTitle": "Spizaetus coronatus",
            "video": "http://dummyimage.com/218x143.png/ff4444/ffffff",
            "duration": 4,
            "description": "Inj great saphenous at hip and thigh level, unsp leg, subs"
          },
          {
            "contentTitle": "Leptoptilos crumeniferus",
            "video": "http://dummyimage.com/167x197.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Toxic effect of cntct w Portugese Man-o-war, slf-hrm, sqla"
          },
          {
            "contentTitle": "Himantopus himantopus",
            "video": "http://dummyimage.com/242x188.png/ff4444/ffffff",
            "duration": 9,
            "description": "Plantar wart"
          },
          {
            "contentTitle": "Tursiops truncatus",
            "video": "http://dummyimage.com/202x128.png/ff4444/ffffff",
            "duration": 6,
            "description": "Unsp physl fx low end rad, right arm, subs for fx w nonunion"
          },
          {
            "contentTitle": "Anas bahamensis",
            "video": "http://dummyimage.com/236x109.png/cc0000/ffffff",
            "duration": 7,
            "description": "Poisoning by expectorants, intentional self-harm, subs"
          },
          {
            "contentTitle": "Cercopithecus aethiops",
            "video": "http://dummyimage.com/235x126.png/ff4444/ffffff",
            "duration": 9,
            "description": "Malignant neoplasm of stomach"
          },
          {
            "contentTitle": "Callorhinus ursinus",
            "video": "http://dummyimage.com/228x114.png/cc0000/ffffff",
            "duration": 8,
            "description": "Strain of muscle, fascia and tendon at neck level, init"
          },
          {
            "contentTitle": "Uraeginthus angolensis",
            "video": "http://dummyimage.com/241x165.png/dddddd/000000",
            "duration": 10,
            "description": "Discontinuity and dislocation of left ear ossicles"
          },
          {
            "contentTitle": "Trichoglossus chlorolepidotus",
            "video": "http://dummyimage.com/208x130.png/dddddd/000000",
            "duration": 9,
            "description": "Toxic effect of thallium, undetermined, subsequent encounter"
          }
        ]
      },
      {
        "header": "Health Coach III",
        "totalMinutes": 42276,
        "contents": [
          {
            "contentTitle": "Procyon cancrivorus",
            "video": "http://dummyimage.com/147x139.png/dddddd/000000",
            "duration": 9,
            "description": "Toxic effect of venom of wasps, accidental, init"
          },
          {
            "contentTitle": "Oxybelis sp.",
            "video": "http://dummyimage.com/215x245.png/dddddd/000000",
            "duration": 1,
            "description": "Traum rupture of ligmt of r idx fngr at MCP/IP jt, sequela"
          },
          {
            "contentTitle": "Oreamnos americanus",
            "video": "http://dummyimage.com/216x121.png/dddddd/000000",
            "duration": 8,
            "description": "Unsp inj extn/abdr musc/fasc/tend of l thm at forarm lv"
          },
          {
            "contentTitle": "Corythornis cristata",
            "video": "http://dummyimage.com/107x109.png/ff4444/ffffff",
            "duration": 6,
            "description": "Traumatic rupture of ligament of r rng fngr at MCP/IP jt"
          },
          {
            "contentTitle": "Spermophilus richardsonii",
            "video": "http://dummyimage.com/132x218.png/ff4444/ffffff",
            "duration": 7,
            "description": "Abnormal level of hormones in cerebrospinal fluid"
          },
          {
            "contentTitle": "Tockus erythrorhyncus",
            "video": "http://dummyimage.com/228x199.png/dddddd/000000",
            "duration": 9,
            "description": "Nondisp spiral fx shaft of l fibula, 7thM"
          },
          {
            "contentTitle": "Buteo galapagoensis",
            "video": "http://dummyimage.com/199x183.png/ff4444/ffffff",
            "duration": 5,
            "description": "Nondisp seg fx shaft of unsp fibula, 7thM"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/242x196.png/cc0000/ffffff",
            "duration": 5,
            "description": "Drown while in bathtub, undetermined intent, init"
          },
          {
            "contentTitle": "Canis mesomelas",
            "video": "http://dummyimage.com/149x229.png/ff4444/ffffff",
            "duration": 7,
            "description": "Path fx in oth disease, l ankle, subs for fx w routn heal"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/180x168.png/ff4444/ffffff",
            "duration": 9,
            "description": "Corrosion of first degree of scalp [any part]"
          },
          {
            "contentTitle": "Erinaceus frontalis",
            "video": "http://dummyimage.com/158x241.png/dddddd/000000",
            "duration": 9,
            "description": "Iridoschisis, bilateral"
          },
          {
            "contentTitle": "Buteo regalis",
            "video": "http://dummyimage.com/221x102.png/ff4444/ffffff",
            "duration": 8,
            "description": "Patulous Eustachian tube, unspecified ear"
          },
          {
            "contentTitle": "Ateles paniscus",
            "video": "http://dummyimage.com/180x201.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Unspecified superficial injury of right foot, sequela"
          },
          {
            "contentTitle": "Macropus rufogriseus",
            "video": "http://dummyimage.com/180x198.png/dddddd/000000",
            "duration": 10,
            "description": "Glaucoma secondary to oth eye disord, unsp eye, stage unsp"
          },
          {
            "contentTitle": "Canis lupus",
            "video": "http://dummyimage.com/134x137.png/cc0000/ffffff",
            "duration": 10,
            "description": "Solitary bone cyst, unspecified tibia and fibula"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/198x123.png/cc0000/ffffff",
            "duration": 3,
            "description": "Contusion of left ring finger with damage to nail, sequela"
          },
          {
            "contentTitle": "Pelecanus occidentalis",
            "video": "http://dummyimage.com/196x217.png/ff4444/ffffff",
            "duration": 3,
            "description": "Paralytic calcifcn and ossification of muscle, unsp ank/ft"
          }
        ]
      }
    ]
  },
  {
    "title": "(Untitled)",
    "subject": "Research and Development",
    "instructorName": "Rodin Salem",
    "price": 474.55,
    "level": "Advanced",
    "courseHours": 155,
    "summary": "Unspecified injury of splenic vein, initial encounter",
    "subtitles": [
      {
        "header": "Accounting Assistant I",
        "totalMinutes": 23185,
        "contents": [
          {
            "contentTitle": "Falco mexicanus",
            "video": "http://dummyimage.com/192x143.png/cc0000/ffffff",
            "duration": 3,
            "description": "Major laceration of inferior vena cava"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/215x148.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Encounter for prophylactic removal of ovary"
          },
          {
            "contentTitle": "Amphibolurus barbatus",
            "video": "http://dummyimage.com/161x110.png/cc0000/ffffff",
            "duration": 8,
            "description": "Melanoma in situ of lower limb, including hip"
          },
          {
            "contentTitle": "Panthera pardus",
            "video": "http://dummyimage.com/104x214.png/dddddd/000000",
            "duration": 5,
            "description": "Unsp car occ inj in clsn w nonmtr vehicle in traf, sequela"
          },
          {
            "contentTitle": "Oreamnos americanus",
            "video": "http://dummyimage.com/148x139.png/cc0000/ffffff",
            "duration": 5,
            "description": "Minor laceration of thoracic aorta"
          },
          {
            "contentTitle": "Felis libyca",
            "video": "http://dummyimage.com/244x155.png/dddddd/000000",
            "duration": 5,
            "description": "Supervision of young multigravida, second trimester"
          },
          {
            "contentTitle": "Graspus graspus",
            "video": "http://dummyimage.com/143x225.png/cc0000/ffffff",
            "duration": 8,
            "description": "Sltr-haris Type IV physl fx lower end humer, left arm, sqla"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/184x146.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Other premature separation of placenta"
          },
          {
            "contentTitle": "Gabianus pacificus",
            "video": "http://dummyimage.com/236x135.png/dddddd/000000",
            "duration": 7,
            "description": "Basal cell carcinoma of skin of lower limb, including hip"
          },
          {
            "contentTitle": "Graspus graspus",
            "video": "http://dummyimage.com/155x247.png/dddddd/000000",
            "duration": 9,
            "description": "Myasthenic syndromes in other diseases classified elsewhere"
          },
          {
            "contentTitle": "Gazella thompsonii",
            "video": "http://dummyimage.com/160x186.png/ff4444/ffffff",
            "duration": 5,
            "description": "I/I react d/t implnt elec nstim of spinal cord, lead, subs"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/163x130.png/cc0000/ffffff",
            "duration": 10,
            "description": "Nondisp fx of olecran pro w/o intartic extn r ulna, 7thB"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/227x111.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "War op involving unarmed hand to hand combat, milt, subs"
          },
          {
            "contentTitle": "Ursus maritimus",
            "video": "http://dummyimage.com/160x195.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Obstructive hydrocephalus"
          },
          {
            "contentTitle": "Phalacrocorax niger",
            "video": "http://dummyimage.com/127x134.png/dddddd/000000",
            "duration": 5,
            "description": "Major laceration of unspecified pulmonary blood vessels"
          },
          {
            "contentTitle": "Crotalus triseriatus",
            "video": "http://dummyimage.com/107x192.png/cc0000/ffffff",
            "duration": 9,
            "description": "Burn of first degree of right scapular region, init encntr"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/210x158.png/cc0000/ffffff",
            "duration": 6,
            "description": "Other specified bursopathies, right ankle and foot"
          },
          {
            "contentTitle": "Trichechus inunguis",
            "video": "http://dummyimage.com/134x177.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Diffuse follicle center lymphoma, unspecified site"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/181x113.png/dddddd/000000",
            "duration": 2,
            "description": "Other immunodeficiencies with predominantly antibody defects"
          },
          {
            "contentTitle": "Lorythaixoides concolor",
            "video": "http://dummyimage.com/244x148.png/dddddd/000000",
            "duration": 10,
            "description": "Driver of 3-whl mv inj in clsn w rail trn/veh nontraf, subs"
          }
        ]
      },
      {
        "header": "Community Outreach Specialist",
        "totalMinutes": 59171,
        "contents": [
          {
            "contentTitle": "Diomedea irrorata",
            "video": "http://dummyimage.com/113x101.png/cc0000/ffffff",
            "duration": 8,
            "description": "Calcium deposit in bursa, ankle and foot"
          },
          {
            "contentTitle": "Cebus apella",
            "video": "http://dummyimage.com/103x104.png/dddddd/000000",
            "duration": 2,
            "description": "Partial traumatic amputation of unsp forearm, level unsp"
          },
          {
            "contentTitle": "Meleagris gallopavo",
            "video": "http://dummyimage.com/223x208.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Educational maladjustment & discord w teachers & classmates"
          },
          {
            "contentTitle": "Tachybaptus ruficollis",
            "video": "http://dummyimage.com/167x102.png/dddddd/000000",
            "duration": 6,
            "description": "Disloc of proximal interphaln joint of l little finger, subs"
          },
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/128x144.png/cc0000/ffffff",
            "duration": 5,
            "description": "Nondisplaced fracture of medial cuneiform of right foot"
          },
          {
            "contentTitle": "Ara chloroptera",
            "video": "http://dummyimage.com/232x137.png/dddddd/000000",
            "duration": 6,
            "description": "Other specified disorders of synovium and tendon, shoulder"
          },
          {
            "contentTitle": "Spermophilus lateralis",
            "video": "http://dummyimage.com/102x169.png/dddddd/000000",
            "duration": 6,
            "description": "Anti-common-cold drugs"
          },
          {
            "contentTitle": "Catharacta skua",
            "video": "http://dummyimage.com/203x242.png/ff4444/ffffff",
            "duration": 1,
            "description": "Unsp opn wnd abd wall, right low q w/o penet perit cav, init"
          },
          {
            "contentTitle": "Funambulus pennati",
            "video": "http://dummyimage.com/114x104.png/dddddd/000000",
            "duration": 6,
            "description": "Injury of ulnar nerve at upper arm level, right arm"
          },
          {
            "contentTitle": "Phacochoerus aethiopus",
            "video": "http://dummyimage.com/239x117.png/dddddd/000000",
            "duration": 6,
            "description": "Path fx in neopltc dis, unsp ankle, subs for fx w nonunion"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/189x111.png/dddddd/000000",
            "duration": 6,
            "description": "Lacerat extn musc/fasc/tend unsp finger at forarm lv, sqla"
          },
          {
            "contentTitle": "Snycerus caffer",
            "video": "http://dummyimage.com/168x162.png/dddddd/000000",
            "duration": 5,
            "description": "Poisoning by antihyperlip and antiarterio drugs, undet, subs"
          }
        ]
      },
      {
        "header": "Nurse Practicioner",
        "totalMinutes": 29133,
        "contents": [
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/113x101.png/cc0000/ffffff",
            "duration": 1,
            "description": "Localized traumatic opacities, bilateral"
          },
          {
            "contentTitle": "Ciconia episcopus",
            "video": "http://dummyimage.com/167x209.png/ff4444/ffffff",
            "duration": 5,
            "description": "Strain musc/tend post grp at low leg level, left leg, init"
          },
          {
            "contentTitle": "Caiman crocodilus",
            "video": "http://dummyimage.com/132x180.png/cc0000/ffffff",
            "duration": 7,
            "description": "Other non-diabetic proliferative retinopathy"
          },
          {
            "contentTitle": "Smithopsis crassicaudata",
            "video": "http://dummyimage.com/222x192.png/dddddd/000000",
            "duration": 1,
            "description": "Animal-rider injured in collision w nonmtr vehicles, subs"
          },
          {
            "contentTitle": "Crotalus adamanteus",
            "video": "http://dummyimage.com/191x220.png/ff4444/ffffff",
            "duration": 5,
            "description": "Toxic effect of contact with oth venomous amphibian, assault"
          },
          {
            "contentTitle": "Cygnus buccinator",
            "video": "http://dummyimage.com/120x117.png/cc0000/ffffff",
            "duration": 9,
            "description": "Primary blast injury of left ear, initial encounter"
          },
          {
            "contentTitle": "Porphyrio porphyrio",
            "video": "http://dummyimage.com/176x212.png/cc0000/ffffff",
            "duration": 4,
            "description": "Unspecified trochanteric fracture of right femur, sequela"
          },
          {
            "contentTitle": "Oryx gazella",
            "video": "http://dummyimage.com/150x238.png/ff4444/ffffff",
            "duration": 4,
            "description": "Chronic gout due to renal impairment, unspecified wrist"
          },
          {
            "contentTitle": "Turtur chalcospilos",
            "video": "http://dummyimage.com/144x187.png/ff4444/ffffff",
            "duration": 9,
            "description": "Fracture of unspecified carpal bone, right wrist, sequela"
          },
          {
            "contentTitle": "Ursus maritimus",
            "video": "http://dummyimage.com/242x227.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Other superficial bite of unspecified lesser toe(s)"
          }
        ]
      },
      {
        "header": "Budget/Accounting Analyst IV",
        "totalMinutes": 9383,
        "contents": [
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/138x182.png/dddddd/000000",
            "duration": 8,
            "description": "Burn of second degree of elbow"
          },
          {
            "contentTitle": "Taurotagus oryx",
            "video": "http://dummyimage.com/189x115.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Exposure to excessive natural heat, initial encounter"
          },
          {
            "contentTitle": "Iguana iguana",
            "video": "http://dummyimage.com/185x193.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Systemic antibiotics"
          },
          {
            "contentTitle": "Bos mutus",
            "video": "http://dummyimage.com/188x109.png/dddddd/000000",
            "duration": 9,
            "description": "Pressure ulcer of right buttock, unstageable"
          },
          {
            "contentTitle": "Oxybelis fulgidus",
            "video": "http://dummyimage.com/243x190.png/cc0000/ffffff",
            "duration": 10,
            "description": "Struck by macaw, subsequent encounter"
          },
          {
            "contentTitle": "Ursus americanus",
            "video": "http://dummyimage.com/211x123.png/ff4444/ffffff",
            "duration": 7,
            "description": "Displaced fracture of lateral end of left clavicle, sequela"
          },
          {
            "contentTitle": "Pteropus rufus",
            "video": "http://dummyimage.com/171x166.png/ff4444/ffffff",
            "duration": 1,
            "description": "Displaced intertrochanteric fracture of unsp femur, init"
          },
          {
            "contentTitle": "Alouatta seniculus",
            "video": "http://dummyimage.com/227x227.png/ff4444/ffffff",
            "duration": 6,
            "description": "Nondisp fx of lower epiphysis (separation) of unsp femur"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/231x246.png/dddddd/000000",
            "duration": 4,
            "description": "Dysarthria and anarthria"
          },
          {
            "contentTitle": "Ploceus rubiginosus",
            "video": "http://dummyimage.com/128x104.png/dddddd/000000",
            "duration": 3,
            "description": "Esophageal obstruction"
          },
          {
            "contentTitle": "Passer domesticus",
            "video": "http://dummyimage.com/193x120.png/cc0000/ffffff",
            "duration": 7,
            "description": "Displ transverse fx shaft of r rad, 7thH"
          },
          {
            "contentTitle": "Felis caracal",
            "video": "http://dummyimage.com/120x172.png/cc0000/ffffff",
            "duration": 10,
            "description": "Sltr-haris Type IV physl fx low end humer, l arm, 7thG"
          },
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/209x173.png/dddddd/000000",
            "duration": 6,
            "description": "Unsp fx lower end of right ulna, init for opn fx type 3A/B/C"
          },
          {
            "contentTitle": "Larus dominicanus",
            "video": "http://dummyimage.com/128x245.png/dddddd/000000",
            "duration": 5,
            "description": "Poisoning by unsp agents aff the cardiovasc sys, acc, init"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/122x221.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Laceration of musc/fasc/tend prt biceps, left arm"
          }
        ]
      },
      {
        "header": "Product Engineer",
        "totalMinutes": 25984,
        "contents": [
          {
            "contentTitle": "Geococcyx californianus",
            "video": "http://dummyimage.com/131x123.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Inj musc/fasc/tend at wrist and hand level, left hand, init"
          },
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/249x121.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Supervision of pregnancy with insufficient antenatal care"
          },
          {
            "contentTitle": "Oryx gazella callotis",
            "video": "http://dummyimage.com/168x136.png/cc0000/ffffff",
            "duration": 8,
            "description": "Dental caries on pit and fissure surfc penetrat into dentin"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/142x163.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Dislocation of midcarpal joint of right wrist"
          },
          {
            "contentTitle": "Lycaon pictus",
            "video": "http://dummyimage.com/191x153.png/ff4444/ffffff",
            "duration": 9,
            "description": "Cocaine dependence with intoxication, unspecified"
          },
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/137x234.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other misadventures during surgical and medical care"
          },
          {
            "contentTitle": "Crotalus triseriatus",
            "video": "http://dummyimage.com/123x242.png/cc0000/ffffff",
            "duration": 2,
            "description": "Anemia in other chronic diseases classified elsewhere"
          },
          {
            "contentTitle": "Cabassous sp.",
            "video": "http://dummyimage.com/120x157.png/dddddd/000000",
            "duration": 7,
            "description": "Unspecified injury of liver, initial encounter"
          },
          {
            "contentTitle": "Pterocles gutturalis",
            "video": "http://dummyimage.com/225x206.png/cc0000/ffffff",
            "duration": 7,
            "description": "Cranial nerve disorder, unspecified"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/161x177.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Injury of peripheral nerves of thorax, sequela"
          },
          {
            "contentTitle": "Haliaetus vocifer",
            "video": "http://dummyimage.com/224x200.png/ff4444/ffffff",
            "duration": 5,
            "description": "Oth intraop comp and disorders of the ear/mastd, NEC"
          },
          {
            "contentTitle": "Megaderma spasma",
            "video": "http://dummyimage.com/130x189.png/ff4444/ffffff",
            "duration": 6,
            "description": "Nondisp fx of shaft of 2nd MC bone, r hand, 7thP"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/247x188.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Oth non-follic lymphoma, nodes of axilla and upper limb"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/109x113.png/cc0000/ffffff",
            "duration": 6,
            "description": "Periprosthetic osteolysis of unsp internal prosthetic joint"
          },
          {
            "contentTitle": "Vulpes chama",
            "video": "http://dummyimage.com/105x149.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Complete transverse atyp femoral fracture, unsp leg, sequela"
          },
          {
            "contentTitle": "Paradoxurus hermaphroditus",
            "video": "http://dummyimage.com/152x142.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Corrosion of first deg mult sites of unsp ank/ft, init"
          }
        ]
      },
      {
        "header": "Biostatistician III",
        "totalMinutes": 49189,
        "contents": [
          {
            "contentTitle": "Naja nivea",
            "video": "http://dummyimage.com/178x214.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Migraine without aura, intractable, with status migrainosus"
          },
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/206x151.png/ff4444/ffffff",
            "duration": 9,
            "description": "Poisoning by oral contraceptives, accidental (unintentional)"
          },
          {
            "contentTitle": "Geochelone elegans",
            "video": "http://dummyimage.com/218x120.png/cc0000/ffffff",
            "duration": 10,
            "description": "Expulsive choroidal hemorrhage, left eye"
          },
          {
            "contentTitle": "Sylvilagus floridanus",
            "video": "http://dummyimage.com/173x134.png/ff4444/ffffff",
            "duration": 6,
            "description": "Allergy status to oth drug/meds/biol subst status"
          }
        ]
      },
      {
        "header": "Internal Auditor",
        "totalMinutes": 46261,
        "contents": [
          {
            "contentTitle": "Platalea leucordia",
            "video": "http://dummyimage.com/140x236.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Idiopathic chronic gout, left elbow"
          },
          {
            "contentTitle": "Castor canadensis",
            "video": "http://dummyimage.com/235x139.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Partial physeal arrest, left proximal tibia"
          },
          {
            "contentTitle": "Lamprotornis sp.",
            "video": "http://dummyimage.com/124x194.png/dddddd/000000",
            "duration": 10,
            "description": "Osteitis deformans of unspecified forearm"
          },
          {
            "contentTitle": "Toxostoma curvirostre",
            "video": "http://dummyimage.com/226x221.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Superficial frostbite of unspecified ear, initial encounter"
          },
          {
            "contentTitle": "Philetairus socius",
            "video": "http://dummyimage.com/119x226.png/ff4444/ffffff",
            "duration": 4,
            "description": "Severe hypoxic ischemic encephalopathy [HIE]"
          },
          {
            "contentTitle": "Phoca vitulina",
            "video": "http://dummyimage.com/177x165.png/dddddd/000000",
            "duration": 4,
            "description": "Assault by pipe bomb"
          }
        ]
      },
      {
        "header": "Librarian",
        "totalMinutes": 21273,
        "contents": [
          {
            "contentTitle": "Ara macao",
            "video": "http://dummyimage.com/144x122.png/ff4444/ffffff",
            "duration": 3,
            "description": "Toxic effect of detergents, accidental (unintentional), init"
          },
          {
            "contentTitle": "Ara chloroptera",
            "video": "http://dummyimage.com/203x199.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Contusion of left great toe without damage to nail"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/119x167.png/cc0000/ffffff",
            "duration": 4,
            "description": "Abrasion of upper arm"
          },
          {
            "contentTitle": "Alligator mississippiensis",
            "video": "http://dummyimage.com/244x177.png/cc0000/ffffff",
            "duration": 6,
            "description": "Sequelae of hyperalimentation"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/246x243.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Angioid streaks of macula"
          },
          {
            "contentTitle": "Nycticorax nycticorax",
            "video": "http://dummyimage.com/234x155.png/cc0000/ffffff",
            "duration": 10,
            "description": "Oth fracture of unsp lower leg, init for opn fx type 3A/B/C"
          },
          {
            "contentTitle": "Larus dominicanus",
            "video": "http://dummyimage.com/197x196.png/cc0000/ffffff",
            "duration": 5,
            "description": "Primary optic atrophy, left eye"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/194x215.png/cc0000/ffffff",
            "duration": 9,
            "description": "Nondisp avuls fx tuberosity of l calcaneus, 7thP"
          },
          {
            "contentTitle": "Antidorcas marsupialis",
            "video": "http://dummyimage.com/226x134.png/dddddd/000000",
            "duration": 2,
            "description": "Poisn by unsp prim systemic and hematolog agent, acc, subs"
          },
          {
            "contentTitle": "Hippotragus niger",
            "video": "http://dummyimage.com/124x142.png/cc0000/ffffff",
            "duration": 8,
            "description": "Disp fx of neck of left radius, subs for clos fx w malunion"
          },
          {
            "contentTitle": "Conolophus subcristatus",
            "video": "http://dummyimage.com/103x170.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Sltr-haris Type III physl fx low end unsp tibia, 7thG"
          },
          {
            "contentTitle": "Anhinga rufa",
            "video": "http://dummyimage.com/204x148.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Unsp physeal fx lower end of l tibia, subs for fx w malunion"
          },
          {
            "contentTitle": "Eudromia elegans",
            "video": "http://dummyimage.com/117x116.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Paralytic calcification and ossification of muscle, shoulder"
          }
        ]
      },
      {
        "header": "Physical Therapy Assistant",
        "totalMinutes": 50443,
        "contents": [
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/191x168.png/dddddd/000000",
            "duration": 8,
            "description": "Crushing injury of left shoulder and upper arm, init encntr"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/137x218.png/dddddd/000000",
            "duration": 5,
            "description": "Oth fx upper end of left ulna, init for opn fx type 3A/B/C"
          },
          {
            "contentTitle": "Antidorcas marsupialis",
            "video": "http://dummyimage.com/194x139.png/cc0000/ffffff",
            "duration": 5,
            "description": "Displ transverse fx shaft of r rad, 7thC"
          },
          {
            "contentTitle": "Diomedea irrorata",
            "video": "http://dummyimage.com/213x247.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Fall into natural body of water strk bottom cause oth injury"
          },
          {
            "contentTitle": "Dasyurus maculatus",
            "video": "http://dummyimage.com/169x156.png/ff4444/ffffff",
            "duration": 4,
            "description": "Contusion of unsp ring finger w damage to nail, init encntr"
          },
          {
            "contentTitle": "Ictalurus furcatus",
            "video": "http://dummyimage.com/246x191.png/ff4444/ffffff",
            "duration": 5,
            "description": "Meningitis due to other and unspecified causes"
          },
          {
            "contentTitle": "Laniaurius atrococcineus",
            "video": "http://dummyimage.com/218x235.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Displaced oblique fracture of shaft of left radius"
          },
          {
            "contentTitle": "Dolichitus patagonum",
            "video": "http://dummyimage.com/126x240.png/dddddd/000000",
            "duration": 5,
            "description": "Breakdown (mechanical) of implnt elec nstim of prph nrv lead"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/194x110.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Tinnitus"
          },
          {
            "contentTitle": "Herpestes javanicus",
            "video": "http://dummyimage.com/110x193.png/dddddd/000000",
            "duration": 7,
            "description": "Other and unspecified ventral hernia with gangrene"
          },
          {
            "contentTitle": "Echimys chrysurus",
            "video": "http://dummyimage.com/228x171.png/dddddd/000000",
            "duration": 3,
            "description": "Displaced fracture of cuboid bone of left foot"
          },
          {
            "contentTitle": "Ciconia episcopus",
            "video": "http://dummyimage.com/109x208.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Breakdown of cardiac pulse generator (battery), init"
          },
          {
            "contentTitle": "Threskionis aethiopicus",
            "video": "http://dummyimage.com/145x157.png/cc0000/ffffff",
            "duration": 1,
            "description": "Displacement of other nervous sys device, implant or graft"
          }
        ]
      },
      {
        "header": "Registered Nurse",
        "totalMinutes": 55748,
        "contents": [
          {
            "contentTitle": "Macaca fuscata",
            "video": "http://dummyimage.com/171x184.png/ff4444/ffffff",
            "duration": 6,
            "description": "Breakdown (mechanical) of int fix of left femur, subs"
          },
          {
            "contentTitle": "Ploceus rubiginosus",
            "video": "http://dummyimage.com/202x199.png/ff4444/ffffff",
            "duration": 7,
            "description": "Early satiety"
          },
          {
            "contentTitle": "Lycosa godeffroyi",
            "video": "http://dummyimage.com/247x234.png/cc0000/ffffff",
            "duration": 2,
            "description": "Displ post arch fx 1st cervcal vert, 7thD"
          },
          {
            "contentTitle": "Pycnonotus nigricans",
            "video": "http://dummyimage.com/157x104.png/ff4444/ffffff",
            "duration": 4,
            "description": "Aphasia following unspecified cerebrovascular disease"
          }
        ]
      },
      {
        "header": "Financial Analyst",
        "totalMinutes": 60479,
        "contents": [
          {
            "contentTitle": "Lorythaixoides concolor",
            "video": "http://dummyimage.com/191x112.png/cc0000/ffffff",
            "duration": 8,
            "description": "Displ simp suprcndl fx w/o intrcndl fx l humer, 7thB"
          },
          {
            "contentTitle": "Cercatetus concinnus",
            "video": "http://dummyimage.com/243x117.png/ff4444/ffffff",
            "duration": 3,
            "description": "Unsp fracture of unsp femur, init for opn fx type 3A/B/C"
          },
          {
            "contentTitle": "Mabuya spilogaster",
            "video": "http://dummyimage.com/180x209.png/dddddd/000000",
            "duration": 2,
            "description": "Anetoderma of Schweninger-Buzzi"
          },
          {
            "contentTitle": "Phalacrocorax brasilianus",
            "video": "http://dummyimage.com/249x237.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Oth soft tissue disorders related to use/pressure lower leg"
          },
          {
            "contentTitle": "Merops sp.",
            "video": "http://dummyimage.com/183x204.png/cc0000/ffffff",
            "duration": 5,
            "description": "Contusion of right front wall of thorax, sequela"
          }
        ]
      },
      {
        "header": "Web Developer IV",
        "totalMinutes": 63265,
        "contents": [
          {
            "contentTitle": "Antilope cervicapra",
            "video": "http://dummyimage.com/203x115.png/cc0000/ffffff",
            "duration": 2,
            "description": "Oth pulmonary comp of anesth during preg, unsp trimester"
          },
          {
            "contentTitle": "Tamiasciurus hudsonicus",
            "video": "http://dummyimage.com/239x212.png/ff4444/ffffff",
            "duration": 7,
            "description": "Primary focal hyperhidrosis, palms"
          },
          {
            "contentTitle": "Crocuta crocuta",
            "video": "http://dummyimage.com/106x228.png/cc0000/ffffff",
            "duration": 3,
            "description": "Fracture of unsp phalanx of l rng fngr, init for opn fx"
          },
          {
            "contentTitle": "Drymarchon corias couperi",
            "video": "http://dummyimage.com/110x246.png/dddddd/000000",
            "duration": 5,
            "description": "War op w explosn of improv explosv device, civilian, sequela"
          },
          {
            "contentTitle": "Platalea leucordia",
            "video": "http://dummyimage.com/130x203.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Displ unsp condyle fx low end unsp femr, 7thQ"
          },
          {
            "contentTitle": "Cathartes aura",
            "video": "http://dummyimage.com/107x149.png/ff4444/ffffff",
            "duration": 7,
            "description": "Injury of facial nerve, right side, sequela"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/155x164.png/ff4444/ffffff",
            "duration": 8,
            "description": "Posterior dislocation of right humerus, subsequent encounter"
          }
        ]
      },
      {
        "header": "Human Resources Assistant I",
        "totalMinutes": 89520,
        "contents": [
          {
            "contentTitle": "Threskionis aethiopicus",
            "video": "http://dummyimage.com/228x160.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Toxic effect of contact w oth venomous amphib, assault, init"
          },
          {
            "contentTitle": "Cebus nigrivittatus",
            "video": "http://dummyimage.com/226x209.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Bus occupant injured pick-up truck, pick-up truck or van"
          },
          {
            "contentTitle": "Semnopithecus entellus",
            "video": "http://dummyimage.com/119x190.png/cc0000/ffffff",
            "duration": 8,
            "description": "Other fracture of upper end of right radius"
          },
          {
            "contentTitle": "Geospiza sp.",
            "video": "http://dummyimage.com/250x189.png/cc0000/ffffff",
            "duration": 10,
            "description": "Fracture of angle of left mandible, 7thK"
          },
          {
            "contentTitle": "Falco mexicanus",
            "video": "http://dummyimage.com/135x228.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Periodic limb movement disorder"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/105x142.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Other foreign body or object entering through skin"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/235x192.png/ff4444/ffffff",
            "duration": 5,
            "description": "Unsp inj unsp blood vess at wrs/hnd lv of right arm, init"
          },
          {
            "contentTitle": "Lepus arcticus",
            "video": "http://dummyimage.com/227x186.png/dddddd/000000",
            "duration": 5,
            "description": "Amblyopia suspect"
          },
          {
            "contentTitle": "Limosa haemastica",
            "video": "http://dummyimage.com/116x131.png/ff4444/ffffff",
            "duration": 2,
            "description": "Displ unsp condyle fx low end r femr, 7thP"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/206x170.png/ff4444/ffffff",
            "duration": 3,
            "description": "Unspecified injury of right lower leg, initial encounter"
          },
          {
            "contentTitle": "Dasyurus viverrinus",
            "video": "http://dummyimage.com/139x110.png/dddddd/000000",
            "duration": 3,
            "description": "Furuncle of buttock"
          }
        ]
      },
      {
        "header": "Information Systems Manager",
        "totalMinutes": 60821,
        "contents": [
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/228x103.png/ff4444/ffffff",
            "duration": 6,
            "description": "Struck by falling object on passenger ship"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/207x103.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Personal history of infections of the central nervous system"
          },
          {
            "contentTitle": "Aegypius occipitalis",
            "video": "http://dummyimage.com/121x144.png/ff4444/ffffff",
            "duration": 8,
            "description": "Monoamine-oxidase-inhibitor antidepressants"
          },
          {
            "contentTitle": "Platalea leucordia",
            "video": "http://dummyimage.com/151x194.png/ff4444/ffffff",
            "duration": 2,
            "description": "Contracture of muscle, left forearm"
          }
        ]
      },
      {
        "header": "Business Systems Development Analyst",
        "totalMinutes": 20889,
        "contents": [
          {
            "contentTitle": "Phoenicopterus chilensis",
            "video": "http://dummyimage.com/185x186.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Unspecified sprain of right lesser toe(s)"
          },
          {
            "contentTitle": "Tiliqua scincoides",
            "video": "http://dummyimage.com/130x142.png/ff4444/ffffff",
            "duration": 1,
            "description": "Burn of third degree of right palm"
          },
          {
            "contentTitle": "Genetta genetta",
            "video": "http://dummyimage.com/111x162.png/cc0000/ffffff",
            "duration": 3,
            "description": "Adverse effect of other parasympathomimetics [cholinergics]"
          },
          {
            "contentTitle": "Limnocorax flavirostra",
            "video": "http://dummyimage.com/199x117.png/dddddd/000000",
            "duration": 2,
            "description": "Fall from non-moving wheelchair, initial encounter"
          },
          {
            "contentTitle": "Phascogale calura",
            "video": "http://dummyimage.com/188x136.png/dddddd/000000",
            "duration": 1,
            "description": "Osteopathy in diseases classified elsewhere, left forearm"
          },
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/136x206.png/cc0000/ffffff",
            "duration": 9,
            "description": "Oth comp specific to multiple gest, third trimester, fetus 1"
          }
        ]
      }
    ]
  },
  {
    "title": "Everything Relative",
    "subject": "Services",
    "instructorName": "Rodin Salem",
    "price": 1084.16,
    "level": "Advanced",
    "courseHours": 42,
    "summary": "Minor contusion of spleen",
    "subtitles": [
      {
        "header": "Social Worker",
        "totalMinutes": 18280,
        "contents": [
          {
            "contentTitle": "Vulpes cinereoargenteus",
            "video": "http://dummyimage.com/104x139.png/dddddd/000000",
            "duration": 9,
            "description": "Unsp car occupant injured in clsn w van in traf, sequela"
          },
          {
            "contentTitle": "Seiurus aurocapillus",
            "video": "http://dummyimage.com/200x245.png/cc0000/ffffff",
            "duration": 2,
            "description": "Fall same lev from slip/trip w strk agnst sharp glass, subs"
          },
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/134x216.png/ff4444/ffffff",
            "duration": 1,
            "description": "Unsp superficial injury of left upper arm, init encntr"
          },
          {
            "contentTitle": "Stenella coeruleoalba",
            "video": "http://dummyimage.com/215x104.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Pregnancy with inconclusive fetal viability, fetus 1"
          },
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/143x100.png/ff4444/ffffff",
            "duration": 9,
            "description": "Laceration with foreign body, left ankle, initial encounter"
          },
          {
            "contentTitle": "Halcyon smyrnesis",
            "video": "http://dummyimage.com/170x232.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Oth osteopor w current path fracture, r low leg, init"
          },
          {
            "contentTitle": "Tursiops truncatus",
            "video": "http://dummyimage.com/110x102.png/cc0000/ffffff",
            "duration": 7,
            "description": "Poisn by slctv seroton/norepineph reup inhibtr, acc, init"
          },
          {
            "contentTitle": "Zosterops pallidus",
            "video": "http://dummyimage.com/217x165.png/dddddd/000000",
            "duration": 9,
            "description": "Ankylosis, ankle and foot"
          },
          {
            "contentTitle": "Oxybelis fulgidus",
            "video": "http://dummyimage.com/195x211.png/ff4444/ffffff",
            "duration": 5,
            "description": "Blister (nonthermal), right ankle, sequela"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/198x180.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Toxic effect of taipan venom, assault, subsequent encounter"
          },
          {
            "contentTitle": "Sula dactylatra",
            "video": "http://dummyimage.com/101x225.png/ff4444/ffffff",
            "duration": 8,
            "description": "Lacerat flexor musc/fasc/tend l rng fngr at forarm lv, init"
          },
          {
            "contentTitle": "Corvus albus",
            "video": "http://dummyimage.com/227x203.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Nontoxic goiter, unspecified"
          },
          {
            "contentTitle": "Arctogalidia trivirgata",
            "video": "http://dummyimage.com/125x131.png/ff4444/ffffff",
            "duration": 9,
            "description": "Corrosion of unspecified degree of right palm"
          },
          {
            "contentTitle": "Actophilornis africanus",
            "video": "http://dummyimage.com/160x180.png/ff4444/ffffff",
            "duration": 3,
            "description": "Burn of second degree of right elbow, sequela"
          },
          {
            "contentTitle": "Lamprotornis superbus",
            "video": "http://dummyimage.com/248x101.png/dddddd/000000",
            "duration": 1,
            "description": "Unsp injury of brachial artery, unsp side, subs encntr"
          },
          {
            "contentTitle": "Cygnus atratus",
            "video": "http://dummyimage.com/177x223.png/ff4444/ffffff",
            "duration": 6,
            "description": "Decreased fetal movements, unspecified trimester, fetus 1"
          },
          {
            "contentTitle": "Bubo virginianus",
            "video": "http://dummyimage.com/183x238.png/ff4444/ffffff",
            "duration": 3,
            "description": "Chronic gout due to renal impairment, unsp hip, w/o tophus"
          },
          {
            "contentTitle": "Agama sp.",
            "video": "http://dummyimage.com/101x108.png/ff4444/ffffff",
            "duration": 4,
            "description": "Hypersensitivity pneumonitis due to organic dust"
          }
        ]
      },
      {
        "header": "Database Administrator II",
        "totalMinutes": 47508,
        "contents": [
          {
            "contentTitle": "Dendrohyrax brucel",
            "video": "http://dummyimage.com/229x229.png/cc0000/ffffff",
            "duration": 3,
            "description": "Bent bone of l ulna, subs for opn fx type 3A/B/C w nonunion"
          },
          {
            "contentTitle": "Vanessa indica",
            "video": "http://dummyimage.com/106x101.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Corros unsp degree of unsp mult fngr (nail), not inc thumb"
          },
          {
            "contentTitle": "Halcyon smyrnesis",
            "video": "http://dummyimage.com/165x117.png/ff4444/ffffff",
            "duration": 10,
            "description": "Recurrent erosion of cornea, right eye"
          },
          {
            "contentTitle": "Amazona sp.",
            "video": "http://dummyimage.com/180x172.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Synovial hypertrophy, not elsewhere classified, lower leg"
          },
          {
            "contentTitle": "Graspus graspus",
            "video": "http://dummyimage.com/112x223.png/ff4444/ffffff",
            "duration": 2,
            "description": "Unspecified purulent endophthalmitis, right eye"
          },
          {
            "contentTitle": "Isoodon obesulus",
            "video": "http://dummyimage.com/130x192.png/dddddd/000000",
            "duration": 3,
            "description": "Nondisp fx of r tibial tuberosity, 7thD"
          },
          {
            "contentTitle": "Macropus rufogriseus",
            "video": "http://dummyimage.com/178x230.png/cc0000/ffffff",
            "duration": 9,
            "description": "Puncture wound with foreign body of nose, subs encntr"
          },
          {
            "contentTitle": "Turtur chalcospilos",
            "video": "http://dummyimage.com/199x171.png/dddddd/000000",
            "duration": 6,
            "description": "Contact w hot household appliance, undetermined intent, init"
          },
          {
            "contentTitle": "Ardea golieth",
            "video": "http://dummyimage.com/110x186.png/dddddd/000000",
            "duration": 5,
            "description": "Insect bite (nonvenomous), left lesser toe(s), sequela"
          },
          {
            "contentTitle": "Pseudocheirus peregrinus",
            "video": "http://dummyimage.com/159x110.png/dddddd/000000",
            "duration": 8,
            "description": "Insect bite (nonvenomous), left foot"
          },
          {
            "contentTitle": "Cygnus buccinator",
            "video": "http://dummyimage.com/184x141.png/ff4444/ffffff",
            "duration": 1,
            "description": "Radiation sickness, unspecified"
          },
          {
            "contentTitle": "Eubalaena australis",
            "video": "http://dummyimage.com/227x170.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Toxic effect of herbicides and fungicides"
          },
          {
            "contentTitle": "Isoodon obesulus",
            "video": "http://dummyimage.com/211x163.png/dddddd/000000",
            "duration": 2,
            "description": "Displ longitud fx l patella, 7thE"
          },
          {
            "contentTitle": "Agouti paca",
            "video": "http://dummyimage.com/189x202.png/ff4444/ffffff",
            "duration": 4,
            "description": "Lacerat long flexor musc/fasc/tend thmb at wrs/hnd lv, sqla"
          },
          {
            "contentTitle": "Lepilemur rufescens",
            "video": "http://dummyimage.com/153x141.png/cc0000/ffffff",
            "duration": 3,
            "description": "Person outside bus injured in clsn w ped/anml nontraf, subs"
          },
          {
            "contentTitle": "Spermophilus armatus",
            "video": "http://dummyimage.com/220x190.png/cc0000/ffffff",
            "duration": 6,
            "description": "Unspecified open wound of unspecified shoulder"
          },
          {
            "contentTitle": "Boa caninus",
            "video": "http://dummyimage.com/131x104.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Gout"
          }
        ]
      },
      {
        "header": "Teacher",
        "totalMinutes": 27776,
        "contents": [
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/215x159.png/ff4444/ffffff",
            "duration": 7,
            "description": "Adverse effect of electrolytic/caloric/wtr-bal agnt"
          },
          {
            "contentTitle": "Anser caerulescens",
            "video": "http://dummyimage.com/189x105.png/dddddd/000000",
            "duration": 2,
            "description": "Other lack of coordination"
          },
          {
            "contentTitle": "Naja nivea",
            "video": "http://dummyimage.com/143x200.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Oth specific joint derangements of hip, NEC"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/212x226.png/ff4444/ffffff",
            "duration": 10,
            "description": "Cardiac failure due to anesth during preg, unsp trimester"
          },
          {
            "contentTitle": "Diomedea irrorata",
            "video": "http://dummyimage.com/153x231.png/dddddd/000000",
            "duration": 9,
            "description": "Unspecified fracture of acetabulum"
          },
          {
            "contentTitle": "Odocoilenaus virginianus",
            "video": "http://dummyimage.com/237x182.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Toxic effect of cntct w oth venom animals, slf-hrm, sequela"
          },
          {
            "contentTitle": "Alcelaphus buselaphus cokii",
            "video": "http://dummyimage.com/185x121.png/dddddd/000000",
            "duration": 9,
            "description": "Nondisp fx of intermediate cuneiform of right foot, init"
          },
          {
            "contentTitle": "Orcinus orca",
            "video": "http://dummyimage.com/135x227.png/ff4444/ffffff",
            "duration": 5,
            "description": "Edema of left eye, unspecified eyelid"
          },
          {
            "contentTitle": "Pteropus rufus",
            "video": "http://dummyimage.com/102x129.png/dddddd/000000",
            "duration": 8,
            "description": "Intestine transplant rejection"
          },
          {
            "contentTitle": "Leptoptilus dubius",
            "video": "http://dummyimage.com/124x113.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Nondisp fx of med condyle of l femr, 7thQ"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/198x108.png/cc0000/ffffff",
            "duration": 5,
            "description": "Disp fx of navicular of unsp foot, subs for fx w routn heal"
          }
        ]
      },
      {
        "header": "Assistant Professor",
        "totalMinutes": 56571,
        "contents": [
          {
            "contentTitle": "Anitibyx armatus",
            "video": "http://dummyimage.com/219x117.png/cc0000/ffffff",
            "duration": 4,
            "description": "Poisoning by oth psychostimulants, self-harm, subs"
          },
          {
            "contentTitle": "Agelaius phoeniceus",
            "video": "http://dummyimage.com/145x158.png/ff4444/ffffff",
            "duration": 4,
            "description": "Arthropathy following intestinal bypass, multiple sites"
          },
          {
            "contentTitle": "Erinaceus frontalis",
            "video": "http://dummyimage.com/236x241.png/cc0000/ffffff",
            "duration": 5,
            "description": "Lacerat unsp blood vess at lower leg level, right leg, init"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/245x209.png/dddddd/000000",
            "duration": 10,
            "description": "Milt op involving biological weapons, civilian, sequela"
          },
          {
            "contentTitle": "Terrapene carolina",
            "video": "http://dummyimage.com/113x118.png/cc0000/ffffff",
            "duration": 9,
            "description": "Open bite of left lesser toe(s) with damage to nail"
          },
          {
            "contentTitle": "Estrilda erythronotos",
            "video": "http://dummyimage.com/243x156.png/dddddd/000000",
            "duration": 5,
            "description": "Unsp inj flexor musc/fasc/tend r idx fngr at forarm lv, sqla"
          },
          {
            "contentTitle": "Oryx gazella callotis",
            "video": "http://dummyimage.com/249x177.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Laceration with foreign body of finger w/o damage to nail"
          },
          {
            "contentTitle": "Raphicerus campestris",
            "video": "http://dummyimage.com/205x236.png/ff4444/ffffff",
            "duration": 6,
            "description": "Legal intervention, means unspecified, suspect injured"
          },
          {
            "contentTitle": "Francolinus leucoscepus",
            "video": "http://dummyimage.com/132x234.png/ff4444/ffffff",
            "duration": 5,
            "description": "Milt op involving explosion of depth-charge, civilian"
          },
          {
            "contentTitle": "Cygnus atratus",
            "video": "http://dummyimage.com/167x140.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Neuromuscular scoliosis, thoracolumbar region"
          },
          {
            "contentTitle": "Taurotagus oryx",
            "video": "http://dummyimage.com/118x229.png/cc0000/ffffff",
            "duration": 3,
            "description": "Inj unsp musc/tend at lower leg level, right leg, init"
          },
          {
            "contentTitle": "Pycnonotus barbatus",
            "video": "http://dummyimage.com/114x170.png/cc0000/ffffff",
            "duration": 9,
            "description": "Disp fx of med condyle of l tibia, 7thH"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/163x229.png/cc0000/ffffff",
            "duration": 7,
            "description": "Corrosion of unsp degree of left shoulder, subs encntr"
          }
        ]
      }
    ]
  },
  {
    "title": "From Russia with Love",
    "subject": "Accounting",
    "instructorName": "Rodin Salem",
    "price": 915.01,
    "level": "Beginner",
    "courseHours": 29,
    "summary": "Person outsd 3-whl mv inj in nonclsn trnsp acc in traf, sqla",
    "subtitles": [
      {
        "header": "Professor",
        "totalMinutes": 66354,
        "contents": [
          {
            "contentTitle": "Sula dactylatra",
            "video": "http://dummyimage.com/172x211.png/dddddd/000000",
            "duration": 6,
            "description": "Poisoning by oth drug/meds/biol subst, undetermined, subs"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/107x184.png/ff4444/ffffff",
            "duration": 2,
            "description": "Lacerat abd wall w fb, unsp quadrant w/o penet perit cav"
          },
          {
            "contentTitle": "Naja haje",
            "video": "http://dummyimage.com/184x200.png/cc0000/ffffff",
            "duration": 2,
            "description": "Other specified anomalies of jaw size"
          },
          {
            "contentTitle": "Ovis canadensis",
            "video": "http://dummyimage.com/173x114.png/ff4444/ffffff",
            "duration": 10,
            "description": "Strain of musc/fasc/tend triceps, unsp arm, init"
          },
          {
            "contentTitle": "Seiurus aurocapillus",
            "video": "http://dummyimage.com/194x239.png/dddddd/000000",
            "duration": 5,
            "description": "Fracture of unspecified part of neck of right femur, sequela"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/176x233.png/cc0000/ffffff",
            "duration": 2,
            "description": "Nondisp fx of lateral condyle of unsp femr, 7thQ"
          },
          {
            "contentTitle": "Eurocephalus anguitimens",
            "video": "http://dummyimage.com/210x149.png/dddddd/000000",
            "duration": 10,
            "description": "Cont preg aft spon abort of one fts or more, first tri, unsp"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/249x177.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Nondisp Maisonneuve's fx r leg, 7thM"
          }
        ]
      },
      {
        "header": "Software Engineer I",
        "totalMinutes": 1117,
        "contents": [
          {
            "contentTitle": "Microcebus murinus",
            "video": "http://dummyimage.com/198x213.png/ff4444/ffffff",
            "duration": 6,
            "description": "Person outsd hv veh inj in clsn w statnry obj in traf, sqla"
          },
          {
            "contentTitle": "Hystrix indica",
            "video": "http://dummyimage.com/205x223.png/ff4444/ffffff",
            "duration": 6,
            "description": "Asphyxiation due to unspecified cause, subsequent encounter"
          },
          {
            "contentTitle": "Tockus erythrorhyncus",
            "video": "http://dummyimage.com/142x110.png/cc0000/ffffff",
            "duration": 10,
            "description": "Contusion of right forearm, subsequent encounter"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/248x237.png/cc0000/ffffff",
            "duration": 5,
            "description": "Disp fx of lunate, right wrist, subs for fx w routn heal"
          },
          {
            "contentTitle": "Mabuya spilogaster",
            "video": "http://dummyimage.com/212x241.png/dddddd/000000",
            "duration": 4,
            "description": "Torus fx upper end of left ulna, subs for fx w nonunion"
          },
          {
            "contentTitle": "Dendrocygna viduata",
            "video": "http://dummyimage.com/125x132.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Bullous keratopathy"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/154x191.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Other acquired stenosis of external ear canal, unsp ear"
          },
          {
            "contentTitle": "Philetairus socius",
            "video": "http://dummyimage.com/135x179.png/cc0000/ffffff",
            "duration": 1,
            "description": "Secondary syphilitic hepatitis"
          },
          {
            "contentTitle": "Tiliqua scincoides",
            "video": "http://dummyimage.com/231x195.png/cc0000/ffffff",
            "duration": 6,
            "description": "Cocaine use, unsp with cocaine-induced sexual dysfunction"
          },
          {
            "contentTitle": "Phalacrocorax niger",
            "video": "http://dummyimage.com/118x208.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Infect/inflm reaction due to int fix of right radius, init"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/146x135.png/ff4444/ffffff",
            "duration": 6,
            "description": "Decreased fetal movements, third trimester"
          },
          {
            "contentTitle": "Chloephaga melanoptera",
            "video": "http://dummyimage.com/147x223.png/ff4444/ffffff",
            "duration": 3,
            "description": "Oth abnormal cytolog findings on specimens from cervix uteri"
          }
        ]
      },
      {
        "header": "Account Coordinator",
        "totalMinutes": 80630,
        "contents": [
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/105x139.png/dddddd/000000",
            "duration": 8,
            "description": "Intermittent angle-closure glaucoma, unspecified eye"
          },
          {
            "contentTitle": "Naja haje",
            "video": "http://dummyimage.com/235x164.png/ff4444/ffffff",
            "duration": 8,
            "description": "Other fracture of upper end of tibia"
          },
          {
            "contentTitle": "Pelecans onocratalus",
            "video": "http://dummyimage.com/193x186.png/dddddd/000000",
            "duration": 9,
            "description": "Nondisp fx of medial cuneiform of left foot, init"
          },
          {
            "contentTitle": "Microcebus murinus",
            "video": "http://dummyimage.com/210x213.png/dddddd/000000",
            "duration": 10,
            "description": "Corrosion of third degree of unsp upper arm, subs encntr"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/134x144.png/ff4444/ffffff",
            "duration": 2,
            "description": "Salter-Harris Type II physeal fracture of r calcaneus, 7thG"
          }
        ]
      },
      {
        "header": "Recruiter",
        "totalMinutes": 63409,
        "contents": [
          {
            "contentTitle": "Phascogale calura",
            "video": "http://dummyimage.com/175x102.png/cc0000/ffffff",
            "duration": 10,
            "description": "Tinnitus, right ear"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/194x211.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Poisoning by other synthetic narcotics, assault, subs encntr"
          },
          {
            "contentTitle": "Sarcophilus harrisii",
            "video": "http://dummyimage.com/166x167.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Disp fx of acromial process, unsp shoulder, init for clos fx"
          },
          {
            "contentTitle": "Recurvirostra avosetta",
            "video": "http://dummyimage.com/142x202.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Other bursal cyst, left hand"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/130x126.png/ff4444/ffffff",
            "duration": 7,
            "description": "Spond in diseases classd elswhr, sacr/sacrocygl region"
          },
          {
            "contentTitle": "Phalacrocorax varius",
            "video": "http://dummyimage.com/166x248.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Greenstick fracture of shaft of radius, unsp arm, init"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/229x227.png/ff4444/ffffff",
            "duration": 9,
            "description": "Poisn by succinimides and oxazolidinediones, self-harm, init"
          },
          {
            "contentTitle": "Boselaphus tragocamelus",
            "video": "http://dummyimage.com/233x249.png/cc0000/ffffff",
            "duration": 5,
            "description": "Nondisp spiral fx shaft of unsp femr, 7thQ"
          },
          {
            "contentTitle": "Salvadora hexalepis",
            "video": "http://dummyimage.com/113x133.png/dddddd/000000",
            "duration": 8,
            "description": "Disp fx of anterior column of right acetabulum, init"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/214x117.png/cc0000/ffffff",
            "duration": 4,
            "description": "Pathological fracture, right humerus, init for fx"
          },
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/192x162.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other contact with macaw, subsequent encounter"
          },
          {
            "contentTitle": "Lepus townsendii",
            "video": "http://dummyimage.com/162x106.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Displaced avulsion fx unsp ischium, subs for fx w delay heal"
          }
        ]
      },
      {
        "header": "Staff Accountant IV",
        "totalMinutes": 73039,
        "contents": [
          {
            "contentTitle": "Galago crassicaudataus",
            "video": "http://dummyimage.com/236x222.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Toxic effect of soaps, accidental (unintentional), init"
          },
          {
            "contentTitle": "Mycteria ibis",
            "video": "http://dummyimage.com/151x119.png/dddddd/000000",
            "duration": 8,
            "description": "Comb rheumatic disord of mitral, aortic and tricuspid valves"
          },
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/185x134.png/ff4444/ffffff",
            "duration": 9,
            "description": "Pathological fracture, right humerus, subs for fx w malunion"
          },
          {
            "contentTitle": "Felis caracal",
            "video": "http://dummyimage.com/125x145.png/cc0000/ffffff",
            "duration": 5,
            "description": "Toxic effect of venom of arthropod, accidental, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/205x115.png/dddddd/000000",
            "duration": 6,
            "description": "Unsp focal TBI w LOC of 1-5 hrs 59 min, subs"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/175x138.png/dddddd/000000",
            "duration": 7,
            "description": "Peptic ulc, site unsp, unsp as ac or chr, w/o hemor or perf"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/167x215.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Displaced dome fx left talus, subs for fx w nonunion"
          },
          {
            "contentTitle": "Felis chaus",
            "video": "http://dummyimage.com/192x159.png/ff4444/ffffff",
            "duration": 8,
            "description": "Abnormal glucose"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/108x245.png/ff4444/ffffff",
            "duration": 5,
            "description": "Disp fx of r tibial tuberosity, 7thE"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/242x212.png/dddddd/000000",
            "duration": 9,
            "description": "Stepparent or stepsibling, perp of maltreat and neglect"
          },
          {
            "contentTitle": "Eutamias minimus",
            "video": "http://dummyimage.com/153x230.png/dddddd/000000",
            "duration": 5,
            "description": "Cont preg aft spon abort of one fts or more, unsp tri, fts1"
          },
          {
            "contentTitle": "Casmerodius albus",
            "video": "http://dummyimage.com/156x220.png/cc0000/ffffff",
            "duration": 3,
            "description": "Activity, ice hockey"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/182x205.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Allergy, unspecified, sequela"
          },
          {
            "contentTitle": "Epicrates cenchria maurus",
            "video": "http://dummyimage.com/148x123.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Other specified acquired deformities of left forearm"
          },
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/166x237.png/ff4444/ffffff",
            "duration": 6,
            "description": "Burn of unspecified ear drum, subsequent encounter"
          },
          {
            "contentTitle": "Felis concolor",
            "video": "http://dummyimage.com/139x120.png/cc0000/ffffff",
            "duration": 5,
            "description": "Breakdown (mechanical) of heart valve prosthesis"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/102x133.png/ff4444/ffffff",
            "duration": 1,
            "description": "Ganglion, right hip"
          },
          {
            "contentTitle": "Pycnonotus nigricans",
            "video": "http://dummyimage.com/248x216.png/dddddd/000000",
            "duration": 6,
            "description": "Corrosion of 3rd deg mu sites of right ankle and foot, subs"
          }
        ]
      },
      {
        "header": "Accountant I",
        "totalMinutes": 57865,
        "contents": [
          {
            "contentTitle": "Geochelone elephantopus",
            "video": "http://dummyimage.com/230x121.png/cc0000/ffffff",
            "duration": 10,
            "description": "Injury of conjunctiva and corneal abrasion w/o foreign body"
          },
          {
            "contentTitle": "Petaurus norfolcensis",
            "video": "http://dummyimage.com/116x114.png/cc0000/ffffff",
            "duration": 8,
            "description": "Cystic fibrosis with pulmonary manifestations"
          },
          {
            "contentTitle": "Canis mesomelas",
            "video": "http://dummyimage.com/237x164.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Driver of pk-up/van inj in clsn w unsp mv in traf, sequela"
          },
          {
            "contentTitle": "Anas punctata",
            "video": "http://dummyimage.com/152x217.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "2-part disp fx of surg nk of r humer, 7thD"
          }
        ]
      },
      {
        "header": "Associate Professor",
        "totalMinutes": 56195,
        "contents": [
          {
            "contentTitle": "Melanerpes erythrocephalus",
            "video": "http://dummyimage.com/246x115.png/ff4444/ffffff",
            "duration": 5,
            "description": "Pathological fracture, unsp ankle, subs for fx w malunion"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/132x206.png/ff4444/ffffff",
            "duration": 2,
            "description": "Resistance to vancomycin"
          },
          {
            "contentTitle": "Helogale undulata",
            "video": "http://dummyimage.com/244x240.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Foreign body in conjunctival sac, left eye"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/213x114.png/dddddd/000000",
            "duration": 8,
            "description": "Injury of cutaneous sensory nerve at forearm level"
          },
          {
            "contentTitle": "Tamiasciurus hudsonicus",
            "video": "http://dummyimage.com/211x231.png/ff4444/ffffff",
            "duration": 4,
            "description": "Displacement of ventricular intracranial shunt, sequela"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/205x190.png/cc0000/ffffff",
            "duration": 4,
            "description": "Torus fx lower end of r humerus, subs for fx w delay heal"
          },
          {
            "contentTitle": "Otaria flavescens",
            "video": "http://dummyimage.com/116x114.png/dddddd/000000",
            "duration": 7,
            "description": "Corrosion of first degree of shoulder"
          },
          {
            "contentTitle": "Antidorcas marsupialis",
            "video": "http://dummyimage.com/175x204.png/ff4444/ffffff",
            "duration": 1,
            "description": "Nondisp fx of l tibial tuberosity, 7thP"
          },
          {
            "contentTitle": "Macropus fuliginosus",
            "video": "http://dummyimage.com/160x214.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Strain of right Achilles tendon, initial encounter"
          },
          {
            "contentTitle": "Spermophilus tridecemlineatus",
            "video": "http://dummyimage.com/140x208.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Fall from snow-skis, subsequent encounter"
          },
          {
            "contentTitle": "Vanellus armatus",
            "video": "http://dummyimage.com/111x155.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Laceration with foreign body of left breast, sequela"
          }
        ]
      },
      {
        "header": "Financial Analyst",
        "totalMinutes": 94864,
        "contents": [
          {
            "contentTitle": "Sarcophilus harrisii",
            "video": "http://dummyimage.com/170x230.png/dddddd/000000",
            "duration": 5,
            "description": "Occup of 3-whl mv inj pick-up truck, pk-up/van nontraf, subs"
          },
          {
            "contentTitle": "Lamprotornis nitens",
            "video": "http://dummyimage.com/207x132.png/cc0000/ffffff",
            "duration": 10,
            "description": "Adult hypertrophic pyloric stenosis"
          },
          {
            "contentTitle": "Connochaetus taurinus",
            "video": "http://dummyimage.com/186x192.png/ff4444/ffffff",
            "duration": 9,
            "description": "Nondisp fx of r ulna styloid pro, 7thK"
          },
          {
            "contentTitle": "Redunca redunca",
            "video": "http://dummyimage.com/184x203.png/ff4444/ffffff",
            "duration": 9,
            "description": "Other chronic osteomyelitis, left radius and ulna"
          },
          {
            "contentTitle": "Orcinus orca",
            "video": "http://dummyimage.com/165x110.png/dddddd/000000",
            "duration": 4,
            "description": "Passenger in hv veh injured in clsn w ped/anml in traf, init"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/111x135.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Abrasion of vagina and vulva, initial encounter"
          },
          {
            "contentTitle": "Streptopelia senegalensis",
            "video": "http://dummyimage.com/184x143.png/ff4444/ffffff",
            "duration": 9,
            "description": "Corrosion involving larynx and trachea w lung, init encntr"
          },
          {
            "contentTitle": "Arctogalidia trivirgata",
            "video": "http://dummyimage.com/139x250.png/dddddd/000000",
            "duration": 4,
            "description": "Other recurrent depressive disorders"
          },
          {
            "contentTitle": "Felis libyca",
            "video": "http://dummyimage.com/203x195.png/cc0000/ffffff",
            "duration": 9,
            "description": "Passenger on bus injured in clsn w pedl cyc nontraf, sequela"
          },
          {
            "contentTitle": "Chordeiles minor",
            "video": "http://dummyimage.com/125x214.png/ff4444/ffffff",
            "duration": 3,
            "description": "Hypertrophy of bone"
          },
          {
            "contentTitle": "Canis lupus lycaon",
            "video": "http://dummyimage.com/114x173.png/cc0000/ffffff",
            "duration": 5,
            "description": "Poisoning by penicillins, intentional self-harm, subs encntr"
          },
          {
            "contentTitle": "Dasyurus viverrinus",
            "video": "http://dummyimage.com/127x135.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Displaced fracture of proximal phalanx of left index finger"
          },
          {
            "contentTitle": "Falco mexicanus",
            "video": "http://dummyimage.com/186x176.png/ff4444/ffffff",
            "duration": 9,
            "description": "Oth fx shaft of rad, r arm, 7thM"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/192x129.png/dddddd/000000",
            "duration": 6,
            "description": "Burn due to passenger ship on fire"
          }
        ]
      },
      {
        "header": "Civil Engineer",
        "totalMinutes": 3572,
        "contents": [
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/100x114.png/ff4444/ffffff",
            "duration": 3,
            "description": "Poisoning by unsp psychodysleptics, intentional self-harm"
          },
          {
            "contentTitle": "Merops sp.",
            "video": "http://dummyimage.com/194x173.png/ff4444/ffffff",
            "duration": 8,
            "description": "Oth fracture of left lesser toe(s), subs for fx w nonunion"
          },
          {
            "contentTitle": "Myiarchus tuberculifer",
            "video": "http://dummyimage.com/116x159.png/cc0000/ffffff",
            "duration": 2,
            "description": "Coma scale, eyes open, never, 24+hrs"
          },
          {
            "contentTitle": "Crotalus triseriatus",
            "video": "http://dummyimage.com/208x169.png/cc0000/ffffff",
            "duration": 2,
            "description": "Strain of flexor musc/fasc/tend and unsp finger at forarm lv"
          },
          {
            "contentTitle": "Ardea golieth",
            "video": "http://dummyimage.com/207x142.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Unsp injury of muscle, fascia and tendon of unsp hip, init"
          },
          {
            "contentTitle": "Mazama americana",
            "video": "http://dummyimage.com/144x108.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Heat exposure on board watercraft"
          }
        ]
      },
      {
        "header": "Assistant Media Planner",
        "totalMinutes": 66428,
        "contents": [
          {
            "contentTitle": "Ratufa indica",
            "video": "http://dummyimage.com/221x183.png/ff4444/ffffff",
            "duration": 7,
            "description": "ABO incompat reaction due to transfusion of bld/bld prod"
          },
          {
            "contentTitle": "Nannopterum harrisi",
            "video": "http://dummyimage.com/118x147.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Milt op involving unsp explosion and fragments, milt, subs"
          },
          {
            "contentTitle": "Ramphastos tucanus",
            "video": "http://dummyimage.com/137x174.png/ff4444/ffffff",
            "duration": 9,
            "description": "Elephantiasis of left eye, unspecified eyelid"
          },
          {
            "contentTitle": "Limosa haemastica",
            "video": "http://dummyimage.com/135x164.png/cc0000/ffffff",
            "duration": 10,
            "description": "Chondromalacia, left hip"
          },
          {
            "contentTitle": "Mycteria ibis",
            "video": "http://dummyimage.com/198x220.png/dddddd/000000",
            "duration": 9,
            "description": "Gout due to renal impairment, wrist"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/154x106.png/cc0000/ffffff",
            "duration": 2,
            "description": "Oth fx upr end r ulna, 7thN"
          },
          {
            "contentTitle": "Spizaetus coronatus",
            "video": "http://dummyimage.com/172x176.png/ff4444/ffffff",
            "duration": 1,
            "description": "Ocular albinism"
          },
          {
            "contentTitle": "Macropus robustus",
            "video": "http://dummyimage.com/244x200.png/cc0000/ffffff",
            "duration": 2,
            "description": "Other injury of unspecified urinary and pelvic organ"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/103x250.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Pnctr w fb of l bk wl of thorax w penet thor cavity, subs"
          }
        ]
      },
      {
        "header": "Media Manager IV",
        "totalMinutes": 85584,
        "contents": [
          {
            "contentTitle": "Felis wiedi or Leopardus weidi",
            "video": "http://dummyimage.com/120x123.png/cc0000/ffffff",
            "duration": 10,
            "description": "Irritable bowel syndrome without diarrhea"
          },
          {
            "contentTitle": "Tenrec ecaudatus",
            "video": "http://dummyimage.com/157x167.png/ff4444/ffffff",
            "duration": 8,
            "description": "Acute upper respiratory infection, unspecified"
          },
          {
            "contentTitle": "Stenella coeruleoalba",
            "video": "http://dummyimage.com/226x160.png/cc0000/ffffff",
            "duration": 7,
            "description": "Pnctr w/o fb of right lesser toe(s) w/o damage to nail, subs"
          },
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/169x245.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Rheumatic tricuspid insufficiency"
          },
          {
            "contentTitle": "Uraeginthus bengalus",
            "video": "http://dummyimage.com/120x160.png/cc0000/ffffff",
            "duration": 6,
            "description": "Laceration of ulnar artery at forearm level"
          },
          {
            "contentTitle": "Alouatta seniculus",
            "video": "http://dummyimage.com/184x245.png/cc0000/ffffff",
            "duration": 3,
            "description": "Febrile convulsions"
          },
          {
            "contentTitle": "Didelphis virginiana",
            "video": "http://dummyimage.com/220x167.png/ff4444/ffffff",
            "duration": 8,
            "description": "Fall on board other powered watercraft"
          },
          {
            "contentTitle": "Panthera tigris",
            "video": "http://dummyimage.com/242x222.png/cc0000/ffffff",
            "duration": 1,
            "description": "Tricyclic and tetracyclic antidepressants"
          },
          {
            "contentTitle": "Delphinus delphis",
            "video": "http://dummyimage.com/198x234.png/ff4444/ffffff",
            "duration": 4,
            "description": "Other sled accident, sequela"
          },
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/126x150.png/ff4444/ffffff",
            "duration": 1,
            "description": "Burn of 3rd deg mu sites of right wrist and hand, init"
          }
        ]
      },
      {
        "header": "Environmental Specialist",
        "totalMinutes": 40901,
        "contents": [
          {
            "contentTitle": "Phalacrocorax brasilianus",
            "video": "http://dummyimage.com/163x227.png/cc0000/ffffff",
            "duration": 1,
            "description": "Biotin-dependent carboxylase deficiency"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/129x135.png/cc0000/ffffff",
            "duration": 10,
            "description": "Corrosion of unspecified degree of right knee"
          },
          {
            "contentTitle": "Phoenicopterus chilensis",
            "video": "http://dummyimage.com/165x235.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Burn of third degree of right shoulder, sequela"
          },
          {
            "contentTitle": "Estrilda erythronotos",
            "video": "http://dummyimage.com/128x157.png/ff4444/ffffff",
            "duration": 9,
            "description": "Oth disp fx of sixth cervcal vert, subs for fx w delay heal"
          },
          {
            "contentTitle": "Ursus maritimus",
            "video": "http://dummyimage.com/225x136.png/dddddd/000000",
            "duration": 10,
            "description": "Strike/struck by driver side automobile airbag, subs"
          },
          {
            "contentTitle": "Motacilla aguimp",
            "video": "http://dummyimage.com/118x237.png/dddddd/000000",
            "duration": 1,
            "description": "Other fracture of unspecified lower leg, sequela"
          },
          {
            "contentTitle": "Ctenophorus ornatus",
            "video": "http://dummyimage.com/241x249.png/ff4444/ffffff",
            "duration": 7,
            "description": "Disp fx of med phalanx of l lit fngr, 7thD"
          },
          {
            "contentTitle": "Ceryle rudis",
            "video": "http://dummyimage.com/102x242.png/cc0000/ffffff",
            "duration": 8,
            "description": "Chronic lacrimal canaliculitis of right lacrimal passage"
          }
        ]
      },
      {
        "header": "Senior Financial Analyst",
        "totalMinutes": 57739,
        "contents": [
          {
            "contentTitle": "Plegadis ridgwayi",
            "video": "http://dummyimage.com/115x198.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp fx shaft of unsp ulna, 7thM"
          },
          {
            "contentTitle": "Meles meles",
            "video": "http://dummyimage.com/222x229.png/cc0000/ffffff",
            "duration": 10,
            "description": "Toxic effect of venom of tarantula, accidental, init"
          },
          {
            "contentTitle": "Felis concolor",
            "video": "http://dummyimage.com/172x234.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Exdtve age-rel mclr degn, right eye, with inact chrdl neovas"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/147x103.png/cc0000/ffffff",
            "duration": 10,
            "description": "Adverse effect of insulin and oral hypoglycemic drugs, init"
          },
          {
            "contentTitle": "Anser caerulescens",
            "video": "http://dummyimage.com/217x160.png/ff4444/ffffff",
            "duration": 1,
            "description": "Longitudinal reduction defect of left fibula"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/194x200.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Swimming-pool of nursing home as place"
          },
          {
            "contentTitle": "Odocoileus hemionus",
            "video": "http://dummyimage.com/194x191.png/ff4444/ffffff",
            "duration": 2,
            "description": "Exposure keratoconjunctivitis, left eye"
          },
          {
            "contentTitle": "Vulpes vulpes",
            "video": "http://dummyimage.com/237x200.png/dddddd/000000",
            "duration": 8,
            "description": "Laceration with foreign body of left breast, init encntr"
          },
          {
            "contentTitle": "Axis axis",
            "video": "http://dummyimage.com/182x178.png/cc0000/ffffff",
            "duration": 7,
            "description": "Adverse effect of other topical agents, sequela"
          },
          {
            "contentTitle": "Otaria flavescens",
            "video": "http://dummyimage.com/248x241.png/cc0000/ffffff",
            "duration": 5,
            "description": "Nondisp fx of proximal phalanx of right little finger"
          },
          {
            "contentTitle": "Mabuya spilogaster",
            "video": "http://dummyimage.com/153x157.png/cc0000/ffffff",
            "duration": 9,
            "description": "Malocclusion, unspecified"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/238x203.png/cc0000/ffffff",
            "duration": 9,
            "description": "Lacerat unsp musc/fasc/tend at wrs/hnd lv, unsp hand, subs"
          }
        ]
      },
      {
        "header": "Operator",
        "totalMinutes": 12083,
        "contents": [
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/232x121.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Laceration w fb of left lesser toe(s) w damage to nail, init"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/245x241.png/cc0000/ffffff",
            "duration": 4,
            "description": "Unsp car occupant injured in collision w ped/anml nontraf"
          },
          {
            "contentTitle": "Felis caracal",
            "video": "http://dummyimage.com/186x115.png/cc0000/ffffff",
            "duration": 5,
            "description": "Unsp fracture of second metacarpal bone, left hand, init"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/229x198.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Injury of pancreas"
          },
          {
            "contentTitle": "Cebus nigrivittatus",
            "video": "http://dummyimage.com/190x234.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Benign neoplasm of connective and oth soft tissue of abdomen"
          }
        ]
      },
      {
        "header": "VP Accounting",
        "totalMinutes": 78348,
        "contents": [
          {
            "contentTitle": "Ceratotherium simum",
            "video": "http://dummyimage.com/208x143.png/ff4444/ffffff",
            "duration": 5,
            "description": "Disp fx of medial phalanx of right index finger, sequela"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/169x176.png/ff4444/ffffff",
            "duration": 10,
            "description": "Fx unsp metatarsal bone(s), unsp ft, subs for fx w malunion"
          },
          {
            "contentTitle": "Sceloporus magister",
            "video": "http://dummyimage.com/133x227.png/cc0000/ffffff",
            "duration": 9,
            "description": "Burn unsp degree of single r finger except thumb, init"
          },
          {
            "contentTitle": "Ara chloroptera",
            "video": "http://dummyimage.com/111x181.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Other developmental disorders of scholastic skills"
          },
          {
            "contentTitle": "Larus novaehollandiae",
            "video": "http://dummyimage.com/124x138.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Cellulitis and acute lymphangitis, unspecified"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/204x139.png/dddddd/000000",
            "duration": 1,
            "description": "Toxic effect of unspecified pesticide, assault"
          },
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/113x222.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Disp fx of epiphy (separation) (upper) of r femr, 7thJ"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/176x134.png/ff4444/ffffff",
            "duration": 9,
            "description": "Passenger in hv veh injured in collision w hv veh nontraf"
          },
          {
            "contentTitle": "Marmota caligata",
            "video": "http://dummyimage.com/116x241.png/ff4444/ffffff",
            "duration": 7,
            "description": "Inj unsp musc/fasc/tend at wrs/hnd lv, left hand, init"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/149x105.png/dddddd/000000",
            "duration": 10,
            "description": "Complications specific to multiple gestation"
          },
          {
            "contentTitle": "Acrantophis madagascariensis",
            "video": "http://dummyimage.com/210x155.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Inj unsp blood vess at hip and thi lev, right leg, sequela"
          },
          {
            "contentTitle": "Macaca mulatta",
            "video": "http://dummyimage.com/159x151.png/ff4444/ffffff",
            "duration": 7,
            "description": "Oth fx shaft of r fibula, subs for clos fx w nonunion"
          },
          {
            "contentTitle": "Chordeiles minor",
            "video": "http://dummyimage.com/174x243.png/ff4444/ffffff",
            "duration": 8,
            "description": "Contact with other nonvenomous amphibians, initial encounter"
          },
          {
            "contentTitle": "Carduelis pinus",
            "video": "http://dummyimage.com/169x232.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Subluxation of proximal interphaln joint of r little finger"
          }
        ]
      },
      {
        "header": "Environmental Tech",
        "totalMinutes": 88490,
        "contents": [
          {
            "contentTitle": "Oryx gazella callotis",
            "video": "http://dummyimage.com/245x117.png/dddddd/000000",
            "duration": 6,
            "description": "Toxic effect of nitrogen oxides, intentional self-harm, subs"
          },
          {
            "contentTitle": "Sceloporus magister",
            "video": "http://dummyimage.com/242x174.png/cc0000/ffffff",
            "duration": 6,
            "description": "Partial loss of ear ossicles"
          },
          {
            "contentTitle": "Mabuya spilogaster",
            "video": "http://dummyimage.com/227x210.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Burn of unsp degree of left hand, unspecified site, sequela"
          },
          {
            "contentTitle": "Amazona sp.",
            "video": "http://dummyimage.com/247x240.png/ff4444/ffffff",
            "duration": 5,
            "description": "Unsp fx shaft of unsp tibia, 7thR"
          },
          {
            "contentTitle": "Notechis semmiannulatus",
            "video": "http://dummyimage.com/201x166.png/dddddd/000000",
            "duration": 10,
            "description": "Lac w/o fb of abd wl, periumb rgn w/o penet perit cav, subs"
          },
          {
            "contentTitle": "Macaca mulatta",
            "video": "http://dummyimage.com/204x248.png/ff4444/ffffff",
            "duration": 1,
            "description": "Torus fracture of lower end of left fibula, sequela"
          },
          {
            "contentTitle": "Felis yagouaroundi",
            "video": "http://dummyimage.com/104x150.png/cc0000/ffffff",
            "duration": 7,
            "description": "Oth parlyt synd fol ntrm subarach hemor aff left dom side"
          }
        ]
      },
      {
        "header": "VP Marketing",
        "totalMinutes": 79902,
        "contents": [
          {
            "contentTitle": "Balearica pavonina",
            "video": "http://dummyimage.com/211x191.png/cc0000/ffffff",
            "duration": 2,
            "description": "Malignant ascites"
          },
          {
            "contentTitle": "Macropus rufus",
            "video": "http://dummyimage.com/187x167.png/ff4444/ffffff",
            "duration": 10,
            "description": "Unsp trochan fx unsp femr, 7thQ"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/100x122.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Laceration with foreign body, unspecified ankle, init encntr"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/107x116.png/dddddd/000000",
            "duration": 10,
            "description": "Pain in joints of left hand"
          },
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/164x152.png/ff4444/ffffff",
            "duration": 1,
            "description": "War op involving fragments from weapons, civilian, init"
          },
          {
            "contentTitle": "Equus hemionus",
            "video": "http://dummyimage.com/181x145.png/dddddd/000000",
            "duration": 1,
            "description": "Other specified osteochondropathies of hand"
          },
          {
            "contentTitle": "Macaca radiata",
            "video": "http://dummyimage.com/203x175.png/dddddd/000000",
            "duration": 3,
            "description": "Burn of unspecified degree of left wrist, sequela"
          },
          {
            "contentTitle": "Cathartes aura",
            "video": "http://dummyimage.com/241x111.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Malignant carcinoid tumor of the sm int, unsp portion"
          },
          {
            "contentTitle": "Madoqua kirkii",
            "video": "http://dummyimage.com/185x166.png/ff4444/ffffff",
            "duration": 7,
            "description": "Rheumatoid polyneurop w rheumatoid arthritis of left hand"
          },
          {
            "contentTitle": "Lamprotornis nitens",
            "video": "http://dummyimage.com/222x240.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Arthropathies in oth diseases classd elswhr, left ank/ft"
          }
        ]
      },
      {
        "header": "Director of Sales",
        "totalMinutes": 8382,
        "contents": [
          {
            "contentTitle": "Gazella granti",
            "video": "http://dummyimage.com/104x214.png/ff4444/ffffff",
            "duration": 3,
            "description": "Osteolysis, left thigh"
          },
          {
            "contentTitle": "Suricata suricatta",
            "video": "http://dummyimage.com/153x230.png/dddddd/000000",
            "duration": 3,
            "description": "Oth specific joint derangements of right ankle, NEC"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/139x184.png/dddddd/000000",
            "duration": 10,
            "description": "Erosion of other implanted mesh to organ or tissue, init"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/103x243.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Disp fx of r ulna styloid pro, 7thR"
          },
          {
            "contentTitle": "Alectura lathami",
            "video": "http://dummyimage.com/175x129.png/cc0000/ffffff",
            "duration": 4,
            "description": "Corros unsp deg of unsp site left low limb, ex ank/ft, subs"
          },
          {
            "contentTitle": "Grus rubicundus",
            "video": "http://dummyimage.com/132x105.png/cc0000/ffffff",
            "duration": 1,
            "description": "Poisn by oth prim sys and hematolog agents, slf-hrm, subs"
          },
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/145x162.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Acute embolism and thrombosis of unspecified vein"
          },
          {
            "contentTitle": "Leptoptilus dubius",
            "video": "http://dummyimage.com/214x162.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other mechanical complication of permanent sutures, sequela"
          },
          {
            "contentTitle": "Fregata magnificans",
            "video": "http://dummyimage.com/139x141.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Disp fx of anterior process of right calcaneus, sequela"
          },
          {
            "contentTitle": "Phylurus milli",
            "video": "http://dummyimage.com/183x134.png/cc0000/ffffff",
            "duration": 7,
            "description": "Corros unsp deg mult right fngr (nail), not inc thumb, sqla"
          },
          {
            "contentTitle": "Ictonyx striatus",
            "video": "http://dummyimage.com/217x153.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp intracranial injury without loss of consciousness"
          },
          {
            "contentTitle": "Nannopterum harrisi",
            "video": "http://dummyimage.com/169x234.png/dddddd/000000",
            "duration": 4,
            "description": "Struck by nonvenomous lizards"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/156x134.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Occupant (driver) of hv veh injured in oth transport acc"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/215x114.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Inj unsp musc/fasc/tend at forearm level, left arm, sequela"
          },
          {
            "contentTitle": "Nasua nasua",
            "video": "http://dummyimage.com/237x203.png/dddddd/000000",
            "duration": 2,
            "description": "Lacerat extn musc/fasc/tend l idx fngr at forarm lv, init"
          },
          {
            "contentTitle": "Pseudocheirus peregrinus",
            "video": "http://dummyimage.com/185x169.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Displ transverse fx shaft of r fibula, 7thR"
          }
        ]
      },
      {
        "header": "Technical Writer",
        "totalMinutes": 52295,
        "contents": [
          {
            "contentTitle": "Aegypius occipitalis",
            "video": "http://dummyimage.com/210x115.png/cc0000/ffffff",
            "duration": 5,
            "description": "Oth injury due to oth accident to inflatbl crft, sequela"
          },
          {
            "contentTitle": "Oncorhynchus nerka",
            "video": "http://dummyimage.com/207x154.png/cc0000/ffffff",
            "duration": 4,
            "description": "Cannabis related disorders"
          },
          {
            "contentTitle": "Priodontes maximus",
            "video": "http://dummyimage.com/211x219.png/cc0000/ffffff",
            "duration": 1,
            "description": "Unsp fx the low end l rad, 7thN"
          },
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/206x243.png/cc0000/ffffff",
            "duration": 7,
            "description": "Displ commnt fx shaft of l fibula, 7thP"
          },
          {
            "contentTitle": "Cervus unicolor",
            "video": "http://dummyimage.com/149x153.png/ff4444/ffffff",
            "duration": 10,
            "description": "Bucket-hndl tear of medial mensc, crnt inj, unsp knee, init"
          },
          {
            "contentTitle": "Trachyphonus vaillantii",
            "video": "http://dummyimage.com/137x126.png/ff4444/ffffff",
            "duration": 2,
            "description": "Type 1 diab w severe nonprlf diab rtnop w/o macular edema"
          },
          {
            "contentTitle": "Taurotagus oryx",
            "video": "http://dummyimage.com/190x214.png/ff4444/ffffff",
            "duration": 7,
            "description": "Acute infection fol tranfs,infusn,inject blood/products"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/114x217.png/dddddd/000000",
            "duration": 8,
            "description": "Adverse effect of androgens and anabolic congeners, subs"
          },
          {
            "contentTitle": "Ovis dalli stonei",
            "video": "http://dummyimage.com/243x100.png/ff4444/ffffff",
            "duration": 7,
            "description": "Sublux of proximal interphaln joint of r little finger, subs"
          },
          {
            "contentTitle": "Ceryle rudis",
            "video": "http://dummyimage.com/107x153.png/ff4444/ffffff",
            "duration": 9,
            "description": "Lac w/o fb of abd wall, l upr q w/o penet perit cav, init"
          },
          {
            "contentTitle": "Plegadis falcinellus",
            "video": "http://dummyimage.com/149x171.png/ff4444/ffffff",
            "duration": 6,
            "description": "Other physeal fracture of phalanx of unspecified toe, 7thG"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/190x141.png/ff4444/ffffff",
            "duration": 1,
            "description": "Acute reactive otitis externa"
          },
          {
            "contentTitle": "Dasypus septemcincus",
            "video": "http://dummyimage.com/188x188.png/dddddd/000000",
            "duration": 1,
            "description": "Displ artic fx head of r femur, init for opn fx type 3A/B/C"
          }
        ]
      },
      {
        "header": "Programmer II",
        "totalMinutes": 50439,
        "contents": [
          {
            "contentTitle": "Merops nubicus",
            "video": "http://dummyimage.com/121x170.png/dddddd/000000",
            "duration": 4,
            "description": "Osteonecrosis due to previous trauma of right carpus"
          },
          {
            "contentTitle": "Mabuya spilogaster",
            "video": "http://dummyimage.com/156x220.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Displ seg fx shaft of l femr, 7thE"
          },
          {
            "contentTitle": "Hystrix indica",
            "video": "http://dummyimage.com/169x202.png/dddddd/000000",
            "duration": 9,
            "description": "Sprain of jaw, left side, subsequent encounter"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/102x219.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Intentional self-harm by drowning and submersion, unsp"
          },
          {
            "contentTitle": "Macaca radiata",
            "video": "http://dummyimage.com/116x199.png/cc0000/ffffff",
            "duration": 6,
            "description": "Displ oblique fx shaft of r tibia, 7thC"
          },
          {
            "contentTitle": "Hyaena brunnea",
            "video": "http://dummyimage.com/148x200.png/cc0000/ffffff",
            "duration": 9,
            "description": "Drug-induced gout, left wrist"
          },
          {
            "contentTitle": "Notechis semmiannulatus",
            "video": "http://dummyimage.com/174x212.png/ff4444/ffffff",
            "duration": 3,
            "description": "Labor and del comp by cord around neck, w/o comprsn, fetus 2"
          },
          {
            "contentTitle": "Recurvirostra avosetta",
            "video": "http://dummyimage.com/123x116.png/ff4444/ffffff",
            "duration": 10,
            "description": "Oth fx shaft of unsp tibia, 7thM"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/133x150.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Displ subtrochnt fx r femr, 7thM"
          },
          {
            "contentTitle": "Suricata suricatta",
            "video": "http://dummyimage.com/227x156.png/cc0000/ffffff",
            "duration": 7,
            "description": "Disp fx of head of unsp radius, init for clos fx"
          },
          {
            "contentTitle": "Larus novaehollandiae",
            "video": "http://dummyimage.com/115x155.png/ff4444/ffffff",
            "duration": 10,
            "description": "Unsp superficial injury of unspecified upper arm, sequela"
          },
          {
            "contentTitle": "Felis rufus",
            "video": "http://dummyimage.com/118x227.png/cc0000/ffffff",
            "duration": 3,
            "description": "Disloc of interphaln joint of left lesser toe(s), sequela"
          }
        ]
      }
    ]
  },
  {
    "title": "My Left Foot",
    "subject": "Sales",
    "instructorName": "Rodin Salem",
    "price": 2033.43,
    "level": "Advanced",
    "courseHours": 104,
    "summary": "Unequal limb length (acquired), left tibia",
    "subtitles": [
      {
        "header": "Project Manager",
        "totalMinutes": 23469,
        "contents": [
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/137x160.png/dddddd/000000",
            "duration": 4,
            "description": "Other spacecraft accident injuring occupant, sequela"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/146x196.png/ff4444/ffffff",
            "duration": 7,
            "description": "Oth physl fx low end humer, r arm, subs for fx w delay heal"
          },
          {
            "contentTitle": "Uraeginthus bengalus",
            "video": "http://dummyimage.com/213x220.png/ff4444/ffffff",
            "duration": 9,
            "description": "Nondisp suprcndl fx w intrcndl extn low end l femr, 7thM"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/183x157.png/cc0000/ffffff",
            "duration": 5,
            "description": "Adverse effect of unspecified psychodysleptics, subs encntr"
          },
          {
            "contentTitle": "Passer domesticus",
            "video": "http://dummyimage.com/189x138.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Unspecified injury of thoracic aorta, sequela"
          }
        ]
      },
      {
        "header": "Human Resources Manager",
        "totalMinutes": 74530,
        "contents": [
          {
            "contentTitle": "Dasyurus viverrinus",
            "video": "http://dummyimage.com/119x223.png/cc0000/ffffff",
            "duration": 1,
            "description": "Malignant neoplasm of right round ligament"
          },
          {
            "contentTitle": "Laniarius ferrugineus",
            "video": "http://dummyimage.com/226x196.png/ff4444/ffffff",
            "duration": 8,
            "description": "Burn of unspecified degree of unspecified ankle, subs encntr"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/224x149.png/ff4444/ffffff",
            "duration": 1,
            "description": "Chronic laryngotracheitis"
          },
          {
            "contentTitle": "Felis yagouaroundi",
            "video": "http://dummyimage.com/204x125.png/ff4444/ffffff",
            "duration": 3,
            "description": "Displaced fracture of shaft of unspecified metacarpal bone"
          },
          {
            "contentTitle": "Francolinus coqui",
            "video": "http://dummyimage.com/160x124.png/cc0000/ffffff",
            "duration": 5,
            "description": "Acne vulgaris"
          },
          {
            "contentTitle": "Eunectes sp.",
            "video": "http://dummyimage.com/229x151.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Accidental malfunction of gas, air or sprng-op gun, sequela"
          },
          {
            "contentTitle": "Gymnorhina tibicen",
            "video": "http://dummyimage.com/179x153.png/dddddd/000000",
            "duration": 5,
            "description": "Superficial frostbite of left finger(s), subs encntr"
          },
          {
            "contentTitle": "Dasyurus viverrinus",
            "video": "http://dummyimage.com/239x155.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp injury of musc/fasc/tend at thi lev, right thigh, init"
          },
          {
            "contentTitle": "Francolinus leucoscepus",
            "video": "http://dummyimage.com/103x111.png/dddddd/000000",
            "duration": 5,
            "description": "Chronic myeloid leukemia, BCR/ABL-positive, in remission"
          },
          {
            "contentTitle": "Tetracerus quadricornis",
            "video": "http://dummyimage.com/126x184.png/dddddd/000000",
            "duration": 4,
            "description": "Unspecified injury of dorsal artery of right foot"
          },
          {
            "contentTitle": "Mycteria ibis",
            "video": "http://dummyimage.com/118x180.png/dddddd/000000",
            "duration": 6,
            "description": "Adverse effect of selective seroton/norepineph reup inhibtr"
          },
          {
            "contentTitle": "Alcelaphus buselaphus caama",
            "video": "http://dummyimage.com/135x164.png/dddddd/000000",
            "duration": 9,
            "description": "Family history of carrier of genetic disease"
          },
          {
            "contentTitle": "Eudromia elegans",
            "video": "http://dummyimage.com/119x220.png/dddddd/000000",
            "duration": 4,
            "description": "Unspecified dislocation of left sternoclavicular joint"
          },
          {
            "contentTitle": "Ictonyx striatus",
            "video": "http://dummyimage.com/136x202.png/dddddd/000000",
            "duration": 9,
            "description": "Adverse effect of local astringents/detergents, init"
          }
        ]
      },
      {
        "header": "Operator",
        "totalMinutes": 70128,
        "contents": [
          {
            "contentTitle": "Didelphis virginiana",
            "video": "http://dummyimage.com/149x196.png/ff4444/ffffff",
            "duration": 7,
            "description": "Unsp inj blood vessels at lower leg level, unsp leg, init"
          },
          {
            "contentTitle": "Leprocaulinus vipera",
            "video": "http://dummyimage.com/141x242.png/cc0000/ffffff",
            "duration": 7,
            "description": "Degenerative and vascular disorders of ear"
          },
          {
            "contentTitle": "Dendrohyrax brucel",
            "video": "http://dummyimage.com/165x178.png/cc0000/ffffff",
            "duration": 1,
            "description": "Osteomyelitis of vertebra, site unspecified"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/101x115.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Minor lacerat great saph at hip and thi lev, right leg, sqla"
          },
          {
            "contentTitle": "Lamprotornis chalybaeus",
            "video": "http://dummyimage.com/183x146.png/dddddd/000000",
            "duration": 10,
            "description": "Spina bifida, unspecified"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/205x180.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Intervertebral disc stenosis of neural canal of low extrm"
          },
          {
            "contentTitle": "Terrapene carolina",
            "video": "http://dummyimage.com/145x164.png/dddddd/000000",
            "duration": 3,
            "description": "Greenstick fracture of shaft of left ulna"
          }
        ]
      },
      {
        "header": "Compensation Analyst",
        "totalMinutes": 22129,
        "contents": [
          {
            "contentTitle": "Plegadis ridgwayi",
            "video": "http://dummyimage.com/146x225.png/ff4444/ffffff",
            "duration": 10,
            "description": "Acute Eustachian salpingitis"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/244x150.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Unsp injury of blood vessel of right ring finger, subs"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/193x159.png/cc0000/ffffff",
            "duration": 7,
            "description": "Term delivery with preterm labor, second trimester"
          },
          {
            "contentTitle": "Mungos mungo",
            "video": "http://dummyimage.com/153x163.png/ff4444/ffffff",
            "duration": 8,
            "description": "Carcinoma in situ of anus and anal canal"
          },
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/232x102.png/dddddd/000000",
            "duration": 1,
            "description": "Displ oblique fx shaft of r tibia, 7thF"
          },
          {
            "contentTitle": "Thylogale stigmatica",
            "video": "http://dummyimage.com/210x226.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Ped on foot injured in collision w nonmtr vehicle, unsp"
          },
          {
            "contentTitle": "Limnocorax flavirostra",
            "video": "http://dummyimage.com/149x209.png/dddddd/000000",
            "duration": 7,
            "description": "Other contact with other rodent"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/176x215.png/ff4444/ffffff",
            "duration": 9,
            "description": "Hypermobility syndrome"
          },
          {
            "contentTitle": "Milvus migrans",
            "video": "http://dummyimage.com/176x227.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Other mycobacterial infections"
          },
          {
            "contentTitle": "Laniarius ferrugineus",
            "video": "http://dummyimage.com/165x193.png/dddddd/000000",
            "duration": 6,
            "description": "Burn of first degree of male genital region"
          },
          {
            "contentTitle": "Suricata suricatta",
            "video": "http://dummyimage.com/225x214.png/ff4444/ffffff",
            "duration": 2,
            "description": "Displ commnt fx shaft of r tibia, 7thC"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/249x150.png/dddddd/000000",
            "duration": 10,
            "description": "Unspecified larger firearm discharge, undetermined intent"
          },
          {
            "contentTitle": "Microcebus murinus",
            "video": "http://dummyimage.com/250x144.png/cc0000/ffffff",
            "duration": 3,
            "description": "Disp fx of dist phalanx of r lit fngr, 7thG"
          },
          {
            "contentTitle": "Damaliscus lunatus",
            "video": "http://dummyimage.com/145x100.png/cc0000/ffffff",
            "duration": 8,
            "description": "Unspecified aircraft accident injuring occupant, sequela"
          },
          {
            "contentTitle": "Nasua nasua",
            "video": "http://dummyimage.com/249x198.png/dddddd/000000",
            "duration": 9,
            "description": "Unspecified transfusion reaction, initial encounter"
          }
        ]
      },
      {
        "header": "Help Desk Technician",
        "totalMinutes": 77276,
        "contents": [
          {
            "contentTitle": "Semnopithecus entellus",
            "video": "http://dummyimage.com/169x240.png/cc0000/ffffff",
            "duration": 6,
            "description": "Inj oth blood vessels at ank/ft level, right leg, init"
          },
          {
            "contentTitle": "Laniaurius atrococcineus",
            "video": "http://dummyimage.com/171x246.png/cc0000/ffffff",
            "duration": 2,
            "description": "Inhalant dependence with inhalant-induced anxiety disorder"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/223x137.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Mtrcy pasngr injured in clsn w nonmtr vehicle nontraf, subs"
          },
          {
            "contentTitle": "Pandon haliaetus",
            "video": "http://dummyimage.com/233x164.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Infection and inflammatory reaction due to urinary catheter"
          },
          {
            "contentTitle": "Castor canadensis",
            "video": "http://dummyimage.com/203x113.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Displ commnt fx shaft of r femr, 7thQ"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/106x132.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Unspecified superficial injury of right wrist, subs encntr"
          },
          {
            "contentTitle": "Phalaropus fulicarius",
            "video": "http://dummyimage.com/101x221.png/dddddd/000000",
            "duration": 7,
            "description": "Toxic effect of contact w oth venom animals, asslt, sequela"
          },
          {
            "contentTitle": "Coracias caudata",
            "video": "http://dummyimage.com/138x166.png/dddddd/000000",
            "duration": 5,
            "description": "Person injured in collision betw rail trn/veh and car, init"
          },
          {
            "contentTitle": "Mirounga angustirostris",
            "video": "http://dummyimage.com/226x120.png/dddddd/000000",
            "duration": 8,
            "description": "Stress fracture, left ulna"
          },
          {
            "contentTitle": "Bucorvus leadbeateri",
            "video": "http://dummyimage.com/156x113.png/ff4444/ffffff",
            "duration": 7,
            "description": "Oth paralytic syndrome following ntrm intcrbl hemorrhage"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/233x148.png/cc0000/ffffff",
            "duration": 2,
            "description": "Hyp hrt and chr kdny dis w/o hrt fail, w stg 5 chr kdny/ESRD"
          },
          {
            "contentTitle": "Lepilemur rufescens",
            "video": "http://dummyimage.com/226x133.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Other acanthamebic disease"
          }
        ]
      },
      {
        "header": "Programmer Analyst III",
        "totalMinutes": 30801,
        "contents": [
          {
            "contentTitle": "Megaderma spasma",
            "video": "http://dummyimage.com/173x193.png/dddddd/000000",
            "duration": 5,
            "description": "Dislocation of other parts of right shoulder girdle, sequela"
          },
          {
            "contentTitle": "Macropus eugenii",
            "video": "http://dummyimage.com/191x138.png/cc0000/ffffff",
            "duration": 3,
            "description": "Nondisp fx of proximal phalanx of l little finger, sequela"
          },
          {
            "contentTitle": "Bugeranus caruncalatus",
            "video": "http://dummyimage.com/244x154.png/ff4444/ffffff",
            "duration": 5,
            "description": "Displ transverse fx shaft of l fibula, 7thK"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/153x129.png/cc0000/ffffff",
            "duration": 9,
            "description": "Expulsive choroidal hemorrhage, left eye"
          },
          {
            "contentTitle": "Pelecanus conspicillatus",
            "video": "http://dummyimage.com/229x164.png/ff4444/ffffff",
            "duration": 1,
            "description": "Laceration with foreign body of left wrist, subs encntr"
          },
          {
            "contentTitle": "Felis yagouaroundi",
            "video": "http://dummyimage.com/112x210.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Disp fx of neck of right talus, subs for fx w delay heal"
          },
          {
            "contentTitle": "Corythornis cristata",
            "video": "http://dummyimage.com/115x132.png/cc0000/ffffff",
            "duration": 3,
            "description": "Other specified injury of dorsal artery of unspecified foot"
          },
          {
            "contentTitle": "Callorhinus ursinus",
            "video": "http://dummyimage.com/159x207.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Unsp fx r low leg, subs for opn fx type 3A/B/C w malunion"
          },
          {
            "contentTitle": "Crotalus cerastes",
            "video": "http://dummyimage.com/137x156.png/cc0000/ffffff",
            "duration": 4,
            "description": "Burn due to other unpowered watercraft on fire, subs encntr"
          },
          {
            "contentTitle": "Procyon cancrivorus",
            "video": "http://dummyimage.com/247x206.png/cc0000/ffffff",
            "duration": 4,
            "description": "Driver of pk-up/van inj in clsn w ped/anml nontraf, sequela"
          },
          {
            "contentTitle": "Anas bahamensis",
            "video": "http://dummyimage.com/240x143.png/dddddd/000000",
            "duration": 4,
            "description": "Prolonged gestation of newborn"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/232x128.png/dddddd/000000",
            "duration": 4,
            "description": "Laceration of radial artery at wrs/hnd lv of right arm, init"
          },
          {
            "contentTitle": "Dromaeus novaehollandiae",
            "video": "http://dummyimage.com/237x142.png/ff4444/ffffff",
            "duration": 10,
            "description": "Benign neoplasm of heart"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/101x101.png/ff4444/ffffff",
            "duration": 8,
            "description": "Unspecified open wound of shoulder"
          },
          {
            "contentTitle": "Pycnonotus barbatus",
            "video": "http://dummyimage.com/138x200.png/cc0000/ffffff",
            "duration": 10,
            "description": "Acute vulvitis"
          },
          {
            "contentTitle": "Chamaelo sp.",
            "video": "http://dummyimage.com/116x191.png/dddddd/000000",
            "duration": 10,
            "description": "Exposure to radioactive isotopes, sequela"
          },
          {
            "contentTitle": "Ratufa indica",
            "video": "http://dummyimage.com/133x130.png/ff4444/ffffff",
            "duration": 10,
            "description": "Disp fx of less trochanter of r femr, 7thG"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/135x187.png/ff4444/ffffff",
            "duration": 8,
            "description": "Bariatric surgery status comp pregnancy, second trimester"
          },
          {
            "contentTitle": "Streptopelia senegalensis",
            "video": "http://dummyimage.com/225x244.png/dddddd/000000",
            "duration": 1,
            "description": "Poisn by crbnc-anhydr inhibtr,benzo/oth diuretc, undet, sqla"
          },
          {
            "contentTitle": "Cyrtodactylus louisiadensis",
            "video": "http://dummyimage.com/244x213.png/ff4444/ffffff",
            "duration": 9,
            "description": "Unsp fx upr end unsp tibia, 7thN"
          }
        ]
      },
      {
        "header": "Data Coordiator",
        "totalMinutes": 51911,
        "contents": [
          {
            "contentTitle": "Vanessa indica",
            "video": "http://dummyimage.com/187x230.png/cc0000/ffffff",
            "duration": 9,
            "description": "Oth abnormal findings in specimens from resp org/thrx"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/124x156.png/ff4444/ffffff",
            "duration": 6,
            "description": "Drown due to fall/jump fr oth burning unpowered watercraft"
          },
          {
            "contentTitle": "Zalophus californicus",
            "video": "http://dummyimage.com/229x162.png/cc0000/ffffff",
            "duration": 9,
            "description": "Fracture of manubrium"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/128x106.png/ff4444/ffffff",
            "duration": 8,
            "description": "Superficial foreign body, unspecified great toe, init encntr"
          }
        ]
      },
      {
        "header": "VP Product Management",
        "totalMinutes": 34385,
        "contents": [
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/128x249.png/dddddd/000000",
            "duration": 5,
            "description": "Occup of 3-whl mv inj pk-up truck, pk-up/van in traf, sqla"
          },
          {
            "contentTitle": "Ploceus rubiginosus",
            "video": "http://dummyimage.com/209x200.png/dddddd/000000",
            "duration": 4,
            "description": "Perinatal intestinal perforation"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/151x208.png/dddddd/000000",
            "duration": 5,
            "description": "Congenital sacral dimple"
          },
          {
            "contentTitle": "Dasyprocta leporina",
            "video": "http://dummyimage.com/133x100.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Unsp injury of ulnar artery at forearm level, unsp arm, init"
          },
          {
            "contentTitle": "Mellivora capensis",
            "video": "http://dummyimage.com/147x132.png/ff4444/ffffff",
            "duration": 10,
            "description": "Oth disrd of amniotic fluid and membrns, second tri, fetus 4"
          },
          {
            "contentTitle": "Naja sp.",
            "video": "http://dummyimage.com/238x102.png/ff4444/ffffff",
            "duration": 4,
            "description": "Benign neoplasm of ascending colon"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/148x207.png/ff4444/ffffff",
            "duration": 3,
            "description": "Oth physl fx lower end of l tibia, subs for fx w routn heal"
          },
          {
            "contentTitle": "Lepilemur rufescens",
            "video": "http://dummyimage.com/105x150.png/dddddd/000000",
            "duration": 6,
            "description": "Poisoning by otorhino drugs and prep, undetermined, sequela"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/236x125.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Toxic effect of venom of centipede/millipede, undet, sequela"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/230x169.png/dddddd/000000",
            "duration": 5,
            "description": "Erosion of other prosth matrl to surrnd org/tiss, sequela"
          }
        ]
      },
      {
        "header": "Computer Systems Analyst III",
        "totalMinutes": 43303,
        "contents": [
          {
            "contentTitle": "Axis axis",
            "video": "http://dummyimage.com/142x195.png/cc0000/ffffff",
            "duration": 6,
            "description": "Insect bite (nonvenomous), right foot, initial encounter"
          },
          {
            "contentTitle": "Tragelaphus strepsiceros",
            "video": "http://dummyimage.com/144x222.png/cc0000/ffffff",
            "duration": 7,
            "description": "Displaced transcondylar fracture of right humerus, sequela"
          },
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/146x225.png/cc0000/ffffff",
            "duration": 9,
            "description": "Toxic effect of contact w oth venomous plant, acc, subs"
          },
          {
            "contentTitle": "Bugeranus caruncalatus",
            "video": "http://dummyimage.com/102x153.png/cc0000/ffffff",
            "duration": 5,
            "description": "Fibroadenosis of breast"
          },
          {
            "contentTitle": "Ratufa indica",
            "video": "http://dummyimage.com/133x130.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Driver of hv veh injured in collision w oth mv in traf, subs"
          },
          {
            "contentTitle": "Phalaropus lobatus",
            "video": "http://dummyimage.com/181x181.png/dddddd/000000",
            "duration": 10,
            "description": "Hemiplga following oth cerebvasc disease affecting unsp side"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/205x173.png/cc0000/ffffff",
            "duration": 9,
            "description": "Athscl autol vein bypass of the left leg w ulcer of calf"
          },
          {
            "contentTitle": "Hippotragus equinus",
            "video": "http://dummyimage.com/193x246.png/dddddd/000000",
            "duration": 8,
            "description": "Adverse effect of coronary vasodilators, subs encntr"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/211x215.png/cc0000/ffffff",
            "duration": 2,
            "description": "Direct infct of ank/ft in infec/parastc dis classd elswhr"
          },
          {
            "contentTitle": "Ara chloroptera",
            "video": "http://dummyimage.com/158x162.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Nondisp segmental fx shaft of radius, unsp arm, sequela"
          },
          {
            "contentTitle": "Isoodon obesulus",
            "video": "http://dummyimage.com/139x139.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Placentitis, second trimester, fetus 1"
          },
          {
            "contentTitle": "Cygnus buccinator",
            "video": "http://dummyimage.com/228x197.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Salmonella with other localized infection"
          },
          {
            "contentTitle": "Pseudocheirus peregrinus",
            "video": "http://dummyimage.com/131x191.png/dddddd/000000",
            "duration": 2,
            "description": "Medial dislocation of right ulnohumeral joint, init encntr"
          }
        ]
      },
      {
        "header": "Assistant Media Planner",
        "totalMinutes": 73544,
        "contents": [
          {
            "contentTitle": "Bugeranus caruncalatus",
            "video": "http://dummyimage.com/117x181.png/ff4444/ffffff",
            "duration": 3,
            "description": "Resistance to antiviral drug(s)"
          },
          {
            "contentTitle": "Chionis alba",
            "video": "http://dummyimage.com/105x189.png/cc0000/ffffff",
            "duration": 1,
            "description": "Burn of second degree of neck, initial encounter"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/200x160.png/ff4444/ffffff",
            "duration": 2,
            "description": "Poisoning by phenothiazine antipsychot/neurolept, self-harm"
          },
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/105x164.png/cc0000/ffffff",
            "duration": 4,
            "description": "Laceration with foreign body of oth part of neck, sequela"
          },
          {
            "contentTitle": "Ictalurus furcatus",
            "video": "http://dummyimage.com/113x201.png/ff4444/ffffff",
            "duration": 5,
            "description": "Toxic effect of venom of Australian snake, accidental, subs"
          },
          {
            "contentTitle": "Grus antigone",
            "video": "http://dummyimage.com/248x219.png/dddddd/000000",
            "duration": 2,
            "description": "Acute post multifoc placoid pigment epitheliopathy, unsp eye"
          },
          {
            "contentTitle": "Corvus brachyrhynchos",
            "video": "http://dummyimage.com/140x164.png/ff4444/ffffff",
            "duration": 6,
            "description": "Open bite of unspecified upper arm, subsequent encounter"
          }
        ]
      },
      {
        "header": "Software Consultant",
        "totalMinutes": 65213,
        "contents": [
          {
            "contentTitle": "Mustela nigripes",
            "video": "http://dummyimage.com/174x165.png/ff4444/ffffff",
            "duration": 3,
            "description": "Displ osteochon fx unsp patella, 7thN"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/117x209.png/dddddd/000000",
            "duration": 7,
            "description": "Strain of flexor musc/fasc/tend at forarm lv, unsp arm, init"
          },
          {
            "contentTitle": "Rhabdomys pumilio",
            "video": "http://dummyimage.com/156x164.png/dddddd/000000",
            "duration": 3,
            "description": "Pathological fracture, unsp shoulder, subs for fx w malunion"
          },
          {
            "contentTitle": "Anas punctata",
            "video": "http://dummyimage.com/234x114.png/cc0000/ffffff",
            "duration": 8,
            "description": "Disp fx of epiphysis (separation) (upper) of left femur"
          },
          {
            "contentTitle": "Buteo galapagoensis",
            "video": "http://dummyimage.com/195x238.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp open wound of unspecified part of thorax, subs encntr"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/220x106.png/ff4444/ffffff",
            "duration": 1,
            "description": "Oth traum nondisp spondylolysis of 7th cervcal vert, 7thD"
          },
          {
            "contentTitle": "Physignathus cocincinus",
            "video": "http://dummyimage.com/131x249.png/cc0000/ffffff",
            "duration": 5,
            "description": "Blister of unsp eyelid and periocular area, sequela"
          },
          {
            "contentTitle": "Macropus robustus",
            "video": "http://dummyimage.com/220x169.png/ff4444/ffffff",
            "duration": 9,
            "description": "Activity, underwater diving and snorkeling"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/208x172.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Toxic effect of other seafood, assault"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/147x221.png/ff4444/ffffff",
            "duration": 3,
            "description": "Cerebral infrc due to unsp occls or stenosis of carotid art"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/237x244.png/dddddd/000000",
            "duration": 1,
            "description": "Exposure to sofa fire due to other burning material"
          },
          {
            "contentTitle": "Spermophilus armatus",
            "video": "http://dummyimage.com/101x116.png/cc0000/ffffff",
            "duration": 7,
            "description": "Sltr-haris Type IV physl fx low end humer, unsp arm, 7thP"
          },
          {
            "contentTitle": "Dacelo novaeguineae",
            "video": "http://dummyimage.com/237x141.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Toxic effect of unspecified pesticide, assault, init encntr"
          }
        ]
      },
      {
        "header": "Account Representative IV",
        "totalMinutes": 68632,
        "contents": [
          {
            "contentTitle": "Naja haje",
            "video": "http://dummyimage.com/154x236.png/ff4444/ffffff",
            "duration": 4,
            "description": "Inj unsp musc/fasc/tend at forearm level, unsp arm, sequela"
          },
          {
            "contentTitle": "Psittacula krameri",
            "video": "http://dummyimage.com/105x100.png/dddddd/000000",
            "duration": 3,
            "description": "Fx unsp prt of nk of r femr, 7thQ"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/113x127.png/ff4444/ffffff",
            "duration": 5,
            "description": "Laceration w fb of left great toe w damage to nail, sequela"
          },
          {
            "contentTitle": "Megaderma spasma",
            "video": "http://dummyimage.com/214x212.png/cc0000/ffffff",
            "duration": 5,
            "description": "Acute bronchospasm"
          },
          {
            "contentTitle": "Falco mexicanus",
            "video": "http://dummyimage.com/101x173.png/cc0000/ffffff",
            "duration": 9,
            "description": "Sltr-haris Type II physeal fx left metatarsal, sequela"
          },
          {
            "contentTitle": "Mirounga angustirostris",
            "video": "http://dummyimage.com/222x191.png/ff4444/ffffff",
            "duration": 10,
            "description": "Adverse effect of local antifung/infect/inflamm drugs, subs"
          },
          {
            "contentTitle": "Pseudocheirus peregrinus",
            "video": "http://dummyimage.com/240x161.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Nondisp segmental fracture of shaft of right femur, sequela"
          },
          {
            "contentTitle": "Caiman crocodilus",
            "video": "http://dummyimage.com/138x234.png/dddddd/000000",
            "duration": 8,
            "description": "Sltr-haris Type I physl fx lower end of ulna, unsp arm, sqla"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/200x153.png/ff4444/ffffff",
            "duration": 9,
            "description": "Carrier of typhoid"
          },
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/225x162.png/cc0000/ffffff",
            "duration": 3,
            "description": "Esophagostomy infection"
          },
          {
            "contentTitle": "Mungos mungo",
            "video": "http://dummyimage.com/200x246.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Capslr glaucoma w/pseudxf lens, right eye, moderate stage"
          },
          {
            "contentTitle": "Mellivora capensis",
            "video": "http://dummyimage.com/189x247.png/dddddd/000000",
            "duration": 3,
            "description": "Contracture, unspecified wrist"
          },
          {
            "contentTitle": "Falco peregrinus",
            "video": "http://dummyimage.com/168x158.png/cc0000/ffffff",
            "duration": 4,
            "description": "Sltr-haris Type II physl fx low end l fibula, 7thP"
          },
          {
            "contentTitle": "Phalacrocorax niger",
            "video": "http://dummyimage.com/152x181.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Oth diabetes mellitus w diabetic autonomic (poly)neuropathy"
          },
          {
            "contentTitle": "Bos mutus",
            "video": "http://dummyimage.com/174x108.png/ff4444/ffffff",
            "duration": 4,
            "description": "Type III traum spondylolysis of sixth cervcal vertebra, init"
          },
          {
            "contentTitle": "Larus novaehollandiae",
            "video": "http://dummyimage.com/217x174.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Displ seg fx shaft of unsp fibula, 7thG"
          },
          {
            "contentTitle": "Myotis lucifugus",
            "video": "http://dummyimage.com/244x173.png/ff4444/ffffff",
            "duration": 7,
            "description": "Other secondary osteonecrosis, unspecified shoulder"
          },
          {
            "contentTitle": "Amblyrhynchus cristatus",
            "video": "http://dummyimage.com/116x115.png/cc0000/ffffff",
            "duration": 4,
            "description": "Inj greater saphenous vein at hip and thigh level, left leg"
          }
        ]
      },
      {
        "header": "Chemical Engineer",
        "totalMinutes": 53036,
        "contents": [
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/182x227.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Poisoning by local anesthetics, assault, sequela"
          },
          {
            "contentTitle": "Alligator mississippiensis",
            "video": "http://dummyimage.com/166x135.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Other specified disorders of Eustachian tube"
          },
          {
            "contentTitle": "Madoqua kirkii",
            "video": "http://dummyimage.com/189x199.png/cc0000/ffffff",
            "duration": 6,
            "description": "Inj extensor musc/fasc/tend r idx fngr at forarm lv, subs"
          },
          {
            "contentTitle": "Phalaropus lobatus",
            "video": "http://dummyimage.com/187x153.png/ff4444/ffffff",
            "duration": 5,
            "description": "Hymenolepiasis"
          },
          {
            "contentTitle": "Boa caninus",
            "video": "http://dummyimage.com/151x191.png/cc0000/ffffff",
            "duration": 4,
            "description": "Unsp pre-existing htn comp pregnancy, third trimester"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/110x201.png/ff4444/ffffff",
            "duration": 3,
            "description": "Strain of muscle and tendon of front wall of thorax, subs"
          },
          {
            "contentTitle": "Arctogalidia trivirgata",
            "video": "http://dummyimage.com/102x153.png/cc0000/ffffff",
            "duration": 8,
            "description": "Articular disc disorder of left temporomandibular joint"
          },
          {
            "contentTitle": "Buteo galapagoensis",
            "video": "http://dummyimage.com/159x237.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Encounter for fit/adjst of external left breast prosthesis"
          },
          {
            "contentTitle": "Felis serval",
            "video": "http://dummyimage.com/236x233.png/ff4444/ffffff",
            "duration": 8,
            "description": "Nondisp fx of med phalanx of l lit fngr, 7thK"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/214x151.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Displacement (lateral) of globe"
          },
          {
            "contentTitle": "Semnopithecus entellus",
            "video": "http://dummyimage.com/155x174.png/ff4444/ffffff",
            "duration": 4,
            "description": "Puncture wound with foreign body of oral cavity"
          }
        ]
      },
      {
        "header": "Clinical Specialist",
        "totalMinutes": 43552,
        "contents": [
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/128x101.png/dddddd/000000",
            "duration": 9,
            "description": "Bent bone of l rad, subs for opn fx type 3A/B/C w delay heal"
          },
          {
            "contentTitle": "Passer domesticus",
            "video": "http://dummyimage.com/180x130.png/ff4444/ffffff",
            "duration": 8,
            "description": "Oth complications of surgical and medical care, NEC, init"
          },
          {
            "contentTitle": "Acrantophis madagascariensis",
            "video": "http://dummyimage.com/225x226.png/cc0000/ffffff",
            "duration": 7,
            "description": "Displ transverse fx shaft of r ulna, 7thB"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/247x101.png/cc0000/ffffff",
            "duration": 6,
            "description": "Injury of ulnar nerve at wrist and hand level"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/108x115.png/dddddd/000000",
            "duration": 1,
            "description": "Burn of cornea and conjunctival sac, right eye"
          },
          {
            "contentTitle": "Lemur fulvus",
            "video": "http://dummyimage.com/200x188.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Nondisp fx of medial condyle of unsp humer, init for opn fx"
          },
          {
            "contentTitle": "Phalaropus fulicarius",
            "video": "http://dummyimage.com/220x205.png/dddddd/000000",
            "duration": 1,
            "description": "Albinism with hematologic abnormality"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/180x123.png/dddddd/000000",
            "duration": 10,
            "description": "Other erythema multiforme"
          },
          {
            "contentTitle": "Notechis semmiannulatus",
            "video": "http://dummyimage.com/184x223.png/dddddd/000000",
            "duration": 4,
            "description": "Insect bite (nonvenomous), right great toe"
          },
          {
            "contentTitle": "Sarcophilus harrisii",
            "video": "http://dummyimage.com/204x163.png/ff4444/ffffff",
            "duration": 8,
            "description": "Poisoning by oth agents aff the cardiovasc sys, accidental"
          },
          {
            "contentTitle": "Camelus dromedarius",
            "video": "http://dummyimage.com/145x235.png/cc0000/ffffff",
            "duration": 9,
            "description": "Sedatv/hyp/anxiolytc abuse w psychotic disorder, unsp"
          },
          {
            "contentTitle": "Lamprotornis superbus",
            "video": "http://dummyimage.com/148x248.png/cc0000/ffffff",
            "duration": 3,
            "description": "Unspecified fracture of shaft of unspecified radius, sequela"
          },
          {
            "contentTitle": "Equus hemionus",
            "video": "http://dummyimage.com/202x158.png/ff4444/ffffff",
            "duration": 4,
            "description": "Accidental discharge of shotgun, sequela"
          },
          {
            "contentTitle": "Ovis canadensis",
            "video": "http://dummyimage.com/245x143.png/cc0000/ffffff",
            "duration": 8,
            "description": "Tidal wave due to storm"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/114x140.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Strain msl/tnd lng flxr msl toe at ank/ft lev, r foot, init"
          },
          {
            "contentTitle": "Cercopithecus aethiops",
            "video": "http://dummyimage.com/231x101.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Drowning and submersion, undetermined intent"
          },
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/135x169.png/dddddd/000000",
            "duration": 9,
            "description": "Abscess of external ear, unspecified ear"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/200x167.png/dddddd/000000",
            "duration": 9,
            "description": "Nondisp bicondylar fx unsp tibia, init for opn fx type I/2"
          }
        ]
      },
      {
        "header": "Civil Engineer",
        "totalMinutes": 62944,
        "contents": [
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/186x240.png/dddddd/000000",
            "duration": 1,
            "description": "Nasal congestion"
          },
          {
            "contentTitle": "Gyps fulvus",
            "video": "http://dummyimage.com/107x158.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Fall on or from playground slide, subsequent encounter"
          },
          {
            "contentTitle": "Vulpes chama",
            "video": "http://dummyimage.com/151x210.png/ff4444/ffffff",
            "duration": 7,
            "description": "Exanthema subitum [sixth disease]"
          },
          {
            "contentTitle": "Ursus arctos",
            "video": "http://dummyimage.com/114x191.png/ff4444/ffffff",
            "duration": 10,
            "description": "Nondisp bicondylar fx r tibia, 7thR"
          },
          {
            "contentTitle": "Papilio canadensis",
            "video": "http://dummyimage.com/177x218.png/dddddd/000000",
            "duration": 7,
            "description": "Underdosing of mineralocorticoids and their antag, subs"
          },
          {
            "contentTitle": "Phascogale tapoatafa",
            "video": "http://dummyimage.com/202x128.png/ff4444/ffffff",
            "duration": 5,
            "description": "Other respiratory tuberculosis"
          },
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/184x162.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Traumatic rupture of unsp ulnar collateral ligament, sequela"
          },
          {
            "contentTitle": "Lama pacos",
            "video": "http://dummyimage.com/201x102.png/ff4444/ffffff",
            "duration": 8,
            "description": "Oth pregnancy related conditions, unspecified trimester"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/121x211.png/cc0000/ffffff",
            "duration": 8,
            "description": "Subluxation of unsp interphaln joint of left thumb, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/192x208.png/cc0000/ffffff",
            "duration": 8,
            "description": "Posterior subluxation of unspecified humerus"
          }
        ]
      },
      {
        "header": "Environmental Specialist",
        "totalMinutes": 25288,
        "contents": [
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/154x220.png/dddddd/000000",
            "duration": 6,
            "description": "Drug-induced chronic gout, unspecified site, with tophus"
          },
          {
            "contentTitle": "Odocoileus hemionus",
            "video": "http://dummyimage.com/173x219.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Other age-related cataract"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/234x178.png/dddddd/000000",
            "duration": 9,
            "description": "Stenosis of other cardiac prosth dev/grft, subs"
          },
          {
            "contentTitle": "Irania gutteralis",
            "video": "http://dummyimage.com/179x233.png/ff4444/ffffff",
            "duration": 9,
            "description": "Sublux of proximal interphaln joint of l mid finger, sequela"
          },
          {
            "contentTitle": "Casmerodius albus",
            "video": "http://dummyimage.com/118x198.png/dddddd/000000",
            "duration": 6,
            "description": "Lymphocy deplet Hdgkn lymph, nodes of ing rgn and lower limb"
          },
          {
            "contentTitle": "Nesomimus trifasciatus",
            "video": "http://dummyimage.com/221x163.png/dddddd/000000",
            "duration": 7,
            "description": "Benign neoplasm of lymph nodes"
          },
          {
            "contentTitle": "Notechis semmiannulatus",
            "video": "http://dummyimage.com/171x173.png/dddddd/000000",
            "duration": 1,
            "description": "Bus station as the place of occurrence of the external cause"
          }
        ]
      }
    ]
  },
  {
    "title": "Breaking Away",
    "subject": "Sales",
    "instructorName": "Rodin Salem",
    "price": 831.04,
    "level": "Advanced",
    "courseHours": 119,
    "summary": "Toxic effect of chewing tobacco, accidental, subs",
    "subtitles": [
      {
        "header": "Nurse Practicioner",
        "totalMinutes": 19514,
        "contents": [
          {
            "contentTitle": "Vanellus sp.",
            "video": "http://dummyimage.com/162x122.png/dddddd/000000",
            "duration": 2,
            "description": "Minor laceration of inferior mesenteric artery, init encntr"
          },
          {
            "contentTitle": "Procyon cancrivorus",
            "video": "http://dummyimage.com/132x202.png/cc0000/ffffff",
            "duration": 10,
            "description": "Fracture of angle of right mandible, 7thB"
          },
          {
            "contentTitle": "Neophoca cinerea",
            "video": "http://dummyimage.com/222x102.png/cc0000/ffffff",
            "duration": 5,
            "description": "Cereb infrc due to unsp occls or stenosis of bi cereblr art"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/245x102.png/dddddd/000000",
            "duration": 8,
            "description": "Disp fx of post wall of l acetab, subs for fx w routn heal"
          },
          {
            "contentTitle": "Threskionis aethiopicus",
            "video": "http://dummyimage.com/235x242.png/ff4444/ffffff",
            "duration": 6,
            "description": "Unsp superficial injury of unspecified great toe, sequela"
          },
          {
            "contentTitle": "Ceryle rudis",
            "video": "http://dummyimage.com/182x109.png/dddddd/000000",
            "duration": 6,
            "description": "Displ oblique fx shaft of humer, l arm, 7thG"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/239x239.png/cc0000/ffffff",
            "duration": 9,
            "description": "Contusion of fallopian tube, unilateral, sequela"
          },
          {
            "contentTitle": "Laniarius ferrugineus",
            "video": "http://dummyimage.com/147x224.png/ff4444/ffffff",
            "duration": 7,
            "description": "Erosion of implanted urtl bulk agnt organ or tissue, sequela"
          },
          {
            "contentTitle": "Cebus apella",
            "video": "http://dummyimage.com/240x230.png/cc0000/ffffff",
            "duration": 7,
            "description": "Nondisp fx of ant pro of r calcaneus, 7thD"
          },
          {
            "contentTitle": "Caiman crocodilus",
            "video": "http://dummyimage.com/125x154.png/ff4444/ffffff",
            "duration": 5,
            "description": "Anterior subluxation of unsp ulnohumeral joint, sequela"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/212x241.png/cc0000/ffffff",
            "duration": 8,
            "description": "Blister (nonthermal) of left shoulder, subsequent encounter"
          },
          {
            "contentTitle": "Dromaeus novaehollandiae",
            "video": "http://dummyimage.com/199x105.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Insect bite (nonvenomous) of unsp forearm, subs encntr"
          },
          {
            "contentTitle": "Sciurus niger",
            "video": "http://dummyimage.com/242x227.png/cc0000/ffffff",
            "duration": 7,
            "description": "Pnctr w fb of l little finger w/o damage to nail, sequela"
          }
        ]
      },
      {
        "header": "Accounting Assistant II",
        "totalMinutes": 69435,
        "contents": [
          {
            "contentTitle": "Alouatta seniculus",
            "video": "http://dummyimage.com/222x136.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Underdosing of immunoglobulin, initial encounter"
          },
          {
            "contentTitle": "Egretta thula",
            "video": "http://dummyimage.com/238x152.png/dddddd/000000",
            "duration": 3,
            "description": "Cleft hard palate with unilateral cleft lip"
          },
          {
            "contentTitle": "Morelia spilotes variegata",
            "video": "http://dummyimage.com/165x199.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Sltr-haris Type III physl fx low end ulna, r arm, 7thP"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/166x188.png/ff4444/ffffff",
            "duration": 6,
            "description": "Nondisp fx of dist phalanx of r great toe, 7thD"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/118x239.png/dddddd/000000",
            "duration": 8,
            "description": "Cystostomy infection"
          },
          {
            "contentTitle": "Pan troglodytes",
            "video": "http://dummyimage.com/186x180.png/cc0000/ffffff",
            "duration": 2,
            "description": "Nondisp oblique fx shaft of unsp rad, 7thG"
          },
          {
            "contentTitle": "Connochaetus taurinus",
            "video": "http://dummyimage.com/106x117.png/dddddd/000000",
            "duration": 2,
            "description": "Unsp fx shaft of r femr, 7thF"
          },
          {
            "contentTitle": "Vulpes vulpes",
            "video": "http://dummyimage.com/103x248.png/dddddd/000000",
            "duration": 10,
            "description": "Allergic contact dermatitis due to other chemical products"
          },
          {
            "contentTitle": "Macropus parryi",
            "video": "http://dummyimage.com/136x168.png/dddddd/000000",
            "duration": 6,
            "description": "Lacerat musc/tend peroneal grp at low leg lev, l leg, sqla"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/204x165.png/cc0000/ffffff",
            "duration": 6,
            "description": "Fracture of alveolus of left mandible, 7thD"
          },
          {
            "contentTitle": "Papio ursinus",
            "video": "http://dummyimage.com/122x178.png/dddddd/000000",
            "duration": 1,
            "description": "Acquired stenosis of bilateral nasolacrimal duct"
          },
          {
            "contentTitle": "Martes americana",
            "video": "http://dummyimage.com/169x196.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Burn of unspecified eyelid and periocular area, sequela"
          },
          {
            "contentTitle": "Macropus rufogriseus",
            "video": "http://dummyimage.com/186x170.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Poisn by analeptics and opioid receptor antag, acc, subs"
          }
        ]
      },
      {
        "header": "Senior Developer",
        "totalMinutes": 78741,
        "contents": [
          {
            "contentTitle": "Streptopelia senegalensis",
            "video": "http://dummyimage.com/203x230.png/dddddd/000000",
            "duration": 10,
            "description": "Strain of flexor musc/fasc/tend and unsp finger at forarm lv"
          },
          {
            "contentTitle": "Pelecanus conspicillatus",
            "video": "http://dummyimage.com/110x228.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Anterior dislocation of left ulnohumeral joint, init encntr"
          },
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/194x227.png/cc0000/ffffff",
            "duration": 1,
            "description": "Toxic eff of halgn deriv of aliphatic hydrocrb, acc, sqla"
          },
          {
            "contentTitle": "Rangifer tarandus",
            "video": "http://dummyimage.com/178x206.png/dddddd/000000",
            "duration": 3,
            "description": "Leakage of artificial heart, initial encounter"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/207x134.png/ff4444/ffffff",
            "duration": 4,
            "description": "Toxic effect of coral snake venom, accidental, init"
          },
          {
            "contentTitle": "Pitangus sulphuratus",
            "video": "http://dummyimage.com/137x244.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Minor lacerat branches of celiac and mesent art, sequela"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/134x200.png/dddddd/000000",
            "duration": 1,
            "description": "Driver of pk-up/van inj in clsn w rail trn/veh in traf, subs"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/211x188.png/dddddd/000000",
            "duration": 10,
            "description": "Unspecified disorder of binocular movement"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/124x217.png/ff4444/ffffff",
            "duration": 5,
            "description": "Unsp injury of fallopian tube, unspecified, init encntr"
          },
          {
            "contentTitle": "Rangifer tarandus",
            "video": "http://dummyimage.com/222x100.png/ff4444/ffffff",
            "duration": 4,
            "description": "Unspecified disorder of synovium and tendon, multiple sites"
          },
          {
            "contentTitle": "Pelecanus occidentalis",
            "video": "http://dummyimage.com/191x137.png/ff4444/ffffff",
            "duration": 2,
            "description": "Patellar tendinitis, unspecified knee"
          },
          {
            "contentTitle": "Spilogale gracilis",
            "video": "http://dummyimage.com/162x245.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Complete lesion of thoracic spinal cord"
          }
        ]
      },
      {
        "header": "Electrical Engineer",
        "totalMinutes": 40563,
        "contents": [
          {
            "contentTitle": "Fregata magnificans",
            "video": "http://dummyimage.com/209x116.png/ff4444/ffffff",
            "duration": 2,
            "description": "Hemarthrosis, knee"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/163x183.png/dddddd/000000",
            "duration": 7,
            "description": "Superficial foreign body of right wrist, initial encounter"
          },
          {
            "contentTitle": "Crocuta crocuta",
            "video": "http://dummyimage.com/131x203.png/dddddd/000000",
            "duration": 7,
            "description": "Brkdwn implanted electronic stimulator of nervous sys, subs"
          },
          {
            "contentTitle": "Spermophilus tridecemlineatus",
            "video": "http://dummyimage.com/128x148.png/cc0000/ffffff",
            "duration": 8,
            "description": "Laceration of musc/fasc/tend at shldr/up arm, right arm"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/173x142.png/ff4444/ffffff",
            "duration": 8,
            "description": "Obstructed labor due to breech presentation, fetus 2"
          },
          {
            "contentTitle": "Macropus rufogriseus",
            "video": "http://dummyimage.com/244x113.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Stress fracture, hip, unsp, subs for fx w delay heal"
          },
          {
            "contentTitle": "Ciconia ciconia",
            "video": "http://dummyimage.com/222x179.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp injury of axillary artery, left side, subs encntr"
          },
          {
            "contentTitle": "Felis caracal",
            "video": "http://dummyimage.com/224x167.png/cc0000/ffffff",
            "duration": 2,
            "description": "2-part nondisp fx of surg nk of r humer, 7thD"
          },
          {
            "contentTitle": "Camelus dromedarius",
            "video": "http://dummyimage.com/218x250.png/dddddd/000000",
            "duration": 8,
            "description": "Nondisp fx of base of 5th MC bone. l hand, 7thG"
          },
          {
            "contentTitle": "Cebus apella",
            "video": "http://dummyimage.com/223x105.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Passenger on bus injured in clsn w ped/anml in traf, sequela"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/111x157.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Toxic effect of tobacco and nicotine, intentional self-harm"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/195x170.png/ff4444/ffffff",
            "duration": 8,
            "description": "Breakdown (mechanical) of unspecified vascular grafts"
          }
        ]
      },
      {
        "header": "Research Nurse",
        "totalMinutes": 97115,
        "contents": [
          {
            "contentTitle": "Macaca mulatta",
            "video": "http://dummyimage.com/145x114.png/cc0000/ffffff",
            "duration": 9,
            "description": "Dislocation of proximal interphaln joint of finger, init"
          },
          {
            "contentTitle": "Thalasseus maximus",
            "video": "http://dummyimage.com/170x107.png/ff4444/ffffff",
            "duration": 4,
            "description": "Unsp juvenile rheumatoid arthritis, unspecified shoulder"
          },
          {
            "contentTitle": "Naja haje",
            "video": "http://dummyimage.com/178x163.png/cc0000/ffffff",
            "duration": 3,
            "description": "Low lying placenta NOS or without hemor, first trimester"
          },
          {
            "contentTitle": "Pan troglodytes",
            "video": "http://dummyimage.com/142x121.png/dddddd/000000",
            "duration": 2,
            "description": "Incomplete atypical femoral fracture, right leg, init"
          },
          {
            "contentTitle": "Agelaius phoeniceus",
            "video": "http://dummyimage.com/142x197.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Broken internal joint prosthesis, other site, init encntr"
          },
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/227x102.png/ff4444/ffffff",
            "duration": 8,
            "description": "Activities involving other specified sports and athletics"
          },
          {
            "contentTitle": "Diceros bicornis",
            "video": "http://dummyimage.com/232x136.png/cc0000/ffffff",
            "duration": 2,
            "description": "Trigger finger, right little finger"
          },
          {
            "contentTitle": "Salvadora hexalepis",
            "video": "http://dummyimage.com/186x105.png/dddddd/000000",
            "duration": 2,
            "description": "Dislocation of T1/T2 thoracic vertebra, subsequent encounter"
          },
          {
            "contentTitle": "Falco mexicanus",
            "video": "http://dummyimage.com/159x141.png/cc0000/ffffff",
            "duration": 7,
            "description": "Unspecified superficial injury of upper arm"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/123x112.png/ff4444/ffffff",
            "duration": 3,
            "description": "Secondary malignant neoplasm of kidney and renal pelvis"
          },
          {
            "contentTitle": "Uraeginthus angolensis",
            "video": "http://dummyimage.com/114x173.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Other cataclysmic storms, subsequent encounter"
          },
          {
            "contentTitle": "Nannopterum harrisi",
            "video": "http://dummyimage.com/121x176.png/dddddd/000000",
            "duration": 10,
            "description": "Subluxation of distal interphalangeal joint of finger, subs"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/164x172.png/ff4444/ffffff",
            "duration": 6,
            "description": "Epidermolysis bullosa dystrophica"
          },
          {
            "contentTitle": "Erethizon dorsatum",
            "video": "http://dummyimage.com/109x189.png/dddddd/000000",
            "duration": 3,
            "description": "Cont preg aft elctv fetl rdct of 1 fts or more,3rd tri, fts2"
          },
          {
            "contentTitle": "Orcinus orca",
            "video": "http://dummyimage.com/131x192.png/ff4444/ffffff",
            "duration": 9,
            "description": "Contusion of fallopian tube, bilateral, initial encounter"
          },
          {
            "contentTitle": "Uraeginthus bengalus",
            "video": "http://dummyimage.com/187x135.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Traum rupt of volar plate of r idx fngr at MCP/IP jt, subs"
          },
          {
            "contentTitle": "Felis concolor",
            "video": "http://dummyimage.com/234x143.png/cc0000/ffffff",
            "duration": 10,
            "description": "Underdosing of antithrombotic drugs, subsequent encounter"
          },
          {
            "contentTitle": "Casmerodius albus",
            "video": "http://dummyimage.com/142x177.png/ff4444/ffffff",
            "duration": 1,
            "description": "Fx unsp carpal bone, right wrist, subs for fx w nonunion"
          }
        ]
      },
      {
        "header": "Software Test Engineer II",
        "totalMinutes": 77845,
        "contents": [
          {
            "contentTitle": "Actophilornis africanus",
            "video": "http://dummyimage.com/104x239.png/ff4444/ffffff",
            "duration": 5,
            "description": "Dermatitis, unspecified"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/157x197.png/cc0000/ffffff",
            "duration": 7,
            "description": "Other contact with dolphin, initial encounter"
          },
          {
            "contentTitle": "Sylvilagus floridanus",
            "video": "http://dummyimage.com/201x149.png/dddddd/000000",
            "duration": 1,
            "description": "Oth injury of muscle and tendon of head, subs encntr"
          },
          {
            "contentTitle": "Trichoglossus chlorolepidotus",
            "video": "http://dummyimage.com/106x121.png/dddddd/000000",
            "duration": 7,
            "description": "Corros third degree of head, face, and neck, unsp site, init"
          },
          {
            "contentTitle": "Phalacrocorax varius",
            "video": "http://dummyimage.com/215x200.png/cc0000/ffffff",
            "duration": 5,
            "description": "Nondisp fx of distal phalanx of oth finger, init for clos fx"
          },
          {
            "contentTitle": "Galago crassicaudataus",
            "video": "http://dummyimage.com/165x235.png/ff4444/ffffff",
            "duration": 8,
            "description": "Nondisp subtrochnt fx r femr, 7thN"
          },
          {
            "contentTitle": "Pavo cristatus",
            "video": "http://dummyimage.com/227x236.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Nondisp seg fx shaft of unsp femr, 7thP"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/131x241.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Juvenile rheumatoid arthritis with systemic onset, unsp knee"
          },
          {
            "contentTitle": "Pituophis melanaleucus",
            "video": "http://dummyimage.com/120x118.png/dddddd/000000",
            "duration": 5,
            "description": "Glaucoma secondary to drugs, unspecified eye"
          },
          {
            "contentTitle": "Oncorhynchus nerka",
            "video": "http://dummyimage.com/102x242.png/dddddd/000000",
            "duration": 5,
            "description": "Unsp mtrcy rider injured in clsn w pedl cyc in traf, init"
          },
          {
            "contentTitle": "Agelaius phoeniceus",
            "video": "http://dummyimage.com/196x118.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp open wound of abd wall, epigst rgn w/o penet perit cav"
          },
          {
            "contentTitle": "Colaptes campestroides",
            "video": "http://dummyimage.com/146x195.png/ff4444/ffffff",
            "duration": 1,
            "description": "Encounter for adequacy testing for peritoneal dialysis"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/222x210.png/cc0000/ffffff",
            "duration": 7,
            "description": "Anejaculatory orgasm"
          }
        ]
      },
      {
        "header": "Structural Analysis Engineer",
        "totalMinutes": 53281,
        "contents": [
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/243x168.png/dddddd/000000",
            "duration": 6,
            "description": "Nondisp trimalleol fx l low leg, subs for clos fx w nonunion"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/107x185.png/dddddd/000000",
            "duration": 7,
            "description": "Fall on or from playground slide, sequela"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/199x160.png/dddddd/000000",
            "duration": 9,
            "description": "Maternal care for breech presentation, unsp"
          },
          {
            "contentTitle": "Tyto novaehollandiae",
            "video": "http://dummyimage.com/121x211.png/cc0000/ffffff",
            "duration": 10,
            "description": "Subluxation and dislocation of cervical vertebrae"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/212x201.png/dddddd/000000",
            "duration": 8,
            "description": "Nondisp spiral fx shaft of unsp tibia, 7thH"
          },
          {
            "contentTitle": "Phalaropus lobatus",
            "video": "http://dummyimage.com/176x244.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Breakdown (mechanical) of insulin pump, initial encounter"
          },
          {
            "contentTitle": "Eremophila alpestris",
            "video": "http://dummyimage.com/140x167.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Explosion of explosive gases, sequela"
          },
          {
            "contentTitle": "Milvus migrans",
            "video": "http://dummyimage.com/171x226.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Glaucoma secondary to eye trauma, left eye, moderate stage"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/138x211.png/ff4444/ffffff",
            "duration": 10,
            "description": "Contusion of right wrist, initial encounter"
          },
          {
            "contentTitle": "Diomedea irrorata",
            "video": "http://dummyimage.com/142x214.png/cc0000/ffffff",
            "duration": 6,
            "description": "Corrosion of unspecified degree of buttock"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/196x196.png/ff4444/ffffff",
            "duration": 10,
            "description": "Pnctr w/o fb of r rng fngr w damage to nail, sequela"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/225x192.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Hang-glider explosion injuring occupant, sequela"
          },
          {
            "contentTitle": "Bugeranus caruncalatus",
            "video": "http://dummyimage.com/238x124.png/dddddd/000000",
            "duration": 3,
            "description": "Severe atrophy of the mandible"
          }
        ]
      },
      {
        "header": "Office Assistant IV",
        "totalMinutes": 60256,
        "contents": [
          {
            "contentTitle": "Cebus nigrivittatus",
            "video": "http://dummyimage.com/240x210.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Nondisplaced transverse fracture of left acetabulum, init"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/178x137.png/ff4444/ffffff",
            "duration": 10,
            "description": "Unsp inj intrns musc/fasc/tend and unsp finger at wrs/hnd lv"
          },
          {
            "contentTitle": "Larus dominicanus",
            "video": "http://dummyimage.com/156x224.png/cc0000/ffffff",
            "duration": 4,
            "description": "Oth fracture of right pubis, subs for fx w delay heal"
          },
          {
            "contentTitle": "Macropus rufogriseus",
            "video": "http://dummyimage.com/117x105.png/cc0000/ffffff",
            "duration": 3,
            "description": "Maternal care for disproportion due to oth fetal deformities"
          },
          {
            "contentTitle": "Eubalaena australis",
            "video": "http://dummyimage.com/158x184.png/cc0000/ffffff",
            "duration": 6,
            "description": "Felty's syndrome, left hand"
          },
          {
            "contentTitle": "Phaethon aethereus",
            "video": "http://dummyimage.com/100x180.png/cc0000/ffffff",
            "duration": 10,
            "description": "Pathological fracture, right tibia, sequela"
          },
          {
            "contentTitle": "Ctenophorus ornatus",
            "video": "http://dummyimage.com/164x174.png/cc0000/ffffff",
            "duration": 5,
            "description": "External constriction of left forearm, sequela"
          },
          {
            "contentTitle": "Megaderma spasma",
            "video": "http://dummyimage.com/185x110.png/cc0000/ffffff",
            "duration": 2,
            "description": "Stress fracture, unsp finger(s), subs for fx w nonunion"
          }
        ]
      },
      {
        "header": "Senior Editor",
        "totalMinutes": 24452,
        "contents": [
          {
            "contentTitle": "Haliaeetus leucoryphus",
            "video": "http://dummyimage.com/188x108.png/dddddd/000000",
            "duration": 1,
            "description": "Nondisplaced articular fracture of head of right femur"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/136x223.png/dddddd/000000",
            "duration": 4,
            "description": "Myelodysplastic syndromes"
          },
          {
            "contentTitle": "Melanerpes erythrocephalus",
            "video": "http://dummyimage.com/155x232.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Acute delta-(super) infection of hepatitis B carrier"
          },
          {
            "contentTitle": "Aquila chrysaetos",
            "video": "http://dummyimage.com/245x226.png/cc0000/ffffff",
            "duration": 4,
            "description": "Laceration without foreign body of foot"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/248x205.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Nondisp transverse fx shaft of unsp ulna, 7thC"
          },
          {
            "contentTitle": "Sagittarius serpentarius",
            "video": "http://dummyimage.com/129x169.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Rapidly progr nephritic syndrome w oth morphologic changes"
          },
          {
            "contentTitle": "Bucephala clangula",
            "video": "http://dummyimage.com/129x190.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Disp fx of distal phalanx of unspecified great toe, sequela"
          },
          {
            "contentTitle": "Lepus arcticus",
            "video": "http://dummyimage.com/121x235.png/cc0000/ffffff",
            "duration": 8,
            "description": "Inj superficial vein at shldr/up arm, left arm, subs"
          },
          {
            "contentTitle": "Cracticus nigroagularis",
            "video": "http://dummyimage.com/126x138.png/cc0000/ffffff",
            "duration": 8,
            "description": "Familial chondrocalcinosis, unspecified knee"
          },
          {
            "contentTitle": "Laniaurius atrococcineus",
            "video": "http://dummyimage.com/120x161.png/dddddd/000000",
            "duration": 5,
            "description": "Corrosion of third degree of right scapular region"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/109x186.png/dddddd/000000",
            "duration": 9,
            "description": "Unsp superficial injuries of unsp front wall of thorax"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/103x125.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Disp fx of medial phalanx of unspecified lesser toe(s)"
          },
          {
            "contentTitle": "Otocyon megalotis",
            "video": "http://dummyimage.com/140x243.png/ff4444/ffffff",
            "duration": 1,
            "description": "Contact with workbench tool"
          },
          {
            "contentTitle": "Galago crassicaudataus",
            "video": "http://dummyimage.com/147x162.png/dddddd/000000",
            "duration": 5,
            "description": "Burn of first degree of left scapular region, init encntr"
          },
          {
            "contentTitle": "Gabianus pacificus",
            "video": "http://dummyimage.com/122x103.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Corrosion of first degree of unspecified foot, sequela"
          }
        ]
      },
      {
        "header": "Cost Accountant",
        "totalMinutes": 69839,
        "contents": [
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/246x130.png/ff4444/ffffff",
            "duration": 4,
            "description": "Kaposi's sarcoma of gastrointestinal sites"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/158x113.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Unspecified fracture of unspecified femur, sequela"
          },
          {
            "contentTitle": "Tauraco porphyrelophus",
            "video": "http://dummyimage.com/105x175.png/ff4444/ffffff",
            "duration": 7,
            "description": "Legal intervnt involving oth means, suspect injured, sequela"
          },
          {
            "contentTitle": "Zonotrichia capensis",
            "video": "http://dummyimage.com/103x167.png/ff4444/ffffff",
            "duration": 6,
            "description": "Toxic effect of paints and dyes, NEC, assault"
          },
          {
            "contentTitle": "Libellula quadrimaculata",
            "video": "http://dummyimage.com/239x149.png/dddddd/000000",
            "duration": 1,
            "description": "Age-rel osteopor w current path fracture, right ank/ft, init"
          },
          {
            "contentTitle": "Nesomimus trifasciatus",
            "video": "http://dummyimage.com/170x171.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Poisoning by benzodiazepines, assault"
          },
          {
            "contentTitle": "Ursus maritimus",
            "video": "http://dummyimage.com/208x129.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Burn 1st deg mult sites of unsp lower limb, ex ank/ft, subs"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/150x189.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Toxic effect of unsp noxious sub eaten as food, acc, init"
          },
          {
            "contentTitle": "Spheniscus magellanicus",
            "video": "http://dummyimage.com/201x129.png/ff4444/ffffff",
            "duration": 7,
            "description": "External constriction of unspecified ear, subs encntr"
          },
          {
            "contentTitle": "Priodontes maximus",
            "video": "http://dummyimage.com/185x145.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Unspecified intracranial injury"
          },
          {
            "contentTitle": "Ursus arctos",
            "video": "http://dummyimage.com/193x101.png/cc0000/ffffff",
            "duration": 6,
            "description": "Maternal care for fetal problem, unsp, unsp tri, fetus 5"
          },
          {
            "contentTitle": "Proteles cristatus",
            "video": "http://dummyimage.com/184x217.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Contusion of right little finger w damage to nail, init"
          },
          {
            "contentTitle": "Spermophilus parryii",
            "video": "http://dummyimage.com/187x168.png/dddddd/000000",
            "duration": 9,
            "description": "Nondisp fx of neck of left radius, init for opn fx type I/2"
          },
          {
            "contentTitle": "Laniaurius atrococcineus",
            "video": "http://dummyimage.com/192x205.png/cc0000/ffffff",
            "duration": 3,
            "description": "Disproportion of reconstructed breast"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/192x216.png/ff4444/ffffff",
            "duration": 1,
            "description": "Punctate keratitis, left eye"
          },
          {
            "contentTitle": "Amphibolurus barbatus",
            "video": "http://dummyimage.com/184x163.png/cc0000/ffffff",
            "duration": 10,
            "description": "Other fracture of foot"
          },
          {
            "contentTitle": "Sula dactylatra",
            "video": "http://dummyimage.com/154x180.png/ff4444/ffffff",
            "duration": 2,
            "description": "Inj blood vessels at abdomen, low back and pelvis level"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/110x201.png/cc0000/ffffff",
            "duration": 3,
            "description": "Pasngr of special industr vehicle injured nontraf, sequela"
          }
        ]
      },
      {
        "header": "Tax Accountant",
        "totalMinutes": 80107,
        "contents": [
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/189x232.png/ff4444/ffffff",
            "duration": 10,
            "description": "Open bite of abd wall, right upper q w penet perit cav"
          },
          {
            "contentTitle": "Equus hemionus",
            "video": "http://dummyimage.com/112x182.png/cc0000/ffffff",
            "duration": 7,
            "description": "Laceration with foreign body, left knee, subs encntr"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/212x207.png/cc0000/ffffff",
            "duration": 4,
            "description": "Oth fx shaft of rad, unsp arm, 7thH"
          },
          {
            "contentTitle": "Mungos mungo",
            "video": "http://dummyimage.com/208x150.png/dddddd/000000",
            "duration": 7,
            "description": "Displ unsp condyle fx low end l femr, 7thB"
          },
          {
            "contentTitle": "Phacochoerus aethiopus",
            "video": "http://dummyimage.com/248x195.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Superficial frostbite of unspecified ear"
          },
          {
            "contentTitle": "Trachyphonus vaillantii",
            "video": "http://dummyimage.com/201x125.png/dddddd/000000",
            "duration": 9,
            "description": "Lateral subluxation and dislocation of ulnohumeral joint"
          },
          {
            "contentTitle": "Bubo virginianus",
            "video": "http://dummyimage.com/176x177.png/dddddd/000000",
            "duration": 7,
            "description": "Injury of optic tract and pathways, unspecified eye, sequela"
          },
          {
            "contentTitle": "Ateles paniscus",
            "video": "http://dummyimage.com/115x101.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Laceration without foreign body of unsp wrist, init encntr"
          },
          {
            "contentTitle": "Boa constrictor mexicana",
            "video": "http://dummyimage.com/197x241.png/ff4444/ffffff",
            "duration": 1,
            "description": "Occupant of anml-drn vehicle injured in unsp trnsp acc, subs"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/222x196.png/dddddd/000000",
            "duration": 10,
            "description": "Blister (nonthermal), unspecified knee, initial encounter"
          },
          {
            "contentTitle": "Anser caerulescens",
            "video": "http://dummyimage.com/172x151.png/cc0000/ffffff",
            "duration": 7,
            "description": "Dislocation of interphaln joint of left lesser toe(s), init"
          }
        ]
      },
      {
        "header": "Civil Engineer",
        "totalMinutes": 74661,
        "contents": [
          {
            "contentTitle": "Dasypus septemcincus",
            "video": "http://dummyimage.com/164x115.png/cc0000/ffffff",
            "duration": 10,
            "description": "Inj intrinsic msl/tnd at ank/ft level, unsp foot, sequela"
          },
          {
            "contentTitle": "Climacteris melanura",
            "video": "http://dummyimage.com/234x187.png/dddddd/000000",
            "duration": 5,
            "description": "Corrosion of unspecified degree of right wrist, subs encntr"
          },
          {
            "contentTitle": "Ursus maritimus",
            "video": "http://dummyimage.com/105x109.png/cc0000/ffffff",
            "duration": 2,
            "description": "Phocomelia, unspecified limb(s)"
          },
          {
            "contentTitle": "Hyaena hyaena",
            "video": "http://dummyimage.com/167x233.png/ff4444/ffffff",
            "duration": 4,
            "description": "Pedl cyc driver injured in clsn w hv veh nontraf, sequela"
          },
          {
            "contentTitle": "Philetairus socius",
            "video": "http://dummyimage.com/162x146.png/ff4444/ffffff",
            "duration": 8,
            "description": "Ben neoplm of connctv/soft tiss of r upper limb, inc shldr"
          },
          {
            "contentTitle": "Canis lupus baileyi",
            "video": "http://dummyimage.com/108x214.png/dddddd/000000",
            "duration": 8,
            "description": "Type 1 diabetes w severe nonprlf diabetic retinopathy"
          },
          {
            "contentTitle": "Cebus apella",
            "video": "http://dummyimage.com/173x211.png/dddddd/000000",
            "duration": 1,
            "description": "Unspecified complication of heart-lung transplant"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/218x235.png/cc0000/ffffff",
            "duration": 10,
            "description": "Primarily systemic and hematological agents, NEC"
          },
          {
            "contentTitle": "Nectarinia chalybea",
            "video": "http://dummyimage.com/220x175.png/cc0000/ffffff",
            "duration": 4,
            "description": "Antihypertensive drugs"
          },
          {
            "contentTitle": "Meleagris gallopavo",
            "video": "http://dummyimage.com/206x211.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Palindromic rheumatism, multiple sites"
          },
          {
            "contentTitle": "Dromaeus novaehollandiae",
            "video": "http://dummyimage.com/177x126.png/dddddd/000000",
            "duration": 1,
            "description": "Open bite of l bk wl of thorax w/o penet thoracic cavity"
          },
          {
            "contentTitle": "Iguana iguana",
            "video": "http://dummyimage.com/134x116.png/cc0000/ffffff",
            "duration": 5,
            "description": "Capsular contracture of breast implant, subsequent encounter"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/132x122.png/cc0000/ffffff",
            "duration": 8,
            "description": "Oth symptoms and signs w general sensations and perceptions"
          },
          {
            "contentTitle": "Leprocaulinus vipera",
            "video": "http://dummyimage.com/227x159.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Local-rel symptc epi w cmplx partial seiz, ntrct, w stat epi"
          },
          {
            "contentTitle": "Fulica cristata",
            "video": "http://dummyimage.com/143x166.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Disp fx of medial wall of left acetabulum, init for clos fx"
          },
          {
            "contentTitle": "Dendrocitta vagabunda",
            "video": "http://dummyimage.com/121x122.png/dddddd/000000",
            "duration": 8,
            "description": "Age-related choroidal atrophy, left eye"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/225x179.png/cc0000/ffffff",
            "duration": 5,
            "description": "Other vascular disorders of iris and ciliary body, left eye"
          },
          {
            "contentTitle": "Corvus brachyrhynchos",
            "video": "http://dummyimage.com/121x159.png/ff4444/ffffff",
            "duration": 8,
            "description": "Epidural hemorrhage w LOC of 6 hours to 24 hours, init"
          },
          {
            "contentTitle": "Nasua narica",
            "video": "http://dummyimage.com/164x217.png/dddddd/000000",
            "duration": 2,
            "description": "Pedestrian w convey injured in collision w hv veh, unsp"
          }
        ]
      },
      {
        "header": "Analyst Programmer",
        "totalMinutes": 21288,
        "contents": [
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/143x223.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Unsp war operations occurring after, milt, subs"
          },
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/136x211.png/dddddd/000000",
            "duration": 10,
            "description": "Lacerat musc/tend anterior grp at lower leg level, left leg"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/177x107.png/dddddd/000000",
            "duration": 7,
            "description": "Prolonged pregnancy"
          },
          {
            "contentTitle": "Buteo regalis",
            "video": "http://dummyimage.com/116x142.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Contusion of other specified part of neck"
          },
          {
            "contentTitle": "Hippotragus equinus",
            "video": "http://dummyimage.com/208x127.png/ff4444/ffffff",
            "duration": 1,
            "description": "Drown due to being washed overboard from water-skis"
          },
          {
            "contentTitle": "Macaca radiata",
            "video": "http://dummyimage.com/126x154.png/cc0000/ffffff",
            "duration": 8,
            "description": "Mixed cndct/snrl hear loss, uni w unrestr hear cntra side"
          },
          {
            "contentTitle": "Aonyx cinerea",
            "video": "http://dummyimage.com/191x177.png/cc0000/ffffff",
            "duration": 6,
            "description": "Disp fx of epiphy (separation) (upper) of r femr, 7thH"
          },
          {
            "contentTitle": "Gorilla gorilla",
            "video": "http://dummyimage.com/243x246.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Snowboarder colliding with stationary object, sequela"
          },
          {
            "contentTitle": "Cercopithecus aethiops",
            "video": "http://dummyimage.com/135x108.png/dddddd/000000",
            "duration": 1,
            "description": "Laceration of pancreas, unspecified degree"
          },
          {
            "contentTitle": "Vanellus chilensis",
            "video": "http://dummyimage.com/243x178.png/cc0000/ffffff",
            "duration": 10,
            "description": "Adhesions due to fb acc left in body following procedure"
          },
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/100x182.png/dddddd/000000",
            "duration": 7,
            "description": "Crushing injury of right ankle, sequela"
          },
          {
            "contentTitle": "Damaliscus lunatus",
            "video": "http://dummyimage.com/140x200.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Open bite of wrist"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/168x130.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Spontaneous rupture of extensor tendons, upper arm"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/102x244.png/ff4444/ffffff",
            "duration": 5,
            "description": "Congenital pulmonary valve stenosis"
          },
          {
            "contentTitle": "Dicrostonyx groenlandicus",
            "video": "http://dummyimage.com/245x225.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Displ unsp condyle fx low end r femr, 7thE"
          },
          {
            "contentTitle": "Tamandua tetradactyla",
            "video": "http://dummyimage.com/158x121.png/cc0000/ffffff",
            "duration": 1,
            "description": "Cardiac catheterization cause abn react/compl, w/o misadvnt"
          },
          {
            "contentTitle": "Phalacrocorax albiventer",
            "video": "http://dummyimage.com/188x123.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Salter-Harris Type I physeal fracture of l calcaneus, 7thD"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/150x168.png/cc0000/ffffff",
            "duration": 2,
            "description": "Arthropathy following intestinal bypass, right hip"
          }
        ]
      },
      {
        "header": "Office Assistant I",
        "totalMinutes": 55651,
        "contents": [
          {
            "contentTitle": "Ceryle rudis",
            "video": "http://dummyimage.com/177x230.png/cc0000/ffffff",
            "duration": 6,
            "description": "Disp fx of body of hamate bone, l wrs, 7thD"
          },
          {
            "contentTitle": "Lorythaixoides concolor",
            "video": "http://dummyimage.com/214x233.png/dddddd/000000",
            "duration": 9,
            "description": "Underdosing of skeletal muscle relaxants, initial encounter"
          },
          {
            "contentTitle": "Kobus leche robertsi",
            "video": "http://dummyimage.com/233x223.png/dddddd/000000",
            "duration": 4,
            "description": "Poisn by phenothiaz antipsychot/neurolept, slf-hrm, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/230x240.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Toxic effect of venom of brown recluse spider, undet, init"
          },
          {
            "contentTitle": "Larus fuliginosus",
            "video": "http://dummyimage.com/119x147.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Other assault by crashing of motor vehicle"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/106x157.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Sprain of jaw, unspecified side, sequela"
          },
          {
            "contentTitle": "Agama sp.",
            "video": "http://dummyimage.com/108x173.png/ff4444/ffffff",
            "duration": 4,
            "description": "Laceration of fallopian tube, unilateral, initial encounter"
          },
          {
            "contentTitle": "Pycnonotus nigricans",
            "video": "http://dummyimage.com/168x220.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Spontaneous rupture of flexor tendons, unsp ankle and foot"
          },
          {
            "contentTitle": "Trichoglossus haematodus moluccanus",
            "video": "http://dummyimage.com/231x245.png/dddddd/000000",
            "duration": 5,
            "description": "Nondisp fx of proximal phalanx of right lesser toe(s)"
          },
          {
            "contentTitle": "Mustela nigripes",
            "video": "http://dummyimage.com/239x225.png/dddddd/000000",
            "duration": 3,
            "description": "Disp fx of lateral end r clavicle, subs for fx w routn heal"
          },
          {
            "contentTitle": "Buteo galapagoensis",
            "video": "http://dummyimage.com/111x104.png/cc0000/ffffff",
            "duration": 2,
            "description": "Blister (nonthermal) of vagina and vulva, initial encounter"
          }
        ]
      },
      {
        "header": "Assistant Professor",
        "totalMinutes": 27521,
        "contents": [
          {
            "contentTitle": "Anitibyx armatus",
            "video": "http://dummyimage.com/127x163.png/cc0000/ffffff",
            "duration": 10,
            "description": "Malignant neoplasm of prepuce"
          },
          {
            "contentTitle": "Terrapene carolina",
            "video": "http://dummyimage.com/243x109.png/ff4444/ffffff",
            "duration": 4,
            "description": "Disp fx of post pro of left talus, subs for fx w nonunion"
          },
          {
            "contentTitle": "Alligator mississippiensis",
            "video": "http://dummyimage.com/149x230.png/dddddd/000000",
            "duration": 4,
            "description": "Nondisp fx of dist phalanx of l idx fngr, 7thD"
          },
          {
            "contentTitle": "Phascogale tapoatafa",
            "video": "http://dummyimage.com/131x187.png/dddddd/000000",
            "duration": 1,
            "description": "Other physeal fracture of phalanx of right toe, 7thD"
          },
          {
            "contentTitle": "Notechis semmiannulatus",
            "video": "http://dummyimage.com/140x181.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Major laceration of body of pancreas, sequela"
          },
          {
            "contentTitle": "Sula dactylatra",
            "video": "http://dummyimage.com/192x216.png/dddddd/000000",
            "duration": 9,
            "description": "Disp fx of l tibial tuberosity, subs for clos fx w malunion"
          },
          {
            "contentTitle": "Tauraco porphyrelophus",
            "video": "http://dummyimage.com/197x224.png/ff4444/ffffff",
            "duration": 8,
            "description": "Unspecified dislocation of left foot, sequela"
          },
          {
            "contentTitle": "Dendrocygna viduata",
            "video": "http://dummyimage.com/199x241.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Personal history of malig neoplasms of organs and systems"
          },
          {
            "contentTitle": "Haliaetus vocifer",
            "video": "http://dummyimage.com/189x146.png/cc0000/ffffff",
            "duration": 10,
            "description": "Nondisp fx of capitate bone, l wrist, subs for fx w nonunion"
          },
          {
            "contentTitle": "Taxidea taxus",
            "video": "http://dummyimage.com/161x162.png/dddddd/000000",
            "duration": 7,
            "description": "Disp fx of lateral malleolus of unspecified fibula, sequela"
          },
          {
            "contentTitle": "Passer domesticus",
            "video": "http://dummyimage.com/110x151.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Explosion on board watercraft"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/163x230.png/dddddd/000000",
            "duration": 5,
            "description": "Benign neoplasm of left ovary"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/201x176.png/ff4444/ffffff",
            "duration": 3,
            "description": "Other congenital deformities of feet"
          },
          {
            "contentTitle": "Acridotheres tristis",
            "video": "http://dummyimage.com/237x123.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Asphyxiation due to being trapped in bed linens"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/233x189.png/dddddd/000000",
            "duration": 8,
            "description": "Disp fx of olecran pro w intartic extn l ulna, 7thQ"
          }
        ]
      }
    ]
  },
  {
    "title": "One of Our Dinosaurs Is Missing",
    "subject": "Services",
    "instructorName": "Rodin Salem",
    "price": 3990.24,
    "level": "Advanced",
    "courseHours": 57,
    "summary": "Pathological fracture, right hand",
    "subtitles": [
      {
        "header": "Librarian",
        "totalMinutes": 4804,
        "contents": [
          {
            "contentTitle": "Spizaetus coronatus",
            "video": "http://dummyimage.com/184x119.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Other disorders of orbit"
          },
          {
            "contentTitle": "Aonyx capensis",
            "video": "http://dummyimage.com/141x161.png/cc0000/ffffff",
            "duration": 1,
            "description": "Corrosion of third degree of unspecified lower leg"
          },
          {
            "contentTitle": "Larus fuliginosus",
            "video": "http://dummyimage.com/228x209.png/cc0000/ffffff",
            "duration": 3,
            "description": "Mech loosening of unsp internal prosthetic joint, sequela"
          },
          {
            "contentTitle": "Phoenicopterus chilensis",
            "video": "http://dummyimage.com/220x103.png/ff4444/ffffff",
            "duration": 5,
            "description": "Unsp fracture of unsp calcaneus, init for opn fx"
          },
          {
            "contentTitle": "Thamnolaea cinnmomeiventris",
            "video": "http://dummyimage.com/221x222.png/cc0000/ffffff",
            "duration": 10,
            "description": "Unspecified fracture of fourth cervical vertebra"
          },
          {
            "contentTitle": "Dendrocitta vagabunda",
            "video": "http://dummyimage.com/129x183.png/ff4444/ffffff",
            "duration": 4,
            "description": "Insect bite (nonvenomous), right great toe, init encntr"
          },
          {
            "contentTitle": "Ursus arctos",
            "video": "http://dummyimage.com/160x161.png/cc0000/ffffff",
            "duration": 4,
            "description": "Nondisp fx of low epiphy (separation) of l femr, 7thH"
          },
          {
            "contentTitle": "Motacilla aguimp",
            "video": "http://dummyimage.com/192x103.png/dddddd/000000",
            "duration": 9,
            "description": "Toxic eff of nitrodrv/aminodrv of benzn/homolog, acc, init"
          },
          {
            "contentTitle": "Phasianus colchicus",
            "video": "http://dummyimage.com/213x182.png/ff4444/ffffff",
            "duration": 6,
            "description": "Sltr-haris Type III physl fx upper end humer, left arm, 7thD"
          }
        ]
      },
      {
        "header": "Senior Quality Engineer",
        "totalMinutes": 63015,
        "contents": [
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/222x106.png/ff4444/ffffff",
            "duration": 3,
            "description": "Encounter for examination for recruitment to armed forces"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/227x204.png/dddddd/000000",
            "duration": 8,
            "description": "Acquired stenosis of external ear canal, unspecified"
          },
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/127x244.png/dddddd/000000",
            "duration": 1,
            "description": "Multiple defects of retina without detachment, left eye"
          },
          {
            "contentTitle": "Upupa epops",
            "video": "http://dummyimage.com/225x176.png/cc0000/ffffff",
            "duration": 8,
            "description": "Hemiplegic migraine, intractable, without status migrainosus"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/145x248.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Arthropathic psoriasis, unspecified"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/197x184.png/dddddd/000000",
            "duration": 3,
            "description": "Pasngr in pk-up/van injured in clsn w unsp mv nontraf, init"
          },
          {
            "contentTitle": "Bos taurus",
            "video": "http://dummyimage.com/114x223.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Burn of third degree of left wrist, subsequent encounter"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/104x210.png/dddddd/000000",
            "duration": 4,
            "description": "Inj oth blood vessels at hip and thigh level, right leg"
          },
          {
            "contentTitle": "Oryx gazella",
            "video": "http://dummyimage.com/211x220.png/ff4444/ffffff",
            "duration": 2,
            "description": "Unsp injury of unsp msl/tnd at ank/ft level, r foot, subs"
          },
          {
            "contentTitle": "Cathartes aura",
            "video": "http://dummyimage.com/146x132.png/dddddd/000000",
            "duration": 10,
            "description": "Adverse effect of parasympatholytics and spasmolytics, init"
          },
          {
            "contentTitle": "Ovis ammon",
            "video": "http://dummyimage.com/100x195.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Nondisplaced Zone I fracture of sacrum"
          },
          {
            "contentTitle": "Dipodomys deserti",
            "video": "http://dummyimage.com/214x207.png/cc0000/ffffff",
            "duration": 3,
            "description": "Other specified osteochondropathies other"
          },
          {
            "contentTitle": "Falco peregrinus",
            "video": "http://dummyimage.com/160x109.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Laceration without foreign body, left ankle"
          }
        ]
      },
      {
        "header": "Tax Accountant",
        "totalMinutes": 14001,
        "contents": [
          {
            "contentTitle": "Castor canadensis",
            "video": "http://dummyimage.com/223x246.png/cc0000/ffffff",
            "duration": 4,
            "description": "Other types of follicular lymphoma"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/233x162.png/ff4444/ffffff",
            "duration": 2,
            "description": "Unsp inj unsp musc/fasc/tend at forarm lv, unsp arm, sequela"
          },
          {
            "contentTitle": "Crocodylus niloticus",
            "video": "http://dummyimage.com/144x115.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Unspecified injury of dorsal vein of right foot, sequela"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/222x119.png/ff4444/ffffff",
            "duration": 5,
            "description": "Toxic effect of carbon disulfide, self-harm, init"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/185x235.png/ff4444/ffffff",
            "duration": 3,
            "description": "Unspecified physeal fracture of right calcaneus"
          },
          {
            "contentTitle": "Arctogalidia trivirgata",
            "video": "http://dummyimage.com/210x102.png/dddddd/000000",
            "duration": 7,
            "description": "Inj flexor musc/fasc/tend left index finger at wrs/hnd lv"
          },
          {
            "contentTitle": "Chloephaga melanoptera",
            "video": "http://dummyimage.com/141x240.png/dddddd/000000",
            "duration": 7,
            "description": "Crushing injury of right elbow"
          },
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/148x201.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Nondisp fx of distal phalanx of left lesser toe(s), sequela"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/176x203.png/ff4444/ffffff",
            "duration": 4,
            "description": "Maternal care for intrauterine death, fetus 2"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/126x165.png/cc0000/ffffff",
            "duration": 6,
            "description": "Posterior dislocation of unspecified sternoclavicular joint"
          },
          {
            "contentTitle": "Merops nubicus",
            "video": "http://dummyimage.com/100x125.png/ff4444/ffffff",
            "duration": 6,
            "description": "Sltr-haris Type I physeal fx right metatarsal, sequela"
          },
          {
            "contentTitle": "Vanellus chilensis",
            "video": "http://dummyimage.com/129x143.png/dddddd/000000",
            "duration": 7,
            "description": "Oth war operations occurring after, milt, sequela"
          },
          {
            "contentTitle": "Spermophilus armatus",
            "video": "http://dummyimage.com/211x229.png/dddddd/000000",
            "duration": 6,
            "description": "Poisoning by unsp antipsychot/neurolept, assault, init"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/150x106.png/cc0000/ffffff",
            "duration": 7,
            "description": "Greenstick fracture of shaft of humerus, right arm, init"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/195x198.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Assault by other specified means, initial encounter"
          }
        ]
      },
      {
        "header": "Nurse",
        "totalMinutes": 19394,
        "contents": [
          {
            "contentTitle": "Crotalus adamanteus",
            "video": "http://dummyimage.com/110x244.png/cc0000/ffffff",
            "duration": 8,
            "description": "Unspecified dislocation of unspecified patella"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/147x151.png/dddddd/000000",
            "duration": 5,
            "description": "Nondisplaced fracture of lesser tuberosity of right humerus"
          },
          {
            "contentTitle": "Plocepasser mahali",
            "video": "http://dummyimage.com/220x142.png/cc0000/ffffff",
            "duration": 5,
            "description": "Subluxation of distal end of unspecified ulna, init encntr"
          },
          {
            "contentTitle": "Speotyte cuniculata",
            "video": "http://dummyimage.com/217x209.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Nondisp fx of med phalanx of unsp less toe(s), 7thP"
          }
        ]
      },
      {
        "header": "Environmental Tech",
        "totalMinutes": 19960,
        "contents": [
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/153x144.png/ff4444/ffffff",
            "duration": 3,
            "description": "Food in pharynx causing other injury, sequela"
          },
          {
            "contentTitle": "Zenaida galapagoensis",
            "video": "http://dummyimage.com/226x239.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Burn of third degree of unspecified palm, sequela"
          },
          {
            "contentTitle": "Priodontes maximus",
            "video": "http://dummyimage.com/122x194.png/ff4444/ffffff",
            "duration": 1,
            "description": "Post traumatic seizures"
          },
          {
            "contentTitle": "Echimys chrysurus",
            "video": "http://dummyimage.com/181x202.png/cc0000/ffffff",
            "duration": 4,
            "description": "Urethral disorder, unspecified"
          },
          {
            "contentTitle": "Morelia spilotes variegata",
            "video": "http://dummyimage.com/108x132.png/ff4444/ffffff",
            "duration": 3,
            "description": "Burn of 3rd deg mu right fingers (nail), inc thumb, init"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/245x103.png/cc0000/ffffff",
            "duration": 6,
            "description": "Unspecified injury of right ankle, subsequent encounter"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/101x229.png/cc0000/ffffff",
            "duration": 3,
            "description": "Other psychoactive substance abuse, uncomplicated"
          }
        ]
      },
      {
        "header": "Media Manager IV",
        "totalMinutes": 85154,
        "contents": [
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/101x224.png/cc0000/ffffff",
            "duration": 1,
            "description": "Inj intrinsic musc/fasc/tend finger at wrs/hnd lv, subs"
          },
          {
            "contentTitle": "Phasianus colchicus",
            "video": "http://dummyimage.com/165x233.png/ff4444/ffffff",
            "duration": 6,
            "description": "Calcific tendinitis, unspecified upper arm"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/247x115.png/ff4444/ffffff",
            "duration": 2,
            "description": "Occupant of streetcar injured by fall in streetcar, init"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/133x157.png/cc0000/ffffff",
            "duration": 1,
            "description": "Unspecified juvenile rheumatoid arthritis, left hip"
          },
          {
            "contentTitle": "Sarcorhamphus papa",
            "video": "http://dummyimage.com/135x151.png/cc0000/ffffff",
            "duration": 10,
            "description": "Ankylosis, unspecified hand"
          },
          {
            "contentTitle": "Alcelaphus buselaphus cokii",
            "video": "http://dummyimage.com/151x200.png/dddddd/000000",
            "duration": 6,
            "description": "Poisoning by antimycobacterial drugs, undetermined"
          },
          {
            "contentTitle": "Vanellus armatus",
            "video": "http://dummyimage.com/147x167.png/ff4444/ffffff",
            "duration": 3,
            "description": "Animl-ridr injured in collision w anml-drn vehicle, sequela"
          },
          {
            "contentTitle": "Herpestes javanicus",
            "video": "http://dummyimage.com/235x245.png/ff4444/ffffff",
            "duration": 4,
            "description": "Glasgow coma scale score 9-12, EMR"
          },
          {
            "contentTitle": "Uraeginthus angolensis",
            "video": "http://dummyimage.com/203x124.png/ff4444/ffffff",
            "duration": 2,
            "description": "Nondisp fx of proximal third of navicular bone of left wrist"
          },
          {
            "contentTitle": "Camelus dromedarius",
            "video": "http://dummyimage.com/124x120.png/cc0000/ffffff",
            "duration": 7,
            "description": "Burn of unspecified degree of right ear, subs encntr"
          },
          {
            "contentTitle": "Pycnonotus barbatus",
            "video": "http://dummyimage.com/230x105.png/dddddd/000000",
            "duration": 6,
            "description": "Disp fx of ant wall of r acetab, subs for fx w delay heal"
          },
          {
            "contentTitle": "Propithecus verreauxi",
            "video": "http://dummyimage.com/177x202.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Subacute osteomyelitis, unspecified ankle and foot"
          },
          {
            "contentTitle": "Cyrtodactylus louisiadensis",
            "video": "http://dummyimage.com/222x250.png/ff4444/ffffff",
            "duration": 3,
            "description": "Unspecified dislocation of left radial head, subs encntr"
          }
        ]
      },
      {
        "header": "Technical Writer",
        "totalMinutes": 20006,
        "contents": [
          {
            "contentTitle": "Gazella granti",
            "video": "http://dummyimage.com/158x123.png/cc0000/ffffff",
            "duration": 7,
            "description": "Adverse effect of other hormone antagonists, init encntr"
          },
          {
            "contentTitle": "Galago crassicaudataus",
            "video": "http://dummyimage.com/225x174.png/dddddd/000000",
            "duration": 3,
            "description": "Glaucoma w increased episcleral venous pressure, right eye"
          },
          {
            "contentTitle": "Smithopsis crassicaudata",
            "video": "http://dummyimage.com/164x165.png/ff4444/ffffff",
            "duration": 8,
            "description": "Natural environment type phobia"
          },
          {
            "contentTitle": "Heloderma horridum",
            "video": "http://dummyimage.com/228x208.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Nondisp commnt fx shaft of r fibula, 7thE"
          },
          {
            "contentTitle": "Bubalornis niger",
            "video": "http://dummyimage.com/214x196.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Coalworker's pneumoconiosis"
          },
          {
            "contentTitle": "Leipoa ocellata",
            "video": "http://dummyimage.com/240x113.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Retain (old) intraoc fb, nonmag, in oth or mult sites, l eye"
          },
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/232x199.png/cc0000/ffffff",
            "duration": 7,
            "description": "Third-stage hemorrhage"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/217x174.png/ff4444/ffffff",
            "duration": 6,
            "description": "Osteochondritis dissecans, unsp ankle and joints of foot"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/199x222.png/cc0000/ffffff",
            "duration": 10,
            "description": "Disseminated intravascular coagulation of newborn"
          },
          {
            "contentTitle": "Larus dominicanus",
            "video": "http://dummyimage.com/106x220.png/dddddd/000000",
            "duration": 4,
            "description": "Lacerat great saphenous at low leg level, unsp leg, sequela"
          },
          {
            "contentTitle": "Lama guanicoe",
            "video": "http://dummyimage.com/122x234.png/ff4444/ffffff",
            "duration": 8,
            "description": "Other specified dorsopathies"
          },
          {
            "contentTitle": "Catharacta skua",
            "video": "http://dummyimage.com/187x127.png/ff4444/ffffff",
            "duration": 7,
            "description": "Adverse effect of other synthetic narcotics, subs encntr"
          },
          {
            "contentTitle": "Snycerus caffer",
            "video": "http://dummyimage.com/208x176.png/dddddd/000000",
            "duration": 4,
            "description": "Indeterminate colitis"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/144x250.png/dddddd/000000",
            "duration": 8,
            "description": "Other branchial cleft malformations"
          }
        ]
      },
      {
        "header": "Quality Engineer",
        "totalMinutes": 75407,
        "contents": [
          {
            "contentTitle": "Cercopithecus aethiops",
            "video": "http://dummyimage.com/111x127.png/dddddd/000000",
            "duration": 4,
            "description": "Poisoning by enzymes, assault"
          },
          {
            "contentTitle": "Phoeniconaias minor",
            "video": "http://dummyimage.com/111x112.png/ff4444/ffffff",
            "duration": 6,
            "description": "Laceration without foreign body of vocal cord, sequela"
          },
          {
            "contentTitle": "Meleagris gallopavo",
            "video": "http://dummyimage.com/148x103.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Injury of peritoneum, initial encounter"
          },
          {
            "contentTitle": "Rhabdomys pumilio",
            "video": "http://dummyimage.com/197x127.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Strain of msl/fasc/tnd posterior muscle group at thigh level"
          },
          {
            "contentTitle": "Sauromalus obesus",
            "video": "http://dummyimage.com/127x165.png/ff4444/ffffff",
            "duration": 7,
            "description": "Burn of first deg mult sites of left ankle and foot, sequela"
          },
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/242x148.png/cc0000/ffffff",
            "duration": 9,
            "description": "Unsp injury of unspecified tibial artery, unspecified leg"
          }
        ]
      },
      {
        "header": "Marketing Assistant",
        "totalMinutes": 92168,
        "contents": [
          {
            "contentTitle": "Hippopotamus amphibius",
            "video": "http://dummyimage.com/224x181.png/dddddd/000000",
            "duration": 4,
            "description": "Maternal care for oth fetal problems, second tri, fetus 4"
          },
          {
            "contentTitle": "Pavo cristatus",
            "video": "http://dummyimage.com/231x192.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Contusion of left lower leg, initial encounter"
          },
          {
            "contentTitle": "Leptoptilos crumeniferus",
            "video": "http://dummyimage.com/101x149.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Nicotine dependence, chewing tobacco"
          },
          {
            "contentTitle": "Neotis denhami",
            "video": "http://dummyimage.com/143x234.png/cc0000/ffffff",
            "duration": 6,
            "description": "Dislocation of distal interphaln joint of l rng fngr, subs"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/158x235.png/ff4444/ffffff",
            "duration": 7,
            "description": "Complete traum amp at level betw unsp hip and knee, sequela"
          },
          {
            "contentTitle": "Streptopelia senegalensis",
            "video": "http://dummyimage.com/106x170.png/dddddd/000000",
            "duration": 10,
            "description": "Lacerat unsp blood vessel at shldr/up arm, left arm, subs"
          },
          {
            "contentTitle": "Antechinus flavipes",
            "video": "http://dummyimage.com/233x212.png/cc0000/ffffff",
            "duration": 1,
            "description": "Glaucoma sec to oth eye disord, l eye, indeterminate stage"
          },
          {
            "contentTitle": "Larus dominicanus",
            "video": "http://dummyimage.com/227x182.png/ff4444/ffffff",
            "duration": 3,
            "description": "Partial loss of teeth due to trauma, unspecified class"
          },
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/134x120.png/ff4444/ffffff",
            "duration": 6,
            "description": "Intentional self-harm by drown in natural water, init"
          },
          {
            "contentTitle": "Bucephala clangula",
            "video": "http://dummyimage.com/202x172.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Burn unsp deg of shldr/up lmb, ex wrs/hnd, unsp site, sqla"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/190x230.png/dddddd/000000",
            "duration": 9,
            "description": "Leucocoria, bilateral"
          },
          {
            "contentTitle": "Libellula quadrimaculata",
            "video": "http://dummyimage.com/201x118.png/cc0000/ffffff",
            "duration": 1,
            "description": "Accidental pnctr & lac of skin, subcu during a procedure"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/102x153.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Sltr-haris Type I physl fx low end rad, l arm, 7thD"
          },
          {
            "contentTitle": "Bubo virginianus",
            "video": "http://dummyimage.com/102x159.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Non-neuropathic heredofamilial amyloidosis"
          },
          {
            "contentTitle": "Larus fuliginosus",
            "video": "http://dummyimage.com/203x203.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Underdosing of unspecified antidepressants, subs encntr"
          },
          {
            "contentTitle": "Leptoptilus dubius",
            "video": "http://dummyimage.com/153x230.png/cc0000/ffffff",
            "duration": 8,
            "description": "Unsp mtrcy rider inj in clsn w nonmtr vehicle in traf, init"
          },
          {
            "contentTitle": "Macropus eugenii",
            "video": "http://dummyimage.com/120x106.png/dddddd/000000",
            "duration": 9,
            "description": "Poisoning by other psychostimulants, undetermined"
          },
          {
            "contentTitle": "Buteo jamaicensis",
            "video": "http://dummyimage.com/163x179.png/ff4444/ffffff",
            "duration": 3,
            "description": "Disp fx of pisiform, right wrist, subs for fx w malunion"
          }
        ]
      },
      {
        "header": "Marketing Assistant",
        "totalMinutes": 54354,
        "contents": [
          {
            "contentTitle": "Buteo jamaicensis",
            "video": "http://dummyimage.com/186x109.png/ff4444/ffffff",
            "duration": 2,
            "description": "Displ seg fx shaft of unsp fibula, 7thD"
          },
          {
            "contentTitle": "Ceratotherium simum",
            "video": "http://dummyimage.com/190x243.png/cc0000/ffffff",
            "duration": 1,
            "description": "Unspecified lagophthalmos left eye, unspecified eyelid"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/130x197.png/dddddd/000000",
            "duration": 6,
            "description": "Superficial frostbite of right finger(s), sequela"
          },
          {
            "contentTitle": "Acanthaster planci",
            "video": "http://dummyimage.com/185x206.png/cc0000/ffffff",
            "duration": 8,
            "description": "Furuncle, unspecified"
          },
          {
            "contentTitle": "Tragelaphus scriptus",
            "video": "http://dummyimage.com/122x118.png/dddddd/000000",
            "duration": 4,
            "description": "Threatened abortion"
          },
          {
            "contentTitle": "Naja nivea",
            "video": "http://dummyimage.com/208x218.png/dddddd/000000",
            "duration": 5,
            "description": "Disp fx of lateral malleolus of l fibula, 7thH"
          },
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/200x118.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Feeding difficulties"
          },
          {
            "contentTitle": "Ctenophorus ornatus",
            "video": "http://dummyimage.com/216x246.png/dddddd/000000",
            "duration": 3,
            "description": "Papyraceous fetus, second trimester, fetus 2"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/241x210.png/ff4444/ffffff",
            "duration": 2,
            "description": "Ruvalcaba-Myhre-Smith syndrome"
          },
          {
            "contentTitle": "Bettongia penicillata",
            "video": "http://dummyimage.com/139x176.png/cc0000/ffffff",
            "duration": 8,
            "description": "Presence of cardiac pacemaker"
          },
          {
            "contentTitle": "Myrmecophaga tridactyla",
            "video": "http://dummyimage.com/160x246.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Chondromalacia, left ankle and joints of left foot"
          },
          {
            "contentTitle": "Genetta genetta",
            "video": "http://dummyimage.com/223x215.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Dislocation of unsp interphaln joint of right thumb, subs"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/112x131.png/cc0000/ffffff",
            "duration": 1,
            "description": "Contusion, laceration, and hemorrhage of brainstem"
          },
          {
            "contentTitle": "Axis axis",
            "video": "http://dummyimage.com/193x238.png/ff4444/ffffff",
            "duration": 3,
            "description": "Superficial foreign body, unspecified great toe, subs encntr"
          },
          {
            "contentTitle": "Bubulcus ibis",
            "video": "http://dummyimage.com/177x186.png/cc0000/ffffff",
            "duration": 7,
            "description": "Osteitis deformans of lower leg"
          },
          {
            "contentTitle": "Ploceus rubiginosus",
            "video": "http://dummyimage.com/167x183.png/ff4444/ffffff",
            "duration": 3,
            "description": "Other injury of celiac artery"
          },
          {
            "contentTitle": "Smithopsis crassicaudata",
            "video": "http://dummyimage.com/179x181.png/ff4444/ffffff",
            "duration": 5,
            "description": "War operations involving oth explosn and fragments, civilian"
          },
          {
            "contentTitle": "Tamandua tetradactyla",
            "video": "http://dummyimage.com/132x115.png/dddddd/000000",
            "duration": 1,
            "description": "Disp fx of 2nd metatarsal bone, r ft, subs for fx w malunion"
          },
          {
            "contentTitle": "Priodontes maximus",
            "video": "http://dummyimage.com/174x122.png/ff4444/ffffff",
            "duration": 8,
            "description": "Toxic eff of halgn deriv of aliphatic hydrocrb, acc, sqla"
          }
        ]
      },
      {
        "header": "Community Outreach Specialist",
        "totalMinutes": 62153,
        "contents": [
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/205x218.png/cc0000/ffffff",
            "duration": 4,
            "description": "Struck by skate blades, sequela"
          },
          {
            "contentTitle": "Dolichitus patagonum",
            "video": "http://dummyimage.com/123x113.png/ff4444/ffffff",
            "duration": 4,
            "description": "Assault by human bite, subsequent encounter"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/115x110.png/cc0000/ffffff",
            "duration": 7,
            "description": "Nondisp fx of med phalanx of r lit fngr, 7thP"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/187x227.png/dddddd/000000",
            "duration": 5,
            "description": "Non-pressure chronic ulcer of unsp ankle w necrosis of bone"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/236x161.png/dddddd/000000",
            "duration": 2,
            "description": "Other fractures of lower end of right radius"
          },
          {
            "contentTitle": "Arctogalidia trivirgata",
            "video": "http://dummyimage.com/194x157.png/dddddd/000000",
            "duration": 5,
            "description": "Stress fracture, unspecified ulna and radius, sequela"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/163x101.png/dddddd/000000",
            "duration": 1,
            "description": "Unsp inj extn/abdr musc/fasc/tend of r thm at forarm lv,sqla"
          },
          {
            "contentTitle": "Toxostoma curvirostre",
            "video": "http://dummyimage.com/142x104.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Laceration with foreign body of lip, initial encounter"
          }
        ]
      }
    ]
  },
  {
    "title": "Half Nelson",
    "subject": "Human Resources",
    "instructorName": "Rodin Salem",
    "price": 2243.31,
    "level": "Intermediate",
    "courseHours": 170,
    "summary": "Memory deficit following other ntrm intcrn hemorrhage",
    "subtitles": [
      {
        "header": "Teacher",
        "totalMinutes": 94987,
        "contents": [
          {
            "contentTitle": "Ploceus intermedius",
            "video": "http://dummyimage.com/210x230.png/dddddd/000000",
            "duration": 8,
            "description": "Unsp fracture of left femur, subs for clos fx w malunion"
          },
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/216x167.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Nondisp fx of nk of 1st MC bone, unsp hand, 7thK"
          },
          {
            "contentTitle": "Dasyurus viverrinus",
            "video": "http://dummyimage.com/163x103.png/ff4444/ffffff",
            "duration": 6,
            "description": "Inhalant use, unspecified with intoxication"
          },
          {
            "contentTitle": "Creagrus furcatus",
            "video": "http://dummyimage.com/123x158.png/cc0000/ffffff",
            "duration": 2,
            "description": "Car passenger injured in collision w SUV nontraf, init"
          }
        ]
      },
      {
        "header": "Project Manager",
        "totalMinutes": 73342,
        "contents": [
          {
            "contentTitle": "Oxybelis fulgidus",
            "video": "http://dummyimage.com/180x225.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp dislocation of unspecified radial head, init encntr"
          },
          {
            "contentTitle": "Thalasseus maximus",
            "video": "http://dummyimage.com/154x176.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Oth foreign body or object entering through skin, init"
          },
          {
            "contentTitle": "Zosterops pallidus",
            "video": "http://dummyimage.com/219x239.png/ff4444/ffffff",
            "duration": 2,
            "description": "Legal intervnt involving oth gas, bystander injured, sequela"
          },
          {
            "contentTitle": "Equus hemionus",
            "video": "http://dummyimage.com/196x209.png/ff4444/ffffff",
            "duration": 9,
            "description": "Poisoning by antitussives, intentional self-harm"
          },
          {
            "contentTitle": "Eurocephalus anguitimens",
            "video": "http://dummyimage.com/171x243.png/dddddd/000000",
            "duration": 10,
            "description": "Unsp fb in esophagus causing compression of trachea"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/186x180.png/dddddd/000000",
            "duration": 6,
            "description": "Major depressive disorder, single episode, mild"
          },
          {
            "contentTitle": "Struthio camelus",
            "video": "http://dummyimage.com/241x243.png/dddddd/000000",
            "duration": 9,
            "description": "Laceration of superficial palmar arch of right hand"
          },
          {
            "contentTitle": "Antilope cervicapra",
            "video": "http://dummyimage.com/232x103.png/dddddd/000000",
            "duration": 10,
            "description": "Nondisp dome fracture of unsp talus, subs for fx w malunion"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/202x135.png/cc0000/ffffff",
            "duration": 8,
            "description": "Injury of tibial nerve at lower leg level, unspecified leg"
          },
          {
            "contentTitle": "Madoqua kirkii",
            "video": "http://dummyimage.com/232x158.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Toxic effect of venom of other arthropods"
          },
          {
            "contentTitle": "Halcyon smyrnesis",
            "video": "http://dummyimage.com/249x158.png/ff4444/ffffff",
            "duration": 9,
            "description": "Panniculitis affecting regions of neck/bk, thoracic region"
          },
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/220x224.png/cc0000/ffffff",
            "duration": 7,
            "description": "Juvenile arthritis, unspecified, unspecified hip"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/229x138.png/dddddd/000000",
            "duration": 5,
            "description": "Spontaneous rupture of other tendons, unspecified forearm"
          },
          {
            "contentTitle": "Spermophilus lateralis",
            "video": "http://dummyimage.com/176x174.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Pemphigus, unspecified"
          },
          {
            "contentTitle": "Ursus maritimus",
            "video": "http://dummyimage.com/148x138.png/ff4444/ffffff",
            "duration": 5,
            "description": "Labor and delivery comp by cord around neck, w/o compression"
          },
          {
            "contentTitle": "Chordeiles minor",
            "video": "http://dummyimage.com/130x117.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Poisoning by oth vaccines and biolg substnc, self-harm, subs"
          },
          {
            "contentTitle": "Dasyurus viverrinus",
            "video": "http://dummyimage.com/160x171.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Strain of extensor musc/fasc/tend l thm at wrs/hnd lv, subs"
          },
          {
            "contentTitle": "Ursus americanus",
            "video": "http://dummyimage.com/122x137.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Laceration without foreign body of oral cavity"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/108x171.png/cc0000/ffffff",
            "duration": 5,
            "description": "Unsp inj unsp blood vess at low leg level, unsp leg, sequela"
          }
        ]
      },
      {
        "header": "Registered Nurse",
        "totalMinutes": 5328,
        "contents": [
          {
            "contentTitle": "Genetta genetta",
            "video": "http://dummyimage.com/142x133.png/cc0000/ffffff",
            "duration": 1,
            "description": "Nondisplaced segmental fracture of shaft of left fibula"
          },
          {
            "contentTitle": "Panthera leo persica",
            "video": "http://dummyimage.com/192x150.png/dddddd/000000",
            "duration": 8,
            "description": "Assault by other hot objects, subsequent encounter"
          },
          {
            "contentTitle": "Proteles cristatus",
            "video": "http://dummyimage.com/173x152.png/cc0000/ffffff",
            "duration": 6,
            "description": "Mycosis fungoides, lymph nodes of multiple sites"
          },
          {
            "contentTitle": "Eutamias minimus",
            "video": "http://dummyimage.com/167x127.png/dddddd/000000",
            "duration": 8,
            "description": "Corrosion of unsp degree of right upper arm, init encntr"
          },
          {
            "contentTitle": "Acridotheres tristis",
            "video": "http://dummyimage.com/135x170.png/cc0000/ffffff",
            "duration": 5,
            "description": "Encntr for suprvsn of normal first pregnancy, unsp trimester"
          },
          {
            "contentTitle": "Helogale undulata",
            "video": "http://dummyimage.com/164x222.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Traum hemor r cereb w LOC w dth d/t brain inj bf consc, init"
          },
          {
            "contentTitle": "Plectopterus gambensis",
            "video": "http://dummyimage.com/209x214.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Other specified deforming dorsopathies"
          }
        ]
      },
      {
        "header": "Community Outreach Specialist",
        "totalMinutes": 53848,
        "contents": [
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/174x164.png/cc0000/ffffff",
            "duration": 6,
            "description": "Sltr-haris Type IV physl fx low end unsp femr, 7thK"
          },
          {
            "contentTitle": "Funambulus pennati",
            "video": "http://dummyimage.com/150x219.png/dddddd/000000",
            "duration": 7,
            "description": "Fall same lev from slip/trip w strike agnst unsp obj, sqla"
          },
          {
            "contentTitle": "Conolophus subcristatus",
            "video": "http://dummyimage.com/102x230.png/dddddd/000000",
            "duration": 4,
            "description": "Person outside bus injured in clsn w rail trn/veh in traf"
          },
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/231x167.png/cc0000/ffffff",
            "duration": 6,
            "description": "Pnctr w fb of left lesser toe(s) w/o damage to nail, sequela"
          },
          {
            "contentTitle": "Alcelaphus buselaphus caama",
            "video": "http://dummyimage.com/171x231.png/ff4444/ffffff",
            "duration": 2,
            "description": "Osteitis deformans of right upper arm"
          },
          {
            "contentTitle": "Madoqua kirkii",
            "video": "http://dummyimage.com/103x137.png/dddddd/000000",
            "duration": 4,
            "description": "Maternal care for hydrops fetalis, unsp trimester, fetus 3"
          },
          {
            "contentTitle": "Arctogalidia trivirgata",
            "video": "http://dummyimage.com/132x163.png/ff4444/ffffff",
            "duration": 6,
            "description": "Gout due to renal impairment, unspecified wrist"
          },
          {
            "contentTitle": "Tachyglossus aculeatus",
            "video": "http://dummyimage.com/234x175.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Oth extrartic fx low end r rad, 7thH"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/126x152.png/cc0000/ffffff",
            "duration": 6,
            "description": "Nondisplaced intertrochanteric fracture of unsp femur, init"
          },
          {
            "contentTitle": "Gyps fulvus",
            "video": "http://dummyimage.com/226x143.png/cc0000/ffffff",
            "duration": 4,
            "description": "Diseases of the dgstv sys comp pregnancy, third trimester"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/142x100.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Disp fx of medial condyle of unsp humerus, init for clos fx"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/192x113.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Lacerat unsp musc/fasc/tend at shldr/up arm, left arm, init"
          }
        ]
      },
      {
        "header": "Compensation Analyst",
        "totalMinutes": 66434,
        "contents": [
          {
            "contentTitle": "Giraffe camelopardalis",
            "video": "http://dummyimage.com/213x250.png/dddddd/000000",
            "duration": 6,
            "description": "Puncture wound without foreign body of hand"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/147x225.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other cyst of bone, left upper arm"
          },
          {
            "contentTitle": "Zenaida asiatica",
            "video": "http://dummyimage.com/106x217.png/cc0000/ffffff",
            "duration": 2,
            "description": "Cntct w and expsr to intestnl infct dis d/t E coli (E. coli)"
          },
          {
            "contentTitle": "Gymnorhina tibicen",
            "video": "http://dummyimage.com/138x121.png/dddddd/000000",
            "duration": 5,
            "description": "Unspecified otosclerosis"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/104x207.png/dddddd/000000",
            "duration": 10,
            "description": "Sltr-haris Type III physl fx low end humer, right arm, init"
          },
          {
            "contentTitle": "Haliaeetus leucoryphus",
            "video": "http://dummyimage.com/151x103.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Fall into well, subsequent encounter"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/120x217.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Unspecified hereditary retinal dystrophy"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/227x247.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Fall (on)(from) incline, subsequent encounter"
          },
          {
            "contentTitle": "Zalophus californicus",
            "video": "http://dummyimage.com/146x139.png/cc0000/ffffff",
            "duration": 8,
            "description": "Acute respiratory failure with hypoxia"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/147x230.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Flail joint, left hip"
          },
          {
            "contentTitle": "Francolinus leucoscepus",
            "video": "http://dummyimage.com/226x117.png/dddddd/000000",
            "duration": 7,
            "description": "Contus/lac l cereb w LOC >24 hr w ret consc lev, sequela"
          },
          {
            "contentTitle": "Zosterops pallidus",
            "video": "http://dummyimage.com/222x185.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Incarcerated fx of medial epicondyl of unsp humerus, sequela"
          },
          {
            "contentTitle": "Ratufa indica",
            "video": "http://dummyimage.com/187x105.png/ff4444/ffffff",
            "duration": 4,
            "description": "Major depressive disorder, single episode"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/218x230.png/cc0000/ffffff",
            "duration": 5,
            "description": "Adverse effect of other topical agents"
          },
          {
            "contentTitle": "Macaca mulatta",
            "video": "http://dummyimage.com/203x214.png/dddddd/000000",
            "duration": 1,
            "description": "Spotted fever due to Rickettsia siberica"
          },
          {
            "contentTitle": "Connochaetus taurinus",
            "video": "http://dummyimage.com/167x174.png/cc0000/ffffff",
            "duration": 1,
            "description": "Person outside hv veh inj in clsn w pedl cyc in traf, init"
          },
          {
            "contentTitle": "Heloderma horridum",
            "video": "http://dummyimage.com/132x155.png/ff4444/ffffff",
            "duration": 4,
            "description": "Adverse effect of other psychostimulants, initial encounter"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/175x185.png/cc0000/ffffff",
            "duration": 7,
            "description": "Nondisp oblique fx shaft of unsp fibula, 7thD"
          }
        ]
      },
      {
        "header": "Pharmacist",
        "totalMinutes": 33224,
        "contents": [
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/116x145.png/cc0000/ffffff",
            "duration": 9,
            "description": "Encounter for fit/adjst of external left breast prosthesis"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/111x149.png/cc0000/ffffff",
            "duration": 9,
            "description": "Milt op w dest arcrft due to acc deton onboard munit, milt"
          },
          {
            "contentTitle": "Egretta thula",
            "video": "http://dummyimage.com/207x215.png/cc0000/ffffff",
            "duration": 3,
            "description": "Contusion of unspecified forearm, initial encounter"
          },
          {
            "contentTitle": "Streptopelia senegalensis",
            "video": "http://dummyimage.com/225x185.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Unspecified cleft palate with unilateral cleft lip"
          },
          {
            "contentTitle": "Naja haje",
            "video": "http://dummyimage.com/174x120.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Nondisplaced fracture of anterior column of right acetabulum"
          },
          {
            "contentTitle": "Coluber constrictor foxii",
            "video": "http://dummyimage.com/160x232.png/dddddd/000000",
            "duration": 7,
            "description": "Unsp superficial injury of unspecified ear, init encntr"
          },
          {
            "contentTitle": "Antilocapra americana",
            "video": "http://dummyimage.com/179x247.png/cc0000/ffffff",
            "duration": 4,
            "description": "Bacterial meningitis, not elsewhere classified"
          },
          {
            "contentTitle": "Panthera pardus",
            "video": "http://dummyimage.com/245x168.png/dddddd/000000",
            "duration": 7,
            "description": "Benign neoplasm of other and unspecified sites"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/222x230.png/cc0000/ffffff",
            "duration": 3,
            "description": "Open bite of abd wall, l upr q w/o penet perit cav, init"
          },
          {
            "contentTitle": "Larus novaehollandiae",
            "video": "http://dummyimage.com/143x117.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Failed school examinations"
          },
          {
            "contentTitle": "Felis serval",
            "video": "http://dummyimage.com/135x245.png/ff4444/ffffff",
            "duration": 5,
            "description": "Sedative, hypnotic or anxiolytic dependence w oth disorder"
          },
          {
            "contentTitle": "Cathartes aura",
            "video": "http://dummyimage.com/223x135.png/dddddd/000000",
            "duration": 2,
            "description": "Unsp car occupant injured in collision w oth mv in traf"
          },
          {
            "contentTitle": "Galictis vittata",
            "video": "http://dummyimage.com/207x219.png/cc0000/ffffff",
            "duration": 5,
            "description": "Nondisp longitud fx unsp patella, 7thR"
          }
        ]
      },
      {
        "header": "Chief Design Engineer",
        "totalMinutes": 69079,
        "contents": [
          {
            "contentTitle": "Paradoxurus hermaphroditus",
            "video": "http://dummyimage.com/118x208.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Acute embolism and thrombosis of popliteal vein, bilateral"
          },
          {
            "contentTitle": "Dicrostonyx groenlandicus",
            "video": "http://dummyimage.com/240x244.png/ff4444/ffffff",
            "duration": 5,
            "description": "Superficial foreign body of throat, subsequent encounter"
          },
          {
            "contentTitle": "Carduelis pinus",
            "video": "http://dummyimage.com/136x215.png/dddddd/000000",
            "duration": 9,
            "description": "Toxic effect of other organic solvents, assault, sequela"
          },
          {
            "contentTitle": "Felis concolor",
            "video": "http://dummyimage.com/127x146.png/cc0000/ffffff",
            "duration": 8,
            "description": "Benign essential microscopic hematuria"
          },
          {
            "contentTitle": "Leipoa ocellata",
            "video": "http://dummyimage.com/145x146.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Unsp injury to unspecified level of lumbar spinal cord"
          }
        ]
      },
      {
        "header": "Tax Accountant",
        "totalMinutes": 46011,
        "contents": [
          {
            "contentTitle": "Kobus vardonii vardoni",
            "video": "http://dummyimage.com/148x193.png/dddddd/000000",
            "duration": 9,
            "description": "Subluxation of T7/T8 thoracic vertebra"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/243x230.png/dddddd/000000",
            "duration": 10,
            "description": "Unsp fracture of T7-T8 vertebra, subs for fx w nonunion"
          },
          {
            "contentTitle": "Ephippiorhynchus mycteria",
            "video": "http://dummyimage.com/222x146.png/dddddd/000000",
            "duration": 2,
            "description": "Urogenital trichomoniasis, unspecified"
          },
          {
            "contentTitle": "Propithecus verreauxi",
            "video": "http://dummyimage.com/121x191.png/ff4444/ffffff",
            "duration": 10,
            "description": "Other injury of duodenum, sequela"
          },
          {
            "contentTitle": "Alouatta seniculus",
            "video": "http://dummyimage.com/160x127.png/ff4444/ffffff",
            "duration": 9,
            "description": "Non-follic lymphoma, unsp, nodes of axilla and upper limb"
          },
          {
            "contentTitle": "Diomedea irrorata",
            "video": "http://dummyimage.com/189x139.png/dddddd/000000",
            "duration": 5,
            "description": "Injury of muscle, fascia and tendon of hip"
          },
          {
            "contentTitle": "Chionis alba",
            "video": "http://dummyimage.com/134x103.png/cc0000/ffffff",
            "duration": 4,
            "description": "Nondisp fx of proximal phalanx of right lesser toe(s)"
          },
          {
            "contentTitle": "Speotyte cuniculata",
            "video": "http://dummyimage.com/189x220.png/dddddd/000000",
            "duration": 10,
            "description": "Contact with other heat and hot substances"
          },
          {
            "contentTitle": "Nycticorax nycticorax",
            "video": "http://dummyimage.com/153x199.png/cc0000/ffffff",
            "duration": 4,
            "description": "Breakdown of int fix of bones of hand and fingers, subs"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/182x233.png/cc0000/ffffff",
            "duration": 8,
            "description": "Torsion of testis"
          },
          {
            "contentTitle": "Eutamias minimus",
            "video": "http://dummyimage.com/198x215.png/dddddd/000000",
            "duration": 4,
            "description": "Boarding-house as place"
          },
          {
            "contentTitle": "Camelus dromedarius",
            "video": "http://dummyimage.com/157x155.png/ff4444/ffffff",
            "duration": 6,
            "description": "Newborn affected by multiple pregnancy"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/115x118.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Herpesviral ocular disease, unspecified"
          },
          {
            "contentTitle": "Madoqua kirkii",
            "video": "http://dummyimage.com/114x137.png/dddddd/000000",
            "duration": 2,
            "description": "Posterior displaced Type II dens fracture"
          }
        ]
      },
      {
        "header": "Financial Analyst",
        "totalMinutes": 80139,
        "contents": [
          {
            "contentTitle": "Crotalus cerastes",
            "video": "http://dummyimage.com/137x109.png/cc0000/ffffff",
            "duration": 2,
            "description": "Other epidermolysis bullosa"
          },
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/170x239.png/dddddd/000000",
            "duration": 3,
            "description": "Mech compl of permanent sutures, initial encounter"
          },
          {
            "contentTitle": "Aonyx capensis",
            "video": "http://dummyimage.com/139x123.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Wedge comprsn fx unsp thor vertebra, init for opn fx"
          },
          {
            "contentTitle": "Pycnonotus nigricans",
            "video": "http://dummyimage.com/149x214.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Dyslexia and alexia"
          },
          {
            "contentTitle": "Oryx gazella callotis",
            "video": "http://dummyimage.com/110x169.png/cc0000/ffffff",
            "duration": 5,
            "description": "Puncture wound w foreign body of right forearm, subs encntr"
          },
          {
            "contentTitle": "Tursiops truncatus",
            "video": "http://dummyimage.com/127x103.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Oth fracture of left great toe, init for clos fx"
          },
          {
            "contentTitle": "Zalophus californicus",
            "video": "http://dummyimage.com/191x201.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Motorcycle driver injured in collision w pedal cycle nontraf"
          },
          {
            "contentTitle": "Macropus fuliginosus",
            "video": "http://dummyimage.com/129x191.png/ff4444/ffffff",
            "duration": 7,
            "description": "Unsp opn wnd abd wall, right low q w/o penet perit cav, init"
          },
          {
            "contentTitle": "Leprocaulinus vipera",
            "video": "http://dummyimage.com/103x206.png/dddddd/000000",
            "duration": 1,
            "description": "Military op w oth effects of nuclear weapons, civilian"
          },
          {
            "contentTitle": "Procyon lotor",
            "video": "http://dummyimage.com/249x109.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Drown due to fall/jump fr oth burning unpowr wtrcrft, init"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/165x129.png/ff4444/ffffff",
            "duration": 4,
            "description": "Poisoning by penicillins, accidental, sequela"
          },
          {
            "contentTitle": "Notechis semmiannulatus",
            "video": "http://dummyimage.com/120x239.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "External constriction of right elbow, initial encounter"
          },
          {
            "contentTitle": "Merops sp.",
            "video": "http://dummyimage.com/135x164.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Displ suprcndl fx w/o intrcndl extn low end r femr, 7thC"
          }
        ]
      },
      {
        "header": "Business Systems Development Analyst",
        "totalMinutes": 6312,
        "contents": [
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/118x169.png/dddddd/000000",
            "duration": 10,
            "description": "Traumatic amputation of forearm, level unspecified"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/192x175.png/ff4444/ffffff",
            "duration": 9,
            "description": "Oth psychoactive substance use, unsp w withdrawal, uncomp"
          },
          {
            "contentTitle": "Estrilda erythronotos",
            "video": "http://dummyimage.com/244x225.png/dddddd/000000",
            "duration": 3,
            "description": "Traumatic arthropathy, left ankle and foot"
          },
          {
            "contentTitle": "Estrilda erythronotos",
            "video": "http://dummyimage.com/137x189.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Poisoning by aspirin, assault, subsequent encounter"
          },
          {
            "contentTitle": "Bos taurus",
            "video": "http://dummyimage.com/120x217.png/ff4444/ffffff",
            "duration": 4,
            "description": "Other deformity of right finger(s)"
          },
          {
            "contentTitle": "Nucifraga columbiana",
            "video": "http://dummyimage.com/135x239.png/cc0000/ffffff",
            "duration": 1,
            "description": "Poisn by crbnc-anhydr inhibtr,benzo/oth diuretc, undet, init"
          },
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/155x180.png/cc0000/ffffff",
            "duration": 1,
            "description": "Perf due to fb acc left in body following kidney dialysis"
          },
          {
            "contentTitle": "Spermophilus parryii",
            "video": "http://dummyimage.com/242x238.png/cc0000/ffffff",
            "duration": 9,
            "description": "Other spontaneous pneumothorax"
          },
          {
            "contentTitle": "Phalacrocorax varius",
            "video": "http://dummyimage.com/210x128.png/cc0000/ffffff",
            "duration": 5,
            "description": "Encounter for fit/adjst of partial artificial right leg"
          },
          {
            "contentTitle": "Ctenophorus ornatus",
            "video": "http://dummyimage.com/140x166.png/dddddd/000000",
            "duration": 9,
            "description": "Corros unsp degree of unsp mult fngr (nail), inc thumb, subs"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/244x238.png/cc0000/ffffff",
            "duration": 8,
            "description": "Unsp intracranial injury w LOC of 30 minutes or less, init"
          },
          {
            "contentTitle": "Dendrohyrax brucel",
            "video": "http://dummyimage.com/163x197.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Corrosion of third degree of back of right hand, subs encntr"
          },
          {
            "contentTitle": "Merops nubicus",
            "video": "http://dummyimage.com/171x247.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Subluxation of distal interphaln joint of r rng fngr, subs"
          },
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/158x138.png/dddddd/000000",
            "duration": 5,
            "description": "Crushing injury of penis, subsequent encounter"
          }
        ]
      },
      {
        "header": "Senior Financial Analyst",
        "totalMinutes": 22772,
        "contents": [
          {
            "contentTitle": "Lepus townsendii",
            "video": "http://dummyimage.com/163x180.png/ff4444/ffffff",
            "duration": 1,
            "description": "Disp fx of dist phalanx of l lit fngr, 7thK"
          },
          {
            "contentTitle": "Anthropoides paradisea",
            "video": "http://dummyimage.com/153x209.png/cc0000/ffffff",
            "duration": 9,
            "description": "Umbilical hernia with gangrene"
          },
          {
            "contentTitle": "Meles meles",
            "video": "http://dummyimage.com/105x151.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Oth fracture of upper and lower end of left fibula, sequela"
          },
          {
            "contentTitle": "Pelecanus conspicillatus",
            "video": "http://dummyimage.com/118x111.png/ff4444/ffffff",
            "duration": 3,
            "description": "Primary blast injury of duodenum"
          },
          {
            "contentTitle": "Fregata magnificans",
            "video": "http://dummyimage.com/197x176.png/ff4444/ffffff",
            "duration": 3,
            "description": "Traum hemor right cerebrum w LOC of 31-59 min"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/139x128.png/cc0000/ffffff",
            "duration": 7,
            "description": "Poisoning by oxytocic drugs, assault, subsequent encounter"
          },
          {
            "contentTitle": "Fratercula corniculata",
            "video": "http://dummyimage.com/165x223.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Tear of articular cartilage of unsp knee, current, subs"
          },
          {
            "contentTitle": "Gymnorhina tibicen",
            "video": "http://dummyimage.com/212x100.png/ff4444/ffffff",
            "duration": 2,
            "description": "Oth traum nondisp spondylolysis of 7th cervcal vert, sqla"
          },
          {
            "contentTitle": "Climacteris melanura",
            "video": "http://dummyimage.com/176x214.png/ff4444/ffffff",
            "duration": 1,
            "description": "Corrosion of unspecified degree of left forearm, sequela"
          },
          {
            "contentTitle": "Echimys chrysurus",
            "video": "http://dummyimage.com/139x207.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Burn due to (nonpowered) inflatable craft on fire, init"
          },
          {
            "contentTitle": "Merops bullockoides",
            "video": "http://dummyimage.com/112x117.png/dddddd/000000",
            "duration": 2,
            "description": "Myotonia congenita"
          },
          {
            "contentTitle": "Leprocaulinus vipera",
            "video": "http://dummyimage.com/136x180.png/dddddd/000000",
            "duration": 9,
            "description": "Milt op w explosn of sea-based artlry shell, milt, init"
          },
          {
            "contentTitle": "Macaca radiata",
            "video": "http://dummyimage.com/238x209.png/cc0000/ffffff",
            "duration": 9,
            "description": "Other interstitial and deep keratitis, unspecified eye"
          },
          {
            "contentTitle": "Otaria flavescens",
            "video": "http://dummyimage.com/161x150.png/dddddd/000000",
            "duration": 3,
            "description": "Puncture wound without foreign body of scalp, sequela"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/167x139.png/dddddd/000000",
            "duration": 1,
            "description": "Oth comp due to other GU prosthetic materials, subs"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/227x239.png/ff4444/ffffff",
            "duration": 1,
            "description": "Strain intrns musc/fasc/tend r idx fngr at wrs/hnd lv, sqla"
          }
        ]
      },
      {
        "header": "Registered Nurse",
        "totalMinutes": 84519,
        "contents": [
          {
            "contentTitle": "Sarcorhamphus papa",
            "video": "http://dummyimage.com/153x169.png/ff4444/ffffff",
            "duration": 9,
            "description": "Posterior scleritis, bilateral"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/103x194.png/ff4444/ffffff",
            "duration": 10,
            "description": "Eccrine sweat disorder, unspecified"
          },
          {
            "contentTitle": "Cercatetus concinnus",
            "video": "http://dummyimage.com/121x226.png/dddddd/000000",
            "duration": 1,
            "description": "Postproc hemor of a ms structure fol a ms sys procedure"
          },
          {
            "contentTitle": "Pycnonotus nigricans",
            "video": "http://dummyimage.com/153x151.png/cc0000/ffffff",
            "duration": 4,
            "description": "Primary open-angle glaucoma, bilateral, stage unspecified"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/152x215.png/cc0000/ffffff",
            "duration": 9,
            "description": "Adverse effect of thrombolytic drugs"
          },
          {
            "contentTitle": "Ardea golieth",
            "video": "http://dummyimage.com/154x226.png/cc0000/ffffff",
            "duration": 4,
            "description": "Jump/div from boat striking surfc causing oth injury, init"
          },
          {
            "contentTitle": "Physignathus cocincinus",
            "video": "http://dummyimage.com/116x166.png/dddddd/000000",
            "duration": 3,
            "description": "Car occupant injured in trnsp accident w military vehicle"
          },
          {
            "contentTitle": "Trachyphonus vaillantii",
            "video": "http://dummyimage.com/248x132.png/ff4444/ffffff",
            "duration": 7,
            "description": "Unsp intcrn inj w LOC w death d/t brain inj bf consc, init"
          },
          {
            "contentTitle": "Pelecanus conspicillatus",
            "video": "http://dummyimage.com/141x126.png/ff4444/ffffff",
            "duration": 9,
            "description": "Unsp injury to L5 level of lumbar spinal cord, subs encntr"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/167x101.png/cc0000/ffffff",
            "duration": 9,
            "description": "Dislocation of L3/L4 lumbar vertebra, subsequent encounter"
          },
          {
            "contentTitle": "Dipodomys deserti",
            "video": "http://dummyimage.com/134x129.png/ff4444/ffffff",
            "duration": 9,
            "description": "Rubber band causing external constriction, subs encntr"
          },
          {
            "contentTitle": "Macropus eugenii",
            "video": "http://dummyimage.com/117x188.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Bedroom in apartment as place"
          }
        ]
      },
      {
        "header": "GIS Technical Architect",
        "totalMinutes": 75550,
        "contents": [
          {
            "contentTitle": "Cochlearius cochlearius",
            "video": "http://dummyimage.com/245x110.png/dddddd/000000",
            "duration": 1,
            "description": "Toxic effect of venom of oth reptiles, undetermined, subs"
          },
          {
            "contentTitle": "Ictonyx striatus",
            "video": "http://dummyimage.com/203x163.png/cc0000/ffffff",
            "duration": 1,
            "description": "Poisoning by oth hormone antagonists, self-harm, sequela"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/189x170.png/ff4444/ffffff",
            "duration": 8,
            "description": "Crushing injury of left thumb, initial encounter"
          },
          {
            "contentTitle": "Marmota monax",
            "video": "http://dummyimage.com/198x135.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Other dislocation of right foot"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/246x139.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Nondisp fx of fifth metatarsal bone, l foot, init for opn fx"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/209x155.png/ff4444/ffffff",
            "duration": 6,
            "description": "Niemann-Pick disease"
          },
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/195x193.png/dddddd/000000",
            "duration": 5,
            "description": "Pyemic and septic embolism in childbirth"
          },
          {
            "contentTitle": "Recurvirostra avosetta",
            "video": "http://dummyimage.com/163x183.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Asphyx d/t being trap in a (discarded) refrig, slf-hrm, subs"
          },
          {
            "contentTitle": "Conolophus subcristatus",
            "video": "http://dummyimage.com/177x162.png/ff4444/ffffff",
            "duration": 5,
            "description": "Path fracture, unsp ulna and radius, subs for fx w malunion"
          },
          {
            "contentTitle": "Macropus parryi",
            "video": "http://dummyimage.com/106x233.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Congenital facial asymmetry"
          }
        ]
      },
      {
        "header": "VP Sales",
        "totalMinutes": 8625,
        "contents": [
          {
            "contentTitle": "Zosterops pallidus",
            "video": "http://dummyimage.com/126x178.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Unspecified open wound of anus"
          },
          {
            "contentTitle": "Macropus rufogriseus",
            "video": "http://dummyimage.com/227x225.png/dddddd/000000",
            "duration": 3,
            "description": "Torus fx lower end of r fibula, subs for fx w nonunion"
          },
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/133x177.png/cc0000/ffffff",
            "duration": 10,
            "description": "Fb in oth and multiple parts of external eye, unsp eye, init"
          },
          {
            "contentTitle": "Ephipplorhynchus senegalensis",
            "video": "http://dummyimage.com/200x158.png/cc0000/ffffff",
            "duration": 10,
            "description": "Open bite of left great toe with damage to nail"
          },
          {
            "contentTitle": "Ovibos moschatus",
            "video": "http://dummyimage.com/193x134.png/cc0000/ffffff",
            "duration": 10,
            "description": "Unsp open wound of r rng fngr w damage to nail, sequela"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/208x240.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Oth fx shaft of unsp tibia, 7thH"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/104x155.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Allergy status to narcotic agent status"
          },
          {
            "contentTitle": "Motacilla aguimp",
            "video": "http://dummyimage.com/207x122.png/dddddd/000000",
            "duration": 4,
            "description": "Open bite of abdominal wall w penetration into perit cav"
          },
          {
            "contentTitle": "Sceloporus magister",
            "video": "http://dummyimage.com/119x223.png/cc0000/ffffff",
            "duration": 8,
            "description": "Rheumatoid nodule, multiple sites"
          }
        ]
      },
      {
        "header": "Business Systems Development Analyst",
        "totalMinutes": 9600,
        "contents": [
          {
            "contentTitle": "Francolinus swainsonii",
            "video": "http://dummyimage.com/249x123.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Unspecified injury of liver, initial encounter"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/160x249.png/cc0000/ffffff",
            "duration": 2,
            "description": "Unspecified injury of lower back, sequela"
          },
          {
            "contentTitle": "Colaptes campestroides",
            "video": "http://dummyimage.com/120x194.png/dddddd/000000",
            "duration": 4,
            "description": "Disp fx of prox phalanx of l mid fngr, 7thG"
          },
          {
            "contentTitle": "Phascogale tapoatafa",
            "video": "http://dummyimage.com/169x136.png/ff4444/ffffff",
            "duration": 2,
            "description": "Antiasthmatics"
          },
          {
            "contentTitle": "Ratufa indica",
            "video": "http://dummyimage.com/210x171.png/cc0000/ffffff",
            "duration": 5,
            "description": "Unspecified deformity of left finger(s)"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/200x194.png/cc0000/ffffff",
            "duration": 3,
            "description": "Unsp inj extn musc/fasc/tend l mid finger at forarm lv, subs"
          },
          {
            "contentTitle": "Fratercula corniculata",
            "video": "http://dummyimage.com/202x212.png/cc0000/ffffff",
            "duration": 1,
            "description": "Unsp injury to L5 level of lumbar spinal cord, sequela"
          },
          {
            "contentTitle": "Otaria flavescens",
            "video": "http://dummyimage.com/164x201.png/ff4444/ffffff",
            "duration": 7,
            "description": "Person outside bus inj in clsn w 2/3-whl mv in traf, sequela"
          }
        ]
      },
      {
        "header": "Internal Auditor",
        "totalMinutes": 87637,
        "contents": [
          {
            "contentTitle": "Macropus robustus",
            "video": "http://dummyimage.com/244x250.png/cc0000/ffffff",
            "duration": 3,
            "description": "Nondisp fx of base of neck of right femur, init for clos fx"
          },
          {
            "contentTitle": "Canis latrans",
            "video": "http://dummyimage.com/201x243.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Crushing injury of oth parts of neck, subs encntr"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/156x239.png/cc0000/ffffff",
            "duration": 3,
            "description": "Fall in (into) bucket of water causing other injury, sequela"
          },
          {
            "contentTitle": "Casmerodius albus",
            "video": "http://dummyimage.com/182x128.png/ff4444/ffffff",
            "duration": 7,
            "description": "Chronic pulmonary coccidioidomycosis"
          },
          {
            "contentTitle": "Pan troglodytes",
            "video": "http://dummyimage.com/195x249.png/cc0000/ffffff",
            "duration": 7,
            "description": "Other injuries of right eye and orbit, subsequent encounter"
          }
        ]
      },
      {
        "header": "Structural Engineer",
        "totalMinutes": 64548,
        "contents": [
          {
            "contentTitle": "Merops nubicus",
            "video": "http://dummyimage.com/138x239.png/cc0000/ffffff",
            "duration": 1,
            "description": "Female orgasmic disorder"
          },
          {
            "contentTitle": "Numida meleagris",
            "video": "http://dummyimage.com/198x236.png/dddddd/000000",
            "duration": 1,
            "description": "Recurrent erosion of cornea, left eye"
          },
          {
            "contentTitle": "Iguana iguana",
            "video": "http://dummyimage.com/240x132.png/cc0000/ffffff",
            "duration": 4,
            "description": "Sprain of metacarpophalangeal joint of oth finger, subs"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/172x114.png/dddddd/000000",
            "duration": 7,
            "description": "Separation of muscle (nontraumatic), left ankle and foot"
          },
          {
            "contentTitle": "Hymenolaimus malacorhynchus",
            "video": "http://dummyimage.com/129x106.png/ff4444/ffffff",
            "duration": 5,
            "description": "Secondary malignant neoplasm of bone and bone marrow"
          },
          {
            "contentTitle": "Bubo virginianus",
            "video": "http://dummyimage.com/229x113.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Maternal care for oth fetal abnormality and damage, fetus 3"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/189x195.png/cc0000/ffffff",
            "duration": 4,
            "description": "Degenerated conditions of globe"
          }
        ]
      },
      {
        "header": "Quality Engineer",
        "totalMinutes": 58771,
        "contents": [
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/156x213.png/cc0000/ffffff",
            "duration": 5,
            "description": "Driver of hv veh inj pk-up truck, pk-up/van in traf, sequela"
          },
          {
            "contentTitle": "Thamnolaea cinnmomeiventris",
            "video": "http://dummyimage.com/217x112.png/cc0000/ffffff",
            "duration": 7,
            "description": "Displaced fracture of lateral malleolus of left fibula"
          },
          {
            "contentTitle": "Streptopelia senegalensis",
            "video": "http://dummyimage.com/142x126.png/cc0000/ffffff",
            "duration": 10,
            "description": "Localized swelling, mass and lump, upper limb"
          },
          {
            "contentTitle": "Dasyurus viverrinus",
            "video": "http://dummyimage.com/205x119.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Displaced fracture of third metatarsal bone, right foot"
          },
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/184x227.png/cc0000/ffffff",
            "duration": 3,
            "description": "Partial traumatic amputation of right midfoot, init encntr"
          },
          {
            "contentTitle": "Equus hemionus",
            "video": "http://dummyimage.com/220x216.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Athscl autologous vein bypass of the extremities w rest pain"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/196x155.png/dddddd/000000",
            "duration": 8,
            "description": "Migraine with aura, intractable, with status migrainosus"
          },
          {
            "contentTitle": "Ovibos moschatus",
            "video": "http://dummyimage.com/132x228.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Slow transit constipation"
          },
          {
            "contentTitle": "Caiman crocodilus",
            "video": "http://dummyimage.com/174x140.png/dddddd/000000",
            "duration": 4,
            "description": "Sprain of unsp parts of unsp shoulder girdle, init encntr"
          },
          {
            "contentTitle": "Phalaropus fulicarius",
            "video": "http://dummyimage.com/174x134.png/cc0000/ffffff",
            "duration": 6,
            "description": "Nondisp fx of glenoid cav of scapula, unsp shldr, 7thG"
          },
          {
            "contentTitle": "Ursus arctos",
            "video": "http://dummyimage.com/112x184.png/dddddd/000000",
            "duration": 6,
            "description": "Partial traumatic amputation of l low leg, level unsp, subs"
          },
          {
            "contentTitle": "Buteo galapagoensis",
            "video": "http://dummyimage.com/148x164.png/ff4444/ffffff",
            "duration": 4,
            "description": "Laceration w/o foreign body of unsp part of thorax, sequela"
          },
          {
            "contentTitle": "Zonotrichia capensis",
            "video": "http://dummyimage.com/193x171.png/cc0000/ffffff",
            "duration": 10,
            "description": "Nondisp fx of head of right radius, init for clos fx"
          },
          {
            "contentTitle": "Threskionis aethiopicus",
            "video": "http://dummyimage.com/172x102.png/dddddd/000000",
            "duration": 9,
            "description": "Superficial foreign body of forearm"
          },
          {
            "contentTitle": "Myotis lucifugus",
            "video": "http://dummyimage.com/206x171.png/dddddd/000000",
            "duration": 9,
            "description": "Maternal care for anti-D antibodies, third tri, fetus 3"
          }
        ]
      }
    ]
  },
  {
    "title": "De la servitude moderne",
    "subject": "Research and Development",
    "instructorName": "Rodin Salem",
    "price": 1960.59,
    "level": "Intermediate",
    "courseHours": 78,
    "summary": "Nondisp avulsion fx right ilium, subs for fx w nonunion",
    "subtitles": [
      {
        "header": "Recruiting Manager",
        "totalMinutes": 79544,
        "contents": [
          {
            "contentTitle": "Cervus duvauceli",
            "video": "http://dummyimage.com/222x233.png/dddddd/000000",
            "duration": 8,
            "description": "Unspecified injury of dorsal vein of right foot"
          },
          {
            "contentTitle": "Melursus ursinus",
            "video": "http://dummyimage.com/162x192.png/cc0000/ffffff",
            "duration": 10,
            "description": "Puncture wound w foreign body of eyelid and periocular area"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/241x209.png/ff4444/ffffff",
            "duration": 9,
            "description": "Unsp opn wnd unsp external genital organs, female, init"
          },
          {
            "contentTitle": "Hystrix indica",
            "video": "http://dummyimage.com/183x134.png/dddddd/000000",
            "duration": 4,
            "description": "Nondisplaced segmental fracture of shaft of unsp femur, init"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/160x238.png/cc0000/ffffff",
            "duration": 4,
            "description": "Unsp soft tissue disorder related to use/pressure of up arm"
          },
          {
            "contentTitle": "Nasua narica",
            "video": "http://dummyimage.com/160x250.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other cardiomyopathies"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/119x165.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Other physeal fracture of lower end of radius, right arm"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/147x153.png/dddddd/000000",
            "duration": 8,
            "description": "Crushing injury of abdomen, lower back, and pelvis, sequela"
          },
          {
            "contentTitle": "Semnopithecus entellus",
            "video": "http://dummyimage.com/237x141.png/cc0000/ffffff",
            "duration": 2,
            "description": "Type III occipital condyle fracture, unspecified side, 7thK"
          }
        ]
      },
      {
        "header": "Help Desk Operator",
        "totalMinutes": 96069,
        "contents": [
          {
            "contentTitle": "Dasyurus maculatus",
            "video": "http://dummyimage.com/171x177.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Occup of bus injured in collision w rail trn/veh in traf"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/162x128.png/ff4444/ffffff",
            "duration": 5,
            "description": "Hypertrophy of bone, tibia and fibula"
          },
          {
            "contentTitle": "Sceloporus magister",
            "video": "http://dummyimage.com/236x162.png/cc0000/ffffff",
            "duration": 5,
            "description": "Preterm labor third tri w preterm delivery third trimester"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/176x185.png/ff4444/ffffff",
            "duration": 8,
            "description": "Assault by steam or hot vapors, subsequent encounter"
          },
          {
            "contentTitle": "Buteo galapagoensis",
            "video": "http://dummyimage.com/249x168.png/dddddd/000000",
            "duration": 5,
            "description": "Oth complication of vascular prosth dev/grft, sequela"
          },
          {
            "contentTitle": "Procyon cancrivorus",
            "video": "http://dummyimage.com/226x203.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Disp fx of lateral condyle of unsp femr, 7thD"
          },
          {
            "contentTitle": "Pterocles gutturalis",
            "video": "http://dummyimage.com/214x201.png/ff4444/ffffff",
            "duration": 10,
            "description": "Unsp fracture of T11-T12 vertebra, init for opn fx"
          },
          {
            "contentTitle": "Ephippiorhynchus mycteria",
            "video": "http://dummyimage.com/246x214.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Fx unsp tarsal bone(s) of left foot, subs for fx w malunion"
          },
          {
            "contentTitle": "Neophoca cinerea",
            "video": "http://dummyimage.com/132x156.png/cc0000/ffffff",
            "duration": 8,
            "description": "Nondisp longitud fx r patella, 7thQ"
          },
          {
            "contentTitle": "Sus scrofa",
            "video": "http://dummyimage.com/146x182.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Corrosion w resulting rupture and dest of right eyeball"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/172x243.png/ff4444/ffffff",
            "duration": 3,
            "description": "Charcot's joint, vertebrae"
          },
          {
            "contentTitle": "Zenaida galapagoensis",
            "video": "http://dummyimage.com/189x192.png/dddddd/000000",
            "duration": 10,
            "description": "Sltr-haris Type III physl fx low end humer, right arm, sqla"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/131x123.png/dddddd/000000",
            "duration": 3,
            "description": "Osteopathy in diseases classified elsewhere, unsp upper arm"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/239x213.png/cc0000/ffffff",
            "duration": 7,
            "description": "Conn tiss and disc stenos of intvrt foramin of thor region"
          },
          {
            "contentTitle": "Otocyon megalotis",
            "video": "http://dummyimage.com/210x119.png/cc0000/ffffff",
            "duration": 3,
            "description": "Nondisp transverse fx shaft of unsp fibula, 7thP"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/235x162.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Unsp inj unsp musc/fasc/tend at wrs/hnd lv, r hand, init"
          },
          {
            "contentTitle": "Neophoca cinerea",
            "video": "http://dummyimage.com/110x156.png/ff4444/ffffff",
            "duration": 2,
            "description": "Corrosion of second degree of wrist and hand"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/157x238.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Injury of axillary nerve, right arm, sequela"
          },
          {
            "contentTitle": "Crocodylus niloticus",
            "video": "http://dummyimage.com/115x118.png/dddddd/000000",
            "duration": 6,
            "description": "Encounter for fit/adjst of unsp external prosthetic device"
          },
          {
            "contentTitle": "Phalaropus fulicarius",
            "video": "http://dummyimage.com/203x136.png/ff4444/ffffff",
            "duration": 4,
            "description": "Minimal atrophy of maxilla"
          }
        ]
      },
      {
        "header": "Compensation Analyst",
        "totalMinutes": 42968,
        "contents": [
          {
            "contentTitle": "Geochelone elegans",
            "video": "http://dummyimage.com/217x120.png/dddddd/000000",
            "duration": 6,
            "description": "Osteomyelitis of bilateral orbits"
          },
          {
            "contentTitle": "Uraeginthus angolensis",
            "video": "http://dummyimage.com/187x145.png/cc0000/ffffff",
            "duration": 2,
            "description": "Contusion of thorax, unspecified, initial encounter"
          },
          {
            "contentTitle": "Pseudoleistes virescens",
            "video": "http://dummyimage.com/187x230.png/ff4444/ffffff",
            "duration": 2,
            "description": "Inhalant use, unspecified with intoxication"
          },
          {
            "contentTitle": "Conolophus subcristatus",
            "video": "http://dummyimage.com/223x152.png/dddddd/000000",
            "duration": 9,
            "description": "Diabetes due to underlying condition w neurological comp"
          },
          {
            "contentTitle": "Dasyprocta leporina",
            "video": "http://dummyimage.com/191x245.png/cc0000/ffffff",
            "duration": 2,
            "description": "Prem separtn of placenta w coag defect, unsp, unsp trimester"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/199x117.png/cc0000/ffffff",
            "duration": 6,
            "description": "Contusion of lung, bilateral, sequela"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/141x169.png/cc0000/ffffff",
            "duration": 6,
            "description": "Disp fx of greater tuberosity of unsp humerus, sequela"
          },
          {
            "contentTitle": "Streptopelia decipiens",
            "video": "http://dummyimage.com/167x246.png/cc0000/ffffff",
            "duration": 6,
            "description": "Oth osteopor w current pathological fracture, vertebra(e)"
          },
          {
            "contentTitle": "Dasyurus maculatus",
            "video": "http://dummyimage.com/211x191.png/cc0000/ffffff",
            "duration": 4,
            "description": "Unsp disp fx of surg nk of l humer, subs for fx w routn heal"
          },
          {
            "contentTitle": "Platalea leucordia",
            "video": "http://dummyimage.com/215x223.png/cc0000/ffffff",
            "duration": 1,
            "description": "Poisoning by tetracyclines, intentional self-harm, subs"
          },
          {
            "contentTitle": "Otaria flavescens",
            "video": "http://dummyimage.com/238x106.png/ff4444/ffffff",
            "duration": 8,
            "description": "Maternal care for (suspected) cnsl malformation in fetus"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/153x190.png/ff4444/ffffff",
            "duration": 7,
            "description": "Spacecraft crash injuring occupant, subsequent encounter"
          },
          {
            "contentTitle": "Francolinus coqui",
            "video": "http://dummyimage.com/129x145.png/cc0000/ffffff",
            "duration": 2,
            "description": "Neonatal jaundice, unspecified"
          },
          {
            "contentTitle": "Damaliscus lunatus",
            "video": "http://dummyimage.com/115x149.png/cc0000/ffffff",
            "duration": 6,
            "description": "Poisoning by unsp anesthetic, accidental, subs"
          }
        ]
      },
      {
        "header": "VP Accounting",
        "totalMinutes": 89292,
        "contents": [
          {
            "contentTitle": "Vulpes chama",
            "video": "http://dummyimage.com/105x105.png/cc0000/ffffff",
            "duration": 10,
            "description": "Laceration of bronchus, unspecified"
          },
          {
            "contentTitle": "Dacelo novaeguineae",
            "video": "http://dummyimage.com/164x199.png/dddddd/000000",
            "duration": 8,
            "description": "Nondisp fx of dist pole of navic bone of l wrs, 7thP"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/185x156.png/cc0000/ffffff",
            "duration": 1,
            "description": "Corrosion of first degree of left hand, unsp site, subs"
          },
          {
            "contentTitle": "Sarcorhamphus papa",
            "video": "http://dummyimage.com/170x240.png/dddddd/000000",
            "duration": 4,
            "description": "Lead-induced chronic gout, right wrist, without tophus"
          },
          {
            "contentTitle": "Naja haje",
            "video": "http://dummyimage.com/136x130.png/ff4444/ffffff",
            "duration": 10,
            "description": "Displ commnt fx shaft of l tibia, 7thC"
          },
          {
            "contentTitle": "Callipepla gambelii",
            "video": "http://dummyimage.com/181x107.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Crushing injury of left hand, subsequent encounter"
          }
        ]
      },
      {
        "header": "Research Nurse",
        "totalMinutes": 96764,
        "contents": [
          {
            "contentTitle": "Myotis lucifugus",
            "video": "http://dummyimage.com/155x153.png/ff4444/ffffff",
            "duration": 4,
            "description": "Unsp fx head of r femr, 7thJ"
          },
          {
            "contentTitle": "Pycnonotus barbatus",
            "video": "http://dummyimage.com/240x108.png/ff4444/ffffff",
            "duration": 9,
            "description": "Neoplasm of uncertain behavior of unspecified breast"
          },
          {
            "contentTitle": "Meles meles",
            "video": "http://dummyimage.com/131x153.png/ff4444/ffffff",
            "duration": 6,
            "description": "Bent bone of unsp rad, subs for opn fx type I/2 w routn heal"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/142x201.png/cc0000/ffffff",
            "duration": 5,
            "description": "Superfic fb of abdomen, low back, pelvis and extrn genitals"
          }
        ]
      }
    ]
  },
  {
    "title": "The Apocalypse",
    "subject": "Human Resources",
    "instructorName": "Rodin Salem",
    "price": 1545.45,
    "level": "AllLevels",
    "courseHours": 163,
    "summary": "Pathological fracture, left tibia, subs for fx w nonunion",
    "subtitles": [
      {
        "header": "Human Resources Assistant III",
        "totalMinutes": 9896,
        "contents": [
          {
            "contentTitle": "Vombatus ursinus",
            "video": "http://dummyimage.com/117x125.png/dddddd/000000",
            "duration": 9,
            "description": "Burns of 90%/more of body surfc w 80-89% third degree burns"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/196x203.png/dddddd/000000",
            "duration": 2,
            "description": "Displ bicondylar fx r tibia, 7thM"
          },
          {
            "contentTitle": "Damaliscus dorcas",
            "video": "http://dummyimage.com/152x152.png/cc0000/ffffff",
            "duration": 4,
            "description": "Insect bite (nonvenomous) of unsp part of head, subs encntr"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/134x227.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Corrosion of first degree of nose (septum), init encntr"
          },
          {
            "contentTitle": "Bos frontalis",
            "video": "http://dummyimage.com/233x185.png/dddddd/000000",
            "duration": 9,
            "description": "Corrosions of unspecified ear drum"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/112x201.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Disp fx of intermed cuneiform of l ft, 7thP"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/226x148.png/ff4444/ffffff",
            "duration": 6,
            "description": "Pnctr w/o foreign body of unsp cheek and TMJ area, sequela"
          },
          {
            "contentTitle": "Thamnolaea cinnmomeiventris",
            "video": "http://dummyimage.com/179x173.png/ff4444/ffffff",
            "duration": 3,
            "description": "Malignant neoplasm of unspecified part of bronchus or lung"
          },
          {
            "contentTitle": "Sterna paradisaea",
            "video": "http://dummyimage.com/130x216.png/ff4444/ffffff",
            "duration": 10,
            "description": "Disorder of white blood cells, unspecified"
          },
          {
            "contentTitle": "Halcyon smyrnesis",
            "video": "http://dummyimage.com/125x125.png/cc0000/ffffff",
            "duration": 6,
            "description": "Nondisp transverse fracture of shaft of right fibula, init"
          },
          {
            "contentTitle": "Geochelone radiata",
            "video": "http://dummyimage.com/211x194.png/ff4444/ffffff",
            "duration": 1,
            "description": "Unsp slipped upper femoral epiphysis, right hip"
          },
          {
            "contentTitle": "Cebus apella",
            "video": "http://dummyimage.com/102x202.png/ff4444/ffffff",
            "duration": 8,
            "description": "Oth fracture of right pubis, subs for fx w delay heal"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/238x174.png/cc0000/ffffff",
            "duration": 5,
            "description": "Explosion on board unspecified watercraft, initial encounter"
          },
          {
            "contentTitle": "Varanus albigularis",
            "video": "http://dummyimage.com/114x245.png/ff4444/ffffff",
            "duration": 3,
            "description": "Mechanical complication of gastrointestinal prosth dev/grft"
          },
          {
            "contentTitle": "Haliaeetus leucocephalus",
            "video": "http://dummyimage.com/212x128.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Other reaction to spinal and lumbar puncture"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/175x120.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Displacement (lateral) of globe, bilateral"
          },
          {
            "contentTitle": "Ratufa indica",
            "video": "http://dummyimage.com/155x199.png/cc0000/ffffff",
            "duration": 6,
            "description": "Maternal care for high head at term, not applicable or unsp"
          },
          {
            "contentTitle": "Alligator mississippiensis",
            "video": "http://dummyimage.com/114x162.png/ff4444/ffffff",
            "duration": 6,
            "description": "Fall (on)(from) escalator, sequela"
          }
        ]
      },
      {
        "header": "Marketing Assistant",
        "totalMinutes": 16260,
        "contents": [
          {
            "contentTitle": "Cyrtodactylus louisiadensis",
            "video": "http://dummyimage.com/233x105.png/dddddd/000000",
            "duration": 6,
            "description": "Chorioamnionitis, first trimester, fetus 4"
          },
          {
            "contentTitle": "Nyctea scandiaca",
            "video": "http://dummyimage.com/165x178.png/dddddd/000000",
            "duration": 3,
            "description": "Helicopter crash injuring occupant"
          },
          {
            "contentTitle": "Perameles nasuta",
            "video": "http://dummyimage.com/163x155.png/cc0000/ffffff",
            "duration": 1,
            "description": "Strain of unsp quadriceps muscle, fascia and tendon, init"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/128x235.png/dddddd/000000",
            "duration": 6,
            "description": "Unsp injury of musc/fasc/tend at wrs/hnd lv, unsp hand, subs"
          },
          {
            "contentTitle": "Macropus fuliginosus",
            "video": "http://dummyimage.com/113x221.png/ff4444/ffffff",
            "duration": 3,
            "description": "Complete transverse atyp femoral fracture, unsp leg, init"
          },
          {
            "contentTitle": "Ovis ammon",
            "video": "http://dummyimage.com/183x121.png/dddddd/000000",
            "duration": 7,
            "description": "Angioneurotic edema, sequela"
          },
          {
            "contentTitle": "Pavo cristatus",
            "video": "http://dummyimage.com/133x113.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Assault by other bodily force, subsequent encounter"
          },
          {
            "contentTitle": "Ephippiorhynchus mycteria",
            "video": "http://dummyimage.com/155x191.png/ff4444/ffffff",
            "duration": 3,
            "description": "Strain of intrinsic musc/fasc/tend thmb at wrs/hnd lv, init"
          },
          {
            "contentTitle": "Corallus hortulanus cooki",
            "video": "http://dummyimage.com/237x179.png/ff4444/ffffff",
            "duration": 4,
            "description": "Dislocation of C1/C2 cervical vertebrae, initial encounter"
          },
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/174x132.png/ff4444/ffffff",
            "duration": 10,
            "description": "Car driver injured in collision w car in traf, init"
          },
          {
            "contentTitle": "Amblyrhynchus cristatus",
            "video": "http://dummyimage.com/117x194.png/dddddd/000000",
            "duration": 8,
            "description": "Blister (nonthermal) of abdominal wall, initial encounter"
          },
          {
            "contentTitle": "Litrocranius walleri",
            "video": "http://dummyimage.com/153x170.png/ff4444/ffffff",
            "duration": 6,
            "description": "Poisoning by predom beta-adrenocpt agonists, self-harm"
          },
          {
            "contentTitle": "Aquila chrysaetos",
            "video": "http://dummyimage.com/200x142.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Leakage of other nervous system device, implant or graft"
          },
          {
            "contentTitle": "Casmerodius albus",
            "video": "http://dummyimage.com/216x123.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Idiopathic aseptic necrosis of right finger(s)"
          },
          {
            "contentTitle": "Passer domesticus",
            "video": "http://dummyimage.com/229x114.png/cc0000/ffffff",
            "duration": 1,
            "description": "Oth fx low end unsp femr, 7thF"
          },
          {
            "contentTitle": "Petaurus breviceps",
            "video": "http://dummyimage.com/173x124.png/dddddd/000000",
            "duration": 8,
            "description": "Oth fx shaft of l tibia, subs for opn fx type I/2 w nonunion"
          },
          {
            "contentTitle": "Echimys chrysurus",
            "video": "http://dummyimage.com/173x150.png/dddddd/000000",
            "duration": 10,
            "description": "Antidepressants"
          },
          {
            "contentTitle": "Sitta canadensis",
            "video": "http://dummyimage.com/127x248.png/ff4444/ffffff",
            "duration": 2,
            "description": "Poisoning by calcium-channel blockers, accidental, init"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/243x152.png/dddddd/000000",
            "duration": 8,
            "description": "ABO incompatibility w acute hemolytic transfusion reaction"
          }
        ]
      },
      {
        "header": "Safety Technician III",
        "totalMinutes": 25820,
        "contents": [
          {
            "contentTitle": "Cebus albifrons",
            "video": "http://dummyimage.com/190x188.png/cc0000/ffffff",
            "duration": 6,
            "description": "NIHSS score 7"
          },
          {
            "contentTitle": "Theropithecus gelada",
            "video": "http://dummyimage.com/180x241.png/ff4444/ffffff",
            "duration": 7,
            "description": "Chronic gout due to renal impairment, unspecified site"
          },
          {
            "contentTitle": "Nannopterum harrisi",
            "video": "http://dummyimage.com/184x241.png/cc0000/ffffff",
            "duration": 10,
            "description": "Subluxation of C6/C7 cervical vertebrae"
          },
          {
            "contentTitle": "Felis wiedi or Leopardus weidi",
            "video": "http://dummyimage.com/130x134.png/dddddd/000000",
            "duration": 2,
            "description": "Burn first degree of unsp mult fngr (nail), inc thumb, init"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/227x204.png/dddddd/000000",
            "duration": 9,
            "description": "Oth exposure to controlled fire, not in bldg"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/232x200.png/ff4444/ffffff",
            "duration": 5,
            "description": "Open bite, left knee, subsequent encounter"
          },
          {
            "contentTitle": "Canis latrans",
            "video": "http://dummyimage.com/172x226.png/dddddd/000000",
            "duration": 10,
            "description": "Milt op involving chemical weapons and oth unconvtl warfare"
          },
          {
            "contentTitle": "Thalasseus maximus",
            "video": "http://dummyimage.com/208x219.png/ff4444/ffffff",
            "duration": 4,
            "description": "Laceration of plantar artery of left foot, sequela"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/169x180.png/dddddd/000000",
            "duration": 8,
            "description": "Oth specific joint derangements left foot, NEC"
          },
          {
            "contentTitle": "Ursus maritimus",
            "video": "http://dummyimage.com/163x129.png/ff4444/ffffff",
            "duration": 7,
            "description": "Puncture wound with foreign body of unspecified breast"
          },
          {
            "contentTitle": "Creagrus furcatus",
            "video": "http://dummyimage.com/227x145.png/ff4444/ffffff",
            "duration": 2,
            "description": "Traum subrac hem w LOC of 6 hours to 24 hours, subs"
          }
        ]
      },
      {
        "header": "Sales Representative",
        "totalMinutes": 60451,
        "contents": [
          {
            "contentTitle": "Seiurus aurocapillus",
            "video": "http://dummyimage.com/225x187.png/dddddd/000000",
            "duration": 9,
            "description": "Nondisp midcervical fx right femur, init for opn fx type I/2"
          },
          {
            "contentTitle": "Cyrtodactylus louisiadensis",
            "video": "http://dummyimage.com/248x241.png/dddddd/000000",
            "duration": 2,
            "description": "Newborn affected by delivery by vacuum extractor [ventouse]"
          },
          {
            "contentTitle": "Vombatus ursinus",
            "video": "http://dummyimage.com/215x195.png/cc0000/ffffff",
            "duration": 6,
            "description": "Eructation"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/202x132.png/dddddd/000000",
            "duration": 3,
            "description": "Nondisp fx of lateral cuneiform of left foot, init"
          },
          {
            "contentTitle": "Canis latrans",
            "video": "http://dummyimage.com/181x157.png/cc0000/ffffff",
            "duration": 3,
            "description": "Unsp open wound of right cheek and temporomandibular area"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/133x126.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Nondisp fx of lunate, left wrist, subs for fx w routn heal"
          },
          {
            "contentTitle": "Ciconia episcopus",
            "video": "http://dummyimage.com/230x151.png/cc0000/ffffff",
            "duration": 10,
            "description": "Pulmonary anthrax"
          },
          {
            "contentTitle": "Pytilia melba",
            "video": "http://dummyimage.com/101x205.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Campsite as the place of occurrence of the external cause"
          },
          {
            "contentTitle": "Cracticus nigroagularis",
            "video": "http://dummyimage.com/211x185.png/dddddd/000000",
            "duration": 2,
            "description": "Other specified injury of blood vessel of left index finger"
          },
          {
            "contentTitle": "Nannopterum harrisi",
            "video": "http://dummyimage.com/211x205.png/cc0000/ffffff",
            "duration": 7,
            "description": "Laceration with foreign body, unspecified knee, sequela"
          },
          {
            "contentTitle": "Trachyphonus vaillantii",
            "video": "http://dummyimage.com/183x151.png/ff4444/ffffff",
            "duration": 2,
            "description": "Driver of bus injured in collision w pedl cyc in traf, subs"
          },
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/237x212.png/dddddd/000000",
            "duration": 2,
            "description": "Pnctr w foreign body of left thumb w/o damage to nail, subs"
          }
        ]
      },
      {
        "header": "Information Systems Manager",
        "totalMinutes": 75579,
        "contents": [
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/212x136.png/dddddd/000000",
            "duration": 7,
            "description": "Nondisp subtrochnt fx l femur, subs for clos fx w delay heal"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/210x190.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Drown due to fall/jump fr unsp burning watercraft, subs"
          },
          {
            "contentTitle": "Macropus rufus",
            "video": "http://dummyimage.com/138x201.png/dddddd/000000",
            "duration": 2,
            "description": "Other allergic rhinitis"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/151x176.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Other rupture of muscle (nontraumatic), unspecified hand"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/111x154.png/ff4444/ffffff",
            "duration": 4,
            "description": "Dislocation of T4/T5 thoracic vertebra, initial encounter"
          },
          {
            "contentTitle": "Potorous tridactylus",
            "video": "http://dummyimage.com/127x113.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Underdosing of thyroid hormones and substitutes"
          },
          {
            "contentTitle": "Lasiodora parahybana",
            "video": "http://dummyimage.com/194x157.png/dddddd/000000",
            "duration": 10,
            "description": "Pressr ulcer of contig site of back, buttock and hip, stg 1"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/107x164.png/cc0000/ffffff",
            "duration": 9,
            "description": "Monoplegia of upper limb affecting unspecified side"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/152x189.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Lacerat unsp blood vess at shldr/up arm, right arm, sequela"
          },
          {
            "contentTitle": "Loxodonta africana",
            "video": "http://dummyimage.com/118x229.png/dddddd/000000",
            "duration": 7,
            "description": "Osteopathy after poliomyelitis, left forearm"
          },
          {
            "contentTitle": "Orcinus orca",
            "video": "http://dummyimage.com/179x249.png/cc0000/ffffff",
            "duration": 9,
            "description": "Oth traumatic spondylolisthesis of fourth cervical vertebra"
          }
        ]
      },
      {
        "header": "Nuclear Power Engineer",
        "totalMinutes": 51104,
        "contents": [
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/121x168.png/dddddd/000000",
            "duration": 5,
            "description": "Other sequelae of other cerebrovascular disease"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/127x238.png/cc0000/ffffff",
            "duration": 9,
            "description": "Sprain of interphalangeal joint of right middle finger"
          },
          {
            "contentTitle": "Macropus parryi",
            "video": "http://dummyimage.com/102x220.png/dddddd/000000",
            "duration": 10,
            "description": "Struck by falling object on sailboat"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/141x161.png/dddddd/000000",
            "duration": 9,
            "description": "Puncture wound with foreign body, left ankle"
          },
          {
            "contentTitle": "Ephippiorhynchus mycteria",
            "video": "http://dummyimage.com/222x112.png/ff4444/ffffff",
            "duration": 10,
            "description": "Nondisp subtrochnt fx unsp femr, 7thH"
          },
          {
            "contentTitle": "Ratufa indica",
            "video": "http://dummyimage.com/175x235.png/dddddd/000000",
            "duration": 2,
            "description": "Unsp fx shaft of left fibula, init for opn fx type I/2"
          }
        ]
      },
      {
        "header": "Accountant I",
        "totalMinutes": 55557,
        "contents": [
          {
            "contentTitle": "Dendrocitta vagabunda",
            "video": "http://dummyimage.com/185x242.png/cc0000/ffffff",
            "duration": 10,
            "description": "Car driver injured in collision w ped/anml in traf"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/154x229.png/ff4444/ffffff",
            "duration": 9,
            "description": "Nondisp seg fx shaft of rad, unsp arm, 7thB"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/155x216.png/cc0000/ffffff",
            "duration": 5,
            "description": "Stage 2 necrotizing enterocolitis"
          },
          {
            "contentTitle": "Anser anser",
            "video": "http://dummyimage.com/167x186.png/ff4444/ffffff",
            "duration": 8,
            "description": "Nondisp oth fx tuberosity of l calcaneus, 7thD"
          },
          {
            "contentTitle": "Taurotagus oryx",
            "video": "http://dummyimage.com/151x215.png/ff4444/ffffff",
            "duration": 4,
            "description": "Nondisp fx of base of nk of r femr, 7thC"
          },
          {
            "contentTitle": "Leptoptilos crumeniferus",
            "video": "http://dummyimage.com/158x188.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Cerebral infarction due to embolism of basilar artery"
          },
          {
            "contentTitle": "Canis lupus baileyi",
            "video": "http://dummyimage.com/114x191.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Sled accident"
          },
          {
            "contentTitle": "Sterna paradisaea",
            "video": "http://dummyimage.com/156x149.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Regular astigmatism"
          },
          {
            "contentTitle": "Ovis musimon",
            "video": "http://dummyimage.com/188x100.png/cc0000/ffffff",
            "duration": 10,
            "description": "Renal agenesis and other reduction defects of kidney"
          },
          {
            "contentTitle": "Suricata suricatta",
            "video": "http://dummyimage.com/241x219.png/ff4444/ffffff",
            "duration": 7,
            "description": "Nondisp fx of medial condyle of right tibia, sequela"
          },
          {
            "contentTitle": "Isoodon obesulus",
            "video": "http://dummyimage.com/115x216.png/ff4444/ffffff",
            "duration": 10,
            "description": "Oth physeal fracture of lower end of ulna, right arm, init"
          },
          {
            "contentTitle": "Haliaetus leucogaster",
            "video": "http://dummyimage.com/171x228.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Nondisp suprcndl fx w/o intrcndl extn low end unsp femr,7thR"
          },
          {
            "contentTitle": "Cygnus atratus",
            "video": "http://dummyimage.com/228x236.png/dddddd/000000",
            "duration": 8,
            "description": "Nondisp fx of base of nk of r femr, 7thE"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/180x229.png/cc0000/ffffff",
            "duration": 3,
            "description": "Breakdown (mechanical) of other urinary catheter, sequela"
          },
          {
            "contentTitle": "Vanessa indica",
            "video": "http://dummyimage.com/133x109.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other specified injury of left middle and inner ear"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/244x164.png/cc0000/ffffff",
            "duration": 7,
            "description": "Underdosing of tetracyclic antidepressants, init encntr"
          },
          {
            "contentTitle": "Pterocles gutturalis",
            "video": "http://dummyimage.com/115x162.png/cc0000/ffffff",
            "duration": 9,
            "description": "Underdosing of other anti-common-cold drugs, subs encntr"
          },
          {
            "contentTitle": "Pytilia melba",
            "video": "http://dummyimage.com/108x186.png/ff4444/ffffff",
            "duration": 6,
            "description": "Superficial frostbite of right wrist"
          },
          {
            "contentTitle": "Alcelaphus buselaphus caama",
            "video": "http://dummyimage.com/106x136.png/cc0000/ffffff",
            "duration": 4,
            "description": "Fracture of tooth (traumatic), subs for fx w routn heal"
          }
        ]
      },
      {
        "header": "VP Sales",
        "totalMinutes": 95185,
        "contents": [
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/212x163.png/dddddd/000000",
            "duration": 7,
            "description": "Rheumatoid bursitis, hip"
          },
          {
            "contentTitle": "Odocoileus hemionus",
            "video": "http://dummyimage.com/168x168.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Nondisp oblique fx shaft of r femr, 7thG"
          },
          {
            "contentTitle": "Larus dominicanus",
            "video": "http://dummyimage.com/179x210.png/dddddd/000000",
            "duration": 2,
            "description": "Encounter for screening for diabetes mellitus"
          },
          {
            "contentTitle": "Corvus albus",
            "video": "http://dummyimage.com/243x191.png/dddddd/000000",
            "duration": 5,
            "description": "Nondisp fx of second metatarsal bone, right foot, sequela"
          },
          {
            "contentTitle": "Globicephala melas",
            "video": "http://dummyimage.com/248x128.png/cc0000/ffffff",
            "duration": 4,
            "description": "Sprain of joints and ligaments of oth prt neck, subs encntr"
          }
        ]
      },
      {
        "header": "Sales Associate",
        "totalMinutes": 41520,
        "contents": [
          {
            "contentTitle": "Oxybelis sp.",
            "video": "http://dummyimage.com/115x219.png/ff4444/ffffff",
            "duration": 4,
            "description": "Fracture of oth skull and facial bones, right side, init"
          },
          {
            "contentTitle": "Ephipplorhynchus senegalensis",
            "video": "http://dummyimage.com/191x130.png/cc0000/ffffff",
            "duration": 4,
            "description": "Unspecified subluxation of left radial head, init encntr"
          },
          {
            "contentTitle": "Sciurus niger",
            "video": "http://dummyimage.com/223x146.png/cc0000/ffffff",
            "duration": 4,
            "description": "High altitude periodic breathing"
          },
          {
            "contentTitle": "Grus canadensis",
            "video": "http://dummyimage.com/172x218.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Benign neoplasm of sigmoid colon"
          },
          {
            "contentTitle": "Sitta canadensis",
            "video": "http://dummyimage.com/135x136.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Oth nondisp fx of base of 1st MC bone, l hand, 7thG"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/217x176.png/cc0000/ffffff",
            "duration": 2,
            "description": "Presence of other endocrine implants"
          },
          {
            "contentTitle": "Genetta genetta",
            "video": "http://dummyimage.com/198x109.png/dddddd/000000",
            "duration": 2,
            "description": "Disp fx of olecran pro w/o intartic extn unsp ulna, 7thF"
          },
          {
            "contentTitle": "Leprocaulinus vipera",
            "video": "http://dummyimage.com/218x225.png/dddddd/000000",
            "duration": 1,
            "description": "Driver of hv veh injured in collision w hv veh in traf, init"
          },
          {
            "contentTitle": "Rhabdomys pumilio",
            "video": "http://dummyimage.com/220x153.png/ff4444/ffffff",
            "duration": 6,
            "description": "Unsp disp fx of seventh cervcal vert, subs for fx w nonunion"
          },
          {
            "contentTitle": "Passer domesticus",
            "video": "http://dummyimage.com/147x223.png/dddddd/000000",
            "duration": 1,
            "description": "Unspecified injury of axillary artery, left side"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/200x221.png/cc0000/ffffff",
            "duration": 2,
            "description": "Nondisp oblique fx shaft of l femr, 7thK"
          },
          {
            "contentTitle": "Cynomys ludovicianus",
            "video": "http://dummyimage.com/201x250.png/ff4444/ffffff",
            "duration": 10,
            "description": "Disp fx of shaft of fourth metacarpal bone, right hand, init"
          }
        ]
      },
      {
        "header": "Help Desk Technician",
        "totalMinutes": 40268,
        "contents": [
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/105x165.png/cc0000/ffffff",
            "duration": 10,
            "description": "Unsp larger firearm discharge, undetermined intent, subs"
          },
          {
            "contentTitle": "Gazella granti",
            "video": "http://dummyimage.com/228x161.png/ff4444/ffffff",
            "duration": 3,
            "description": "Mucosal cyst of postmastoidectomy cavity"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/103x172.png/cc0000/ffffff",
            "duration": 5,
            "description": "Conjunctival deposits, left eye"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/114x145.png/dddddd/000000",
            "duration": 5,
            "description": "Poisn by oth nonopio analges/antipyret, NEC, slf-hrm, sqla"
          },
          {
            "contentTitle": "Alopochen aegyptiacus",
            "video": "http://dummyimage.com/204x165.png/dddddd/000000",
            "duration": 9,
            "description": "Milt op w explosn of sea-based artlry shell, civilian"
          },
          {
            "contentTitle": "Lamprotornis superbus",
            "video": "http://dummyimage.com/116x246.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Nondisp transverse fx shaft of r fibula, 7thP"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/129x141.png/ff4444/ffffff",
            "duration": 9,
            "description": "Laceration w fb of r mid finger w damage to nail, init"
          },
          {
            "contentTitle": "Cervus elaphus",
            "video": "http://dummyimage.com/142x108.png/ff4444/ffffff",
            "duration": 4,
            "description": "Staphylococcal arthritis, elbow"
          }
        ]
      },
      {
        "header": "Mechanical Systems Engineer",
        "totalMinutes": 76233,
        "contents": [
          {
            "contentTitle": "Cebus albifrons",
            "video": "http://dummyimage.com/113x149.png/ff4444/ffffff",
            "duration": 7,
            "description": "Injury of oth nerves at hip and thigh level, right leg, init"
          },
          {
            "contentTitle": "Scolopax minor",
            "video": "http://dummyimage.com/243x121.png/ff4444/ffffff",
            "duration": 10,
            "description": "Occ of stcar injured in collisn/hit by roll stok, sequela"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/191x221.png/ff4444/ffffff",
            "duration": 6,
            "description": "Encounter for newborn, infant and child health examinations"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/112x100.png/cc0000/ffffff",
            "duration": 4,
            "description": "Stress fracture, unspecified site, init encntr for fracture"
          }
        ]
      },
      {
        "header": "Cost Accountant",
        "totalMinutes": 12813,
        "contents": [
          {
            "contentTitle": "Oryx gazella",
            "video": "http://dummyimage.com/116x221.png/ff4444/ffffff",
            "duration": 4,
            "description": "Frostbite w tissue necros unsp knee and lower leg, sequela"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/114x177.png/cc0000/ffffff",
            "duration": 10,
            "description": "Exposure to chng in air pressure in aircraft during descent"
          },
          {
            "contentTitle": "Larus fuliginosus",
            "video": "http://dummyimage.com/130x194.png/cc0000/ffffff",
            "duration": 1,
            "description": "Crushing injury of left index finger, sequela"
          },
          {
            "contentTitle": "Eira barbata",
            "video": "http://dummyimage.com/159x126.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "I/I react d/t implanted testicular prosthesis, subs"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/250x162.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Poisn by mixed bact vaccines w/o a pertuss, undet, sequela"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/185x246.png/cc0000/ffffff",
            "duration": 10,
            "description": "Age-rel osteopor w crnt path fx, r shldr, 7thG"
          },
          {
            "contentTitle": "Anas platyrhynchos",
            "video": "http://dummyimage.com/138x241.png/cc0000/ffffff",
            "duration": 5,
            "description": "Unsp athscl unsp type bypass of the extrm, oth extremity"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/186x162.png/dddddd/000000",
            "duration": 1,
            "description": "Nondisp subtrochnt fx l femr, 7thH"
          },
          {
            "contentTitle": "Naja sp.",
            "video": "http://dummyimage.com/109x177.png/ff4444/ffffff",
            "duration": 8,
            "description": "Unsp inj extn musc/fasc/tend l mid finger at forarm lv, subs"
          },
          {
            "contentTitle": "Milvus migrans",
            "video": "http://dummyimage.com/209x172.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Traumatic anuria, subsequent encounter"
          },
          {
            "contentTitle": "Zosterops pallidus",
            "video": "http://dummyimage.com/226x114.png/ff4444/ffffff",
            "duration": 8,
            "description": "Injury of cutan sensory nerve at lower leg level, left leg"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/231x160.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Toxic effect of metals"
          },
          {
            "contentTitle": "Tiliqua scincoides",
            "video": "http://dummyimage.com/155x201.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Puncture wound without foreign body, left knee"
          },
          {
            "contentTitle": "Mungos mungo",
            "video": "http://dummyimage.com/182x123.png/cc0000/ffffff",
            "duration": 2,
            "description": "Nondisp fx of unsp tibial tuberosity, 7thR"
          },
          {
            "contentTitle": "Alligator mississippiensis",
            "video": "http://dummyimage.com/131x175.png/ff4444/ffffff",
            "duration": 10,
            "description": "Exposure to other natural radiation, sequela"
          },
          {
            "contentTitle": "Neotis denhami",
            "video": "http://dummyimage.com/109x197.png/ff4444/ffffff",
            "duration": 7,
            "description": "Milt op w thermal radn effect of nuclear weapon, milt"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/133x217.png/dddddd/000000",
            "duration": 7,
            "description": "Fall from dock, initial encounter"
          }
        ]
      },
      {
        "header": "Administrative Officer",
        "totalMinutes": 13934,
        "contents": [
          {
            "contentTitle": "Mungos mungo",
            "video": "http://dummyimage.com/213x210.png/cc0000/ffffff",
            "duration": 3,
            "description": "Civilian wtrcrft in water trnsp acc w military wtrcrft, subs"
          },
          {
            "contentTitle": "Dasypus septemcincus",
            "video": "http://dummyimage.com/110x145.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Bent bone of unsp ulna, init for opn fx type I/2"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/115x250.png/cc0000/ffffff",
            "duration": 7,
            "description": "Poisoning by penicillins, undetermined, initial encounter"
          },
          {
            "contentTitle": "Spheniscus mendiculus",
            "video": "http://dummyimage.com/169x209.png/dddddd/000000",
            "duration": 6,
            "description": "Laceration of blood vessels at shoulder and upper arm level"
          },
          {
            "contentTitle": "Spermophilus armatus",
            "video": "http://dummyimage.com/167x185.png/cc0000/ffffff",
            "duration": 9,
            "description": "Poisoning by oth topical agents, accidental (unintentional)"
          },
          {
            "contentTitle": "Macropus giganteus",
            "video": "http://dummyimage.com/242x171.png/ff4444/ffffff",
            "duration": 1,
            "description": "Unsp traum nondisp spondylolysis of 7th cervcal vert, 7thD"
          },
          {
            "contentTitle": "Calyptorhynchus magnificus",
            "video": "http://dummyimage.com/112x210.png/ff4444/ffffff",
            "duration": 10,
            "description": "Superficial foreign body of unspecified finger"
          },
          {
            "contentTitle": "Gymnorhina tibicen",
            "video": "http://dummyimage.com/227x106.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Open bite, right elbow, initial encounter"
          },
          {
            "contentTitle": "Sciurus niger",
            "video": "http://dummyimage.com/117x107.png/cc0000/ffffff",
            "duration": 3,
            "description": "Superficial foreign body of unspecified ear, sequela"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/110x115.png/cc0000/ffffff",
            "duration": 3,
            "description": "Obstructed labor due to shoulder presentation, fetus 4"
          },
          {
            "contentTitle": "Podargus strigoides",
            "video": "http://dummyimage.com/147x198.png/dddddd/000000",
            "duration": 5,
            "description": "Diseases of mediastinum, not elsewhere classified"
          },
          {
            "contentTitle": "Francolinus coqui",
            "video": "http://dummyimage.com/177x224.png/dddddd/000000",
            "duration": 9,
            "description": "Physeal fracture of lower end of radius"
          },
          {
            "contentTitle": "Coluber constrictor foxii",
            "video": "http://dummyimage.com/117x238.png/cc0000/ffffff",
            "duration": 6,
            "description": "Unspecified open wound of right breast"
          },
          {
            "contentTitle": "Phalaropus lobatus",
            "video": "http://dummyimage.com/223x218.png/dddddd/000000",
            "duration": 2,
            "description": "Displ oblique fx shaft of l fibula, 7thK"
          }
        ]
      }
    ]
  },
  {
    "title": "Sound of My Voice",
    "subject": "Business Development",
    "instructorName": "Rodin Salem",
    "price": 1598.51,
    "level": "Beginner",
    "courseHours": 189,
    "summary": "Suppression of binocular vision",
    "subtitles": [
      {
        "header": "Mechanical Systems Engineer",
        "totalMinutes": 8385,
        "contents": [
          {
            "contentTitle": "Oryx gazella callotis",
            "video": "http://dummyimage.com/181x180.png/dddddd/000000",
            "duration": 3,
            "description": "Inj musc/tend peroneal grp at low leg level, unsp leg, init"
          },
          {
            "contentTitle": "Macropus eugenii",
            "video": "http://dummyimage.com/144x221.png/dddddd/000000",
            "duration": 3,
            "description": "Disorders of propionate metabolism"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/229x179.png/dddddd/000000",
            "duration": 2,
            "description": "Other forms of stomatitis"
          },
          {
            "contentTitle": "Pavo cristatus",
            "video": "http://dummyimage.com/221x116.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Unsp trochan fx unsp femr, 7thE"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/204x191.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Displaced unsp fracture of left lesser toe(s), init"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/239x127.png/ff4444/ffffff",
            "duration": 5,
            "description": "Open wound of front wall of thorax w penet thoracic cavity"
          },
          {
            "contentTitle": "Grus rubicundus",
            "video": "http://dummyimage.com/136x109.png/dddddd/000000",
            "duration": 2,
            "description": "Contusion of unspecified lower leg, sequela"
          },
          {
            "contentTitle": "Mustela nigripes",
            "video": "http://dummyimage.com/147x175.png/ff4444/ffffff",
            "duration": 4,
            "description": "Central retinal vein occlusion, left eye, w rtnl neovas"
          },
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/238x249.png/dddddd/000000",
            "duration": 3,
            "description": "Assault by steam, hot vapors and hot objects"
          },
          {
            "contentTitle": "Terathopius ecaudatus",
            "video": "http://dummyimage.com/201x127.png/cc0000/ffffff",
            "duration": 9,
            "description": "Sprain of metatarsophalangeal joint of unsp lesser toe(s)"
          },
          {
            "contentTitle": "Petaurus norfolcensis",
            "video": "http://dummyimage.com/231x244.png/cc0000/ffffff",
            "duration": 9,
            "description": "Assault by explosive material"
          },
          {
            "contentTitle": "Vanellus sp.",
            "video": "http://dummyimage.com/124x162.png/cc0000/ffffff",
            "duration": 10,
            "description": "Asphyx due to being trap in oth low oxygen environment, sqla"
          }
        ]
      },
      {
        "header": "Assistant Professor",
        "totalMinutes": 55705,
        "contents": [
          {
            "contentTitle": "Phasianus colchicus",
            "video": "http://dummyimage.com/241x161.png/ff4444/ffffff",
            "duration": 4,
            "description": "Blister (nonthermal) of left hand, initial encounter"
          },
          {
            "contentTitle": "Oreotragus oreotragus",
            "video": "http://dummyimage.com/161x241.png/dddddd/000000",
            "duration": 5,
            "description": "Injury of digital nerve of right ring finger, init encntr"
          },
          {
            "contentTitle": "Morelia spilotes variegata",
            "video": "http://dummyimage.com/218x227.png/ff4444/ffffff",
            "duration": 8,
            "description": "Poisn by androgens and anabolic congeners, self-harm, init"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/211x203.png/dddddd/000000",
            "duration": 9,
            "description": "Problems related to certain psychosocial circumstances"
          },
          {
            "contentTitle": "Alcelaphus buselaphus cokii",
            "video": "http://dummyimage.com/111x200.png/ff4444/ffffff",
            "duration": 3,
            "description": "Displaced fracture of left tibial spine, sequela"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/119x229.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Dry eye syndrome of unspecified lacrimal gland"
          }
        ]
      },
      {
        "header": "Help Desk Operator",
        "totalMinutes": 55188,
        "contents": [
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/121x166.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Unsp pedl cyclst injured in clsn w 2/3-whl mv nontraf, subs"
          },
          {
            "contentTitle": "Antilope cervicapra",
            "video": "http://dummyimage.com/156x184.png/dddddd/000000",
            "duration": 1,
            "description": "Unspecified helicopter accident injuring occupant, sequela"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/157x244.png/ff4444/ffffff",
            "duration": 5,
            "description": "Nondisp unsp fracture of unsp lesser toe(s), init for opn fx"
          },
          {
            "contentTitle": "Damaliscus lunatus",
            "video": "http://dummyimage.com/222x238.png/dddddd/000000",
            "duration": 3,
            "description": "Spinal instabilities, cervicothoracic region"
          },
          {
            "contentTitle": "Buteo jamaicensis",
            "video": "http://dummyimage.com/241x213.png/dddddd/000000",
            "duration": 9,
            "description": "Reiter's disease, unspecified hip"
          },
          {
            "contentTitle": "Ephipplorhynchus senegalensis",
            "video": "http://dummyimage.com/187x206.png/dddddd/000000",
            "duration": 6,
            "description": "Benign neoplasm of pharynx, unspecified"
          },
          {
            "contentTitle": "Kobus defassa",
            "video": "http://dummyimage.com/144x209.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Other contact with other marine mammals"
          },
          {
            "contentTitle": "Trachyphonus vaillantii",
            "video": "http://dummyimage.com/126x230.png/ff4444/ffffff",
            "duration": 7,
            "description": "Burn of unspecified degree of right elbow"
          },
          {
            "contentTitle": "Anas bahamensis",
            "video": "http://dummyimage.com/248x103.png/dddddd/000000",
            "duration": 5,
            "description": "Oth injuries of shoulder and upper arm, unspecified arm"
          },
          {
            "contentTitle": "Microcebus murinus",
            "video": "http://dummyimage.com/223x178.png/ff4444/ffffff",
            "duration": 4,
            "description": "Central subluxation of left hip, sequela"
          },
          {
            "contentTitle": "Chionis alba",
            "video": "http://dummyimage.com/171x112.png/dddddd/000000",
            "duration": 3,
            "description": "Superficial foreign body of right back wall of thorax, subs"
          }
        ]
      },
      {
        "header": "Automation Specialist I",
        "totalMinutes": 83143,
        "contents": [
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/206x110.png/ff4444/ffffff",
            "duration": 10,
            "description": "Lateral disloc of proximal end of tibia, unsp knee, init"
          },
          {
            "contentTitle": "Panthera tigris",
            "video": "http://dummyimage.com/167x202.png/ff4444/ffffff",
            "duration": 10,
            "description": "Other drowning and submersion, undetermined intent, sequela"
          },
          {
            "contentTitle": "Phasianus colchicus",
            "video": "http://dummyimage.com/154x152.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Other contact with nonvenomous lizards"
          },
          {
            "contentTitle": "Iguana iguana",
            "video": "http://dummyimage.com/144x235.png/dddddd/000000",
            "duration": 7,
            "description": "Mech compl of other cardiac electronic device"
          },
          {
            "contentTitle": "Ara chloroptera",
            "video": "http://dummyimage.com/244x125.png/dddddd/000000",
            "duration": 1,
            "description": "Corneal edema secondary to contact lens, right eye"
          },
          {
            "contentTitle": "Notechis semmiannulatus",
            "video": "http://dummyimage.com/140x200.png/ff4444/ffffff",
            "duration": 10,
            "description": "Puncture wound with foreign body, unsp hip, init encntr"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/102x146.png/dddddd/000000",
            "duration": 3,
            "description": "Corrosion of first degree of right elbow"
          },
          {
            "contentTitle": "Anitibyx armatus",
            "video": "http://dummyimage.com/199x221.png/ff4444/ffffff",
            "duration": 4,
            "description": "Postproc hemor of left eye and adnexa fol an opth procedure"
          },
          {
            "contentTitle": "Meleagris gallopavo",
            "video": "http://dummyimage.com/192x205.png/ff4444/ffffff",
            "duration": 1,
            "description": "Triplet pregnancy"
          },
          {
            "contentTitle": "Cebus nigrivittatus",
            "video": "http://dummyimage.com/187x158.png/cc0000/ffffff",
            "duration": 4,
            "description": "Breakdown (mechanical) of intraocular lens, sequela"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/133x101.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Prsn brd/alit hv veh injured in nonclsn transport accident"
          },
          {
            "contentTitle": "Canis mesomelas",
            "video": "http://dummyimage.com/126x220.png/ff4444/ffffff",
            "duration": 1,
            "description": "Hemolytic disease of newborn, unspecified"
          },
          {
            "contentTitle": "Francolinus swainsonii",
            "video": "http://dummyimage.com/178x172.png/ff4444/ffffff",
            "duration": 8,
            "description": "Barton's fx left radius, subs for clos fx w nonunion"
          },
          {
            "contentTitle": "Canis dingo",
            "video": "http://dummyimage.com/186x223.png/cc0000/ffffff",
            "duration": 5,
            "description": "Nondisp fx of trapezium, right wrist, subs for fx w malunion"
          },
          {
            "contentTitle": "Francolinus leucoscepus",
            "video": "http://dummyimage.com/178x175.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Chronic follicular conjunctivitis, bilateral"
          },
          {
            "contentTitle": "Ornithorhynchus anatinus",
            "video": "http://dummyimage.com/207x187.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Displacement of vascular dialysis catheter, init encntr"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/130x183.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Open bite of l bk wl of thorax w/o penet thoracic cavity"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/158x229.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Other specified injury of femoral artery, unspecified leg"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/210x122.png/ff4444/ffffff",
            "duration": 9,
            "description": "Superficial foreign body of breast, unspecified breast"
          }
        ]
      },
      {
        "header": "Assistant Media Planner",
        "totalMinutes": 7084,
        "contents": [
          {
            "contentTitle": "Castor canadensis",
            "video": "http://dummyimage.com/250x118.png/dddddd/000000",
            "duration": 2,
            "description": "Congenital deformity of finger(s) and hand"
          },
          {
            "contentTitle": "Dipodomys deserti",
            "video": "http://dummyimage.com/191x109.png/dddddd/000000",
            "duration": 2,
            "description": "Ped on foot injured in collision w nonmtr vehicle, unsp"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/191x201.png/dddddd/000000",
            "duration": 6,
            "description": "Struck by other bat, racquet or club, initial encounter"
          },
          {
            "contentTitle": "Coracias caudata",
            "video": "http://dummyimage.com/122x230.png/ff4444/ffffff",
            "duration": 8,
            "description": "Oth and unsp soft tissue disorders, not elsewhere classified"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/136x214.png/cc0000/ffffff",
            "duration": 7,
            "description": "Calcific tendinitis, unspecified lower leg"
          },
          {
            "contentTitle": "Nectarinia chalybea",
            "video": "http://dummyimage.com/213x124.png/ff4444/ffffff",
            "duration": 8,
            "description": "Algoneurodystrophy, other site"
          },
          {
            "contentTitle": "Phoeniconaias minor",
            "video": "http://dummyimage.com/113x210.png/dddddd/000000",
            "duration": 2,
            "description": "Inj unsp musc/fasc/tend at thigh level, right thigh, subs"
          },
          {
            "contentTitle": "Tockus erythrorhyncus",
            "video": "http://dummyimage.com/135x232.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Puncture wound with foreign body, left ankle, sequela"
          },
          {
            "contentTitle": "Lasiorhinus latifrons",
            "video": "http://dummyimage.com/230x141.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Other superficial bite of shoulder"
          },
          {
            "contentTitle": "Bubo sp.",
            "video": "http://dummyimage.com/111x138.png/dddddd/000000",
            "duration": 3,
            "description": "Other specified congenital malformations of ear"
          },
          {
            "contentTitle": "Fulica cristata",
            "video": "http://dummyimage.com/134x236.png/ff4444/ffffff",
            "duration": 8,
            "description": "Open bite of vagina and vulva, sequela"
          },
          {
            "contentTitle": "Merops bullockoides",
            "video": "http://dummyimage.com/222x177.png/cc0000/ffffff",
            "duration": 5,
            "description": "Embolism and thrombosis of superfic veins of right low extrm"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/194x111.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Dislocation of l acromioclav jt, 100%-200% displacement"
          },
          {
            "contentTitle": "Tiliqua scincoides",
            "video": "http://dummyimage.com/106x158.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Displaced avulsion fx tuberosity of unsp calcaneus, sequela"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/119x146.png/dddddd/000000",
            "duration": 2,
            "description": "Unspecified injury of unspecified tibial artery"
          },
          {
            "contentTitle": "Sarcophilus harrisii",
            "video": "http://dummyimage.com/123x124.png/cc0000/ffffff",
            "duration": 2,
            "description": "Unspecified superficial injury of left elbow, init encntr"
          },
          {
            "contentTitle": "Haliaetus leucogaster",
            "video": "http://dummyimage.com/164x103.png/cc0000/ffffff",
            "duration": 8,
            "description": "Prsn brd/alit pedl cyc injured in clsn w rail trn/veh, subs"
          },
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/208x188.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Oth fx shaft of unsp tibia, 7thJ"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/168x157.png/ff4444/ffffff",
            "duration": 3,
            "description": "Subluxation of distal interphalangeal joint of left thumb"
          },
          {
            "contentTitle": "Zonotrichia capensis",
            "video": "http://dummyimage.com/243x210.png/dddddd/000000",
            "duration": 10,
            "description": "Other contact with duck, sequela"
          }
        ]
      },
      {
        "header": "Statistician III",
        "totalMinutes": 54337,
        "contents": [
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/200x103.png/ff4444/ffffff",
            "duration": 2,
            "description": "Unsp primarily systemic and hematological agent"
          },
          {
            "contentTitle": "Ara macao",
            "video": "http://dummyimage.com/114x163.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Acquired absence of right thumb"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/167x238.png/cc0000/ffffff",
            "duration": 6,
            "description": "Other juvenile osteochondrosis of hip and pelvis"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/195x213.png/cc0000/ffffff",
            "duration": 6,
            "description": "Air embolism in pregnancy, third trimester"
          },
          {
            "contentTitle": "Trichoglossus haematodus moluccanus",
            "video": "http://dummyimage.com/243x105.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Corrosion of third degree of right knee"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/164x160.png/dddddd/000000",
            "duration": 3,
            "description": "Toxic effect of fusel oil, accidental (unintentional)"
          },
          {
            "contentTitle": "Semnopithecus entellus",
            "video": "http://dummyimage.com/206x249.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Poisoning by stimulant laxatives, assault, sequela"
          },
          {
            "contentTitle": "Physignathus cocincinus",
            "video": "http://dummyimage.com/208x182.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Inj l int carotid, intcr w LOC of unsp duration, sequela"
          },
          {
            "contentTitle": "Grus canadensis",
            "video": "http://dummyimage.com/169x161.png/dddddd/000000",
            "duration": 6,
            "description": "Atypical virus infections of central nervous system"
          }
        ]
      }
    ]
  },
  {
    "title": "Children of the Corn: Revelation",
    "subject": "Business Development",
    "instructorName": "Rodin Salem",
    "price": 2328.08,
    "level": "Advanced",
    "courseHours": 75,
    "summary": "Underdosing of iron and its compounds",
    "subtitles": [
      {
        "header": "Staff Accountant III",
        "totalMinutes": 26908,
        "contents": [
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/140x118.png/ff4444/ffffff",
            "duration": 1,
            "description": "Disp fx of lateral cuneiform of unsp foot, init for opn fx"
          },
          {
            "contentTitle": "Lorythaixoides concolor",
            "video": "http://dummyimage.com/150x106.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Laceration w fb of left thumb w damage to nail, subs"
          },
          {
            "contentTitle": "Sula nebouxii",
            "video": "http://dummyimage.com/201x247.png/cc0000/ffffff",
            "duration": 5,
            "description": "Frostbite with tissue necrosis of left hand, init encntr"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/100x229.png/dddddd/000000",
            "duration": 7,
            "description": "Laceration w foreign body of finger w/o damage to nail, subs"
          },
          {
            "contentTitle": "Myrmecobius fasciatus",
            "video": "http://dummyimage.com/222x217.png/dddddd/000000",
            "duration": 5,
            "description": "Path fx in oth disease, r radius, subs for fx w delay heal"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/126x104.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Legal intervention involving injury by rifle pellet"
          },
          {
            "contentTitle": "Megaderma spasma",
            "video": "http://dummyimage.com/109x212.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Unspecified injury of right eye and orbit"
          },
          {
            "contentTitle": "Vombatus ursinus",
            "video": "http://dummyimage.com/140x127.png/dddddd/000000",
            "duration": 2,
            "description": "Laceration w/o foreign body of abd wall w/o penet perit cav"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/160x138.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Listerial meningitis and meningoencephalitis"
          },
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/120x171.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Calcific tendinitis of left shoulder"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/171x250.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Other fatigue"
          },
          {
            "contentTitle": "Marmota monax",
            "video": "http://dummyimage.com/225x233.png/cc0000/ffffff",
            "duration": 7,
            "description": "Drown due to merchant ship overturning, init"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/202x154.png/dddddd/000000",
            "duration": 6,
            "description": "Oth fx upr and low end l fibula, subs for clos fx w malunion"
          },
          {
            "contentTitle": "Lamprotornis nitens",
            "video": "http://dummyimage.com/139x119.png/cc0000/ffffff",
            "duration": 3,
            "description": "Open bite of left lesser toe(s) with damage to nail"
          },
          {
            "contentTitle": "Salvadora hexalepis",
            "video": "http://dummyimage.com/103x187.png/ff4444/ffffff",
            "duration": 6,
            "description": "Postimmunization arthropathy, left hand"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/128x233.png/cc0000/ffffff",
            "duration": 1,
            "description": "Other specified phobia"
          },
          {
            "contentTitle": "Canis lupus",
            "video": "http://dummyimage.com/247x216.png/dddddd/000000",
            "duration": 9,
            "description": "Struck by crocodile, subsequent encounter"
          },
          {
            "contentTitle": "Acanthaster planci",
            "video": "http://dummyimage.com/223x196.png/ff4444/ffffff",
            "duration": 1,
            "description": "Traum subdr hem w loss of consciousness of 31-59 min, init"
          }
        ]
      },
      {
        "header": "Speech Pathologist",
        "totalMinutes": 65577,
        "contents": [
          {
            "contentTitle": "Phalacrocorax varius",
            "video": "http://dummyimage.com/193x193.png/ff4444/ffffff",
            "duration": 6,
            "description": "Nondisp artic fx head of l femur, init for opn fx type I/2"
          },
          {
            "contentTitle": "Melursus ursinus",
            "video": "http://dummyimage.com/106x114.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Stress fracture, oth site, subs for fx w malunion"
          },
          {
            "contentTitle": "Tetracerus quadricornis",
            "video": "http://dummyimage.com/153x156.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Corrosion of second degree back of right hand, init encntr"
          },
          {
            "contentTitle": "Felis caracal",
            "video": "http://dummyimage.com/198x241.png/dddddd/000000",
            "duration": 1,
            "description": "Oth fracture of right pubis, subs for fx w delay heal"
          },
          {
            "contentTitle": "Trichoglossus haematodus moluccanus",
            "video": "http://dummyimage.com/193x219.png/cc0000/ffffff",
            "duration": 6,
            "description": "Toxic effect of oth gases, fumes and vapors, assault"
          },
          {
            "contentTitle": "Lemur catta",
            "video": "http://dummyimage.com/126x170.png/dddddd/000000",
            "duration": 2,
            "description": "Personal history of anaphylaxis"
          },
          {
            "contentTitle": "Caiman crocodilus",
            "video": "http://dummyimage.com/221x127.png/ff4444/ffffff",
            "duration": 1,
            "description": "Pasngr in 3-whl mv injured in clsn w statnry object in traf"
          },
          {
            "contentTitle": "Anhinga rufa",
            "video": "http://dummyimage.com/234x137.png/dddddd/000000",
            "duration": 3,
            "description": "Other cyst of bone, left thigh"
          },
          {
            "contentTitle": "Morelia spilotes variegata",
            "video": "http://dummyimage.com/239x108.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Open bite of other part of head, initial encounter"
          },
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/134x103.png/dddddd/000000",
            "duration": 1,
            "description": "Oth disp fx of upper end of left humerus, init for opn fx"
          },
          {
            "contentTitle": "Himantopus himantopus",
            "video": "http://dummyimage.com/187x140.png/ff4444/ffffff",
            "duration": 4,
            "description": "LeFort III fracture, subs for fx w delay heal"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/228x134.png/cc0000/ffffff",
            "duration": 9,
            "description": "Traum rupt of palmar ligmt of l mid fngr at MCP/IP jt, init"
          },
          {
            "contentTitle": "Felis wiedi or Leopardus weidi",
            "video": "http://dummyimage.com/245x106.png/ff4444/ffffff",
            "duration": 3,
            "description": "Superficial frostbite of left finger(s), subs encntr"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/109x141.png/ff4444/ffffff",
            "duration": 3,
            "description": "Stress fracture, left foot, subs for fx w routn heal"
          },
          {
            "contentTitle": "Passer domesticus",
            "video": "http://dummyimage.com/168x206.png/dddddd/000000",
            "duration": 4,
            "description": "Occup of bus injured pick-up truck, pk-up/van in traf, subs"
          },
          {
            "contentTitle": "Lorythaixoides concolor",
            "video": "http://dummyimage.com/173x243.png/ff4444/ffffff",
            "duration": 10,
            "description": "Torus fx upper end of left ulna, subs for fx w nonunion"
          }
        ]
      },
      {
        "header": "Recruiter",
        "totalMinutes": 92781,
        "contents": [
          {
            "contentTitle": "Dicrostonyx groenlandicus",
            "video": "http://dummyimage.com/185x168.png/cc0000/ffffff",
            "duration": 2,
            "description": "Poisoning by antiallerg/antiemetic, self-harm, init"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/165x227.png/dddddd/000000",
            "duration": 9,
            "description": "Athscl nonbiol bypass of the extrm w gangrene, oth extremity"
          },
          {
            "contentTitle": "Phasianus colchicus",
            "video": "http://dummyimage.com/179x230.png/ff4444/ffffff",
            "duration": 6,
            "description": "Other stimulant abuse with intoxication, unspecified"
          },
          {
            "contentTitle": "Mustela nigripes",
            "video": "http://dummyimage.com/194x184.png/ff4444/ffffff",
            "duration": 8,
            "description": "Long term (current) use of oral hypoglycemic drugs"
          },
          {
            "contentTitle": "Nectarinia chalybea",
            "video": "http://dummyimage.com/121x160.png/dddddd/000000",
            "duration": 2,
            "description": "Displaced unsp fracture of unsp great toe, init for opn fx"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/172x164.png/ff4444/ffffff",
            "duration": 7,
            "description": "Carotid sinus syncope"
          },
          {
            "contentTitle": "Ara macao",
            "video": "http://dummyimage.com/158x217.png/cc0000/ffffff",
            "duration": 5,
            "description": "Superficial foreign body, right thigh, subsequent encounter"
          },
          {
            "contentTitle": "Bubo virginianus",
            "video": "http://dummyimage.com/101x117.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Complete traum amp of r hip and thigh, level unsp, sequela"
          },
          {
            "contentTitle": "Connochaetus taurinus",
            "video": "http://dummyimage.com/134x195.png/ff4444/ffffff",
            "duration": 1,
            "description": "Unsp injury of musc/fasc/tend at wrs/hnd lv, unsp hand, subs"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/235x120.png/dddddd/000000",
            "duration": 1,
            "description": "Poisn by slctv seroton/norepineph reup inhibtr,slf-hrm, sqla"
          },
          {
            "contentTitle": "Oryx gazella callotis",
            "video": "http://dummyimage.com/119x217.png/dddddd/000000",
            "duration": 6,
            "description": "Other contact with shark, initial encounter"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/204x143.png/dddddd/000000",
            "duration": 3,
            "description": "Ca in situ skin of right upper limb, including shoulder"
          },
          {
            "contentTitle": "Speothos vanaticus",
            "video": "http://dummyimage.com/113x210.png/ff4444/ffffff",
            "duration": 4,
            "description": "Subluxation of unsp interphalangeal joint of finger, sequela"
          },
          {
            "contentTitle": "Mungos mungo",
            "video": "http://dummyimage.com/157x178.png/dddddd/000000",
            "duration": 10,
            "description": "Animl-ridr injured in trnsp acc w military vehicle, init"
          },
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/149x111.png/dddddd/000000",
            "duration": 1,
            "description": "Alveolar maxillary hyperplasia"
          }
        ]
      },
      {
        "header": "Environmental Tech",
        "totalMinutes": 35446,
        "contents": [
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/181x162.png/cc0000/ffffff",
            "duration": 6,
            "description": "Oth physeal fracture of upper end radius, unsp arm, sequela"
          },
          {
            "contentTitle": "Capreolus capreolus",
            "video": "http://dummyimage.com/154x203.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Anterior sublux of proximal end of tibia, left knee, init"
          },
          {
            "contentTitle": "Tyto novaehollandiae",
            "video": "http://dummyimage.com/104x146.png/ff4444/ffffff",
            "duration": 6,
            "description": "Laceration of popliteal vein, left leg, sequela"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/109x203.png/dddddd/000000",
            "duration": 4,
            "description": "Edema of left upper eyelid"
          }
        ]
      },
      {
        "header": "Developer III",
        "totalMinutes": 87402,
        "contents": [
          {
            "contentTitle": "Ctenophorus ornatus",
            "video": "http://dummyimage.com/143x127.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Osteopathy in diseases classified elsewhere, unsp hand"
          },
          {
            "contentTitle": "Sula dactylatra",
            "video": "http://dummyimage.com/199x155.png/dddddd/000000",
            "duration": 9,
            "description": "Disp fx of r ulna styloid pro, init for opn fx type 3A/B/C"
          },
          {
            "contentTitle": "Calyptorhynchus magnificus",
            "video": "http://dummyimage.com/247x230.png/cc0000/ffffff",
            "duration": 2,
            "description": "Injury of trochlear nerve, right side, sequela"
          },
          {
            "contentTitle": "Spermophilus richardsonii",
            "video": "http://dummyimage.com/230x128.png/cc0000/ffffff",
            "duration": 9,
            "description": "Hereditary ataxia, unspecified"
          },
          {
            "contentTitle": "Spermophilus armatus",
            "video": "http://dummyimage.com/231x235.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Old laceration of cervix uteri"
          },
          {
            "contentTitle": "Plegadis falcinellus",
            "video": "http://dummyimage.com/200x133.png/cc0000/ffffff",
            "duration": 4,
            "description": "Oth disp fx of base of 1st MC bone, unsp hand, 7thP"
          },
          {
            "contentTitle": "Corvus albus",
            "video": "http://dummyimage.com/138x181.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Lac w fb of abd wall, right upper quadrant w penet perit cav"
          }
        ]
      },
      {
        "header": "Assistant Professor",
        "totalMinutes": 62054,
        "contents": [
          {
            "contentTitle": "Ovis ammon",
            "video": "http://dummyimage.com/133x145.png/cc0000/ffffff",
            "duration": 8,
            "description": "Nail entering through skin"
          },
          {
            "contentTitle": "Dacelo novaeguineae",
            "video": "http://dummyimage.com/181x174.png/dddddd/000000",
            "duration": 5,
            "description": "Nondisp commnt fx shaft of l femr, 7thN"
          },
          {
            "contentTitle": "Ursus americanus",
            "video": "http://dummyimage.com/169x173.png/cc0000/ffffff",
            "duration": 10,
            "description": "Mtrcy pasngr injured pick-up truck, pk-up/van nontraf, subs"
          },
          {
            "contentTitle": "Nycticorax nycticorax",
            "video": "http://dummyimage.com/200x125.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Drug-induced chronic gout, unspecified shoulder"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/208x123.png/dddddd/000000",
            "duration": 8,
            "description": "Loiasis"
          },
          {
            "contentTitle": "Macropus robustus",
            "video": "http://dummyimage.com/186x140.png/ff4444/ffffff",
            "duration": 2,
            "description": "Ulcerative blepharitis right lower eyelid"
          },
          {
            "contentTitle": "Phoenicopterus chilensis",
            "video": "http://dummyimage.com/141x147.png/ff4444/ffffff",
            "duration": 9,
            "description": "Unspecified subluxation of unspecified foot"
          },
          {
            "contentTitle": "Antidorcas marsupialis",
            "video": "http://dummyimage.com/218x246.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Other fracture of shaft of unspecified ulna"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/148x114.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Superficial frostbite of nose, subsequent encounter"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/137x248.png/cc0000/ffffff",
            "duration": 8,
            "description": "Monteggia's fracture of unspecified ulna, sequela"
          },
          {
            "contentTitle": "Geospiza sp.",
            "video": "http://dummyimage.com/180x177.png/ff4444/ffffff",
            "duration": 5,
            "description": "Sltr-haris Type II physeal fx phalanx of left toe, 7thP"
          },
          {
            "contentTitle": "Picoides pubescens",
            "video": "http://dummyimage.com/104x115.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Unsp inj extensor musc/fasc/tend thmb at wrs/hnd lv, init"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/160x101.png/dddddd/000000",
            "duration": 8,
            "description": "Toxic effect of hydrogen sulfide, accidental (unintentional)"
          },
          {
            "contentTitle": "Antechinus flavipes",
            "video": "http://dummyimage.com/145x233.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Rider of nonpowr wtrcrft struck by powered watercraft, init"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/226x205.png/cc0000/ffffff",
            "duration": 4,
            "description": "Laceration of musc/fasc/tend long hd bicep, right arm, subs"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/104x125.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "External constriction of left little finger, init encntr"
          }
        ]
      },
      {
        "header": "Administrative Assistant III",
        "totalMinutes": 32016,
        "contents": [
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/142x158.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Other injury of unspecified part of colon"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/119x129.png/dddddd/000000",
            "duration": 9,
            "description": "Contusion of lower back and pelvis, subsequent encounter"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/153x241.png/dddddd/000000",
            "duration": 1,
            "description": "Toxic eff of cntct w oth venom marine animals, asslt, init"
          },
          {
            "contentTitle": "Speotyte cuniculata",
            "video": "http://dummyimage.com/101x229.png/dddddd/000000",
            "duration": 10,
            "description": "Benign carcinoid tumor of the jejunum"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/135x141.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Sprain of unspecified coracohumeral (ligament)"
          },
          {
            "contentTitle": "Oxybelis sp.",
            "video": "http://dummyimage.com/219x126.png/ff4444/ffffff",
            "duration": 7,
            "description": "Occup of special industrial vehicle injured nontraf, init"
          },
          {
            "contentTitle": "Taxidea taxus",
            "video": "http://dummyimage.com/232x142.png/dddddd/000000",
            "duration": 2,
            "description": "Unsp fx shaft of unsp radius, init for opn fx type 3A/B/C"
          },
          {
            "contentTitle": "Falco peregrinus",
            "video": "http://dummyimage.com/145x122.png/dddddd/000000",
            "duration": 5,
            "description": "Toxic effect of gases, fumes and vapors, undetermined, subs"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/224x131.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Maternal care for oth fetal problems, first tri, fetus 5"
          },
          {
            "contentTitle": "Pelecans onocratalus",
            "video": "http://dummyimage.com/202x177.png/ff4444/ffffff",
            "duration": 6,
            "description": "Injury of optic tract and pathways, right eye"
          },
          {
            "contentTitle": "Speothos vanaticus",
            "video": "http://dummyimage.com/203x133.png/ff4444/ffffff",
            "duration": 5,
            "description": "Rheumatoid arthritis without rheumatoid factor, right knee"
          },
          {
            "contentTitle": "Charadrius tricollaris",
            "video": "http://dummyimage.com/211x183.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Adult T-cell lymph/leuk (HTLV-1-assoc) not achieve remission"
          },
          {
            "contentTitle": "Macropus parryi",
            "video": "http://dummyimage.com/236x133.png/dddddd/000000",
            "duration": 1,
            "description": "Complete traumatic amp of left foot at ankle level, sequela"
          },
          {
            "contentTitle": "Anas platyrhynchos",
            "video": "http://dummyimage.com/145x177.png/dddddd/000000",
            "duration": 3,
            "description": "Unsp injury of dorsal vein of unspecified foot, sequela"
          }
        ]
      },
      {
        "header": "Desktop Support Technician",
        "totalMinutes": 91024,
        "contents": [
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/131x250.png/cc0000/ffffff",
            "duration": 3,
            "description": "Inj cutan sensory nerve at shldr/up arm, left arm, sequela"
          },
          {
            "contentTitle": "Larus fuliginosus",
            "video": "http://dummyimage.com/163x175.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Other acquired deformities of left foot"
          },
          {
            "contentTitle": "Gorilla gorilla",
            "video": "http://dummyimage.com/192x238.png/dddddd/000000",
            "duration": 2,
            "description": "Other fracture of left foot, sequela"
          },
          {
            "contentTitle": "Dasyurus maculatus",
            "video": "http://dummyimage.com/226x232.png/cc0000/ffffff",
            "duration": 5,
            "description": "Incmpl rotatr-cuff tear/ruptr of unsp shoulder, not trauma"
          },
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/204x108.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Strain of extensor musc/fasc/tend unsp finger at wrs/hnd lv"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/213x244.png/dddddd/000000",
            "duration": 4,
            "description": "Assault by other gas, air or spring-operated gun"
          },
          {
            "contentTitle": "Anhinga rufa",
            "video": "http://dummyimage.com/239x125.png/cc0000/ffffff",
            "duration": 8,
            "description": "Oth benign neoplasm skin/ left lower limb, including hip"
          },
          {
            "contentTitle": "Pycnonotus nigricans",
            "video": "http://dummyimage.com/118x180.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Primary lacrimal gland atrophy, right lacrimal gland"
          },
          {
            "contentTitle": "Speotyte cuniculata",
            "video": "http://dummyimage.com/107x156.png/ff4444/ffffff",
            "duration": 6,
            "description": "Umbilical hemorrhage of newborn"
          },
          {
            "contentTitle": "Milvago chimachima",
            "video": "http://dummyimage.com/178x243.png/cc0000/ffffff",
            "duration": 10,
            "description": "Corrosion of second degree of unsp upper arm, init encntr"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/182x233.png/ff4444/ffffff",
            "duration": 8,
            "description": "Fall due to clsn betw merch ship and oth wtrcrft/obj, init"
          },
          {
            "contentTitle": "Castor fiber",
            "video": "http://dummyimage.com/168x122.png/dddddd/000000",
            "duration": 8,
            "description": "Other fracture of fifth metacarpal bone, left hand"
          },
          {
            "contentTitle": "Canis lupus lycaon",
            "video": "http://dummyimage.com/128x117.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Fracture of nasal bones, subs encntr for fracture w nonunion"
          },
          {
            "contentTitle": "Vulpes vulpes",
            "video": "http://dummyimage.com/198x197.png/dddddd/000000",
            "duration": 2,
            "description": "Duplications with other complex rearrangements"
          }
        ]
      },
      {
        "header": "Project Manager",
        "totalMinutes": 63867,
        "contents": [
          {
            "contentTitle": "Dipodomys deserti",
            "video": "http://dummyimage.com/206x222.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Laceration of other part of small intestine"
          },
          {
            "contentTitle": "Ciconia ciconia",
            "video": "http://dummyimage.com/230x110.png/ff4444/ffffff",
            "duration": 10,
            "description": "Contusion of ovary, unspecified, initial encounter"
          },
          {
            "contentTitle": "Dasyurus maculatus",
            "video": "http://dummyimage.com/245x133.png/ff4444/ffffff",
            "duration": 9,
            "description": "Echinococcus multilocularis infection, unspecified"
          },
          {
            "contentTitle": "Delphinus delphis",
            "video": "http://dummyimage.com/249x143.png/cc0000/ffffff",
            "duration": 3,
            "description": "Intraop hemor/hemtom of eye and adnexa comp an opth proc, bi"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/151x171.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Dx and monitoring physical medicine devices assoc w incdt"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/116x173.png/dddddd/000000",
            "duration": 3,
            "description": "Oth specific arthropathies, NEC, unsp hand"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/177x185.png/ff4444/ffffff",
            "duration": 5,
            "description": "Oth osteopor w crnt path fx, r humer, subs for fx w malunion"
          },
          {
            "contentTitle": "Ovis orientalis",
            "video": "http://dummyimage.com/124x161.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "External constriction, unspecified lesser toe(s), sequela"
          },
          {
            "contentTitle": "Creagrus furcatus",
            "video": "http://dummyimage.com/143x166.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Toxic effect of hydrogen sulfide, assault, initial encounter"
          },
          {
            "contentTitle": "Erinaceus frontalis",
            "video": "http://dummyimage.com/175x213.png/ff4444/ffffff",
            "duration": 2,
            "description": "Corrosion of unsp degree of unspecified wrist, init encntr"
          },
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/207x232.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Disorder of ligament, right hip"
          },
          {
            "contentTitle": "Streptopelia decipiens",
            "video": "http://dummyimage.com/151x226.png/ff4444/ffffff",
            "duration": 7,
            "description": "Retinal hemorrhage, right eye"
          }
        ]
      },
      {
        "header": "Software Engineer IV",
        "totalMinutes": 24052,
        "contents": [
          {
            "contentTitle": "Gymnorhina tibicen",
            "video": "http://dummyimage.com/212x104.png/ff4444/ffffff",
            "duration": 1,
            "description": "Intrahepatic bile duct carcinoma"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/109x224.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Oth injury of unspecified tibial artery, right leg, sequela"
          },
          {
            "contentTitle": "Felis concolor",
            "video": "http://dummyimage.com/159x136.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Oth injury of anterior tibial artery, unsp leg, sequela"
          },
          {
            "contentTitle": "Coluber constrictor foxii",
            "video": "http://dummyimage.com/167x145.png/cc0000/ffffff",
            "duration": 2,
            "description": "Other injury of rectum, initial encounter"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/241x159.png/ff4444/ffffff",
            "duration": 6,
            "description": "Nondisplaced midcervical fracture of left femur, init"
          }
        ]
      },
      {
        "header": "Account Executive",
        "totalMinutes": 65843,
        "contents": [
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/181x107.png/dddddd/000000",
            "duration": 7,
            "description": "Diab with prolif diabetic rtnop with macular edema, left eye"
          },
          {
            "contentTitle": "Sarcorhamphus papa",
            "video": "http://dummyimage.com/185x234.png/ff4444/ffffff",
            "duration": 8,
            "description": "Thrombosis of cardiac and vascular prosth dev/grft"
          },
          {
            "contentTitle": "Calyptorhynchus magnificus",
            "video": "http://dummyimage.com/202x133.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Sltr-haris Type III physl fx upper end humer, unsp arm, 7thD"
          },
          {
            "contentTitle": "Charadrius tricollaris",
            "video": "http://dummyimage.com/157x242.png/cc0000/ffffff",
            "duration": 1,
            "description": "Spinal enthesopathy, lumbosacral region"
          },
          {
            "contentTitle": "Phalacrocorax brasilianus",
            "video": "http://dummyimage.com/201x148.png/dddddd/000000",
            "duration": 8,
            "description": "Toxic effect of unspecified pesticide"
          },
          {
            "contentTitle": "Bettongia penicillata",
            "video": "http://dummyimage.com/145x174.png/dddddd/000000",
            "duration": 9,
            "description": "Oth maternal infec/parastc diseases comp preg, second tri"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/152x246.png/dddddd/000000",
            "duration": 6,
            "description": "Sec and unsp malig neoplasm of inguinal and lower limb nodes"
          },
          {
            "contentTitle": "Egretta thula",
            "video": "http://dummyimage.com/222x230.png/ff4444/ffffff",
            "duration": 3,
            "description": "Vesicoureteral-reflux, unspecified"
          }
        ]
      },
      {
        "header": "Chief Design Engineer",
        "totalMinutes": 61312,
        "contents": [
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/195x179.png/dddddd/000000",
            "duration": 6,
            "description": "Disp fx of base of 5th MC bone. l hand, 7thG"
          },
          {
            "contentTitle": "Hymenolaimus malacorhynchus",
            "video": "http://dummyimage.com/108x149.png/dddddd/000000",
            "duration": 7,
            "description": "Emphysema (subcutaneous) resulting from a procedure, subs"
          },
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/119x134.png/ff4444/ffffff",
            "duration": 2,
            "description": "Poisoning by tricyclic antidepressants, undetermined, init"
          },
          {
            "contentTitle": "Phoca vitulina",
            "video": "http://dummyimage.com/102x186.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Other mechanical complication of implanted urinary sphincter"
          },
          {
            "contentTitle": "Pelecanus occidentalis",
            "video": "http://dummyimage.com/131x223.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Other physeal fracture of right calcaneus, sequela"
          }
        ]
      },
      {
        "header": "Administrative Assistant III",
        "totalMinutes": 58466,
        "contents": [
          {
            "contentTitle": "Anas bahamensis",
            "video": "http://dummyimage.com/158x108.png/dddddd/000000",
            "duration": 1,
            "description": "Asphyx d/t being trap in a (discarded) refrig, undet, init"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/151x162.png/cc0000/ffffff",
            "duration": 6,
            "description": "Nondisp fx of shaft of r clavicle, subs for fx w delay heal"
          },
          {
            "contentTitle": "Terrapene carolina",
            "video": "http://dummyimage.com/134x222.png/dddddd/000000",
            "duration": 1,
            "description": "Unspecified subluxation of left little finger, sequela"
          },
          {
            "contentTitle": "Eremophila alpestris",
            "video": "http://dummyimage.com/219x220.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Displ seg fx shaft of ulna, unsp arm, 7thB"
          },
          {
            "contentTitle": "Vulpes cinereoargenteus",
            "video": "http://dummyimage.com/185x187.png/ff4444/ffffff",
            "duration": 5,
            "description": "Maternal care for anti-D antibodies, second tri, fetus 4"
          },
          {
            "contentTitle": "Pitangus sulphuratus",
            "video": "http://dummyimage.com/134x235.png/ff4444/ffffff",
            "duration": 5,
            "description": "Poisn by unsp sys anti-infect and antiparastc, assault, init"
          },
          {
            "contentTitle": "Nectarinia chalybea",
            "video": "http://dummyimage.com/248x126.png/dddddd/000000",
            "duration": 6,
            "description": "War op w combat using blunt/pierc object, civilian, sequela"
          },
          {
            "contentTitle": "Macaca nemestrina",
            "video": "http://dummyimage.com/173x152.png/dddddd/000000",
            "duration": 5,
            "description": "Unsp inj musc/fasc/tend at forarm lv, left arm, sequela"
          },
          {
            "contentTitle": "Vulpes vulpes",
            "video": "http://dummyimage.com/120x112.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Monoarthritis, not elsewhere classified"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/168x129.png/cc0000/ffffff",
            "duration": 9,
            "description": "Laceration without foreign body, right foot, subs encntr"
          },
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/232x129.png/cc0000/ffffff",
            "duration": 4,
            "description": "Dysphagia following cerebral infarction"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/110x168.png/ff4444/ffffff",
            "duration": 6,
            "description": "Drug/chem diab w diab mclr edma, resolved fol trtmt, r eye"
          },
          {
            "contentTitle": "Crotaphytus collaris",
            "video": "http://dummyimage.com/121x192.png/ff4444/ffffff",
            "duration": 9,
            "description": "Nondisp fx of medial malleolus of unsp tibia, init"
          },
          {
            "contentTitle": "Cebus apella",
            "video": "http://dummyimage.com/123x170.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Displ Rolando's fracture, left hand, subs for fx w nonunion"
          },
          {
            "contentTitle": "Haliaeetus leucocephalus",
            "video": "http://dummyimage.com/142x195.png/ff4444/ffffff",
            "duration": 7,
            "description": "Driver of pk-up/van inj in nonclsn trnsp acc nontraf, subs"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/192x194.png/ff4444/ffffff",
            "duration": 4,
            "description": "Injury of other blood vessels at hip and thigh level"
          }
        ]
      },
      {
        "header": "Senior Editor",
        "totalMinutes": 75466,
        "contents": [
          {
            "contentTitle": "Chordeiles minor",
            "video": "http://dummyimage.com/120x199.png/dddddd/000000",
            "duration": 6,
            "description": "Disp fx of body of left talus, init encntr for open fracture"
          },
          {
            "contentTitle": "Boa constrictor mexicana",
            "video": "http://dummyimage.com/157x105.png/ff4444/ffffff",
            "duration": 7,
            "description": "Unstable burst fracture of first cervical vertebra"
          },
          {
            "contentTitle": "Marmota monax",
            "video": "http://dummyimage.com/235x234.png/dddddd/000000",
            "duration": 9,
            "description": "Toxic effect of corrosive organic compounds, accidental"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/229x139.png/dddddd/000000",
            "duration": 4,
            "description": "Fistula of stomach and duodenum"
          },
          {
            "contentTitle": "Deroptyus accipitrinus",
            "video": "http://dummyimage.com/110x207.png/dddddd/000000",
            "duration": 5,
            "description": "Sltr-haris Type I physeal fx phalanx of right toe, 7thD"
          },
          {
            "contentTitle": "Ovis dalli stonei",
            "video": "http://dummyimage.com/132x100.png/dddddd/000000",
            "duration": 4,
            "description": "Encounter for fit/adjst of unsp left artificial leg"
          },
          {
            "contentTitle": "Vanessa indica",
            "video": "http://dummyimage.com/239x111.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Unsp disp fx of second cervical vertebra, init for clos fx"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/216x216.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Other and unspecified gangliosidosis"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/183x134.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Unspecified injury of fallopian tube, unspecified"
          },
          {
            "contentTitle": "Chloephaga melanoptera",
            "video": "http://dummyimage.com/202x242.png/cc0000/ffffff",
            "duration": 8,
            "description": "Pathological fracture in neoplastic disease, left tibia"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/231x208.png/ff4444/ffffff",
            "duration": 10,
            "description": "Toxic effect of harmful algae and algae toxins, acc, init"
          },
          {
            "contentTitle": "Gazella granti",
            "video": "http://dummyimage.com/100x168.png/dddddd/000000",
            "duration": 2,
            "description": "Abrasion, left great toe, subsequent encounter"
          },
          {
            "contentTitle": "Spermophilus armatus",
            "video": "http://dummyimage.com/225x188.png/dddddd/000000",
            "duration": 4,
            "description": "Unintended awareness under general anesth during proc, sqla"
          },
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/228x222.png/cc0000/ffffff",
            "duration": 9,
            "description": "Rheumatoid lung disease w rheumatoid arthritis of unsp wrist"
          }
        ]
      },
      {
        "header": "Human Resources Assistant IV",
        "totalMinutes": 84315,
        "contents": [
          {
            "contentTitle": "Sylvicapra grimma",
            "video": "http://dummyimage.com/112x107.png/cc0000/ffffff",
            "duration": 6,
            "description": "Superficial foreign body of vagina and vulva, subs encntr"
          },
          {
            "contentTitle": "Lycaon pictus",
            "video": "http://dummyimage.com/133x224.png/dddddd/000000",
            "duration": 8,
            "description": "Prsn brd/alit hv veh injured in clsn w rail trn/veh, init"
          },
          {
            "contentTitle": "Cygnus atratus",
            "video": "http://dummyimage.com/135x187.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Carotid sinus syncope"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/237x216.png/ff4444/ffffff",
            "duration": 4,
            "description": "Disp fx of olecran pro w/o intartic extn r ulna, 7thH"
          },
          {
            "contentTitle": "Tetracerus quadricornis",
            "video": "http://dummyimage.com/244x158.png/ff4444/ffffff",
            "duration": 9,
            "description": "Ant disp fx of sternal end of unsp clavicle, init for opn fx"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/182x182.png/cc0000/ffffff",
            "duration": 9,
            "description": "Car occupant injured in noncollision transport accident"
          }
        ]
      },
      {
        "header": "Internal Auditor",
        "totalMinutes": 65758,
        "contents": [
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/125x227.png/cc0000/ffffff",
            "duration": 2,
            "description": "Unsp fx upr end l tibia, 7thN"
          },
          {
            "contentTitle": "Dasypus septemcincus",
            "video": "http://dummyimage.com/142x247.png/cc0000/ffffff",
            "duration": 2,
            "description": "Onycholysis"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/198x211.png/ff4444/ffffff",
            "duration": 8,
            "description": "Unspecified deformity of finger(s)"
          },
          {
            "contentTitle": "Ephippiorhynchus mycteria",
            "video": "http://dummyimage.com/197x244.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Displ trimalleol fx r low leg, 7thE"
          },
          {
            "contentTitle": "Coluber constrictor foxii",
            "video": "http://dummyimage.com/205x202.png/ff4444/ffffff",
            "duration": 5,
            "description": "Inferior dislocation of left acromioclavicular joint, subs"
          },
          {
            "contentTitle": "Gorilla gorilla",
            "video": "http://dummyimage.com/165x113.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Posterior subcapsular polar age-related cataract, unsp eye"
          },
          {
            "contentTitle": "Pseudocheirus peregrinus",
            "video": "http://dummyimage.com/142x204.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Sprain of interphalangeal joint of unsp finger, sequela"
          },
          {
            "contentTitle": "Spermophilus tridecemlineatus",
            "video": "http://dummyimage.com/102x177.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Glaucomatous optic atrophy, left eye"
          },
          {
            "contentTitle": "Equus hemionus",
            "video": "http://dummyimage.com/145x203.png/cc0000/ffffff",
            "duration": 4,
            "description": "Local-rel symptc epi w simple part seiz, ntrct, w stat epi"
          },
          {
            "contentTitle": "Thamnolaea cinnmomeiventris",
            "video": "http://dummyimage.com/237x103.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Fall same lev from slip/trip w strike against sharp object"
          },
          {
            "contentTitle": "Thalasseus maximus",
            "video": "http://dummyimage.com/240x206.png/ff4444/ffffff",
            "duration": 3,
            "description": "Atheroembolism"
          },
          {
            "contentTitle": "Larus novaehollandiae",
            "video": "http://dummyimage.com/234x148.png/cc0000/ffffff",
            "duration": 7,
            "description": "Laceration with foreign body of left ear, subs encntr"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/206x224.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Sltr-haris Type I physl fx low end l femr, 7thD"
          },
          {
            "contentTitle": "Otaria flavescens",
            "video": "http://dummyimage.com/149x164.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Corrosion of unspecified degree of right ear, sequela"
          },
          {
            "contentTitle": "Crotalus adamanteus",
            "video": "http://dummyimage.com/227x161.png/ff4444/ffffff",
            "duration": 10,
            "description": "Dislocation of other parts of neck, initial encounter"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/102x217.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Athscl heart disease of native coronary artery w/o ang pctrs"
          },
          {
            "contentTitle": "Loxodonta africana",
            "video": "http://dummyimage.com/215x165.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Pseudopapilledema of optic disc, left eye"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/227x137.png/cc0000/ffffff",
            "duration": 9,
            "description": "Disp fx of unsp tibial tuberosity, 7thJ"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/161x181.png/ff4444/ffffff",
            "duration": 3,
            "description": "Lacerat long flexor musc/fasc/tend thmb at wrs/hnd lv, sqla"
          },
          {
            "contentTitle": "Catharacta skua",
            "video": "http://dummyimage.com/247x187.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Cont preg aft elctv fetl rdct of 1 fts or more, 1st tri, oth"
          }
        ]
      },
      {
        "header": "Teacher",
        "totalMinutes": 37789,
        "contents": [
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/167x232.png/cc0000/ffffff",
            "duration": 4,
            "description": "Fx unsp phalanx of right thumb, subs for fx w malunion"
          },
          {
            "contentTitle": "Nyctanassa violacea",
            "video": "http://dummyimage.com/213x137.png/cc0000/ffffff",
            "duration": 6,
            "description": "Displ commnt fx shaft of humer, l arm, 7thD"
          },
          {
            "contentTitle": "Thalasseus maximus",
            "video": "http://dummyimage.com/147x128.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Burn of second degree of palm"
          },
          {
            "contentTitle": "Limosa haemastica",
            "video": "http://dummyimage.com/118x176.png/dddddd/000000",
            "duration": 1,
            "description": "Puncture wound w/o foreign body of unsp wrist, subs encntr"
          },
          {
            "contentTitle": "Spermophilus lateralis",
            "video": "http://dummyimage.com/213x136.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Unsp open wound of unsp great toe w/o damage to nail, init"
          },
          {
            "contentTitle": "Vombatus ursinus",
            "video": "http://dummyimage.com/131x168.png/cc0000/ffffff",
            "duration": 7,
            "description": "Disp fx of neck of unsp talus, subs for fx w routn heal"
          },
          {
            "contentTitle": "Rangifer tarandus",
            "video": "http://dummyimage.com/187x190.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Laceration w foreign body of vagina and vulva, subs encntr"
          },
          {
            "contentTitle": "Spizaetus coronatus",
            "video": "http://dummyimage.com/239x146.png/ff4444/ffffff",
            "duration": 2,
            "description": "Unspecified dislocation of right foot, sequela"
          },
          {
            "contentTitle": "Diceros bicornis",
            "video": "http://dummyimage.com/126x201.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Malignant neoplasm of labium majus"
          },
          {
            "contentTitle": "Canis mesomelas",
            "video": "http://dummyimage.com/103x122.png/dddddd/000000",
            "duration": 3,
            "description": "Lacerat unsp musc/fasc/tend at forarm lv, right arm, subs"
          },
          {
            "contentTitle": "Priodontes maximus",
            "video": "http://dummyimage.com/246x243.png/cc0000/ffffff",
            "duration": 9,
            "description": "Unsp complication of internal prosth dev/grft, subs"
          },
          {
            "contentTitle": "Bassariscus astutus",
            "video": "http://dummyimage.com/149x174.png/ff4444/ffffff",
            "duration": 3,
            "description": "Polyhydramnios, third trimester, fetus 4"
          },
          {
            "contentTitle": "Pavo cristatus",
            "video": "http://dummyimage.com/131x195.png/cc0000/ffffff",
            "duration": 3,
            "description": "Unspecified fall, sequela"
          },
          {
            "contentTitle": "Phoeniconaias minor",
            "video": "http://dummyimage.com/141x146.png/cc0000/ffffff",
            "duration": 5,
            "description": "Other and unspecified injuries of wrist, hand and finger(s)"
          },
          {
            "contentTitle": "Numida meleagris",
            "video": "http://dummyimage.com/108x184.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Flatback syndrome, site unspecified"
          },
          {
            "contentTitle": "Corvus brachyrhynchos",
            "video": "http://dummyimage.com/191x207.png/cc0000/ffffff",
            "duration": 8,
            "description": "Pedl cyc driver inj in clsn w statnry object in traf, init"
          },
          {
            "contentTitle": "Capra ibex",
            "video": "http://dummyimage.com/177x225.png/dddddd/000000",
            "duration": 1,
            "description": "Disp fx of base of nk of unsp femr, 7thQ"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/242x108.png/dddddd/000000",
            "duration": 7,
            "description": "Occlusion and stenosis of bi posterior cerebral arteries"
          },
          {
            "contentTitle": "Vanessa indica",
            "video": "http://dummyimage.com/217x142.png/dddddd/000000",
            "duration": 3,
            "description": "Penetrating wound w/o foreign body of right eyeball, sequela"
          },
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/225x153.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Poisn by antimalari/drugs acting on bld protzoa, acc, sqla"
          }
        ]
      },
      {
        "header": "Recruiter",
        "totalMinutes": 25112,
        "contents": [
          {
            "contentTitle": "Capreolus capreolus",
            "video": "http://dummyimage.com/121x167.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Person injured in unsp nonmotor-vehicle acc, traffic, subs"
          },
          {
            "contentTitle": "Sula nebouxii",
            "video": "http://dummyimage.com/232x193.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Oth injury of blood vessel of left thumb, sequela"
          },
          {
            "contentTitle": "Grus antigone",
            "video": "http://dummyimage.com/203x198.png/dddddd/000000",
            "duration": 1,
            "description": "Post-traumatic osteoarthritis, right shoulder"
          },
          {
            "contentTitle": "Zonotrichia capensis",
            "video": "http://dummyimage.com/160x184.png/dddddd/000000",
            "duration": 4,
            "description": "Iodine-deficiency related multinodular (endemic) goiter"
          }
        ]
      },
      {
        "header": "Structural Analysis Engineer",
        "totalMinutes": 66978,
        "contents": [
          {
            "contentTitle": "Tenrec ecaudatus",
            "video": "http://dummyimage.com/122x154.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Corrosion of unspecified degree of right ear, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/192x150.png/dddddd/000000",
            "duration": 5,
            "description": "Burn first deg of shldr/up lmb, ex wrs/hnd, unsp site, sqla"
          },
          {
            "contentTitle": "Sauromalus obesus",
            "video": "http://dummyimage.com/110x227.png/ff4444/ffffff",
            "duration": 3,
            "description": "Contact w powered woodworking and forming machines, init"
          },
          {
            "contentTitle": "Ara chloroptera",
            "video": "http://dummyimage.com/212x218.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Abrasion of right eyelid and periocular area, init encntr"
          },
          {
            "contentTitle": "Scolopax minor",
            "video": "http://dummyimage.com/221x233.png/cc0000/ffffff",
            "duration": 6,
            "description": "Subluxation of midcarpal joint of unsp wrist, init encntr"
          },
          {
            "contentTitle": "Herpestes javanicus",
            "video": "http://dummyimage.com/136x211.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Poisoning by oth viral vaccines, accidental, subs"
          },
          {
            "contentTitle": "Pandon haliaetus",
            "video": "http://dummyimage.com/100x165.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Unsp inj great saphenous at lower leg level, right leg, subs"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/240x152.png/cc0000/ffffff",
            "duration": 5,
            "description": "Blister (nonthermal) of breast, unspecified breast"
          }
        ]
      }
    ]
  },
  {
    "title": "Crimi Clowns: De Movie",
    "subject": "Support",
    "instructorName": "Rodin Salem",
    "price": 620.01,
    "level": "Beginner",
    "courseHours": 22,
    "summary": "Stress fracture, right femur, subs for fx w delay heal",
    "subtitles": [
      {
        "header": "Assistant Manager",
        "totalMinutes": 32096,
        "contents": [
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/221x171.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Saddle embolus of pulmonary artery with acute cor pulmonale"
          },
          {
            "contentTitle": "Diomedea irrorata",
            "video": "http://dummyimage.com/227x133.png/ff4444/ffffff",
            "duration": 9,
            "description": "Type III occipital condyle fracture, right side"
          },
          {
            "contentTitle": "Bucephala clangula",
            "video": "http://dummyimage.com/246x180.png/cc0000/ffffff",
            "duration": 1,
            "description": "Retained (old) magnetic fb in ant chamber, left eye"
          },
          {
            "contentTitle": "Petaurus breviceps",
            "video": "http://dummyimage.com/171x188.png/dddddd/000000",
            "duration": 3,
            "description": "Partial traumatic amputation of two or more unsp lesser toes"
          },
          {
            "contentTitle": "Hystrix cristata",
            "video": "http://dummyimage.com/240x250.png/dddddd/000000",
            "duration": 8,
            "description": "Lac w fb of left lesser toe(s) w damage to nail, sequela"
          },
          {
            "contentTitle": "Passer domesticus",
            "video": "http://dummyimage.com/198x171.png/dddddd/000000",
            "duration": 4,
            "description": "Laceration w/o foreign body of left thumb w damage to nail"
          },
          {
            "contentTitle": "Eremophila alpestris",
            "video": "http://dummyimage.com/224x143.png/ff4444/ffffff",
            "duration": 9,
            "description": "Other specified injury of femoral artery, right leg"
          },
          {
            "contentTitle": "Sus scrofa",
            "video": "http://dummyimage.com/210x214.png/ff4444/ffffff",
            "duration": 7,
            "description": "Manic episode, unspecified"
          },
          {
            "contentTitle": "Boselaphus tragocamelus",
            "video": "http://dummyimage.com/163x178.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Basal cell carcinoma of skin of nose"
          },
          {
            "contentTitle": "Spermophilus parryii",
            "video": "http://dummyimage.com/204x126.png/ff4444/ffffff",
            "duration": 5,
            "description": "Osteolysis, left lower leg"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/230x203.png/dddddd/000000",
            "duration": 4,
            "description": "Strain flxr musc/fasc/tend r little fngr at forarm lv, init"
          },
          {
            "contentTitle": "Dendrocygna viduata",
            "video": "http://dummyimage.com/250x183.png/ff4444/ffffff",
            "duration": 5,
            "description": "Stress fracture, other site, initial encounter for fracture"
          },
          {
            "contentTitle": "Nyctea scandiaca",
            "video": "http://dummyimage.com/214x248.png/dddddd/000000",
            "duration": 6,
            "description": "Other dislocation of unspecified ulnohumeral joint"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/228x208.png/dddddd/000000",
            "duration": 10,
            "description": "Other conjunctival vascular disorders and cysts"
          },
          {
            "contentTitle": "Alouatta seniculus",
            "video": "http://dummyimage.com/173x237.png/cc0000/ffffff",
            "duration": 1,
            "description": "Maternal care for intrauterine death, fetus 1"
          },
          {
            "contentTitle": "Tamiasciurus hudsonicus",
            "video": "http://dummyimage.com/104x140.png/cc0000/ffffff",
            "duration": 7,
            "description": "Deviation of ureter"
          }
        ]
      },
      {
        "header": "Senior Developer",
        "totalMinutes": 15075,
        "contents": [
          {
            "contentTitle": "Ara macao",
            "video": "http://dummyimage.com/240x158.png/cc0000/ffffff",
            "duration": 2,
            "description": "Primary generalized (osteo)arthritis"
          },
          {
            "contentTitle": "Corvus brachyrhynchos",
            "video": "http://dummyimage.com/220x139.png/dddddd/000000",
            "duration": 8,
            "description": "Displaced bicondylar fx left tibia, init for opn fx type I/2"
          },
          {
            "contentTitle": "Lamprotornis chalybaeus",
            "video": "http://dummyimage.com/162x232.png/ff4444/ffffff",
            "duration": 4,
            "description": "Occup of bus injured pick-up truck, pk-up/van nontraf"
          },
          {
            "contentTitle": "Cercatetus concinnus",
            "video": "http://dummyimage.com/196x149.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Urinary catheterization cause abn react/compl, w/o misadvnt"
          },
          {
            "contentTitle": "Damaliscus lunatus",
            "video": "http://dummyimage.com/132x209.png/ff4444/ffffff",
            "duration": 6,
            "description": "32 weeks gestation of pregnancy"
          },
          {
            "contentTitle": "Panthera leo",
            "video": "http://dummyimage.com/150x240.png/dddddd/000000",
            "duration": 5,
            "description": "Other kyphosis, cervicothoracic region"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/193x152.png/ff4444/ffffff",
            "duration": 7,
            "description": "Disruption of wound, unspecified, subsequent encounter"
          },
          {
            "contentTitle": "Stercorarius longicausus",
            "video": "http://dummyimage.com/241x169.png/dddddd/000000",
            "duration": 3,
            "description": "Displ longitud fx unsp patella, 7thN"
          },
          {
            "contentTitle": "Sciurus niger",
            "video": "http://dummyimage.com/136x151.png/ff4444/ffffff",
            "duration": 9,
            "description": "Female genital mutilation Type III status"
          },
          {
            "contentTitle": "Spermophilus richardsonii",
            "video": "http://dummyimage.com/248x186.png/ff4444/ffffff",
            "duration": 5,
            "description": "Legal intervnt w unsp firearm disch, law enforc offl injured"
          },
          {
            "contentTitle": "Didelphis virginiana",
            "video": "http://dummyimage.com/213x177.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Paralytic calcification and ossification of muscle, l up arm"
          },
          {
            "contentTitle": "Ceratotherium simum",
            "video": "http://dummyimage.com/244x108.png/cc0000/ffffff",
            "duration": 5,
            "description": "Unsp bus occupant injured in clsn w unsp mv nontraf, init"
          },
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/101x157.png/ff4444/ffffff",
            "duration": 7,
            "description": "Street, highway and other paved roadways as place"
          },
          {
            "contentTitle": "Meleagris gallopavo",
            "video": "http://dummyimage.com/224x173.png/dddddd/000000",
            "duration": 7,
            "description": "Open bite of vagina and vulva, subsequent encounter"
          },
          {
            "contentTitle": "Phalacrocorax varius",
            "video": "http://dummyimage.com/249x132.png/cc0000/ffffff",
            "duration": 2,
            "description": "Crushing injury of right index finger, initial encounter"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/150x187.png/dddddd/000000",
            "duration": 9,
            "description": "Secondary malignant neoplasm of retroperiton and peritoneum"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/165x103.png/cc0000/ffffff",
            "duration": 4,
            "description": "Unsp fx upper end unsp ulna, subs for clos fx w delay heal"
          },
          {
            "contentTitle": "Gekko gecko",
            "video": "http://dummyimage.com/235x150.png/cc0000/ffffff",
            "duration": 1,
            "description": "Secondary malignant neoplasm of retroperiton and peritoneum"
          }
        ]
      },
      {
        "header": "Automation Specialist IV",
        "totalMinutes": 57608,
        "contents": [
          {
            "contentTitle": "Melursus ursinus",
            "video": "http://dummyimage.com/210x196.png/dddddd/000000",
            "duration": 7,
            "description": "Toxic effects of phenol and phenol homologues"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/163x187.png/cc0000/ffffff",
            "duration": 3,
            "description": "War op w direct blast effect of nuclear weapon, civ, init"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/240x178.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Blister (nonthermal) of left little finger, subs encntr"
          },
          {
            "contentTitle": "Chauna torquata",
            "video": "http://dummyimage.com/230x131.png/ff4444/ffffff",
            "duration": 7,
            "description": "Unsp fx lower end of l tibia, subs for clos fx w routn heal"
          },
          {
            "contentTitle": "Boa caninus",
            "video": "http://dummyimage.com/114x222.png/cc0000/ffffff",
            "duration": 2,
            "description": "Toxic effect of venom of oth arthropod, undetermined, init"
          },
          {
            "contentTitle": "Aonyx capensis",
            "video": "http://dummyimage.com/150x210.png/dddddd/000000",
            "duration": 3,
            "description": "Sprain of interphalangeal joint of unsp finger, init encntr"
          },
          {
            "contentTitle": "Vombatus ursinus",
            "video": "http://dummyimage.com/166x106.png/cc0000/ffffff",
            "duration": 10,
            "description": "Disp fx of dist phalanx of r less toe(s), 7thK"
          },
          {
            "contentTitle": "Larus fuliginosus",
            "video": "http://dummyimage.com/215x172.png/ff4444/ffffff",
            "duration": 8,
            "description": "Nondisp fx of body of hamate bone, l wrs, 7thK"
          },
          {
            "contentTitle": "Damaliscus lunatus",
            "video": "http://dummyimage.com/202x244.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Sprain of anterior cruciate ligament of right knee"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/134x181.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Chronic atrophic gastritis without bleeding"
          },
          {
            "contentTitle": "Macropus giganteus",
            "video": "http://dummyimage.com/227x237.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Hypertrophy of adenoids"
          },
          {
            "contentTitle": "Leprocaulinus vipera",
            "video": "http://dummyimage.com/249x219.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Milt op involving unsp dest arcrft, civilian, subs"
          }
        ]
      },
      {
        "header": "VP Accounting",
        "totalMinutes": 22770,
        "contents": [
          {
            "contentTitle": "Lemur fulvus",
            "video": "http://dummyimage.com/222x164.png/cc0000/ffffff",
            "duration": 6,
            "description": "Excessive weight gain in pregnancy, first trimester"
          },
          {
            "contentTitle": "Ceratotherium simum",
            "video": "http://dummyimage.com/248x171.png/ff4444/ffffff",
            "duration": 10,
            "description": "Unsp injury of msl/tnd of unsp wall of thorax, sequela"
          },
          {
            "contentTitle": "Leprocaulinus vipera",
            "video": "http://dummyimage.com/196x178.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Folds and rupture in Bowman's membrane, unspecified eye"
          },
          {
            "contentTitle": "Pelecanus conspicillatus",
            "video": "http://dummyimage.com/208x163.png/dddddd/000000",
            "duration": 5,
            "description": "Person injured in collision betw hv veh and bus, init"
          },
          {
            "contentTitle": "Crotalus triseriatus",
            "video": "http://dummyimage.com/112x118.png/cc0000/ffffff",
            "duration": 10,
            "description": "Displaced segmental fracture of shaft of unspecified fibula"
          },
          {
            "contentTitle": "Cygnus buccinator",
            "video": "http://dummyimage.com/200x174.png/dddddd/000000",
            "duration": 9,
            "description": "Other chronic hematogenous osteomyelitis, hand"
          },
          {
            "contentTitle": "Bubalornis niger",
            "video": "http://dummyimage.com/210x174.png/cc0000/ffffff",
            "duration": 9,
            "description": "Nondisp bimalleol fx unsp low leg, 7thR"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/118x131.png/ff4444/ffffff",
            "duration": 6,
            "description": "Lac w/o fb of abd wall, left low q w/o penet perit cav, init"
          },
          {
            "contentTitle": "Loris tardigratus",
            "video": "http://dummyimage.com/233x142.png/ff4444/ffffff",
            "duration": 3,
            "description": "Malignant carcinoid tumors of the small intestine"
          },
          {
            "contentTitle": "Dasypus septemcincus",
            "video": "http://dummyimage.com/209x192.png/ff4444/ffffff",
            "duration": 8,
            "description": "Obstructed labor due to oth malposition and malpresent, unsp"
          },
          {
            "contentTitle": "Vulpes chama",
            "video": "http://dummyimage.com/110x219.png/dddddd/000000",
            "duration": 2,
            "description": "Unsp fx low end r tibia, 7thR"
          },
          {
            "contentTitle": "Aonyx capensis",
            "video": "http://dummyimage.com/237x212.png/cc0000/ffffff",
            "duration": 2,
            "description": "Other specified injuries of right lower leg, subs encntr"
          },
          {
            "contentTitle": "Laniarius ferrugineus",
            "video": "http://dummyimage.com/200x193.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Congenital malformation of eye, unspecified"
          },
          {
            "contentTitle": "Priodontes maximus",
            "video": "http://dummyimage.com/230x214.png/cc0000/ffffff",
            "duration": 4,
            "description": "Osteonecrosis due to drugs, hand and fingers"
          }
        ]
      },
      {
        "header": "Editor",
        "totalMinutes": 50617,
        "contents": [
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/239x231.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Oth diab with prolif diab rtnop without macular edema, l eye"
          },
          {
            "contentTitle": "Acrantophis madagascariensis",
            "video": "http://dummyimage.com/190x228.png/cc0000/ffffff",
            "duration": 1,
            "description": "Poisoning by hemostatic drug, undetermined"
          },
          {
            "contentTitle": "Coluber constrictor",
            "video": "http://dummyimage.com/139x193.png/dddddd/000000",
            "duration": 8,
            "description": "Autonomic neuropathy in diseases classified elsewhere"
          },
          {
            "contentTitle": "Larus fuliginosus",
            "video": "http://dummyimage.com/218x237.png/ff4444/ffffff",
            "duration": 8,
            "description": "Burn of unspecified degree of unspecified thigh, sequela"
          },
          {
            "contentTitle": "Petaurus breviceps",
            "video": "http://dummyimage.com/158x178.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Malignant neoplasm of left ovary"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/118x244.png/dddddd/000000",
            "duration": 3,
            "description": "Other fracture of upper end of unspecified tibia, sequela"
          }
        ]
      },
      {
        "header": "Dental Hygienist",
        "totalMinutes": 69089,
        "contents": [
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/245x131.png/dddddd/000000",
            "duration": 9,
            "description": "Gout due to renal impairment, right knee"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/108x138.png/dddddd/000000",
            "duration": 7,
            "description": "Local anesthetics"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/199x199.png/ff4444/ffffff",
            "duration": 2,
            "description": "Diabetes due to undrl cond w moderate nonprlf diabetic rtnop"
          },
          {
            "contentTitle": "Neophron percnopterus",
            "video": "http://dummyimage.com/130x132.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "West Nile virus infection"
          },
          {
            "contentTitle": "Crocuta crocuta",
            "video": "http://dummyimage.com/182x223.png/cc0000/ffffff",
            "duration": 7,
            "description": "Plasmodium falciparum malaria, unspecified"
          },
          {
            "contentTitle": "Spermophilus richardsonii",
            "video": "http://dummyimage.com/198x148.png/dddddd/000000",
            "duration": 6,
            "description": "Nondisp fx of anterior wall of right acetabulum, sequela"
          },
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/238x136.png/cc0000/ffffff",
            "duration": 10,
            "description": "Abrasion of forearm"
          }
        ]
      },
      {
        "header": "Financial Analyst",
        "totalMinutes": 65741,
        "contents": [
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/113x131.png/dddddd/000000",
            "duration": 1,
            "description": "Minor laceration of celiac artery, subsequent encounter"
          },
          {
            "contentTitle": "Taurotagus oryx",
            "video": "http://dummyimage.com/220x228.png/ff4444/ffffff",
            "duration": 2,
            "description": "Traum rupt of palmar ligmt of l little finger at MCP/IP jt"
          },
          {
            "contentTitle": "Spermophilus lateralis",
            "video": "http://dummyimage.com/221x203.png/dddddd/000000",
            "duration": 4,
            "description": "Malformation of placenta, unspecified, unspecified trimester"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/173x116.png/ff4444/ffffff",
            "duration": 1,
            "description": "Injury of cutan sensory nerve at forarm lv, unsp arm, subs"
          }
        ]
      },
      {
        "header": "Payment Adjustment Coordinator",
        "totalMinutes": 69701,
        "contents": [
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/105x172.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Hemiplga following oth nontraumatic intracranial hemorrhage"
          },
          {
            "contentTitle": "Zosterops pallidus",
            "video": "http://dummyimage.com/157x148.png/cc0000/ffffff",
            "duration": 6,
            "description": "Strain flxr musc/fasc/tend l little fngr at forarm lv, sqla"
          },
          {
            "contentTitle": "Helogale undulata",
            "video": "http://dummyimage.com/239x141.png/ff4444/ffffff",
            "duration": 7,
            "description": "Sltr-haris Type IV physeal fx lower end radius, unsp arm"
          },
          {
            "contentTitle": "Herpestes javanicus",
            "video": "http://dummyimage.com/208x158.png/cc0000/ffffff",
            "duration": 10,
            "description": "Open bite of right forearm, subsequent encounter"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/196x232.png/cc0000/ffffff",
            "duration": 4,
            "description": "Follicular lymphoma grade IIIb, lymph nodes mult site"
          },
          {
            "contentTitle": "Anhinga rufa",
            "video": "http://dummyimage.com/178x161.png/ff4444/ffffff",
            "duration": 7,
            "description": "Poisoning by oth drugs acting on muscles, accidental, subs"
          },
          {
            "contentTitle": "Bettongia penicillata",
            "video": "http://dummyimage.com/225x165.png/cc0000/ffffff",
            "duration": 6,
            "description": "Personal history of congenital malform of dgstv sys"
          },
          {
            "contentTitle": "Phalacrocorax niger",
            "video": "http://dummyimage.com/159x155.png/cc0000/ffffff",
            "duration": 7,
            "description": "Other stimulant dependence, in remission"
          },
          {
            "contentTitle": "Ovibos moschatus",
            "video": "http://dummyimage.com/142x210.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Other intervertebral disc degeneration, lumbar region"
          },
          {
            "contentTitle": "Corallus hortulanus cooki",
            "video": "http://dummyimage.com/169x193.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Burn of first degree of left shoulder"
          },
          {
            "contentTitle": "Anastomus oscitans",
            "video": "http://dummyimage.com/204x126.png/ff4444/ffffff",
            "duration": 2,
            "description": "Disp fx of olecran pro w intartic extn unsp ulna, 7thD"
          },
          {
            "contentTitle": "Larus novaehollandiae",
            "video": "http://dummyimage.com/136x244.png/cc0000/ffffff",
            "duration": 9,
            "description": "Poisoning by oth hormone antagonists, self-harm, subs"
          },
          {
            "contentTitle": "Odocoileus hemionus",
            "video": "http://dummyimage.com/234x206.png/cc0000/ffffff",
            "duration": 9,
            "description": "Nondisp intertroch fx r femr, 7thQ"
          },
          {
            "contentTitle": "Myrmecobius fasciatus",
            "video": "http://dummyimage.com/195x151.png/cc0000/ffffff",
            "duration": 4,
            "description": "Unspecified fracture of left wrist and hand"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/104x163.png/dddddd/000000",
            "duration": 4,
            "description": "Burn 1st deg mult sites of r shldr/up lmb, ex wrs/hnd, init"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/118x170.png/dddddd/000000",
            "duration": 7,
            "description": "Chondrolysis, unspecified hip"
          }
        ]
      },
      {
        "header": "Senior Cost Accountant",
        "totalMinutes": 75554,
        "contents": [
          {
            "contentTitle": "Callipepla gambelii",
            "video": "http://dummyimage.com/243x107.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Nondisp fx of base of nk of r femr, 7thE"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/138x160.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Toxic effect of cobra venom, accidental, sequela"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/141x216.png/ff4444/ffffff",
            "duration": 5,
            "description": "Perforation of intestine (nontraumatic)"
          },
          {
            "contentTitle": "Haliaetus leucogaster",
            "video": "http://dummyimage.com/226x107.png/dddddd/000000",
            "duration": 6,
            "description": "Myositis ossificans traumatica, right ankle and foot"
          },
          {
            "contentTitle": "Ceratotherium simum",
            "video": "http://dummyimage.com/220x108.png/cc0000/ffffff",
            "duration": 9,
            "description": "Nondisp fx of prox phalanx of l thm, 7thG"
          },
          {
            "contentTitle": "Felis caracal",
            "video": "http://dummyimage.com/135x189.png/ff4444/ffffff",
            "duration": 4,
            "description": "Other interstitial  lung diseases of childhood"
          },
          {
            "contentTitle": "Crocodylus niloticus",
            "video": "http://dummyimage.com/176x124.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Burn of unspecified degree of left lower leg, sequela"
          },
          {
            "contentTitle": "Coendou prehensilis",
            "video": "http://dummyimage.com/231x238.png/cc0000/ffffff",
            "duration": 10,
            "description": "Toxic effect of cadmium and its compnd, self-harm, sequela"
          }
        ]
      },
      {
        "header": "Civil Engineer",
        "totalMinutes": 68884,
        "contents": [
          {
            "contentTitle": "Haliaeetus leucoryphus",
            "video": "http://dummyimage.com/184x102.png/ff4444/ffffff",
            "duration": 1,
            "description": "Supervision of young multigravida"
          },
          {
            "contentTitle": "Haliaetus leucogaster",
            "video": "http://dummyimage.com/238x248.png/cc0000/ffffff",
            "duration": 2,
            "description": "Path fracture, right radius, subs for fx w delay heal"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/115x121.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Unsp injury of left shoulder and upper arm, init encntr"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/241x223.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Athscl native arteries of extrm w gangrene, bilateral legs"
          },
          {
            "contentTitle": "Crotalus triseriatus",
            "video": "http://dummyimage.com/243x173.png/cc0000/ffffff",
            "duration": 6,
            "description": "Unspecified child maltreatment, suspected, initial encounter"
          },
          {
            "contentTitle": "Otocyon megalotis",
            "video": "http://dummyimage.com/240x181.png/cc0000/ffffff",
            "duration": 3,
            "description": "Prsn brd/alit from bus injured in collision w pedl cyc, subs"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/163x157.png/ff4444/ffffff",
            "duration": 3,
            "description": "Carbuncle of chest wall"
          },
          {
            "contentTitle": "Corvus brachyrhynchos",
            "video": "http://dummyimage.com/246x172.png/cc0000/ffffff",
            "duration": 4,
            "description": "Bitten by squirrel"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/126x188.png/cc0000/ffffff",
            "duration": 3,
            "description": "Encounter for dental exam and cleaning w/o abnormal findings"
          }
        ]
      }
    ]
  },
  {
    "title": "Kiss, The",
    "subject": "Research and Development",
    "instructorName": "Rodin Salem",
    "price": 2475.71,
    "level": "Intermediate",
    "courseHours": 125,
    "summary": "Corrosions of unspecified ear drum, subsequent encounter",
    "subtitles": [
      {
        "header": "Technical Writer",
        "totalMinutes": 91928,
        "contents": [
          {
            "contentTitle": "Eumetopias jubatus",
            "video": "http://dummyimage.com/184x122.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Corrosion of second degree of left ear, subsequent encounter"
          },
          {
            "contentTitle": "Nasua nasua",
            "video": "http://dummyimage.com/105x114.png/ff4444/ffffff",
            "duration": 8,
            "description": "Strain musc/tend ant grp at low leg level, right leg, init"
          },
          {
            "contentTitle": "Cercopithecus aethiops",
            "video": "http://dummyimage.com/166x174.png/cc0000/ffffff",
            "duration": 6,
            "description": "Burn first degree of unsp mult fingers (nail), not inc thumb"
          },
          {
            "contentTitle": "Potamochoerus porcus",
            "video": "http://dummyimage.com/143x125.png/dddddd/000000",
            "duration": 3,
            "description": "Displaced fracture of cuboid bone of left foot, sequela"
          },
          {
            "contentTitle": "Marmota caligata",
            "video": "http://dummyimage.com/232x162.png/dddddd/000000",
            "duration": 1,
            "description": "Nondisp bicondylar fx l tibia, 7thQ"
          },
          {
            "contentTitle": "Actophilornis africanus",
            "video": "http://dummyimage.com/237x246.png/dddddd/000000",
            "duration": 7,
            "description": "Burn of first degree of left lower leg"
          },
          {
            "contentTitle": "Fratercula corniculata",
            "video": "http://dummyimage.com/187x129.png/cc0000/ffffff",
            "duration": 7,
            "description": "Subluxation of unsp interphalangeal joint of other finger"
          },
          {
            "contentTitle": "Odocoileus hemionus",
            "video": "http://dummyimage.com/192x193.png/ff4444/ffffff",
            "duration": 3,
            "description": "Primary blast injury of transverse colon, initial encounter"
          },
          {
            "contentTitle": "Spermophilus lateralis",
            "video": "http://dummyimage.com/121x235.png/ff4444/ffffff",
            "duration": 5,
            "description": "Acquired absence of left upper limb, unspecified level"
          },
          {
            "contentTitle": "Pycnonotus nigricans",
            "video": "http://dummyimage.com/141x101.png/dddddd/000000",
            "duration": 6,
            "description": "First degree hemorrhoids"
          },
          {
            "contentTitle": "Equus hemionus",
            "video": "http://dummyimage.com/238x243.png/ff4444/ffffff",
            "duration": 10,
            "description": "Cannabis (derivatives)"
          },
          {
            "contentTitle": "Uraeginthus granatina",
            "video": "http://dummyimage.com/111x137.png/dddddd/000000",
            "duration": 8,
            "description": "Occup of bus injured in collision w rail trn/veh in traf"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/158x240.png/dddddd/000000",
            "duration": 1,
            "description": "Occ of anml-drn vehicle injured in clsn w pedl cyc, sequela"
          },
          {
            "contentTitle": "Alouatta seniculus",
            "video": "http://dummyimage.com/205x237.png/dddddd/000000",
            "duration": 4,
            "description": "Posterior dislocation of l acromioclav jt, sequela"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/104x146.png/dddddd/000000",
            "duration": 8,
            "description": "Laceration of musc/fasc/tend prt biceps, left arm"
          },
          {
            "contentTitle": "Varanus albigularis",
            "video": "http://dummyimage.com/127x229.png/ff4444/ffffff",
            "duration": 4,
            "description": "Traum subrac hem w LOC of 6 hours to 24 hours"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/218x117.png/cc0000/ffffff",
            "duration": 3,
            "description": "Nondisp fx of 3rd metatarsal bone, r ft, 7thP"
          },
          {
            "contentTitle": "Eremophila alpestris",
            "video": "http://dummyimage.com/131x157.png/dddddd/000000",
            "duration": 6,
            "description": "Occupant specl indust veh injured in transport accident"
          },
          {
            "contentTitle": "Ramphastos tucanus",
            "video": "http://dummyimage.com/229x113.png/ff4444/ffffff",
            "duration": 10,
            "description": "Stem cells transplant status"
          }
        ]
      },
      {
        "header": "Recruiting Manager",
        "totalMinutes": 80745,
        "contents": [
          {
            "contentTitle": "Genetta genetta",
            "video": "http://dummyimage.com/124x190.png/cc0000/ffffff",
            "duration": 6,
            "description": "Incomplete lesion of L4 level of lumbar spinal cord"
          },
          {
            "contentTitle": "Antidorcas marsupialis",
            "video": "http://dummyimage.com/199x238.png/dddddd/000000",
            "duration": 6,
            "description": "Panic disorder without agoraphobia"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/128x240.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Blister (nonthermal) of knee"
          },
          {
            "contentTitle": "Macaca radiata",
            "video": "http://dummyimage.com/143x179.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Penetrating wound with foreign body of eyeball"
          },
          {
            "contentTitle": "Dacelo novaeguineae",
            "video": "http://dummyimage.com/147x237.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Burn of first degree of right wrist, initial encounter"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/163x104.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Prsn brd/alit a 3-whl mv inj pick-up truck, pk-up/van, init"
          },
          {
            "contentTitle": "Ara chloroptera",
            "video": "http://dummyimage.com/156x134.png/dddddd/000000",
            "duration": 6,
            "description": "Pnctr of abd wl w fb, periumb rgn w/o penet perit cav, subs"
          },
          {
            "contentTitle": "Alcelaphus buselaphus cokii",
            "video": "http://dummyimage.com/242x178.png/ff4444/ffffff",
            "duration": 9,
            "description": "Medial dislocation of right ulnohumeral joint, subs encntr"
          }
        ]
      },
      {
        "header": "GIS Technical Architect",
        "totalMinutes": 41076,
        "contents": [
          {
            "contentTitle": "Corvus brachyrhynchos",
            "video": "http://dummyimage.com/238x215.png/dddddd/000000",
            "duration": 4,
            "description": "Burn of first degree of left foot, sequela"
          },
          {
            "contentTitle": "Dasyurus maculatus",
            "video": "http://dummyimage.com/195x101.png/dddddd/000000",
            "duration": 5,
            "description": "Displaced transverse fx unsp acetab, subs for fx w nonunion"
          },
          {
            "contentTitle": "Lycaon pictus",
            "video": "http://dummyimage.com/225x222.png/dddddd/000000",
            "duration": 6,
            "description": "Pre-existing type 2 diabetes mellitus, in childbirth"
          },
          {
            "contentTitle": "Spheniscus mendiculus",
            "video": "http://dummyimage.com/188x240.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Superficial frostbite of toe(s)"
          },
          {
            "contentTitle": "Boa caninus",
            "video": "http://dummyimage.com/131x154.png/cc0000/ffffff",
            "duration": 4,
            "description": "Injury of other nerves at forarm lv, unspecified arm, subs"
          }
        ]
      },
      {
        "header": "Nuclear Power Engineer",
        "totalMinutes": 63340,
        "contents": [
          {
            "contentTitle": "Spermophilus richardsonii",
            "video": "http://dummyimage.com/138x103.png/cc0000/ffffff",
            "duration": 2,
            "description": "Displ bicondylar fx unsp tibia, 7thN"
          },
          {
            "contentTitle": "Epicrates cenchria maurus",
            "video": "http://dummyimage.com/236x238.png/dddddd/000000",
            "duration": 8,
            "description": "Unsp injury of radial artery at wrs/hnd lv of left arm"
          },
          {
            "contentTitle": "Microcebus murinus",
            "video": "http://dummyimage.com/166x108.png/ff4444/ffffff",
            "duration": 9,
            "description": "Nondisp fx of med phalanx of unsp fngr, 7thD"
          },
          {
            "contentTitle": "Terathopius ecaudatus",
            "video": "http://dummyimage.com/134x250.png/cc0000/ffffff",
            "duration": 2,
            "description": "Nondisp fx of greater trochanter of l femr, 7thR"
          },
          {
            "contentTitle": "Dolichitus patagonum",
            "video": "http://dummyimage.com/214x134.png/cc0000/ffffff",
            "duration": 8,
            "description": "Milt op involving unintent restriction of air/airwy, milt"
          },
          {
            "contentTitle": "Philetairus socius",
            "video": "http://dummyimage.com/228x248.png/dddddd/000000",
            "duration": 6,
            "description": "Nondisp simp suprcndl fx w/o intrcndl fx unsp humer, 7thG"
          }
        ]
      },
      {
        "header": "Sales Representative",
        "totalMinutes": 36598,
        "contents": [
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/235x182.png/ff4444/ffffff",
            "duration": 5,
            "description": "Unsp physeal fx upper end of l femur, subs for fx w nonunion"
          },
          {
            "contentTitle": "Procyon cancrivorus",
            "video": "http://dummyimage.com/192x141.png/ff4444/ffffff",
            "duration": 1,
            "description": "Other specified rheumatoid arthritis, left wrist"
          },
          {
            "contentTitle": "Francolinus swainsonii",
            "video": "http://dummyimage.com/184x113.png/dddddd/000000",
            "duration": 10,
            "description": "Subluxation of unsp interphalangeal joint of l mid finger"
          },
          {
            "contentTitle": "Podargus strigoides",
            "video": "http://dummyimage.com/232x249.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other vitreous opacities, bilateral"
          },
          {
            "contentTitle": "Plegadis falcinellus",
            "video": "http://dummyimage.com/118x145.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Other infective (teno)synovitis, right shoulder"
          },
          {
            "contentTitle": "Gekko gecko",
            "video": "http://dummyimage.com/205x111.png/ff4444/ffffff",
            "duration": 3,
            "description": "Periprosthetic osteolysis of internal prosthetic joint"
          },
          {
            "contentTitle": "Sula dactylatra",
            "video": "http://dummyimage.com/201x180.png/ff4444/ffffff",
            "duration": 8,
            "description": "Blister (nonthermal) of unspecified upper arm, sequela"
          },
          {
            "contentTitle": "Lutra canadensis",
            "video": "http://dummyimage.com/221x183.png/dddddd/000000",
            "duration": 1,
            "description": "Corrosion of second degree of right axilla, sequela"
          },
          {
            "contentTitle": "Estrilda erythronotos",
            "video": "http://dummyimage.com/154x239.png/cc0000/ffffff",
            "duration": 1,
            "description": "Open wound of lower leg"
          },
          {
            "contentTitle": "Bradypus tridactylus",
            "video": "http://dummyimage.com/204x236.png/dddddd/000000",
            "duration": 6,
            "description": "Mucosal cyst of postmastoidectomy cavity, unspecified ear"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/245x227.png/cc0000/ffffff",
            "duration": 3,
            "description": "War op w dest arcrft due to clsn w oth aircraft, milt"
          },
          {
            "contentTitle": "Phoenicopterus chilensis",
            "video": "http://dummyimage.com/179x173.png/dddddd/000000",
            "duration": 9,
            "description": "Nondisp Maisonneuve's fx l leg, 7thD"
          },
          {
            "contentTitle": "Tayassu pecari",
            "video": "http://dummyimage.com/141x124.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Fatigue fx vertebra, lumbar region, subs for fx w delay heal"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/202x201.png/dddddd/000000",
            "duration": 10,
            "description": "Gout due to renal impairment, ankle and foot"
          },
          {
            "contentTitle": "Phoeniconaias minor",
            "video": "http://dummyimage.com/208x217.png/ff4444/ffffff",
            "duration": 5,
            "description": "Drown due to oth accident to canoe or kayak, subs"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/228x240.png/ff4444/ffffff",
            "duration": 6,
            "description": "Family history of disorders of kidney and ureter"
          },
          {
            "contentTitle": "Limosa haemastica",
            "video": "http://dummyimage.com/104x101.png/dddddd/000000",
            "duration": 10,
            "description": "Activity, piano playing"
          },
          {
            "contentTitle": "Ursus americanus",
            "video": "http://dummyimage.com/125x216.png/ff4444/ffffff",
            "duration": 10,
            "description": "Monocular exotropia with V pattern"
          }
        ]
      },
      {
        "header": "Office Assistant IV",
        "totalMinutes": 77594,
        "contents": [
          {
            "contentTitle": "Tachybaptus ruficollis",
            "video": "http://dummyimage.com/103x108.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Nondisp avuls fx tuberosity of unsp calcaneus, 7thG"
          },
          {
            "contentTitle": "Aonyx capensis",
            "video": "http://dummyimage.com/142x174.png/dddddd/000000",
            "duration": 8,
            "description": "Nondisp oblique fx shaft of r ulna, 7thG"
          },
          {
            "contentTitle": "Spheniscus mendiculus",
            "video": "http://dummyimage.com/169x176.png/cc0000/ffffff",
            "duration": 4,
            "description": "Drown d/t being thrown ovrbrd by motion of pasngr ship, init"
          },
          {
            "contentTitle": "Phalaropus lobatus",
            "video": "http://dummyimage.com/108x232.png/cc0000/ffffff",
            "duration": 1,
            "description": "Corrosion of cornea and conjunctival sac, unspecified eye"
          },
          {
            "contentTitle": "Anas bahamensis",
            "video": "http://dummyimage.com/165x160.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Disp fx of distal phalanx of right little finger, sequela"
          },
          {
            "contentTitle": "Laniaurius atrococcineus",
            "video": "http://dummyimage.com/198x217.png/ff4444/ffffff",
            "duration": 5,
            "description": "NIHSS score 38"
          },
          {
            "contentTitle": "Ploceus rubiginosus",
            "video": "http://dummyimage.com/247x183.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Congenital night blindness"
          },
          {
            "contentTitle": "Phascogale calura",
            "video": "http://dummyimage.com/173x136.png/dddddd/000000",
            "duration": 5,
            "description": "Athscl nonbiol bypass of the extrm w rest pain, bi legs"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/130x149.png/ff4444/ffffff",
            "duration": 10,
            "description": "Subluxation of MCP joint of left middle finger, sequela"
          },
          {
            "contentTitle": "Francolinus coqui",
            "video": "http://dummyimage.com/192x195.png/ff4444/ffffff",
            "duration": 3,
            "description": "Monoplg upr lmb fol oth cerebvasc disease aff left dom side"
          },
          {
            "contentTitle": "Paradoxurus hermaphroditus",
            "video": "http://dummyimage.com/238x129.png/dddddd/000000",
            "duration": 6,
            "description": "Breakdown (mechanical) of infusion catheter, subs encntr"
          },
          {
            "contentTitle": "Mirounga leonina",
            "video": "http://dummyimage.com/233x225.png/cc0000/ffffff",
            "duration": 6,
            "description": "Pedl cyc driver injured in clsn w oth mv in traf, sequela"
          },
          {
            "contentTitle": "Meleagris gallopavo",
            "video": "http://dummyimage.com/243x238.png/ff4444/ffffff",
            "duration": 2,
            "description": "Matern care for disproprtn d/t outlet contrctn of pelv, unsp"
          }
        ]
      },
      {
        "header": "Structural Engineer",
        "totalMinutes": 87890,
        "contents": [
          {
            "contentTitle": "Hippotragus equinus",
            "video": "http://dummyimage.com/100x219.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Other injury due to other accident to sailboat, subs encntr"
          },
          {
            "contentTitle": "Phasianus colchicus",
            "video": "http://dummyimage.com/229x188.png/dddddd/000000",
            "duration": 8,
            "description": "Unspecified injury of peroneal artery, right leg"
          },
          {
            "contentTitle": "Gekko gecko",
            "video": "http://dummyimage.com/205x161.png/dddddd/000000",
            "duration": 4,
            "description": "Chronic venous htn w inflammation of bilateral low extrm"
          },
          {
            "contentTitle": "Canis lupus lycaon",
            "video": "http://dummyimage.com/159x173.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Unsp opn wnd unsp bk wl of thorax w penet thor cavity, sqla"
          },
          {
            "contentTitle": "Vanellus armatus",
            "video": "http://dummyimage.com/169x105.png/dddddd/000000",
            "duration": 7,
            "description": "Idiopathic aseptic necrosis of right shoulder"
          },
          {
            "contentTitle": "Megaderma spasma",
            "video": "http://dummyimage.com/225x198.png/cc0000/ffffff",
            "duration": 10,
            "description": "Unsp fx shaft of r tibia, 7thE"
          },
          {
            "contentTitle": "Hymenolaimus malacorhynchus",
            "video": "http://dummyimage.com/197x101.png/cc0000/ffffff",
            "duration": 10,
            "description": "Cerebral infrc due to unsp occls or stenosis of bi post art"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/213x200.png/cc0000/ffffff",
            "duration": 4,
            "description": "Congenital malformation of retina"
          },
          {
            "contentTitle": "Ara chloroptera",
            "video": "http://dummyimage.com/179x110.png/dddddd/000000",
            "duration": 4,
            "description": "Other acute osteomyelitis, left humerus"
          },
          {
            "contentTitle": "Felis rufus",
            "video": "http://dummyimage.com/100x181.png/cc0000/ffffff",
            "duration": 8,
            "description": "Fx unsp part of body of mandible, unspecified side, sequela"
          },
          {
            "contentTitle": "Oryx gazella",
            "video": "http://dummyimage.com/221x106.png/dddddd/000000",
            "duration": 10,
            "description": "Superficial mycosis, unspecified"
          }
        ]
      },
      {
        "header": "Budget/Accounting Analyst I",
        "totalMinutes": 22883,
        "contents": [
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/109x229.png/cc0000/ffffff",
            "duration": 10,
            "description": "Other bilateral secondary osteoarthritis of hip"
          },
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/187x160.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Age-rel osteopor w crnt path fx, r humer, 7thK"
          },
          {
            "contentTitle": "Bubulcus ibis",
            "video": "http://dummyimage.com/220x216.png/cc0000/ffffff",
            "duration": 5,
            "description": "Corrosion of second degree of left ankle and foot, subs"
          },
          {
            "contentTitle": "Buteo regalis",
            "video": "http://dummyimage.com/163x168.png/dddddd/000000",
            "duration": 10,
            "description": "Poisoning by thrombolytic drug, intentional self-harm, init"
          },
          {
            "contentTitle": "Castor canadensis",
            "video": "http://dummyimage.com/168x175.png/cc0000/ffffff",
            "duration": 5,
            "description": "Edema of right orbit"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/183x127.png/ff4444/ffffff",
            "duration": 6,
            "description": "Corrosion of right eyelid and periocular area, subs encntr"
          },
          {
            "contentTitle": "Pterocles gutturalis",
            "video": "http://dummyimage.com/246x233.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Polydactyly, unspecified"
          }
        ]
      },
      {
        "header": "Internal Auditor",
        "totalMinutes": 91313,
        "contents": [
          {
            "contentTitle": "Ephippiorhynchus mycteria",
            "video": "http://dummyimage.com/104x235.png/dddddd/000000",
            "duration": 5,
            "description": "Anterior cord syndrome at C1, subs"
          },
          {
            "contentTitle": "Cygnus buccinator",
            "video": "http://dummyimage.com/163x115.png/ff4444/ffffff",
            "duration": 6,
            "description": "Osteitis deformans in neoplastic diseases, unspecified thigh"
          },
          {
            "contentTitle": "Aepyceros mylampus",
            "video": "http://dummyimage.com/248x215.png/cc0000/ffffff",
            "duration": 1,
            "description": "Strain extn/abdr musc/fasc/tend of r thm at forarm lv, sqla"
          },
          {
            "contentTitle": "Ara chloroptera",
            "video": "http://dummyimage.com/161x122.png/cc0000/ffffff",
            "duration": 8,
            "description": "Thrombosis due to internal orthopedic prosth dev/grft"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/240x131.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Gestational diabetes in the puerperium, unsp control"
          },
          {
            "contentTitle": "Cordylus giganteus",
            "video": "http://dummyimage.com/200x107.png/cc0000/ffffff",
            "duration": 2,
            "description": "Unspecified disorder of iris and ciliary body"
          },
          {
            "contentTitle": "Petaurus norfolcensis",
            "video": "http://dummyimage.com/213x148.png/ff4444/ffffff",
            "duration": 1,
            "description": "Embolism due to nervous system prosth dev/grft, sequela"
          },
          {
            "contentTitle": "Thamnolaea cinnmomeiventris",
            "video": "http://dummyimage.com/242x135.png/cc0000/ffffff",
            "duration": 3,
            "description": "Unsp fx upr end unsp rad, 7thE"
          }
        ]
      }
    ]
  },
  {
    "title": "Seed",
    "subject": "Product Management",
    "instructorName": "Rodin Salem",
    "price": 2217.22,
    "level": "AllLevels",
    "courseHours": 138,
    "summary": "Sltr-haris Type II physl fx low end r fibula, 7thK",
    "subtitles": [
      {
        "header": "Desktop Support Technician",
        "totalMinutes": 20141,
        "contents": [
          {
            "contentTitle": "Felis libyca",
            "video": "http://dummyimage.com/100x238.png/dddddd/000000",
            "duration": 8,
            "description": "Poisoning by, adverse effect of and underdosing of methadone"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/150x142.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Single live birth"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/149x126.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Oth fx lower end of l femur, subs for clos fx w routn heal"
          },
          {
            "contentTitle": "Tiliqua scincoides",
            "video": "http://dummyimage.com/155x117.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Burn third degree of unsp mult fngr, not inc thumb, sqla"
          },
          {
            "contentTitle": "Meleagris gallopavo",
            "video": "http://dummyimage.com/160x103.png/ff4444/ffffff",
            "duration": 2,
            "description": "Limitation of activities due to disability"
          },
          {
            "contentTitle": "Mazama americana",
            "video": "http://dummyimage.com/189x148.png/dddddd/000000",
            "duration": 1,
            "description": "Late congenital syphilitic oculopathy"
          },
          {
            "contentTitle": "Macropus fuliginosus",
            "video": "http://dummyimage.com/189x208.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Displ seg fx shaft of l tibia, subs for clos fx w nonunion"
          },
          {
            "contentTitle": "Macropus eugenii",
            "video": "http://dummyimage.com/218x163.png/dddddd/000000",
            "duration": 2,
            "description": "Corrosion of second degree of male genital region, sequela"
          },
          {
            "contentTitle": "Cracticus nigroagularis",
            "video": "http://dummyimage.com/100x167.png/ff4444/ffffff",
            "duration": 10,
            "description": "Disp fx of unsp radial styloid pro, 7thP"
          },
          {
            "contentTitle": "Pytilia melba",
            "video": "http://dummyimage.com/228x174.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Displ trimalleol fx l low leg, 7thH"
          },
          {
            "contentTitle": "Nannopterum harrisi",
            "video": "http://dummyimage.com/121x239.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Nondisp apophyseal fx unsp femr, 7thF"
          },
          {
            "contentTitle": "Globicephala melas",
            "video": "http://dummyimage.com/120x132.png/dddddd/000000",
            "duration": 5,
            "description": "Unsp physeal fracture of lower end of radius, right arm"
          },
          {
            "contentTitle": "Geococcyx californianus",
            "video": "http://dummyimage.com/108x185.png/ff4444/ffffff",
            "duration": 7,
            "description": "Torus fx lower end of left ulna, subs for fx w nonunion"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/228x126.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Hallucinogen dependence w psychotic disorder, unsp"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/181x131.png/ff4444/ffffff",
            "duration": 8,
            "description": "War op involving fragments from munitions, milt, sequela"
          },
          {
            "contentTitle": "Neotis denhami",
            "video": "http://dummyimage.com/208x168.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Open bite of left middle finger without damage to nail"
          },
          {
            "contentTitle": "Rhea americana",
            "video": "http://dummyimage.com/236x187.png/ff4444/ffffff",
            "duration": 5,
            "description": "Displ avuls fx (chip fracture) of l talus, 7thG"
          },
          {
            "contentTitle": "Lemur fulvus",
            "video": "http://dummyimage.com/155x139.png/ff4444/ffffff",
            "duration": 1,
            "description": "Conductive hear loss, uni, with restricted hear cntra side"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/182x237.png/cc0000/ffffff",
            "duration": 10,
            "description": "Smoking (tobacco) complicating pregnancy, first trimester"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/190x194.png/dddddd/000000",
            "duration": 6,
            "description": "Nondisp fx of lateral condyle of right femur, sequela"
          }
        ]
      },
      {
        "header": "Account Coordinator",
        "totalMinutes": 56112,
        "contents": [
          {
            "contentTitle": "Orcinus orca",
            "video": "http://dummyimage.com/221x149.png/cc0000/ffffff",
            "duration": 7,
            "description": "Other superficial bite of vagina and vulva"
          },
          {
            "contentTitle": "Tenrec ecaudatus",
            "video": "http://dummyimage.com/162x165.png/cc0000/ffffff",
            "duration": 2,
            "description": "Drug/chem diabetes w neurological comp w diabetic polyneurop"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/216x106.png/ff4444/ffffff",
            "duration": 9,
            "description": "Nondisp fx of prox phalanx of r mid fngr, 7thG"
          },
          {
            "contentTitle": "Bos mutus",
            "video": "http://dummyimage.com/230x231.png/cc0000/ffffff",
            "duration": 7,
            "description": "Rupture of synovium, left elbow"
          },
          {
            "contentTitle": "Ovis musimon",
            "video": "http://dummyimage.com/243x250.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Macula scars of posterior pole (post-traumatic), bilateral"
          },
          {
            "contentTitle": "Thamnolaea cinnmomeiventris",
            "video": "http://dummyimage.com/124x146.png/ff4444/ffffff",
            "duration": 4,
            "description": "Other shoulder lesions, unspecified shoulder"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/244x106.png/dddddd/000000",
            "duration": 10,
            "description": "Chronic pharyngitis"
          },
          {
            "contentTitle": "Turtur chalcospilos",
            "video": "http://dummyimage.com/161x127.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Triplet preg w two or more monochorionic fetuses, unsp tri"
          },
          {
            "contentTitle": "Eubalaena australis",
            "video": "http://dummyimage.com/171x193.png/dddddd/000000",
            "duration": 4,
            "description": "Oth fx shaft of unsp tibia, init for opn fx type I/2"
          },
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/129x134.png/ff4444/ffffff",
            "duration": 7,
            "description": "Poisoning by emollients, demulcents and protect, undet, subs"
          },
          {
            "contentTitle": "Tenrec ecaudatus",
            "video": "http://dummyimage.com/155x173.png/cc0000/ffffff",
            "duration": 6,
            "description": "Complete traum amp of unsp hip and thigh, level unsp, init"
          },
          {
            "contentTitle": "Recurvirostra avosetta",
            "video": "http://dummyimage.com/244x155.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Tox eff of nitro & oth nitric acids and esters, undet, subs"
          },
          {
            "contentTitle": "Odocoileus hemionus",
            "video": "http://dummyimage.com/103x226.png/dddddd/000000",
            "duration": 3,
            "description": "Nondisp commnt fx shaft of l femr, 7thN"
          },
          {
            "contentTitle": "Phoca vitulina",
            "video": "http://dummyimage.com/181x135.png/ff4444/ffffff",
            "duration": 1,
            "description": "Disp fx of head of r rad, 7thN"
          },
          {
            "contentTitle": "Alopex lagopus",
            "video": "http://dummyimage.com/231x147.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Non-pressure chronic ulcer of unsp thigh w fat layer exposed"
          }
        ]
      },
      {
        "header": "Clinical Specialist",
        "totalMinutes": 29938,
        "contents": [
          {
            "contentTitle": "Ictonyx striatus",
            "video": "http://dummyimage.com/229x246.png/dddddd/000000",
            "duration": 5,
            "description": "Bipolar disorder, current episode manic w/o psych features"
          },
          {
            "contentTitle": "Junonia genoveua",
            "video": "http://dummyimage.com/152x142.png/dddddd/000000",
            "duration": 3,
            "description": "Laceration of superior mesenteric vein"
          },
          {
            "contentTitle": "Haliaetus leucogaster",
            "video": "http://dummyimage.com/249x196.png/cc0000/ffffff",
            "duration": 3,
            "description": "Crohn's disease, unspecified, with fistula"
          },
          {
            "contentTitle": "Corvus albus",
            "video": "http://dummyimage.com/148x241.png/dddddd/000000",
            "duration": 10,
            "description": "Inj unsp blood vess at abd, low back and pelvis level, init"
          },
          {
            "contentTitle": "Nasua narica",
            "video": "http://dummyimage.com/106x120.png/ff4444/ffffff",
            "duration": 9,
            "description": "Complications associated with artificial fertilization"
          },
          {
            "contentTitle": "Ammospermophilus nelsoni",
            "video": "http://dummyimage.com/137x101.png/ff4444/ffffff",
            "duration": 10,
            "description": "Other superficial bite of unspecified knee, init encntr"
          }
        ]
      },
      {
        "header": "Automation Specialist III",
        "totalMinutes": 23739,
        "contents": [
          {
            "contentTitle": "Drymarchon corias couperi",
            "video": "http://dummyimage.com/157x189.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Chronic postrheumatic arthropathy [Jaccoud], right wrist"
          },
          {
            "contentTitle": "Phalaropus lobatus",
            "video": "http://dummyimage.com/188x209.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Nondisplaced fracture of medial phalanx of left ring finger"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/103x222.png/ff4444/ffffff",
            "duration": 3,
            "description": "Open bite of right little finger without damage to nail"
          },
          {
            "contentTitle": "Thylogale stigmatica",
            "video": "http://dummyimage.com/164x184.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Nicotine dependence, cigarettes, w oth disorders"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/159x150.png/dddddd/000000",
            "duration": 9,
            "description": "Adhes due to fb acc left in body fol infusn/transfusn, sqla"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/177x156.png/cc0000/ffffff",
            "duration": 10,
            "description": "Unsp opn wnd abd wall, r upper q w/o penet perit cav, subs"
          },
          {
            "contentTitle": "Crotalus cerastes",
            "video": "http://dummyimage.com/226x107.png/cc0000/ffffff",
            "duration": 6,
            "description": "Adverse effect of tetracyclines, subsequent encounter"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/230x159.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Frostbite w tissue necros right knee and lower leg, subs"
          },
          {
            "contentTitle": "Lamprotornis chalybaeus",
            "video": "http://dummyimage.com/240x159.png/cc0000/ffffff",
            "duration": 2,
            "description": "Greenstick fracture of shaft of radius"
          },
          {
            "contentTitle": "Oxybelis fulgidus",
            "video": "http://dummyimage.com/243x188.png/ff4444/ffffff",
            "duration": 5,
            "description": "Path fracture, unsp finger(s), subs for fx w nonunion"
          },
          {
            "contentTitle": "Raphicerus campestris",
            "video": "http://dummyimage.com/208x133.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Other specified disorders of tendon, left knee"
          },
          {
            "contentTitle": "Parus atricapillus",
            "video": "http://dummyimage.com/120x217.png/dddddd/000000",
            "duration": 3,
            "description": "Cont preg aft elctv fetl rdct of one fts or more, first tri"
          }
        ]
      },
      {
        "header": "Nuclear Power Engineer",
        "totalMinutes": 70097,
        "contents": [
          {
            "contentTitle": "Hystrix indica",
            "video": "http://dummyimage.com/221x167.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Toxic eff of venom of African and Asian snake, asslt, init"
          },
          {
            "contentTitle": "Macropus robustus",
            "video": "http://dummyimage.com/139x225.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Encounter for exam for admission to educational institution"
          },
          {
            "contentTitle": "Laniaurius atrococcineus",
            "video": "http://dummyimage.com/165x241.png/ff4444/ffffff",
            "duration": 10,
            "description": "Acquired clawfoot, left foot"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/199x166.png/dddddd/000000",
            "duration": 5,
            "description": "Displaced transverse fracture of shaft of right femur"
          },
          {
            "contentTitle": "Macropus giganteus",
            "video": "http://dummyimage.com/105x150.png/cc0000/ffffff",
            "duration": 10,
            "description": "Oth fracture of left lesser toe(s), subs for fx w delay heal"
          },
          {
            "contentTitle": "Phoca vitulina",
            "video": "http://dummyimage.com/215x154.png/ff4444/ffffff",
            "duration": 7,
            "description": "Displ oblique fx shaft of r ulna, 7thG"
          },
          {
            "contentTitle": "Aepyceros mylampus",
            "video": "http://dummyimage.com/203x134.png/dddddd/000000",
            "duration": 3,
            "description": "Displ oblique fx shaft of r femur, init for opn fx type I/2"
          },
          {
            "contentTitle": "Sus scrofa",
            "video": "http://dummyimage.com/168x121.png/dddddd/000000",
            "duration": 7,
            "description": "Complete traumatic MCP amputation of unsp finger, init"
          }
        ]
      },
      {
        "header": "Marketing Assistant",
        "totalMinutes": 55851,
        "contents": [
          {
            "contentTitle": "Halcyon smyrnesis",
            "video": "http://dummyimage.com/201x181.png/cc0000/ffffff",
            "duration": 8,
            "description": "Colic"
          },
          {
            "contentTitle": "Nectarinia chalybea",
            "video": "http://dummyimage.com/101x200.png/dddddd/000000",
            "duration": 8,
            "description": "Fx unsp phalanx of right thumb, subs for fx w delay heal"
          },
          {
            "contentTitle": "Ardea cinerea",
            "video": "http://dummyimage.com/243x104.png/dddddd/000000",
            "duration": 6,
            "description": "Congenital deformities of feet"
          },
          {
            "contentTitle": "Spermophilus tridecemlineatus",
            "video": "http://dummyimage.com/143x134.png/cc0000/ffffff",
            "duration": 3,
            "description": "Deformity of unspecified orbit due to trauma or surgery"
          },
          {
            "contentTitle": "Corvus albicollis",
            "video": "http://dummyimage.com/189x226.png/cc0000/ffffff",
            "duration": 5,
            "description": "Puncture wound w/o foreign body of right shoulder, subs"
          },
          {
            "contentTitle": "Terrapene carolina",
            "video": "http://dummyimage.com/133x111.png/cc0000/ffffff",
            "duration": 6,
            "description": "Path fx in neopltc disease, r fibula, subs for fx w nonunion"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/168x182.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Driver of pk-up/van inj in clsn w rail trn/veh in traf, init"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/127x235.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Malignant neoplasm of posterior mediastinum"
          },
          {
            "contentTitle": "Grus canadensis",
            "video": "http://dummyimage.com/131x240.png/cc0000/ffffff",
            "duration": 8,
            "description": "Burn of 2nd deg mul sites of head, face, and neck, subs"
          },
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/172x178.png/ff4444/ffffff",
            "duration": 7,
            "description": "Mech loosening of internal left knee prosthetic joint, subs"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/176x209.png/dddddd/000000",
            "duration": 4,
            "description": "Torus fracture of upper end of right fibula"
          },
          {
            "contentTitle": "Echimys chrysurus",
            "video": "http://dummyimage.com/173x244.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Corrosion of first degree of unspecified thigh, subs encntr"
          },
          {
            "contentTitle": "Snycerus caffer",
            "video": "http://dummyimage.com/250x204.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Complete traumatic amputation at shoulder joint"
          },
          {
            "contentTitle": "Pteronura brasiliensis",
            "video": "http://dummyimage.com/114x127.png/dddddd/000000",
            "duration": 3,
            "description": "Injury of cutaneous sensory nerve at shldr/up arm, right arm"
          }
        ]
      },
      {
        "header": "Biostatistician IV",
        "totalMinutes": 26988,
        "contents": [
          {
            "contentTitle": "Toxostoma curvirostre",
            "video": "http://dummyimage.com/223x229.png/ff4444/ffffff",
            "duration": 2,
            "description": "Minor contusion of left kidney"
          },
          {
            "contentTitle": "Dipodomys deserti",
            "video": "http://dummyimage.com/227x140.png/ff4444/ffffff",
            "duration": 7,
            "description": "Bipolar disord, crnt epsd depress, sev, w/o psych features"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/229x204.png/dddddd/000000",
            "duration": 6,
            "description": "Explosion on board passenger ship, sequela"
          },
          {
            "contentTitle": "Ciconia episcopus",
            "video": "http://dummyimage.com/161x151.png/ff4444/ffffff",
            "duration": 8,
            "description": "Fracture of T5-T6 vertebra"
          },
          {
            "contentTitle": "Sula dactylatra",
            "video": "http://dummyimage.com/104x146.png/ff4444/ffffff",
            "duration": 4,
            "description": "Other disorders of meninges, not elsewhere classified"
          },
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/196x180.png/dddddd/000000",
            "duration": 1,
            "description": "Other specified malignant neoplasm of skin of lip"
          },
          {
            "contentTitle": "Nycticorax nycticorax",
            "video": "http://dummyimage.com/173x127.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Nondisp fx of first metatarsal bone, right foot, init"
          },
          {
            "contentTitle": "Phoeniconaias minor",
            "video": "http://dummyimage.com/115x115.png/cc0000/ffffff",
            "duration": 8,
            "description": "Injury of unspecified nerves of neck"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/219x197.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Other fracture of unspecified patella, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/174x151.png/dddddd/000000",
            "duration": 4,
            "description": "Subluxation of right ankle joint"
          },
          {
            "contentTitle": "Sciurus niger",
            "video": "http://dummyimage.com/131x121.png/dddddd/000000",
            "duration": 8,
            "description": "Strain of muscle, fascia and tendon of pelvis, sequela"
          },
          {
            "contentTitle": "Theropithecus gelada",
            "video": "http://dummyimage.com/104x139.png/cc0000/ffffff",
            "duration": 8,
            "description": "Apartment as the place of occurrence of the external cause"
          },
          {
            "contentTitle": "Streptopelia senegalensis",
            "video": "http://dummyimage.com/165x216.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Branched-chain organic acidurias"
          }
        ]
      },
      {
        "header": "Software Engineer I",
        "totalMinutes": 16411,
        "contents": [
          {
            "contentTitle": "Macropus fuliginosus",
            "video": "http://dummyimage.com/185x162.png/cc0000/ffffff",
            "duration": 9,
            "description": "Other fracture of upper end of ulna"
          },
          {
            "contentTitle": "Spheniscus mendiculus",
            "video": "http://dummyimage.com/138x123.png/cc0000/ffffff",
            "duration": 4,
            "description": "Displ spiral fx shaft of ulna, l arm, 7thP"
          },
          {
            "contentTitle": "Tachyglossus aculeatus",
            "video": "http://dummyimage.com/172x246.png/cc0000/ffffff",
            "duration": 6,
            "description": "Partial traumatic amputation of unspecified ear, init encntr"
          },
          {
            "contentTitle": "Mycteria ibis",
            "video": "http://dummyimage.com/212x238.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Struck by turtle, subsequent encounter"
          },
          {
            "contentTitle": "Crotalus cerastes",
            "video": "http://dummyimage.com/164x143.png/cc0000/ffffff",
            "duration": 4,
            "description": "Inj oth blood vessels at wrs/hnd lv of left arm, sequela"
          },
          {
            "contentTitle": "Spizaetus coronatus",
            "video": "http://dummyimage.com/123x216.png/ff4444/ffffff",
            "duration": 3,
            "description": "Occup of hv veh inj in nonclsn trnsp acc nontraf, sequela"
          },
          {
            "contentTitle": "Anas bahamensis",
            "video": "http://dummyimage.com/179x239.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Hypertrophy of bone, left hand"
          },
          {
            "contentTitle": "Cebus albifrons",
            "video": "http://dummyimage.com/155x134.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Fb in oth and multiple parts of external eye, unsp eye, subs"
          },
          {
            "contentTitle": "Ephipplorhynchus senegalensis",
            "video": "http://dummyimage.com/178x117.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Bent bone of left ulna"
          },
          {
            "contentTitle": "Macropus fuliginosus",
            "video": "http://dummyimage.com/176x167.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Unsp open wound of l mid finger w/o damage to nail, init"
          },
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/121x202.png/cc0000/ffffff",
            "duration": 1,
            "description": "Unspecified choroidal detachment"
          },
          {
            "contentTitle": "Phoenicopterus ruber",
            "video": "http://dummyimage.com/187x101.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Infantile acne"
          },
          {
            "contentTitle": "Laniarius ferrugineus",
            "video": "http://dummyimage.com/128x212.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Terrorism involving biolg weapons, terrorist injured, subs"
          },
          {
            "contentTitle": "Carphophis sp.",
            "video": "http://dummyimage.com/145x217.png/cc0000/ffffff",
            "duration": 7,
            "description": "Burn due to fishing boat on fire"
          },
          {
            "contentTitle": "Dipodomys deserti",
            "video": "http://dummyimage.com/146x139.png/dddddd/000000",
            "duration": 2,
            "description": "Toxic eff of organophos and carbamate insect, slf-hrm, subs"
          },
          {
            "contentTitle": "Neotis denhami",
            "video": "http://dummyimage.com/195x154.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Crystalline deposits in vitreous body, bilateral"
          }
        ]
      },
      {
        "header": "Research Associate",
        "totalMinutes": 48910,
        "contents": [
          {
            "contentTitle": "Halcyon smyrnesis",
            "video": "http://dummyimage.com/194x145.png/dddddd/000000",
            "duration": 3,
            "description": "Injury of unspecified nerve at lower leg level, left leg"
          },
          {
            "contentTitle": "Irania gutteralis",
            "video": "http://dummyimage.com/101x107.png/ff4444/ffffff",
            "duration": 9,
            "description": "Other fracture of first lumbar vertebra, sequela"
          },
          {
            "contentTitle": "Tiliqua scincoides",
            "video": "http://dummyimage.com/196x134.png/cc0000/ffffff",
            "duration": 10,
            "description": "Subluxation of MCP joint of left ring finger, subs"
          },
          {
            "contentTitle": "Aegypius tracheliotus",
            "video": "http://dummyimage.com/170x182.png/dddddd/000000",
            "duration": 2,
            "description": "Infection of nipple associated with pregnancy"
          },
          {
            "contentTitle": "Cyrtodactylus louisiadensis",
            "video": "http://dummyimage.com/183x130.png/dddddd/000000",
            "duration": 5,
            "description": "Effect of air pressure and water pressure, unsp, subs encntr"
          },
          {
            "contentTitle": "Zosterops pallidus",
            "video": "http://dummyimage.com/220x102.png/ff4444/ffffff",
            "duration": 7,
            "description": "Periprosth osteolysis of internal prosthetic r hip jt, subs"
          },
          {
            "contentTitle": "Estrilda erythronotos",
            "video": "http://dummyimage.com/137x146.png/dddddd/000000",
            "duration": 2,
            "description": "Pathological dislocation of left hip, NEC"
          },
          {
            "contentTitle": "Ratufa indica",
            "video": "http://dummyimage.com/193x164.png/ff4444/ffffff",
            "duration": 4,
            "description": "Toxic effect of contact w sea anemone, self-harm, sequela"
          },
          {
            "contentTitle": "Raphicerus campestris",
            "video": "http://dummyimage.com/136x206.png/dddddd/000000",
            "duration": 3,
            "description": "Sltr-haris Type III physl fx low end humer, right arm, 7thD"
          },
          {
            "contentTitle": "Aonyx cinerea",
            "video": "http://dummyimage.com/180x194.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Other disorders of adult personality and behavior"
          },
          {
            "contentTitle": "Vulpes cinereoargenteus",
            "video": "http://dummyimage.com/196x232.png/ff4444/ffffff",
            "duration": 5,
            "description": "Arthropathy following intestinal bypass, left knee"
          },
          {
            "contentTitle": "Butorides striatus",
            "video": "http://dummyimage.com/107x174.png/dddddd/000000",
            "duration": 3,
            "description": "Nondisplaced fracture of shaft of left clavicle, sequela"
          },
          {
            "contentTitle": "Perameles nasuta",
            "video": "http://dummyimage.com/160x216.png/cc0000/ffffff",
            "duration": 2,
            "description": "Corrosion of unsp degree of unsp thumb (nail), init encntr"
          },
          {
            "contentTitle": "Ursus americanus",
            "video": "http://dummyimage.com/215x219.png/ff4444/ffffff",
            "duration": 9,
            "description": "Inj unsp musc/fasc/tend at wrs/hnd lv, left hand, subs"
          },
          {
            "contentTitle": "Spermophilus armatus",
            "video": "http://dummyimage.com/152x179.png/cc0000/ffffff",
            "duration": 1,
            "description": "Fall into storm drain or manhole, sequela"
          },
          {
            "contentTitle": "Columba palumbus",
            "video": "http://dummyimage.com/128x243.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Displaced fracture of navicular of left foot, sequela"
          },
          {
            "contentTitle": "Hystrix indica",
            "video": "http://dummyimage.com/106x167.png/cc0000/ffffff",
            "duration": 4,
            "description": "Athscl autol vein bypass of the right leg w ulcer of thigh"
          },
          {
            "contentTitle": "Spermophilus lateralis",
            "video": "http://dummyimage.com/220x107.png/ff4444/ffffff",
            "duration": 3,
            "description": "Type 1 diab with severe nonp rtnop without macular edema, bi"
          },
          {
            "contentTitle": "Pelecanus occidentalis",
            "video": "http://dummyimage.com/142x108.png/dddddd/000000",
            "duration": 4,
            "description": "Disp fx of med phalanx of r less toe(s), 7thG"
          }
        ]
      },
      {
        "header": "VP Marketing",
        "totalMinutes": 29573,
        "contents": [
          {
            "contentTitle": "Lamprotornis sp.",
            "video": "http://dummyimage.com/145x160.png/cc0000/ffffff",
            "duration": 4,
            "description": "Struck by golf ball, initial encounter"
          },
          {
            "contentTitle": "Gyps bengalensis",
            "video": "http://dummyimage.com/174x161.png/ff4444/ffffff",
            "duration": 4,
            "description": "Inj unsp musc/fasc/tend at forearm level, left arm, sequela"
          },
          {
            "contentTitle": "Chionis alba",
            "video": "http://dummyimage.com/224x161.png/cc0000/ffffff",
            "duration": 5,
            "description": "Unsp traumatic displ spondylolysis of third cervcal vertebra"
          },
          {
            "contentTitle": "Elephas maximus bengalensis",
            "video": "http://dummyimage.com/212x203.png/ff4444/ffffff",
            "duration": 5,
            "description": "Complete traumatic trnsphal amputation of right thumb, subs"
          },
          {
            "contentTitle": "Irania gutteralis",
            "video": "http://dummyimage.com/183x162.png/ff4444/ffffff",
            "duration": 4,
            "description": "Other specified dorsopathies, lumbosacral region"
          },
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/235x187.png/cc0000/ffffff",
            "duration": 3,
            "description": "Unspecified physeal fracture of unspecified calcaneus, 7thD"
          },
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/230x180.png/ff4444/ffffff",
            "duration": 1,
            "description": "Burn of first degree of left palm, sequela"
          },
          {
            "contentTitle": "Macaca mulatta",
            "video": "http://dummyimage.com/194x111.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Maternal care for fetal problem, unsp, second tri, fetus 4"
          },
          {
            "contentTitle": "Diomedea irrorata",
            "video": "http://dummyimage.com/134x135.png/ff4444/ffffff",
            "duration": 9,
            "description": "Displ transverse fx l patella, 7thR"
          },
          {
            "contentTitle": "Ephipplorhynchus senegalensis",
            "video": "http://dummyimage.com/222x151.png/dddddd/000000",
            "duration": 3,
            "description": "Matern care for damag to fts from viral dis in mother, fts2"
          },
          {
            "contentTitle": "Hippotragus equinus",
            "video": "http://dummyimage.com/221x144.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Burn of unspecified degree of chin, initial encounter"
          },
          {
            "contentTitle": "Plocepasser mahali",
            "video": "http://dummyimage.com/204x100.png/ff4444/ffffff",
            "duration": 7,
            "description": "Miotic pupillary cyst, right eye"
          },
          {
            "contentTitle": "Psophia viridis",
            "video": "http://dummyimage.com/157x116.png/cc0000/ffffff",
            "duration": 3,
            "description": "Fracture of condylar process of right mandible, 7thB"
          },
          {
            "contentTitle": "Macropus rufogriseus",
            "video": "http://dummyimage.com/191x220.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Unsp opn wnd low back and pelv w/o penet retroperiton, init"
          },
          {
            "contentTitle": "Vulpes chama",
            "video": "http://dummyimage.com/180x116.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Displ Maisonneuve's fx left leg, init for opn fx type I/2"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/121x153.png/dddddd/000000",
            "duration": 1,
            "description": "Pnctr w fb of l little finger w damage to nail, init"
          },
          {
            "contentTitle": "Mazama americana",
            "video": "http://dummyimage.com/167x135.png/dddddd/000000",
            "duration": 7,
            "description": "Acute infarction of large intestine"
          },
          {
            "contentTitle": "Tayassu tajacu",
            "video": "http://dummyimage.com/211x200.png/ff4444/ffffff",
            "duration": 2,
            "description": "Cmplx tear of lat mensc, current injury, unsp knee, sequela"
          }
        ]
      },
      {
        "header": "Programmer Analyst I",
        "totalMinutes": 22595,
        "contents": [
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/164x249.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Toxic effect of contact w oth venomous amphib, acc, sequela"
          },
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/128x175.png/dddddd/000000",
            "duration": 9,
            "description": "Emollients, demulcents and protectants"
          },
          {
            "contentTitle": "Ramphastos tucanus",
            "video": "http://dummyimage.com/228x173.png/dddddd/000000",
            "duration": 2,
            "description": "Pre-existing htn with pre-eclampsia, comp childbirth"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/129x167.png/ff4444/ffffff",
            "duration": 10,
            "description": "Barton's fx r radius, subs for opn fx type I/2 w delay heal"
          },
          {
            "contentTitle": "Haematopus ater",
            "video": "http://dummyimage.com/135x138.png/ff4444/ffffff",
            "duration": 9,
            "description": "Disord of visual pathways in inflam disord, left side"
          },
          {
            "contentTitle": "Coluber constrictor foxii",
            "video": "http://dummyimage.com/193x188.png/5fa2dd/ffffff",
            "duration": 2,
            "description": "Car driver injured in collision w 2/3-whl mv in traf, subs"
          },
          {
            "contentTitle": "Lycosa godeffroyi",
            "video": "http://dummyimage.com/173x192.png/cc0000/ffffff",
            "duration": 4,
            "description": "Postthrombotic syndrome with ulcer of unsp lower extremity"
          },
          {
            "contentTitle": "Ninox superciliaris",
            "video": "http://dummyimage.com/197x155.png/ff4444/ffffff",
            "duration": 8,
            "description": "Struck by shoe cleats"
          },
          {
            "contentTitle": "Macropus parryi",
            "video": "http://dummyimage.com/208x232.png/dddddd/000000",
            "duration": 5,
            "description": "Abnormal results of function studies"
          }
        ]
      },
      {
        "header": "Assistant Media Planner",
        "totalMinutes": 64620,
        "contents": [
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/181x104.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Surgical instrumnt, materials and orth devices assoc w incdt"
          },
          {
            "contentTitle": "Alouatta seniculus",
            "video": "http://dummyimage.com/149x105.png/cc0000/ffffff",
            "duration": 6,
            "description": "Maternal care for (suspected) cnsl malform in fetus, fetus 3"
          },
          {
            "contentTitle": "Cercopithecus aethiops",
            "video": "http://dummyimage.com/182x234.png/dddddd/000000",
            "duration": 3,
            "description": "Unspecified injury of unspecified ankle, sequela"
          },
          {
            "contentTitle": "Rana sp.",
            "video": "http://dummyimage.com/116x178.png/cc0000/ffffff",
            "duration": 9,
            "description": "Other premature depolarization"
          },
          {
            "contentTitle": "Epicrates cenchria maurus",
            "video": "http://dummyimage.com/171x163.png/dddddd/000000",
            "duration": 10,
            "description": "Adverse effect of other topical agents"
          },
          {
            "contentTitle": "Zonotrichia capensis",
            "video": "http://dummyimage.com/235x242.png/dddddd/000000",
            "duration": 1,
            "description": "Displ unsp condyle fx low end l femr, 7thJ"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/188x152.png/cc0000/ffffff",
            "duration": 8,
            "description": "Nondisplaced fracture of body of unspecified talus, sequela"
          },
          {
            "contentTitle": "Aonyx capensis",
            "video": "http://dummyimage.com/104x189.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Burn of third degree of left forearm, subsequent encounter"
          },
          {
            "contentTitle": "Tadorna tadorna",
            "video": "http://dummyimage.com/127x100.png/cc0000/ffffff",
            "duration": 5,
            "description": "Nondisp fx of second metatarsal bone, left foot, init"
          },
          {
            "contentTitle": "Tachyglossus aculeatus",
            "video": "http://dummyimage.com/125x193.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Other injury of esophagus (thoracic part), initial encounter"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/210x116.png/cc0000/ffffff",
            "duration": 2,
            "description": "Injury of oth muscles, fascia and tendons at thigh level"
          },
          {
            "contentTitle": "Casmerodius albus",
            "video": "http://dummyimage.com/247x191.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Pathological fracture, left fibula, subs for fx w malunion"
          },
          {
            "contentTitle": "Ovis ammon",
            "video": "http://dummyimage.com/152x225.png/cc0000/ffffff",
            "duration": 1,
            "description": "Unsp pedl cyclst injured in nonclsn trnsp acc in traf, subs"
          },
          {
            "contentTitle": "Sciurus vulgaris",
            "video": "http://dummyimage.com/249x115.png/dddddd/000000",
            "duration": 4,
            "description": "Sublux of proximal interphaln joint of unsp finger, sequela"
          },
          {
            "contentTitle": "Salvadora hexalepis",
            "video": "http://dummyimage.com/174x198.png/cc0000/ffffff",
            "duration": 1,
            "description": "Disp fx of medial condyle of unspecified femur, sequela"
          },
          {
            "contentTitle": "Macropus robustus",
            "video": "http://dummyimage.com/208x130.png/cc0000/ffffff",
            "duration": 7,
            "description": "Ulcerative (chronic) rectosigmoiditis w intestinal obst"
          }
        ]
      }
    ]
  },
  {
    "title": "Pocahontas",
    "subject": "Business Development",
    "instructorName": "Rodin Salem",
    "price": 585.97,
    "level": "AllLevels",
    "courseHours": 127,
    "summary": "Poisoning by antitussives, accidental (unintentional), init",
    "subtitles": [
      {
        "header": "Cost Accountant",
        "totalMinutes": 87790,
        "contents": [
          {
            "contentTitle": "Mustela nigripes",
            "video": "http://dummyimage.com/246x227.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Oth malignant neoplasm skin/ right lower limb, including hip"
          },
          {
            "contentTitle": "Tachybaptus ruficollis",
            "video": "http://dummyimage.com/201x102.png/ff4444/ffffff",
            "duration": 1,
            "description": "Poisoning by butyrophen/thiothixen neuroleptc, undet, subs"
          },
          {
            "contentTitle": "Mellivora capensis",
            "video": "http://dummyimage.com/204x162.png/cc0000/ffffff",
            "duration": 5,
            "description": "Injury of unspecified nerve at hip and thigh level, left leg"
          },
          {
            "contentTitle": "Martes pennanti",
            "video": "http://dummyimage.com/216x156.png/ff4444/ffffff",
            "duration": 3,
            "description": "Pnctr w/o fb of r bk wl of thorax w/o penet thor cav, sqla"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/198x216.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Nondisplaced transverse fracture of shaft of right femur"
          },
          {
            "contentTitle": "Paroaria gularis",
            "video": "http://dummyimage.com/128x237.png/dddddd/000000",
            "duration": 10,
            "description": "Pain in joints of left hand"
          },
          {
            "contentTitle": "Pituophis melanaleucus",
            "video": "http://dummyimage.com/113x140.png/cc0000/ffffff",
            "duration": 7,
            "description": "Unspecified astigmatism, bilateral"
          },
          {
            "contentTitle": "Agkistrodon piscivorus",
            "video": "http://dummyimage.com/239x142.png/dddddd/000000",
            "duration": 9,
            "description": "Fall on or from other playground equipment"
          },
          {
            "contentTitle": "Gyps fulvus",
            "video": "http://dummyimage.com/110x130.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Insect bite (nonvenomous) of left front wall of thorax, init"
          },
          {
            "contentTitle": "Tragelaphus angasi",
            "video": "http://dummyimage.com/118x136.png/ff4444/ffffff",
            "duration": 1,
            "description": "Sltr-haris Type III physeal fx unspecified metatarsal, init"
          },
          {
            "contentTitle": "Capra ibex",
            "video": "http://dummyimage.com/127x168.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Oth fx r low leg, subs for opn fx type I/2 w routn heal"
          },
          {
            "contentTitle": "Tiliqua scincoides",
            "video": "http://dummyimage.com/102x159.png/ff4444/ffffff",
            "duration": 5,
            "description": "Fx unsp phalanx of unsp finger, subs for fx w routn heal"
          },
          {
            "contentTitle": "Chamaelo sp.",
            "video": "http://dummyimage.com/101x211.png/cc0000/ffffff",
            "duration": 4,
            "description": "Spastic ectropion of unspecified eye, unspecified eyelid"
          }
        ]
      },
      {
        "header": "Senior Editor",
        "totalMinutes": 12041,
        "contents": [
          {
            "contentTitle": "Tragelaphus strepsiceros",
            "video": "http://dummyimage.com/205x132.png/dddddd/000000",
            "duration": 3,
            "description": "Oth personality & behavrl disord due to known physiol cond"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/136x152.png/dddddd/000000",
            "duration": 8,
            "description": "Injury of radial artery at forearm level"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/245x156.png/cc0000/ffffff",
            "duration": 8,
            "description": "Pressure ulcer of unspecified buttock"
          },
          {
            "contentTitle": "Sula nebouxii",
            "video": "http://dummyimage.com/162x189.png/dddddd/000000",
            "duration": 10,
            "description": "Athscl autol vein bypass of extrm w intrmt claud, bi legs"
          },
          {
            "contentTitle": "Rana sp.",
            "video": "http://dummyimage.com/192x227.png/cc0000/ffffff",
            "duration": 7,
            "description": "Other chronic figurate erythema"
          },
          {
            "contentTitle": "Bubalus arnee",
            "video": "http://dummyimage.com/236x247.png/ff4444/ffffff",
            "duration": 10,
            "description": "Nondisp fx of shaft of 2nd MC bone, r hand, 7thG"
          },
          {
            "contentTitle": "Laniarius ferrugineus",
            "video": "http://dummyimage.com/202x180.png/dddddd/000000",
            "duration": 2,
            "description": "Lead-induced gout, hip"
          },
          {
            "contentTitle": "Pseudoleistes virescens",
            "video": "http://dummyimage.com/190x167.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Laceration with foreign body of right elbow, sequela"
          },
          {
            "contentTitle": "Ratufa indica",
            "video": "http://dummyimage.com/155x182.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Displ osteochon fx r patella, subs for clos fx w routn heal"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/110x240.png/dddddd/000000",
            "duration": 3,
            "description": "Irritant contact dermatitis due to drugs in contact w skin"
          },
          {
            "contentTitle": "Cereopsis novaehollandiae",
            "video": "http://dummyimage.com/171x221.png/cc0000/ffffff",
            "duration": 5,
            "description": "Stress fracture, right finger(s)"
          },
          {
            "contentTitle": "Certotrichas paena",
            "video": "http://dummyimage.com/128x121.png/ff4444/ffffff",
            "duration": 4,
            "description": "Insect bite (nonvenomous) of ankle"
          },
          {
            "contentTitle": "Lorythaixoides concolor",
            "video": "http://dummyimage.com/189x180.png/cc0000/ffffff",
            "duration": 6,
            "description": "Nondisp fx of ant process of r calcaneus, init for opn fx"
          },
          {
            "contentTitle": "Eunectes sp.",
            "video": "http://dummyimage.com/223x107.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Anterior subluxation of left humerus, subsequent encounter"
          },
          {
            "contentTitle": "Cacatua galerita",
            "video": "http://dummyimage.com/239x199.png/cc0000/ffffff",
            "duration": 10,
            "description": "Nondisplaced avulsion fracture of right ilium, sequela"
          },
          {
            "contentTitle": "Ceratotherium simum",
            "video": "http://dummyimage.com/243x243.png/ff4444/ffffff",
            "duration": 4,
            "description": "Occup of pk-up/van injured pick-up truck, pk-up/van in traf"
          }
        ]
      },
      {
        "header": "Data Coordiator",
        "totalMinutes": 89184,
        "contents": [
          {
            "contentTitle": "Ara ararauna",
            "video": "http://dummyimage.com/210x194.png/cc0000/ffffff",
            "duration": 2,
            "description": "Oth injury of vein at forearm level, right arm, sequela"
          },
          {
            "contentTitle": "Columba livia",
            "video": "http://dummyimage.com/221x211.png/cc0000/ffffff",
            "duration": 6,
            "description": "Sltr-haris Type I physl fx low end l tibia, 7thK"
          },
          {
            "contentTitle": "Naja haje",
            "video": "http://dummyimage.com/196x250.png/dddddd/000000",
            "duration": 4,
            "description": "Amniotic fluid embolism in pregnancy, second trimester"
          },
          {
            "contentTitle": "Sus scrofa",
            "video": "http://dummyimage.com/205x230.png/dddddd/000000",
            "duration": 1,
            "description": "Duodenal ulcer, unsp as acute or chronic, w/o hemor or perf"
          },
          {
            "contentTitle": "Nucifraga columbiana",
            "video": "http://dummyimage.com/231x216.png/ff4444/ffffff",
            "duration": 10,
            "description": "Unsp fx upr end l tibia, subs for opn fx type I/2 w nonunion"
          },
          {
            "contentTitle": "Corallus hortulanus cooki",
            "video": "http://dummyimage.com/119x129.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Stiffness of hip, not elsewhere classified"
          },
          {
            "contentTitle": "Macropus eugenii",
            "video": "http://dummyimage.com/115x157.png/ff4444/ffffff",
            "duration": 4,
            "description": "Laceration of bronchus, unspecified, subsequent encounter"
          },
          {
            "contentTitle": "Chelodina longicollis",
            "video": "http://dummyimage.com/236x226.png/dddddd/000000",
            "duration": 6,
            "description": "Dislocation of MCP joint of right little finger, subs"
          },
          {
            "contentTitle": "Vanessa indica",
            "video": "http://dummyimage.com/129x158.png/ff4444/ffffff",
            "duration": 8,
            "description": "Major laceration of heart with hemopericardium, init encntr"
          },
          {
            "contentTitle": "Colaptes campestroides",
            "video": "http://dummyimage.com/221x228.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Other specified extrapyramidal and movement disorders"
          },
          {
            "contentTitle": "Eolophus roseicapillus",
            "video": "http://dummyimage.com/223x177.png/ff4444/ffffff",
            "duration": 6,
            "description": "Perforation due to fb acc left in body following punctr/cath"
          },
          {
            "contentTitle": "Corvus albus",
            "video": "http://dummyimage.com/107x239.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Corrosion of second degree of right upper arm, sequela"
          },
          {
            "contentTitle": "Ictonyx striatus",
            "video": "http://dummyimage.com/206x162.png/ff4444/ffffff",
            "duration": 1,
            "description": "Poisn by local antifung/infect/inflamm drugs, assault, subs"
          },
          {
            "contentTitle": "Cynictis penicillata",
            "video": "http://dummyimage.com/155x194.png/ff4444/ffffff",
            "duration": 3,
            "description": "Disp fx of olecran pro w intartic extn left ulna, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/232x146.png/dddddd/000000",
            "duration": 9,
            "description": "Oth disp fx of seventh cervical vertebra, init for clos fx"
          },
          {
            "contentTitle": "Vanellus sp.",
            "video": "http://dummyimage.com/208x236.png/dddddd/000000",
            "duration": 3,
            "description": "Oth intraop and postprocedural complications of the spleen"
          },
          {
            "contentTitle": "Larus dominicanus",
            "video": "http://dummyimage.com/237x195.png/dddddd/000000",
            "duration": 10,
            "description": "Other injury of ovary, unspecified, initial encounter"
          },
          {
            "contentTitle": "Procyon lotor",
            "video": "http://dummyimage.com/244x112.png/dddddd/000000",
            "duration": 8,
            "description": "Insect bite (nonvenomous), left lesser toe(s), subs encntr"
          },
          {
            "contentTitle": "Heloderma horridum",
            "video": "http://dummyimage.com/117x208.png/cc0000/ffffff",
            "duration": 3,
            "description": "Torus fx lower end of left radius, subs for fx w nonunion"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/140x240.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Displaced midcervical fracture of unsp femur, init"
          }
        ]
      },
      {
        "header": "Internal Auditor",
        "totalMinutes": 16669,
        "contents": [
          {
            "contentTitle": "Phoenicopterus chilensis",
            "video": "http://dummyimage.com/194x239.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Unsp open wound of right middle finger w/o damage to nail"
          },
          {
            "contentTitle": "Dolichitus patagonum",
            "video": "http://dummyimage.com/137x176.png/ff4444/ffffff",
            "duration": 4,
            "description": "Athscl type of bypass of extrm w intrmt claud, unsp extrm"
          },
          {
            "contentTitle": "Spermophilus richardsonii",
            "video": "http://dummyimage.com/192x105.png/dddddd/000000",
            "duration": 2,
            "description": "Laceration w/o foreign body of unsp part of thorax, init"
          },
          {
            "contentTitle": "Crotalus adamanteus",
            "video": "http://dummyimage.com/162x109.png/ff4444/ffffff",
            "duration": 7,
            "description": "Injury of acoustic nerve, unspecified side"
          },
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/134x142.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Juvenile osteochondrosis of spine"
          },
          {
            "contentTitle": "Buteo jamaicensis",
            "video": "http://dummyimage.com/120x191.png/dddddd/000000",
            "duration": 1,
            "description": "Hemolytic transfusion reaction, unspecified incompatibility"
          },
          {
            "contentTitle": "Podargus strigoides",
            "video": "http://dummyimage.com/214x135.png/dddddd/000000",
            "duration": 10,
            "description": "Disp fx of dist phalanx of finger, subs for fx w routn heal"
          },
          {
            "contentTitle": "Canis lupus baileyi",
            "video": "http://dummyimage.com/177x215.png/cc0000/ffffff",
            "duration": 9,
            "description": "Disp fx of lateral end of r clavicle, subs for fx w malunion"
          },
          {
            "contentTitle": "Sula dactylatra",
            "video": "http://dummyimage.com/122x227.png/dddddd/000000",
            "duration": 8,
            "description": "Dislocation of proximal interphalangeal joint of oth finger"
          },
          {
            "contentTitle": "Felis serval",
            "video": "http://dummyimage.com/128x145.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Major osseous defect, right ankle and foot"
          },
          {
            "contentTitle": "Epicrates cenchria maurus",
            "video": "http://dummyimage.com/180x194.png/dddddd/000000",
            "duration": 7,
            "description": "Puncture wound with foreign body of right hand, sequela"
          },
          {
            "contentTitle": "Centrocercus urophasianus",
            "video": "http://dummyimage.com/228x160.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Attn and concentration deficit fol other ntrm intcrn hemor"
          },
          {
            "contentTitle": "Lamprotornis nitens",
            "video": "http://dummyimage.com/133x222.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Dislocation of interphaln joint of unsp great toe, sequela"
          },
          {
            "contentTitle": "Trichosurus vulpecula",
            "video": "http://dummyimage.com/222x183.png/ff4444/ffffff",
            "duration": 7,
            "description": "Maternal care for oth isoimmun, third trimester, fetus 3"
          },
          {
            "contentTitle": "Dasyprocta leporina",
            "video": "http://dummyimage.com/115x172.png/dddddd/000000",
            "duration": 2,
            "description": "Other displaced fracture of first cervical vertebra"
          },
          {
            "contentTitle": "Drymarchon corias couperi",
            "video": "http://dummyimage.com/218x201.png/dddddd/000000",
            "duration": 1,
            "description": "Sprain of tibiofibular ligament of left ankle, init encntr"
          },
          {
            "contentTitle": "Stercorarius longicausus",
            "video": "http://dummyimage.com/109x249.png/ff4444/ffffff",
            "duration": 10,
            "description": "Fracture of one rib, left side, init for opn fx"
          },
          {
            "contentTitle": "Chlidonias leucopterus",
            "video": "http://dummyimage.com/236x168.png/ff4444/ffffff",
            "duration": 3,
            "description": "Fall from gliding-type pedestrian conveyance, init encntr"
          }
        ]
      },
      {
        "header": "Librarian",
        "totalMinutes": 80558,
        "contents": [
          {
            "contentTitle": "Alcelaphus buselaphus cokii",
            "video": "http://dummyimage.com/109x215.png/dddddd/000000",
            "duration": 6,
            "description": "Occupant (driver) of hv veh injured in unsp traf, init"
          },
          {
            "contentTitle": "Odocoileus hemionus",
            "video": "http://dummyimage.com/106x202.png/ff4444/ffffff",
            "duration": 7,
            "description": "Body mass index (BMI) 30-39, adult"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/132x144.png/cc0000/ffffff",
            "duration": 8,
            "description": "Other marginal perforations of tympanic membrane, unsp ear"
          },
          {
            "contentTitle": "Plectopterus gambensis",
            "video": "http://dummyimage.com/105x238.png/dddddd/000000",
            "duration": 8,
            "description": "Poisn by oth antieplptc and sed-hypntc drugs, undet, init"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/217x175.png/cc0000/ffffff",
            "duration": 10,
            "description": "Osteonecrosis due to previous trauma, left ankle"
          },
          {
            "contentTitle": "Papio cynocephalus",
            "video": "http://dummyimage.com/121x178.png/ff4444/ffffff",
            "duration": 6,
            "description": "Other injury of ascending [right] colon, sequela"
          }
        ]
      },
      {
        "header": "Research Associate",
        "totalMinutes": 76742,
        "contents": [
          {
            "contentTitle": "Geococcyx californianus",
            "video": "http://dummyimage.com/157x118.png/dddddd/000000",
            "duration": 6,
            "description": "Other viral infections of unspecified site"
          },
          {
            "contentTitle": "Cynomys ludovicianus",
            "video": "http://dummyimage.com/149x238.png/ff4444/ffffff",
            "duration": 9,
            "description": "Unspecified maltreatment, suspected"
          },
          {
            "contentTitle": "Nycticorax nycticorax",
            "video": "http://dummyimage.com/141x247.png/cc0000/ffffff",
            "duration": 5,
            "description": "Matern care for disproprtn d/t unusually large fetus, fts4"
          },
          {
            "contentTitle": "Leptoptilus dubius",
            "video": "http://dummyimage.com/139x214.png/cc0000/ffffff",
            "duration": 3,
            "description": "Unsp car occupant injured in collision w car nontraf"
          },
          {
            "contentTitle": "Varanus sp.",
            "video": "http://dummyimage.com/115x140.png/ff4444/ffffff",
            "duration": 6,
            "description": "Activity, roller coaster riding"
          },
          {
            "contentTitle": "Felis concolor",
            "video": "http://dummyimage.com/231x223.png/dddddd/000000",
            "duration": 4,
            "description": "Trichomoniasis of other sites"
          },
          {
            "contentTitle": "Prionace glauca",
            "video": "http://dummyimage.com/239x199.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Corrosion of second degree of male genital region, sequela"
          },
          {
            "contentTitle": "Dusicyon thous",
            "video": "http://dummyimage.com/244x242.png/dddddd/000000",
            "duration": 4,
            "description": "Salter-Harris Type I physeal fracture of phalanx of left toe"
          }
        ]
      },
      {
        "header": "Food Chemist",
        "totalMinutes": 86019,
        "contents": [
          {
            "contentTitle": "Varanus komodensis",
            "video": "http://dummyimage.com/159x128.png/dddddd/000000",
            "duration": 7,
            "description": "Underdosing of antifungal antibiotics, sys used, subs"
          },
          {
            "contentTitle": "Papio ursinus",
            "video": "http://dummyimage.com/107x132.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Sprain of unspecified parts of thorax, initial encounter"
          },
          {
            "contentTitle": "Carduelis pinus",
            "video": "http://dummyimage.com/246x211.png/5fa2dd/ffffff",
            "duration": 4,
            "description": "Idiopathic aseptic necrosis of unspecified tibia"
          },
          {
            "contentTitle": "Damaliscus lunatus",
            "video": "http://dummyimage.com/229x140.png/ff4444/ffffff",
            "duration": 1,
            "description": "Drug-induced gout, unspecified site"
          },
          {
            "contentTitle": "Speotyte cuniculata",
            "video": "http://dummyimage.com/141x119.png/dddddd/000000",
            "duration": 2,
            "description": "Oth osteopor w current path fracture, r humerus, init"
          },
          {
            "contentTitle": "Aegypius occipitalis",
            "video": "http://dummyimage.com/171x165.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Inj unsp musc/tend at lower leg level, left leg, init"
          }
        ]
      },
      {
        "header": "Account Executive",
        "totalMinutes": 75557,
        "contents": [
          {
            "contentTitle": "Didelphis virginiana",
            "video": "http://dummyimage.com/238x215.png/cc0000/ffffff",
            "duration": 9,
            "description": "Exposure to excessive cold of man-made origin"
          },
          {
            "contentTitle": "Creagrus furcatus",
            "video": "http://dummyimage.com/153x185.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Oth fx upr end unsp tibia, 7thE"
          },
          {
            "contentTitle": "Francolinus coqui",
            "video": "http://dummyimage.com/247x230.png/ff4444/ffffff",
            "duration": 5,
            "description": "Type O blood, Rh negative"
          },
          {
            "contentTitle": "Crax sp.",
            "video": "http://dummyimage.com/244x215.png/dddddd/000000",
            "duration": 2,
            "description": "Sciatica, right side"
          },
          {
            "contentTitle": "Damaliscus dorcas",
            "video": "http://dummyimage.com/242x125.png/dddddd/000000",
            "duration": 5,
            "description": "Fall from chair, subsequent encounter"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/106x122.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Displ bimalleol fx r low leg, 7thE"
          },
          {
            "contentTitle": "Genetta genetta",
            "video": "http://dummyimage.com/214x195.png/ff4444/ffffff",
            "duration": 7,
            "description": "Fracture of unsp phalanx of right index finger, init"
          },
          {
            "contentTitle": "Ploceus intermedius",
            "video": "http://dummyimage.com/222x145.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Burn of first degree of back of right hand"
          },
          {
            "contentTitle": "Lama glama",
            "video": "http://dummyimage.com/187x118.png/dddddd/000000",
            "duration": 10,
            "description": "Animal-rider injured in unsp transport accident, subs encntr"
          },
          {
            "contentTitle": "Cebus apella",
            "video": "http://dummyimage.com/210x106.png/ff4444/ffffff",
            "duration": 3,
            "description": "Unsp focal TBI w LOC >24 hr w/o ret consc w surv, sequela"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/108x159.png/ff4444/ffffff",
            "duration": 9,
            "description": "Insect bite (nonvenomous) of lip, subsequent encounter"
          },
          {
            "contentTitle": "Vanellus armatus",
            "video": "http://dummyimage.com/129x125.png/ff4444/ffffff",
            "duration": 9,
            "description": "Sltr-haris Type IV physl fx low end r tibia, 7thD"
          },
          {
            "contentTitle": "Chlamydosaurus kingii",
            "video": "http://dummyimage.com/152x154.png/dddddd/000000",
            "duration": 3,
            "description": "Mtrcy pasngr injured in clsn w statnry object in traf, subs"
          },
          {
            "contentTitle": "Morelia spilotes variegata",
            "video": "http://dummyimage.com/128x224.png/cc0000/ffffff",
            "duration": 3,
            "description": "Direct infct of unsp knee in infec/parastc dis classd elswhr"
          },
          {
            "contentTitle": "Phalacrocorax carbo",
            "video": "http://dummyimage.com/237x189.png/ff4444/ffffff",
            "duration": 9,
            "description": "Nondisplaced fracture of capitate bone, right wrist"
          },
          {
            "contentTitle": "Felis silvestris lybica",
            "video": "http://dummyimage.com/202x232.png/ff4444/ffffff",
            "duration": 10,
            "description": "Carrier of infectious disease"
          }
        ]
      },
      {
        "header": "Recruiting Manager",
        "totalMinutes": 58576,
        "contents": [
          {
            "contentTitle": "Theropithecus gelada",
            "video": "http://dummyimage.com/169x197.png/ff4444/ffffff",
            "duration": 2,
            "description": "Lesion of radial nerve, unspecified upper limb"
          },
          {
            "contentTitle": "Madoqua kirkii",
            "video": "http://dummyimage.com/181x225.png/cc0000/ffffff",
            "duration": 4,
            "description": "Burn of first degree of back of left hand, sequela"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/128x222.png/ff4444/ffffff",
            "duration": 2,
            "description": "Strain of unsp muscles, fascia and tendons at thigh level"
          },
          {
            "contentTitle": "Paradoxurus hermaphroditus",
            "video": "http://dummyimage.com/226x182.png/cc0000/ffffff",
            "duration": 1,
            "description": "Sltr-haris Type I physl fx upr end r tibia, 7thP"
          },
          {
            "contentTitle": "Taxidea taxus",
            "video": "http://dummyimage.com/102x172.png/cc0000/ffffff",
            "duration": 1,
            "description": "Other shoulder lesions"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/161x103.png/cc0000/ffffff",
            "duration": 2,
            "description": "Legal intervnt w unsp blunt objects, suspect injured, init"
          },
          {
            "contentTitle": "Macropus rufus",
            "video": "http://dummyimage.com/190x248.png/cc0000/ffffff",
            "duration": 5,
            "description": "Other secondary chronic gout, right hip, without tophus"
          },
          {
            "contentTitle": "Giraffe camelopardalis",
            "video": "http://dummyimage.com/172x216.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Personal history of other benign neoplasm"
          },
          {
            "contentTitle": "Eutamias minimus",
            "video": "http://dummyimage.com/215x191.png/5fa2dd/ffffff",
            "duration": 9,
            "description": "Fall into swimming pool striking bottom causing drown, init"
          },
          {
            "contentTitle": "Vombatus ursinus",
            "video": "http://dummyimage.com/195x175.png/cc0000/ffffff",
            "duration": 1,
            "description": "Partial traumatic amp of two or more left lesser toes, subs"
          },
          {
            "contentTitle": "Picoides pubescens",
            "video": "http://dummyimage.com/125x120.png/cc0000/ffffff",
            "duration": 3,
            "description": "Nondisplaced oblique fracture of shaft of left fibula"
          },
          {
            "contentTitle": "Canis latrans",
            "video": "http://dummyimage.com/157x133.png/cc0000/ffffff",
            "duration": 1,
            "description": "Poisn by unsp agents prim act on the resp sys, asslt, init"
          },
          {
            "contentTitle": "Mirounga leonina",
            "video": "http://dummyimage.com/127x136.png/dddddd/000000",
            "duration": 2,
            "description": "Laceration of inferior mesenteric vein"
          },
          {
            "contentTitle": "Colobus guerza",
            "video": "http://dummyimage.com/200x145.png/cc0000/ffffff",
            "duration": 5,
            "description": "Fall from, out of or through bldg, not otherwise spcf, sqla"
          },
          {
            "contentTitle": "Ourebia ourebi",
            "video": "http://dummyimage.com/173x204.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Driver of pk-up/van injured in clsn w hv veh nontraf, init"
          },
          {
            "contentTitle": "Isoodon obesulus",
            "video": "http://dummyimage.com/205x140.png/ff4444/ffffff",
            "duration": 4,
            "description": "Contusion of unsp middle finger w/o damage to nail, init"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/247x206.png/dddddd/000000",
            "duration": 7,
            "description": "Hemorrhagic otitis externa, right ear"
          },
          {
            "contentTitle": "Uraeginthus angolensis",
            "video": "http://dummyimage.com/175x184.png/ff4444/ffffff",
            "duration": 2,
            "description": "Other reactive arthropathies, unspecified site"
          }
        ]
      },
      {
        "header": "Statistician I",
        "totalMinutes": 71751,
        "contents": [
          {
            "contentTitle": "Eudyptula minor",
            "video": "http://dummyimage.com/191x180.png/dddddd/000000",
            "duration": 8,
            "description": "Late syphilis, unspecified"
          },
          {
            "contentTitle": "Tetracerus quadricornis",
            "video": "http://dummyimage.com/206x221.png/ff4444/ffffff",
            "duration": 2,
            "description": "Toxic effect of chlorine gas, undetermined"
          },
          {
            "contentTitle": "Meles meles",
            "video": "http://dummyimage.com/190x140.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Corrosion of first degree of unspecified shoulder"
          },
          {
            "contentTitle": "Mazama gouazoubira",
            "video": "http://dummyimage.com/229x112.png/ff4444/ffffff",
            "duration": 7,
            "description": "Juvenile osteochondrosis of hip and pelvis, unsp, left leg"
          },
          {
            "contentTitle": "Nyctea scandiaca",
            "video": "http://dummyimage.com/235x240.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Matern care for or susp placntl insuff, third tri, fts4"
          },
          {
            "contentTitle": "Eubalaena australis",
            "video": "http://dummyimage.com/125x206.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Delayed or excessive hemor following incmpl spon abortion"
          },
          {
            "contentTitle": "Macropus eugenii",
            "video": "http://dummyimage.com/190x142.png/ff4444/ffffff",
            "duration": 7,
            "description": "Displaced avulsion fx left ischium, subs for fx w nonunion"
          },
          {
            "contentTitle": "Equus burchelli",
            "video": "http://dummyimage.com/189x122.png/ff4444/ffffff",
            "duration": 1,
            "description": "Echinococcosis"
          },
          {
            "contentTitle": "Felis yagouaroundi",
            "video": "http://dummyimage.com/159x229.png/cc0000/ffffff",
            "duration": 4,
            "description": "Nondisp spiral fx shaft of l fibula, 7thQ"
          },
          {
            "contentTitle": "Sula dactylatra",
            "video": "http://dummyimage.com/136x161.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Insect bite (nonvenomous) of vagina and vulva, sequela"
          },
          {
            "contentTitle": "Canis aureus",
            "video": "http://dummyimage.com/182x142.png/dddddd/000000",
            "duration": 8,
            "description": "Osteitis deformans in neoplastic diseases, thigh"
          },
          {
            "contentTitle": "Dicrostonyx groenlandicus",
            "video": "http://dummyimage.com/120x114.png/ff4444/ffffff",
            "duration": 8,
            "description": "Toxoplasma meningoencephalitis"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/221x240.png/cc0000/ffffff",
            "duration": 6,
            "description": "Maternal care for disproportion"
          },
          {
            "contentTitle": "Orcinus orca",
            "video": "http://dummyimage.com/117x133.png/dddddd/000000",
            "duration": 5,
            "description": "Fatigue fracture of vertebra, site unsp, init for fx"
          },
          {
            "contentTitle": "Didelphis virginiana",
            "video": "http://dummyimage.com/190x215.png/ff4444/ffffff",
            "duration": 6,
            "description": "Open bite, right elbow"
          },
          {
            "contentTitle": "Camelus dromedarius",
            "video": "http://dummyimage.com/223x102.png/cc0000/ffffff",
            "duration": 3,
            "description": "Explosion of unspecified explosive materials, sequela"
          },
          {
            "contentTitle": "Physignathus cocincinus",
            "video": "http://dummyimage.com/160x127.png/5fa2dd/ffffff",
            "duration": 10,
            "description": "Oth psychoactive substance dependence w persisting dementia"
          }
        ]
      },
      {
        "header": "Structural Engineer",
        "totalMinutes": 67396,
        "contents": [
          {
            "contentTitle": "Picoides pubescens",
            "video": "http://dummyimage.com/225x147.png/cc0000/ffffff",
            "duration": 9,
            "description": "Pneumonia, unspecified organism"
          },
          {
            "contentTitle": "Agouti paca",
            "video": "http://dummyimage.com/239x171.png/ff4444/ffffff",
            "duration": 7,
            "description": "Unsp fracture of shaft of humerus, left arm, init"
          },
          {
            "contentTitle": "Colaptes campestroides",
            "video": "http://dummyimage.com/179x170.png/dddddd/000000",
            "duration": 4,
            "description": "Nicotine dependence, other tobacco product, in remission"
          },
          {
            "contentTitle": "Grus antigone",
            "video": "http://dummyimage.com/149x110.png/ff4444/ffffff",
            "duration": 7,
            "description": "Other acquired epidermolysis bullosa"
          },
          {
            "contentTitle": "Francolinus coqui",
            "video": "http://dummyimage.com/238x111.png/dddddd/000000",
            "duration": 4,
            "description": "Other sphingolipidosis"
          },
          {
            "contentTitle": "Acrobates pygmaeus",
            "video": "http://dummyimage.com/179x128.png/5fa2dd/ffffff",
            "duration": 7,
            "description": "Maternal care for breech presentation, fetus 2"
          },
          {
            "contentTitle": "unavailable",
            "video": "http://dummyimage.com/161x114.png/dddddd/000000",
            "duration": 1,
            "description": "Pressure ulcer of unspecified part of back, stage 4"
          },
          {
            "contentTitle": "Phascolarctos cinereus",
            "video": "http://dummyimage.com/103x157.png/dddddd/000000",
            "duration": 7,
            "description": "Complete traumatic transmetcrpl amp of right hand, init"
          },
          {
            "contentTitle": "Boa constrictor mexicana",
            "video": "http://dummyimage.com/210x171.png/dddddd/000000",
            "duration": 2,
            "description": "Burn of third degree of unsp scapular region, init encntr"
          },
          {
            "contentTitle": "Larus novaehollandiae",
            "video": "http://dummyimage.com/175x240.png/dddddd/000000",
            "duration": 6,
            "description": "Burn of first degree of right elbow, initial encounter"
          },
          {
            "contentTitle": "Eurocephalus anguitimens",
            "video": "http://dummyimage.com/212x244.png/ff4444/ffffff",
            "duration": 3,
            "description": "Other neonatal aspiration"
          },
          {
            "contentTitle": "Canis lupus lycaon",
            "video": "http://dummyimage.com/141x237.png/cc0000/ffffff",
            "duration": 8,
            "description": "Right upper quadrant abdominal rigidity"
          },
          {
            "contentTitle": "Phacochoerus aethiopus",
            "video": "http://dummyimage.com/247x160.png/cc0000/ffffff",
            "duration": 9,
            "description": "Legal intervnt w injury by explosv shell, suspect injured"
          },
          {
            "contentTitle": "Tauraco porphyrelophus",
            "video": "http://dummyimage.com/151x226.png/ff4444/ffffff",
            "duration": 3,
            "description": "Fistula of gallbladder"
          },
          {
            "contentTitle": "Choloepus hoffmani",
            "video": "http://dummyimage.com/182x232.png/5fa2dd/ffffff",
            "duration": 1,
            "description": "Adhesions and ankylosis of left temporomandibular joint"
          },
          {
            "contentTitle": "Oncorhynchus nerka",
            "video": "http://dummyimage.com/100x181.png/ff4444/ffffff",
            "duration": 9,
            "description": "Oth fx shaft of rad, right arm, init for opn fx type 3A/B/C"
          }
        ]
      },
      {
        "header": "Chemical Engineer",
        "totalMinutes": 48141,
        "contents": [
          {
            "contentTitle": "Cynomys ludovicianus",
            "video": "http://dummyimage.com/195x237.png/dddddd/000000",
            "duration": 6,
            "description": "Superficial foreign body of fingers"
          },
          {
            "contentTitle": "Dasypus novemcinctus",
            "video": "http://dummyimage.com/197x151.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Abrasion of right middle finger, initial encounter"
          },
          {
            "contentTitle": "Loxodonta africana",
            "video": "http://dummyimage.com/114x193.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Sprain of sacroiliac joint"
          },
          {
            "contentTitle": "Canis lupus lycaon",
            "video": "http://dummyimage.com/238x196.png/5fa2dd/ffffff",
            "duration": 8,
            "description": "Other specified injuries of pelvis, initial encounter"
          },
          {
            "contentTitle": "Gabianus pacificus",
            "video": "http://dummyimage.com/112x227.png/cc0000/ffffff",
            "duration": 8,
            "description": "Breakdown (mechanical) of heart valve prosthesis"
          },
          {
            "contentTitle": "Vulpes vulpes",
            "video": "http://dummyimage.com/186x140.png/cc0000/ffffff",
            "duration": 2,
            "description": "Injury of nerves at shldr/up arm, right arm, subs"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/116x193.png/ff4444/ffffff",
            "duration": 1,
            "description": "Pasngr in 3-whl mv injured in clsn w ped/anml in traf, subs"
          },
          {
            "contentTitle": "Crocodylus niloticus",
            "video": "http://dummyimage.com/113x145.png/ff4444/ffffff",
            "duration": 8,
            "description": "ABO incompatibility w acute hemolytic transfusion reaction"
          },
          {
            "contentTitle": "Panthera onca",
            "video": "http://dummyimage.com/198x170.png/dddddd/000000",
            "duration": 8,
            "description": "Maternal care for face, brow and chin presentation, fetus 3"
          },
          {
            "contentTitle": "Varanus salvator",
            "video": "http://dummyimage.com/108x120.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Antihypertensive drugs"
          },
          {
            "contentTitle": "Hippotragus niger",
            "video": "http://dummyimage.com/147x193.png/cc0000/ffffff",
            "duration": 6,
            "description": "Balloon collision injuring occupant, initial encounter"
          },
          {
            "contentTitle": "Nasua nasua",
            "video": "http://dummyimage.com/221x167.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Acute gastritis"
          },
          {
            "contentTitle": "Pseudalopex gymnocercus",
            "video": "http://dummyimage.com/211x126.png/ff4444/ffffff",
            "duration": 1,
            "description": "Injury of nerves and spinal cord at neck level"
          },
          {
            "contentTitle": "Lycaon pictus",
            "video": "http://dummyimage.com/102x143.png/ff4444/ffffff",
            "duration": 10,
            "description": "Toxic effect of petroleum products, assault, subs encntr"
          },
          {
            "contentTitle": "Manouria emys",
            "video": "http://dummyimage.com/250x120.png/5fa2dd/ffffff",
            "duration": 6,
            "description": "Postdysenteric arthropathy, unspecified knee"
          }
        ]
      },
      {
        "header": "Geologist I",
        "totalMinutes": 4218,
        "contents": [
          {
            "contentTitle": "Oryx gazella",
            "video": "http://dummyimage.com/219x105.png/ff4444/ffffff",
            "duration": 10,
            "description": "Driver of pk-up/van injured in clsn w statnry object in traf"
          },
          {
            "contentTitle": "Bison bison",
            "video": "http://dummyimage.com/145x175.png/dddddd/000000",
            "duration": 2,
            "description": "Breakdown (mechanical) of int fix of bone of r forearm, init"
          },
          {
            "contentTitle": "Ctenophorus ornatus",
            "video": "http://dummyimage.com/156x205.png/5fa2dd/ffffff",
            "duration": 3,
            "description": "Hemorrhage in early pregnancy, unspecified"
          },
          {
            "contentTitle": "Cacatua tenuirostris",
            "video": "http://dummyimage.com/160x120.png/5fa2dd/ffffff",
            "duration": 5,
            "description": "Medial dislocation of right ulnohumeral joint, subs encntr"
          },
          {
            "contentTitle": "Sarkidornis melanotos",
            "video": "http://dummyimage.com/113x195.png/cc0000/ffffff",
            "duration": 7,
            "description": "Tetanus neonatorum"
          },
          {
            "contentTitle": "Branta canadensis",
            "video": "http://dummyimage.com/234x188.png/dddddd/000000",
            "duration": 9,
            "description": "Injury of radial nerve at upper arm level, left arm, subs"
          },
          {
            "contentTitle": "Anitibyx armatus",
            "video": "http://dummyimage.com/206x238.png/cc0000/ffffff",
            "duration": 4,
            "description": "Other abnormal cytological findings on specimens from anus"
          },
          {
            "contentTitle": "Ephipplorhynchus senegalensis",
            "video": "http://dummyimage.com/191x250.png/cc0000/ffffff",
            "duration": 7,
            "description": "Oth fx low end l tibia, 7thN"
          },
          {
            "contentTitle": "Paraxerus cepapi",
            "video": "http://dummyimage.com/246x185.png/ff4444/ffffff",
            "duration": 8,
            "description": "Right temporomandibular joint disorder, unspecified"
          },
          {
            "contentTitle": "Macropus agilis",
            "video": "http://dummyimage.com/104x157.png/cc0000/ffffff",
            "duration": 4,
            "description": "Corros third deg of unsp site r low limb, ex ank/ft, sqla"
          },
          {
            "contentTitle": "Heloderma horridum",
            "video": "http://dummyimage.com/119x217.png/ff4444/ffffff",
            "duration": 1,
            "description": "Nondisp transverse fx shaft of humer, l arm, 7thK"
          }
        ]
      }
    ]
  }
]

export default MyCourses;