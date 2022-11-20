import React, { useContext, useRef } from 'react';
import classNames from 'classnames';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { AddNewCourseContext } from '../../../../pages/Instructor/AddNewCourse';

type Props = {
    submit: any,
}

const FormNavigation = (props: Props) => {

    const { addNewCourseSteps, currentStep, setCurrentStep, newCourseInfo, subtitles } = useContext(AddNewCourseContext);
    const prevStepRef = useRef<any>();
    const nextStepRef = useRef<any>();
    const submitNewCourseRef = useRef<any>();
    var moveForward = true;

    const titleRef = useRef<any>();
    const subjectRef = useRef<any>();
    const priceRef = useRef<any>();
    const summaryRef = useRef<any>();
    const radioRef = useRef<any>(null);

    const prev = () => {
        if(currentStep === 0)
            return;
        if(currentStep === addNewCourseSteps.length - 1) {
            nextStepRef.current.classList.remove('hidden');
            submitNewCourseRef.current.classList.add('hidden');
        }
        addNewCourseSteps[currentStep].current.classList.add('hidden');
        addNewCourseSteps[currentStep - 1].current.classList.remove('hidden');
        setCurrentStep(currentStep - 1);
    }

    const next = () => {
        if(currentStep === addNewCourseSteps.length - 1)
            return;
        
        if(currentStep === addNewCourseSteps.length - 2) {
            nextStepRef.current.classList.add('hidden');
            submitNewCourseRef.current.classList.remove('hidden');
        }

        addNewCourseSteps[currentStep].current.classList.add('hidden');
        addNewCourseSteps[currentStep + 1].current.classList.remove('hidden');
        setCurrentStep(currentStep + 1);
    }

    function checkRequiredCourseInfo() {
        for(var key in newCourseInfo) {
            if(newCourseInfo[key] === '') {
                return false;
            }
        }
    }

  return (
    <div className={formNavigation}>
        <p id='error-message' className='text-red-700 h-auto text-center'></p>
        <button ref={prevStepRef} type="button" className={previousButton} onClick={prev}>
            <BsArrowLeft className={`${buttonIcon} right-2`} />
            Previous
        </button>
        <button ref={nextStepRef} type="button" className={nextButton} onClick={next}>
            Next
            <BsArrowRight className={`${buttonIcon} left-2`} />
        </button>
        <button ref={submitNewCourseRef} type='submit' form='add-new-course-form' onClick={checkRequiredCourseInfo} className={submitButton} id='submit-btn'>
            <span /><span /><span /><span />
            Submit
        </button>
    </div>
  )
}

const formNavigation = classNames('text-center mt-6 mx-auto min-w-max flex items-center justify-center');
const previousButton = classNames('inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white');
const nextButton = classNames('inline-flex h-10 mb-4 items-center py-2 px-4 ml-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-800 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700');
const submitButton = classNames('hidden mb-4 text-lg hover:bg-input hover:text-white hover:rounded-md h-10 items-center py-2 px-4 ml-3 font-medium text-input bg-transparent');
const buttonIcon = classNames('scale-160 relative bottom-px');

export default FormNavigation;