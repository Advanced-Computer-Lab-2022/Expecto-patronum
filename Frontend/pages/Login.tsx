import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaTwitter, FaCanadianMapleLeaf } from "react-icons/fa";

// const navLogoDiv = classNames(
//   "nv-max:absolute z-behind sb-max:overflow-hidden sb-max:w-[3.75rem] transition-all duration-300"
// );
// const navLogo = classNames("h-20 w-fit min-w-fit");

const colIcons = classNames(`text-sm p-1.25 flex items-center justify-center m-2 mx-3 z-0 scale-125 rounded-full border-1.5 before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1 before:right-2.75 before:w-6 before:h-6  before:rounded-full hover:scale-135 transition-all duration-300`);

const Login = () => {

  const leftSideRef = useRef<any>();
  const rightSideRef = useRef<any>();

  useEffect(() => {
    leftSideRef.current.classList.remove('opacity-0');
    leftSideRef.current.classList.add('opacity-100');

    leftSideRef.current.classList.add('sb-max:h-[25rem]');

    rightSideRef.current.classList.remove('sb:left-[50rem]');
    rightSideRef.current.classList.add('sb:left-0');

  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#B80621] to-calm-red">
      <div ref={leftSideRef} className="bg-gradient-to-b from-[#B80621] to-calm-red opacity-0 text-center sb:inline-block sb:align-top h-screen sb:w-1/2 w-full sb:pt-20 sb-max:mb-4 px-4 pt-10 text-white transition-[height,_opacity] duration-1000">
        <h1 className="text-4xl">Welcome To </h1>
        <div className="p-2 rounded-full bg-white mx-auto sb:mt-20 mt-10 w-fit scale-[3]"><FaCanadianMapleLeaf className="text-canadian-red scale-120" /></div>
        <p className="mt-9 text-xl">CanCham Learning System</p>
        <p className="sb:mx-16 sb:mt-20 mt-8">We provide an online learning platform for students all across the world as well as opportunities for instructors to help others by publishing their own courses.</p>
      </div>

      <div ref={rightSideRef} className="bg-white relative sb:left-[50rem] sb:inline-block sb:align-top sb:h-screen sb:w-1/2 w-full h-full transition-[left] duration-1000">
        <div className="bg-white absolute scale-y-125 4lg:scale-y-200 4lg:top-[55%] top-28 sb-max:-top-60 mob:-right-[48%] not-mob:right-[-83.5%] from-mob-to-sb:scale-x-[1.7] scale-x-[1] right-0 sb:left-0 sb-max:h-max h-full w-full">
          <div className="h-96 absolute left-0 sb-max:rotate-90 z-[-1]">
              <Circle className="bg-white -left-11 -top-16 h-28 w-28" />
              <Circle className="bg-white -left-2.5 bottom-10 h-28 w-28" />
              <Circle className="bg-white -left-10 -bottom-14 h-32 w-32" />
              <Circle className="bg-white -left-7 bottom-8 h-10 w-10" />
              <Circle className="bg-white -left-7 bottom-11 h-19 w-18" />
              <Circle className="bg-white -left-2.5 bottom-32 h-6 w-6" />
              <Circle className="bg-white -left-3 bottom-27 h-6 w-6" />
              <Circle className="bg-white -left-3.5 top-26 h-44 w-40" />
              <Circle className="bg-white -left-4 top-0 h-34 w-34" />
              <Circle className="bg-white -left-6 top-5 h-10 w-10" />
              <Circle className="bg-white -left-2 top-26 h-10 w-10" />
          </div>
          <div className="h-60 absolute top-[4.5rem] left-0 sb-max:rotate-90 z-[-2]">
            <Circle className="bg-[#ff9595] -left-10 -top-16 h-16 w-20" />
            <Circle className="bg-[#ff9595] -left-4 top-4 h-8 w-8" />
            <Circle className="bg-[#ff9595] -left-6 bottom-4 h-30 w-20 rotate-6" />
            <Circle className="bg-[#ff9595] -left-9 -bottom-1 h-8 w-8" />
            <Circle className="bg-[#ff9595] -left-11 -bottom-14 h-20 w-10 rotate-[18deg]" />
          </div>
          <div className="h-72 absolute top-[3rem] left-0 sb-max:rotate-90 z-[-3]">
            <Circle className="bg-[#ff4040] -left-12 -top-11 h-18 w-14" />
            <Circle className="bg-[#ff4040] -left-8 top-7 -rotate-12 h-22 w-14" />
            <Circle className="bg-[#ff4040] -left-7 top-24 h-10 w-6 -rotate-45" />
            <Circle className="bg-[#ff4040] -left-9 top-30 h-8 w-10" />
            <Circle className="bg-[#ff4040] -left-9 top-34 rotate-12 h-22 w-14" />
            <Circle className="bg-[#ff4040] -left-9 bottom-11 h-8 w-10" />
            <Circle className="bg-[#ff4040] -left-12 -bottom-13 h-28 w-20 -rotate-[35deg]" />
            <Circle className="bg-[#ff4040] -left-18 -bottom-14 h-20 w-30 -rotate-[160deg]" />
          </div>
        </div>


        <div className="bg-white mx-auto w-10/12 min-w-[60%] z-10 relative text-center sb:pt-20 sb:px-4 sb-max:px-0 pt-8 pb-8">
          <div className="w-fit mx-auto text-left whitespace-nowrap">
            <h1 className="text-3xl">Sign in to your account</h1>
            <p className="text-sm">Or <a className="text-blue-600 hover:text-blue-800">Don't have an account? Sign up</a></p>
          </div>

          <form action="#" method="POST" id="sign-in" className="mt-6 space-y-4">
            <div className="flex flex-col text-left">
              <label className="text-lg mb-1">E-mail Address</label>
              <input className="border-b-2 bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your email" type='email' required />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-lg mb-1">Password</label>
              <input className="border-b-2 bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your password" type='password' />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center justify-center">
                <input className="mr-2 relative bottom-[0.06125rem]" type='checkbox' />
                <p>Remember me</p>
              </div>
              <a className="text-blue-600 hover:text-blue-800">Forgot your password?</a>
            </div>

            <div className="flex justify-end items-center">
              <input className="mr-2 relative sb:bottom-[0.06125rem]" type='checkbox' />
              <p className="text-xs text-left">By signing, You agree with the <a className="text-blue-600 hover:text-blue-800">Terms & Policy</a> of our company.</p>
            </div>

            <button type="submit" form="sign-in" className="mx-auto my-4 bg-canadian-red text-white rounded-md px-14 py-2 hover:bg-calm-red hover:scale-[1.01] transition-all duration-200">Sign In</button>

            <div className="relative">
              <hr className="bg-slate-200 border-px" />
              <label className="relative bottom-3 bg-white px-3">Or continue with</label>
            </div>

            <div className="flex items-center justify-center">
              <button className={`${colIcons} border-[#3B5998] bg-[#3B5998] text-white hover:bg-white hover:text-[#3B5998]`}><FaFacebookF /></button>
              <button className={`${colIcons} border-[#1DA1F2] bg-[#1DA1F2] text-white hover:bg-white hover:text-[#1DA1F2]`}><FaTwitter /></button>
              <button className={`${colIcons} border-[#EA4335] bg-[#EA4335] text-white hover:bg-white hover:text-[#EA4335]`}><FaGoogle /></button>
              <button className={`${colIcons} border-[#0077B5] bg-[#0077B5] text-white hover:bg-white hover:text-[#0077B5]`}><FaLinkedinIn /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div className="">
    //   <div className="min-h-screen flex">
    //     <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
    //       <div className="mx-auto w-full max-w-sm lg:w-96">
    //         <div>
    //           <div className={navLogoDiv}>
    //             <img className={navLogo} src="/images/logo.png" />
    //           </div>
    //           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
    //             Sign in to your account
    //           </h2>
    //           <p className="mt-2 text-sm text-gray-600">
    //             Or{" "}
    //             <a
    //               href="#"
    //               className="font-medium text-red-600 hover:text-blue-500"
    //             >
    //               Don't Have an Account? Sign Up
    //             </a>
    //           </p>
    //         </div>

    //         <div className="mt-8">
    //           <div>
    //             <div>
    //               <p className="text-sm font-medium text-gray-700">
    //                 Sign in with
    //               </p>

    //               <div className="mt-1 grid grid-cols-3 gap-3">
    //                 <div>
    //                   <a
    //                     href="#"
    //                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    //                   >
    //                     <span className="sr-only">Sign in with Facebook</span>
    //                     <svg
    //                       className="w-5 h-5"
    //                       aria-hidden="true"
    //                       fill="currentColor"
    //                       viewBox="0 0 20 20"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                   </a>
    //                 </div>

    //                 <div>
    //                   <a
    //                     href="#"
    //                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    //                   >
    //                     <span className="sr-only">Sign in with Twitter</span>
    //                     <svg
    //                       className="w-5 h-5"
    //                       aria-hidden="true"
    //                       fill="currentColor"
    //                       viewBox="0 0 20 20"
    //                     >
    //                       <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
    //                     </svg>
    //                   </a>
    //                 </div>

    //                 <div>
    //                   <a
    //                     href="#"
    //                     className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    //                   >
    //                     <span className="sr-only">Sign in with GitHub</span>
    //                     <svg
    //                       className="w-5 h-5"
    //                       aria-hidden="true"
    //                       fill="currentColor"
    //                       viewBox="0 0 20 20"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="mt-6 relative">
    //               <div
    //                 className="absolute inset-0 flex items-center"
    //                 aria-hidden="true"
    //               >
    //                 <div className="w-full border-t border-gray-300" />
    //               </div>
    //               <div className="relative flex justify-center text-sm">
    //                 <span className="px-2 bg-white text-red-500">
    //                   Or continue with
    //                 </span>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="mt-6">
    //             <form action="#" method="POST" className="space-y-6">
    //               <div>
    //                 <label
    //                   htmlFor="email"
    //                   className="block text-sm font-medium text-gray-700"
    //                 >
    //                   Email address
    //                 </label>
    //                 <div className="mt-1">
    //                   <input
    //                     id="email"
    //                     name="email"
    //                     type="email"
    //                     autoComplete="email"
    //                     required
    //                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                   />
    //                 </div>
    //               </div>

    //               <div className="space-y-1">
    //                 <label
    //                   htmlFor="password"
    //                   className="block text-sm font-medium text-gray-700"
    //                 >
    //                   Password
    //                 </label>
    //                 <div className="mt-1">
    //                   <input
    //                     id="password"
    //                     name="password"
    //                     type="password"
    //                     autoComplete="current-password"
    //                     required
    //                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                   />
    //                 </div>
    //               </div>

    //               <div className="flex items-center justify-between">
    //                 <div className="flex items-center">
    //                   <input
    //                     id="remember-me"
    //                     name="remember-me"
    //                     type="checkbox"
    //                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    //                   />
    //                   <label
    //                     htmlFor="remember-me"
    //                     className="ml-2 block text-sm text-gray-900"
    //                   >
    //                     Remember me
    //                   </label>
    //                 </div>

    //                 <div className="text-sm">
    //                   <a
    //                     href="#"
    //                     className="font-medium text-red-600 hover:text-blue-500"
    //                   >
    //                     Forgot your password?
    //                   </a>
    //                 </div>
    //               </div>

    //               <div>
    //                 <button
    //                   type="submit"
    //                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //                 >
    //                   Sign in
    //                 </button>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="hidden lg:block relative w-0 flex-1">
    //       <img
    //             className="absolute inset-0 h-full w-full object-cover"
    //             src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
    //             alt=""
    //           />
    //       {/* <figure className="absolute inset-0 h-full w-full object-cover transition-all duration-300 cursor-pointer filter blur-sm hover:blur-none">
    //         <a href="#">
    //           <img
    //             className="absolute inset-0 h-full w-full object-cover"
    //             src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
    //             alt=""
    //           />
    //         </a>
    //         <figcaption className="absolute bottom-96 px-96 text-lg space-y-4 text-white">

    //           <p>Don't Have an Account? Register Now</p>
    //           <button
    //             type="submit"
    //             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //           >
    //             Sign up
    //           </button>

    //         </figcaption>
    //       </figure> */}
    //     </div>
    //   </div>
    // </div>
  );
};
export default Login;

type CircleProps = {
  className: string,
}

const Circle = (props: CircleProps) => {
  return (
    <div className={`rounded-[100%] absolute ${props.className}`} />
  );
}
