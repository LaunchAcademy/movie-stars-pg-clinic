import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/movie-stars-pg"
})

class Movie {
  static async findAll() {
    try {
      const client  = await pool.connect()
      const result = await client.query('SELECT * FROM movies')
      
      // console.log("RESULTS")
      // console.log(result)
      // console.log("RESULT ROWS")
      // console.log(result.rows)
      client.release()

      const movies = result.rows
      return movies
    } catch (error) {
      console.error(`Error: ${error}`)
      pool.end()
    }
  }
  
  static async findById(id) {
    try {
      const client = await pool.connect()
      // const result = await client.query('SELECT * FROM movies WHERE id = $1', [id])
      const result = await client.query(`SELECT * FROM movies WHERE id = ${id} LIMIT 1;`)
      
      console.log(result)
      console.log(result.rows)
      client.release()
      
      const movie = result.rows[0]
      return movie
    } catch (error) {
      console.error(`Error: ${error}`)
      pool.end()
    }
  }

  // not fully tested!
  // static async findWhere(id) {
  //   try {
  //     const client = await pool.connect()
  //     const title = 'Star Wars'
  //     const result = await client.query(`SELECT * FROM movies WHERE title = '${title}'`)
      
  //     // console.log(result)
  //     console.log(result.rows)
  //     client.release()
      
  //     const movie = result.rows
  //     return movie
  //   } catch (error) {
  //     console.error(`Error: ${error}`)
  //     pool.end()
  //   }
  // }
}

export default Movie
