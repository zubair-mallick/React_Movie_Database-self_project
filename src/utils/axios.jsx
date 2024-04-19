import axios from 'axios'
const instance =  axios.create({
    baseURL:'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjQzNTc4MzcwNzkwOTBmNTVkYjk2MjM3OWM0MzdmMiIsInN1YiI6IjY2MjE2YjgxMzJjYzJiMDE0ODBjNmY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cs6jx2suk4pqnohrJ7cyJMBIlDnPIjtIorVdCMbQjiw'
      }
})

export default instance;