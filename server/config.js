const { Pool } = require('pg')
 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'School',
  password: 'postgres',
  port: 5432,
  idleTimeoutMillis : 100
})


module.exports = pool

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })