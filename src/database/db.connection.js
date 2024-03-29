import mysql from 'mysql'
import util from 'util'

const connection = mysql.createConnection({
  host: 'mysql.mi-equipment.com',
  user: 'ahnaf',
  database: 'join_us',
  password: '12345678',
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