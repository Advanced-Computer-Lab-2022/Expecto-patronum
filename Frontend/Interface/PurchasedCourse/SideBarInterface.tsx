export interface SideBarInterface {
  _id: string,
  header: string,
  contents: {
    _id: string,
    video: string,
    preview: boolean,
    duration: number,
    description: string
  }[],
  exercise: [{
    exerciseID: string,
    exerciseName: string
  }] | [],
  totalMinutes: number
}
