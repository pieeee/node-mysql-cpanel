"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnect = exports.query = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _util = _interopRequireDefault(require("util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connection = _mysql.default.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'chitroko_test_db'
});

const query = _util.default.promisify(connection.query).bind(connection);

exports.query = query;

const dbConnect = () => connection.connect(err => {
  if (err) {
    console.log('⚠️ error connecting:' + err.stack);
    return;
  }

  console.log('🔌 Database Connected as ID:' + connection.threadId);
});

exports.dbConnect = dbConnect;