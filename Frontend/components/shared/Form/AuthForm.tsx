import React from 'react'
import FormContent from './FormContent'
import FormFeedBack from './FormFeedBack'

type Props = {
  Submit: any,
  Inputs: { ref: any, type: string, name: string, label?: string, placeholder: string, required: boolean }[],
  ButtonText: string
  FormTitle: string
  Error?: { Error: boolean, Message: string, Cta?: string, CtaLink?: string }
  Success?: { Success: boolean, Message: string, Cta?: string, CtaLink?: string }
  ValidationErrors: any
}

const AuthForm = (props: Props) => {


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800
    dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {props.FormTitle}
            </h1>
            {!props.Error?.Error && !props.Success?.Success && <FormContent ValidationErrors={props.ValidationErrors} Submit={props.Submit} Inputs={props.Inputs} ButtonText={props.ButtonText} />}
            {props.Error?.Error && <FormFeedBack Data={props.Error} ></FormFeedBack>}
            {props.Success?.Success && <FormFeedBack Data={props.Success} ></FormFeedBack>}


          </div>

        </div>



      </div>
    </section>
  )
}

export default AuthForm