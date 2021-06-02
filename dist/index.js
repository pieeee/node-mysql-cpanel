"use strict";

var _express = _interopRequireWildcard(require("express"));

var _db = require("./database/db.connection");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _db.dbConnect)();
const app = (0, _express.default)();
const port = 8080 || process.env.PORT;
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
});
app.listen(port, err => {
  if (err) {
    console.log(error);
  }

  console.log('🚀 Server Running On Port: ' + port);
});