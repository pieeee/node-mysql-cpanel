import express from 'express'
import { dbConnect, query } from './database/db.connection'

dbConnect()

const app = express()

const port = 8080 || process.env.PORT

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  const q = `SELECT COUNT(*) AS count FROM users`
  try {
    const raws = await query(q)
    res.render('home', { data: raws[0].count })
  } catch (error) {
    res.status(400).json({ error })
  }
})



app.post('/register', async (req, res) => {
  try {
    const person = { email: req.body.email }
    const q = 'INSERT INTO users SET ?'
    await query(q, person)
    res.redirect('/')
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.listen(port, (err) => {
  if (err) {
    console.log(error)
  }
  console.log('🚀 Server Running On Port: ' + port)
})


