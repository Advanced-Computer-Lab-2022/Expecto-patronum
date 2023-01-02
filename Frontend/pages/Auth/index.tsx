import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaTwitter, FaCanadianMapleLeaf } from "react-icons/fa";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import axios from "axios";
import { GetServerSidePropsContext } from "next/types";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Spinner from "../../components/shared/spinner/Spinner";
import ErrorComp from "../../components/shared/Error/ErrorComp";
import { ApiUrl } from "../../constants/constants";
import MainButton from "../../components/shared/button/MainButton";
import PopUpMessage from "../../components/shared/PopupMessage/PopupMessage";
import { PopupMessageContext } from "../_app";
import SignUpFeedback from "./FeedBack/SignUpFeedback";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";

const colIcons = classNames(`text-sm p-1.25 flex items-center justify-center m-2 mx-3 z-0 scale-125 rounded-full border-1.5 before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1 before:right-2.75 before:w-6 before:h-6  before:rounded-full hover:scale-135 transition-all duration-300`);
const ErrorP = classNames(`text-red-500 text-sm font-semibold  mt-2`)
interface SignUp {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
  gender: string
  terms: boolean
}

interface Login {
  username: string
  password: string
}

const LoginSchema = yup.object({
  username: yup.string().min(6).max(30).required(),
  password: yup.string().required('No password provided.'),
}).required();


const SignUpschema = yup.object({

  firstname: yup.string().required(),
  lastname: yup.string().required(),
  username: yup.string().min(6).max(30).required(),
  email: yup.string().email().required(),
  password: yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number "
    ).required('No password provided.'),
  terms: yup.boolean().oneOf([true], 'Please accept terms and conditions'),
}).required();


const Login = () => {




  const leftSideRef = useRef<any>();
  const rightSideRef = useRef<any>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const signUp = useRouter();

  useEffect(() => {
    leftSideRef.current.classList.remove('opacity-0');
    leftSideRef.current.classList.add('opacity-100');

    leftSideRef.current.classList.add('sb-max:h-[25rem]');

    rightSideRef.current.classList.remove('sb:left-[50rem]');
    rightSideRef.current.classList.add('sb:left-0');

    setIsLogin(signUp.query.isLogin ? false : true);
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#B80621] to-calm-red">
      <div ref={leftSideRef} className="bg-gradient-to-b from-[#B80621] to-calm-red opacity-0 text-center sb:inline-block sb:align-top h-screen sb:w-1/2 w-full sb:pt-20 sb-max:pb-[24.5rem] px-4 pt-10 text-white transition-[height,_opacity] duration-1000">
        <h1 className="text-4xl">Welcome To </h1>
        <div className="p-2 rounded-full bg-white mx-auto sb:mt-20 mt-10 w-fit scale-[3]"><FaCanadianMapleLeaf className="text-canadian-red scale-120" /></div>
        <p className="mt-9 text-xl">CanCham Learning System</p>
        <p className="sb:mx-16 sb:mt-20 mt-8">We provide an online learning platform for students all across the world as well as opportunities for instructors to help others by publishing their own courses.</p>
      </div>

      <div ref={rightSideRef} className="bg-white relative sb:left-[50rem] sb:inline-block sb:align-top sb:h-screen sb:w-1/2 w-full h-full transition-[left] duration-1000">
        <div className="bg-white absolute scale-y-125 4lg:scale-y-200 4lg:top-[60%] top-28 sb-max:-top-60 mob:-right-[48%] not-mob:right-[-83.5%] from-mob-to-sb:scale-x-[1.7] scale-x-[1] right-0 sb:left-0 sb-max:h-max h-full w-full">
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

        <div style={{ perspective: '1000px' }} className="bg-white mx-auto z-10 relative text-center sb:pt-20 px-4 sb-max:px-0 py-8">
          <Link href='/' className="absolute flex z-50 right-6 top-0 nv:top-5 text-blue-600 hover:text-blue-700"><AiFillHome className="scale-150 mr-4" /> Home</Link>
          <div style={{ transformStyle: 'preserve-3d' }} className={`${isLogin ? '' : 'rotate-y-180'} relative w-full h-full transition-all duration-700`}>
            <LoginForm setIsLogin={setIsLogin} />
            <SignUpForm setIsOpened={setIsOpened} setIsLogin={setIsLogin} isAccepted={isAccepted} setIsAccepted={setIsAccepted} />
          </div>
        </div>

      </div>
      <TermsAndConditions isOpened={isOpened} setIsOpened={setIsOpened} setIsAccepted={setIsAccepted} />
    </div>
  );
};
export default Login;

const LoginForm = (props: { setIsLogin: any }) => {
  const { viewPopupMessage } = useContext(PopupMessageContext);
  let router = useRouter();

  const [Loading, SetLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Login>({
    resolver: yupResolver(LoginSchema)
  });
  function viewSignUp() {
    props.setIsLogin(false);
  }

  async function Submit(data: any) {
    console.log(data)
    try {
      SetLoading(true)
      let res = await axios.post('http://localhost:5000/User/login', {
        username: data.username,
        password: data.password
      }, { withCredentials: true })
      //Set this res data to local storage
      let DataToStore = {
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        role: res.data.role
      }
      localStorage.setItem('UserInfo', JSON.stringify(DataToStore));
      await router.push('/')
      SetLoading(false);

    }
    catch (error) {
      //@ts-ignore
      viewPopupMessage(false, error.response.data + "" || error.message + "");
      SetLoading(false)
    }

  }
  // object

  return (
    <div className="flip-card-front bg-white z-30 nv:pt-6">
      <div className="w-fit mx-auto text-left whitespace-nowrap">
        <h1 className="text-3xl">Sign in to your account</h1>
        <p className="text-sm">Or <a className="text-blue-600 hover:text-blue-800" onClick={viewSignUp}>Don't have an account? Sign up</a></p>
      </div>

      <form action="#" method="POST" id="sign-in" className="mt-6 space-y-4 -mx-px bg-white">
        <div className="flex flex-col text-left">
          <label className="text-md">Username</label>
          <input  {...register('username')} className="border-b-2 bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your username" type='text' required />
          <p className={ErrorP}>{errors.username?.message}</p>

        </div>

        <div className="flex flex-col text-left">
          <label className="text-md">Password</label>
          <input {...register('password')} className="border-b-2 bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your password" type='password' />
          <p className={ErrorP}>{errors.password?.message}</p>

        </div>

        <MainButton className="mx-auto my-4 bg-canadian-red text-white rounded-md px-14 py-2 hover:bg-calm-red hover:scale-[1.01] transition-all duration-200" HandleClick={(handleSubmit(Submit))} Loading={Loading} btnText="Login" Size="lg"></MainButton>

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
  );
}

const SignUpForm = (props: { setIsLogin: any, setIsOpened: any, isAccepted: boolean, setIsAccepted: any }) => {
  const { viewPopupMessage } = useContext(PopupMessageContext);
  const router = useRouter();

  const [Gender, SetGender] = useState("Male");
  const [Terms, SetTerms] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Error, SetError] = useState({ hasError: false, message: "" });
  const [Success, SetSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUp>({
    resolver: yupResolver(SignUpschema)
  });

  async function Submit(data: any, e: any) {
    e.preventDefault();
    console.log(data)
    try {
      SetLoading(true);
      let res = await axios.post(`${ApiUrl}/User/register`, {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: data.password,
        gender: Gender,
      })
      console.log(res.data)
      await router.push(`/Auth/FeedBack/SignUpFeedback?Email=${data.email}`);
      SetLoading(false);
    } catch (error) {
      console.log(error)
      //@ts-ignore
      viewPopupMessage(false, error.response.data + "" || error.message + "");
      SetLoading(false);
    }
  }

  function hideSignUp() {
    props.setIsLogin(true);
  }

  function viewTerms() {
    props.setIsOpened(true);
  }

  function setAccept() {
    props.setIsAccepted(!props.isAccepted);
  }


  // if (Error.hasError) {
  //   return (
  //     <div className=" rotate-y-180">

  //       <ErrorComp ErrorMessage={Error.message}></ErrorComp>
  //     </div>
  //   )
  // }


  return (
    <div className="-scale-x-100 bg-white relative nv:-mt-10 mx-px">
      <div className="w-fit text-center mx-auto">
        <h1 className="text-3xl">Sign up</h1>
        <button className="absolute nv-max:text-sm nv:left-2 nv-max:top-3 left-0 top-2 flex items-center text-blue-600 hover:text-blue-800" onClick={hideSignUp}><MdOutlineKeyboardBackspace className="mr-2 scale-120 mb-px" />Go Back</button>
      </div>

      <form action="#" method="POST" id="sign-up" className="mt-2 space-y-2">
        <div className="flex items-center justify-between 3lg:space-x-16">
          <div className="flex flex-col text-left w-1/2 pr-6">
            <label className="text-md">Firstname</label>
            <input  {...register('firstname')} className="border-b-2 bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your firstname" />
            <p className={ErrorP}>{errors.firstname?.message}</p>

          </div>
          <div className="flex flex-col text-left w-1/2">
            <label className="text-md">Lastname</label>
            <input {...register('lastname')} className="border-b-2 bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your lastname" />
            <p className={ErrorP}>{errors.lastname?.message}</p>

          </div>
        </div>

        <div className="flex flex-col text-left">
          <label className="text-md">Username</label>
          <input {...register('username')} className="border-b-2 bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your username" />
          <p className={ErrorP}>{errors.username?.message}</p>

        </div>

        <div className="flex flex-col text-left">
          <label className="text-md">E-mail Address</label>
          <input  {...register('email')} className="border-b-2 bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your email" type='email' />
          <p className={ErrorP}>{errors.email?.message}</p>

        </div>

        <div className="flex flex-col text-left">
          <label className="text-md">Password</label>
          <input  {...register('password')} className="border-b-2 bg-transparent border-canadian-red outline-0 focus:border-calm-red placeholder:text-sm" placeholder="Enter your password" type='password' />
          <p className={ErrorP}>{errors.password?.message}</p>

        </div>

        <div className="flex justify-around items-center text-center">
          <label className="text-lg ">Choose Gender</label>
          <div>
            <button type="button" onClick={() => { SetGender("Male") }} className="mx-3 my-1 p-2.5 bg-blue-500 text-white rounded-full hover:scale-105 hover:bg-blue-700 transition-all duration-300"><BsGenderMale className="scale-135" /></button>
            <button type="button" onClick={() => { SetGender("Female") }} className="mx-3 my-1 p-2.5 bg-pink-500 text-white rounded-full hover:scale-105 hover:bg-pink-700 transition-all duration-300"><BsGenderFemale className="scale-135" /></button>
          </div>
        </div>
        <div className={"flex justify-end items-center " + " " + (errors.terms && 'text-canadian-red')}>
          <input {...register('terms')} readOnly onClick={setAccept} checked={props.isAccepted} className="mr-2 relative sb:bottom-[0.06125rem]" type='checkbox' />
          <p className="text-xs text-left">By signing up, You agree with the <button type="button" onClick={viewTerms} className="text-blue-600 hover:text-blue-800">Terms & Policy</button> of our company.</p>
        </div>
        <MainButton className="mx-auto my-4 bg-canadian-red text-white relative rounded-md px-14 py-2 hover:bg-calm-red hover:scale-[1.01] transition-all duration-200" HandleClick={(handleSubmit(Submit))} Loading={Loading} btnText="Sign Up" Size="lg"></MainButton>
      </form>
    </div>
  );
}

const Circle = (props: { className: string }) => {
  return (
    <div className={`rounded-[100%] absolute ${props.className}`} />
  );
}


