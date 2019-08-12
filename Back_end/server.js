var express = require('express');
var router = require('./router')
var http = require('http');
var cors= require('cors');


var config={
	PORT:process.env.PORT||5001
}
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/twitter', router);
app.get('/', (req, res, next) => {
  return res.json({ success: true, data: { status: 200, message: 'Idea spark project task  is now available.' } });
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
});

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404);
});
var server = http.createServer(app);
// initialize the required objects
app.initialize = async () => {
  try {
    //await mongoDao.initDb();
  }catch(err){
	console.log("Error while initializing database")
    throw err;
  }
}
app.initialize().then(() => {
	console.log("Initilization successfull, starting server....")
  server.listen(config.PORT);
  console.log("Server started at PORT "+config.PORT)
  }).catch((err) => {
	console.log('error while initializing' , err);
	process.exit(1);
});

module.exports=  app;
