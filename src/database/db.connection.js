import mysql from 'mysql'
import util from 'util'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'chitroko_test_db',
})

const query = util.promisify(connection.query).bind(connection)

const dbConnect = () =>
  connection.connect((err) => {
    if (err) {
      console.log('⚠️ error connecting:' + err.stack)
      return
    }
    console.log('🔌 Database Connected as ID:' + connection.threadId)
  })

export {query, dbConnect}