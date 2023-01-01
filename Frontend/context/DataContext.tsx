import React, { createContext } from "react";
import { useState } from "react";
import { PropsWithChildren } from "react";
import { AllCourseDataInterface } from "../Interface/PurchasedCourse/AllCourseDataInterface";

export interface InterfaceDataContext {
  Filter: InterfaceFilter;
  SetFilter: React.Dispatch<React.SetStateAction<InterfaceFilter>>;
  Rate: InterfaceRate;
  SetRate: React.Dispatch<React.SetStateAction<InterfaceRate>>;
  Profile: "AccountInfo" | "Wallet" | "Tickets";
  SetProfile: React.Dispatch<React.SetStateAction<"AccountInfo" | "Wallet" | "Tickets">>;
  ContentChoosen: ContentChoosen;
  SetContentChoosen: React.Dispatch<React.SetStateAction<ContentChoosen>>;
  CourseChoosen: AllCourseDataInterface;
  SetCourseChoosen: React.Dispatch<React.SetStateAction<AllCourseDataInterface>>;
  Notes: NotesInterface[];
  SetNotes: React.Dispatch<React.SetStateAction<NotesInterface[]>>;
  Progress: number,
  SetProgress: React.Dispatch<React.SetStateAction<number>>
  WatchedVideos: string[],
  SetWatchedVideos: React.Dispatch<React.SetStateAction<string[]>>

  SolvedExercises: SolvedExerciseInterface[] | [],
  SetSolvedExercises: React.Dispatch<React.SetStateAction<SolvedExerciseInterface[] | []>>

  CurrentRatings: CurrentRatingsInterface,
  SetCurrentRatings: React.Dispatch<React.SetStateAction<CurrentRatingsInterface>>,


  CourseName: string,
  SetCourseName: React.Dispatch<React.SetStateAction<string>>,

  FinalExam: string,
  SetFinalExam: React.Dispatch<React.SetStateAction<string>>,


}
interface InterfaceRate {
  rate: number;
  curr: string;
  Country: string;
}
interface ContentChoosen {
  SubtitleID: string;
  ContentID: string;
  data: { url: string, time: number } | { name: string }
  isExercise: boolean;
  subtitleIndex: number;
  subttitleName: string;
  contentIndex: number;
  contentName: string;

}

export interface SolvedExerciseInterface {
  excerciseID: string,
  grade: number,
  exercisesAnswers: {
    exerciseTitle: string,
    answer: string[],
  },


}

export interface CurrentRatingsInterface {
  yourCourseRating: number | null,
  yourCourseReview: string | null,
  yourInstructorRating: number | null,
  yourinstructorReview: string | null,

}


export interface NotesInterface {
  _id: string,
  contentID: string,
  subtitleID: string,
  subtitleName: string,
  contentName: string,
  subtitleIndex: number,
  contentIndex: number,
  timestamp: number,
  note: string
}


export interface InterfaceFilter {
  Subject: string[];
  Rating: string[];
  Price: string[];
  Page: number;
  Keyword: string[];
}

const defualts = {
  Filter: { Subject: [], Rating: [], Price: [], Page: 1, Keyword: [] },
  SetFilter: () => { },
  Rate: { rate: 1, curr: "$", Country: "US" },
  SetRate: () => { },
  Profile: "AccountInfo" as "AccountInfo" | "Wallet" | "Tickets",
  SetProfile: () => { },
  ContentChoosen: {} as ContentChoosen,
  SetContentChoosen: () => { },
  CourseChoosen: {} as AllCourseDataInterface,
  SetCourseChoosen: () => { },

  Notes: [] as NotesInterface[],
  SetNotes: () => { },

  Progress: 0,
  SetProgress: () => { },

  WatchedVideos: [] as string[],
  SetWatchedVideos: () => { },

  SolvedExercises: [] as SolvedExerciseInterface[] | [],
  SetSolvedExercises: () => { },

  CurrentRatings: {} as CurrentRatingsInterface,
  SetCurrentRatings: () => { },
  CourseName: "" as string,
  SetCourseName: () => { },

  FinalExam: {} as string,
  SetFinalExam: () => { },

}


const DataContext = React.createContext<InterfaceDataContext>(defualts);

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [Filter, SetFilter] = useState<InterfaceFilter>({
    Subject: [],
    Rating: [],
    Price: [],
    Page: 1,
    Keyword: [],
  });

  const [Rate, SetRate] = useState<InterfaceRate>(defualts.Rate);
  const [Profile, SetProfile] = useState<"AccountInfo" | "Wallet" | "Tickets">(defualts.Profile);
  const [ContentChoosen, SetContentChoosen] = useState<ContentChoosen>(defualts.ContentChoosen);
  const [CourseChoosen, SetCourseChoosen] = useState<AllCourseDataInterface>(defualts.CourseChoosen)
  const [Notes, SetNotes] = useState<NotesInterface[]>(defualts.Notes);
  const [Progress, SetProgress] = useState<number>(defualts.Progress);
  const [WatchedVideos, SetWatchedVideos] = useState<string[]>(defualts.WatchedVideos);
  const [SolvedExercises, SetSolvedExercises] = useState<SolvedExerciseInterface[] | []>(defualts.SolvedExercises);
  const [CurrentRatings, SetCurrentRatings] = useState<CurrentRatingsInterface>(defualts.CurrentRatings);
  const [CourseName, SetCourseName] = useState<string>(defualts.CourseName);
  const [FinalExam, SetFinalExam] = useState<string>(defualts.FinalExam);

  return (
    <DataContext.Provider value={{ Filter, FinalExam, SetFinalExam, CourseName, SetCourseName, SolvedExercises, CurrentRatings, SetCurrentRatings, SetSolvedExercises, WatchedVideos, SetWatchedVideos, Progress, SetProgress, CourseChoosen, Notes, SetNotes, SetCourseChoosen, SetFilter, Rate, SetRate, Profile, SetProfile, ContentChoosen, SetContentChoosen }}>
      {children}
    </DataContext.Provider >
  );
};

export default DataContext;
