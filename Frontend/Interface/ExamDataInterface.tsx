export interface ExamData {
    exerciseTitle: String,
    questions: [{
      question: String,
      choices: [String],
      answer: String,
      isVisible: Boolean,
    }],
    totalGrade: Number
  }
  