const buildAnswer = (text, isCorrect, index) => ({
  id: `${isCorrect ? 'correct' : 'incorrect'}-${index}-${Math.random().toString(36).slice(2, 9)}`,
  text,
  isCorrect,
})

const shuffleAnswers = (answers) => {
  const copy = [...answers]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const obtenerRespuestas = (respuestasIncorrectas, respuestaCorrecta) => {
  const incorrectas = respuestasIncorrectas.map((texto, index) => buildAnswer(texto, false, index))

  const correcta = buildAnswer(respuestaCorrecta, true, respuestasIncorrectas.length)

  return shuffleAnswers([...incorrectas, correcta])
}

export default obtenerRespuestas
