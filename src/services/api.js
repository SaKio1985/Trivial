const obtenerPreguntas = () => {
  return fetch('https://opentdb.com/api.php?amount=10')
    .then((response) => response.json())
    .then((data) => data.results)
}

export default obtenerPreguntas
