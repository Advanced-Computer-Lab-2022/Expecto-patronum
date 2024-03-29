
# Project Title

This website is an online learning platform for students 
to take courses in various fields.



## Motivation

What started as a university project quickly became a journey of learning
and a passion project were all 5 team members put their best efforts 
in order to create an online learning platform that rivals the best ones out
there in terms of ui and design.
## Build Status

This project is currently in build 1.0, with no known bugs or issues.
## Code Style

- The code style is the standard style used in the MERN stack and visual studio code
- MVC(Model,View Controller) following the dry principle
- Spaces and indentations are used to identify loops,fuctions,conditions,..ets
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

https://drive.google.com/drive/folders/1mdeqfvAthBCS29tvZFpbaoFKMjAtVijp?usp=sharing


## Tech Stack

**Client:** Next.js, TailwindCSS, Typescript

**Server:** Node, Express,Mongoose,Mongodb


## Features

- Exceptional UI
- Live previews
- Fullscreen mode
- Cross platform
- Adaptive to diffrent screen resolutions
- Efficient backend code
- All user data is encrypted and secure
- Handles credit card transactions securly
- A color pallet that is easy on the eyes

## Code Examples:

**Footer of the website**
import React from 'react';
import classNames from 'classnames';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import Link from 'next/link';

type Props = {}

const Footer = (props: Props) => {

  return (
    <div style={{backgroundColor: '#222222'}} className='text-white mx-0 fluid-container block relative z-50'>
        <div className='row mx-0'>
            <div className={footerCol}>
                <h4 className={colHeader}><div className={colHeaderText}>Website</div></h4>
                <ul className={colData}>
                    <li className={colItems}><Link href=''>About Us</Link></li>
                    <li className={colItems}><Link href=''>Our Services</Link></li>
                    <li className={colItems}><Link href=''>Privacy Policy</Link></li>
                    <li className={colItems}><Link href=''>Affiliate Program</Link></li>
                </ul>
            </div>
            <div className={footerCol}>
                <h4 className={colHeader}><div className={colHeaderText}>Get Help</div></h4>
                <ul className={colData}>
                    <li className={colItems}><Link href=''>FAQ</Link></li>
                    <li className={colItems}><Link href=''>Shopping</Link></li>
                    <li className={colItems}><Link href=''>Returns</Link></li>
                    <li className={colItems}><Link href=''>Order Status</Link></li>
                    <li className={colItems}><Link href=''>Payment Options</Link></li>
                </ul>
            </div>
            <div className={footerCol}>
                <h4 className={colHeader}><div className={colHeaderText}>Online Shop</div></h4>
                <ul className={colData}>
                    <li className={colItems}><Link href=''>Web Applications</Link></li>
                    <li className={colItems}><Link href=''>Mobile Applications</Link></li>
                    <li className={colItems}><Link href=''>Desktop Applications</Link></li>
                    <li className={colItems}><Link href=''>Other</Link></li>
                </ul>
            </div>
            <div className={footerCol}>
                <h4 className={colHeader}><div className={colHeaderText}>Follow Us</div></h4>
                <ul className={`${colData} flex flex-wrap`}>
                    <li><button className={colIcons}><FiFacebook /></button></li>
                    <li><button className={colIcons}><FiTwitter /></button></li>
                    <li><button className={colIcons}><FiInstagram /></button></li>
                    <li><button className={colIcons}><FiLinkedin /></button></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

const footerCol = classNames(`col-6 col-md-3 p-4`);
const colHeader = classNames(`w-fit relative right-3 border-b-[3px] border-canadian-red px-1 pb-1 skew-x-[40deg]`);
const colHeaderText = classNames(`-skew-x-[40deg] ml-2`);
const colData = classNames(`text-left mt-3 ml-1`);
const colItems = classNames(`text-sm text-bright-gray py-1.5 hover:scale-105 hover:text-white transition-all duration-300 w-fit`);
const colIcons = classNames(`text-sm p-1.25 flex border-canadian-red text-canadian-red hover:text-white hover:border-white items-center justify-center m-2 z-0 scale-125 rounded-full border-1.5 before:content-[""] before:inline-block before:absolute before:z-behind before:bottom-1 before:right-2.75 before:w-6 before:h-6  before:rounded-full hover:scale-135 transition-all duration-300`);

export default Footer;
**End of footer code**

**Code for instructor course card**
import Link from 'next/link';
import React, { useContext } from 'react';
import DataContext from '../../../context/DataContext';
import OneStar from '../../shared/rating/OneStar';
import { TbDiscount2 } from 'react-icons/tb';
import classNames from 'classnames';

type Props = {
    course: any,
    color: any,
    isViewList: any,
}

const InstructorCourseCard = (props: Props) => {

    const { Rate } = useContext(DataContext);
    const saleRibbon = classNames(`after:content-[""] after:rounded-br-md after:absolute ${!props.isViewList ? 'after:-top-1.5 before:-top-2.5 after:w-28 after:border-t-[15px] after:border-b-[15px]': 'sb-max:after:-top-1.5 sb-max:before:-top-2.5 sb:after:-top-1.5 sb:before:-top-2.5 sb-max:after:w-28 sb:after:w-32 sb:after:border-t-[20px] sb:after:border-b-[20px] sb-max:after:border-t-[15px] sb-max:after:border-b-[15px]'} after:-right-4 before:-right-4 after:z-behind after:bg-canadian-red after:border-l-white after:border-l-[20px] after:border-t-transparent after:border-b-transparent before:absolute before:border-l-[5px] before:border-l-red-800 before:border-t-[5px] before:border-t-transparent`);

    function getDiscountPrice() {
        const price = Math.max((Math.floor(props.course.discountPrice * Rate.rate) - 0.01), 0);
        return price === 0 ? 'FREE': Rate.curr + " " + price.toLocaleString();
    }

  return (
    <div className={`${!props.isViewList ? 'flex-col': 'sb-max:flex-col'} flex relative bg-white mb-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}>
        <div className={`${props.color} ${!props.isViewList ? 'w-full rounded-t-xl px-3': 'sb-max:w-full sb-max:rounded-t-xl sb-max:px-3 w-52 min-w-[13rem] sb:rounded-l-xl pl-8 pr-4'} bg-gradient-to-br text-white py-3 h-auto flex flex-col`}>
            <p className='opacity-70 mt-auto'>COURSE SUBJECT</p>
            <p className={`text-2xl my-2 pl-2 -indent-2 ${!props.isViewList ? 'line-clamp-1' : 'sb-max:line-clamp-1'}`}>{props.course.subject}</p>
            <p className='opacity-70 mb-auto'>{parseInt(props.course.courseHours)} HOURS</p>
        </div>
        <div className={`${!props.isViewList ? 'mb-10': 'sb-max:mb-10 mb-10'} px-8 flex w-full min-w-0 justify-between h-full`}>
            <div className='py-4 space-y-2 min-w-0'>
                <div className={`${!props.isViewList ? '': 'sb:mr-22'} mt-3`}>
                    <p className='opacity-50'>TITLE</p>
                    <h1 className='text-2xl'>{props.course.title}</h1>
                </div>
                <p>Difficulty: <span className='italic'>{props.course.level === 'AllLevels' ? 'All Levels': props.course.level}</span></p>
                <p className={`${!props.isViewList ? '' : 'sb:mr-32'} overflow-hidden whitespace-nowrap text-ellipsis`}>{props.course.summary}</p>
            </div>
        </div>
        <Link href={`/Courses/${props.course._id}`} className='whitespace-nowrap absolute text-sm bottom-5 right-5 rounded-full bg-input text-white shadow-md hover:shadow-lg border-1.5 border-input hover:bg-white hover:text-input transition-all duration-300 px-2 py-0.5'>Open Course</Link>
        <label className={`${!props.isViewList ? `top-34 ${parseInt(props.course.discount?.discount) === 0 ? 'right-4': 'left-3'}`: `sb-max:top-34 ${parseInt(props.course.discount?.discount) === 0 ? 'right-4': 'sb-max:left-3'} sb:top-1.5 sb:right-24`} whitespace-nowrap absolute text-sm font-bold text-[#038470] bg-[#D7FFE0] px-2 py-0.5 rounded-full`}>
            <span className={`${parseInt(props.course.discount?.discount) === 0 ? '': `${lineThrough} text-xs text-gray-500`} relative`}>{Rate.curr} {(Math.floor(props.course.price * Rate.rate) - 0.01).toLocaleString()}</span> <span className={`${parseInt(props.course.discount?.discount) === 0 ? 'hidden': ''} ml-2`}>{getDiscountPrice()}</span>
        </label>
        <label className={`${!props.isViewList ? 'top-[10.6rem]': 'sb-max:top-[10.6rem] sb:top-[3.9rem]'} right-3 text-white absolute px-1 py-0.5 rounded-full z-0 ${parseInt(props.course.discount?.discount) === 0 ? 'hidden': saleRibbon}`}><span className={`${!props.isViewList ? 'bottom-1.25 left-4': 'sb-max:bottom-1.25 sb-max:left-4 left-3'} relative`}>SAVE {props.course.discount?.discount}%</span></label>
        <Link href={`/Instructor/Settings/AddDiscount?courseID=${props.course._id}`} as='/Instructor/Settings/AddDiscount/' className={`${(!props.isViewList ? 'bottom-5 left-4': 'sb:bottom-5 sb:right-38 sb-max:bottom-5 sb-max:left-4')} whitespace-nowrap absolute text-sm rounded-full text-input bg-white shadow-md hover:shadow-lg border-1.5 border-input hover:text-white hover:bg-input transition-all duration-300 px-2 py-0.5`}>Add Discount</Link>
        <OneStar className='bg-white rounded-tr-xl rounded-bl-xl absolute top-0 right-0 py-2 px-3 shadow-md hover:shadow-sm transition-all duration-200' rating={props.course.rating === undefined ? 3.8: props.course.rating.avg} />
    </div>
  )
}

const lineThrough = classNames('after:content-[""] after:pointer-events-none after:absolute after:h-[0.075rem] after:w-full after:bg-gray-500 after:left-0 after:rotate-[-10deg] after:top-1');

export default InstructorCourseCard;
**End of code for instructor course card**

**Register Function**
async function register(req, res) {
  console.log("req.body.password");
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  let EmailLowerCase = req.body.email.toLowerCase();
  var exists1 = await User.findOne({ "email": EmailLowerCase });

  var exists2 = await User.findOne({ "username": req.body.username });
  if (exists1 || exists2) {
    if (exists1 && exists2) {
      res.status(400).send("username and email already used");
    }
    else if (exists1) {
      res.status(400).send("email already used");
    }
    else {
      res.status(400).send("username already used");
    }
  }
  else {
    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
      gender: req.body.gender,
      email: EmailLowerCase,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      role: req.body.role
    });


    newUser.save((err, newUser) => {
      if (err) {
        console.log(err);
        res.status(400).send("Error registering new user please try again.");
      }
      else {
        let token = CreateToken({ id: newUser._id, email: newUser.email });
        MailValidate(newUser.email, "http://localhost:3000/Auth/FeedBack/EmailConfirmed", token);
        res.status(200).send("Verify your email");
      }

    })
  }

};
**End of register function**

## Installation

Open the project is visual studio code
npm install






    
## API Reference



```http
  PUT /user/ChangeEmail
  allows the user to change the email of his account
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userMail` | `string` | **Required**. |


```http
  POST /user/reportProblem
  allows the user to report any error or bug encountered whilst using the website
  the type is "financial","other","technical"
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. |
| `courseID`      | `string` | **Required**. |
| `type`      | `string` | **Required**. |
| `body`      | `string` | **Required**. |
| `startDate`      | `date` | **Required**. |


```http
  get /user/takeExam
  allows the user to take the exam of the course
```

| query | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `examID`      | `string` | **Required**. |


```http
  get /user/logout
  allows the user to logout of his account
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `logout`      | `string` | **Required**. |
| `clearCookie`      | `string` | **Required**. |

```http
  get /user/viewProfile
  allows the user to view his profile data
```


| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. |
| `courseID`      | `string` | **Required**. |
| `excerciseID`      | `string` | **Required**. |
| `answers`      | `array[string]` | **Required**. |

```http
  put /user/addNote
  allows the user to add a note when whatching a video for future refrence
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. |
| `courseID`      | `string` | **Required**. |
| `content`      | `string` | **Required**. |
| `subtitle`      | `string` | **Required**. |
| `timestamp`      | `string` | **Required**. |
| `note`      | `string` | **Required**. |
| `subtitleName`      | `string` | **Required**. |
| `contentName`      | `string` | **Required**. |
| `subtitleIndex`      | `string` | **Required**. |
| `contentIndex`      | `string` | **Required**. |

```http
  put /user/viewNotes
  allows the user to view all his notes
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `string` | **Required**. |
| `courseID`      | `string` | **Required**. |


```http://localhost:5000
Admin api
1)  GET admin/viewCourseRequests

| Query       | Type     | Description|
| :--------   | :------- | :----------|
|`page`       | `Number` | **Optional** |

get all Course Requests with 5 Requests per page navigated by
Parameter CurrentPage whose default is 1

2)  GET admin/viewRefunds

| Query       | Type     | Description|
| :--------   | :------- | :----------|
|`page`       | `Number` | **Optional** |

get all efunds with 5 Refund per page navigated by
Parameter CurrentPage whose default is 1

3)  PUT admin/grantAccess

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `granted` | `string` | **Required** |

allow or prevent  CorporateTrainee from getting access to
Course by sending body.granted = true or false

4)  PUT admin/refund

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `refund` | `string`  | **Required** |

give or prevent  CorporateTrainee from getting access to
Course by sending body.refund = Accept or not

4)  PUT admin/givePromotion

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseID` | `[string]`  | **Required** |
| `Promotion`| `Integer`  | **Required** |
| `StartDate` | `Date`  | **Required** |
| `EndDate` | `Date`  | **Required** |

set promotion to courses given in in courseID with with promotion as 
and set StartDate and endDate 

5)  GET admin/viewReportedFunctions

| Query       | Type     | Description|
| :--------   | :------- | :----------|
|`page`       | `Number` |**Optional**|

get all Report with 5 Report per page navigated by
Parameter page whose default if 1

5)  PUT admin/markReportedProblem

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `status`    | `string`  | **Required** |
| `ProblemID`    | `string`  | **Required** |

set problem.status with body.status

-------------------------------------------------------------------------------------
Instructor api

1)  GET instructor/viewCourses

| Query       | Type     | Description|
| :--------   | :------- | :----------|
|`page`       | `Number` | **Optional** |

get Instructor Courses per page navigated by
Parameter CurrentPage whose default is 1

2)  GET instructor/filterCourse

| Query     | Type      | Description                |
| :-------- | :-------  | :----------- |
| `price`   | `int`     | **Optional** |
| `keyword` | `string`  | **Optional** |
| `subject`| `string` | **Optional** |


filter Instructor Course by price or subject and search
throught Instructor Course using course subject or title
using keyword

3)  PUT instructor/updateBio

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `newBio`| `String`    | **Required** |

update Instructor biography


4)  GET instructor/filterByRatings
| Query | Type         | Description                |
| :-------- | :------- | :------------------------- |
| `CurrentPage`| `int` | **Optional** |
| `rating`| `int`      | **Required** |

Instructor filter his courses and his reviews by rating

5)  PUT instructor/viewAmountOwned
Instructor view Amount Owned from the site

6)  POST instructor/addCourse

| Body      | Type      | Description   |
| :-------- | :-------  | :-----------  |
| `title`   | `String`  | **Required** |
| `summary` | `string`  | **Required** |
| `sutbtitles`| `string`| **Required** |
| `subject`| `string`   | **Required** |
| `exercises`| `string` | **Required** |
| `skills`  | `string`  | **Required** |
| `level`   | `string`  | **Required** |
| `courseVideo`|`string`| **Required** |
| `courseHours`| `int`  | **Required** |
| `price`| `int` | **Required** |
| `courseImage`| `string` | **Required** |

Instructor add course

6)  POST instructor/discount

| Body       | Type      | Description  |             
| :--------  | :-------  | :----------- |
| `courseID` | `String`  | **Required** |
| `discount` | `int`     | **Required** |
| `StartDate`| `Date`    | **Required** |
| `endDate`  | `Date`    |  **Required**|

Instructor add discount on course

6)  POST instructor/canceldiscount

| Body       | Type      | Description  |           
| :--------  | :-------  | :----------- |
| `courseId` | `String`  | **Required** |

Instructor cancel discount on course

7)  GET instructor/viewProfile
view Instructor viewProfile

8) GET instructor/viewInstructorPopularCourses

| Body         | Type      | Description  |             
| :--------    | :-------  | :----------- |
| `CurrentPage`| `int`   | **Optional**   |

Instructor view his most popular courses

--------------------------------------------------------------------------------

course api

1)  GET course/getPrice

| Query        | Type     | Description  |
| :--------    | :------- | :----------- |
| `id`         | `string` | **Required** |

GET course price with his id

2)  GET course/

| Query        | Type     | Description  |
| :-------- | :-------  | :----------- |
| `price`   | `int`     | **Optional** |
| `keyword` | `string`  | **Optional** |
| `subject` | `string`  | **Optional** |
| `rating`  | `string`  | **Optional** |
| `page`    | `int`     | **Optional** |

  Course Search by keyboard or filter using price or rating or subject

3)  GET course/viewPopularCourses

| Query          | Type     | Description  |
| :--------      | :------- | :----------- |
|`CurrentPageid` | `int`    | **Optional** |
|`coursesPerPage`| `int`    | **Optional** |
get courses ranking by number of buyers(most popular courses)

GET course price with his id
-----------------------------------------------------------------------------------
User api

POST user/register

| Body       | Type      | Description  |             
| :--------  | :-------  | :----------- |
| `password` | `String`  | **Required** |
| `username` | `String`  | **Required** |
| `firstname`| `String`  | **Required** |
| `lastname` | `String`  | **Required** |
| `gender`   | `String`  | **Required** |
| `role`     | `String`  | **Required** |
| `email`    | `String`  | **Required** |

register a user
------------------------------------------------------------------
POST user/forgetPassword
| Body       | Type      | Description  |             
| :--------  | :-------  | :----------- |
| `email`    | `String`  | **Required** |

send mail to the user to change his password
-------------------------------------------------------------------
POST user/changePassword
| Body        | Type      | Description  |             
| :--------   | :-------  | :----------- |
|`oldPassword`| `String`  | **Required** |
|`password`| `String`  | **Required**    |

change password by entering oldPassword and password(new password)
-------------------------------------------------------------------

GET user/forgetPassword
| Query        | Type      | Description  |             
| :--------    | :-------  | :----------- |
| `exerciseID` | `String`  | **Required** |
| `CourseID`   | `String`    | **Required**   |

send mail to the user to change his password
------------------------------------------------------------------
PUT user/giveCourseRating
| Body        | Type      | Description  |             
| :--------   | :-------  | :----------- |
|`rating`     | `int`     | **Required** |
|`oldRating`  | `int`     | **Optional** |
|`courseId`   | `String`  | **Required** |

edit course rating if old rating is given 
else we give new rating to course

PUT user/giveCourseReview
| Body        | Type      | Description  |             
| :--------   | :-------  | :----------- |
|`rating`     | `Number`  | **Required** |
|`review`     | `String`  | **Required** |
|`oldReview`  | `String`  | **Optional** |
|`courseId`   | `String`  | **Required** |

edit course review if oldReview is given then we edit old rating
else we give new rating to course
------------------------------------------------------------------
PUT user/addPaymentMethod
| Body             | Type      | Description  |             
| :--------        | :-------  | :----------- |
|`creditCardNumber`| `String`  | **Required** |
|`ccv`             | `Number`  | **Required** |
|`expiration`      | `String`  | **Required** |
|`cardHolderName`  | `String`  | **Required** |

check if card already saved if not save creditCard Details for user by creating stripe customer and
saving it

-------------------------------------------------

PUT user/buyCourse
| Body             | Type      | Description  |             
| :--------        | :-------  | :----------- |
|`creditCardNumber`| `String`  | **Optional** |
|`ccv`             | `Number`  | **Optional** |
|`expiration`      | `String`  | **Optional** |
|`cardHolderName`  | `String`  | **Optional** |
|`courseID`        |  `String` | **Required** |
|`Amount`          |  `Number` | **Required** |
|`customerId`      |  `String` | **Optional** |
user buy course
if user choose already created card then we use customerId
to get pay using stripe else user must enter card Details
to pay for the course
-------------------------------------------------------------
GET user/ViewMyCourses

| Query       | Type     | Description  |
| :--------   | :------- | :----------  |
|`page`       | `Number` | **Optional** |

view user owned courses
------------------------------------------------------------

PUT user/selectCourse
| Query       | Type     | Description  |
| :--------   | :------- | :----------  |
|`courseID`   | `String` | **Required** |
open course page

------------------------------------------------------------

PUT user/watchVideo
| Query       | Type     | Description  |
| :--------   | :------- | :----------  |
|`courseID`   | `String` | **Required** |
|`videoURL`   | `String` | **Required** |
|`videotime`  | `Number` | **Required** |
when user or CorporateTrainee watch view it update progress
of the student in the course.if video is watched before it
will not increase the progress

-----------------------------------------------------------------
## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## How To Use

## Frontend, all steps are in command line terminal

- after running npm i
- cd Frontend
- npm run dev / nodemon run dev

## Backend, all steps are in command line terminal

- open new terminal
- cd cd Backend
- node app.js / nodemon app.js


## Credits

- Dr Mervat and her icredible Teaching Assistants (Nada,Hadwa,Noha)
- Dr. Angela yu for her amazing course (web development bootcamp)
- StackOverflow 
- The 5 team members who created this project

--------The Team was divided into 3 members who worked on the front end(Radwan, David, Mohamed) and 2 members who worked on the backend and the readme file (Ahmad, Mostafa)


-------Sprint 1:

Front End:

Mohamed Salem: Select Country, view all the titles of the courses available including the total hours of the course and course rating, filter the courses based on a subject and/or rating,
filter the courses based on price (price can be FREE),search for a course based on course title or subject or instructor

Radwan Waleed: view all the titles of the courses given by him/her, filter the courses given by him/her based on a subject or price,search for a course given by him/her based on course title or subject or instructor
create a new course and fill in all its details inclding title, subtitles, price and short summary about the entire course

David Samy: add another administrator with a set username and password,add instructors and create their usernames and passwords, add corporate trainees and create their usernames and passwords,
(choose a course from the results and view (but not open) its details including course subtitles, excercises , total hours of each subtitle, total hours of the course and price (including % discount if applicable) according to the country selected),


Back End:

Mostafa Ashraf:Select Country,  filter the courses based on a subject and/or rating,
filter the courses based on a subject and/or rating, filter the courses given by him/her based on a subject or price
filter the courses based on price (price can be FREE)
search for a course based on course title or subject or instructor
choose a course from the results and view (but not open) its details including course subtitles, excercises , total hours of each subtitle, total hours of the course and price (including % discount if applicable) according to the country selected


Ahmad Haytham: view all the titles of the courses available including the total hours of the course and course rating, view all the titles of the courses given by him/her
search for a course given by him/her based on course title or subject or instructor
create a new course and fill in all its details inclding title, subtitles, price and short summary about the entire course
add another administrator with a set username and password
add instructors and create their usernames and passwords,
add corporate trainees and create their usernames and passwords

--------------------------------------------------------------------------------------------------------------------------------------

-------Sprint 2:

Front End:

Mohamed Salem:view and accept the contract which includes all the rights to the posted videos and materials as well as the % taken by the company on each video per registered trainee,
upload a video link from YouTube under each subtitle and enter a short description of the video
upload a video link from YouTube as a preview to the course,view the ratings and reviews on all his/her courses,
receive an email to change a forgotten password

Radwan Waleed:open all the items inside a course he/she is registered for including videos and excercises,edit his/her mini biography or email
define a promotion for the course (% discount) and for how long
change his/her password,view his/her rating and reviews as an instructor,view the ratings and reviews on all his/her courses

David Samy: create a multiple choice exam with 4 choices per question, set the answers (not visible for the trainee) for multiple choice exercises,
solve a multiple choice exercise by choosing the correct answer
submit the answers to the exercise after completing it
view his/her grade from the exercise
view the questions with the correct solution to view the incorrect answers


Back End:

Ahmad Haytham: view his/her rating and reviews as an instructor,solve a multiple choice exercise by choosing the correct answer,submit the answers to the exercise after completing it
view his/her grade from the exercise,view the ratings and reviews on all his/her courses
edit his/her mini biography or email,view the questions with the correct solution to view the incorrect answers


Mostafa Ashraf: open all the items inside a course he/she is registered for including videos and excercises, create a multiple choice exam with 4 choices per question,
define a promotion for the course (% discount) and for how long,change his/her password,receive an email to change a forgotten password,rate an instructor
rate a course,watch a video from a course he/she is registered for
--------------------------------------------------------------------------------------------------------------------------------------

-------Sprint 2:

Front End: 

Mohamed Salem:view a preview video of the course and the course outline before registering for it,view the most viewed/ most popular courses,write notes while watching the video
download the notes as a PDF,request access to a specific course they do not have access to,sign up for an account as an individual trainee using a username, email, password, first name, last name and gender
view and accept the website/ company refund/ payment policy while signing up,view a preview video of the course and the course outline before registering for it
view the most viewed/ most popular courses



David Samy: view reported problems - should automaticalled be marked as "unseen",mark reported problems as "resolved" or "pending",refund an amount to a trainee to their wallet,
view course requests from corporate trainees, download the certificate as a PDF from the website
grant corporate trainees access to specific courses,
set a promotion (% sale) for specific courses, several courses or all courses,receive a certificate as a PDF after completing the course via email


Radwan Waleed: enter their credit card details to pay for a course they want to register for,pay for a course,view the amount available in their wallet from refunded courses
see his/her progress in the course as a percentage of how much of the course has been completed so far,log in using a username and password,log out
view the amount of money owed per month,report a problem with a course. The problem can be "technical", "financial" or "other"
see all previously repoted problems and their statuses,follow up on an unresolved problem


Back End:

Ahmad Haytham :view reported problems - should automaticalled be marked as "unseen",mark reported problems as "resolved" or "pending",report a problem with a course. The problem can be "technical", "financial" or "other"
see all previously repoted problems and their statuses,follow up on an unresolved problem,write notes while watching the video
download the notes as a PDF,see a list of all the courses he/she is enrolled in on their profile, pay for a course,
view the amount available in their wallet from refunded courses


Mostafa Ashraf: refund an amount to a trainee to their wallet,view course requests from corporate trainees,grant corporate trainees access to specific courses
set a promotion (% sale) for specific courses, several courses or all courses,request access to a specific course they do not have access to,sign up for an account as an individual trainee using a username, email, password, first name, last name and gender
view the most viewed/ most popular courses,enter their credit card details to pay for a course they want to register for,request a refund only if less than 50% of the course has been attended,
see his/her progress in the course as a percentage of how much of the course has been completed so far,see a list of all the courses he/she is enrolled in on their profile
log in using a username and password,log out
