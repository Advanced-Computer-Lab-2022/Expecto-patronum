// middleware.ts

export const config = {
  matcher: ['/Auth/:path*', '/User/:path*', '/Instructor/:path*', '/AdminTool/:path*', '/'],
}


import { NextRequest, NextResponse } from 'next/server';

// If the incoming request has the "beta" cookie
// then we'll rewrite the request to /beta
export function middleware(req) {
  const RouteForAll = ['/Courses']
  const url = req.nextUrl.clone()
  let Auth = false
  if (req.cookies['_parsed'].get('connect.sid')) {
    Auth = true
  }


  if (!RouteForAll.includes(req.nextUrl.pathname)) {

    if (Auth) {
      const Role = (req.cookies['_parsed'].get('user').value.split(' ')[2]) || ""
      //check for the role of the user
      //if Admin want to access any route that doesnt start with /Admin then redirect to /Admin
      //if User want to access any route that doesnt start with /User then redirect to /User
      //if Instructor want to access any route that doesnt start with /Instructor then redirect to /Instructor
      if (Role == 'Admin') {
        if (!req.nextUrl.pathname.startsWith('/AdminTool')) {
          url.pathname = '/AdminTool'
          return NextResponse.redirect(url)
        }
      }
      else if (Role == 'User') {
        if (!req.nextUrl.pathname.startsWith('/User')) {
          url.pathname = '/User'
          return NextResponse.redirect(url)
        }
      }
      else if (Role == 'Instructor') {
        if (!req.nextUrl.pathname.startsWith('/Instructor')) {
          url.pathname = '/Instructor'
          return NextResponse.redirect(url)
        }
      }
    }
    else {
      if (req.nextUrl.pathname == '/') {
        return NextResponse.next()
      }
      if (!req.nextUrl.pathname.startsWith('/Auth')) {
        url.pathname = '/Auth'
        return NextResponse.redirect(url)
      }
    }
  }
  console.log("i admasidmaid awidm")
  return NextResponse.next()



  ///////////////////////////////////////////////////////////////////////////////////////////













  // if (req.nextUrl.pathname == '/Auth') {
  //   if (Auth) {

  //     return NextResponse.redirect(url)


  //   }

  // }
  // console.log(req.nextUrl.pathname.startsWith('/User'))

}