"use strict";

var _express = _interopRequireDefault(require("express"));

var _db = require("./database/db.connection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _db.dbConnect)();
const app = (0, _express.default)();
app.set('view engine', 'ejs');
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.get('/', async (req, res) => {
  const q = `SELECT COUNT(*) AS count FROM users`;

  try {
    const raws = await (0, _db.query)(q);
    res.render('home', {
      data: raws[0].count
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
});
app.post('/register', async (req, res) => {
  try {
    const person = {
      email: req.body.email
    };
    const q = 'INSERT INTO users SET ?';
    await (0, _db.query)(q, person);
    res.redirect('/');
  } catch (error) {
    res.status(400).json({
      error
    });
  }
}); // app.listen(port, (err) => {
//   if (err) {
//     console.log(error)
//   }
//   console.log('🚀 Server Running On Port: ' + port)
// })

app.listen();