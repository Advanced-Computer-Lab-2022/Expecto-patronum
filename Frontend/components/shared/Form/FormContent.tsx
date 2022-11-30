import React from 'react'

type Props = {
  Submit: any,
  Inputs: { ref: any, name: string, label?: string, placeholder: string, required: boolean }[],
  ButtonText: string
}

const FormContent = (props: Props) => {
  return (
    <form onSubmit={props.Submit} className="space-y-4 md:space-y-6" action="#">
      {props.Inputs.map((input, index) => {
        return (
          <div key={index}>
            <label
              htmlFor={input.name}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {input.label ? input.label : input.name}
            </label>
            <input
              type={input.name}
              name={input.name}
              id={input.name}
              ref={input.ref}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={input.placeholder}
              required={input.required}
            />
          </div>
        )
      })
      }
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {props.ButtonText}
      </button>

    </form>
  )
}

export default FormContent