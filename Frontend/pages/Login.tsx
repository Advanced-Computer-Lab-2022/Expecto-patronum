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
