import React, { useState } from 'react';
import classNames from 'classnames';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

type Props = {}

const FormNavigation = (props: Props) => {

    const [type, setType] = useState<"button" | "submit" | "reset" | undefined>("button");

  return (
    <div>
        <p id='error-message' className='text-red-700 h-auto text-center'></p>

        <div className={formNavigation}>
            <button id='prev-btn' type="button" className={previousButton}>
                <BsArrowLeft className={`${buttonIcon} right-2`} />
                Previous
            </button>

            <button id='next-btn' type="button" className={nextButton}>
                Next
                <BsArrowRight className={`${buttonIcon} left-2`} />
            </button>

            <button id='submit-btn' type={type} className={submitButton}>
                <span /><span /><span /><span />Submit
            </button>
        </div>
    </div>
  )
}

const formNavigation = classNames('text-center mt-12 mx-auto min-w-max');
const previousButton = classNames('inline-flex h-10 mb-4 items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white relative top-1');
const nextButton = classNames('inline-flex h-10 mb-4 items-center py-2 px-4 ml-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-800 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700');
const submitButton = classNames('hidden text-lg hover:bg-navlink-bg hover:text-white hover:rounded-md h-10 mb-4 items-center py-2 px-4 ml-3 font-medium text-navlink-bg bg-transparent');
const buttonIcon = classNames('scale-160 relative bottom-px');

export default FormNavigation;