import React, { useContext, useRef } from 'react';
import classNames from 'classnames';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { AddNewCourseContext } from '../../../../pages/Instructor/AddNewCourse';
import { PopupMessageContext } from '../../../../pages/_app';

type Props = {
    submit: any,
}

const FormNavigation = (props: Props) => {

    const { addNewCourseSteps, currentStep, setCurrentStep, newCourseInfo, subtitles, titleRef, subjectRef, priceRef, summaryRef, levelRef, courseVideoRef, errorMessageRef } = useContext(AddNewCourseContext);
    const prevStepRef = useRef<any>();
    const nextStepRef = useRef<any>();
    const submitNewCourseRef = useRef<any>();
    const { viewPopupMessage } = useContext(PopupMessageContext);

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
        
        if(!checkRequiredCourseInfo()) {
            viewPopupMessage('Please fill in the required fields.');
            return;
        }

        if(currentStep === addNewCourseSteps.length - 2) {
            nextStepRef.current.classList.add('hidden');
            submitNewCourseRef.current.classList.remove('hidden');
        }

        addNewCourseSteps[currentStep].current.classList.add('hidden');
        addNewCourseSteps[currentStep + 1].current.classList.remove('hidden');
        setCurrentStep(currentStep + 1);
    }

    function checkRequiredCourseInfo() {
        var moveForward = true;
        for(var key in newCourseInfo) {
            if(newCourseInfo[key] === '') {
                moveForward = false;
                switch(key) {
                    case 'title': titleRef.current.children[0].style.color = 'rgb(185, 28, 28)';
                    case 'subject': subjectRef.current.children[0].style.color = 'rgb(185, 28, 28)';
                    case 'price': priceRef.current.children[0].style.color = 'rgb(185, 28, 28)';
                    case 'courseVideoURL': courseVideoRef.current.children[0].style.color = 'rgb(185, 28, 28)';
                    case 'summary': summaryRef.current.children[0].style.color = 'rgb(185, 28, 28)';
                    case 'level': levelRef.current.children[0].style.color = 'rgb(185, 28, 28)';
                }
            }
        }
        return moveForward;
    }

  return (
    <div className={formNavigation}>
        <p ref={errorMessageRef} className='text-red-700 h-auto mb-4 text-center'></p>
        <div className='flex items-center'>
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
    </div>
  )
}

const formNavigation = classNames('text-center mt-6 mx-auto min-w-max flex flex-col items-center justify-center');
const previousButton = classNames('inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white');
const nextButton = classNames('inline-flex h-10 mb-4 items-center py-2 px-4 ml-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-800 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700');
const submitButton = classNames('hidden mb-4 text-lg hover:bg-input hover:text-white hover:rounded-md h-10 items-center py-2 px-4 ml-3 font-medium text-input bg-transparent');
const buttonIcon = classNames('scale-160 relative bottom-px');

export default FormNavigation;