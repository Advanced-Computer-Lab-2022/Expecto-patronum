export interface ExamData {
    exerciseTitle: String,
    questions: [{
      problem: String,
      choices: [String],
      answer: String,
      isVisible: Boolean,
    }],
    totalGrade: Number
  }
  