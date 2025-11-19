// adapters/opentrivia.js
const decodeHtml = (text) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = text
  return txt.value
}

const shuffle = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export const adaptOpenTriviaQuestion = (question) => {
  if (!question) return null

  const allAnswers = shuffle([
    { id: `correct-${Math.random()}`, text: decodeHtml(question.correct_answer), isCorrect: true },
    ...question.incorrect_answers.map((answer, index) => ({
      id: `incorrect-${index}-${Math.random()}`,
      text: decodeHtml(answer),
      isCorrect: false,
    })),
  ])

  return {
    id: btoa(encodeURIComponent(question.question)).substr(0, 12),
    type: question.type,
    difficulty: question.difficulty,
    category: decodeHtml(question.category),
    question: decodeHtml(question.question),
    allAnswers,
    source: 'opentrivia',
  }
}

export const adaptOpenTriviaResults = (results) => {
  if (!results || !Array.isArray(results)) return []
  return results.map(adaptOpenTriviaQuestion)
}
