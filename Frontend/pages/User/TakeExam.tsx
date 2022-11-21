import React, { useState, useRef } from "react";
import axios from "axios";
// import Input from "../components/shared/Input/Input";

type Props = {};

var isReset = false;
var response = null;

const Exam = (props: Props) => {
  const [characterLeft, setCharacterLeft] = useState(250);
  const [index, setIndex] = useState<number>(0);
  const [type, setType] = useState<"button" | "submit" | "reset" | undefined>(
    "button"
  );

  const labelRef = useRef<any>();
  const textareaRef = useRef<any>();

  function moveLabel() {
    labelRef.current.style.bottom = "9rem";
    labelRef.current.style.color = "rgb(255, 255, 255)";
    labelRef.current.style.fontSize = "0.86rem";
    labelRef.current.style.transition =
      "font-size 1s, bottom 1s, color 0.5s linear 0.3s";
  }

  function returnToInitial(e: React.FocusEvent<HTMLTextAreaElement, Element>) {
    if (e.target.value === "") {
      labelRef.current.style.bottom = "8rem";
      labelRef.current.style.color = "rgb(156, 163, 175)";
      labelRef.current.style.fontSize = "initial";
      labelRef.current.style.transition =
        "font-size 1s, bottom 1s, color 0.5s linear 0.3s";
    }
  }

  function goToPrev() {
    const tabs = document.getElementsByClassName("tab");

    if (index > 0) {
      tabs[index].setAttribute("style", "display: none");
      tabs[index - 1].setAttribute("style", "display: inline-flex");
      setIndex(index - 1);
    }

    if (index <= tabs.length - 1) {
      const next = document.getElementById("next-btn");

      if (next != undefined) {
        next.style.display = "inline-flex";
      }

      const submit = document.getElementById("submit-btn");

      if (submit != undefined) {
        submit.style.display = "none";
      }
    }
  }

  function goToNext() {
    const tabs = document.getElementsByClassName("tab");
    const inputFields = document.getElementsByClassName(
      "create-course-input"
    ) as HTMLCollectionOf<HTMLElement>;

    var missing = false;
    if (index === 0) {
      for (let i = 0; i < inputFields.length; i++) {
        const field = inputFields[i] as HTMLTextAreaElement | HTMLInputElement;
        if (field.value === "") {
          const label = document.getElementsByClassName(
            "create-course-input-label"
          )[i] as HTMLLabelElement;
          label.style.color = "#B91C1C";
          missing = true;
        }
      }
      const error = document.getElementById("error-message");
      if (missing) {
        if (error != undefined)
          error.innerHTML =
            "Please fill in the required fields marked with a '*'.";
        isReset = false;
        return;
      }
    }

    if (index < tabs.length - 1) {
      setType("button");
      tabs[index].setAttribute("style", "display: none");
      tabs[index + 1].setAttribute("style", "display: inline-flex");
      setIndex(index + 1);
    }

    if (index === tabs.length - 2) {
      const next = document.getElementById("next-btn");

      if (next != undefined) {
        next.style.display = "none";
      }

      const submit = document.getElementById("submit-btn");

      if (submit != undefined) {
        submit.style.display = "inline-flex";
        setType("submit");
      }
    }
  }

  function resetError(e: React.FormEvent<HTMLFormElement>) {
    const error = document.getElementById("error-message");

    if (error != undefined) error.innerHTML = "";

    isReset = true;
  }

  async function submitExam(e: React.FormEvent<HTMLFormElement>) {
    const inputFields = document.getElementsByClassName(
      "create-course-input"
    ) as HTMLCollectionOf<HTMLElement>;

    e.preventDefault();
    axios.defaults.withCredentials = true;
    response = await axios
      .post("http://localhost:5000/Course/CreateCourse", {
        title: (inputFields[0] as HTMLTextAreaElement | HTMLInputElement).value,
        subject: (inputFields[1] as HTMLTextAreaElement | HTMLInputElement)
          .value,
        instructorName: (
          inputFields[2] as HTMLTextAreaElement | HTMLInputElement
        ).value,
        price: (inputFields[3] as HTMLTextAreaElement | HTMLInputElement).value,
        level: (inputFields[4] as HTMLTextAreaElement | HTMLInputElement).value,
        courseHours: (inputFields[5] as HTMLTextAreaElement | HTMLInputElement)
          .value,
        summary: (inputFields[6] as HTMLTextAreaElement | HTMLInputElement)
          .value,
      })
      .then((res) => {
        return res.data;
      });
  }

  return (
    <form
      id="course-form"
      className="row mx-4 py-10 h-full"
      onSubmit={(e) => submitExam(e)}
      onChange={(e) => (!isReset ? resetError(e) : {})}
    >
      <div className="row tab mx-auto pt-10 bg-[#01091F] w-700 rounded-t-2xl shadow-xl">
      <h2 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">1.How much do you expect to use each month?</h2>
<ul className="grid gap-6 w-full md:grid-cols-2">
    <li>
        <input type="radio" id="A1" name="Q1" value="A1" className="hidden peer" required/>
        <label htmlFor="A1" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-[#03DAC5] peer-checked:border-[#03DAC5] peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 bg-[#141B2E] dark:hover:bg-gray-700">                           
            <div className="block">
                <div className="w-full text-lg font-semibold">A)</div>
                <div className="w-full">Good for small websites</div>
            </div>
        </label>
    </li>
    <li>
        <input type="radio" id="B1" name="Q1" value="B1" className="hidden peer"/>
        <label htmlFor="B1" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="block">
                <div className="w-full text-lg font-semibold">B)</div>
                <div className="w-full">Good for large websites</div>
            </div>
        </label>
    </li>
    <li>
        <input type="radio" id="C1" name="Q1" value="C1" className="hidden peer"/>
        <label htmlFor="C1" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div className="block"> 
                <div className="w-full text-lg font-semibold">C)</div>
                <div className="w-full">Good for small websites</div>
            </div>
        </label>
    </li>
    <li>
        <input type="radio" id="D1" name="Q1" value="D1" className="hidden peer"/>
        <label htmlFor="D1" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="block">
                <div className="w-full text-lg font-semibold">D)</div>
                <div className="w-full">Good for large websites</div>
            </div>
        </label>
    </li>
</ul>
      </div>

      <div
        style={{ display: "none" }}
        className="row tab mx-auto pt-10 bg-[#01091F] w-700 rounded-t-2xl shadow-xl h-full"
      >
        <h2 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">2.How much do you expect to use each month?</h2>
<ul className="grid gap-6 w-full md:grid-cols-2">
    <li>
        <input type="radio" id="A2" name="Q2" value="A2" className="hidden peer" required/>
        <label htmlFor="A2" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-[#03DAC5] peer-checked:border-[#03DAC5] peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 bg-[#141B2E] dark:hover:bg-gray-700">                           
            <div className="block">
                <div className="w-full text-lg font-semibold">A)</div>
                <div className="w-full">Good for small websites</div>
            </div>
        </label>
    </li>
    <li>
        <input type="radio" id="B2" name="Q2" value="B2" className="hidden peer"/>
        <label htmlFor="B2" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="block">
                <div className="w-full text-lg font-semibold">B)</div>
                <div className="w-full">Good for large websites</div>
            </div>
        </label>
    </li>
    <li>
        <input type="radio" id="C2" name="Q2" value="C2" className="hidden peer"/>
        <label htmlFor="C2" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div className="block"> 
                <div className="w-full text-lg font-semibold">C)</div>
                <div className="w-full">Good for small websites</div>
            </div>
        </label>
    </li>
    <li>
        <input type="radio" id="D2" name="Q2" value="D2" className="hidden peer"/>
        <label htmlFor="D2" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="block">
                <div className="w-full text-lg font-semibold">D)</div>
                <div className="w-full">Good for large websites</div>
            </div>
        </label>
    </li>
</ul>
      </div>

      <div
        style={{ display: "none" }}
        className="row tab mx-auto pt-10 bg-navbar w-700 rounded-t-2xl shadow-xl "
      >
        <h1 className="text-center text-3xl pb-6 text-white">
          Choose Course Icon
        </h1>
        
      </div>

      <div className="mx-auto w-700 rounded-b-2xl bg-[#01091F]">
        <p
          id="error-message"
          className="text-red-700 h-auto mb-2 text-center"
        ></p>
        <div className="text-center flex justify-center ">
          <button
            id="prev-btn"
            type="button"
            onClick={goToPrev}
            className="inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </button>
          <button
            id="next-btn"
            type="button"
            onClick={goToNext}
            className="inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg
              aria-hidden="true"
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            id="submit-btn"
            type={type}
            className="hidden text-lg hover:bg-navlink-bg hover:text-gray-900 hover:rounded-md h-10 mb-4 items-center py-2 px-4 ml-3 font-medium text-navlink-bg bg-transparent"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Exam;
