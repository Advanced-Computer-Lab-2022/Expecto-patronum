import axios from 'axios';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react'
import { ApiUrl } from '../../constants/constants';
import ErrorPasswordChange from './ErrorPasswordChange';

type Props = {
  token:string
}

function ResetPassword (props: Props) {
 
  const [Error,setError]=React.useState<{Error:boolean,Message:string}>({Error:false,Message:""});
  const[Loading,setLoading]=React.useState(false);
  let PasswordRef=React.useRef<HTMLInputElement>(null);
  let reWritePasswordRef=React.useRef<HTMLInputElement>(null);
  let router=useRouter();
  
  async function submit(){
    let Password=PasswordRef.current?.value;
    let reWritePassword=reWritePasswordRef.current?.value;
    if(Password!==reWritePassword){
      console.log("Password doesn't match");
    }
    else{
      setLoading(true)
      await axios
      .post(`${ApiUrl}/User/ChangeForgottenPassword/${props.token}`, {
        password: Password
      })
      .then((res: { data: {Error:boolean,Message:string}|undefined }) => {
        setLoading(false)
        if(res.data){
          if(!res.data.Error){

            router.push("/Login");
          }
          else{
            setError({Error:true,Message:res.data.Message});
          }
        }
      });

    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    {Error.Error?
    <ErrorPasswordChange Message={Error.Message}/>
    :
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
           Reset password    
           </h1>
             <form  onSubmit={(e:any)=>e.preventDefault()} className="space-y-4 md:space-y-6" >
             <div>
               <label
                 htmlFor="password"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 new Password
               </label>
               <input
               ref={PasswordRef}
                 type="password"
                 name="password"
                 id="password"
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="password"
                 required={true}
               />
             </div>
             <div>
               <label
                 htmlFor="password"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               rewrite new Password
               </label>
               <input
               ref={reWritePasswordRef}
                 type="password"
                 name="password"
                 id="password"
                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="password"
                 required={true}
               />
             </div>
 
             <button
               type="submit"
               onClick={submit}
               className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
             >
                Reset Password
             </button>
          
           </form>
         
        
    </div>
    }
      </div>
    </div>
  </section>
  )
  
}




export default ResetPassword