export const CardData = [{
  rating: {
    avg: 20,
  },
  _id: "635c5a9a57ad790fd013970A",
  title: "Modern Application Development with Node.js on AWS",
  summary:
    "Work with one of the most in-demand web development programming languagesWork with one of the most in-demand web development programming languagesWork with one of the most in-demand web development programming languagesWork with one of the most in-demand web development programming languagesWork with one of the most in-demand web development programming languagesWork with one of the most in-demand web development programming languages",
  subject: "subject",
  price: 500,
  courseHours: 120,
  instructorName: "mohamed rodin",
  level: "Advnaced",
  skills:
    "Computer Programming, Python Programming, Statistical ProgrammingData Management, SQL, Databases, Extract, Transform, Load, Computer Networking, Network Model, Other Pro",
}, {
  rating: {
    avg: 0,
  },
  _id: "635c5a9a57ad790fd013970b",
  title: "DMET2",
  summary:
    "Work with one of the most in-demand web development programming languages",
  subject: "subject",
  price: 1200,
  courseHours: 120,
  instructorName: "rodin rodin",
  level: "Beginner",
  skills:
    "Javascript",
}, {
  rating: {
    avg: 0,
  },
  _id: "635c5a9a57ad790fd013970C",
  title: "DMET2",
  summary:
    "Work with one of the most in-demand web development programming languages",
  subject: "subject",
  price: 1200,
  courseHours: 120,
  instructorName: "rodin rodin",
  level: "Beginner",
  skills:
    "Computer Programming, Python Programming, Statistical ProgrammingData Management, SQL, Databases, Extract, Transform, Load, Computer Networking, Network Model, Other Programming Languages, Computational Logic, Computer Programming Tools, Data Structures, Javascript",
}, {
  rating: {
    avg: 0,
  },
  _id: "635c5a9a57ad790fd013970D",
  title: "DMET2",
  summary:
    "Work with one of the most in-demand web development programming languages",
  subject: "subject",
  price: 1200,
  courseHours: 120,
  instructorName: "rodin rodin",
  level: "Beginner",
  skills:
    "Computer Programming, Python Programming, Statistical ProgrammingData Management, SQL, Databases, Extract, Transform, Load, Computer Networking, Network Model, Other Programming Languages, Computational Logic, Computer Programming Tools, Data Structures, Javascript",
}, {
  rating: {
    avg: 0,
  },
  _id: "635c5a9a57ad790fd013970E",
  title: "DMET2",
  summary:
    "Work with one of the most in-demand web development programming languages",
  subject: "subject",
  price: 1200,
  courseHours: 120,
  instructorName: "rodin rodin",
  level: "Beginner",
  skills:
    "Computer Programming, Python Programming, Statistical ProgrammingData Management, SQL, Databases, Extract, Transform, Load, Computer Networking, Network Model, Other Programming Languages, Computational Logic, Computer Programming Tools, Data Structures, Javascript",
}, {
  rating: {
    avg: 0,
  },
  _id: "635c5a9a57ad790fd013970F",
  title: "DMET2",
  summary:
    "Work with one of the most in-demand web development programming languages",
  subject: "subject",
  price: 1200,
  courseHours: 120,
  instructorName: "rodin rodin",
  level: "Beginner",
  skills:
    "Computer Programming, Python Programming, Statistical ProgrammingData Management, SQL, Databases, Extract, Transform, Load, Computer Networking, Network Model, Other Programming Languages, Computational Logic, Computer Programming Tools, Data Structures, Javascript",
}]
export const subtitlesData: {
  _id: string,
  header: string,
  contents: {
    _id: string,
    video: string,
    preview: boolean,
    duration: number,
    description: string
  }[],
  exercise?: {
    exerciseID: string,
    exerciseName: string
  },

  totalMinutes: number


}[] = [
    {
      "_id": "63966e85abce268194684c82",
      "header": "Introduction",
      "contents": [
        {
          "_id": "63966e85abce268194684c83",
          "video": "https://www.youtube.com/embed/tuSbQ8osGPc",
          "preview": true,
          "duration": 120,
          "description": "welcome"
        },
        {
          "_id": "63966e85abce268194684c84",
          "video": "https://www.youtube.com/embed/vDQ9GZsJkms",
          "preview": false,
          "duration": 150,
          "description": "test"
        }
      ],
      "totalMinutes": 400
    },

    {
      "exercise":
      {
        "exerciseID": "63966e85abce268194684c88",
        "exerciseName": "Quiz 1"
      }
      ,
      "_id": "63966e85abce268194684c85",
      "header": "JavaScript",
      "contents": [
        {
          "_id": "63966e85abce268194684c86",
          "video": "url2",
          "preview": true,
          "duration": 120,
          "description": "welcome"
        },
        {
          "_id": "63966e85abce268194684c87",
          "video": "test",
          "preview": false,
          "duration": 150,
          "description": "test"
        }
      ],
      "totalMinutes": 400
    }
  ]

const totalHours = []