import express from "express"

import Movie from "../../../models/Movie.js"

const moviesRouter = express.Router()

moviesRouter.get("/", async (req, res) => {
  try {
    const movies = await Movie.findAll()
    // console.log("MOVIES FROM ROUTER")
    // console.log(movies)
    res.json({ movies: movies })
  } catch (error) {
    console.error(`Error: ${error}`)
  }
})

moviesRouter.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    res.json({ movie: movie })
  } catch (error) {
    console.error(`Error: ${error}`)
  }
})

export default moviesRouter
