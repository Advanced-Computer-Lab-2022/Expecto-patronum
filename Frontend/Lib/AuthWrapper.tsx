import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect } from 'react'
import ErrorComp from '../components/shared/Error/ErrorComp';
import Spinner from '../components/shared/spinner/Spinner';
import { ApiUrl } from '../constants/constants';

type Props = {}

export const AuthWrapper = ({ children }: any) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [Loading, SetLoading] = React.useState(false);
  const [Error, SetError] = React.useState({ hasError: false, Message: "" })
  const RouteForAll = ['/', 'courses']
  useLayoutEffect(() => {
    async function GetData() {
      try {
        const res = await axios.get(ApiUrl + '/User/CheckAuth');
        console.log(res.data)
        setIsLoggedIn(true);
      }
      catch (error) {
        setIsLoggedIn(false);
      }

      console.log(isLoggedIn)
    }
    GetData()

  }, [])

  useLayoutEffect(() => {
    async function SecurePath() {
      let BasePath = router.pathname.split('/')[1];
      BasePath = BasePath.toLocaleLowerCase()
      // check first if is logged 
      //if not logged in check if he want to access any page that is not Auth page or courses page  redirect him to login page
      //if Logged in check his role 
      //1)if role admin then he can only access Public pages and AdminTool pages 
      //2)if role user then he can only access Public pages and User pages
      //3)if role instructor then he can only access Public pages and Instructor pages
      if (!RouteForAll.includes(BasePath)) {
        if (!isLoggedIn) {
          if (BasePath !== 'auth') {
            router.push('/Auth')
          }
        }
        else {
          let Role = localStorage.getItem('Role');
          switch (Role) {
            case 'Admin' || 'admin':
              if (BasePath !== 'admintool') {
                router.push('/AdminTool')
              }
              break;
            case 'User' || 'user':
              if (BasePath !== 'user') {
                router.push('/User')
              }
              break;
            case 'Instructor' || 'instructor':
              if (BasePath !== 'instructor') {
                router.push('/Instructor')
              }
              break;
            default:
              router.push('/')
              break;

          }




        }
      }

    }
    SecurePath();




  }, [router.pathname])







  // if (BaseRoute.toLocaleLowerCase() === "guest" || BaseRoute.toLowerCase() === "auth") {
  //   if (isLoggedIn) {
  //     router.push("/User")
  //   }

  // }
  // else {
  //   if ((BaseRoute.toLocaleLowerCase() === "user" || BaseRoute.toLocaleLowerCase() === 'admintool' || BaseRoute.toLocaleLowerCase() === 'instructor') && !isLoggedIn) {
  //     router.push("/Auth")
  //   }
  // }


  return children;
};

export default AuthWrapper