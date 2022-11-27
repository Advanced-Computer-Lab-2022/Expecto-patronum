import React from 'react'

type Props = {}

const EmailSent = (props: Props) => {
  return (
    <div  className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Reset password email sent
           </h1>
           <p className='text-white'>
           You should soon receive an email 
           allowing you to reset your password. Please make sure to check your spam and trash if you can't find the email.
           </p>
    </div>
  )
}

export default EmailSent