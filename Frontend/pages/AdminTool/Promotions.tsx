import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Input from "../../components/shared/Input/Input";
import SideBar from "../../components/AdminTool/SideBar";
import AdminHeader from "../../components/AdminTool/AdminHeader";
import classNames from "classnames";
import CompPagination from "../../components/shared/pagination/CompPagination";
import Courses from "../Courses";

type Props = {};
var response = null;


const Promotions = (props: Props) => {
  const [courses, setCourses] = useState<any>();
  const [selectedCourses, setSelectedCourses] = useState<any>();
  const [checkedState, setCheckedState] = useState(
    new Array(5).fill(false)
);

const handleOnChange = (position:any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    console.log(checkedState);
    var temp=[];
    for(let i = 0; i < courses.length; i++){
        if(checkedState[i]==true){
            temp[i] = courses[i].title;
        }
    }
    setSelectedCourses(temp);
    // selectedCourses[position] = courses[position].title;
  };


  useEffect(() => {
    const test = [
      {
        title: "Course 1",
        rating: 4,
        courseID: "6",
        instructor: "Rodin",
        price: 400,
        discountedPrice: 350,
      },
      {
        title: "Course 2",
        rating: 3,
        courseID: "1",
        instructor: "Salem",
        price: 250,
        discountedPrice: 250,
      },
      {
        title: "Course 3",
        rating: 2,
        courseID: "3",
        instructor: "Sasa",
        price: 600,
        discountedPrice: 400,
      },
      {
        title: "Course 4",
        rating: 1,
        courseID: "4",
        instructor: "Haytham",
        price: 400,
        discountedPrice: 350,
      },
      {
        title: "Course 5",
        rating: 3,
        courseID: "1",
        instructor: "Rodin Salem",
        price: 250,
        discountedPrice: 250,
      },
    ];
    setCourses(test);
  }, []);

//   console.log(courses);

  function go() {}
  function closeModal() {
    const modal = document.getElementById("selectedCourses");
    if (modal != undefined) {
      modal.style.display = "none";
    }
  }
  function viewModal() {
    const modal = document.getElementById("selectedCourses");
    
    if (modal != undefined) {
      modal.style.display = "";
    }
  }
  function closeAll() {
    const modal = document.getElementById("allCourses");
    if (modal != undefined) {
      modal.style.display = "none";
    }
  }
  function viewAll() {
    const modal = document.getElementById("allCourses");
    if (modal != undefined) {
      modal.style.display = "";
    }
  }
  function addSome() {
    const modal = document.getElementById("selectedCourses");
    var temp=[];
    for(let i = 0; i < courses.length; i++){
        if(checkedState[i]==true){
            temp[i] = courses[i].title;
           
        }
    }
    console.log(temp);
    if (modal != undefined) {
      modal.style.display = "none";
    }
  }
  function addAll() {
    const modal = document.getElementById("allCourses");
    if (modal != undefined) {
      modal.style.display = "none";
    }
  }
  return (
    <aside>
      <AdminHeader />
      <div className="flex">
        <SideBar></SideBar>
        <form
          id="course-form"
          className="w-full mx-4"
        >
          <div className="row tab mx-auto pt-10 bg-main h-full w-full rounded-t-2xl shadow-xl ">
            <h6 className="text-center text-2xl text-navbar">Courses</h6>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-6"></th>
                    <th scope="col" className="py-3 px-6">
                      Course Title
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Instructor
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Price
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Discounted Price
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Ratings
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses?.map((course: any, index: number) => (
                    <tr className="bg-white border-b">
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            id={"checkbox-table-" + index}
                            checked={checkedState[index]}
                            onChange={() =>handleOnChange(index)}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"
                          />
                          <label htmlFor="checkbox-table" className="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {course.title}
                      </th>
                      <td className="py-4 px-6">{course.instructor}</td>
                      <td className="py-4 px-6">{course.price}</td>
                      <td className="py-4 px-6">{course.discountedPrice}</td>
                      <td className="py-4 px-6">{course.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                  id="selectedCourses"
                  style={{ display: "none" }}
                  className="fixed top-0 left-0 right-0 z-50 w-full p-[425px] py-40  md:inset-0 h-modal md:h-full backdrop-blur-[2px] bg-black bg-opacity-90"
                >
                  <div className=" relative w-full h-full max-w-2xl md:h-auto">
                    <div className="relative bg-[#F4F4F4] rounded-lg shadow">
                      <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Add Promotions to the selected courses :
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                          onClick={() => closeModal()}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      {selectedCourses?.map((selectedCourse: any, index: number) => (<div><p className="px-6 py-2">{selectedCourse}</p></div>))}
                          <Input
                            required={true}
                            placeholder={"Discount Percentage *"}
                          />

                      <div className="flex justify-center p-6 space-x-2 rounded-b">
                        <button
                          type="button"
                          onClick={addSome}
                          className="flex justify-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Add Discount
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="allCourses"
                  style={{ display: "none" }}
                  className=" fixed top-0 left-0 right-0 z-50 w-full p-[425px] py-40 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur-[2px] bg-black bg-opacity-90"
                >
                  <div className=" relative w-full h-full max-w-2xl md:h-auto">
                    <div className="relative bg-[#F4F4F4] rounded-lg shadow">
                      <div className="flex items-start justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                          Add Promotions to All courses On the System
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                          onClick={() => closeAll()}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                          <Input
                            required={true}
                            placeholder={"Discount Percentage *"}
                          />
                      <div className="flex justify-center p-6 space-x-2 rounded-b">
                        <button
                          type="button"
                          onClick={addAll}
                          className="flex justify-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          Add Discount
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="flex flex-row-reverse space-x-4 space-x-reverse pt-4">
                <button
                  onClick={viewAll}
                  type="button"
                  className="flex justify-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add Promotions To All
                </button>
                <button
                  onClick={viewModal}
                  type="button"
                  className="flex justify-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add Promotion
                </button>
              </div>
            </div>

            <CompPagination totalCount={20 * 5} Setter={go} FromLink={false} />
          </div>
        </form>
      </div>
      <script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></script>
    </aside>
  );
};

export default Promotions;
